<template>
  <section id="about" class="about section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">About Me</h2>
      
      <div class="about-content">
        <div class="about-text glass-card">
          <h3>🎯 Objective</h3>
          <p>
            Passionate and results-driven Node.js Backend Developer with strong expertise in 
            building scalable APIs and integrating them seamlessly with modern frontend frameworks 
            like Vue.js and React.js.
          </p>
          
          <p>
            Skilled at designing efficient architectures, solving complex backend challenges, 
            and delivering high-performance solutions. Experienced in collaborating across 
            functions and ensuring projects are completed on time and to high standards.
          </p>
          
          <p>
            Committed to continuous learning, clean code practices, and leveraging cutting-edge 
            technologies to build impactful web applications.
          </p>
          
          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-number text-gradient">6+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-item">
              <span class="stat-number text-gradient">30+</span>
              <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat-item">
              <span class="stat-number text-gradient">100%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
        
        <div class="about-visual">
          <div class="visual-card glass-card float">
            <div class="code-preview">
              <div class="code-header">
                <div class="code-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <span class="code-title">developer.js</span>
              </div>
              <div class="code-content">
                <div class="code-line">
                  <span class="code-keyword">const </span>
                  <span class="code-variable">developer</span>
                  <span class="code-operator"> = </span>
                  <span class="code-punctuation">{</span>
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">name: </span>
                  <span class="code-string">'Win Khant Aung'</span>,
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">role: </span>
                  <span class="code-string">'Full Stack Developer'</span>,
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">location: </span>
                  <span class="code-string">'Dubai, UAE'</span>,
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">languages: </span>
                  <span class="code-punctuation">[</span>
                </div>
                <div class="code-line code-indent-2">
                  <span class="code-string">'JavaScript'</span>,
                  <span class="code-string">'TypeScript'</span>,
                </div>
                <div class="code-line code-indent-2">
                  <span class="code-string">'PHP'</span>,
                  <span class="code-string">'HTML'</span>,
                  <span class="code-string">'CSS'</span>
                </div>
                <div class="code-line code-indent">
                  <span class="code-punctuation">]</span>,
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">passionate: </span>
                  <span class="code-boolean">true</span>
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">coffee: </span>
                  <span class="code-boolean">true</span>
                </div>
                <div class="code-line">
                  <span class="code-punctuation">}</span>
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
import { onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // About content animation
  gsap.fromTo('.about-text', {
    opacity: 0,
    x: -100,
    rotationY: -15
  }, {
    opacity: 1,
    x: 0,
    rotationY: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Visual card animation
  gsap.fromTo('.about-visual', {
    opacity: 0,
    x: 100,
    rotationY: 15,
    scale: 0.8
  }, {
    opacity: 1,
    x: 0,
    rotationY: 0,
    scale: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Animate code lines
  gsap.fromTo('.code-line', {
    opacity: 0,
    x: -30
  }, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.code-preview',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Typing effect for code (preserve HTML structure)
  const codeLines = document.querySelectorAll('.code-line')
  codeLines.forEach((line, index) => {
    const originalHTML = line.innerHTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = originalHTML
    const text = tempDiv.textContent || ''
    
    // Hide the line initially
    gsap.set(line, { opacity: 0 })
    
    // Simple fade in animation instead of typing to preserve colors
    gsap.to(line, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.code-preview',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1
    })
  })
  
  // Stats animation
  gsap.fromTo('.stat-item', {
    opacity: 0,
    y: 50,
    scale: 0.5
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.about-stats',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Animate stat numbers with counting effect
  const statNumbers = document.querySelectorAll('.stat-number')
  statNumbers.forEach(stat => {
    const text = stat.textContent || '0'
    const number = parseInt(text.replace(/\D/g, ''))
    const suffix = text.replace(/\d/g, '')
    
    gsap.fromTo(stat, {
      textContent: '0' + suffix,
    }, {
      duration: 2,
      textContent: number + suffix,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  })
  
  // Floating animation for visual card
  gsap.to('.visual-card', {
    y: -10,
    rotation: 1,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
  
  // Interactive hover effects
  const aboutText = document.querySelector('.about-text')
  if (aboutText) {
    aboutText.addEventListener('mouseenter', () => {
      gsap.to('.about-text', {
        scale: 1.02,
        rotationY: 2,
        duration: 0.4,
        ease: 'power2.out'
      })
    })
    
    aboutText.addEventListener('mouseleave', () => {
      gsap.to('.about-text', {
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: 'power2.out'
      })
    })
  }
  
  // Code dots animation
  gsap.to('.dot', {
    scale: 1.2,
    duration: 1,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.3
  })
})
</script>

<style scoped>
.about {
  background: linear-gradient(135deg, rgba(10, 26, 10, 0.3) 0%, rgba(26, 47, 26, 0.1) 100%);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  padding: 2.5rem;
}

.about-text h3 {
  color: #90EE90;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: rgba(232, 245, 232, 0.9);
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  padding: 0;
  overflow: hidden;
  max-width: 400px;
  width: 100%;
}

.code-preview {
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
  font-size: 0.9rem;
}

.code-header {
  background: rgba(26, 47, 26, 0.3);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(34, 139, 34, 0.2);
}

.code-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca3f; }

.code-title {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.85rem;
}

.code-content {
  padding: 1.5rem;
  background: rgba(10, 26, 10, 0.2);
}

.code-line {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.code-indent {
  padding-left: 1rem;
}

.code-indent-2 {
  padding-left: 2rem;
}

.code-keyword { color: #ff79c6; }
.code-variable { color: #8be9fd; }
.code-operator { color: #ff79c6; }
.code-punctuation { color: #f8f8f2; }
.code-property { color: #50fa7b; }
.code-string { color: #f1fa8c; }
.code-boolean { color: #bd93f9; }

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-text {
    padding: 2rem;
  }
  
  .about-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
  
  .code-preview {
    font-size: 0.8rem;
  }
  
  .code-content {
    padding: 1rem;
  }
}
</style>
