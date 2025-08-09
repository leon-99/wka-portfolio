<template>
  <section id="projects" class="projects section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Featured Projects</h2>
      <p class="section-subtitle">
        A showcase of my latest work in full-stack development, featuring modern technologies and innovative solutions.
      </p>
      
      <div class="projects-grid">
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="project-card glass-card"
          :class="{ 'featured': project.featured, 'hovered': hoveredProject === index }"
          @mouseenter="setHoveredProject(index)"
          @mouseleave="setHoveredProject(-1)"
          :ref="el => { if (el) projectRefs[index] = el }"
        >
          <div class="project-image">
            <div class="project-preview" :style="{ background: project.gradient }">
              <div class="project-icon">
                <span v-html="project.icon"></span>
              </div>
              <div class="project-tech-preview">
                <div 
                  v-for="tech in project.technologies.slice(0, 3)" 
                  :key="tech"
                  class="tech-dot"
                  :title="tech"
                ></div>
              </div>
            </div>
            <div class="project-overlay">
              <div class="project-actions">
                <a :href="project.demo" class="btn-demo" target="_blank" rel="noopener">
                  <span>🚀</span> Live Demo
                </a>
                <a :href="project.github" class="btn-code" target="_blank" rel="noopener">
                  <span>💻</span> Code
                </a>
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <span v-if="project.featured" class="featured-badge">⭐ Featured</span>
            </div>
            
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-technologies">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            
            <div class="project-stats">
              <div class="stat">
                <span class="stat-icon">⚡</span>
                <span class="stat-text">{{ project.performance }}</span>
              </div>
              <div class="stat">
                <span class="stat-icon">📱</span>
                <span class="stat-text">{{ project.responsive ? 'Responsive' : 'Desktop' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, markRaw } from 'vue'
import { useThree } from '@/composables/useThree'
import { useMouseInteraction } from '@/composables/useMouseInteraction'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hoveredProject = ref(-1)
const projectRefs = ref<HTMLElement[]>([])
const projectCanvases = ref<{ [key: number]: HTMLCanvasElement }>({})
const projectScenes = ref<{ [key: number]: any }>({})

const { normalizedMouse } = useMouseInteraction()

const projects = ref([
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard. Built with microservices architecture for scalability.',
    technologies: ['Node.js', 'Vue.js', 'MongoDB', 'Stripe API', 'Redis', 'Docker'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '🛒',
    demo: 'https://example-ecommerce.com',
    github: 'https://github.com/leon-99/ecommerce-platform',
    featured: true,
    performance: '95% Lighthouse',
    responsive: true
  },
  {
    id: 2,
    title: 'Real-Time Chat Application',
    description: 'Scalable chat application with WebSocket connections, file sharing, and group messaging. Features end-to-end encryption and offline support.',
    technologies: ['Node.js', 'Socket.io', 'React.js', 'PostgreSQL', 'JWT', 'AWS S3'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '💬',
    demo: 'https://example-chat.com',
    github: 'https://github.com/leon-99/realtime-chat',
    featured: false,
    performance: '92% Lighthouse',
    responsive: true
  },
  {
    id: 3,
    title: 'Task Management Dashboard',
    description: 'Comprehensive project management tool with Kanban boards, time tracking, and team collaboration features. Includes advanced analytics and reporting.',
    technologies: ['Vue.js', 'Express.js', 'MySQL', 'Chart.js', 'Vuex', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    icon: '📊',
    demo: 'https://example-taskboard.com',
    github: 'https://github.com/leon-99/task-dashboard',
    featured: true,
    performance: '98% Lighthouse',
    responsive: true
  },
  {
    id: 4,
    title: 'API Gateway & Microservices',
    description: 'Robust API gateway with rate limiting, authentication, and load balancing. Orchestrates multiple microservices with health monitoring.',
    technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'Nginx', 'Prometheus'],
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    icon: '🔧',
    demo: 'https://api-gateway-demo.com',
    github: 'https://github.com/leon-99/api-gateway',
    featured: false,
    performance: '99% Uptime',
    responsive: false
  },
  {
    id: 5,
    title: 'Social Media Analytics',
    description: 'Advanced analytics platform for social media insights with AI-powered sentiment analysis and automated reporting features.',
    technologies: ['React.js', 'Python', 'TensorFlow', 'D3.js', 'AWS Lambda', 'DynamoDB'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: '📈',
    demo: 'https://social-analytics.com',
    github: 'https://github.com/leon-99/social-analytics',
    featured: true,
    performance: '94% Lighthouse',
    responsive: true
  },
  {
    id: 6,
    title: 'IoT Device Manager',
    description: 'Comprehensive IoT device management platform with real-time monitoring, remote control, and predictive maintenance algorithms.',
    technologies: ['Node.js', 'MQTT', 'InfluxDB', 'Grafana', 'Vue.js', 'WebSocket'],
    gradient: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
    icon: '🌐',
    demo: 'https://iot-manager.com',
    github: 'https://github.com/leon-99/iot-manager',
    featured: false,
    performance: '96% Lighthouse',
    responsive: true
  }
])

const setHoveredProject = (index: number) => {
  hoveredProject.value = index
}

onMounted(async () => {
  await nextTick()
  
  // Section title and subtitle animation
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
      trigger: '.projects',
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none reverse'
    }
  })
  
  gsap.fromTo('.section-subtitle', {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.projects',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    delay: 0.3
  })
  
  // Project cards animation
  gsap.fromTo('.project-card', {
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
      trigger: '.projects-grid',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Project content animations
  gsap.fromTo('.project-title', {
    opacity: 0,
    x: -30
  }, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
  
  gsap.fromTo('.project-description', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    delay: 0.2
  })
  
  // Tech tags animation
  gsap.fromTo('.tech-tag', {
    opacity: 0,
    scale: 0,
    rotation: -180
  }, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.project-technologies',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Featured badge animation
  gsap.fromTo('.featured-badge', {
    opacity: 0,
    scale: 0,
    rotation: -360
  }, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.8)',
    scrollTrigger: {
      trigger: '.featured-badge',
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Project stats animation
  gsap.fromTo('.stat', {
    opacity: 0,
    x: -20,
    scale: 0.8
  }, {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.project-stats',
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Enhanced project card hover effects
  const projectCards = document.querySelectorAll('.project-card')
  projectCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.03,
        rotationY: 3,
        z: 50,
        duration: 0.4,
        ease: 'power2.out'
      })
      
      // Animate project icon
      const icon = card.querySelector('.project-icon')
      gsap.to(icon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      
      // Animate tech dots
      const techDots = card.querySelectorAll('.tech-dot')
      gsap.to(techDots, {
        scale: 1.5,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      })
      
      // Glow effect for featured projects
      if (card.classList.contains('featured')) {
        gsap.to(card, {
          boxShadow: '0 25px 50px rgba(255, 215, 0, 0.3), 0 0 40px rgba(144, 238, 144, 0.4)',
          duration: 0.3
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
      
      const icon = card.querySelector('.project-icon')
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      
      const techDots = card.querySelectorAll('.tech-dot')
      gsap.to(techDots, {
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      })
      
      if (card.classList.contains('featured')) {
        gsap.to(card, {
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(34, 139, 34, 0.3)',
          duration: 0.3
        })
      }
    })
  })
  
  // Action buttons animation
  const actionButtons = document.querySelectorAll('.btn-demo, .btn-code')
  actionButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.1,
        y: -3,
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
    
    button.addEventListener('click', () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      })
    })
  })
  
  // Continuous floating animation for project cards
  gsap.to('.project-card', {
    y: -5,
    duration: 4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.5
  })
  
  // Tech tag hover effects
  const techTags = document.querySelectorAll('.tech-tag')
  techTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
    
    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
  })
  
  // Featured badge pulsing animation
  gsap.to('.featured-badge', {
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
  
  // 3D hover effects removed for cleaner look
  // projectRefs.value.forEach((card, index) => {
  //   // ... Complex 3D Three.js code removed
  // })
  console.log('3D project effects disabled for cleaner appearance')
})

// 3D hover watch effects removed
// const watchHover = () => { ... }
// const unwatchHover = ref<Function>()
// onMounted(() => { unwatchHover.value = watch(hoveredProject, watchHover) })


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
  max-width: 1400px;
  margin: 0 auto;
}

.project-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover,
.project-card.hovered {
  transform: translateY(-10px) rotateX(2deg);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(34, 139, 34, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.project-card.hovered {
  transform: translateY(-15px) rotateX(3deg) scale(1.02);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(34, 139, 34, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.15);
}

.project-card.featured {
  border: 2px solid rgba(144, 238, 144, 0.3);
}

.project-card.featured::before {
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

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-icon {
  font-size: 4rem;
  opacity: 0.8;
}

.project-tech-preview {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.tech-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.btn-demo,
.btn-code {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-demo {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
}

.btn-code {
  background: transparent;
  color: #90EE90;
  border: 2px solid #32CD32;
}

.btn-demo:hover,
.btn-code:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 139, 34, 0.3);
}

.project-content {
  padding: 1.5rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  color: #90EE90;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.featured-badge {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-description {
  color: rgba(232, 245, 232, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(34, 139, 34, 0.3);
}

.project-stats {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
}

.stat-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-content {
    padding: 1rem;
  }
  
  .project-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn-demo,
  .btn-code {
    text-align: center;
    justify-content: center;
  }
  
  .project-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
