import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export interface MorphingTextOptions {
  morphCount?: number
  morphDelay?: number
  staggerDelay?: number
  randomChars?: string
}

export function useMorphingText(options: MorphingTextOptions = {}) {
  const {
    morphCount = 8,
    morphDelay = 50,
    staggerDelay = 20,
    randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
  } = options

  const letters = ref<HTMLElement[]>([])
  const isAnimating = ref(false)
  const animationTimeline = ref<gsap.core.Timeline | null>(null)

  const setupMorphingText = (letterElements: NodeListOf<Element>) => {
    letters.value = Array.from(letterElements) as HTMLElement[]
    
    // Don't set initial states - keep letters visible
    // The letters will be animated by the animateLetters function
    
    // Ensure the letters are in the DOM and visible
    letters.value.forEach(letter => {
      letter.style.visibility = 'visible'
      letter.style.display = 'inline-block'
    })
  }

  const startMorphingEffect = () => {
    if (isAnimating.value) return
    isAnimating.value = true

    letters.value.forEach((letter, index) => {
      const originalChar = letter.getAttribute('data-char')
      if (!originalChar) return

      let morphCountCurrent = 0
      
      const morphInterval = setInterval(() => {
        if (morphCountCurrent < morphCount) {
          letter.textContent = randomChars[Math.floor(Math.random() * randomChars.length)]
          morphCountCurrent++
        } else {
          letter.textContent = originalChar
          clearInterval(morphInterval)
        }
      }, morphDelay + index * staggerDelay)
    })
  }

  const animateLetters = (onComplete?: () => void) => {
    if (!letters.value.length) return

    animationTimeline.value = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
        // Add continuous floating and rotation
        gsap.to(letters.value, {
          rotationY: '+=5',
          rotationX: '+=2',
          duration: 2,
          stagger: 0.1,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        })
      }
    })

    // Ensure letters are visible and add floating animation
    animationTimeline.value.to(letters.value, {
      opacity: 1,
      scale: 1.05,
      duration: 0.5,
      stagger: {
        each: 0.1,
        from: 'random'
      },
      ease: 'elastic.out(1, 0.6)',
      onComplete: () => {
        // Reset scale and add continuous floating
        gsap.to(letters.value, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    })

    return animationTimeline.value
  }

  const addInteractiveEffects = (container: HTMLElement) => {
    if (!letters.value.length || !container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height
      
      letters.value.forEach((letter, index) => {
        const delay = index * 0.02
        gsap.to(letter, {
          rotationY: deltaX * 15,
          rotationX: -deltaY * 10,
          z: Math.abs(deltaX + deltaY) * 20,
          duration: 0.6,
          delay: delay,
          ease: 'power2.out'
        })
      })
    }

    const handleMouseLeave = () => {
      gsap.to(letters.value, {
        rotationY: 0,
        rotationX: 0,
        z: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Return cleanup function
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  const addMagneticEffect = () => {
    if (!letters.value.length) return

    const tl = gsap.timeline()
    
    // Magnetic pull effect
    tl.to(letters.value, {
      y: -20,
      duration: 0.6,
      stagger: 0.05,
      ease: 'back.out(2)',
      yoyo: true,
      repeat: 1
    }, 0.8)
    
    // Glitch effect
    .to(letters.value, {
      x: () => Math.random() * 10 - 5,
      duration: 0.1,
      stagger: 0.02,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut'
    }, 1.0)
    
    // Reset position
    .to(letters.value, {
      x: 0,
      scale: 1.05,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, 1.2)
    .to(letters.value, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 1.4)

    return tl
  }

  const setLetterColor = (color: string, textShadow: string) => {
    gsap.set(letters.value, {
      color: color,
      textShadow: textShadow
    })
  }

  const cleanup = () => {
    if (animationTimeline.value) {
      animationTimeline.value.kill()
    }
    isAnimating.value = false
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    letters,
    isAnimating,
    setupMorphingText,
    startMorphingEffect,
    animateLetters,
    addInteractiveEffects,
    addMagneticEffect,
    setLetterColor,
    cleanup
  }
}
