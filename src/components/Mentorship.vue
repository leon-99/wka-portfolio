<template>
  <section id="mentorship" class="mentorship section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Mentorship & Giving Back</h2>
      <p class="section-subtitle">
        Sharing knowledge and helping others grow in their tech journey.
      </p>
      
      <div class="mentorship-content">
        <!-- Mentorship Cards Grid -->
        <div class="mentorship-grid">
          <!-- What I Offer Card -->
          <div class="mentorship-card glass-card" ref="offerCard">
            <div class="card-header">
              <div class="card-icon">🎯</div>
              <h3>How I Can Help You</h3>
            </div>
            <div class="card-content">
              <ul class="mentorship-list">
                <li v-for="(item, index) in offerings" :key="index" ref="offeringItems">
                  <span class="list-icon">{{ item.icon }}</span>
                  <span class="list-text">{{ item.text }}</span>
                </li>
              </ul>
            </div>
            <div class="card-glow"></div>
          </div>

          <!-- Experience Card -->
          <div class="mentorship-card glass-card" ref="experienceCard">
            <div class="card-header">
              <div class="card-icon">🌟</div>
              <h3>Mentorship Impact</h3>
            </div>
            <div class="card-content">
              <div class="impact-stats">
                <div class="stat-item" v-for="(stat, index) in impactStats" :key="index" ref="statItems">
                  <div class="stat-number text-gradient">{{ stat.number }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </div>
            </div>
            <div class="card-glow"></div>
          </div>

          <!-- Connect Card -->
          <div class="mentorship-card glass-card" ref="connectCard">
            <div class="card-header">
              <div class="card-icon">🤝</div>
              <h3>Let's Connect</h3>
            </div>
            <div class="card-content">
              <p class="connect-text">
                I offer free consultation calls to see if we're a good fit for mentorship.
              </p>
              <div class="connect-features">
                <div class="feature" v-for="(feature, index) in connectFeatures" :key="index" ref="featureItems">
                  <span class="feature-icon">{{ feature.icon }}</span>
                  <span class="feature-text">{{ feature.text }}</span>
                </div>
              </div>
              <button class="mentorship-btn" @click="openMentorshipForm">
                <span class="btn-text">Book Free Session</span>
                <span class="btn-icon">📅</span>
              </button>
            </div>
            <div class="card-glow"></div>
          </div>
        </div>



        <!-- Mentorship Form Modal -->
        <div class="mentorship-modal" v-if="showModal" @click="closeModal">
          <div class="modal-content glass-card" @click.stop>
            <div class="modal-header">
              <h3>Mentorship Inquiry</h3>
              <button class="close-btn" @click="closeModal">×</button>
            </div>
            <form @submit.prevent="submitMentorshipForm" class="mentorship-form">
              <div class="form-group">
                <label for="mentorName">Name</label>
                <input 
                  type="text" 
                  id="mentorName" 
                  v-model="mentorshipForm.name"
                  required
                  placeholder="Your name"
                >
              </div>
              
              <div class="form-group">
                <label for="mentorEmail">Email</label>
                <input 
                  type="email" 
                  id="mentorEmail" 
                  v-model="mentorshipForm.email"
                  required
                  placeholder="your.email@example.com"
                >
              </div>
              
              <div class="form-group">
                <label for="mentorExperience">Experience Level</label>
                <select id="mentorExperience" v-model="mentorshipForm.experience" required>
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="mentorGoals">What would you like to work on?</label>
                <textarea 
                  id="mentorGoals" 
                  v-model="mentorshipForm.goals"
                  required
                  placeholder="Tell me about your goals, challenges, or specific topics you'd like to discuss..."
                  rows="4"
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="mentorTopics">Preferred Topics</label>
                <div class="topic-checkboxes">
                  <label v-for="topic in mentorshipTopics" :key="topic.value" class="topic-checkbox">
                    <input 
                      type="checkbox" 
                      :value="topic.value" 
                      v-model="mentorshipForm.topics"
                    >
                    <span class="checkbox-text">{{ topic.label }}</span>
                  </label>
                </div>
              </div>
              
              <button type="submit" class="submit-btn">
                <span>Send Inquiry</span>
                <span class="submit-icon">📤</span>
              </button>
            </form>
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

// Template refs
const offerCard = ref<HTMLElement>()
const experienceCard = ref<HTMLElement>()
const connectCard = ref<HTMLElement>()
const offeringItems = ref<HTMLElement[]>([])
const statItems = ref<HTMLElement[]>([])
const featureItems = ref<HTMLElement[]>([])


// Modal state
const showModal = ref(false)

// Form data
const mentorshipForm = ref({
  name: '',
  email: '',
  experience: '',
  goals: '',
  topics: [] as string[]
})

// Data
const offerings = ref([
  { icon: '💻', text: 'Code reviews and technical feedback' },
  { icon: '🎯', text: 'Career guidance for junior developers' },
  { icon: '🚀', text: 'Portfolio project optimization' },
  { icon: '📚', text: 'Learning path recommendations' },
  { icon: '🤝', text: 'Interview preparation and practice' },
  { icon: '🏗️', text: 'System architecture guidance' }
])

const impactStats = ref([
  { number: '6', label: 'Developers Mentored' },
  { number: '15', label: 'Portfolios Reviewed' },
  { number: '100%', label: 'Success Rate' },
  { number: '24/7', label: 'Community Support' }
])

const connectFeatures = ref([
  { icon: '⏰', text: 'Free 30-min consultation' },
  { icon: '🎥', text: 'Video call sessions' },
  { icon: '📱', text: 'Ongoing support' },
  { icon: '📚', text: 'Resource sharing' }
])

const mentorshipTopics = ref([
  { value: 'backend', label: 'Backend Development' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'devops', label: 'DevOps & Deployment' },
  { value: 'career', label: 'Career Development' },
  { value: 'portfolio', label: 'Portfolio Building' },
  { value: 'interview', label: 'Interview Prep' }
])

// Methods
const openMentorshipForm = () => {
  showModal.value = true
  // Animate modal entrance
  gsap.fromTo('.modal-content', {
    opacity: 0,
    scale: 0.8,
    y: 50
  }, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  })
}

const closeModal = () => {
  gsap.to('.modal-content', {
    opacity: 0,
    scale: 0.8,
    y: 50,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => {
      showModal.value = false
    }
  })
}

const submitMentorshipForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Mentorship form submitted:', mentorshipForm.value)
  
  // Show success message (you can enhance this)
  alert('Thank you for your mentorship inquiry! I\'ll get back to you within 24 hours.')
  
  // Reset form and close modal
  mentorshipForm.value = {
    name: '',
    email: '',
    experience: '',
    goals: '',
    topics: []
  }
  closeModal()
}

// GSAP Animations
onMounted(async () => {
  await nextTick()
  
  // Initial card animations
  gsap.fromTo([offerCard.value, experienceCard.value, connectCard.value], {
    opacity: 0,
    y: 100,
    scale: 0.8
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.mentorship-grid',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })



  // List items animation
  gsap.fromTo(offeringItems.value, {
    opacity: 0,
    x: -30
  }, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: offerCard.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  // Stats animation
  gsap.fromTo(statItems.value, {
    opacity: 0,
    scale: 0.5
  }, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.15,
    delay: 1.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: experienceCard.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  // Feature items animation
  gsap.fromTo(featureItems.value, {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 1.4,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: connectCard.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  // Card glow effects on hover
  const cards = [offerCard.value, experienceCard.value, connectCard.value]
  
  cards.forEach(card => {
    if (card) {
      const glow = card.querySelector('.card-glow')
      
      card.addEventListener('mouseenter', () => {
        gsap.to(glow, {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(glow, {
          opacity: 0.3,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    }
  })

  // Override any global section animations to prevent reversals
  const sectionTitle = document.querySelector('#mentorship .section-title')
  const sectionSubtitle = document.querySelector('#mentorship .section-subtitle')
  
  if (sectionTitle) {
    // Kill any existing ScrollTrigger on the title
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionTitle || trigger.vars.trigger === '#mentorship .section-title') {
        trigger.kill()
      }
    })
    
    // Set the title to its final state permanently
    gsap.set(sectionTitle, { opacity: 1, y: 0, scale: 1 })
  }
  
  if (sectionSubtitle) {
    // Kill any existing ScrollTrigger on the subtitle
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionSubtitle || trigger.vars.trigger === '#mentorship .section-subtitle') {
        trigger.kill()
      }
    })
    
    // Set the subtitle to its final state permanently
    gsap.set(sectionSubtitle, { opacity: 1, y: 0, scale: 1 })
  }
})
</script>

<style scoped>
.mentorship {
  position: relative;
  overflow: hidden;
}

.mentorship-content {
  position: relative;
  z-index: 2;
}

.mentorship-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.mentorship-card {
  position: relative;
  padding: 2rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.mentorship-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.3));
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.card-content {
  position: relative;
  z-index: 2;
}

.mentorship-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mentorship-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mentorship-list li:hover {
  background: rgba(34, 197, 94, 0.1);
  transform: translateX(5px);
}

.list-icon {
  font-size: 1.2rem;
  min-width: 24px;
}

.list-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.impact-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.05);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(34, 197, 94, 0.1);
  transform: scale(1.05);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.connect-text {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.connect-features {
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature:hover {
  background: rgba(34, 197, 94, 0.1);
}

.feature-icon {
  font-size: 1.2rem;
  min-width: 24px;
}

.feature-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.mentorship-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.mentorship-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.mentorship-btn:hover::before {
  left: 100%;
}

.mentorship-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}

.btn-text {
  z-index: 1;
  position: relative;
}

.btn-icon {
  z-index: 1;
  position: relative;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
  opacity: 0.3;
  transition: all 0.3s ease;
  pointer-events: none;
}



/* Modal Styles */
.mentorship-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(34, 197, 94, 0.2);
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(34, 197, 94, 0.1);
  color: var(--text-primary);
}

.mentorship-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 2px solid rgba(34, 197, 94, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.topic-checkboxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.topic-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.topic-checkbox input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.checkbox-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.submit-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}

.submit-icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .mentorship-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .mentorship-card {
    padding: 1.5rem;
  }
  
  .impact-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  

  
  .modal-content {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .topic-checkboxes {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .mentorship-card {
    padding: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .modal-content {
    padding: 1rem;
  }
}
</style>
