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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-600 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-black animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-red-600 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-black animate-pulse"></div>
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
            <span className="block">⚔️ BRUTAL CAMPAIGNS.</span>
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
                <span className="relative z-10">⚔️ START BRUTALITY</span>
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
                <span className="relative z-10">🔥 VIEW CARNAGE</span>
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