import { useState, useEffect } from 'react'

export const useTouch = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      )
    }
    
    setIsTouchDevice(checkTouch())
  }, [])

  // Swipe detection
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    return {
      isLeftSwipe,
      isRightSwipe,
      distance
    }
  }

  // Touch gestures
  const touchProps = {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }

  // Haptic feedback (if supported)
  const hapticFeedback = (type = 'light') => {
    if (window.navigator && window.navigator.vibrate) {
      switch (type) {
        case 'light':
          window.navigator.vibrate(10)
          break
        case 'medium':
          window.navigator.vibrate(20)
          break
        case 'heavy':
          window.navigator.vibrate(50)
          break
        default:
          window.navigator.vibrate(10)
      }
    }
  }

  return {
    isTouchDevice,
    touchProps,
    onTouchEnd,
    hapticFeedback
  }
}

// Touch-optimized button variants
export const touchVariants = {
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2 }
  }
}

// Mobile-specific animations
export const mobileAnimations = {
  // Faster animations for mobile
  fastSlide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 }
  },
  
  // Touch-friendly hover states
  touchHover: {
    scale: 1.05,
    transition: { duration: 0.15 }
  },
  
  // Swipe animations
  swipeLeft: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3 }
  },
  
  swipeRight: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.3 }
  }
}
