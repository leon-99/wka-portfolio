<template>
  <section id="home" class="hero">
    <canvas ref="canvasRef" class="hero-canvas"></canvas>
    
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="text-gradient">Win Khant Aung</span>
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
      <div class="skill-tag skill-tag-1" data-skill="Node.js">Node.js</div>
      <div class="skill-tag skill-tag-2" data-skill="PHP">PHP</div>
      <div class="skill-tag skill-tag-3" data-skill="Laravel">Laravel</div>
      <div class="skill-tag skill-tag-4" data-skill="Vue.js">Vue.js</div>
      <div class="skill-tag skill-tag-5" data-skill="DevOps">DevOps</div>
      <div class="skill-tag skill-tag-6" data-skill="Web Animations">Web Animations</div>
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
import { 
  createAdvancedParticleSystem, 
  createMorphingSphere, 
  createWireframeGeometry, 
  createDynamicBackground,
  createFloatingOrbs,
  createEnergyField,
  updateAdvancedParticles,
  animateFloat, 
  animateRotation 
} from '@/utils/threeHelpers'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement>()
const { scene, camera, renderer, init, animate } = useThree(canvasRef)
const { normalizedMouse } = useMouseInteraction()
const { updateRaycaster } = useRaycaster(camera, scene)

onMounted(() => {
  const cleanup = init()
  
  setTimeout(() => {
    if (!scene.value || !camera.value) return

    // Create interactive floating particles
    const particleGeometry = markRaw(new THREE.BufferGeometry())
    const particleCount = 150
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      const pos = (Math.random() - 0.5) * 20
      positions[i] = pos
      originalPositions[i] = pos
      velocities[i] = (Math.random() - 0.5) * 0.02
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = markRaw(new THREE.PointsMaterial({ 
      color: 0x32CD32, 
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    }))
    const particles = markRaw(new THREE.Points(particleGeometry, particleMaterial))
    scene.value.add(particles)

    let time = 0
    
    animate(() => {
      time += 0.016
      
      // Update mouse interaction
      updateRaycaster(normalizedMouse.value)
      
      // Mouse-interactive particle movement
      const positionAttribute = particles.geometry.getAttribute('position')
      const mouseInfluence = normalizedMouse.value.length() * 2
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Organic floating movement
        const wave = Math.sin(time * 0.5 + i * 0.1) * 0.5
        
        // Mouse attraction/repulsion effect
        const mouseX = normalizedMouse.value.x * 10
        const mouseY = normalizedMouse.value.y * 10
        
        // Calculate distance from mouse (in screen space)
        const dx = positionAttribute.array[i3] - mouseX
        const dy = positionAttribute.array[i3 + 1] - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Apply mouse influence (attraction when close, repulsion when very close)
        let mouseForceX = 0
        let mouseForceY = 0
        
        if (distance < 5 && mouseInfluence > 0.1) {
          const force = (5 - distance) / 5
          if (distance < 2) {
            // Repulsion when very close
            mouseForceX = (dx / distance) * force * 0.5
            mouseForceY = (dy / distance) * force * 0.5
          } else {
            // Attraction when moderately close
            mouseForceX = -(dx / distance) * force * 0.2
            mouseForceY = -(dy / distance) * force * 0.2
          }
        }
        
        // Enhanced base organic movement (always active)
        const baseMovementX = Math.sin(time * 0.3 + i * 0.1) * 2.5 + 
                             Math.cos(time * 0.15 + i * 0.2) * 1.2
        const baseMovementY = wave * 3.5 + 
                             Math.sin(time * 0.25 + i * 0.15) * 1.8
        const baseMovementZ = Math.cos(time * 0.4 + i * 0.05) * 2.0 + 
                             Math.sin(time * 0.2 + i * 0.08) * 1.0
        
        // Continuous velocity-based drift
        const driftX = velocities[i3] * time * 12
        const driftY = velocities[i3 + 1] * time * 12  
        const driftZ = velocities[i3 + 2] * time * 12
        
        // Update positions with enhanced organic movement + mouse interaction
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
      
      // Enhanced particle rotation (base movement + mouse influence)
      const baseRotationY = 0.003 + Math.sin(time * 0.1) * 0.002
      const baseRotationX = 0.002 + Math.cos(time * 0.15) * 0.001
      
      particles.rotation.y += baseRotationY + mouseInfluence * 0.01
      particles.rotation.x += baseRotationX + mouseInfluence * 0.005
      
      // Dynamic particle size with base pulsing + mouse interaction
      if (particleMaterial.size) {
        const basePulse = Math.sin(time * 1.5) * 0.008 + 0.035 // Base pulsing size
        particleMaterial.size = basePulse + mouseInfluence * 0.02
      }
      
      // Camera movement with mouse influence
      if (camera.value) {
        camera.value.position.x = Math.sin(time * 0.1) * 0.3 + normalizedMouse.value.x * 0.5
        camera.value.position.y = Math.cos(time * 0.15) * 0.2 + normalizedMouse.value.y * 0.3
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
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
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
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #90EE90;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  color: rgba(232, 245, 232, 0.8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-arrow {
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, #32CD32);
  position: relative;
  animation: scroll 2s ease-in-out infinite;
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
}

@keyframes scroll {
  0%, 100% { opacity: 0; transform: translateY(-10px); }
  50% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
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
    display: none; /* Hide on mobile */
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
  background: rgba(26, 47, 26, 0.9);
  backdrop-filter: blur(10px);
  color: #90EE90;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(34, 139, 34, 0.4);
  box-shadow: 0 4px 15px rgba(50, 205, 50, 0.2);
  white-space: nowrap;
  animation: float 6s ease-in-out infinite;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: rgba(34, 139, 34, 0.9);
  color: #e8f5e8;
  box-shadow: 0 6px 25px rgba(50, 205, 50, 0.4);
  transform: translateY(-5px);
}

/* Individual positioning and animation delays */
.skill-tag-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.skill-tag-2 {
  top: 35%;
  right: 12%;
  animation-delay: 1s;
}

.skill-tag-3 {
  top: 15%;
  right: 25%;
  animation-delay: 2s;
}

.skill-tag-4 {
  bottom: 35%;
  left: 10%;
  animation-delay: 3s;
}

.skill-tag-5 {
  bottom: 20%;
  right: 20%;
  animation-delay: 4s;
}

.skill-tag-6 {
  top: 50%;
  left: 8%;
  animation-delay: 5s;
}

/* Floating animation */
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

/* Subtle glow animation */
.skill-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 25px;
  background: linear-gradient(45deg, transparent, rgba(144, 238, 144, 0.1), transparent);
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
</style>
