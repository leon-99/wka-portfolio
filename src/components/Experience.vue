<template>
  <section id="experience" class="experience section-padding">
    <!-- Desktop Experience (Horizontal Scroll) -->
    <ExperienceDesktop v-if="!isMobile" />
    
    <!-- Mobile Experience (Vertical Layout) -->
    <ExperienceMobile v-else />
    
    <!-- Education Section (Same for both) -->
    <div class="container">
      <div class="education-section">
        <h3 class="education-title text-gradient">Education & Certifications</h3>
        <div class="education-grid">
          <div v-for="edu in education" :key="edu.id" class="education-card glass-card">
            <div class="education-icon">
              <span v-html="edu.icon"></span>
            </div>
            <div class="education-info">
              <h4>{{ edu.title }}</h4>
              <p class="education-institution">{{ edu.institution }}</p>
              <p class="education-year">{{ edu.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ExperienceDesktop from './ExperienceDesktop.vue'
import ExperienceMobile from './ExperienceMobile.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const isMobile = ref(false)

const education = ref([
  {
    id: 1,
    title: 'Computer Science',
    institution: 'Mawbi University, Yangon',
    year: '2016-2020',
    icon: '🎓'
  },
  {
    id: 2,
    title: 'CS50x - Computer Science',
    institution: 'Harvard University (Online)',
    year: '2019',
    icon: '🏆'
  }
])

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  
  // Education section animation
  gsap.fromTo('.education-title', {
    opacity: 0,
    y: 50,
    scale: 0.8
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.education-section',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Education cards animation
  gsap.fromTo('.education-card', {
    opacity: 0,
    y: 100,
    rotationX: -90,
    scale: 0.5
  }, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    scale: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.education-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Education card hover effects
  const educationCards = document.querySelectorAll('.education-card')
  educationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        z: 30,
        duration: 0.4,
        ease: 'power2.out'
      })
      
      const icon = card.querySelector('.education-icon')
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 15,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      }
    })
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.4,
        ease: 'power2.out'
      })
      
      const icon = card.querySelector('.education-icon')
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      }
    })
  })
  
  // Floating animation for education icons
  gsap.to('.education-icon', {
    y: -5,
    rotation: 3,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 1
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.experience {
  background: linear-gradient(135deg, rgba(10, 26, 10, 0.2) 0%, rgba(26, 47, 26, 0.1) 100%);
}

.education-section {
  margin-top: 5rem;
  text-align: center;
}

.education-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.education-card {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
  transition: transform 0.3s ease;
}

.education-card:hover {
  transform: translateY(-5px);
}

.education-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 139, 34, 0.2);
  border-radius: 50%;
  flex-shrink: 0;
}

.education-info h4 {
  color: #90EE90;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.education-institution {
  color: #e8f5e8;
  margin-bottom: 0.25rem;
}

.education-year {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .education-title {
    font-size: 2rem;
  }
  
  .education-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .education-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 0.5rem;
  }
  
  .education-icon {
    display: none;
  }
  
  .education-info h4 {
    font-size: 1rem;
  }
  
  .education-institution {
    font-size: 0.9rem;
  }
  
  .education-year {
    font-size: 0.8rem;
  }
}
</style>
