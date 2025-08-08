<template>
  <section id="projects" class="projects section-padding">
    <div class="container">
      <h2 class="section-title text-gradient">Featured Projects</h2>
      <p class="section-subtitle">
        A showcase of my latest work in full-stack development, featuring modern technologies and innovative solutions.
      </p>
      
      <div class="projects-grid">
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="project-card glass-card"
          :class="{ 'featured': project.featured, 'hovered': hoveredProject === index }"
          @mouseenter="setHoveredProject(index)"
          @mouseleave="setHoveredProject(-1)"
          :ref="el => { if (el) projectRefs[index] = el }"
        >
          <div class="project-image">
            <div class="project-preview" :style="{ background: project.gradient }">
              <div class="project-icon">
                <span v-html="project.icon"></span>
              </div>
              <div class="project-tech-preview">
                <div 
                  v-for="tech in project.technologies.slice(0, 3)" 
                  :key="tech"
                  class="tech-dot"
                  :title="tech"
                ></div>
              </div>
            </div>
            <div class="project-overlay">
              <div class="project-actions">
                <a :href="project.demo" class="btn-demo" target="_blank" rel="noopener">
                  <span>🚀</span> Live Demo
                </a>
                <a :href="project.github" class="btn-code" target="_blank" rel="noopener">
                  <span>💻</span> Code
                </a>
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <span v-if="project.featured" class="featured-badge">⭐ Featured</span>
            </div>
            
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-technologies">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            
            <div class="project-stats">
              <div class="stat">
                <span class="stat-icon">⚡</span>
                <span class="stat-text">{{ project.performance }}</span>
              </div>
              <div class="stat">
                <span class="stat-icon">📱</span>
                <span class="stat-text">{{ project.responsive ? 'Responsive' : 'Desktop' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, markRaw } from 'vue'
import { useThree } from '@/composables/useThree'
import { useMouseInteraction } from '@/composables/useMouseInteraction'
import * as THREE from 'three'

const hoveredProject = ref(-1)
const projectRefs = ref<HTMLElement[]>([])
const projectCanvases = ref<{ [key: number]: HTMLCanvasElement }>({})
const projectScenes = ref<{ [key: number]: any }>({})

const { normalizedMouse } = useMouseInteraction()

const projects = ref([
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard. Built with microservices architecture for scalability.',
    technologies: ['Node.js', 'Vue.js', 'MongoDB', 'Stripe API', 'Redis', 'Docker'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '🛒',
    demo: 'https://example-ecommerce.com',
    github: 'https://github.com/leon-99/ecommerce-platform',
    featured: true,
    performance: '95% Lighthouse',
    responsive: true
  },
  {
    id: 2,
    title: 'Real-Time Chat Application',
    description: 'Scalable chat application with WebSocket connections, file sharing, and group messaging. Features end-to-end encryption and offline support.',
    technologies: ['Node.js', 'Socket.io', 'React.js', 'PostgreSQL', 'JWT', 'AWS S3'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '💬',
    demo: 'https://example-chat.com',
    github: 'https://github.com/leon-99/realtime-chat',
    featured: false,
    performance: '92% Lighthouse',
    responsive: true
  },
  {
    id: 3,
    title: 'Task Management Dashboard',
    description: 'Comprehensive project management tool with Kanban boards, time tracking, and team collaboration features. Includes advanced analytics and reporting.',
    technologies: ['Vue.js', 'Express.js', 'MySQL', 'Chart.js', 'Vuex', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    icon: '📊',
    demo: 'https://example-taskboard.com',
    github: 'https://github.com/leon-99/task-dashboard',
    featured: true,
    performance: '98% Lighthouse',
    responsive: true
  },
  {
    id: 4,
    title: 'API Gateway & Microservices',
    description: 'Robust API gateway with rate limiting, authentication, and load balancing. Orchestrates multiple microservices with health monitoring.',
    technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'Nginx', 'Prometheus'],
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    icon: '🔧',
    demo: 'https://api-gateway-demo.com',
    github: 'https://github.com/leon-99/api-gateway',
    featured: false,
    performance: '99% Uptime',
    responsive: false
  },
  {
    id: 5,
    title: 'Social Media Analytics',
    description: 'Advanced analytics platform for social media insights with AI-powered sentiment analysis and automated reporting features.',
    technologies: ['React.js', 'Python', 'TensorFlow', 'D3.js', 'AWS Lambda', 'DynamoDB'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: '📈',
    demo: 'https://social-analytics.com',
    github: 'https://github.com/leon-99/social-analytics',
    featured: true,
    performance: '94% Lighthouse',
    responsive: true
  },
  {
    id: 6,
    title: 'IoT Device Manager',
    description: 'Comprehensive IoT device management platform with real-time monitoring, remote control, and predictive maintenance algorithms.',
    technologies: ['Node.js', 'MQTT', 'InfluxDB', 'Grafana', 'Vue.js', 'WebSocket'],
    gradient: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
    icon: '🌐',
    demo: 'https://iot-manager.com',
    github: 'https://github.com/leon-99/iot-manager',
    featured: false,
    performance: '96% Lighthouse',
    responsive: true
  }
])

const setHoveredProject = (index: number) => {
  hoveredProject.value = index
}

onMounted(async () => {
  await nextTick()
  
  // Create 3D hover effects for each project card
  projectRefs.value.forEach((card, index) => {
    if (!card) return
    
    // Create canvas for 3D effect
    const canvas = document.createElement('canvas')
    canvas.className = 'project-3d-canvas'
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.opacity = '0'
    canvas.style.transition = 'opacity 0.3s ease'
    canvas.style.zIndex = '1'
    
    card.style.position = 'relative'
    card.appendChild(canvas)
    
    projectCanvases.value[index] = canvas
    
    // Initialize Three.js for this project
    const scene = markRaw(new THREE.Scene())
    const camera = markRaw(new THREE.PerspectiveCamera(75, 1, 0.1, 1000))
    const renderer = markRaw(new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    }))
    
    camera.position.z = 5
    
    // Create floating geometric shapes for each project
    const geometries: THREE.Mesh[] = []
    
    // Different shapes for each project type
    const shapeTypes = [
      () => new THREE.BoxGeometry(1, 1, 1),
      () => new THREE.SphereGeometry(0.8, 32, 32),
      () => new THREE.ConeGeometry(0.8, 1.5, 8),
      () => new THREE.CylinderGeometry(0.5, 0.8, 1.5, 6),
      () => new THREE.OctahedronGeometry(1),
      () => new THREE.TorusGeometry(0.8, 0.3, 8, 16)
    ]
    
    const shapeGeometry = shapeTypes[index % shapeTypes.length]()
    
    for (let i = 0; i < 3; i++) {
      const material = markRaw(new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          hovered: { value: 0.0 },
          color: { value: new THREE.Color().setHSL(0.3 + i * 0.1, 0.7, 0.6) }
        },
        vertexShader: `
          uniform float time;
          uniform float hovered;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vPosition = position;
            vNormal = normal;
            
            vec3 pos = position;
            
            // Floating animation
            pos.y += sin(time * 2.0 + position.x * 2.0) * 0.1;
            pos.x += cos(time * 1.5 + position.y * 2.0) * 0.05;
            
            // Hover effect
            pos *= 1.0 + hovered * 0.2;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float hovered;
          uniform vec3 color;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);
            
            vec3 finalColor = color + fresnel * 0.3;
            finalColor += hovered * vec3(0.3, 0.6, 0.2);
            
            float alpha = 0.6 + fresnel * 0.4 + hovered * 0.3;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      }))
      
      const mesh = markRaw(new THREE.Mesh(shapeGeometry.clone(), material))
      
      // Position shapes
      mesh.position.set(
        (i - 1) * 1.5,
        Math.sin(i * Math.PI / 3) * 0.5,
        Math.cos(i * Math.PI / 3) * 0.5
      )
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      scene.add(mesh)
      geometries.push(mesh)
    }
    
    // Lighting
    const ambientLight = markRaw(new THREE.AmbientLight(0x404040, 0.6))
    scene.add(ambientLight)
    
    const pointLight = markRaw(new THREE.PointLight(0x32CD32, 1, 10))
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)
    
    // Store scene data
    projectScenes.value[index] = {
      scene,
      camera,
      renderer,
      geometries,
      time: 0
    }
    
    // Resize handler
    const resizeCanvas = () => {
      const rect = card.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Animation loop for this project
    const animate = () => {
      const sceneData = projectScenes.value[index]
      if (!sceneData) return
      
      sceneData.time += 0.016
      
      const isHovered = hoveredProject.value === index ? 1.0 : 0.0
      
      sceneData.geometries.forEach((mesh: THREE.Mesh, i: number) => {
        // Update shader uniforms
        if (mesh.material instanceof THREE.ShaderMaterial) {
          mesh.material.uniforms.time.value = sceneData.time
          mesh.material.uniforms.hovered.value = isHovered
        }
        
        // Rotation
        mesh.rotation.x += 0.005 + i * 0.002
        mesh.rotation.y += 0.008 + i * 0.001
        mesh.rotation.z += 0.003 + i * 0.003
        
        // Mouse interaction
        const mouseInfluence = normalizedMouse.value.length() * 0.1
        mesh.position.y += Math.sin(sceneData.time + i) * 0.02 + mouseInfluence
      })
      
      // Camera movement
      sceneData.camera.position.x = Math.sin(sceneData.time * 0.1) * 0.5
      sceneData.camera.position.y = Math.cos(sceneData.time * 0.15) * 0.3
      sceneData.camera.lookAt(0, 0, 0)
      
      sceneData.renderer.render(sceneData.scene, sceneData.camera)
      requestAnimationFrame(animate)
    }
    
    animate()
  })
})

// Watch for hover changes to show/hide 3D effects
const watchHover = () => {
  Object.keys(projectCanvases.value).forEach(key => {
    const index = parseInt(key)
    const canvas = projectCanvases.value[index]
    if (canvas) {
      canvas.style.opacity = hoveredProject.value === index ? '1' : '0'
    }
  })
}

// Watch hoveredProject changes
const unwatchHover = ref<Function>()
onMounted(() => {
  unwatchHover.value = watch(hoveredProject, watchHover)
})


</script>

<style scoped>
.projects {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.project-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover,
.project-card.hovered {
  transform: translateY(-10px) rotateX(2deg);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(34, 139, 34, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.project-card.hovered {
  transform: translateY(-15px) rotateX(3deg) scale(1.02);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(34, 139, 34, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.15);
}

.project-card.featured {
  border: 2px solid rgba(144, 238, 144, 0.3);
}

.project-card.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(144, 238, 144, 0.05), transparent);
  pointer-events: none;
  z-index: 1;
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-icon {
  font-size: 4rem;
  opacity: 0.8;
}

.project-tech-preview {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.tech-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.btn-demo,
.btn-code {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-demo {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
}

.btn-code {
  background: transparent;
  color: #90EE90;
  border: 2px solid #32CD32;
}

.btn-demo:hover,
.btn-code:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 139, 34, 0.3);
}

.project-content {
  padding: 1.5rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  color: #90EE90;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.featured-badge {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-description {
  color: rgba(232, 245, 232, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(34, 139, 34, 0.2);
  color: #90EE90;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(34, 139, 34, 0.3);
}

.project-stats {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(34, 139, 34, 0.2);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(232, 245, 232, 0.7);
  font-size: 0.9rem;
}

.stat-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-content {
    padding: 1rem;
  }
  
  .project-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn-demo,
  .btn-code {
    text-align: center;
    justify-content: center;
  }
  
  .project-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
