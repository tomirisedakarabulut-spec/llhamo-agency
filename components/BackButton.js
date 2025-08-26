import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function BackButton({ 
  showHome = true, 
  className = '',
  variant = 'default'
}) {
  const router = useRouter()

  const goBack = () => {
    console.log('Back button clicked!')
    if (window.history.length > 1) {
      console.log('Going back...')
      router.back()
    } else {
      console.log('Going home...')
      router.push('/')
    }
  }

  const goHome = () => {
    console.log('Home button clicked!')
    router.push('/')
  }

  if (variant === 'floating') {
    return (
      <div className="fixed top-6 left-6 z-[99999] flex items-center space-x-2 pointer-events-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="px-6 py-4 bg-yellow-300 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 font-bold text-sm flex items-center space-x-2 group cursor-pointer pointer-events-auto"
          aria-label="Önceki sayfaya dön"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>GERİ</span>
        </motion.button>

        {/* Home Button */}
        {showHome && (
                  <motion.button
          whileHover={{ x: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goHome}
          className="px-6 py-4 bg-yellow-300 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 font-bold text-sm flex items-center space-x-2 group cursor-pointer pointer-events-auto"
          aria-label="Ana sayfaya dön"
        >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>ANA SAYFA</span>
          </motion.button>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goBack}
        className="px-4 py-2 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 font-bold text-sm flex items-center space-x-2 group"
        aria-label="Önceki sayfaya dön"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        <span>GERİ</span>
      </motion.button>

      {/* Home Button */}
      {showHome && (
        <motion.button
          whileHover={{ x: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goHome}
          className="px-4 py-2 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 font-bold text-sm flex items-center space-x-2 group"
          aria-label="Ana sayfaya dön"
        >
          <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          <span>ANA SAYFA</span>
        </motion.button>
      )}
    </div>
  )
}

// Preset configurations
export const FloatingBackButton = (props) => {
  return <BackButton variant="floating" {...props} />
}

export const InlineBackButton = (props) => {
  return <BackButton variant="inline" {...props} />
}
