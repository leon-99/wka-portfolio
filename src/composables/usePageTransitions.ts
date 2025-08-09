import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export function usePageTransitions() {
  
  // Simple smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId)
    if (!section) return
    
    // Simple scroll without loading overlay
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: section,
        offsetY: 80
      },
      ease: 'power2.inOut'
    })
  }
  
  // Page entrance animation
  const initPageEntrance = () => {
    const tl = gsap.timeline()
    
    // Create entrance overlay
    const overlay = document.createElement('div')
    overlay.className = 'page-entrance-overlay'
    overlay.innerHTML = `
      <div class="entrance-content">
        <div class="entrance-logo">
          <span class="text-gradient">WKA</span>
        </div>
        <div class="entrance-tagline">Full Stack Developer</div>
        <div class="entrance-loader">
          <div class="loader-bar"></div>
        </div>
      </div>
    `
    document.body.appendChild(overlay)
    
    // Animate entrance sequence
    tl.fromTo('.entrance-logo', {
      scale: 0,
      rotation: -180,
      opacity: 0
    }, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.8)'
    })
    .fromTo('.entrance-tagline', {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    .fromTo('.loader-bar', {
      width: '0%'
    }, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=0.2')
    .to(overlay, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.removeChild(overlay)
      }
    })
  }
  
  // Section reveal animations (simplified to avoid scroll conflicts)
  const initSectionReveals = () => {
    // Skip section reveals that might interfere with scroll
    // Individual components handle their own scroll triggers
    console.log('Section reveals initialized (using component-level animations)')
  }
  
  // Cursor trail effect
  const initCursorTrail = () => {
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)
    
    const trail: HTMLElement[] = []
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement('div')
      dot.className = 'cursor-trail-dot'
      document.body.appendChild(dot)
      trail.push(dot)
    }
    
    let mouseX = 0
    let mouseY = 0
    
    document.addEventListener('mousemove', (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      })
      
      trail.forEach((dot, index) => {
        gsap.to(dot, {
          x: mouseX,
          y: mouseY,
          duration: 0.3 + index * 0.1,
          ease: 'power2.out'
        })
      })
    })
    
    // Interactive cursor effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category')
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          scale: 2,
          backgroundColor: 'rgba(50, 205, 50, 0.3)',
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'rgba(144, 238, 144, 0.5)',
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })
    })
  }
  
  // Magnetic buttons effect
  const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-links a')
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = (button as HTMLElement).getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left - rect.width / 2
        const y = mouseEvent.clientY - rect.top - rect.height / 2
        
        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        })
      })
    })
  }
  
  // Text reveal animation (disabled to preserve section titles)
  const initTextReveal = () => {
    // Disabled to prevent breaking section titles
    // Individual components handle their own title animations
    console.log('Text reveal disabled - using component-level animations')
  }
  
  return {
    scrollToSection,
    initPageEntrance,
    initSectionReveals,
    initCursorTrail,
    initMagneticButtons,
    initTextReveal
  }
}
