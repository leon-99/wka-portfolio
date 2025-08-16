<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="text-gradient">Win Khant Aung</span>
          <p>Full Stack Developer</p>
          <p class="footer-description">
            Passionate about creating innovative web solutions and building the future of technology.
          </p>
        </div>
        
        <div class="footer-links">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div class="footer-social">
          <h4>Connect With Me</h4>
          <div class="social-icons">
            <a href="https://github.com/leon-99" target="_blank" rel="noopener" title="GitHub">
              <span>💻</span>
              <span class="social-label">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/win-khant-aung-ba1271181" target="_blank" rel="noopener" title="LinkedIn">
              <span>🔗</span>
              <span class="social-label">LinkedIn</span>
            </a>
            <a href="mailto:contact.winkhantaung@gmail.com" title="Email">
              <span>📧</span>
              <span class="social-label">Email</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-info">
          <p>&copy; 2024 Win Khant Aung. All rights reserved.</p>
          <p class="built-with">Built with <span class="tech-highlight">Vue.js</span> & <span class="tech-highlight">Three.js</span></p>
        </div>
        <div class="footer-location">
          <span>📍</span>
          <span>Based in Dubai, UAE</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await nextTick()
  
  // Footer content animation
  gsap.fromTo('.footer-content', {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Footer brand animation
  gsap.fromTo('.footer-brand', {
    opacity: 0,
    x: -50
  }, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.footer-brand',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Footer links animation
  gsap.fromTo('.footer-links', {
    opacity: 0,
    y: 30
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.4,
    scrollTrigger: {
      trigger: '.footer-links',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Footer social animation
  gsap.fromTo('.footer-social', {
    opacity: 0,
    x: 50
  }, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.6,
    scrollTrigger: {
      trigger: '.footer-social',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Footer bottom animation
  gsap.fromTo('.footer-bottom', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.8,
    scrollTrigger: {
      trigger: '.footer-bottom',
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Social icons hover effects
  const socialIcons = document.querySelectorAll('.footer-social a')
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.1,
        y: -5,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
    
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
  })
})
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, rgba(10, 26, 10, 0.8) 0%, rgba(26, 47, 26, 0.6) 100%);
  border-top: 2px solid rgba(34, 139, 34, 0.3);
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(144, 238, 144, 0.03), transparent);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
}

.footer-brand span {
  font-size: 2rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.footer-brand p {
  color: rgba(232, 245, 232, 0.8);
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.footer-description {
  color: rgba(232, 245, 232, 0.6) !important;
  font-size: 0.95rem !important;
  line-height: 1.6;
  max-width: 300px;
}

.footer-links h4,
.footer-social h4 {
  color: #90EE90;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
}

.footer-links h4::after,
.footer-social h4::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #90EE90, transparent);
  border-radius: 1px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: rgba(232, 245, 232, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
  position: relative;
}

.footer-links a::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #90EE90;
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: #90EE90;
  transform: translateX(5px);
}

.footer-links a:hover::before {
  width: 100%;
}

.social-icons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-social a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(34, 139, 34, 0.1);
  border: 1px solid rgba(34, 139, 34, 0.2);
  border-radius: 12px;
  text-decoration: none;
  color: rgba(232, 245, 232, 0.8);
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.footer-social a:hover {
  background: rgba(34, 139, 34, 0.2);
  border-color: rgba(34, 139, 34, 0.4);
  color: #90EE90;
  transform: translateX(5px);
}

.social-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-bottom {
  border-top: 1px solid rgba(34, 139, 34, 0.2);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-info p {
  color: rgba(232, 245, 232, 0.6);
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.built-with {
  font-size: 0.85rem !important;
  color: rgba(232, 245, 232, 0.5) !important;
}

.tech-highlight {
  color: #90EE90;
  font-weight: 600;
}

.footer-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(232, 245, 232, 0.6);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .footer-brand span {
    font-size: 1.75rem;
  }
  
  .footer-description {
    max-width: 100%;
    margin: 0.5rem auto;
  }
  
  .footer-links h4::after,
  .footer-social h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .footer-location {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .footer-brand span {
    font-size: 1.5rem;
  }
  
  .footer-brand p {
    font-size: 1rem;
  }
  
  .footer-links h4,
  .footer-social h4 {
    font-size: 1.1rem;
  }
}
</style>
