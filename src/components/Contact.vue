<template>
  <section id="contact" class="contact section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Get In Touch</h2>
      <p class="section-subtitle">
        Ready to bring your ideas to life? Let's collaborate on your next project.
      </p>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-card glass-card">
            <h3>Let's Connect</h3>
            <p>
              I'm always excited to work on new challenges and collaborate with 
              talented teams. Whether you have a project in mind or just want to 
              say hello, feel free to reach out!
            </p>
            
            <div class="contact-methods">
              <a 
                href="https://github.com/leon-99" 
                class="contact-method"
                target="_blank"
                rel="noopener"
              >
                <div class="method-icon">
                  <span>💻</span>
                </div>
                <div class="method-info">
                  <h4>GitHub</h4>
                  <p>Check out my repositories</p>
                </div>
              </a>
              
              <a 
                href="https://linkedin.com/in/win-khant-aung-ba1271181" 
                class="contact-method"
                target="_blank"
                rel="noopener"
              >
                <div class="method-icon">
                  <span>🔗</span>
                </div>
                <div class="method-info">
                  <h4>LinkedIn</h4>
                  <p>Let's connect professionally</p>
                </div>
              </a>
              
              <a 
                href="mailto:contact.winkhantaung@gmail.com" 
                class="contact-method"
              >
                <div class="method-icon">
                  <span>📧</span>
                </div>
                <div class="method-info">
                  <h4>Email</h4>
                  <p>Drop me a message</p>
                </div>
              </a>
            </div>
            
            <div class="availability">
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
        
        <div class="contact-form">
          <form @submit.prevent="handleSubmit" class="form glass-card">
            <h3>Send a Message</h3>
            
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                required
                placeholder="Your name"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                required
                placeholder="your.email@example.com"
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject"
                required
                placeholder="Project inquiry / Collaboration"
              >
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="form.message"
                required
                rows="6"
                placeholder="Tell me about your project or idea..."
              ></textarea>
            </div>
            
            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
            
            <p v-if="submitStatus" class="submit-status" :class="submitStatus.type">
              {{ submitStatus.message }}
            </p>
          </form>
        </div>
      </div>
      
      <div class="contact-footer">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="text-gradient">Win Khant Aung</span>
            <p>Full Stack Developer</p>
          </div>
          
          <div class="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
          </div>
          
          <div class="footer-social">
            <a href="https://github.com/leon-99" target="_blank" rel="noopener" title="GitHub">
              <span>💻</span>
            </a>
            <a href="https://linkedin.com/in/win-khant-aung-ba1271181" target="_blank" rel="noopener" title="LinkedIn">
              <span>🔗</span>
            </a>
            <a href="mailto:contact.winkhantaung@gmail.com" title="Email">
              <span>📧</span>
            </a>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Win Khant Aung. Built with Vue.js & Three.js</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<{ type: 'success' | 'error', message: string } | null>(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create mailto link as fallback
    const subject = encodeURIComponent(form.subject)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    const mailtoLink = `mailto:contact.winkhantaung@gmail.com?subject=${subject}&body=${body}`
    
    // Open email client
    window.location.href = mailtoLink
    
    submitStatus.value = {
      type: 'success',
      message: 'Your email client should open now. Thank you for reaching out!'
    }
    
    // Reset form
    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = ''
    })
    
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: 'Something went wrong. Please try again or contact me directly via email.'
    }
  } finally {
    isSubmitting.value = false
  }
}
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
}

.contact-card,
.form {
  padding: 2.5rem;
}

.contact-card h3,
.form h3 {
  color: #90EE90;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.contact-card p {
  color: rgba(232, 245, 232, 0.8);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(34, 139, 34, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid rgba(34, 139, 34, 0.2);
}

.contact-method:hover {
  background: rgba(34, 139, 34, 0.2);
  transform: translateX(5px);
  border-color: rgba(34, 139, 34, 0.4);
}

.method-icon {
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 139, 34, 0.2);
  border-radius: 50%;
}

.method-info h4 {
  color: #90EE90;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.method-info p {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
  margin: 0;
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

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #90EE90;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(26, 47, 26, 0.3);
  border: 1px solid rgba(34, 139, 34, 0.3);
  border-radius: 8px;
  color: #e8f5e8;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #32CD32;
  box-shadow: 0 0 10px rgba(50, 205, 50, 0.2);
  background: rgba(26, 47, 26, 0.5);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(232, 245, 232, 0.5);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 139, 34, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-status {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.submit-status.success {
  background: rgba(50, 205, 50, 0.2);
  color: #90EE90;
  border: 1px solid rgba(50, 205, 50, 0.3);
}

.submit-status.error {
  background: rgba(220, 38, 38, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(220, 38, 38, 0.3);
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
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-card,
  .form {
    padding: 2rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .footer-social {
    justify-self: center;
  }
}
</style>
