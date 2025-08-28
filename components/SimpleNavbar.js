import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Menu, X, ArrowLeft } from 'lucide-react'
import Logo from './Logo'

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'SERVICES', href: '/services' },
  { name: 'PORTFOLIO', href: '/portfolio' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CRM', href: '/crm' },
  { name: 'CONTACT', href: '/contact' },
]

export default function SimpleNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [router.pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black border-b-4 border-white' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group relative">
            <div className="relative top-6 sm:top-8">
              <div className="bg-red-600 border-4 border-white shadow-[6px_6px_0px_0px_#000] transform rotate-3 p-4">
                <Logo size="lg" className="transform scale-110 sm:scale-125" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-black text-white transition-all duration-300 group-hover:text-red-400">
                LHAMO
              </div>
              <div className="text-xs font-bold text-red-400 tracking-widest transition-all duration-300 group-hover:text-white">
                WARRIOR.COGO
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-1.5 font-bold text-sm transition-all duration-300 border-2 border-white ${
                  router.pathname === item.href
                    ? 'bg-red-600 text-white border-white shadow-[4px_4px_0px_0px_#DC2626]'
                    : 'bg-black text-white border-white shadow-[2px_2px_0px_0px_#fff] hover:bg-red-600 hover:shadow-[3px_3px_0px_0px_#fff] hover:-translate-y-0.5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Back Button */}
            <motion.button
              onClick={goBack}
              whileHover={{ x: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 font-bold text-sm transition-all duration-300 border-2 border-white bg-yellow-300 text-black border-white shadow-[2px_2px_0px_0px_#fff] hover:shadow-[3px_3px_0px_0px_#fff] hover:-translate-y-0.5 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_#fff] hover:shadow-[3px_3px_0px_0px_#fff] transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-black border-t-4 border-white"
          >
            <div className="p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block p-3 font-bold text-sm transition-all duration-200 border-2 border-white ${
                    router.pathname === item.href
                      ? 'bg-red-600 text-white border-white shadow-[3px_3px_0px_0px_#fff]'
                      : 'bg-black text-white border-white shadow-[2px_2px_0px_0px_#fff] hover:bg-red-600 hover:shadow-[3px_3px_0px_0px_#fff]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Back Button */}
              <motion.button
                onClick={() => {
                  goBack()
                  setMobileMenuOpen(false)
                }}
                whileHover={{ x: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full p-3 font-bold text-sm transition-all duration-200 border-2 border-white bg-yellow-300 text-black border-white shadow-[2px_2px_0px_0px_#fff] hover:shadow-[3px_3px_0px_0px_#fff] flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>GERİ DÖN</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
