<template>
  <section id="projects" class="projects section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Featured Projects</h2>
      <p class="section-subtitle">
        Explore my latest projects showcasing modern web technologies and innovative solutions.
      </p>
      
      <div class="projects-grid">
        <!-- Weather App Project -->
        <div class="project-card glass-card" data-project="weather">
          <div class="project-image">
            <div class="project-icon">🌤️</div>
          </div>
          <div class="project-content">
            <h3 class="project-title">Weather Info App</h3>
            <p class="project-description">
              A modern weather application built with Vue.js and Tailwind CSS, featuring real-time weather data, 
              location-based forecasts, and a responsive design. Includes current conditions, hourly forecasts, 
              and 7-day predictions with beautiful weather icons and intuitive user interface.
            </p>
            <div class="project-tech">
              <span class="tech-tag">Vue.js</span>
              <span class="tech-tag">Tailwind CSS</span>
              <span class="tech-tag">JavaScript</span>
              <span class="tech-tag">Weather API</span>
            </div>
            <div class="project-links">
              <a href="https://weather-info-leon.netlify.app/" target="_blank" rel="noopener noreferrer" class="btn-live">
                <span>🌐</span>
                Live Demo
              </a>
              <a href="#" class="btn-code" @click="showComingSoon">
                <span>📁</span>
                View Code
              </a>
            </div>
          </div>
        </div>

                 <!-- Oasify Postman Project -->
         <div class="project-card glass-card" data-project="oasify-postman">
           <div class="project-image">
             <div class="project-icon">📦</div>
           </div>
           <div class="project-content">
             <h3 class="project-title">Oasify Postman</h3>
             <p class="project-description">
               An npm package that converts Postman collections to OpenAPI 3.0 specifications with automatic 
               example response injection. Features CLI interface, programmatic API, and customizable metadata 
               for seamless API documentation generation.
             </p>
             <div class="project-tech">
               <span class="tech-tag">Node.js</span>
               <span class="tech-tag">JavaScript</span>
               <span class="tech-tag">CLI</span>
               <span class="tech-tag">OpenAPI</span>
             </div>
             <div class="project-links">
               <a href="https://www.npmjs.com/package/oasify-postman" target="_blank" rel="noopener noreferrer" class="btn-live">
                 <span>📦</span>
                 NPM Package
               </a>
               <a href="#" class="btn-code" @click="showComingSoon">
                 <span>📁</span>
                 View Code
               </a>
             </div>
           </div>
         </div>

         <!-- Coming Soon Project -->
         <div class="project-card glass-card coming-soon" data-project="coming-soon">
           <div class="project-image">
             <div class="project-icon">🚀</div>
           </div>
           <div class="project-content">
             <h3 class="project-title">More Projects Coming Soon</h3>
             <p class="project-description">
               I'm currently working on exciting new projects that showcase modern web technologies, 
               innovative solutions, and cutting-edge development practices. These projects will demonstrate 
               my expertise in full-stack development, cloud architecture, and user experience design.
             </p>
             <div class="project-tech">
               <span class="tech-tag">Full-Stack</span>
               <span class="tech-tag">Cloud</span>
               <span class="tech-tag">Modern UI/UX</span>
               <span class="tech-tag">Innovation</span>
             </div>
             <div class="project-links">
               <a href="#contact" class="btn-contact">
                 <span>💬</span>
                 Let's Connect
               </a>
             </div>
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
  
  // Project cards animation
  gsap.fromTo('.project-card', {
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
    stagger: 0.2,
    scrollTrigger: isMobile ? undefined : {
      trigger: '.projects-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Interactive hover effects (desktop only)
  if (!isMobile) {
    const projectCards = document.querySelectorAll('.project-card')
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
    })
  }
  
  // Mobile-specific touch interactions
  if (isMobile) {
    const projectCards = document.querySelectorAll('.project-card')
    projectCards.forEach(card => {
      card.addEventListener('touchstart', () => {
        gsap.to(card, {
          scale: 0.98,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
      
      card.addEventListener('touchend', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
    })
  }
})

// Function to show coming soon message for code links
const showComingSoon = () => {
  alert('Code repository coming soon! This project is currently being prepared for open source.')
}
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  position: relative;
  padding: 2rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid rgba(144, 238, 144, 0.3);
  display: flex;
  flex-direction: column;
}

.project-card::before {
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

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(144, 238, 144, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.project-image {
  text-align: center;
  margin-bottom: 1.5rem;
}

.project-icon {
  font-size: 4rem;
  opacity: 0.9;
}

.project-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  color: #90EE90;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.project-description {
  color: rgba(232, 245, 232, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(34, 139, 34, 0.3);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: rgba(34, 139, 34, 0.3);
  border-color: rgba(34, 139, 34, 0.5);
  transform: translateY(-2px);
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.btn-live, .btn-code, .btn-contact {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  flex: 1;
  justify-content: center;
}

.btn-live {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
}

.btn-live:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.4);
  background: linear-gradient(135deg, #228B22, #32CD32);
}

.btn-code {
  background: rgba(34, 139, 34, 0.1);
  color: #90EE90;
  border: 1px solid rgba(34, 139, 34, 0.3);
}

.btn-code:hover {
  background: rgba(34, 139, 34, 0.2);
  border-color: rgba(34, 139, 34, 0.5);
  transform: translateY(-2px);
}

.btn-contact {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
  width: 100%;
}

.btn-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.4);
  background: linear-gradient(135deg, #228B22, #32CD32);
}

.coming-soon {
  opacity: 0.8;
}

.coming-soon:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 0 1rem;
  }
  
  .project-card {
    padding: 1.5rem;
  }
  
  .project-title {
    font-size: 1.5rem;
  }
  
  .project-description {
    font-size: 0.95rem;
  }
  
  .project-links {
    flex-direction: column;
  }
  
  .btn-live, .btn-code, .btn-contact {
    width: 100%;
  }
}
</style>
