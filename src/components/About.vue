<template>
  <section id="about" class="about section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">About Me</h2>
      
      <div class="about-content">
        <div class="about-text glass-card">
          <h3>🎯 Objective</h3>
          <p>
            Passionate and results-driven Node.js Backend Developer with strong expertise in 
            building scalable APIs and integrating them seamlessly with modern frontend frameworks 
            like Vue.js and React.js.
          </p>
          
          <p>
            Skilled at designing efficient architectures, solving complex backend challenges, 
            and delivering high-performance solutions. Experienced in collaborating across 
            functions and ensuring projects are completed on time and to high standards.
          </p>
          
          <p>
            Committed to continuous learning, clean code practices, and leveraging cutting-edge 
            technologies to build impactful web applications.
          </p>
          
          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-number text-gradient">0+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-item">
              <span class="stat-number text-gradient">0+</span>
              <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat-item">
              <span class="stat-number text-gradient">0%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
        
        <div class="about-visual">
          <ProfileCard
            v-if="shouldShowCard"
            name="Win Khant Aung"
            title="Full Stack Developer"
            handle="winkhantaung"
            status="Available for opportunities"
            contact-text="Get in touch"
            :show-user-info="true"
            :enable-tilt="true"
            :avatar-url="profileImage"
            :mini-avatar-url="profileImage"
            @contact-click="handleContactClick"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick, ref, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProfileCard from './ProfileCard/ProfileCard.vue'
import profileImage from '../assets/images/image.jpg'

gsap.registerPlugin(ScrollTrigger)

const isMobile = ref(false)
const windowWidth = ref(window.innerWidth)

const checkMobile = () => {
  windowWidth.value = window.innerWidth
  isMobile.value = windowWidth.value <= 768
  console.log(`Window width: ${windowWidth.value}px, isMobile: ${isMobile.value}`)
}

// Computed property for mobile detection
const shouldShowCard = computed(() => {
  const result = windowWidth.value > 768
  console.log(`Computed shouldShowCard: width=${windowWidth.value}, result=${result}`)
  return result
})

const handleContactClick = () => {
  // Scroll to contact section or handle contact action
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await nextTick()
  
  // Check mobile immediately
  checkMobile()
  console.log('Initial mobile check:', isMobile.value)
  console.log('Initial shouldShowCard:', shouldShowCard.value)
  
  // Add resize listener
  window.addEventListener('resize', checkMobile)
  
  // Add a small delay to ensure ProfileCard is fully rendered
  setTimeout(() => {
    // Section title animation
    gsap.fromTo('.section-title', {
      opacity: 0,
      y: 100,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.about',
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse'
      }
    })
    
    // About content animation
    gsap.fromTo('.about-text', {
      opacity: 0,
      x: -100,
      rotationY: -15
    }, {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    })
    
    // Visual card animation
    gsap.fromTo('.about-visual', {
      opacity: 0,
      x: 100,
      rotationY: 15,
      scale: 0.8
    }, {
      opacity: 1,
      x: 0,
      rotationY: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    })
    
    // Stats animation
    gsap.fromTo('.stat-item', {
      opacity: 0,
      y: 50,
      scale: 0.5
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    })
    
    // Animate stat numbers with counting effect
    const aboutStats = document.querySelector('.about-stats')
    if (aboutStats) {
      const statNumbers = aboutStats.querySelectorAll('.stat-number')
      console.log('Found stat numbers in About component:', statNumbers.length) // Debug log
      
      // Define the target values
      const targetValues = [6, 30, 100]
      const suffixes = ['+', '+', '%']
      
      statNumbers.forEach((stat, index) => {
        const targetNumber = targetValues[index]
        const suffix = suffixes[index]
        
        console.log(`About Stat ${index}: target=${targetNumber}, suffix="${suffix}"`) // Debug log
        
        // Create a manual counting animation
        gsap.to({}, {
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          onUpdate: function() {
            const progress = this.progress()
            const currentNumber = Math.floor(progress * targetNumber)
            stat.textContent = currentNumber + suffix
          },
          onComplete: function() {
            stat.textContent = targetNumber + suffix
          }
        })
      })
    }
    
    // Interactive hover effects
    const aboutText = document.querySelector('.about-text')
    if (aboutText) {
      aboutText.addEventListener('mouseenter', () => {
        gsap.to('.about-text', {
          scale: 1.02,
          rotationY: 2,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
      
      aboutText.addEventListener('mouseleave', () => {
        gsap.to('.about-text', {
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
    }
  }, 100) // Small delay to ensure ProfileCard is rendered
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.about {
  background: linear-gradient(135deg, rgba(10, 26, 10, 0.3) 0%, rgba(26, 47, 26, 0.1) 100%);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  padding: 2.5rem;
}

.about-text h3 {
  color: #90EE90;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: rgba(232, 245, 232, 0.9);
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-text {
    padding: 2rem;
  }
  
  .about-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
  
  .about-visual {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    position: absolute !important;
    left: -9999px !important;
  }
  
  /* More specific selector */
  .about .about-visual {
    display: none !important;
  }
  
  /* Hide ProfileCard component specifically */
  .about .about-visual .pc-card-wrapper {
    display: none !important;
  }
  
  /* Hide the entire ProfileCard component */
  .pc-card-wrapper {
    display: none !important;
  }
  
  /* Hide any ProfileCard related elements */
  [class*="pc-"] {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .about-visual {
    display: none !important;
  }
  
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>
