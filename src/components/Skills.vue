<template>
  <section id="skills" class="skills section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Skills & Technologies</h2>
      
      <div class="skills-content">
        <div class="skills-categories">
          <div 
            v-for="(category, index) in skillCategories" 
            :key="category.title"
            class="skill-category"
          >
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="skills-grid">
              <div 
                v-for="skill in category.skills" 
                :key="skill.name"
                class="skill-item"
                :class="{ 'featured': skill.featured }"
              >
                <div class="skill-icon">
                  <Icon :icon="skill.icon" :class="skill.iconClass" />
                </div>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = ref([
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: 'devicon:nodejs', iconClass: 'devicon', featured: true },
      { name: 'Express.js', icon: 'devicon:express', iconClass: 'devicon', featured: true },
      { name: 'PHP', icon: 'devicon:php', iconClass: 'devicon', featured: false },
      { name: 'Laravel', icon: 'devicon:laravel', iconClass: 'devicon', featured: false },
      { name: 'RESTful APIs', icon: 'mdi:api', iconClass: 'mdi', featured: true },
      { name: 'GraphQL', icon: 'mdi:graphql', iconClass: 'mdi', featured: false },
      { name: 'Database Design', icon: 'mdi:database', iconClass: 'mdi', featured: true },
      { name: 'MongoDB', icon: 'devicon:mongodb', iconClass: 'devicon', featured: false },
      { name: 'PostgreSQL', icon: 'devicon:postgresql', iconClass: 'devicon', featured: false },
      { name: 'Redis', icon: 'devicon:redis', iconClass: 'devicon', featured: false }
    ]
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'Vue.js', icon: 'devicon:vuejs', iconClass: 'devicon', featured: true },
      { name: 'React.js', icon: 'devicon:react', iconClass: 'devicon', featured: true },
      { name: 'JavaScript', icon: 'devicon:javascript', iconClass: 'devicon', featured: true },
      { name: 'TypeScript', icon: 'devicon:typescript', iconClass: 'devicon', featured: true },
      { name: 'HTML5', icon: 'devicon:html5', iconClass: 'devicon', featured: false },
      { name: 'CSS3', icon: 'devicon:css3', iconClass: 'devicon', featured: false },
      { name: 'Tailwind CSS', icon: 'devicon:tailwindcss', iconClass: 'devicon', featured: false },
      { name: 'Sass/SCSS', icon: 'devicon:sass', iconClass: 'devicon', featured: false },
      { name: 'Webpack', icon: 'devicon:webpack', iconClass: 'devicon', featured: false },
      { name: 'Vite', icon: 'devicon:vitejs', iconClass: 'devicon', featured: false }
    ]
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: 'logos:aws', iconClass: 'logos', featured: true },
      { name: 'Docker', icon: 'devicon:docker', iconClass: 'devicon', featured: true },
      { name: 'CI/CD', icon: 'mdi:git', iconClass: 'mdi', featured: true },
      { name: 'Git', icon: 'devicon:git', iconClass: 'devicon', featured: true },
      { name: 'Linux', icon: 'devicon:linux', iconClass: 'devicon', featured: false },
      { name: 'Nginx', icon: 'devicon:nginx', iconClass: 'devicon', featured: false },
      { name: 'Monitoring', icon: 'mdi:monitor-dashboard', iconClass: 'mdi', featured: false }
    ]
  },
  {
    title: 'Code Quality & Metrics',
    skills: [
      { name: 'Cyclomatic Complexity', icon: 'mdi:code-braces', iconClass: 'mdi', featured: true },
      { name: 'Maintainability Index', icon: 'mdi:chart-line', iconClass: 'mdi', featured: true },
      { name: 'Lines of Code', icon: 'mdi:format-list-numbered', iconClass: 'mdi', featured: false },
      { name: 'Code Coverage', icon: 'mdi:shield-check', iconClass: 'mdi', featured: true },
      { name: 'Technical Debt', icon: 'mdi:alert-circle', iconClass: 'mdi', featured: false },
      { name: 'Code Review', icon: 'mdi:eye-check', iconClass: 'mdi', featured: true },
      { name: 'Static Analysis', icon: 'mdi:magnify-scan', iconClass: 'mdi', featured: false },
      { name: 'Performance Profiling', icon: 'mdi:speedometer', iconClass: 'mdi', featured: false }
    ]
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'IDEs', icon: 'devicon:vscode', iconClass: 'devicon', featured: false },
      { name: 'Prompt Engineering', icon: 'mdi:robot', iconClass: 'mdi', featured: true },
      { name: 'MCP', icon: 'mdi:connection', iconClass: 'mdi', featured: true },
      { name: 'AI Agents', icon: 'mdi:brain', iconClass: 'mdi', featured: true },
      { name: 'Postman', icon: 'devicon:postman', iconClass: 'devicon', featured: false },
      { name: 'Figma', icon: 'devicon:figma', iconClass: 'devicon', featured: false },
      { name: 'Obsidian', icon: 'devicon:obsidian', iconClass: 'devicon', featured: false },
      { name: 'Slack', icon: 'devicon:slack', iconClass: 'devicon', featured: false },
      { name: 'Unit Tests', icon: 'mdi:test-tube', iconClass: 'mdi', featured: true },
      { name: 'Integration Tests', icon: 'mdi:test-tube', iconClass: 'mdi', featured: true },
      { name: 'Problem Solving', icon: 'mdi:puzzle', iconClass: 'mdi', featured: true }
    ]
  }
])

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
      trigger: '.skills',
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Category titles animation
  gsap.fromTo('.category-title', {
    opacity: 0,
    x: -50
  }, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: isMobile ? undefined : {
      trigger: '.skills-categories',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Skills grid animation
  gsap.fromTo('.skill-item', {
    opacity: 0,
    scale: 0,
    rotation: -180
  }, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: 'back.out(1.7)',
    scrollTrigger: isMobile ? undefined : {
      trigger: '.skills-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Featured skills highlight animation (desktop only)
  if (!isMobile) {
    gsap.fromTo('.skill-item.featured', {
      boxShadow: '0 0 0 rgba(144, 238, 144, 0)'
    }, {
      boxShadow: '0 0 20px rgba(144, 238, 144, 0.3)',
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: '.skill-item.featured',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    })
  }
  
  // Interactive hover effects for skill items (desktop only)
  if (!isMobile) {
    const skillItems = document.querySelectorAll('.skill-item')
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.1,
          y: -5,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        
        // Animate skill icon
        const icon = item.querySelector('.skill-icon')
        gsap.to(icon, {
          scale: 1.2,
          rotation: 15,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        
        const icon = item.querySelector('.skill-icon')
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
    })
  }
  
  // Mobile-specific touch interactions
  if (isMobile) {
    const skillItems = document.querySelectorAll('.skill-item')
    skillItems.forEach(item => {
      item.addEventListener('touchstart', () => {
        gsap.to(item, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
      
      item.addEventListener('touchend', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
    })
  }
})
</script>

<style scoped>
.skills {
  background: linear-gradient(135deg, rgba(26, 47, 26, 0.1) 0%, rgba(10, 26, 10, 0.3) 100%);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.skills-content {
  max-width: 1400px;
  margin: 0 auto;
}

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category-title {
  color: #90EE90;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: 1rem;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #90EE90, transparent);
  border-radius: 2px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: rgba(34, 139, 34, 0.1);
  border: 1px solid rgba(34, 139, 34, 0.2);
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 140px;
  height: 140px;
  text-align: center;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.skill-item:hover {
  background: rgba(34, 139, 34, 0.15);
  border-color: rgba(34, 139, 34, 0.4);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 139, 34, 0.2);
}

.skill-item.featured {
  background: rgba(144, 238, 144, 0.15);
  border-color: rgba(144, 238, 144, 0.4);
  box-shadow: 0 0 20px rgba(144, 238, 144, 0.2);
}

.skill-icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.skill-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
  color: #90EE90;
}

.skill-icon.devicon :deep(svg) {
  color: #90EE90;
}

.skill-icon.mdi :deep(svg) {
  color: #90EE90;
}

.skill-icon.logos :deep(svg) {
  color: #90EE90;
}

.skill-name {
  color: #e8f5e8;
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
  padding: 0 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Special handling for Code Quality & Metrics category on desktop */
.skill-category:nth-child(4) .skill-item {
  width: 150px;
  height: 150px;
}

.skill-category:nth-child(4) .skill-name {
  font-size: 0.8rem;
  -webkit-line-clamp: 4;
}

@media (max-width: 1200px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
  
  .skill-item {
    padding: 1rem 0.75rem;
    width: 120px;
    height: 120px;
  }
  
  .skill-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .skill-name {
    font-size: 0.8rem;
    -webkit-line-clamp: 3;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  
  .skills-content {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .skills-categories {
    gap: 3rem;
  }
  
  .skill-category {
    gap: 1.5rem;
  }
  
  .category-title {
    font-size: 1.75rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 1rem;
    padding: 0 0.5rem;
    justify-items: center;
  }
  
  .skill-item {
    padding: 0.75rem 0.5rem;
    width: 90px;
    height: 90px;
    margin: 0.25rem;
    overflow: hidden;
  }
  
  .skill-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .skill-name {
    font-size: 0.7rem;
    line-height: 1.1;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
    padding: 0 0.1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  /* Special handling for Code Quality & Metrics category */
  .skill-category:nth-child(4) .skill-item {
    width: 95px;
    height: 95px;
  }
  
  .skill-category:nth-child(4) .skill-name {
    font-size: 0.65rem;
    -webkit-line-clamp: 3;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
  
  .skills-content {
    padding: 0 0.5rem;
  }
  
  .skills-categories {
    gap: 2.5rem;
  }
  
  .skill-category {
    gap: 1.25rem;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 0 0.25rem;
  }
  
  .skill-item {
    padding: 0.5rem 0.25rem;
    width: 80px;
    height: 80px;
    margin: 0.25rem;
    overflow: hidden;
  }
  
  .skill-icon {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .skill-name {
    font-size: 0.65rem;
    line-height: 1.1;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
    padding: 0 0.1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  /* Special handling for Code Quality & Metrics category */
  .skill-category:nth-child(4) .skill-item {
    width: 85px;
    height: 85px;
  }
  
  .skill-category:nth-child(4) .skill-name {
    font-size: 0.6rem;
    -webkit-line-clamp: 3;
  }
}

@media (max-width: 360px) {
  .skills-content {
    padding: 0 0.25rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0 0.5rem;
  }
  
  .skill-item {
    width: 90px;
    height: 90px;
    margin: 0.25rem;
    padding: 0.5rem 0.25rem;
  }
  
  .skill-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .skill-name {
    font-size: 0.7rem;
    line-height: 1.1;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
    padding: 0 0.1rem;
  }
}
</style>
