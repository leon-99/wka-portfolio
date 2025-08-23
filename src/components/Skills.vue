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
  
  // Simple fade-in animation with earlier trigger
  gsap.fromTo('.section-title', {
    opacity: 0,
    y: 30
  }, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: isMobile ? undefined : {
      trigger: '.skills',
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Category titles animation with earlier trigger
  gsap.fromTo('.category-title', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: isMobile ? undefined : {
      trigger: '.skills-categories',
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Skills grid animation with earlier trigger
  gsap.fromTo('.skill-item', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: 'power2.out',
    scrollTrigger: isMobile ? undefined : {
      trigger: '.skills-grid',
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    }
  })
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  justify-items: stretch;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(34, 139, 34, 0.08);
  border: 1px solid rgba(34, 139, 34, 0.15);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.skill-item:hover {
  background: rgba(34, 139, 34, 0.15);
  border-color: rgba(34, 139, 34, 0.4);
  box-shadow: 0 4px 15px rgba(34, 139, 34, 0.2);
}

.skill-item:hover .skill-name {
  color: #90EE90;
}

.skill-item.featured {
  background: rgba(144, 238, 144, 0.12);
  border-color: rgba(144, 238, 144, 0.3);
  box-shadow: 0 0 15px rgba(144, 238, 144, 0.15);
  position: relative;
}

.skill-item.featured::before {
  content: '★';
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  color: #90EE90;
  font-size: 0.8rem;
  opacity: 0.8;
}

.skill-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.skill-name {
  transition: all 0.3s ease;
  font-size: 0.9rem;
  line-height: 1.2;
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

/* Enhanced spacing for better readability */
.skill-category {
  margin-bottom: 1rem;
}

@media (max-width: 1200px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.75rem;
  }
  
  .skill-item {
    padding: 0.6rem 0.8rem;
  }
  
  .skill-icon {
    width: 1.8rem;
    height: 1.8rem;
  }
  
  .skill-name {
    font-size: 0.85rem;
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
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.75rem;
    padding: 0 0.5rem;
    justify-items: stretch;
  }
  
  .skill-item {
    padding: 0.6rem 0.8rem;
    margin: 0;
    overflow: hidden;
  }
  
  .skill-icon {
    width: 1.6rem;
    height: 1.6rem;
  }
  
  .skill-name {
    font-size: 0.8rem;
    line-height: 1.2;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    padding: 0 0.25rem;
  }
  
  .skill-item {
    padding: 0.5rem 0.6rem;
    margin: 0;
    overflow: hidden;
  }
  
  .skill-icon {
    width: 1.4rem;
    height: 1.4rem;
  }
  
  .skill-name {
    font-size: 0.75rem;
    line-height: 1.2;
  }
}

@media (max-width: 360px) {
  .skills-content {
    padding: 0 0.25rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0 0.25rem;
  }
  
  .skill-item {
    margin: 0;
    padding: 0.4rem 0.5rem;
  }
  
  .skill-icon {
    width: 1.3rem;
    height: 1.3rem;
  }
  
  .skill-name {
    font-size: 0.7rem;
    line-height: 1.2;
  }
}
</style>
