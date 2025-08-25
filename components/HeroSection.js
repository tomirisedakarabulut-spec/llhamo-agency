import { motion } from 'framer-motion'
import { ArrowRight, Zap, Star, Crown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-yellow-300 pt-16 sm:pt-20 overflow-hidden">
      {/* Neo Brutalist Background Elements - Improved Responsive */}
      <div className="absolute inset-0">
        {/* Desktop Geometric shapes */}
        <div className="hidden md:block absolute top-20 left-10 w-32 h-32 bg-red-600 border-4 border-black shadow-[8px_8px_0px_0px_#000] transform rotate-12"></div>
        <div className="hidden md:block absolute top-40 right-20 w-24 h-24 bg-black border-4 border-black shadow-[6px_6px_0px_0px_#DC2626] transform -rotate-12"></div>
        <div className="hidden md:block absolute bottom-40 left-1/4 w-20 h-20 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-45"></div>
        <div className="hidden md:block absolute bottom-20 right-1/3 w-16 h-16 bg-red-600 border-4 border-black transform rotate-12"></div>
        
        {/* Tablet Geometric shapes */}
        <div className="hidden sm:block md:hidden absolute top-16 left-6 w-20 h-20 bg-red-600 border-3 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-12"></div>
        <div className="hidden sm:block md:hidden absolute top-32 right-8 w-16 h-16 bg-black border-3 border-black shadow-[3px_3px_0px_0px_#DC2626] transform -rotate-12"></div>
        <div className="hidden sm:block md:hidden absolute bottom-32 left-1/3 w-12 h-12 bg-white border-3 border-black shadow-[2px_2px_0px_0px_#000] transform rotate-45"></div>
        
        {/* Mobile Geometric shapes - Improved */}
        <div className="sm:hidden absolute top-12 right-3 w-12 h-12 bg-red-600 border-2 border-black shadow-[2px_2px_0px_0px_#000] transform rotate-12"></div>
        <div className="sm:hidden absolute top-24 left-3 w-8 h-8 bg-black border-2 border-black shadow-[1px_1px_0px_0px_#DC2626] transform -rotate-12"></div>
        <div className="sm:hidden absolute bottom-24 right-4 w-6 h-6 bg-white border-2 border-black shadow-[1px_1px_0px_0px_#000] transform rotate-45"></div>
        <div className="sm:hidden absolute bottom-12 left-4 w-4 h-4 bg-red-600 border-2 border-black transform rotate-12"></div>
      </div>

      {/* Main Content - Improved Responsive */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Neo Brutalist Badge - Improved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="neo-badge inline-flex items-center space-x-1 sm:space-x-2 mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              <span className="font-bold">DIVINE MARKETING GODS</span>
            </motion.div>

            {/* Main Headline - Improved Mobile Responsive */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-black mb-4 sm:mb-6 lg:mb-8 leading-tight tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              <span className="block sm:inline">TRANSFORM</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> YOUR</span>
              <br />
              <span className="bg-red-600 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 border-2 sm:border-3 lg:border-4 border-black shadow-[2px_2px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] lg:shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl">
                BRAND
              </span>
            </motion.h1>

            {/* Subtitle - Improved */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl font-bold text-black mb-6 sm:mb-8 max-w-lg leading-tight"
            >
              WE SMASH BORING MARKETING WITH BRUTAL CREATIVITY AND DIVINE POWER!
            </motion.p>

            {/* Stats - Improved Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8"
            >
              {[
                { number: '500+', label: 'BRANDS\nCRUSHED' },
                { number: '98%', label: 'SUCCESS\nRATE' },
                { number: '24/7', label: 'BRUTAL\nSUPPORT' },
                { number: '∞', label: 'CREATIVE\nPOWER' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="neo-grid-item text-center p-2 sm:p-3 lg:p-4 border-2 sm:border-3 border-black bg-white shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] lg:shadow-[4px_4px_0px_0px_#000]"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-black text-red-600 mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm font-bold text-black whitespace-pre-line leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Improved Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-red-600 text-white font-black text-sm sm:text-base lg:text-lg uppercase tracking-wider border-2 sm:border-3 lg:border-4 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] lg:shadow-[8px_8px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] sm:hover:shadow-[8px_8px_0px_0px_#000] lg:hover:shadow-[10px_10px_0px_0px_#000] transition-all duration-200"
                >
                  GET BRUTAL NOW
                  <ArrowRight className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </motion.button>
              </Link>
              
              <Link href="/portfolio" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-white text-black font-black text-sm sm:text-base lg:text-lg uppercase tracking-wider border-2 sm:border-3 lg:border-4 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] lg:shadow-[8px_8px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] sm:hover:shadow-[8px_8px_0px_0px_#000] lg:hover:shadow-[10px_10px_0px_0px_#000] transition-all duration-200"
                >
                  VIEW WORK
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Large Neo Brutalist Logo */}
              <div className="w-80 h-80 bg-red-600 border-8 border-black shadow-[16px_16px_0px_0px_#000] flex items-center justify-center transform rotate-3 relative overflow-hidden">
                <div className="absolute inset-4 bg-yellow-300 border-4 border-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-black text-6xl text-black mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                      LHAMO
                    </div>
                    <div className="font-bold text-xl text-red-600 tracking-widest">
                      GODDESS.COGO
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-black border-2 border-white transform rotate-45"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white border-2 border-black transform -rotate-45"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-white border-2 border-black transform -rotate-45"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-black border-2 border-white transform rotate-45"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_#000] transform rotate-12"
              ></motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-black border-4 border-black shadow-[6px_6px_0px_0px_#DC2626] transform -rotate-12"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Enhanced with Menu Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2"
        >
          <div className="text-black font-bold text-xs sm:text-sm uppercase tracking-wider">SCROLL</div>
          <div className="w-0.5 h-8 sm:h-12 bg-black"></div>
        </motion.div>
      </motion.div>

      {/* Floating Menu Button - Fixed Position */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center justify-center group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 group-hover:animate-bounce" />
      </motion.button>
    </section>
  )
}