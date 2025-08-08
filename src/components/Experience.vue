<template>
  <section id="experience" class="experience section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Professional Experience</h2>
      
      <div class="timeline">
        <div 
          v-for="(job, index) in experiences" 
          :key="job.id"
          class="timeline-item"
          :class="{ 'timeline-item-left': index % 2 === 0, 'timeline-item-right': index % 2 !== 0 }"
        >
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
            <div class="timeline-date">{{ job.period }}</div>
          </div>
          
          <div class="timeline-content glass-card">
            <div class="job-header">
              <div class="company-info">
                <h3 class="job-title">{{ job.title }}</h3>
                <h4 class="company-name">{{ job.company }}</h4>
                <p class="job-location">{{ job.location }}</p>
              </div>
              <div class="job-status" :class="job.current ? 'current' : 'completed'">
                {{ job.current ? 'Current' : 'Completed' }}
              </div>
            </div>
            
            <ul class="job-responsibilities">
              <li v-for="responsibility in job.responsibilities" :key="responsibility">
                {{ responsibility }}
              </li>
            </ul>
            
            <div class="job-technologies">
              <span class="tech-label">Technologies:</span>
              <div class="tech-list">
                <span 
                  v-for="tech in job.technologies" 
                  :key="tech"
                  class="tech-badge"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <div class="job-achievements" v-if="job.achievements">
              <h5>Key Achievements:</h5>
              <ul>
                <li v-for="achievement in job.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="education-section">
        <h3 class="education-title text-gradient">Education & Certifications</h3>
        <div class="education-grid">
          <div v-for="edu in education" :key="edu.id" class="education-card glass-card">
            <div class="education-icon">
              <span v-html="edu.icon"></span>
            </div>
            <div class="education-info">
              <h4>{{ edu.title }}</h4>
              <p class="education-institution">{{ edu.institution }}</p>
              <p class="education-year">{{ edu.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
    technologies: ['Node.js', 'Express.js', 'Vue.js', 'React.js', 'Laravel', 'AWS', 'MySQL', 'PostgreSQL'],
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
    technologies: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'MySQL', 'Git', 'Docker', 'Linux'],
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
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'SASS', 'Git', 'Webpack'],
    achievements: [
      'Improved website loading speed by 50% through optimization',
      'Successfully delivered 20+ responsive websites',
      'Achieved 95+ Google PageSpeed scores on all projects'
    ]
  }
])

const education = ref([
  {
    id: 1,
    title: 'Computer Science',
    institution: 'Mawbi University, Yangon',
    year: '2016-2020',
    icon: '🎓'
  },
  {
    id: 2,
    title: 'CS50x - Computer Science',
    institution: 'Harvard University (Online)',
    year: '2019',
    icon: '🏆'
  }
])
</script>

<style scoped>
.experience {
  background: linear-gradient(135deg, rgba(10, 26, 10, 0.2) 0%, rgba(26, 47, 26, 0.1) 100%);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #32CD32, transparent);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  width: 50%;
}

.timeline-item-left {
  left: 0;
  padding-right: 3rem;
}

.timeline-item-right {
  left: 50%;
  padding-left: 3rem;
}

.timeline-marker {
  position: absolute;
  top: 2rem;
}

.timeline-item-left .timeline-marker {
  right: -1rem;
}

.timeline-item-right .timeline-marker {
  left: -1rem;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #32CD32, #228B22);
  border: 4px solid rgba(10, 26, 10, 0.8);
  box-shadow: 0 0 20px rgba(50, 205, 50, 0.5);
  position: relative;
  z-index: 2;
}

.timeline-date {
  position: absolute;
  top: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(26, 47, 26, 0.9);
  color: #90EE90;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(34, 139, 34, 0.3);
  z-index: 10;
}

.timeline-content {
  padding: 2rem;
  position: relative;
}

.timeline-item-left .timeline-content::before {
  content: '';
  position: absolute;
  top: 2rem;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid rgba(26, 47, 26, 0.15);
}

.timeline-item-right .timeline-content::before {
  content: '';
  position: absolute;
  top: 2rem;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid rgba(26, 47, 26, 0.15);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.job-title {
  color: #90EE90;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.company-name {
  color: #e8f5e8;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.job-location {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
}

.job-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
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

.job-responsibilities {
  list-style: none;
  margin-bottom: 1.5rem;
}

.job-responsibilities li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: rgba(232, 245, 232, 0.9);
  line-height: 1.5;
}

.job-responsibilities li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: #32CD32;
  font-size: 0.8rem;
}

.job-technologies {
  margin-bottom: 1.5rem;
}

.tech-label {
  color: #90EE90;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(34, 139, 34, 0.3);
}

.job-achievements {
  padding-top: 1rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
}

.job-achievements h5 {
  color: #90EE90;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.job-achievements ul {
  list-style: none;
}

.job-achievements li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.25rem;
  color: rgba(232, 245, 232, 0.8);
  font-size: 0.9rem;
}

.job-achievements li::before {
  content: '⭐';
  position: absolute;
  left: 0;
  font-size: 0.8rem;
}

.education-section {
  margin-top: 5rem;
  text-align: center;
}

.education-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.education-card {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
  transition: transform 0.3s ease;
}

.education-card:hover {
  transform: translateY(-5px);
}

.education-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 139, 34, 0.2);
  border-radius: 50%;
  flex-shrink: 0;
}

.education-info h4 {
  color: #90EE90;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.education-institution {
  color: #e8f5e8;
  margin-bottom: 0.25rem;
}

.education-year {
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .timeline::before {
    left: 2rem;
  }
  
  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 4rem !important;
    padding-right: 0 !important;
  }
  
  .timeline-marker {
    left: 1rem !important;
    right: auto !important;
  }
  
  .timeline-content::before {
    left: -10px !important;
    right: auto !important;
    border-right: 10px solid rgba(26, 47, 26, 0.15) !important;
    border-left: none !important;
  }
  
  .job-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .education-grid {
    grid-template-columns: 1fr;
  }
  
  .education-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
