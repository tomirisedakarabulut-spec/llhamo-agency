import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTouch } from '../hooks/useTouch'

export default function MobileCarousel({ 
  items, 
  renderItem, 
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  className = ""
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { isTouchDevice, touchProps, onTouchEnd, hapticFeedback } = useTouch()
  const containerRef = useRef(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    hapticFeedback('light')
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    hapticFeedback('light')
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    hapticFeedback('medium')
  }

  // Handle touch swipe
  const handleTouchEnd = () => {
    const swipeResult = onTouchEnd()
    if (swipeResult) {
      if (swipeResult.isLeftSwipe) {
        nextSlide()
      } else if (swipeResult.isRightSwipe) {
        prevSlide()
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Carousel Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_#000]"
        {...touchProps}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            className="w-full"
          >
            {renderItem(items[currentIndex], currentIndex)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showArrows && items.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black text-white border-4 border-white shadow-[4px_4px_0px_0px_#DC2626] flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black text-white border-4 border-white shadow-[4px_4px_0px_0px_#DC2626] flex items-center justify-center z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 border-2 border-black transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-red-600 shadow-[2px_2px_0px_0px_#000]'
                  : 'bg-white hover:bg-yellow-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe Hint for Touch Devices */}
      {isTouchDevice && items.length > 1 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 border-2 border-white text-xs font-bold"
        >
          ← SWIPE →
        </motion.div>
      )}
    </div>
  )
}

// Portfolio Item Renderer for Mobile
export const MobilePortfolioItem = ({ item }) => (
  <div className="p-6 text-center">
    <div className="w-full h-48 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] mb-4 flex items-center justify-center">
      <div className="text-6xl">{item.icon}</div>
    </div>
    <h3 
      className="text-xl font-black text-black mb-2"
      style={{ fontFamily: 'Space Grotesk' }}
    >
      {item.title}
    </h3>
    <p className="text-sm font-bold text-black mb-4">
      {item.description}
    </p>
    <div className="flex flex-wrap gap-2 justify-center">
      {item.tags?.map((tag) => (
        <span
          key={tag}
          className="bg-red-600 text-white px-2 py-1 border-2 border-black text-xs font-bold"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)

// Service Item Renderer for Mobile
export const MobileServiceItem = ({ item }) => (
  <div className="p-6 text-center">
    <div className="w-16 h-16 bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_#DC2626] flex items-center justify-center mx-auto mb-4">
      <item.icon className="w-8 h-8" />
    </div>
    <h3 
      className="text-2xl font-black text-black mb-3 leading-tight"
      style={{ fontFamily: 'Space Grotesk' }}
    >
      {item.title}
    </h3>
    <p className="text-sm font-bold text-black mb-4">
      {item.description}
    </p>
    <div className="text-2xl font-black text-red-600 mb-4">
      FROM {item.price}
    </div>
    <motion.button
      whileHover={{ x: -2, y: -2 }}
      whileTap={{ x: 0, y: 0 }}
      className="bg-red-600 text-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold uppercase tracking-wide"
    >
      GET BRUTAL
    </motion.button>
  </div>
)
