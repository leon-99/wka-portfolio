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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref<HTMLCanvasElement>()
const { scene, camera, renderer, init, animate } = useThree(canvasRef)
const { normalizedMouse } = useMouseInteraction()
const { updateRaycaster } = useRaycaster(camera, scene)

onMounted(() => {
  const cleanup = init()
  
  // GSAP Hero Animations
  const tl = gsap.timeline()
  
  // Initial state - hide elements
  gsap.set(['.hero-title', '.hero-subtitle', '.hero-description', '.hero-actions'], {
    opacity: 0,
    y: 100,
    scale: 0.8
  })
  
  // Set skill tags initial state without affecting their CSS positioning
  gsap.set('.skill-tag', {
    opacity: 0,
    scale: 0.8,
    // Don't set y position to preserve CSS positioning
  })
  
  // Animate elements in sequence
  tl.to('.hero-title', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.2,
    ease: 'elastic.out(1, 0.8)'
  })
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.8')
  .to('.hero-description', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')
  .to('.hero-actions', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.2')
  .to('.skill-tag', {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  }, '-=0.6')
  
  // Floating skill tags animation
  gsap.to('.skill-tag', {
    y: '-=15',
    rotation: 2,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: {
      each: 0.5,
      from: 'random'
    }
  })
  
  // Continuous title glow effect - removed for cleaner look
  // gsap.to('.hero-title .text-gradient', {
  //   textShadow: '0 0 20px rgba(144, 238, 144, 0.8), 0 0 40px rgba(144, 238, 144, 0.4)',
  //   duration: 2,
  //   ease: 'sine.inOut',
  //   yoyo: true,
  //   repeat: -1
  // })
  
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
  
  // Magnetic cursor effect for skill badges
  const skillTags = document.querySelectorAll('.skill-tag')
  skillTags.forEach(tag => {
    let isHovered = false
    
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
      
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
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
  })
  
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
      
      // Mouse-interactive particle movement (slowed down)
      const positionAttribute = particles.geometry.getAttribute('position')
      const mouseInfluence = normalizedMouse.value.length() * 0.5 // Reduced from 2 to 0.5
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Organic floating movement
        const wave = Math.sin(time * 0.5 + i * 0.1) * 0.5
        
        // Mouse attraction/repulsion effect (reduced sensitivity)
        const mouseX = normalizedMouse.value.x * 3 // Reduced from 10 to 3
        const mouseY = normalizedMouse.value.y * 3 // Reduced from 10 to 3
        
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
            // Repulsion when very close (reduced force)
            mouseForceX = (dx / distance) * force * 0.15 // Reduced from 0.5 to 0.15
            mouseForceY = (dy / distance) * force * 0.15 // Reduced from 0.5 to 0.15
          } else {
            // Attraction when moderately close (reduced force)
            mouseForceX = -(dx / distance) * force * 0.08 // Reduced from 0.2 to 0.08
            mouseForceY = -(dy / distance) * force * 0.08 // Reduced from 0.2 to 0.08
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
      
      // Enhanced particle rotation (base movement + reduced mouse influence)
      const baseRotationY = 0.003 + Math.sin(time * 0.1) * 0.002
      const baseRotationX = 0.002 + Math.cos(time * 0.15) * 0.001
      
      particles.rotation.y += baseRotationY + mouseInfluence * 0.003 // Reduced from 0.01 to 0.003
      particles.rotation.x += baseRotationX + mouseInfluence * 0.002 // Reduced from 0.005 to 0.002
      
      // Dynamic particle size with base pulsing + reduced mouse interaction
      if (particleMaterial.size) {
        const basePulse = Math.sin(time * 1.5) * 0.008 + 0.035 // Base pulsing size
        particleMaterial.size = basePulse + mouseInfluence * 0.008 // Reduced from 0.02 to 0.008
      }
      
      // Camera movement with reduced mouse influence
      if (camera.value) {
        camera.value.position.x = Math.sin(time * 0.1) * 0.3 + normalizedMouse.value.x * 0.15 // Reduced from 0.5 to 0.15
        camera.value.position.y = Math.cos(time * 0.15) * 0.2 + normalizedMouse.value.y * 0.1 // Reduced from 0.3 to 0.1
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
  pointer-events: none; /* Container has no pointer events */
  z-index: 2;
}

.skill-tag {
  position: absolute;
  background: rgba(26, 47, 26, 0.9);
  backdrop-filter: blur(10px);
  color: #a8d8a8; /* Slightly softer default green */
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(34, 139, 34, 0.4);
  box-shadow: 0 4px 15px rgba(50, 205, 50, 0.2);
  white-space: nowrap;
  /* animation: float 6s ease-in-out infinite; */ /* Disabled - GSAP handles floating */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Only transition colors, let GSAP handle transforms */
  cursor: default; /* Changed from pointer to default */
  user-select: none;
  pointer-events: auto; /* Enable pointer events on skill tags */
}

.skill-tag:hover {
  background: rgba(30, 60, 30, 0.95); /* Darker, less bright green */
  color: #d0e8d0; /* Softer text color */
  box-shadow: 0 6px 25px rgba(40, 100, 40, 0.3); /* More subtle glow */
  /* transform: translateY(-5px); */ /* Disabled - GSAP handles transforms */
}

/* Individual positioning and animation delays */
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
