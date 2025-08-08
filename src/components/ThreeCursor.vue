<template>
  <div class="three-cursor" ref="cursorContainer">
    <canvas ref="cursorCanvasRef" class="cursor-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import { useThree } from '@/composables/useThree'
import { useMouseInteraction } from '@/composables/useMouseInteraction'
import * as THREE from 'three'

const cursorContainer = ref<HTMLDivElement>()
const cursorCanvasRef = ref<HTMLCanvasElement>()
const { scene, camera, renderer, init, animate } = useThree(cursorCanvasRef)
const { mousePosition } = useMouseInteraction()

onMounted(() => {
  const cleanup = init()
  
  if (!scene.value || !camera.value || !renderer.value || !cursorContainer.value) return

  // Setup cursor canvas
  renderer.value.setSize(100, 100)
  renderer.value.setClearColor(0x000000, 0)
  camera.value.position.z = 5

  // Create cursor geometry
  const cursorGeometry = markRaw(new THREE.RingGeometry(0.8, 1.2, 16))
  const cursorMaterial = markRaw(new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      intensity: { value: 1.0 }
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Subtle rotation
        float angle = time * 2.0;
        pos.x = position.x * cos(angle) - position.y * sin(angle);
        pos.y = position.x * sin(angle) + position.y * cos(angle);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float intensity;
      varying vec2 vUv;
      
      void main() {
        vec2 center = vUv - 0.5;
        float dist = length(center);
        
        // Pulsing ring effect
        float pulse = sin(time * 4.0) * 0.3 + 0.7;
        float alpha = (1.0 - smoothstep(0.3, 0.5, dist)) * pulse * intensity;
        
        vec3 color = vec3(0.2, 0.8, 0.3);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  }))

  const cursor3D = markRaw(new THREE.Mesh(cursorGeometry, cursorMaterial))
  scene.value.add(cursor3D)

  // Create particle trail
  const trailGeometry = markRaw(new THREE.BufferGeometry())
  const trailCount = 20
  const trailPositions = new Float32Array(trailCount * 3)
  const trailSizes = new Float32Array(trailCount)
  
  for (let i = 0; i < trailCount; i++) {
    trailSizes[i] = Math.random() * 0.5 + 0.1
  }
  
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3))
  trailGeometry.setAttribute('size', new THREE.BufferAttribute(trailSizes, 1))

  const trailMaterial = markRaw(new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      uniform float time;
      varying float vAlpha;
      
      void main() {
        vAlpha = size;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * 50.0 / -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      varying float vAlpha;
      
      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        if (dist > 0.5) discard;
        
        float alpha = (1.0 - dist * 2.0) * vAlpha;
        gl_FragColor = vec4(0.2, 0.8, 0.3, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  }))

  const trail = markRaw(new THREE.Points(trailGeometry, trailMaterial))
  scene.value.add(trail)

  let time = 0
  let mouseHistory: { x: number, y: number }[] = []
  
  const updateCursorPosition = () => {
    if (!cursorContainer.value) return
    
    cursorContainer.value.style.left = `${mousePosition.value.x - 50}px`
    cursorContainer.value.style.top = `${mousePosition.value.y - 50}px`
    
    // Update mouse history for trail
    mouseHistory.push({ x: mousePosition.value.x, y: mousePosition.value.y })
    if (mouseHistory.length > trailCount) {
      mouseHistory.shift()
    }
  }

  animate(() => {
    time += 0.016
    
    updateCursorPosition()
    
    // Update cursor shader
    if (cursor3D.material instanceof THREE.ShaderMaterial) {
      cursor3D.material.uniforms.time.value = time
    }
    
    // Update trail positions
    const positions = trail.geometry.getAttribute('position')
    mouseHistory.forEach((pos, index) => {
      const i3 = index * 3
      // Convert screen coordinates to world coordinates (simplified)
      positions.array[i3] = (pos.x / window.innerWidth - 0.5) * 4
      positions.array[i3 + 1] = -(pos.y / window.innerHeight - 0.5) * 4
      positions.array[i3 + 2] = 0
    })
    positions.needsUpdate = true
    
    if (trail.material instanceof THREE.ShaderMaterial) {
      trail.material.uniforms.time.value = time
    }
  })
  
  return cleanup
})

onUnmounted(() => {
  // Hide default cursor
  document.body.style.cursor = 'auto'
})

// Hide default cursor when component mounts
onMounted(() => {
  document.body.style.cursor = 'none'
})
</script>

<style scoped>
.three-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  pointer-events: none;
  z-index: 9999;
}

.cursor-canvas {
  width: 100%;
  height: 100%;
}
</style>
