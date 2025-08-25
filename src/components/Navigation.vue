<template>
  <nav class="nav glass" :class="{ 'nav-scrolled': isScrolled }">
    <div class="nav-container">
      <div class="nav-brand">
        <span class="text-gradient">WKA</span>
      </div>
      
      <ul class="nav-links" :class="{ 'nav-open': isMenuOpen }">
        <li><a href="#home" @click="handleNavClick">Home</a></li>
        <li><a href="#about" @click="handleNavClick">About</a></li>
        <li><a href="#experience" @click="handleNavClick">Experience</a></li>
        <li><a href="#projects" @click="handleNavClick">Projects</a></li>
        <li><a href="#skills" @click="handleNavClick">Skills</a></li>
        <li><a href="#mentorship" @click="handleNavClick">Mentorship</a></li>
        <li><a href="#contact" @click="handleNavClick">Contact</a></li>
      </ul>
      
      <button class="nav-toggle" @click="toggleMenu" :class="{ active: isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  // Animate menu toggle
  if (isMenuOpen.value) {
    // Opening animation
    gsap.fromTo('.nav-links', {
      opacity: 0,
      y: -20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.7)'
    })
    
    // Stagger mobile menu items
    gsap.fromTo('.nav-links li', {
      x: -50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 0.1
    })
  } else {
    // Closing animation
    gsap.to('.nav-links', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in'
    })
  }
}

const handleNavClick = (event: Event) => {
  // Prevent default anchor behavior
  event.preventDefault()
  
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  
  if (href && href.startsWith('#')) {
    const targetElement = document.querySelector(href)
    if (targetElement) {
      // Smooth scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      
      // Close menu after a short delay to allow smooth scroll
      setTimeout(() => {
        isMenuOpen.value = false
        
        // Animate menu closing
        gsap.to('.nav-links', {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        })
      }, 300)
    }
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  
  await nextTick()
  
  // Initial navigation animation
  gsap.fromTo('.nav', {
    y: -100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'back.out(1.7)'
  })
  
  // Animate navigation links
  gsap.fromTo('.nav-links li', {
    y: -20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.3
  })
  
  // Brand animation
  gsap.fromTo('.nav-brand', {
    scale: 0,
    rotation: -180
  }, {
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.2
  })
  
  // Enhanced link hover effects (desktop only)
  if (window.innerWidth > 768) {
    const navLinks = document.querySelectorAll('.nav-links a')
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.1,
          color: '#90EE90',
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        
        // Animate the underline
        gsap.to(link.querySelector('::after') || link, {
          width: '100%',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          color: '#e8f5e8',
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
      
      // Click animation
      link.addEventListener('click', () => {
        gsap.to(link, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        })
      })
    })
  }
})

// Watch for scroll changes and animate navigation
watch(isScrolled, (newValue) => {
  if (newValue) {
    gsap.to('.nav', {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(25px)',
      padding: '0.75rem 0',
      duration: 0.3,
      ease: 'power2.out'
    })
    
    gsap.to('.nav-brand', {
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.out'
    })
  } else {
    gsap.to('.nav', {
      backgroundColor: 'rgba(10, 26, 10, 0.7)',
      backdropFilter: 'blur(15px)',
      padding: '1rem 0',
      duration: 0.3,
      ease: 'power2.out'
    })
    
    gsap.to('.nav-brand', {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(34, 139, 34, 0.1);
  background: rgba(10, 26, 10, 0.7);
  backdrop-filter: blur(15px);
}

.nav-scrolled {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #e8f5e8;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #32CD32, #228B22);
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: #90EE90;
}

.nav-links a:hover::after {
  width: 100%;
}

/* Scrolled state text colors */
.nav-scrolled .nav-brand {
  color: #e8f5e8;
}

.nav-scrolled .nav-links a {
  color: #e8f5e8;
}

.nav-scrolled .nav-links a:hover {
  color: #90EE90;
}

.nav-scrolled .nav-toggle span {
  background: #e8f5e8;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle span {
  width: 25px;
  height: 2px;
  background: #90EE90;
  margin: 3px 0;
  transition: 0.3s;
  transform-origin: center;
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-toggle {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 26, 10, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border-top: 1px solid rgba(34, 139, 34, 0.2);
  }
  
  .nav-links.nav-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-links a {
    font-size: 1.1rem;
    text-align: center;
  }
}
</style>
