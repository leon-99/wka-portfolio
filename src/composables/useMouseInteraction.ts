import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

export function useMouseInteraction() {
  const mousePosition = ref(new THREE.Vector2(0, 0))
  const normalizedMouse = ref(new THREE.Vector2(0, 0))
  
  const updateMousePosition = (event: MouseEvent) => {
    // Normalized coordinates (-1 to 1)
    normalizedMouse.value.x = (event.clientX / window.innerWidth) * 2 - 1
    normalizedMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1
    
    // Pixel coordinates
    mousePosition.value.x = event.clientX
    mousePosition.value.y = event.clientY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
  })
  
  return {
    mousePosition,
    normalizedMouse
  }
}

export function useRaycaster(camera: any, scene: any) {
  const raycaster = new THREE.Raycaster()
  const intersectedObjects = ref<THREE.Object3D[]>([])
  
  const updateRaycaster = (normalizedMouse: THREE.Vector2) => {
    if (!camera.value || !scene.value) return
    
    raycaster.setFromCamera(normalizedMouse, camera.value)
    const intersects = raycaster.intersectObjects(scene.value.children, true)
    
    intersectedObjects.value = intersects.map(intersect => intersect.object)
  }
  
  return {
    raycaster,
    intersectedObjects,
    updateRaycaster
  }
}
