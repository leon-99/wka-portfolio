<template>
  <section id="home" class="hero">
    <canvas ref="canvasRef" class="hero-canvas"></canvas>
    
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          <div class="name-animation-container">
            <div class="name-particles"></div>
            <div class="name-text">
              <span class="letter" data-char="W">W</span>
              <span class="letter" data-char="i">i</span>
              <span class="letter" data-char="n">n</span>
              <span class="space"> </span>
              <span class="letter" data-char="K">K</span>
              <span class="letter" data-char="h">h</span>
              <span class="letter" data-char="a">a</span>
              <span class="letter" data-char="n">n</span>
              <span class="letter" data-char="t">t</span>
              <span class="space"> </span>
              <span class="letter" data-char="A">A</span>
              <span class="letter" data-char="u">u</span>
              <span class="letter" data-char="n">n</span>
              <span class="letter" data-char="g">g</span>
            </div>
            <div class="name-glow-overlay"></div>
          </div>
        </h1>
        <h2 class="hero-subtitle">Full Stack Developer</h2>
        <p class="hero-description">
          Passionate Node.js Backend Developer with expertise in Vue.js, React.js, 
          and modern web technologies. Building scalable applications and delivering 
          high-performance solutions.
        </p>
        
        <div class="hero-actions">
          <a href="#projects" class="btn-primary">View My Work</a>
          <a href="#contact" class="btn-secondary">Get In Touch</a>
        </div>
      </div>
    </div>
    
    <!-- Floating Skills Tags -->
    <div class="floating-skills">
      <div class="skill-tag skill-tag-1" data-skill="Node.js">
        <span class="skill-text">Node.js</span>
        <Icon icon="devicon:nodejs" class="skill-icon" />
      </div>
      <div class="skill-tag skill-tag-2" data-skill="PHP">
        <span class="skill-text">PHP</span>
        <Icon icon="devicon:php" class="skill-icon" />
      </div>
      <div class="skill-tag skill-tag-3" data-skill="Laravel">
        <span class="skill-text">Laravel</span>
        <Icon icon="devicon:laravel" class="skill-icon" />
      </div>
      <div class="skill-tag skill-tag-4" data-skill="Vue.js">
        <span class="skill-text">Vue.js</span>
        <Icon icon="devicon:vuejs" class="skill-icon" />
      </div>
      <div class="skill-tag skill-tag-5" data-skill="DevOps">
        <span class="skill-text">DevOps</span>
        <Icon icon="mdi:server" class="skill-icon" />
      </div>
      <div class="skill-tag skill-tag-6" data-skill="Web Animations">
        <span class="skill-text">Web Animations</span>
        <Icon icon="mdi:animation" class="skill-icon" />
      </div>
    </div>
    
    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw } from 'vue'
import { useThree } from '@/composables/useThree'
import { useMouseInteraction, useRaycaster } from '@/composables/useMouseInteraction'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'

gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref<HTMLCanvasElement>()
const { scene, camera, init, animate } = useThree(canvasRef)
const { normalizedMouse } = useMouseInteraction()
const { updateRaycaster } = useRaycaster(camera, scene)

onMounted(() => {
  const cleanup = init()
  
  // GSAP Creative Name Animation
  const tl = gsap.timeline()
  
  // Initial state - hide elements
  gsap.set(['.hero-subtitle', '.hero-description', '.hero-actions'], {
    opacity: 0,
    y: 100,
    scale: 0.8
  })
  
  gsap.set('.skill-tag', {
    opacity: 0,
    scale: 0.8,
  })
  
  // Name Animation Setup
  const letters = document.querySelectorAll('.letter')
  let nameContainer = document.querySelector('.name-animation-container')
  
  // Set initial states for name animation
  gsap.set(nameContainer, { opacity: 1 })
  gsap.set(letters, {
    opacity: 0,
    scale: 0,
    rotationY: 180,
    rotationX: 90,
    z: -200,
    transformOrigin: 'center center',
  })
  
  // Create morphing text effect
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
  letters.forEach((letter, index) => {
    const originalChar = letter.getAttribute('data-char')
    let morphCount = 0
    
    const morphInterval = setInterval(() => {
      if (morphCount < 8) {
        letter.textContent = randomChars[Math.floor(Math.random() * randomChars.length)]
        morphCount++
      } else {
        letter.textContent = originalChar
        clearInterval(morphInterval)
      }
    }, 50 + index * 20)
  })
  
  // Start all animations simultaneously
  // Name animation
  tl.to(letters, {
    opacity: 1,
    scale: 1,
    rotationY: 0,
    rotationX: 0,
    z: 0,
    duration: 1.5,
    stagger: {
      each: 0.1,
      from: 'random'
    },
    ease: 'elastic.out(1, 0.6)',
    onComplete: () => {
      // Add continuous floating and rotation
      gsap.to(letters, {
        rotationY: '+=5',
        rotationX: '+=2',
        duration: 2,
        stagger: 0.1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      })
    }
  })
  
  // All other elements start at the same time as name animation
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, 0)  // Start at the same time as name animation
  
  .to('.hero-description', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.0,
    ease: 'power2.out'
  }, 0.2)  // Start just slightly after
  
  .to('.hero-actions', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, 0.4)  // Start shortly after
  
  .to('.skill-tag', {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  }, 0.1)  // Start almost immediately
  
  // Set green color
  .set(letters, {
    color: '#32CD32',
    textShadow: '0 0 10px rgba(50, 205, 50, 0.3)'
  }, 0)
  
  // Magnetic pull effect - happens during the main animation
  .to(letters, {
    y: -20,
    duration: 0.6,
    stagger: 0.05,
    ease: 'back.out(2)',
    yoyo: true,
    repeat: 1
  }, 0.8)
  
  // Glitch effect - brief and during main animation
  .to(letters, {
    x: () => Math.random() * 10 - 5,
    duration: 0.1,
    stagger: 0.02,
    repeat: 3,
    yoyo: true,
    ease: 'power2.inOut'
  }, 1.0)
  
  // Reset position
  .to(letters, {
    x: 0,
    scale: 1.05,
    duration: 0.4,
    ease: 'back.out(1.7)'
  }, 1.2)
  .to(letters, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  }, 1.4)
  
  // Floating skill tags animation
  const isMobile = window.innerWidth <= 768
  
  gsap.to('.skill-tag', {
    y: isMobile ? '-=8' : '-=15', // Reduced movement on mobile
    rotation: isMobile ? 1 : 2, // Reduced rotation on mobile
    duration: isMobile ? 4 : 3, // Slower animation on mobile for better performance
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: {
      each: isMobile ? 0.8 : 0.5, // Slower stagger on mobile
      from: 'random'
    }
  })
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary')
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
  })
  
  // Scroll indicator animation
  gsap.to('.scroll-arrow', {
    y: 10,
    duration: 1.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
  
  // Interactive name letters on mouse move
  nameContainer = document.querySelector('.name-animation-container')
  if (nameContainer) {
    nameContainer.addEventListener('mousemove', (e) => {
      const rect = nameContainer.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = ((e as MouseEvent).clientX - centerX) / rect.width
      const deltaY = ((e as MouseEvent).clientY - centerY) / rect.height
      
      letters.forEach((letter, index) => {
        const delay = index * 0.02
        gsap.to(letter, {
          rotationY: deltaX * 15,
          rotationX: -deltaY * 10,
          z: Math.abs(deltaX + deltaY) * 20,
          duration: 0.6,
          delay: delay,
          ease: 'power2.out'
        })
      })
    })
    
    nameContainer.addEventListener('mouseleave', () => {
      gsap.to(letters, {
        rotationY: 0,
        rotationX: 0,
        z: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'elastic.out(1, 0.5)'
      })
    })
  }
  
  // Magnetic cursor effect for skill badges
  const skillTags = document.querySelectorAll('.skill-tag')
  
  skillTags.forEach(tag => {
    let isHovered = false
    
    // Only add mouse events on non-mobile devices
    if (!isMobile) {
      tag.addEventListener('mouseenter', () => {
        isHovered = true
        gsap.to(tag, {
          scale: 1.1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
      
      tag.addEventListener('mouseleave', () => {
        isHovered = false
        gsap.to(tag, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        })
      })
      
      tag.addEventListener('mousemove', (e) => {
        if (!isHovered) return
        
        const rect = tag.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = (e as MouseEvent).clientX - centerX
        const deltaY = (e as MouseEvent).clientY - centerY
        
        // Magnetic pull effect - move towards cursor but with limits
        const magnetStrength = 0.3
        const maxDistance = 15
        
        const magnetX = Math.max(-maxDistance, Math.min(maxDistance, deltaX * magnetStrength))
        const magnetY = Math.max(-maxDistance, Math.min(maxDistance, deltaY * magnetStrength))
        
        gsap.to(tag, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    }
    
    // Add touch events for mobile devices
    if (isMobile) {
      tag.addEventListener('touchstart', () => {
        gsap.to(tag, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        })
      })
      
      tag.addEventListener('touchend', () => {
        gsap.to(tag, {
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.3)'
        })
      })
    }
  })
  
  setTimeout(() => {
    if (!scene.value || !camera.value) return

    // Create enhanced interactive floating particles
    const particleGeometry = markRaw(new THREE.BufferGeometry())
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const pos = (Math.random() - 0.5) * 25
      positions[i3] = pos
      positions[i3 + 1] = pos
      positions[i3 + 2] = pos
      originalPositions[i3] = pos
      originalPositions[i3 + 1] = pos
      originalPositions[i3 + 2] = pos
      velocities[i3] = (Math.random() - 0.5) * 0.03
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.03
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.03
      
      // Create color gradient from green to blue
      const colorIntensity = Math.random() * 0.5 + 0.5
      colors[i3] = 0.2 * colorIntensity // Green component
      colors[i3 + 1] = 0.8 * colorIntensity // Green component
      colors[i3 + 2] = 0.3 * colorIntensity // Blue component
      
      sizes[i] = Math.random() * 0.05 + 0.02
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    
    const particleMaterial = markRaw(new THREE.PointsMaterial({ 
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true
    }))
    
    const particles = markRaw(new THREE.Points(particleGeometry, particleMaterial))
    scene.value.add(particles)

    // Create floating triangle shapes
    const createFloatingTriangle = (position: [number, number, number], color: number, opacity: number) => {
      const triangleGeometry = markRaw(new THREE.TetrahedronGeometry(0.4, 0)) // Tetrahedron has triangular faces
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
      scene.value!.add(mesh)
      return mesh
    }

         // Create various triangle shapes
     const shapes: THREE.Mesh[] = []
     
     // Fewer tetrahedrons (triangular pyramids) for cleaner look
     shapes.push(createFloatingTriangle([8, 3, -5], 0x32CD32, 0.3))
     shapes.push(createFloatingTriangle([-6, -2, 4], 0x90EE90, 0.25))
     shapes.push(createFloatingTriangle([4, -4, -3], 0x98FB98, 0.2))

    let time = 0
    
    animate(() => {
      time += 0.016
      
      // Update mouse interaction
      updateRaycaster(normalizedMouse.value)
      
      // Enhanced particle movement
      const positionAttribute = particles.geometry.getAttribute('position')
      const mouseInfluence = normalizedMouse.value.length() * 0.8
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Organic floating movement with more variation
        const wave = Math.sin(time * 0.5 + i * 0.1) * 0.8
        const wave2 = Math.cos(time * 0.3 + i * 0.15) * 0.6
        
        // Mouse attraction/repulsion effect
        const mouseX = normalizedMouse.value.x * 4
        const mouseY = normalizedMouse.value.y * 4
        
        const dx = positionAttribute.array[i3] - mouseX
        const dy = positionAttribute.array[i3 + 1] - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        let mouseForceX = 0
        let mouseForceY = 0
        
        if (distance < 6 && mouseInfluence > 0.1) {
          const force = (6 - distance) / 6
          if (distance < 2.5) {
            mouseForceX = (dx / distance) * force * 0.2
            mouseForceY = (dy / distance) * force * 0.2
          } else {
            mouseForceX = -(dx / distance) * force * 0.1
            mouseForceY = -(dy / distance) * force * 0.1
          }
        }
        
        // Enhanced base organic movement
        const baseMovementX = Math.sin(time * 0.3 + i * 0.1) * 3 + 
                             Math.cos(time * 0.15 + i * 0.2) * 1.5 +
                             Math.sin(time * 0.7 + i * 0.05) * 1
        const baseMovementY = wave * 4 + 
                             Math.sin(time * 0.25 + i * 0.15) * 2.5 +
                             wave2 * 2
        const baseMovementZ = Math.cos(time * 0.4 + i * 0.05) * 2.5 + 
                             Math.sin(time * 0.2 + i * 0.08) * 1.5 +
                             Math.cos(time * 0.6 + i * 0.12) * 1
        
        // Continuous velocity-based drift
        const driftX = velocities[i3] * time * 15
        const driftY = velocities[i3 + 1] * time * 15  
        const driftZ = velocities[i3 + 2] * time * 15
        
        // Update positions
        positionAttribute.array[i3] = originalPositions[i3] + 
          baseMovementX + 
          driftX + 
          mouseForceX
        
        positionAttribute.array[i3 + 1] = originalPositions[i3 + 1] + 
          baseMovementY + 
          driftY + 
          mouseForceY
        
        positionAttribute.array[i3 + 2] = originalPositions[i3 + 2] + 
          baseMovementZ + 
          driftZ
      }
      
      positionAttribute.needsUpdate = true
      
      // Animate geometric shapes
      shapes.forEach((shape, index) => {
        const speed = 0.5 + index * 0.1
        const amplitude = 0.5 + index * 0.2
        
        shape.rotation.x += 0.01 * speed
        shape.rotation.y += 0.015 * speed
        shape.rotation.z += 0.008 * speed
        
        // Floating motion
        shape.position.y += Math.sin(time * speed + index) * 0.01 * amplitude
        shape.position.x += Math.cos(time * speed * 0.7 + index) * 0.008 * amplitude
        shape.position.z += Math.sin(time * speed * 0.5 + index) * 0.006 * amplitude
        
        // Scale pulsing
        const scale = 1 + Math.sin(time * 2 + index) * 0.1
        shape.scale.setScalar(scale)
        
        // Opacity variation
        if (shape.material instanceof THREE.MeshBasicMaterial) {
          shape.material.opacity = 0.1 + Math.sin(time * 1.5 + index) * 0.1
        }
      })
      
      // Enhanced particle rotation
      const baseRotationY = 0.004 + Math.sin(time * 0.1) * 0.003
      const baseRotationX = 0.003 + Math.cos(time * 0.15) * 0.002
      
      particles.rotation.y += baseRotationY + mouseInfluence * 0.005
      particles.rotation.x += baseRotationX + mouseInfluence * 0.003
      
      // Dynamic particle size
      if (particleMaterial.size) {
        const basePulse = Math.sin(time * 1.5) * 0.01 + 0.04
        particleMaterial.size = basePulse + mouseInfluence * 0.01
      }
      
      // Enhanced camera movement
      if (camera.value) {
        const cameraMoveX = Math.sin(time * 0.08) * 0.4 + normalizedMouse.value.x * 0.2
        const cameraMoveY = Math.cos(time * 0.12) * 0.3 + normalizedMouse.value.y * 0.15
        const cameraMoveZ = Math.sin(time * 0.1) * 0.2
        
        camera.value.position.x = cameraMoveX
        camera.value.position.y = cameraMoveY
        camera.value.position.z = 5 + cameraMoveZ
        camera.value.lookAt(0, 0, 0)
      }
    })
  }, 100)
  
  return cleanup
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(0, 20, 0, 0.3) 0%, 
    rgba(0, 40, 20, 0.2) 50%, 
    rgba(0, 20, 40, 0.3) 100%);
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  filter: blur(0.5px);
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-shadow: 
    0 0 20px rgba(50, 205, 50, 0.5),
    0 0 40px rgba(50, 205, 50, 0.3),
    0 0 60px rgba(50, 205, 50, 0.1);
}

.name-animation-container {
  position: relative;
  display: inline-block;
  perspective: 1000px;
}

.name-text {
  position: relative;
  z-index: 2;
}

.letter {
  display: inline-block;
  font-weight: 700;
  color: #32CD32;
  text-shadow: 
    0 0 10px rgba(50, 205, 50, 0.5),
    0 0 20px rgba(50, 205, 50, 0.3),
    0 0 30px rgba(50, 205, 50, 0.1);
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  position: relative;
  filter: drop-shadow(0 0 5px rgba(50, 205, 50, 0.3));
}

.letter:hover {
  transform: rotateY(15deg) rotateX(5deg) translateZ(10px) scale(1.1);
  color: #90EE90;
  text-shadow: 
    0 0 15px rgba(144, 238, 144, 0.8),
    0 0 30px rgba(144, 238, 144, 0.5),
    0 0 45px rgba(144, 238, 144, 0.3);
  filter: drop-shadow(0 0 8px rgba(144, 238, 144, 0.5));
}

.space {
  display: inline-block;
  width: 0.3em;
}

.name-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.name-glow-overlay {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(ellipse at center, 
    rgba(232, 245, 232, 0.08) 0%,
    rgba(232, 245, 232, 0.04) 50%,
    transparent 70%);
  border-radius: 50%;
  opacity: 0.4;
  z-index: 0;
  animation: pulse-glow 4s ease-in-out infinite;
  filter: blur(1px);
}

@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #90EE90;
  margin-bottom: 1.5rem;
  font-weight: 400;
  text-shadow: 
    0 0 10px rgba(144, 238, 144, 0.4),
    0 0 20px rgba(144, 238, 144, 0.2);
  letter-spacing: 0.05em;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  color: rgba(232, 245, 232, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  backdrop-filter: blur(10px);
}

.btn-primary {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
  box-shadow: 
    0 4px 15px rgba(50, 205, 50, 0.3),
    0 0 20px rgba(50, 205, 50, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #228B22, #32CD32);
  box-shadow: 
    0 6px 20px rgba(50, 205, 50, 0.4),
    0 0 30px rgba(50, 205, 50, 0.2);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(50, 205, 50, 0.1);
  color: #32CD32;
  border-color: rgba(50, 205, 50, 0.3);
  box-shadow: 
    0 4px 15px rgba(50, 205, 50, 0.1),
    0 0 20px rgba(50, 205, 50, 0.05);
}

.btn-secondary:hover {
  background: rgba(50, 205, 50, 0.2);
  border-color: rgba(50, 205, 50, 0.5);
  box-shadow: 
    0 6px 20px rgba(50, 205, 50, 0.2),
    0 0 30px rgba(50, 205, 50, 0.1);
  transform: translateY(-2px);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.scroll-arrow {
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, #32CD32);
  position: relative;
  animation: scroll 2s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(50, 205, 50, 0.5);
}

.scroll-arrow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid #32CD32;
  filter: drop-shadow(0 0 5px rgba(50, 205, 50, 0.5));
}

@keyframes scroll {
  0%, 100% { 
    opacity: 0; 
    transform: translateY(-10px); 
  }
  50% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 1rem;
    margin: 0 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .letter:hover {
    transform: scale(1.05);
  }
  
  .name-glow-overlay {
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    opacity: 0.3;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions .btn-primary,
  .hero-actions .btn-secondary {
    width: 200px;
    text-align: center;
  }
  
  .floating-skills {
    display: block;
  }
  
  .skill-tag {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    border-radius: 20px;
  }
  
  .skill-text {
    display: none !important;
  }
  
  .skill-icon {
    display: block !important;
    font-size: 1.1rem;
  }
  
  .skill-tag-1 {
    top: 18% !important;
    left: 8% !important;
  }
  
  .skill-tag-2 {
    top: 22% !important;
    right: 8% !important;
  }
  
  .skill-tag-3 {
    top: 16% !important;
    right: 15% !important;
  }
  
  .skill-tag-4 {
    bottom: 8% !important;
    left: 8% !important;
  }
  
  .skill-tag-5 {
    bottom: 12% !important;
    right: 8% !important;
  }
  
  .skill-tag-6 {
    top: 28% !important;
    left: 6% !important;
  }
}

@media (max-width: 480px) {
  .floating-skills {
    display: block;
  }
  
  .skill-tag {
    font-size: 0.75rem;
    padding: 0.5rem 0.8rem;
    border-radius: 18px;
    max-width: 120px;
    text-align: center;
    word-wrap: break-word;
    white-space: normal;
  }
  
  .skill-text {
    display: none !important;
  }
  
  .skill-icon {
    display: block !important;
    font-size: 1rem;
  }
  
  .skill-tag-1 {
    top: 16% !important;
    left: 6% !important;
  }
  
  .skill-tag-2 {
    top: 20% !important;
    right: 6% !important;
  }
  
  .skill-tag-3 {
    top: 14% !important;
    right: 12% !important;
  }
  
  .skill-tag-4 {
    bottom: 6% !important;
    left: 6% !important;
  }
  
  .skill-tag-5 {
    bottom: 10% !important;
    right: 6% !important;
  }
  
  .skill-tag-6 {
    top: 26% !important;
    left: 4% !important;
  }
}

/* Floating Skills Styles */
.floating-skills {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.skill-tag {
  position: absolute;
  background: rgba(26, 47, 26, 0.95);
  backdrop-filter: blur(15px);
  color: #a8d8a8;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(34, 139, 34, 0.4);
  box-shadow: 
    0 4px 15px rgba(50, 205, 50, 0.2),
    0 0 20px rgba(50, 205, 50, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: default;
  user-select: none;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 769px) {
  .skill-text {
    display: block;
  }
  
  .skill-icon {
    display: none;
    font-size: 1.2rem;
    color: #a8d8a8;
  }
}

.skill-tag:hover {
  background: rgba(30, 60, 30, 0.98);
  color: #d0e8d0;
  box-shadow: 
    0 6px 25px rgba(40, 100, 40, 0.4),
    0 0 30px rgba(50, 205, 50, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

@media (min-width: 769px) {
  .skill-tag-1 {
    top: 20% !important;
    left: 15% !important;
  }
  
  .skill-tag-2 {
    top: 35% !important;
    right: 12% !important;
  }
  
  .skill-tag-3 {
    top: 15% !important;
    right: 25% !important;
  }
  
  .skill-tag-4 {
    bottom: 35% !important;
    left: 10% !important;
  }
  
  .skill-tag-5 {
    bottom: 20% !important;
    right: 20% !important;
  }
  
  .skill-tag-6 {
    top: 50% !important;
    left: 8% !important;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  50% {
    transform: translateY(-5px) translateX(-5px);
  }
  75% {
    transform: translateY(-15px) translateX(3px);
  }
}

.skill-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 25px;
  background: linear-gradient(45deg, transparent, rgba(144, 238, 144, 0.15), transparent);
  opacity: 0;
  animation: glow 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes glow {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

/* Enhanced visual effects */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(50, 205, 50, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(144, 238, 144, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(50, 205, 50, 0.02) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, transparent 30%, rgba(50, 205, 50, 0.01) 50%, transparent 70%);
  z-index: 0;
  pointer-events: none;
  animation: shimmer 8s ease-in-out infinite;
}



@keyframes shimmer {
  0%, 100% {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
    transform: translateX(100%);
  }
}
</style>
