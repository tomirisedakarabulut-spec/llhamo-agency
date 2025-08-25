import { motion } from 'framer-motion'

export default function MandalaLogo({ 
  size = 'md', 
  animate = true, 
  className = '',
  colors = {
    background: 'bg-red-600',
    border: 'border-black',
    shadow: 'shadow-[4px_4px_0px_0px_#000]',
    center: 'bg-yellow-300',
    inner: 'bg-white',
    middle: 'bg-yellow-300',
    outer: 'bg-black'
  }
}) {
  const sizeConfig = {
    xs: {
      container: 'w-10 h-10',
      center: 'w-2.5 h-2.5',
      inner: 'w-1.5 h-1.5',
      middle: 'w-1.5 h-2.5',
      outer: 'w-0.5 h-0.5',
      border: 'border-2'
    },
    sm: {
      container: 'w-16 h-16',
      center: 'w-4 h-4',
      inner: 'w-3 h-3',
      middle: 'w-3 h-4',
      outer: 'w-1.5 h-1.5',
      border: 'border-4'
    },
    md: {
      container: 'w-20 h-20',
      center: 'w-5 h-5',
      inner: 'w-4 h-4',
      middle: 'w-3 h-5',
      outer: 'w-2 h-2',
      border: 'border-4'
    },
    lg: {
      container: 'w-28 h-28',
      center: 'w-7 h-7',
      inner: 'w-5 h-5',
      middle: 'w-4 h-7',
      outer: 'w-2.5 h-2.5',
      border: 'border-6'
    },
    xl: {
      container: 'w-40 h-40',
      center: 'w-10 h-10',
      inner: 'w-8 h-8',
      middle: 'w-5 h-10',
      outer: 'w-4 h-4',
      border: 'border-8'
    }
  }

  const config = sizeConfig[size]

  const LogoComponent = (
    <div 
      className={`
        ${config.container} 
        ${colors.background} 
        ${config.border} 
        ${colors.border} 
        ${colors.shadow} 
        flex items-center justify-center 
        transform -rotate-3 
        relative overflow-hidden 
        ${className}
      `}
    >
      {/* Neo Brutalist Mandala Pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Center Circle */}
        <div className={`${config.center} ${colors.center} border-2 ${colors.border} rounded-full absolute`}></div>
        
        {/* Inner Ring - 4 squares */}
        <div className={`${config.inner} ${colors.inner} border-2 ${colors.border} absolute -top-2 left-1/2 transform -translate-x-1/2`}></div>
        <div className={`${config.inner} ${colors.inner} border-2 ${colors.border} absolute -bottom-2 left-1/2 transform -translate-x-1/2`}></div>
        <div className={`${config.inner} ${colors.inner} border-2 ${colors.border} absolute top-1/2 -left-2 transform -translate-y-1/2`}></div>
        <div className={`${config.inner} ${colors.inner} border-2 ${colors.border} absolute top-1/2 -right-2 transform -translate-y-1/2`}></div>
        
        {/* Middle Ring - 4 rotated rectangles */}
        <div className={`${config.middle} ${colors.middle} border border-white absolute top-1 left-1/2 transform -translate-x-1/2 rotate-45`}></div>
        <div className={`${config.middle} ${colors.middle} border border-white absolute bottom-1 left-1/2 transform -translate-x-1/2 rotate-45`}></div>
        <div className={`h-2 ${config.middle.replace('h-4', 'w-4')} ${colors.middle} border border-white absolute top-1/2 left-1 transform -translate-y-1/2 rotate-45`}></div>
        <div className={`h-2 ${config.middle.replace('h-4', 'w-4')} ${colors.middle} border border-white absolute top-1/2 right-1 transform -translate-y-1/2 rotate-45`}></div>
        
        {/* Outer Ring - 8 small squares */}
        <div className={`${config.outer} ${colors.outer} border border-white absolute top-0 left-1/2 transform -translate-x-1/2`}></div>
        <div className={`${config.outer} ${colors.outer} border border-white absolute bottom-0 left-1/2 transform -translate-x-1/2`}></div>
        <div className={`${config.outer} ${colors.outer} border border-white absolute top-1/2 left-0 transform -translate-y-1/2`}></div>
        <div className={`${config.outer} ${colors.outer} border border-white absolute top-1/2 right-0 transform -translate-y-1/2`}></div>
        <div className={`${config.outer} ${colors.outer} border border-white absolute top-1 left-1`}></div>
        <div className={`${config.outer} ${colors.outer} border border-white absolute top-1 right-1`}></div>
        <div className={`${config.outer} ${colors.outer} border border-white absolute bottom-1 left-1`}></div>
        <div className={`${config.outer} ${colors.outer} border border-white absolute bottom-1 right-1`}></div>
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        {LogoComponent}
      </motion.div>
    )
  }

  return LogoComponent
}

// Preset configurations for different contexts
export const NavbarMandala = (props) => (
  <MandalaLogo 
    size="sm" 
    colors={{
      background: 'bg-red-600',
      border: 'border-black',
      shadow: 'shadow-[4px_4px_0px_0px_#000]',
      center: 'bg-yellow-300',
      inner: 'bg-white',
      middle: 'bg-yellow-300',
      outer: 'bg-black'
    }}
    {...props} 
  />
)

export const FooterMandala = (props) => (
  <MandalaLogo 
    size="md" 
    colors={{
      background: 'bg-red-600',
      border: 'border-white',
      shadow: 'shadow-[6px_6px_0px_0px_#FDE047]',
      center: 'bg-yellow-300',
      inner: 'bg-white',
      middle: 'bg-yellow-300',
      outer: 'bg-black'
    }}
    {...props} 
  />
)

export const HeroMandala = (props) => (
  <MandalaLogo 
    size="sm" 
    colors={{
      background: 'bg-red-600',
      border: 'border-black',
      shadow: 'shadow-none',
      center: 'bg-yellow-300',
      inner: 'bg-white',
      middle: 'bg-yellow-300',
      outer: 'bg-black'
    }}
    animate={false}
    {...props} 
  />
)
