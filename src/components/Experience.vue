<template>
  <section id="experience" class="experience section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Professional Experience</h2>
      
      <div class="portal-journey">
        <div class="portal-track" ref="portalTrack">
          <div 
            v-for="(job, index) in experiences" 
            :key="job.id"
            class="portal-scene"
            :data-index="index"
          >

            
            <div class="portal-content glass-card">
              <div class="job-header">
                <div class="company-info">
                  <h3 class="job-title">{{ job.title }}</h3>
                  <h4 class="company-name">{{ job.company }}</h4>
                  <p class="job-location">{{ job.location }}</p>
                  <p class="job-period">{{ job.period }}</p>
                </div>
                <div class="job-status" :class="job.current ? 'current' : 'completed'">
                  {{ job.current ? 'Current' : 'Completed' }}
                </div>
              </div>
              
              <ul class="job-responsibilities">
                <li v-for="responsibility in job.responsibilities" :key="responsibility">
                  {{ responsibility }}
                </li>
              </ul>
              
              <div class="job-technologies">
                <span class="tech-label">Technologies:</span>
                <div class="tech-list">
                  <span 
                    v-for="tech in job.technologies" 
                    :key="tech"
                    class="tech-badge"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              
              <div class="job-achievements" v-if="job.achievements">
                <h5>Key Achievements:</h5>
                <ul>
                  <li v-for="achievement in job.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const portalTrack = ref<HTMLElement>()

const experiences = ref([
  {
    id: 1,
    title: 'Senior Web Developer',
    company: 'Crystawall Technologies LLC',
    location: 'Dubai, UAE',
    period: 'Aug 2024 – Present',
    current: true,
    responsibilities: [
      'Building and maintaining backend APIs using Node.js (Express)',
      'Developing modern, interactive frontends with Vue.js and React.js',
      'Maintaining and updating existing Laravel projects',
      'Collaborating with design and QA teams to implement new features',
      'Deploying and managing applications on AWS with focus on scalability',
      'Writing clean, maintainable code following best practices'
    ],
    technologies: ['Node.js', 'Express.js', 'Vue.js', 'React.js', 'Laravel', 'AWS', 'MySQL', 'PostgreSQL'],
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Successfully migrated 5 legacy projects to modern architecture',
      'Led development of 3 major client projects from conception to deployment'
    ]
  },
  {
    id: 2,
    title: 'Senior Web Developer',
    company: 'Ophir IT Solutions',
    location: 'Yangon, Myanmar',
    period: 'Sep 2021 – Mar 2024',
    current: false,
    responsibilities: [
      'Developed scalable web applications using Laravel and Vue.js',
      'Wrote and maintained backend logic and frontend components',
      'Debugged and resolved technical issues across multiple projects',
      'Used Git for version control and contributed to feature development',
      'Interacted with clients to clarify requirements and implement features',
      'Mentored junior developers and conducted code reviews'
    ],
    technologies: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'MySQL', 'Git', 'Docker', 'Linux'],
    achievements: [
      'Delivered 15+ successful projects for international clients',
      'Reduced bug reports by 60% through improved testing practices',
      'Established coding standards and development workflows for the team'
    ]
  },
  {
    id: 3,
    title: 'Front-End Developer',
    company: 'EWhale Myanmar',
    location: 'Yangon, Myanmar',
    period: 'Feb 2020 – Aug 2021',
    current: false,
    responsibilities: [
      'Built responsive and cross-browser-compatible UI components',
      'Collaborated with backend developers and designers for complete solutions',
      'Implemented SEO best practices and performance optimization',
      'Used Git for version control and participated in agile sprints',
      'Created interactive user interfaces with modern JavaScript',
      'Optimized websites for mobile devices and various screen sizes'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'SASS', 'Git', 'Webpack'],
    achievements: [
      'Improved website loading speed by 50% through optimization',
      'Successfully delivered 20+ responsive websites',
      'Achieved 95+ Google PageSpeed scores on all projects'
    ]
  }
])

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

onMounted(async () => {
  await nextTick()
  
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
    scrollTrigger: {
      trigger: '.experience',
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Create horizontal scroll portal journey
  const portalScenes = document.querySelectorAll('.portal-scene')
  const totalScenes = portalScenes.length
  
  if (portalTrack.value && totalScenes > 0) {
    // Set initial position to show first card centered
    gsap.set(portalScenes, { xPercent: 0 })
    
    // Make first card immediately visible and centered
    gsap.set(portalScenes[0], { opacity: 1, scale: 1 })
    const firstContent = portalScenes[0]?.querySelector('.portal-content')
    if (firstContent) {
      // Set first card content visible immediately
      gsap.set(firstContent, { opacity: 1, scale: 1, y: 0 })
      
      // Animate first card content when section comes into view
      gsap.fromTo(firstContent, {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portal-journey',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })
    }
    
    // Initialize other cards as ready but not active
    portalScenes.forEach((scene, index) => {
      if (index > 0) {
        gsap.set(scene, { opacity: 1 })
        const content = scene.querySelector('.portal-content')
        if (content) {
          gsap.set(content, { opacity: 0.7, scale: 0.96, y: 10 })
        }
      }
    })
    
    // Set up horizontal scroll animation that keeps cards centered
    const horizontalTween = gsap.to(portalScenes, {
      x: () => -(window.innerWidth * (totalScenes - 1)),
      ease: 'none',
      scrollTrigger: {
        trigger: '.portal-journey',
        pin: true,
        scrub: 1.2,
        snap: false, // Disable snapping to prevent right-side pulling
        start: 'top top',
        end: () => `+=${window.innerHeight * (totalScenes + 1)}`, // Extra scroll time
        onStart: () => {
          // Ensure first card is fully visible when animation starts
          const firstContent = portalScenes[0]?.querySelector('.portal-content')
          if (firstContent) {
            gsap.to(firstContent, { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
        },
        onUpdate: (self) => {
          // Calculate which scene is most visible with smoother transitions
          const progress = self.progress
          let currentIndex = 0
          
          // Smoother transitions between cards
          if (progress < 0.33) {
            currentIndex = 0 // First card
          } else if (progress < 0.66) {
            currentIndex = 1 // Second card
          } else {
            currentIndex = 2 // Third card
          }
          
          // Animate content effects for current scene
          portalScenes.forEach((scene, index) => {
            const content = scene.querySelector('.portal-content')
            
            if (index === currentIndex) {
              // Active content effects - keep perfectly centered
              gsap.to(content, { 
                opacity: 1, 
                scale: 1, 
                duration: 0.3,
                ease: 'power2.out'
              })
            } else {
              // Inactive content effects
              gsap.to(content, { 
                opacity: 0.6, 
                scale: 0.95, 
                duration: 0.3,
                ease: 'power2.out'
              })
            }
          })
        }
      }
    })
    
    // Individual scene animations
    portalScenes.forEach((scene) => {
      const content = scene.querySelector('.portal-content')
      const glow = scene.querySelector('.portal-glow')
      const particles = scene.querySelector('.portal-particles')
      
      // Portal glow entrance animation
      gsap.fromTo(glow, {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 0.3,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scene,
          start: 'left 80%',
          toggleActions: 'play none none reverse',
          containerAnimation: horizontalTween
        }
      })
      
      // Portal particles entrance animation
      gsap.fromTo(particles, {
        scale: 0,
        opacity: 0,
        rotation: -180
      }, {
        scale: 1,
        opacity: 0.5,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: scene,
          start: 'left 75%',
          toggleActions: 'play none none reverse',
          containerAnimation: horizontalTween
        }
      })
      
      // Content entrance animation
      gsap.fromTo(content, {
        opacity: 0,
        y: 100,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scene,
          start: 'left 80%',
          toggleActions: 'play none none reverse',
          containerAnimation: horizontalTween
        }
      })
      
      
    })
  }
  
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
      gsap.to(icon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
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
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
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
</script>

<style scoped>
.experience {
  background: linear-gradient(135deg, rgba(10, 26, 10, 0.2) 0%, rgba(26, 47, 26, 0.1) 100%);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.portal-journey {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.portal-track {
  display: flex;
  width: calc(100vw * 3); /* Exact width for 3 experiences */
  height: 100%;
}

.portal-scene {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

.portal-content {
  width: 85%;
  max-width: 850px;
  padding: 2.5rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(50, 205, 50, 0.3);
  border-radius: 20px;
  background: rgba(10, 26, 10, 0.85);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.job-title {
  color: #90EE90;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.company-name {
  color: #e8f5e8;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.job-location {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
}

.job-period {
  color: #90EE90;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
  text-shadow: 0 0 10px rgba(144, 238, 144, 0.5);
}

.job-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.job-status.current {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
  box-shadow: 0 0 20px rgba(50, 205, 50, 0.3);
}

.job-status.completed {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  border: 1px solid rgba(34, 139, 34, 0.3);
}

.job-responsibilities {
  list-style: none;
  margin-bottom: 1.5rem;
}

.job-responsibilities li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: rgba(232, 245, 232, 0.9);
  line-height: 1.5;
}

.job-responsibilities li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: #32CD32;
  font-size: 0.8rem;
}

.job-technologies {
  margin-bottom: 1.5rem;
}

.tech-label {
  color: #90EE90;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(34, 139, 34, 0.3);
}

.job-achievements {
  padding-top: 1rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
}

.job-achievements h5 {
  color: #90EE90;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.job-achievements ul {
  list-style: none;
}

.job-achievements li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.25rem;
  color: rgba(232, 245, 232, 0.8);
  font-size: 0.9rem;
}

.job-achievements li::before {
  content: '⭐';
  position: absolute;
  left: 0;
  font-size: 0.8rem;
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
  .section-title {
    font-size: 2.5rem;
  }
  
  .portal-scene {
    padding: 2rem 1rem;
  }
  
  .portal-content {
    width: 95%;
    max-width: none;
    padding: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .job-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .education-grid {
    grid-template-columns: 1fr;
  }
  
  .education-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .portal-content {
    width: 98%;
    max-width: none;
    padding: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .job-period {
    font-size: 0.8rem;
  }
}
</style>
