<template>
  <div class="home">
    <Navigation />
    <Hero />
    <About />
    <Experience />
    <Skills />
    <Projects />
    <Contact />
    <ThreeCursor />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navigation from '@/components/Navigation.vue'
import Hero from '@/components/Hero.vue'
import About from '@/components/About.vue'
import Skills from '@/components/Skills.vue'
import Projects from '@/components/Projects.vue'
import Experience from '@/components/Experience.vue'
import Contact from '@/components/Contact.vue'
import ThreeCursor from '@/components/ThreeCursor.vue'

onMounted(() => {
  // Smooth scroll behavior for navigation links
  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault()
      const id = target.getAttribute('href')?.substring(1)
      const element = document.getElementById(id!)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  document.addEventListener('click', handleAnchorClick)

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
