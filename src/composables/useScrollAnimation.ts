import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const isVisible = ref(false)

  const observeElement = (element: HTMLElement, threshold: number = 0.1) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }

  return {
    isVisible,
    observeElement
  }
}

export function useParallax() {
  const parallaxOffset = ref(0)

  const updateParallax = () => {
    parallaxOffset.value = window.pageYOffset * 0.5
  }

  onMounted(() => {
    window.addEventListener('scroll', updateParallax)
    updateParallax()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateParallax)
  })

  return {
    parallaxOffset
  }
}
