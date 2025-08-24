import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as THREE from 'three'
import { useMouseInteraction } from './useMouseInteraction'

export interface FloatingParticlesOptions {
  particleCount?: number
  particleSize?: number
  particleOpacity?: number
  colors?: {
    r: number
    g: number
    b: number
  }
  mouseInfluence?: number
  animationSpeed?: number
}

export function useFloatingParticles(
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: FloatingParticlesOptions = {}
) {
  const {
    particleCount = 200,
    particleSize = 0.05,
    particleOpacity = 0.8,
    colors = { r: 0.2, g: 0.8, b: 0.3 },
    mouseInfluence = 0.8,
    animationSpeed = 0.016
  } = options

  const particles = ref<THREE.Points | null>(null)
  const shapes = ref<THREE.Mesh[]>([])
  const isActive = ref(false)
  const animationId = ref<number | null>(null)
  const time = ref(0)
  const velocities = ref<Float32Array | null>(null)
  const originalPositions = ref<Float32Array | null>(null)

  const { normalizedMouse } = useMouseInteraction()

  const createParticles = () => {
    const particleGeometry = markRaw(new THREE.BufferGeometry())
    const positions = new Float32Array(particleCount * 3)
    const originalPositionsArray = new Float32Array(particleCount * 3)
    const velocitiesArray = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const pos = (Math.random() - 0.5) * 25
      positions[i3] = pos
      positions[i3 + 1] = pos
      positions[i3 + 2] = pos
      originalPositionsArray[i3] = pos
      originalPositionsArray[i3 + 1] = pos
      originalPositionsArray[i3 + 2] = pos
      velocitiesArray[i3] = (Math.random() - 0.5) * 0.03
      velocitiesArray[i3 + 1] = (Math.random() - 0.5) * 0.03
      velocitiesArray[i3 + 2] = (Math.random() - 0.5) * 0.03
      
      // Create color gradient from specified colors
      const colorIntensity = Math.random() * 0.5 + 0.5
      particleColors[i3] = colors.r * colorIntensity
      particleColors[i3 + 1] = colors.g * colorIntensity
      particleColors[i3 + 2] = colors.b * colorIntensity
      
      sizes[i] = Math.random() * 0.05 + 0.02
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    
    const particleMaterial = markRaw(new THREE.PointsMaterial({ 
      size: particleSize,
      transparent: true,
      opacity: particleOpacity,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true
    }))
    
    particles.value = markRaw(new THREE.Points(particleGeometry, particleMaterial))
    scene.add(particles.value)
    
    // Store arrays for later use
    velocities.value = velocitiesArray
    originalPositions.value = originalPositionsArray
  }

  const createFloatingShapes = () => {
    const createFloatingTriangle = (position: [number, number, number], color: number, opacity: number) => {
      const triangleGeometry = markRaw(new THREE.TetrahedronGeometry(0.4, 0))
      const triangleMaterial = markRaw(new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        wireframe: true
      }))
      const mesh = markRaw(new THREE.Mesh(triangleGeometry, triangleMaterial))
      mesh.position.set(...position)
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      scene.add(mesh)
      return mesh
    }

    // Create various triangle shapes
    shapes.value = []
    shapes.value.push(createFloatingTriangle([8, 3, -5], 0x32CD32, 0.3))
    shapes.value.push(createFloatingTriangle([-6, -2, 4], 0x90EE90, 0.25))
    shapes.value.push(createFloatingTriangle([4, -4, -3], 0x98FB98, 0.2))
  }

  const updateParticles = () => {
    if (!particles.value) return

    time.value += animationSpeed
    
    // Enhanced particle movement
    const positionAttribute = particles.value.geometry.getAttribute('position')
    const mouseInfluenceValue = normalizedMouse.value.length() * mouseInfluence
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Organic floating movement with more variation
      const wave = Math.sin(time.value * 0.5 + i * 0.1) * 0.8
      const wave2 = Math.cos(time.value * 0.3 + i * 0.15) * 0.6
      
      // Mouse attraction/repulsion effect
      const mouseX = normalizedMouse.value.x * 4
      const mouseY = normalizedMouse.value.y * 4
      
      const dx = positionAttribute.array[i3] - mouseX
      const dy = positionAttribute.array[i3 + 1] - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      let mouseForceX = 0
      let mouseForceY = 0
      
      if (distance < 6 && mouseInfluenceValue > 0.1) {
        const force = (6 - distance) / 6
        if (distance < 2.5) {
          mouseForceX = (dx / distance) * force * 0.2
          mouseForceY = (dy / distance) * force * 0.1
        } else {
          mouseForceX = -(dx / distance) * force * 0.1
          mouseForceY = -(dy / distance) * force * 0.1
        }
      }
      
      // Enhanced base organic movement
      const baseMovementX = Math.sin(time.value * 0.3 + i * 0.1) * 3 + 
                           Math.cos(time.value * 0.15 + i * 0.2) * 1.5 +
                           Math.sin(time.value * 0.7 + i * 0.05) * 1
      const baseMovementY = wave * 4 + 
                           Math.sin(time.value * 0.25 + i * 0.15) * 2.5 +
                           wave2 * 2
      const baseMovementZ = Math.cos(time.value * 0.4 + i * 0.05) * 2.5 + 
                           Math.sin(time.value * 0.2 + i * 0.08) * 1.5 +
                           Math.cos(time.value * 0.6 + i * 0.12) * 1
      
      // Continuous velocity-based drift
      const driftX = velocities.value![i3] * time.value * 15
      const driftY = velocities.value![i3 + 1] * time.value * 15  
      const driftZ = velocities.value![i3 + 2] * time.value * 15
      
      // Update positions
      positionAttribute.array[i3] = originalPositions.value![i3] + 
        baseMovementX + 
        driftX + 
        mouseForceX
      
      positionAttribute.array[i3 + 1] = originalPositions.value![i3 + 1] + 
        baseMovementY + 
        driftY + 
        mouseForceY
      
      positionAttribute.array[i3 + 2] = originalPositions.value![i3 + 2] + 
        baseMovementZ + 
        driftZ
    }
    
    positionAttribute.needsUpdate = true
  }

  const updateShapes = () => {
    shapes.value.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      const amplitude = 0.5 + index * 0.2
      
      shape.rotation.x += 0.01 * speed
      shape.rotation.y += 0.015 * speed
      shape.rotation.z += 0.008 * speed
      
      // Floating motion
      shape.position.y += Math.sin(time.value * speed + index) * 0.01 * amplitude
      shape.position.x += Math.cos(time.value * speed * 0.7 + index) * 0.008 * amplitude
      shape.position.z += Math.sin(time.value * speed * 0.5 + index) * 0.006 * amplitude
      
      // Scale pulsing
      const scale = 1 + Math.sin(time.value * 2 + index) * 0.1
      shape.scale.setScalar(scale)
      
      // Opacity variation
      if (shape.material instanceof THREE.MeshBasicMaterial) {
        shape.material.opacity = 0.1 + Math.sin(time.value * 1.5 + index) * 0.1
      }
    })
  }

  const updateCamera = () => {
    if (!camera) return

    const cameraMoveX = Math.sin(time.value * 0.08) * 0.4 + normalizedMouse.value.x * 0.2
    const cameraMoveY = Math.cos(time.value * 0.12) * 0.3 + normalizedMouse.value.y * 0.15
    const cameraMoveZ = Math.sin(time.value * 0.1) * 0.2
    
    camera.position.x = cameraMoveX
    camera.position.y = cameraMoveY
    camera.position.z = 5 + cameraMoveZ
    camera.lookAt(0, 0, 0)
  }

  const updateParticleRotation = () => {
    if (!particles.value) return

    const mouseInfluenceValue = normalizedMouse.value.length() * mouseInfluence
    const baseRotationY = 0.004 + Math.sin(time.value * 0.1) * 0.003
    const baseRotationX = 0.003 + Math.cos(time.value * 0.15) * 0.002
    
    particles.value.rotation.y += baseRotationY + mouseInfluenceValue * 0.005
    particles.value.rotation.x += baseRotationX + mouseInfluenceValue * 0.003
  }

  const updateParticleSize = () => {
    if (!particles.value || !(particles.value.material instanceof THREE.PointsMaterial)) return

    const mouseInfluenceValue = normalizedMouse.value.length() * mouseInfluence
    const basePulse = Math.sin(time.value * 1.5) * 0.01 + 0.04
    particles.value.material.size = basePulse + mouseInfluenceValue * 0.01
  }

  const animate = () => {
    if (!isActive.value) return

    updateParticles()
    updateShapes()
    updateCamera()
    updateParticleRotation()
    updateParticleSize()

    animationId.value = requestAnimationFrame(animate)
  }

  const start = () => {
    if (isActive.value) return
    
    isActive.value = true
    createParticles()
    createFloatingShapes()
    animate()
  }

  const stop = () => {
    isActive.value = false
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
      animationId.value = null
    }
  }

  const cleanup = () => {
    stop()
    
    if (particles.value) {
      scene.remove(particles.value)
      particles.value.geometry.dispose()
      if (particles.value.material instanceof THREE.PointsMaterial) {
        particles.value.material.dispose()
      }
      particles.value = null
    }

    shapes.value.forEach(shape => {
      scene.remove(shape)
      shape.geometry.dispose()
      if (shape.material instanceof THREE.Material) {
        shape.material.dispose()
      }
    })
    shapes.value = []
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    particles,
    shapes,
    isActive,
    start,
    stop,
    cleanup
  }
}
