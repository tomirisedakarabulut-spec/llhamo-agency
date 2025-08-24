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
  Mail
} from 'lucide-react'
// import { NavbarLogo } from './Logo'

const navigation = [
  { name: 'HOME', href: '/', icon: Home },
  { 
    name: 'ABOUT', 
    href: '/about',
    icon: User,
    submenu: [
      { name: 'OUR STORY', href: '/about' },
      { name: 'TEAM', href: '/about#team' },
      { name: 'CAREERS', href: '/careers' },
    ]
  },
  { 
    name: 'SERVICES', 
    href: '/services',
    icon: Briefcase,
    submenu: [
      { name: 'CREATIVE CAMPAIGNS', href: '/services#creative' },
      { name: 'DIGITAL ADS', href: '/services#digital-ads' },
      { name: 'BRAND IDENTITY', href: '/services#branding' },
      { name: 'VIDEO PRODUCTION', href: '/services#video' },
      { name: 'AI MARKETING', href: '/services#ai' },
    ]
  },
  { name: 'PORTFOLIO', href: '/portfolio', icon: FolderOpen },
  { name: 'BLOG', href: '/blog', icon: BookOpen },
  { name: 'CONTACT', href: '/contact', icon: Mail },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-yellow-300 border-b-4 border-black shadow-[0_8px_0px_0px_#000]' 
          : 'bg-yellow-300'
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between h-20 max-w-6xl">
        {/* LHAMO Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="w-20 h-20 bg-red-600 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="LHAMO Logo" 
                className="w-full h-full object-contain p-1"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onError={(e) => {
                  console.log('Logo yüklenemedi:', e.target.src);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                onLoad={(e) => {
                  console.log('Logo başarıyla yüklendi:', e.target.src);
                }}
              />
              <span className="text-white font-bold text-lg" style={{display: 'none'}}>L</span>
            </div>
          </motion.div>
          <div className="hidden sm:block">
            <div className="font-black text-2xl text-black" style={{ fontFamily: 'Space Grotesk' }}>
              LHAMO
            </div>
            <div className="text-xs font-bold text-red-600 tracking-widest">
              GODDESS.COGO
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center space-x-1 px-4 py-2 font-bold text-sm transition-all duration-200 border-2 border-transparent ${
                  router.pathname === item.href
                    ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#DC2626]'
                    : 'text-black hover:bg-white hover:border-black hover:shadow-[2px_2px_0px_0px_#000]'
                }`}
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
                style={{ fontFamily: 'Space Grotesk' }}
              >
                <span>{item.name}</span>
                {item.submenu && <ChevronDown className="w-4 h-4" />}
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.submenu && activeSubmenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden"
                    onMouseEnter={() => setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-6 py-3 text-sm font-bold text-black hover:bg-red-600 hover:text-white transition-colors duration-200 ${
                          index !== item.submenu.length - 1 ? 'border-b-2 border-black' : ''
                        }`}
                        style={{ fontFamily: 'Space Grotesk' }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Neo Brutalist CTA Button */}
          <Link href="/contact" className="hidden sm:block">
            <motion.div
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 0, y: 0 }}
              className="neo-button"
            >
              GET BRUTAL
            </motion.div>
          </Link>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="lg:hidden p-3 bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_#DC2626]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] sm:max-w-[70vw] bg-yellow-300 border-l-4 border-black z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b-4 border-black bg-red-600">
                <div className="flex items-center space-x-3">
                  {/* Mini Mandala Logo */}
                  <div className="w-10 h-10 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center transform -rotate-3 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-600 border border-black rounded-full absolute"></div>
                      <div className="w-1 h-1 bg-white border border-black absolute -top-0.5 left-1/2 transform -translate-x-1/2"></div>
                      <div className="w-1 h-1 bg-white border border-black absolute -bottom-0.5 left-1/2 transform -translate-x-1/2"></div>
                      <div className="w-1 h-1 bg-white border border-black absolute top-1/2 -left-0.5 transform -translate-y-1/2"></div>
                      <div className="w-1 h-1 bg-white border border-black absolute top-1/2 -right-0.5 transform -translate-y-1/2"></div>
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-lg text-white" style={{ fontFamily: 'Space Grotesk' }}>LHAMO</div>
                    <div className="text-xs font-bold text-yellow-300">MOBILE</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_#FDE047]"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Mobile Navigation */}
              <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                {navigation.map((item, index) => {
                  const Icon = item.icon
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
                        className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 font-bold text-base sm:text-lg transition-all duration-200 border-4 ${
                          isActive
                            ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#DC2626]'
                            : 'bg-white text-black border-black hover:shadow-[4px_4px_0px_0px_#000] hover:transform hover:-translate-y-1'
                        }`}
                        style={{ fontFamily: 'Space Grotesk' }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className={`w-8 h-8 border-2 border-black flex items-center justify-center ${
                          isActive ? 'bg-white text-black' : 'bg-black text-white'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span>{item.name}</span>
                      </Link>
                      
                      {/* Mobile submenu */}
                      {item.submenu && (
                        <motion.div 
                          className="mt-3 ml-6 space-y-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (index * 0.1) + 0.2 }}
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block py-3 px-4 text-sm font-bold text-black bg-white border-2 border-black hover:shadow-[2px_2px_0px_0px_#000] hover:transform hover:-translate-y-0.5 transition-all duration-200"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              • {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Mobile CTA & Social */}
              <div className="p-6 border-t-4 border-black bg-red-600">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <Link
                    href="/contact"
                    className="block text-center py-4 px-6 bg-yellow-300 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] font-black text-lg uppercase tracking-wide transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🔥 GET BRUTAL
                  </Link>
                  
                  {/* Contact Info */}
                  <div className="text-center space-y-2">
                    <div className="text-white font-bold text-sm">READY FOR BRUTALITY?</div>
                    <div className="text-yellow-300 font-bold text-xs">hello@lhamo.agency</div>
                    <div className="text-yellow-300 font-bold text-xs">+90 555 BRUTAL</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}