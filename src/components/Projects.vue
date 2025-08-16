<template>
  <section id="projects" class="projects section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Featured Projects</h2>
      <p class="section-subtitle">
        Exciting projects are in development. Stay tuned for amazing full-stack solutions coming soon!
      </p>
      
      <div class="coming-soon-section">
        <div class="coming-soon-card glass-card">
          <div class="coming-soon-icon">
            <span>🚀</span>
          </div>
          <h3 class="coming-soon-title">Projects Coming Soon</h3>
          <p class="coming-soon-description">
            I'm currently working on some exciting projects that showcase modern web technologies, 
            innovative solutions, and cutting-edge development practices. These projects will demonstrate 
            my expertise in full-stack development, cloud architecture, and user experience design.
          </p>
          <div class="coming-soon-features">
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <span class="feature-text">Modern Tech Stack</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎨</span>
              <span class="feature-text">Beautiful UI/UX</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔒</span>
              <span class="feature-text">Security First</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📱</span>
              <span class="feature-text">Responsive Design</span>
            </div>
          </div>
          <div class="coming-soon-cta">
            <p>Interested in collaborating or have a project in mind?</p>
            <a href="#contact" class="btn-contact">Let's Connect</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await nextTick()
  
  // Check if device is mobile
  const isMobile = window.innerWidth <= 768
  
  // Section title animation
  gsap.fromTo('.section-title', {
    opacity: 0,
    y: 100,
    scale: 0.8
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.2,
    ease: 'elastic.out(1, 0.8)',
    scrollTrigger: isMobile ? undefined : {
      trigger: '.projects',
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Subtitle animation
  gsap.fromTo('.section-subtitle', {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.3,
    scrollTrigger: isMobile ? undefined : {
      trigger: '.section-subtitle',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Coming soon card animation
  gsap.fromTo('.coming-soon-card', {
    opacity: 0,
    y: 100,
    scale: 0.8
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.7)',
    delay: 0.5,
    scrollTrigger: isMobile ? undefined : {
      trigger: '.coming-soon-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Features animation
  gsap.fromTo('.feature-item', {
    opacity: 0,
    x: -30
  }, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.8,
    scrollTrigger: isMobile ? undefined : {
      trigger: '.features-list',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // CTA button animation
  gsap.fromTo('.cta-button', {
    opacity: 0,
    scale: 0.8
  }, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 1.2,
    scrollTrigger: isMobile ? undefined : {
      trigger: '.cta-button',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Interactive hover effects (desktop only)
  if (!isMobile) {
    const comingSoonCard = document.querySelector('.coming-soon-card')
    if (comingSoonCard) {
      comingSoonCard.addEventListener('mouseenter', () => {
        gsap.to(comingSoonCard, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
      
      comingSoonCard.addEventListener('mouseleave', () => {
        gsap.to(comingSoonCard, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
    }
    
    const ctaButton = document.querySelector('.cta-button')
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        })
      })
      
      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        })
      })
    }
  }
  
  // Mobile-specific touch interactions
  if (isMobile) {
    const comingSoonCard = document.querySelector('.coming-soon-card')
    if (comingSoonCard) {
      comingSoonCard.addEventListener('touchstart', () => {
        gsap.to(comingSoonCard, {
          scale: 0.98,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
      
      comingSoonCard.addEventListener('touchend', () => {
        gsap.to(comingSoonCard, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
    }
    
    const ctaButton = document.querySelector('.cta-button')
    if (ctaButton) {
      ctaButton.addEventListener('touchstart', () => {
        gsap.to(ctaButton, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
      
      ctaButton.addEventListener('touchend', () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
    }
  }
})
</script>

<style scoped>
.projects {
  background: linear-gradient(135deg, rgba(26, 47, 26, 0.1) 0%, rgba(10, 26, 10, 0.3) 100%);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  text-align: center;
  color: rgba(232, 245, 232, 0.7);
  font-size: 1.1rem;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.coming-soon-section {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.coming-soon-card {
  position: relative;
  padding: 3rem;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid rgba(144, 238, 144, 0.3);
}

.coming-soon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(144, 238, 144, 0.05), transparent);
  pointer-events: none;
  z-index: 1;
}

.coming-soon-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(144, 238, 144, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.coming-soon-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.coming-soon-title {
  color: #90EE90;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.coming-soon-description {
  color: rgba(232, 245, 232, 0.8);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.coming-soon-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(34, 139, 34, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(34, 139, 34, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(34, 139, 34, 0.15);
  border-color: rgba(34, 139, 34, 0.4);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 2rem;
  opacity: 0.9;
}

.feature-text {
  color: #90EE90;
  font-weight: 600;
  font-size: 0.95rem;
}

.coming-soon-cta {
  padding-top: 2rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
}

.coming-soon-cta p {
  color: rgba(232, 245, 232, 0.7);
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.btn-contact {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.4);
  background: linear-gradient(135deg, #228B22, #32CD32);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .coming-soon-card {
    padding: 2rem;
    margin: 0 1rem;
  }
  
  .coming-soon-title {
    font-size: 1.75rem;
  }
  
  .coming-soon-description {
    font-size: 1rem;
  }
  
  .coming-soon-features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .feature-item {
    padding: 0.75rem;
  }
}
</style>
