<template>
  <div class="home">
    <Navigation />
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Mentorship />
    <LinkPreview />
    <Contact />
    <Footer />
    <ThreeCursor />
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Navigation from '@/components/Navigation.vue'
import Hero from '@/components/Hero.vue'
import About from '@/components/About.vue'
import Skills from '@/components/Skills.vue'
import Projects from '@/components/Projects.vue'
import Experience from '@/components/Experience.vue'
import Mentorship from '@/components/Mentorship.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
import ThreeCursor from '@/components/ThreeCursor.vue'
import LinkPreview from '@/components/LinkPreview.vue'
import { usePageTransitions } from '@/composables/usePageTransitions'

gsap.registerPlugin(ScrollToPlugin)

const {
  scrollToSection,
  initPageEntrance,
  initSectionReveals,
  initCursorTrail,
  initMagneticButtons,
  initTextReveal
} = usePageTransitions()

onMounted(async () => {
  await nextTick()
  
  // Skip entrance animation to avoid scroll conflicts
  // initPageEntrance()
  
  // Initialize page transition effects immediately
  setTimeout(() => {
    initSectionReveals()
    initCursorTrail()
    initMagneticButtons()
    // initTextReveal() // Disabled to fix section titles
  }, 500) // Reduced delay
  
  // Simple smooth scroll behavior for navigation links
  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault()
      e.stopPropagation()
      
      const id = target.getAttribute('href')?.substring(1)
      const element = document.getElementById(id!)
      if (element) {
        // Kill any existing scroll animations first
        gsap.killTweensOf(window)
        
        // Use simple GSAP scroll
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: element,
            offsetY: 80
          },
          ease: 'power2.inOut'
        })
      }
    }
  }

  // Add event listener with a small delay to ensure DOM is ready
  setTimeout(() => {
    document.addEventListener('click', handleAnchorClick, { capture: true })
  }, 100)

  return () => {
    document.removeEventListener('click', handleAnchorClick)
  }
})
</script>

<style scoped>
.home {
  position: relative;
  overflow-x: hidden;
}
</style>
