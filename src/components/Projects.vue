<template>
  <section id="projects" class="projects section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Featured Projects</h2>
      <p class="section-subtitle">
        Explore my latest projects showcasing modern web technologies and innovative solutions.
      </p>
      
      <!-- Filter Buttons -->
      <div class="filter-container">
        <button 
          class="filter-btn" 
          @click="filterProjects('all')"
          :class="{ active: activeFilter === 'all' }"
        >
          <span>🌟</span>
          All Projects
        </button>
        <button 
          class="filter-btn" 
          @click="filterProjects('websites')"
          :class="{ active: activeFilter === 'websites' }"
        >
          <span>🌐</span>
          Websites
        </button>
        <button 
          class="filter-btn" 
          @click="filterProjects('packages')"
          :class="{ active: activeFilter === 'packages' }"
        >
          <span>📦</span>
          Packages
        </button>
      </div>
      
      <div class="projects-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card glass-card" 
          :data-project="project.id"
          :data-category="project.category"
        >
          <!-- Project Header -->
          <div class="project-header">
            <div class="project-icon">
              <Icon v-if="project.iconType === 'iconify'" :icon="project.icon" :class="project.iconClass" />
              <span v-else>{{ project.icon }}</span>
            </div>
            <div class="project-title-section">
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-category">{{ project.category }}</div>
            </div>
          </div>

          <!-- Project Description -->
          <div class="project-description">
            {{ project.description }}
          </div>

          <!-- Project Technologies -->
          <div class="project-tech">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Project Actions -->
          <div class="project-actions">
            <a 
              v-if="project.liveUrl"
              :href="project.liveUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="action-btn live-btn"
            >
              <span>{{ project.liveIcon }}</span>
              {{ project.liveText }}
            </a>
            <a 
              v-if="project.codeUrl"
              :href="project.codeUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="action-btn code-btn"
            >
              <span>{{ project.codeIcon }}</span>
              {{ project.codeText }}
            </a>
            <a 
              v-if="project.contactUrl"
              :href="project.contactUrl" 
              class="action-btn contact-btn"
            >
              <span>{{ project.contactIcon }}</span>
              {{ project.contactText }}
            </a>
            <button 
              v-if="!project.liveUrl && !project.codeUrl && !project.contactUrl"
              @click="showComingSoon"
              class="action-btn code-btn"
            >
              <span>{{ project.codeIcon }}</span>
              {{ project.codeText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Project data structure
interface Project {
  id: string
  title: string
  description: string
  icon: string
  iconType?: 'emoji' | 'iconify'
  iconClass?: string
  category: 'websites' | 'packages'
  technologies: string[]
  liveUrl?: string
  liveIcon: string
  liveText: string
  codeUrl?: string
  codeIcon: string
  codeText: string
  contactUrl?: string
  contactIcon?: string
  contactText?: string
}

// Projects data
const projects = ref<Project[]>([
  {
    id: 'weather-app',
    title: 'Weather Info App',
    description: 'Modern weather app with real-time data, forecasts, and responsive design built with Vue.js and Tailwind CSS.',
    icon: '🌤️',
    iconType: 'emoji',
    category: 'websites',
    technologies: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'Weather API'],
    liveUrl: 'https://weather-info-leon.netlify.app/',
    liveIcon: '🌐',
    liveText: 'Live Demo',
    codeIcon: '📁',
    codeText: 'View Code',
  },
  {
    id: 'solar-system',
    title: 'Solar System Explorer',
    description: 'Interactive solar system visualization with 3D animations and educational content for space exploration.',
    icon: '🪐',
    iconType: 'emoji',
    category: 'websites',
    technologies: ['Vue.js', 'Tailwind CSS', 'JavaScript', '3D Animation'],
    liveUrl: 'https://solar-system-leon.netlify.app/',
    liveIcon: '🌐',
    liveText: 'Live Demo',
    codeIcon: '📁',
    codeText: 'View Code',
  },
  {
    id: 'weeks-of-life',
    title: 'Weeks of Life',
    description: 'Life visualization app that displays your life in weeks with an intuitive weekly grid interface.',
    icon: '📅',
    iconType: 'emoji',
    category: 'websites',
    technologies: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'Life Tracking'],
    liveUrl: 'https://weeks-of-life-leon.netlify.app/',
    liveIcon: '🌐',
    liveText: 'Live Demo',
    codeIcon: '📁',
    codeText: 'View Code',
  },
  {
    id: 'oasify-postman',
    title: 'Oasify Postman',
    description: 'NPM package that converts Postman collections to OpenAPI 3.0 with CLI interface and automatic examples.',
    icon: 'logos:npm',
    iconType: 'iconify',
    iconClass: 'logos',
    category: 'packages',
    technologies: ['Node.js', 'JavaScript', 'CLI', 'OpenAPI'],
    liveUrl: 'https://www.npmjs.com/package/oasify-postman',
    liveIcon: '📦',
    liveText: 'NPM Package',
    codeIcon: '📁',
    codeText: 'View Code',
  },
  {
    id: 'laravel-entity-generator',
    title: 'Laravel Entity Generator',
    description: 'Laravel command that generates complete CRUD operations in service-based architecture.',
    icon: 'devicon:laravel',
    iconType: 'iconify',
    iconClass: 'devicon',
    category: 'packages',
    technologies: ['Laravel', 'PHP', 'CLI', 'CRUD'],
    codeUrl: 'https://github.com/leon-99/laravel-entity-generator',
    liveIcon: '📁',
    liveText: 'View Code',
    codeIcon: '📦',
    codeText: 'Package',
  },
  {
    id: 'plato-vue',
    title: 'Plato Vue',
    description: 'Node.js package for analyzing Vue.js files and generating maintainability reports with CLI interface.',
    icon: 'logos:npm',
    iconType: 'iconify',
    iconClass: 'logos',
    category: 'packages',
    technologies: ['Node.js', 'JavaScript', 'CLI', 'Code Analysis', 'Vue.js'],
    liveUrl: 'https://www.npmjs.com/package/plato-vue',
    liveIcon: '📦',
    liveText: 'NPM Package',
    codeIcon: '📁',
    codeText: 'View Code',
  }
])

// Filter state
const activeFilter = ref('all')

// Computed filtered projects
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeFilter.value)
})

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

// Function to filter projects
const filterProjects = (category: string) => {
  activeFilter.value = category
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
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.filter-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(34, 139, 34, 0.1);
  color: #90EE90;
  border: 2px solid rgba(34, 139, 34, 0.3);
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.filter-btn:hover {
  background: rgba(34, 139, 34, 0.2);
  border-color: rgba(34, 139, 34, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.3);
}

.filter-btn.active {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
  border-color: #32CD32;
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.4);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
}

.project-card {
  position: relative;
  padding: 1.25rem;
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
  transform: translateY(-5px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(144, 238, 144, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.project-icon {
  text-align: center;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.project-icon span {
  font-size: 2.5rem;
  opacity: 0.9;
}

.project-icon :deep(svg) {
  width: 2.5rem;
  height: 2.5rem;
  fill: currentColor;
  color: #90EE90;
  opacity: 0.9;
}

.project-icon.logos :deep(svg) {
  color: #90EE90;
}

.project-icon.devicon :deep(svg) {
  color: #90EE90;
}

.project-title-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.project-title {
  color: #90EE90;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.project-category {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}

.project-description {
  color: rgba(232, 245, 232, 0.8);
  line-height: 1.5;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.tech-tag {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(34, 139, 34, 0.3);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tech-tag:hover {
  background: rgba(34, 139, 34, 0.3);
  border-color: rgba(34, 139, 34, 0.5);
  transform: translateY(-1px);
}

.project-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  flex: 1;
  justify-content: center;
  white-space: nowrap;
}

.live-btn {
  background: rgba(34, 139, 34, 0.1);
  color: #90EE90;
  border: 1px solid rgba(34, 139, 34, 0.2);
}

.live-btn:hover {
  background: rgba(34, 139, 34, 0.15);
  border-color: rgba(34, 139, 34, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.2);
}

.code-btn {
  background: rgba(34, 139, 34, 0.1);
  color: #90EE90;
  border: 1px solid rgba(34, 139, 34, 0.2);
}

.code-btn:hover {
  background: rgba(34, 139, 34, 0.15);
  border-color: rgba(34, 139, 34, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.2);
}

.contact-btn {
  background: rgba(34, 139, 34, 0.1);
  color: #90EE90;
  border: 1px solid rgba(34, 139, 34, 0.2);
  width: 100%;
}

.contact-btn:hover {
  background: rgba(34, 139, 34, 0.15);
  border-color: rgba(34, 139, 34, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.2);
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
  
  .filter-container {
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin: 0 1rem;
  }
  
  .project-card {
    padding: 1rem;
  }
  
  .project-title {
    font-size: 1.2rem;
  }
  
  .project-description {
    font-size: 0.85rem;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}

@media (min-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1400px) {
  .projects-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
}
</style>
