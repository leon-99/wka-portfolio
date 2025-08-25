<template>
  <div class="experience-mobile">
    <div class="container">
      <div class="experience-section">
        <h2 class="section-title text-gradient">Professional Experience</h2>
        
        <div class="experience-timeline">
          <div 
            v-for="(job, index) in experiences" 
            :key="job.id"
            :class="['experience-card', 'glass-card', { 'current-job': job.current }]"
          >
            <div class="job-header">
              <div class="company-info">
                <h3 class="job-title">{{ job.title }}</h3>
                <h4 class="company-name">{{ job.company }}</h4>
                <p class="job-location">{{ job.location }}</p>
                <p class="job-period">{{ job.period }}</p>
              </div>
              <div class="job-status" :class="job.current ? 'current' : 'completed'">
                {{ job.current ? 'Current' : 'Completed' }}
              </div>
            </div>
            
            <div class="job-details">
                             <div class="job-section">
                 <h5 class="section-subtitle">Responsibilities</h5>
                 <div class="job-responsibilities">
                   <div v-for="responsibility in job.responsibilities" :key="responsibility" class="responsibility-item">
                     {{ responsibility }}
                   </div>
                 </div>
               </div>
              
              <div class="job-section">
                <h5 class="section-subtitle">Technologies</h5>
                <div class="tech-list">
                  <span 
                    v-for="tech in job.technologies" 
                    :key="tech.name"
                    class="tech-badge"
                  >
                    <Icon :icon="tech.icon" class="tech-icon" />
                    {{ tech.name }}
                  </span>
                </div>
              </div>
              
                             <div class="job-section" v-if="job.achievements">
                 <h5 class="section-subtitle">Key Achievements</h5>
                 <div class="job-achievements">
                   <div v-for="achievement in job.achievements" :key="achievement" class="achievement-item">
                     {{ achievement }}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = ref([
  {
    id: 1,
    title: 'Senior Web Developer',
    company: 'Crystawall Technologies LLC',
    location: 'Dubai, UAE',
    period: 'Aug 2024 – Present',
    current: true,
    responsibilities: [
      'Building and maintaining backend APIs using Node.js (Express)',
      'Developing modern, interactive frontends with Vue.js and React.js',
      'Maintaining and updating existing Laravel projects',
      'Collaborating with design and QA teams to implement new features',
      'Deploying and managing applications on AWS with focus on scalability',
      'Writing clean, maintainable code following best practices'
    ],
    technologies: [
      { name: 'Node.js', icon: 'devicon:nodejs' },
      { name: 'Express.js', icon: 'devicon:express' },
      { name: 'Vue.js', icon: 'devicon:vuejs' },
      { name: 'React.js', icon: 'devicon:react' },
      { name: 'Laravel', icon: 'devicon:laravel' },
      { name: 'AWS', icon: 'logos:aws' },
      { name: 'MySQL', icon: 'devicon:mysql' },
      { name: 'PostgreSQL', icon: 'devicon:postgresql' }
    ],
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Successfully migrated 5 legacy projects to modern architecture',
      'Led development of 3 major client projects from conception to deployment'
    ]
  },
  {
    id: 2,
    title: 'Senior Web Developer',
    company: 'Ophir IT Solutions',
    location: 'Yangon, Myanmar',
    period: 'Sep 2021 – Mar 2024',
    current: false,
    responsibilities: [
      'Developed scalable web applications using Laravel and Vue.js',
      'Wrote and maintained backend logic and frontend components',
      'Debugged and resolved technical issues across multiple projects',
      'Used Git for version control and contributed to feature development',
      'Interacted with clients to clarify requirements and implement features',
      'Mentored junior developers and conducted code reviews'
    ],
    technologies: [
      { name: 'Laravel', icon: 'devicon:laravel' },
      { name: 'Vue.js', icon: 'devicon:vuejs' },
      { name: 'PHP', icon: 'devicon:php' },
      { name: 'JavaScript', icon: 'devicon:javascript' },
      { name: 'MySQL', icon: 'devicon:mysql' },
      { name: 'Git', icon: 'devicon:git' },
      { name: 'Docker', icon: 'devicon:docker' },
      { name: 'Linux', icon: 'devicon:linux' }
    ],
    achievements: [
      'Delivered 15+ successful projects for international clients',
      'Reduced bug reports by 60% through improved testing practices',
      'Established coding standards and development workflows for the team'
    ]
  },
  {
    id: 3,
    title: 'Front-End Developer',
    company: 'EWhale Myanmar',
    location: 'Yangon, Myanmar',
    period: 'Feb 2020 – Aug 2021',
    current: false,
    responsibilities: [
      'Built responsive and cross-browser-compatible UI components',
      'Collaborated with backend developers and designers for complete solutions',
      'Implemented SEO best practices and performance optimization',
      'Used Git for version control and participated in agile sprints',
      'Created interactive user interfaces with modern JavaScript',
      'Optimized websites for mobile devices and various screen sizes'
    ],
    technologies: [
      { name: 'HTML5', icon: 'devicon:html5' },
      { name: 'CSS3', icon: 'devicon:css3' },
      { name: 'JavaScript', icon: 'devicon:javascript' },
      { name: 'jQuery', icon: 'devicon:jquery' },
      { name: 'Bootstrap', icon: 'devicon:bootstrap' },
      { name: 'SASS', icon: 'devicon:sass' },
      { name: 'Git', icon: 'devicon:git' },
      { name: 'Webpack', icon: 'devicon:webpack' }
    ],
    achievements: [
      'Improved website loading speed by 50% through optimization',
      'Successfully delivered 20+ responsive websites',
      'Achieved 95+ Google PageSpeed scores on all projects'
    ]
  }
])

onMounted(() => {
  // Section title animation
  gsap.fromTo('.section-title', {
    opacity: 0,
    y: 50,
    scale: 0.8
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.experience-section',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Experience cards animation
  gsap.fromTo('.experience-card', {
    opacity: 0,
    y: 100,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.experience-timeline',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
})
</script>

<style scoped>
.experience-mobile {
  width: 100%;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.experience-section {
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
  text-align: center;
}

.experience-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.experience-card {
  padding: 2rem;
  border-radius: 20px;
  background: rgba(34, 139, 34, 0.05);
  border: 1px solid rgba(34, 139, 34, 0.3) !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 139, 34, 0.2);
  border-color: rgba(34, 139, 34, 0.5) !important;
}

/* Override glass-card border for current job */
.experience-card.current-job {
  border-color: rgba(50, 205, 50, 0.5) !important;
  box-shadow: 0 0 20px rgba(50, 205, 50, 0.1);
  background: rgba(50, 205, 50, 0.05);
}

/* Alternative selector for better specificity */
.experience-card[class*="current-job"] {
  border-color: rgba(50, 205, 50, 0.5) !important;
  box-shadow: 0 0 20px rgba(50, 205, 50, 0.1);
  background: rgba(50, 205, 50, 0.05);
}

/* Most specific selector to override glass-card */
.experience-mobile .experience-card.current-job {
  border-color: rgba(50, 205, 50, 0.5) !important;
  box-shadow: 0 0 20px rgba(50, 205, 50, 0.1);
  background: rgba(50, 205, 50, 0.05);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.company-info {
  flex: 1;
  min-width: 250px;
}

.job-title {
  color: #90EE90;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.company-name {
  color: #e8f5e8;
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.job-location {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.job-period {
  color: #90EE90;
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(144, 238, 144, 0.3);
}

.job-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
}

.job-status.current {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
  box-shadow: 0 0 20px rgba(50, 205, 50, 0.3);
}

.job-status.completed {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  border: 1px solid rgba(34, 139, 34, 0.3);
}

.job-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.job-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-subtitle {
  color: #90EE90;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.job-responsibilities {
  margin: 0;
  text-align: left;
}

.responsibility-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: rgba(232, 245, 232, 0.9);
  line-height: 1.6;
  text-align: left;
}

.responsibility-item::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: #32CD32;
  font-size: 0.8rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  padding: 0.5rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(34, 139, 34, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.tech-badge:hover {
  background: rgba(34, 139, 34, 0.3);
  border-color: rgba(34, 139, 34, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 139, 34, 0.2);
}

.tech-icon {
  width: 1rem;
  height: 1rem;
  color: #90EE90;
}

.job-achievements {
  padding-top: 1rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
  text-align: left;
}

.job-achievements h5 {
  color: #90EE90;
  margin-bottom: 0.75rem;
  font-weight: 600;
  text-align: left;
}

.achievement-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: rgba(232, 245, 232, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: left;
}

.achievement-item::before {
  content: '⭐';
  position: absolute;
  left: 0;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .experience-card {
    padding: 1.5rem;
  }
  
  .job-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .company-info {
    min-width: auto;
  }
  
  .job-title {
    font-size: 1.5rem;
  }
  
  .company-name {
    font-size: 1.2rem;
  }
  
  .tech-list {
    gap: 0.5rem;
  }
  
  .tech-badge {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .experience-card {
    padding: 1rem;
  }
  
  .job-title {
    font-size: 1.3rem;
  }
  
  .company-name {
    font-size: 1.1rem;
  }
  
  .job-period {
    font-size: 0.8rem;
  }
}
</style>
