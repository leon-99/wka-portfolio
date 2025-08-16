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
      { name: 'AWS', icon: 'devicon:amazonwebservices', iconClass: 'devicon', featured: true },
      { name: 'Docker', icon: 'devicon:docker', iconClass: 'devicon', featured: true },
      { name: 'Kubernetes', icon: 'devicon:kubernetes', iconClass: 'devicon', featured: false },
      { name: 'CI/CD', icon: 'mdi:git', iconClass: 'mdi', featured: true },
      { name: 'Git', icon: 'devicon:git', iconClass: 'devicon', featured: true },
      { name: 'Linux', icon: 'devicon:linux', iconClass: 'devicon', featured: false },
      { name: 'Nginx', icon: 'devicon:nginx', iconClass: 'devicon', featured: false },
      { name: 'Jenkins', icon: 'devicon:jenkins', iconClass: 'devicon', featured: false },
      { name: 'Terraform', icon: 'devicon:terraform', iconClass: 'devicon', featured: false },
      { name: 'Monitoring', icon: 'mdi:monitor-dashboard', iconClass: 'mdi', featured: false }
    ]
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'VS Code', icon: 'devicon:vscode', iconClass: 'devicon', featured: false },
      { name: 'Postman', icon: 'devicon:postman', iconClass: 'devicon', featured: false },
      { name: 'Figma', icon: 'devicon:figma', iconClass: 'devicon', featured: false },
      { name: 'Jira', icon: 'devicon:jira', iconClass: 'devicon', featured: false },
      { name: 'Slack', icon: 'devicon:slack', iconClass: 'devicon', featured: false },
      { name: 'Notion', icon: 'devicon:notion', iconClass: 'devicon', featured: false },
      { name: 'Testing', icon: 'mdi:test-tube', iconClass: 'mdi', featured: true },
      { name: 'Agile', icon: 'mdi:refresh', iconClass: 'mdi', featured: false },
      { name: 'Scrum', icon: 'mdi:run', iconClass: 'mdi', featured: false },
      { name: 'Problem Solving', icon: 'mdi:puzzle', iconClass: 'mdi', featured: true }
    ]
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
    scrollTrigger: {
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
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Featured skills highlight animation
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
  
  // Interactive hover effects for skill items
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
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: rgba(34, 139, 34, 0.1);
  border: 1px solid rgba(34, 139, 34, 0.2);
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 100px;
  text-align: center;
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

.skill-name {
  color: #e8f5e8;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.2;
}

@media (max-width: 1200px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
  }
  
  .skill-item {
    padding: 1rem 0.75rem;
    min-width: 80px;
  }
  
  .skill-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .skill-name {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  
  .skills-categories {
    gap: 3rem;
  }
  
  .category-title {
    font-size: 1.75rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0.75rem;
  }
  
  .skill-item {
    padding: 0.75rem 0.5rem;
    min-width: 70px;
  }
  
  .skill-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .skill-name {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  .skill-item {
    padding: 0.5rem;
    min-width: 60px;
  }
  
  .skill-icon {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .skill-name {
    font-size: 0.7rem;
  }
}
</style>
