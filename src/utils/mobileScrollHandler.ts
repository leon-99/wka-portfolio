// Mobile scroll handler utility
export class MobileScrollHandler {
  private static instance: MobileScrollHandler
  private isMobile: boolean
  private isInitialized: boolean = false

  private constructor() {
    this.isMobile = window.innerWidth <= 768
    this.init()
  }

  public static getInstance(): MobileScrollHandler {
    if (!MobileScrollHandler.instance) {
      MobileScrollHandler.instance = new MobileScrollHandler()
    }
    return MobileScrollHandler.instance
  }

  private init(): void {
    if (this.isInitialized) return
    
    if (this.isMobile) {
      this.setupMobileScroll()
    }
    
    this.isInitialized = true
  }

  private setupMobileScroll(): void {
    // Prevent scroll conflicts on mobile
    document.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    
    // Add mobile-specific CSS classes
    document.body.classList.add('mobile-device')
    
    // Disable GSAP ScrollTrigger on mobile for better performance
    if (window.gsap && window.gsap.ScrollTrigger) {
      window.gsap.ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
        ignoreMobileResize: true
      })
    }
  }

  private handleTouchMove = (event: TouchEvent): void => {
    // Allow normal scrolling but prevent conflicts
    const target = event.target as HTMLElement
    if (target.closest('.nav-links')) {
      // Allow scrolling in mobile menu
      return
    }
    
    // Prevent horizontal scroll on mobile
    if (Math.abs(event.touches[0].clientX - (event.touches[0].clientX || 0)) > 
        Math.abs(event.touches[0].clientY - (event.touches[0].clientY || 0))) {
      event.preventDefault()
    }
  }

  public isMobileDevice(): boolean {
    return this.isMobile
  }

  public cleanup(): void {
    if (this.isMobile) {
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.body.classList.remove('mobile-device')
    }
  }
}

// Initialize on module load
MobileScrollHandler.getInstance()

// Export for use in components
export default MobileScrollHandler
