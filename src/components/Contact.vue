<template>
  <section id="contact" class="contact section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Get In Touch</h2>
      <p class="section-subtitle">
        Ready to bring your ideas to life? Let's collaborate on your next project.
      </p>
      
      <div class="contact-content">
        <!-- Introduction Section -->
        <div class="contact-intro">
          <p class="intro-text">
            I'm always excited to work on new challenges and collaborate with 
            talented teams. Whether you have a project in mind or just want to 
            say hello, feel free to reach out!
          </p>
        </div>

        <!-- Contact Methods Grid -->
        <div class="contact-methods-grid">
          <a 
            href="https://github.com/leon-99" 
            class="contact-method github"
            target="_blank"
            rel="noopener"
          >
            <div class="method-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div class="method-content">
              <h4>GitHub</h4>
              <p>Explore my code repositories and projects</p>
              <span class="method-url">github.com/leon-99</span>
            </div>

          </a>
          
          <a 
            href="https://linkedin.com/in/win-khant-aung-ba1271181" 
            class="contact-method linkedin"
            target="_blank"
            rel="noopener"
          >
            <div class="method-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div class="method-content">
              <h4>LinkedIn</h4>
              <p>Connect with me professionally</p>
              <span class="method-url">linkedin.com/in/win-khant-aung</span>
            </div>

          </a>
          
          <a 
            href="mailto:contact.winkhantaung@gmail.com" 
            class="contact-method email"
          >
            <div class="method-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div class="method-content">
              <h4>Email</h4>
              <p>Send me a direct message</p>
              <span class="method-url">contact.winkhantaung@gmail.com</span>
            </div>

          </a>
        </div>

        <!-- Availability Status -->
        <div class="availability-section">
          <div class="availability-card glass-card">
            <div class="availability-status">
              <div class="status-indicator available"></div>
              <span>Available for new opportunities</span>
            </div>
            <p class="availability-note">
              Currently based in Dubai, UAE and open to remote work opportunities worldwide.
            </p>
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
      trigger: '.contact',
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
      trigger: '.contact',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    delay: 0.3
  })
  
  // Contact intro animation
  gsap.fromTo('.contact-intro', {
    opacity: 0,
    y: 50,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.contact-intro',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    }
  })
  

  
  // Contact methods animation
  gsap.fromTo('.contact-method', {
    opacity: 0,
    y: 50,
    scale: 0.8
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.contact-methods-grid',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  

  
  // Availability status animation
  gsap.fromTo('.availability-card', {
    opacity: 0,
    y: 30,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.availability-section',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  

  

  
  // Contact method hover effects
  const contactMethods = document.querySelectorAll('.contact-method')
  contactMethods.forEach(method => {
    method.addEventListener('mouseenter', () => {
      gsap.to(method, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      
      const icon = method.querySelector('.method-icon')
      gsap.to(icon, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
    
    method.addEventListener('mouseleave', () => {
      gsap.to(method, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      
      const icon = method.querySelector('.method-icon')
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
  })
  
  // Status indicator pulsing animation
  gsap.to('.status-indicator.available', {
    boxShadow: '0 0 20px rgba(50, 205, 50, 0.8)',
    duration: 1.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
  

  

  

})
</script>

<style scoped>
.contact {
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

.contact-content {
  max-width: 1000px;
  margin: 0 auto 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.contact-intro {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.intro-text {
  color: rgba(232, 245, 232, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.contact-methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.availability-section {
  display: flex;
  justify-content: center;
}

.availability-card {
  padding: 2rem;
  max-width: 500px;
  width: 100%;
}

.contact-method {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(34, 139, 34, 0.1);
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid rgba(34, 139, 34, 0.2);
  position: relative;
  overflow: hidden;
  min-height: 200px;
}

.contact-method::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(50, 205, 50, 0.1), transparent);
  transition: left 0.5s ease;
}

.contact-method:hover::before {
  left: 100%;
}

.contact-method:hover {
  background: rgba(34, 139, 34, 0.2);
  transform: translateY(-2px);
  border-color: rgba(34, 139, 34, 0.4);
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.2);
}



.method-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 139, 34, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.method-icon svg {
  width: 32px;
  height: 32px;
  color: #90EE90;
  transition: all 0.3s ease;
}

.contact-method:hover .method-icon {
  background: rgba(50, 205, 50, 0.3);
  transform: scale(1.1) rotate(5deg);
}

.contact-method:hover .method-icon svg {
  color: #32CD32;
}

.method-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.method-content h4 {
  color: #90EE90;
  font-weight: 600;
  margin: 0;
  font-size: 1.2rem;
}

.method-content p {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}

.method-url {
  color: rgba(232, 245, 232, 0.5);
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  margin-top: 0.5rem;
}



.availability {
  padding: 1.5rem;
  background: rgba(34, 139, 34, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(34, 139, 34, 0.2);
}

.availability-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
}

.status-indicator.available {
  background: #32CD32;
  box-shadow: 0 0 10px rgba(50, 205, 50, 0.5);
}

.status-indicator.available::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid rgba(50, 205, 50, 0.3);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}

.availability-status span {
  color: #90EE90;
  font-weight: 600;
}

.availability-note {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
  margin: 0;
}



.contact-footer {
  border-top: 1px solid rgba(34, 139, 34, 0.2);
  padding-top: 3rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: start;
}

.footer-brand span {
  font-size: 1.5rem;
  font-weight: 700;
}

.footer-brand p {
  color: rgba(232, 245, 232, 0.7);
  margin-top: 0.5rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: rgba(232, 245, 232, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #90EE90;
}

.footer-social {
  display: flex;
  gap: 1rem;
  justify-self: end;
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(34, 139, 34, 0.2);
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.footer-social a:hover {
  background: rgba(34, 139, 34, 0.4);
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(34, 139, 34, 0.1);
}

.footer-bottom p {
  color: rgba(232, 245, 232, 0.5);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .contact-content {
    margin-bottom: 3rem;
    gap: 2rem;
  }
  
  .contact-methods-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .contact-method {
    padding: 1.5rem;
    min-height: 180px;
  }
  
  .method-icon {
    width: 60px;
    height: 60px;
  }
  
  .method-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .method-content h4 {
    font-size: 1.1rem;
  }
  
  .method-content p {
    font-size: 0.85rem;
  }
  
  .method-url {
    font-size: 0.75rem;
  }
  
  .availability-card {
    padding: 1.5rem;
  }
}
</style>
