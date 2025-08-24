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
import { ref, onMounted, onUnmounted} from 'vue'
import { useThree } from '@/composables/useThree'
import { useMouseInteraction, useRaycaster } from '@/composables/useMouseInteraction'
import { useMorphingText } from '@/composables/useMorphingText'
import { useFloatingParticles } from '@/composables/useFloatingParticles'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'

gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref<HTMLCanvasElement>()
const { scene, camera, init, animate } = useThree(canvasRef)
const { normalizedMouse } = useMouseInteraction()
const { updateRaycaster } = useRaycaster(camera, scene)

// Initialize composables
const { 
  setupMorphingText, 
  startMorphingEffect, 
  animateLetters, 
  addInteractiveEffects, 
  addMagneticEffect, 
  setLetterColor 
} = useMorphingText()

const floatingParticles = ref<any>(null)

// Animation Functions

/**
 * Initialize main entrance animations for hero elements
 * Sets up initial states and runs the main animation timeline
 */
const initializeMainAnimations = () => {
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
  
  // Setup morphing text using composable
  setupMorphingText(letters)
  
  // Start all animations simultaneously
  // Name animation using composable
  animateLetters()
  
  // Start morphing effect after a short delay
  setTimeout(() => {
    startMorphingEffect()
  }, 200)
  
  // All other elements start at the same time as name animation
  tl.to('.hero-subtitle', {
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
  
  // Set green color using composable
  setLetterColor('#32CD32', '0 0 10px rgba(50, 205, 50, 0.3)')
  
  // Magnetic pull effect using composable
  addMagneticEffect()
  
  // Ensure letters are properly styled
  gsap.set(letters, {
    color: '#32CD32',
    textShadow: '0 0 10px rgba(50, 205, 50, 0.3)'
  })
  
  // Interactive name letters on mouse move using composable
  nameContainer = document.querySelector('.name-animation-container')
  if (nameContainer) {
    addInteractiveEffects(nameContainer as HTMLElement)
  }
}

/**
 * Setup hover effects for primary and secondary buttons
 * Adds scale and movement animations on mouse enter/leave
 */
const setupButtonHoverEffects = () => {
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
}

/**
 * Setup continuous scroll indicator animation
 * Creates a pulsing arrow animation at the bottom
 */
const setupScrollIndicator = () => {
  gsap.to('.scroll-arrow', {
    y: 10,
    duration: 1.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
}

/**
 * Setup floating animation for skill tags
 * Creates continuous floating movement with mobile optimization
 */
const setupFloatingSkills = () => {
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
}

/**
 * Setup interactive effects for skill tags
 * Adds magnetic pull effects and touch interactions
 */
const setupSkillTagInteractions = () => {
  const skillTags = document.querySelectorAll('.skill-tag')
  const isMobile = window.innerWidth <= 768
  
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
}

/**
 * Setup 3D floating particles background
 * Initializes Three.js particles using the composable
 */
const setupFloatingParticles = () => {
  setTimeout(() => {
    if (!scene.value || !camera.value) return

    // Initialize floating particles using composable
    floatingParticles.value = useFloatingParticles(scene.value, camera.value, {
      particleCount: 200,
      colors: { r: 0.2, g: 0.8, b: 0.3 }
    })
    
    // Start the floating particles
    floatingParticles.value.start()
    
    // Update mouse interaction in the main animation loop
    animate(() => {
      updateRaycaster(normalizedMouse.value)
    })
  }, 100)
}

/**
 * Cleanup all animations and event listeners
 * Called when component is unmounted to prevent memory leaks
 */
const cleanupAnimations = () => {
  // Cleanup floating particles
  if (floatingParticles.value) {
    floatingParticles.value.cleanup()
  }
  
  // Cleanup morphing text
  // Note: The cleanup function is called automatically in onUnmounted
  
  // Kill all GSAP animations
  gsap.killTweensOf('.hero-subtitle')
  gsap.killTweensOf('.hero-description')
  gsap.killTweensOf('.hero-actions')
  gsap.killTweensOf('.skill-tag')
  gsap.killTweensOf('.scroll-arrow')
  gsap.killTweensOf('.btn-primary')
  gsap.killTweensOf('.btn-secondary')
}

onMounted(() => {
  const cleanup = init()
  
  // Initialize all animations in sequence
  initializeMainAnimations()      // Main entrance animations
  setupButtonHoverEffects()      // Button interactions
  setupScrollIndicator()          // Scroll arrow animation
  setupFloatingSkills()          // Skill tag floating
  setupSkillTagInteractions()    // Skill tag magnetic effects
  setupFloatingParticles()       // 3D background particles
  
  return cleanup
})

onUnmounted(() => {
  cleanupAnimations()
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
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hero-actions .btn-primary,
  .hero-actions .btn-secondary {
    width: auto;
    min-width: 140px;
    text-align: center;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
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
  .hero-actions {
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hero-actions .btn-primary,
  .hero-actions .btn-secondary {
    width: auto;
    min-width: 120px;
    text-align: center;
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }
  
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
