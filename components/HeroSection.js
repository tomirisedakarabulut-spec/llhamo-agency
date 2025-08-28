import { motion } from 'framer-motion'
import { ArrowRight, Zap, Star, Crown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'

export default function HeroSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 overflow-hidden">
      {/* Brutalist Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Shapes */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-8 h-8 bg-red-600 border-4 border-black shadow-[8px_8px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ rotate: -360, y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-6 h-6 bg-black border-4 border-red-600 shadow-[6px_6px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ x: [0, 50, 0], rotate: 180 }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-1/4 w-4 h-4 bg-red-600 border-2 border-black shadow-[4px_4px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: 90 }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-1/3 w-10 h-10 bg-black border-4 border-red-600 shadow-[8px_8px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: -90 }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/3 w-5 h-5 bg-red-600 border-3 border-black shadow-[5px_5px_0px_0px_#000]"
        />
        
        {/* Floating Text Elements */}
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-10 text-red-600 font-black text-xs border-2 border-red-600 px-2 py-1 bg-black shadow-[4px_4px_0px_0px_#000]"
        >
          BRUTAL
        </motion.div>
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-10 text-black font-black text-xs border-2 border-black px-2 py-1 bg-red-600 shadow-[4px_4px_0px_0px_#000]"
        >
          WARFARE
        </motion.div>
        
        {/* Animated Lines */}
        <motion.div 
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-0 w-32 h-1 bg-red-600 shadow-[2px_2px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-0 w-32 h-1 bg-black shadow-[2px_2px_0px_0px_#000]"
        />
        
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-red-600"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-black"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-black"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-red-600"></div>
        
        {/* Pulsing Dots */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-600 animate-pulse shadow-[2px_2px_0px_0px_#000]"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-black animate-ping shadow-[1px_1px_0px_0px_#000]"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-red-600 animate-bounce shadow-[3px_3px_0px_0px_#000]"></div>
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-black animate-pulse shadow-[1px_1px_0px_0px_#000]"></div>
        
        {/* Additional Brutalist Elements */}
        <motion.div 
          animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-12 h-12 bg-black border-4 border-red-600 shadow-[8px_8px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-red-600 border-3 border-black shadow-[6px_6px_0px_0px_#000]"
        />
        
        {/* Diagonal Lines */}
        <motion.div 
          animate={{ rotate: [0, 45, 0], scaleX: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-24 h-1 bg-red-600 shadow-[2px_2px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ rotate: [0, -45, 0], scaleX: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/3 w-24 h-1 bg-black shadow-[2px_2px_0px_0px_#000]"
        />
        
        {/* More Floating Text */}
        <motion.div 
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-10 text-black font-black text-lg border-3 border-black px-3 py-2 bg-red-600 shadow-[6px_6px_0px_0px_#000]"
        >
          DOMINATE
        </motion.div>
        <motion.div 
          animate={{ opacity: [0.2, 1, 0.2], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/2 right-10 text-red-600 font-black text-lg border-3 border-red-600 px-3 py-2 bg-black shadow-[6px_6px_0px_0px_#000]"
        >
          CONQUER
        </motion.div>
        
        {/* Animated Triangles */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.5, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/6 left-1/6 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-red-600 border-r-[12px] border-r-transparent shadow-[4px_4px_0px_0px_#000]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/6 right-1/6 w-0 h-0 border-l-[15px] border-l-transparent border-t-[25px] border-t-black border-r-[15px] border-r-transparent shadow-[4px_4px_0px_0px_#000]"
        />
        
        {/* Pulsing Rings */}
        <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-4 h-4 border-2 border-red-600 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 left-1/3 w-6 h-6 border-3 border-black rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 py-20 sm:py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-black mb-6 leading-tight"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            <span className="block">
              <span className="inline-block w-8 h-8 bg-red-600 border-2 border-black mr-2 align-middle"></span>
              BRUTAL CAMPAIGNS.
            </span>
            <span className="block text-red-600">LEGENDARY RESULTS.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-black mb-8 font-bold"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            WE DON'T MARKET. WE WAGE WAR.
          </motion.p>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Our campaigns are brutal assaults that leave competitors in ruins and turn brands into legends. 
            Every project is a battlefield. Every result is a victory. We build brands that dominate.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-8 py-4 text-lg font-black border-4 border-white shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 relative overflow-hidden group"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                <motion.div
                  className="absolute inset-0 bg-red-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10">
                  <span className="inline-block w-5 h-5 bg-white border border-black mr-2 align-middle"></span>
                  START BRUTALITY
                </span>
              </motion.button>
            </Link>
            
            <Link href="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-4 text-lg font-black border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 relative overflow-hidden group"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gray-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10">
                  <span className="inline-block w-5 h-5 bg-red-600 border border-white mr-2 align-middle"></span>
                  VIEW CARNAGE
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-black border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform -rotate-1">
              <div className="text-3xl font-black text-red-600 mb-2">+892%</div>
              <div className="text-white font-bold text-sm">BRUTAL DOMINATION</div>
            </div>
            
            <div className="bg-red-600 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform rotate-1">
              <div className="text-3xl font-black text-white mb-2">500+</div>
              <div className="text-white font-bold text-sm">BRANDS CRUSHED</div>
            </div>
            
            <div className="bg-black border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform -rotate-1">
              <div className="text-3xl font-black text-yellow-300 mb-2">2.5M+</div>
              <div className="text-white font-bold text-sm">USERS CONQUERED</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-black rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-black rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}