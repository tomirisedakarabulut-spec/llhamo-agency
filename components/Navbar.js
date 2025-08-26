import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  ChevronDown,
  Home,
  User,
  Briefcase,
  FolderOpen,
  BookOpen,
  Mail,
  ArrowUp,
  Crown
} from 'lucide-react'
import Logo from './Logo'

const navigation = [
  { name: 'HOME', href: '/' },
  { 
    name: 'ABOUT', 
    href: '/about',
    submenu: [
      { name: 'OUR STORY', href: '/about' },
      { name: 'TEAM', href: '/about#team' },
      { name: 'CAREERS', href: '/careers' },
    ]
  },
  { 
    name: 'SERVICES', 
    href: '/services',
    submenu: [
      { name: 'CREATIVE CAMPAIGNS', href: '/services#creative' },
      { name: 'DIGITAL ADS', href: '/services#digital-ads' },
      { name: 'BRAND IDENTITY', href: '/services#branding' },
      { name: 'VIDEO PRODUCTION', href: '/services#video' },
      { name: 'AI MARKETING', href: '/services#ai' },
    ]
  },
  { name: 'PORTFOLIO', href: '/portfolio' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACT', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [isHovering, setIsHovering] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)
      setShowScrollToTop(scrollTop > 100)
              console.log('Scroll:', scrollTop, 'Show button:', scrollTop > 100)
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [router.pathname])

  // Hamburger menu animation variants
  const hamburgerVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 180,
      scale: 1.1,
    }
  }

  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: 45,
      y: 6,
    }
  }

  const lineVariants2 = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: -45,
      y: -6,
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-black/95 via-red-600/20 to-black/95 backdrop-blur-md border-b-3 border-black shadow-[0_6px_0px_0px_#000]' 
          : 'bg-gradient-to-r from-black via-gray-900 to-black border-b-2 border-red-600'
      }`}
    >
      <nav className="container mx-auto px-3 sm:px-4 flex items-center justify-between h-12 sm:h-14 max-w-6xl">
        {/* LHAMO Logo - Clean Divine Design */}
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Subtle Aura Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-red-600 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            {/* Main Logo Container */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] group-hover:shadow-[3px_3px_0px_0px_#000] transition-all duration-300 flex items-center justify-center overflow-hidden p-0.5">
              <div className="w-full h-full flex items-center justify-center">
                <Logo variant="png" size="sm" className="cursor-pointer w-full h-full" />
              </div>
              
              {/* Single Sparkle */}
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-300 border border-black rounded-full animate-pulse"></div>
            </div>
            
            {/* Simple Crown Effect */}
            <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-2 sm:w-5 sm:h-2.5 lg:w-6 lg:h-3 bg-yellow-300 border border-black shadow-[1px_1px_0px_0px_#000] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full flex items-center justify-center">
                <Crown className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-black" />
              </div>
            </div>
          </motion.div>
          
          <div className="hidden sm:block">
            <div className="font-black text-lg sm:text-xl text-white transition-all duration-300 group-hover:text-red-400" style={{ fontFamily: 'Space Grotesk' }}>
              LHAMO
            </div>
            <div className="text-xs font-bold text-red-400 tracking-widest transition-all duration-300 group-hover:text-white">
              GODDESS.COGO
            </div>
          </div>
        </Link>

        {/* Desktop Navigation - Enhanced with Hover States */}
        <div className="hidden lg:flex items-center space-x-2">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-1.5 font-bold text-sm transition-all duration-300 border-2 border-white relative overflow-hidden ${
                  router.pathname === item.href
                    ? 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white border-white shadow-[4px_4px_0px_0px_#DC2626]'
                    : 'bg-black text-white border-white shadow-[2px_2px_0px_0px_#fff] hover:bg-gradient-to-r hover:from-red-600 hover:via-red-500 hover:to-red-600 hover:shadow-[3px_3px_0px_0px_#fff] hover:-translate-y-0.5 hover:scale-105'
                }`}
                onMouseEnter={() => {
                  setIsHovering(item.name)
                  item.submenu && setActiveSubmenu(item.name)
                }}
                onMouseLeave={() => {
                  setIsHovering(null)
                  setActiveSubmenu(null)
                }}
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-red-600"
                  initial={{ x: '-100%' }}
                  animate={{ x: isHovering === item.name ? '0%' : '-100%' }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10">{item.name}</span>
                {item.submenu && (
                  <motion.div
                    animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                )}
              </Link>

              {/* Enhanced Dropdown Menu */}
              <AnimatePresence>
                {item.submenu && activeSubmenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border-4 border-black shadow-[10px_10px_0px_0px_#000] overflow-hidden"
                    onMouseEnter={() => setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {item.submenu.map((subItem, index) => (
                      <motion.div
                        key={subItem.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={subItem.href}
                          className={`block px-6 py-3 text-sm font-bold text-black hover:bg-red-600 hover:text-white transition-all duration-200 relative overflow-hidden ${
                            index !== item.submenu.length - 1 ? 'border-b-3 border-black' : ''
                          }`}
                          style={{ fontFamily: 'Space Grotesk' }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-red-600"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '0%' }}
                            transition={{ duration: 0.2 }}
                          />
                          <span className="relative z-10">{subItem.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Enhanced Neo Brutalist CTA Button */}
          <Link href="/contact" className="hidden sm:block">
            <motion.div
              whileHover={{ x: -2, y: -2, scale: 1.05 }}
              whileTap={{ x: 0, y: 0, scale: 0.95 }}
              className="bg-red-600 text-white border-2 border-white shadow-[3px_3px_0px_0px_#fff] text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 relative overflow-hidden group font-black hover:shadow-[4px_4px_0px_0px_#fff] transition-all duration-200"
            >
              <motion.div
                className="absolute inset-0 bg-red-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative z-10">GET BRUTAL</span>
            </motion.div>
          </Link>

          {/* Animated Hamburger Menu Button */}
          <motion.button
            variants={hamburgerVariants}
            animate={mobileMenuOpen ? "open" : "closed"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="lg:hidden p-1.5 sm:p-2 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_#fff] sm:shadow-[3px_3px_0px_0px_#fff] relative overflow-hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
              <motion.div
                variants={lineVariants}
                className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
              />
              <motion.div
                variants={lineVariants2}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
              />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel - Enhanced */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] sm:max-w-[75vw] bg-black border-l-3 border-red-600 z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header - Enhanced */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-4 sm:p-6 border-b-3 border-red-600 bg-red-600"
              >
                <div className="flex items-center space-x-3">
                  {/* Animated Mini Logo */}
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-300 border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] flex items-center justify-center transform -rotate-3 relative overflow-hidden"
                  >
                    <svg 
                      viewBox="0 0 120 120" 
                      className="w-full h-full p-1"
                    >
                      {/* Dış geometrik çerçeve */}
                      <polygon points="10,10 110,10 110,110 10,110" stroke="#DC2626" strokeWidth="4" fill="none"/>
                      <polygon points="20,20 100,20 100,100 20,100" stroke="#111827" strokeWidth="3" fill="none"/>
                      
                      {/* Ana mandala çemberleri */}
                      <circle cx="60" cy="60" r="50" stroke="#DC2626" strokeWidth="5" fill="none"/>
                      <circle cx="60" cy="60" r="40" stroke="#111827" strokeWidth="4" fill="none"/>
                      <circle cx="60" cy="60" r="30" stroke="#FDE047" strokeWidth="3" fill="none"/>
                      
                      {/* İç geometrik katmanlar */}
                      <polygon points="60,25 75,35 80,50 75,65 60,75 45,65 40,50 45,35" 
                               fill="#DC2626" stroke="#111827" strokeWidth="2"/>
                      
                      <polygon points="60,35 70,42 73,50 70,58 60,65 50,58 47,50 50,42" 
                               fill="#111827" stroke="#FDE047" strokeWidth="1"/>
                      
                      {/* Merkez geometrik şekil */}
                      <polygon points="60,45 65,50 67,55 65,60 60,65 55,60 53,55 55,50" 
                               fill="#FDE047" stroke="#DC2626" strokeWidth="1"/>
                      
                      {/* Köşe geometrik elementler */}
                      <polygon points="15,15 25,15 25,25 15,25" fill="#DC2626"/>
                      <polygon points="95,15 105,15 105,25 95,25" fill="#DC2626"/>
                      <polygon points="15,95 25,95 25,105 15,105" fill="#DC2626"/>
                      <polygon points="95,95 105,95 105,105 95,105" fill="#DC2626"/>
                      
                      {/* İç geometrik çizgiler */}
                      <line x1="60" y1="15" x2="60" y2="105" stroke="#111827" strokeWidth="2"/>
                      <line x1="15" y1="60" x2="105" y2="60" stroke="#111827" strokeWidth="2"/>
                      <line x1="25" y1="25" x2="95" y2="95" stroke="#DC2626" strokeWidth="1.5"/>
                      <line x1="95" y1="25" x2="25" y2="95" stroke="#DC2626" strokeWidth="1.5"/>
                      
                      {/* Merkez nokta */}
                      <circle cx="60" cy="60" r="6" fill="#DC2626"/>
                      <circle cx="60" cy="60" r="3" fill="#FDE047"/>
                    </svg>
                  </motion.div>
                  <div>
                    <div className="font-black text-base sm:text-lg text-white" style={{ fontFamily: 'Space Grotesk' }}>LHAMO</div>
                    <div className="text-xs font-bold text-yellow-300">MOBILE</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 sm:p-2 bg-black text-white border-3 border-white shadow-[3px_3px_0px_0px_#FDE047]"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </motion.div>

              {/* Mobile Navigation - Enhanced with Animations */}
              <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3">
                {navigation.map((item, index) => {
                  const isActive = router.pathname === item.href
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-2 sm:space-x-3 lg:space-x-4 p-2.5 sm:p-3 lg:p-4 font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 border-2 relative overflow-hidden ${
                          isActive
                            ? 'bg-red-600 text-white border-white shadow-[3px_3px_0px_0px_#fff] sm:shadow-[4px_4px_0px_0px_#fff]'
                            : 'bg-black text-white border-white shadow-[2px_2px_0px_0px_#fff] sm:shadow-[3px_3px_0px_0px_#fff] hover:shadow-[3px_3px_0px_0px_#fff] sm:hover:shadow-[4px_4px_0px_0px_#fff] hover:transform hover:-translate-y-0.5 sm:hover:-translate-y-1'
                        }`}
                        style={{ fontFamily: 'Space Grotesk' }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`w-6 h-6 sm:w-8 sm:h-8 border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] ${
                            isActive ? 'bg-white text-black' : 'bg-black text-white'
                          }`}
                        >
                          <span className="text-xs font-bold">•</span>
                        </motion.div>
                        <span>{item.name}</span>
                      </Link>
                      
                      {/* Mobile submenu - Enhanced */}
                      {item.submenu && (
                        <motion.div 
                          className="mt-2 sm:mt-3 ml-4 sm:ml-6 space-y-1 sm:space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ delay: (index * 0.1) + 0.2 }}
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.1) + 0.3 + (subIndex * 0.05) }}
                            >
                              <Link
                                href={subItem.href}
                                className="block py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold text-black bg-white border-3 border-black shadow-[1px_1px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] sm:hover:shadow-[3px_3px_0px_0px_#000] hover:transform hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-red-600"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '0%' }}
                                  transition={{ duration: 0.2 }}
                                />
                                <span className="relative z-10">• {subItem.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Mobile CTA & Social - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 sm:p-6 border-t-4 border-black bg-red-600"
              >
                <div className="space-y-3 sm:space-y-4">
                  <Link
                    href="/contact"
                    className="block text-center py-3 sm:py-4 px-4 sm:px-6 bg-yellow-300 text-black border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] sm:hover:shadow-[7px_7px_0px_0px_#000] font-black text-sm sm:text-lg uppercase tracking-wide transition-all duration-200 relative overflow-hidden group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-red-600"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="relative z-10">🔥 GET BRUTAL</span>
                  </Link>
                  
                  {/* Contact Info - Enhanced */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center space-y-1 sm:space-y-2"
                  >
                    <div className="text-white font-bold text-xs sm:text-sm">READY FOR BRUTALITY?</div>
                    <div className="text-yellow-300 font-bold text-xs">hello@lhamo.agency</div>
                    <div className="text-yellow-300 font-bold text-xs">+90 555 BRUTAL</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>

    {/* Simple Scroll to Top Button */}
    {showScrollToTop && (
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          width: '56px',
          height: '56px',
          backgroundColor: '#DC2626',
          border: '4px solid #000',
          borderRadius: '0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '4px 4px 0px 0px #000',
          transition: 'all 0.2s ease'
        }}
        onClick={scrollToTop}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px) scale(1.05)'
          e.target.style.boxShadow = '6px 6px 0px 0px #000'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)'
          e.target.style.boxShadow = '4px 4px 0px 0px #000'
        }}
      >
        <ArrowUp 
          style={{ 
            width: '24px', 
            height: '24px', 
            color: '#000',
            transform: 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'rotate(12deg)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'rotate(0deg)'
          }}
        />
      </div>
    )}
    </>
  )
}