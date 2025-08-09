<template>
  <section id="skills" class="skills section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Skills & Technologies</h2>
      
      <div class="skills-content">
        <div class="skills-grid">
          <div 
            v-for="(category, index) in skillCategories" 
            :key="category.title"
            class="skill-category glass-card"
            :class="{ active: activeCategory === index }"
            @mouseenter="setActiveCategory(index)"
            @mouseleave="setActiveCategory(-1)"
          >
            <div class="category-header">
              <div class="category-icon">
                <span v-html="category.icon"></span>
              </div>
              <h3>{{ category.title }}</h3>
            </div>
            
            <div class="skills-list">
              <div 
                v-for="skill in category.skills" 
                :key="skill.name"
                class="skill-item"
              >
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div 
                    class="skill-progress"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
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

const activeCategory = ref(-1)

const skillCategories = ref([
  {
    title: 'Backend',
    icon: '🔧',
    skills: [
      { name: 'Node.js', level: 95 },
      { name: 'Express.js', level: 90 },
      { name: 'PHP/Laravel', level: 85 },
      { name: 'RESTful APIs', level: 95 },
      { name: 'Database Design', level: 88 }
    ]
  },
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'Vue.js', level: 92 },
      { name: 'React.js', level: 88 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 90 }
    ]
  },
  {
    title: 'Cloud & Tools',
    icon: '☁️',
    skills: [
      { name: 'AWS', level: 82 },
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 80 },
      { name: 'Linux', level: 78 }
    ]
  },
  {
    title: 'Soft Skills',
    icon: '🧠',
    skills: [
      { name: 'Problem Solving', level: 95 },
      { name: 'Critical Thinking', level: 90 },
      { name: 'Team Collaboration', level: 88 },
      { name: 'Communication', level: 85 },
      { name: 'Leadership', level: 82 }
    ]
  }
])

const setActiveCategory = (index: number) => {
  activeCategory.value = index
}

onMounted(async () => {
  await nextTick()
  
  // Section title animation
  gsap.fromTo('.section-title', {
    opacity: 0,
    y: 100,
    scale: 0.5
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
  
  // Skills grid animation
  gsap.fromTo('.skill-category', {
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
      trigger: '.skills-grid',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Animate skill progress bars
  gsap.fromTo('.skill-progress', {
    width: '0%',
    backgroundColor: 'rgba(50, 205, 50, 0.3)'
  }, {
    width: (index, target) => {
      const skillItem = target.closest('.skill-item')
      const levelText = skillItem?.querySelector('.skill-level')?.textContent || '0%'
      return levelText
    },
    backgroundColor: 'linear-gradient(135deg, #32CD32, #228B22)',
    duration: 1.5,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Animate skill levels with counting effect
  const skillLevels = document.querySelectorAll('.skill-level')
  skillLevels.forEach(level => {
    const targetValue = parseInt(level.textContent?.replace('%', '') || '0')
    
    gsap.fromTo(level, {
      textContent: '0%'
    }, {
      duration: 2,
      textContent: targetValue + '%',
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: level.closest('.skill-category'),
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
  })
  
  // Category icons animation
  gsap.fromTo('.category-icon', {
    scale: 0,
    rotation: -180
  }, {
    scale: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Continuous icon animation - removed for cleaner look
  // gsap.to('.category-icon', {
  //   rotationY: 360,
  //   duration: 8,
  //   ease: 'none',
  //   repeat: -1,
  //   stagger: 2
  // })
  
  // Interactive hover effects for skill categories
  const skillCategories = document.querySelectorAll('.skill-category')
  skillCategories.forEach((category, index) => {
    category.addEventListener('mouseenter', () => {
      gsap.to(category, {
        scale: 1.05,
        rotationY: 5,
        z: 50,
        duration: 0.4,
        ease: 'power2.out'
      })
      
      // Highlight skill bars in this category
      const skillBars = category.querySelectorAll('.skill-progress')
      gsap.to(skillBars, {
        boxShadow: '0 0 20px rgba(50, 205, 50, 0.8)',
        duration: 0.3,
        stagger: 0.05
      })
      
      // Animate category icon
      const icon = category.querySelector('.category-icon')
      gsap.to(icon, {
        scale: 1.2,
        // rotation: 15, // Removed rotation
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
    
    category.addEventListener('mouseleave', () => {
      gsap.to(category, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.4,
        ease: 'power2.out'
      })
      
      const skillBars = category.querySelectorAll('.skill-progress')
      gsap.to(skillBars, {
        boxShadow: 'none',
        duration: 0.3
      })
      
      const icon = category.querySelector('.category-icon')
      gsap.to(icon, {
        scale: 1,
        // rotation: 0, // Removed rotation
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
  })
  
  // Skill name typewriter effect
  const skillNames = document.querySelectorAll('.skill-name')
  skillNames.forEach((name, index) => {
    const text = name.textContent || ''
    name.textContent = ''
    
    gsap.to(name, {
      duration: text.length * 0.05,
      ease: 'none',
      onUpdate: function() {
        const progress = this.progress()
        const currentLength = Math.floor(progress * text.length)
        name.textContent = text.slice(0, currentLength) + (progress < 1 ? '_' : '')
      },
      scrollTrigger: {
        trigger: name.closest('.skill-category'),
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1
    })
  })
  
  // Floating animation for the entire skills section
  gsap.to('.skills-grid', {
    y: -5,
    duration: 4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
  
  // Shimmer effect enhancement
  gsap.to('.skill-progress::after', {
    x: '200%',
    duration: 2,
    ease: 'power2.inOut',
    repeat: -1,
    repeatDelay: 3
  })
})


</script>

<style scoped>
.skills {
  position: relative;
  overflow: hidden;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.skills-content {
  position: relative;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.skill-category {
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-category:hover,
.skill-category.active {
  transform: translateY(-5px);
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(34, 139, 34, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 139, 34, 0.2);
  border-radius: 12px;
}

.category-header h3 {
  color: #90EE90;
  font-size: 1.2rem;
  font-weight: 600;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  color: #e8f5e8;
  font-weight: 500;
}

.skill-level {
  color: #90EE90;
  font-size: 0.9rem;
  font-weight: 600;
}

.skill-bar {
  height: 6px;
  background: rgba(34, 139, 34, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(135deg, #32CD32, #228B22);
  border-radius: 3px;
  transition: width 0.8s ease;
  position: relative;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (max-width: 1200px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .skill-category {
    padding: 1rem;
  }
  
  .skills-3d {
    height: 300px;
  }
}
</style>
