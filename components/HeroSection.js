import { motion } from 'framer-motion'
import { ArrowRight, Zap, Star, Crown } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-yellow-300 pt-20 overflow-hidden">
      {/* Neo Brutalist Background Elements - Responsive */}
      <div className="absolute inset-0">
        {/* Desktop Geometric shapes */}
        <div className="hidden md:block absolute top-20 left-10 w-32 h-32 bg-red-600 border-4 border-black shadow-[8px_8px_0px_0px_#000] transform rotate-12"></div>
        <div className="hidden md:block absolute top-40 right-20 w-24 h-24 bg-black border-4 border-black shadow-[6px_6px_0px_0px_#DC2626] transform -rotate-12"></div>
        <div className="hidden md:block absolute bottom-40 left-1/4 w-20 h-20 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-45"></div>
        <div className="hidden md:block absolute bottom-20 right-1/3 w-16 h-16 bg-red-600 border-4 border-black transform rotate-12"></div>
        
        {/* Mobile Geometric shapes - Smaller and repositioned */}
        <div className="md:hidden absolute top-16 right-4 w-16 h-16 bg-red-600 border-2 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-12"></div>
        <div className="md:hidden absolute top-32 left-4 w-12 h-12 bg-black border-2 border-black shadow-[2px_2px_0px_0px_#DC2626] transform -rotate-12"></div>
        <div className="md:hidden absolute bottom-32 right-8 w-10 h-10 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] transform rotate-45"></div>
        <div className="md:hidden absolute bottom-16 left-8 w-8 h-8 bg-red-600 border-2 border-black transform rotate-12"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Neo Brutalist Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="neo-badge inline-flex items-center space-x-2 mb-8"
            >
              <Zap className="w-5 h-5" />
              <span>DIVINE MARKETING GODS</span>
            </motion.div>

            {/* Main Headline - Mobile Responsive */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-black mb-6 sm:mb-8 leading-none tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              <span className="block sm:inline">TRANSFORM</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> YOUR</span>
              <br />
              <span className="bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1 text-3xl sm:text-4xl md:text-5xl lg:text-8xl">
                BRAND
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl font-bold text-black mb-8 max-w-lg leading-tight"
            >
              WE SMASH BORING MARKETING WITH BRUTAL CREATIVITY AND DIVINE POWER!
            </motion.p>

            {/* Stats - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              {[
                { number: '500+', label: 'BRANDS\nCRUSHED' },
                { number: '98%', label: 'SUCCESS\nRATE' },
                { number: '24/7', label: 'BRUTAL\nSUPPORT' },
                { number: '∞', label: 'CREATIVE\nPOWER' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="neo-grid-item text-center p-3 sm:p-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-xl sm:text-2xl font-black text-red-600 mb-1">{stat.number}</div>
                  <div className="text-xs font-bold text-black whitespace-pre-line leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Mobile Responsive */}
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
                  className="neo-button flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base py-3 sm:py-4"
                >
                  <span>START PROJECT</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button-secondary flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base py-3 sm:py-4"
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>VIEW WORK</span>
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-12"
            >
              <div className="bg-black text-white p-4 border-4 border-black shadow-[6px_6px_0px_0px_#DC2626] transform -rotate-1">
                <p className="font-bold text-sm uppercase tracking-wide">
                  💀 TRUSTED BY 500+ LEGENDARY BRANDS 💀
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Mobile Responsive Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Main Visual Container - Mobile Responsive */}
            <div className="neo-card p-4 sm:p-6 lg:p-8 bg-white">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-600 border-4 border-black flex items-center justify-center relative overflow-hidden">
                    {/* Mini Neo Brutalist Mandala */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Center Circle */}
                      <div className="w-2 h-2 bg-yellow-300 border border-black rounded-full absolute"></div>
                      
                      {/* Inner Ring - 4 tiny squares */}
                      <div className="w-1 h-1 bg-white border border-black absolute -top-0.5 left-1/2 transform -translate-x-1/2"></div>
                      <div className="w-1 h-1 bg-white border border-black absolute -bottom-0.5 left-1/2 transform -translate-x-1/2"></div>
                      <div className="w-1 h-1 bg-white border border-black absolute top-1/2 -left-0.5 transform -translate-y-1/2"></div>
                      <div className="w-1 h-1 bg-white border border-black absolute top-1/2 -right-0.5 transform -translate-y-1/2"></div>
                      
                      {/* Outer corners */}
                      <div className="w-0.5 h-0.5 bg-black absolute top-1 left-1"></div>
                      <div className="w-0.5 h-0.5 bg-black absolute top-1 right-1"></div>
                      <div className="w-0.5 h-0.5 bg-black absolute bottom-1 left-1"></div>
                      <div className="w-0.5 h-0.5 bg-black absolute bottom-1 right-1"></div>
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-lg">LHAMO</div>
                    <div className="text-xs font-bold text-red-600">GODDESS.COGO</div>
                  </div>
                </div>
                <div className="bg-green-500 text-black px-3 py-1 border-2 border-black font-bold text-xs">
                  LIVE
                </div>
              </div>

              {/* Stats Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div 
                  className="bg-red-600 text-white p-3 sm:p-4 border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl sm:text-3xl font-black mb-1">+247%</div>
                  <div className="text-xs font-bold">GROWTH</div>
                </motion.div>
                <motion.div 
                  className="bg-yellow-300 text-black p-3 sm:p-4 border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl sm:text-3xl font-black mb-1">98%</div>
                  <div className="text-xs font-bold">SUCCESS</div>
                </motion.div>
              </div>

              {/* Chart */}
              <div className="bg-black p-4 border-4 border-black">
                <div className="flex items-end space-x-2 h-20 mb-2">
                  <div className="bg-red-600 w-6 h-8 border-2 border-white"></div>
                  <div className="bg-red-600 w-6 h-12 border-2 border-white"></div>
                  <div className="bg-red-600 w-6 h-16 border-2 border-white"></div>
                  <div className="bg-red-600 w-6 h-10 border-2 border-white"></div>
                  <div className="bg-red-600 w-6 h-20 border-2 border-white"></div>
                  <div className="bg-red-600 w-6 h-14 border-2 border-white"></div>
                </div>
                <div className="text-xs font-bold text-white">BRUTAL PERFORMANCE</div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-16 h-16 bg-yellow-300 border-4 border-black shadow-[6px_6px_0px_0px_#000] flex items-center justify-center"
            >
              <Crown className="w-8 h-8 text-black" />
            </motion.div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-red-600 text-white p-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-3"
            >
              <div className="text-center">
                <div className="text-lg font-black">24/7</div>
                <div className="text-xs font-bold">BRUTAL</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}