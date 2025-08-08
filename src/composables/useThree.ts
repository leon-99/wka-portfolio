import { ref, onUnmounted, markRaw } from 'vue'
import * as THREE from 'three'

export function useThree(canvasRef: any) {
  const scene = ref<THREE.Scene | null>(null)
  const camera = ref<THREE.PerspectiveCamera | null>(null)
  const renderer = ref<THREE.WebGLRenderer | null>(null)
  const animationId = ref<number | null>(null)

  const init = () => {
    if (!canvasRef.value) {
      console.warn('Canvas ref not available')
      return () => {}
    }

    try {
      // Scene - mark as raw to prevent Vue reactivity
      scene.value = markRaw(new THREE.Scene())

      // Camera
      const canvas = canvasRef.value
      const rect = canvas.getBoundingClientRect()
      const aspect = rect.width / rect.height || window.innerWidth / window.innerHeight

      camera.value = markRaw(new THREE.PerspectiveCamera(75, aspect, 0.1, 1000))
      camera.value.position.set(0, 0, 5)

      // Renderer
      renderer.value = markRaw(new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      }))
      
      renderer.value.setSize(rect.width || window.innerWidth, rect.height || window.innerHeight)
      renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.value.setClearColor(0x000000, 0)
      renderer.value.outputColorSpace = THREE.SRGBColorSpace

      // Handle resize
      const handleResize = () => {
        if (!camera.value || !renderer.value || !canvasRef.value) return
        
        const rect = canvasRef.value.getBoundingClientRect()
        const newAspect = rect.width / rect.height
        
        camera.value.aspect = newAspect
        camera.value.updateProjectionMatrix()
        renderer.value.setSize(rect.width, rect.height)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        dispose()
      }
    } catch (error) {
      console.error('Three.js initialization error:', error)
      return () => {}
    }
  }

  const animate = (callback?: () => void) => {
    if (!renderer.value || !scene.value || !camera.value) {
      console.warn('Three.js not properly initialized')
      return
    }

    // Store references to avoid reactivity issues
    const rendererRef = renderer.value
    const sceneRef = scene.value
    const cameraRef = camera.value

    const tick = () => {
      try {
        if (callback) callback()
        
        // Use stored references instead of reactive ones
        if (rendererRef && sceneRef && cameraRef) {
          rendererRef.render(sceneRef, cameraRef)
        }
        
        animationId.value = requestAnimationFrame(tick)
      } catch (error) {
        console.error('Animation error:', error)
        if (animationId.value) {
          cancelAnimationFrame(animationId.value)
          animationId.value = null
        }
      }
    }
    tick()
  }

  const dispose = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
      animationId.value = null
    }
    
    if (renderer.value) {
      renderer.value.dispose()
      renderer.value.forceContextLoss()
    }
    
    // Clear references
    scene.value = null
    camera.value = null
    renderer.value = null
  }

  onUnmounted(() => {
    dispose()
  })

  return {
    scene,
    camera,
    renderer,
    init,
    animate,
    dispose
  }
}
