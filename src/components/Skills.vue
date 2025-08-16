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
                  <span v-html="skill.icon"></span>
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = ref([
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: '🟢', featured: true },
      { name: 'Express.js', icon: '⚡', featured: true },
      { name: 'PHP', icon: '🐘', featured: false },
      { name: 'Laravel', icon: '🔥', featured: false },
      { name: 'RESTful APIs', icon: '🔌', featured: true },
      { name: 'GraphQL', icon: '📊', featured: false },
      { name: 'Database Design', icon: '🗄️', featured: true },
      { name: 'MongoDB', icon: '🍃', featured: false },
      { name: 'PostgreSQL', icon: '🐘', featured: false },
      { name: 'Redis', icon: '⚡', featured: false }
    ]
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'Vue.js', icon: '💚', featured: true },
      { name: 'React.js', icon: '⚛️', featured: true },
      { name: 'JavaScript', icon: '🟡', featured: true },
      { name: 'TypeScript', icon: '🔷', featured: true },
      { name: 'HTML5', icon: '🌐', featured: false },
      { name: 'CSS3', icon: '🎨', featured: false },
      { name: 'Tailwind CSS', icon: '🎯', featured: false },
      { name: 'Sass/SCSS', icon: '💎', featured: false },
      { name: 'Webpack', icon: '📦', featured: false },
      { name: 'Vite', icon: '⚡', featured: false }
    ]
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: '☁️', featured: true },
      { name: 'Docker', icon: '🐳', featured: true },
      { name: 'Kubernetes', icon: '☸️', featured: false },
      { name: 'CI/CD', icon: '🔄', featured: true },
      { name: 'Git', icon: '📝', featured: true },
      { name: 'Linux', icon: '🐧', featured: false },
      { name: 'Nginx', icon: '🌐', featured: false },
      { name: 'Jenkins', icon: '🤖', featured: false },
      { name: 'Terraform', icon: '🏗️', featured: false },
      { name: 'Monitoring', icon: '📊', featured: false }
    ]
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'VS Code', icon: '💻', featured: false },
      { name: 'Postman', icon: '📮', featured: false },
      { name: 'Figma', icon: '🎨', featured: false },
      { name: 'Jira', icon: '📋', featured: false },
      { name: 'Slack', icon: '💬', featured: false },
      { name: 'Notion', icon: '📝', featured: false },
      { name: 'Testing', icon: '🧪', featured: true },
      { name: 'Agile', icon: '🔄', featured: false },
      { name: 'Scrum', icon: '🏃', featured: false },
      { name: 'Problem Solving', icon: '🧩', featured: true }
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
  font-size: 2.5rem;
  opacity: 0.9;
  transition: all 0.3s ease;
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
    font-size: 2rem;
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
    font-size: 1.75rem;
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
    font-size: 1.5rem;
  }
  
  .skill-name {
    font-size: 0.7rem;
  }
}
</style>
