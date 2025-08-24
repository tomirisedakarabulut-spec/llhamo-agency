import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    orientation: 'portrait'
  })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        orientation: width > height ? 'landscape' : 'portrait'
      })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    window.addEventListener('orientationchange', updateScreenSize)

    return () => {
      window.removeEventListener('resize', updateScreenSize)
      window.removeEventListener('orientationchange', updateScreenSize)
    }
  }, [])

  return screenSize
}

// Mobile-optimized container
export const MobileContainer = ({ children, className = "" }) => {
  const { isMobile } = useResponsive()
  
  return (
    <div className={`
      ${isMobile ? 'px-4 py-2' : 'px-6 py-4'}
      ${className}
    `}>
      {children}
    </div>
  )
}

// Responsive grid component
export const ResponsiveGrid = ({ 
  children, 
  mobile = 1, 
  tablet = 2, 
  desktop = 3,
  gap = 4,
  className = "" 
}) => {
  return (
    <div className={`
      grid 
      grid-cols-${mobile} 
      tablet:grid-cols-${tablet} 
      lg:grid-cols-${desktop}
      gap-${gap}
      ${className}
    `}>
      {children}
    </div>
  )
}

// Mobile-first text component
export const ResponsiveText = ({ 
  children, 
  mobile = "text-sm", 
  tablet = "text-base", 
  desktop = "text-lg",
  className = ""
}) => {
  return (
    <div className={`
      ${mobile}
      tablet:${tablet}
      lg:${desktop}
      ${className}
    `}>
      {children}
    </div>
  )
}

// Touch-optimized button
export const TouchButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  size = "medium",
  className = "",
  ...props 
}) => {
  const { isMobile } = useResponsive()
  
  const baseClasses = "font-bold border-4 border-black transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2"
  
  const variants = {
    primary: "bg-red-600 text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000]",
    secondary: "bg-yellow-300 text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000]",
    outline: "bg-white text-black border-black hover:bg-yellow-300"
  }
  
  const sizes = {
    small: isMobile ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm",
    medium: isMobile ? "px-4 py-3 text-sm" : "px-6 py-3 text-base",
    large: isMobile ? "px-6 py-4 text-base" : "px-8 py-4 text-lg"
  }
  
  return (
    <motion.button
      whileHover={isMobile ? {} : { x: -2, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${isMobile ? 'min-h-[44px] min-w-[44px]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Mobile-optimized card
export const ResponsiveCard = ({ 
  children, 
  className = "",
  padding = "responsive" 
}) => {
  const { isMobile, isTablet } = useResponsive()
  
  const paddingClasses = {
    responsive: isMobile ? "p-4" : isTablet ? "p-6" : "p-8",
    small: "p-4",
    medium: "p-6",
    large: "p-8"
  }
  
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -5 }}
      className={`
        bg-white 
        border-4 
        border-black 
        shadow-[4px_4px_0px_0px_#000]
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

// Responsive section wrapper
export const ResponsiveSection = ({ 
  children, 
  background = "yellow",
  className = "" 
}) => {
  const { isMobile } = useResponsive()
  
  const backgrounds = {
    yellow: "bg-yellow-300",
    black: "bg-black text-white",
    red: "bg-red-600 text-white",
    white: "bg-white text-black"
  }
  
  return (
    <section className={`
      ${backgrounds[background]}
      ${isMobile ? 'py-8' : 'py-16'}
      ${className}
    `}>
      <div className="container mx-auto px-4 max-w-6xl">
        {children}
      </div>
    </section>
  )
}

// Mobile navigation helper
export const MobileNavigation = ({ isOpen, onClose, children }) => {
  const { isMobile } = useResponsive()
  
  if (!isMobile) return null
  
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-yellow-300 border-l-4 border-black z-50 overflow-y-auto"
    >
      {children}
    </motion.div>
  )
}

// Device-specific component renderer
export const DeviceSpecific = ({ mobile, tablet, desktop }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive()
  
  if (isMobile && mobile) return mobile
  if (isTablet && tablet) return tablet
  if (isDesktop && desktop) return desktop
  
  return desktop || tablet || mobile
}
