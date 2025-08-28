import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Crown,
  Zap,
  Heart
} from 'lucide-react'
import Logo from './Logo'

const footerLinks = {
  services: [
    { name: 'CREATIVE CAMPAIGNS', href: '/services#creative' },
    { name: 'DIGITAL ADVERTISING', href: '/services#digital-ads' },
    { name: 'BRAND IDENTITY', href: '/services#branding' },
    { name: 'VIDEO PRODUCTION', href: '/services#video' },
    { name: 'AI MARKETING', href: '/services#ai' },
  ],
  company: [
    { name: 'ABOUT US', href: '/about' },
    { name: 'OUR TEAM', href: '/about#team' },
    { name: 'CAREERS', href: '/careers' },
    { name: 'BLOG', href: '/blog' },
    { name: 'CONTACT', href: '/contact' },
  ],
  resources: [
    { name: 'PORTFOLIO', href: '/portfolio' },
    { name: 'CASE STUDIES', href: '/portfolio' },
    { name: 'INSIGHTS', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'SUPPORT', href: '/contact' },
  ]
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#', color: 'bg-pink-600' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'bg-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'bg-blue-600' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'bg-red-600' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-4 border-black">
      {/* Newsletter Section */}
      <section className="bg-red-600 py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
                  <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1 }}
          className="text-center"
        >
            <div className="neo-badge inline-flex items-center space-x-2 mb-8 bg-yellow-300 text-black">
              <Zap className="w-5 h-5" />
              <span>JOIN THE BRUTALITY</span>
            </div>
            
            <h2 
              className="text-4xl lg:text-6xl font-black text-white mb-6 leading-none"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              SAVAGE UPDATES
              <br />
              <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#000] inline-block transform rotate-1">
                WEEKLY
              </span>
            </h2>
            
            <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
              GET BRUTAL MARKETING INSIGHTS & EXCLUSIVE CONTENT DELIVERED TO YOUR INBOX!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL FOR DESTRUCTION..."
                className="neo-input flex-1 bg-white text-black border-white placeholder:text-gray-600 uppercase"
              />
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="bg-black text-white border-4 border-white font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-[6px_6px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <span>DESTROY INBOX</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini Sitemap */}
      <section className="bg-yellow-300 py-8 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 
              className="text-2xl font-black text-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              QUICK NAVIGATION
            </h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link 
                href="/about"
                className="bg-black text-white border-4 border-white font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide transform hover:-translate-x-1 hover:-translate-y-1"
              >
                ABOUT
              </Link>
              <Link 
                href="/services"
                className="bg-red-600 text-white border-4 border-white font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide transform hover:-translate-x-1 hover:-translate-y-1"
              >
                SERVICES
              </Link>
              <Link 
                href="/blog"
                className="bg-black text-white border-4 border-white font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide transform hover:-translate-x-1 hover:-translate-y-1"
              >
                BLOG
              </Link>
              <Link 
                href="/contact"
                className="bg-red-600 text-white border-4 border-white font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide transform hover:-translate-x-1 hover:-translate-y-1"
              >
                CONTACT
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              {/* Logo */}
              <Link href="/" className="block">
                <div className="flex items-center space-x-3 mb-6 group">
                  <Logo size="lg" className="group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <div className="font-black text-3xl text-white group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
                      LHAMO
                    </div>
                    <div className="text-sm font-bold text-red-600 tracking-widest group-hover:text-white transition-colors duration-300">
                      WARRIOR.COGO
                    </div>
                  </div>
                </div>
              </Link>
              
              <p className="font-bold text-white mb-8 leading-tight">
                WE DESTROY BORING MARKETING AND CREATE LEGENDARY BRANDS THROUGH BRUTAL CREATIVITY!
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-300 border-2 border-white flex items-center justify-center">
                    <Mail className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-bold text-sm">hello@lhamo.agency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-300 border-2 border-white flex items-center justify-center">
                    <Phone className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-bold text-sm">+90 555 BRUTAL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-300 border-2 border-white flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-bold text-sm">Istanbul, Turkey</span>
                </div>
              </div>
            </motion.div>

            {/* Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 
                className="text-xl font-black text-white mb-6 border-b-4 border-red-600 pb-2"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                BRUTAL SERVICES
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="font-bold text-sm text-gray-300 hover:text-yellow-300 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 
                className="text-xl font-black text-white mb-6 border-b-4 border-red-600 pb-2"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                COMPANY
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="font-bold text-sm text-gray-300 hover:text-yellow-300 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 
                className="text-xl font-black text-white mb-6 border-b-4 border-red-600 pb-2"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                RESOURCES
              </h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="font-bold text-sm text-gray-300 hover:text-yellow-300 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>


            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-white bg-red-600 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <Crown className="w-5 h-5 text-yellow-300" />
              <span className="font-bold text-white text-sm">
                © 2024 LHAMO. ALL BRUTAL RIGHTS RESERVED.
              </span>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center space-x-6"
            >
              <Link href="/privacy" className="font-bold text-white text-sm hover:text-yellow-300 transition-colors duration-200">
                PRIVACY POLICY
              </Link>
              <Link href="/terms" className="font-bold text-white text-sm hover:text-yellow-300 transition-colors duration-200">
                TERMS OF WAR
              </Link>
              <div className="flex items-center space-x-2 bg-yellow-300 text-black px-3 py-1 border-2 border-white transform rotate-1">
                <Heart className="w-4 h-4" />
                <span className="font-bold text-xs">MADE WITH BRUTALITY</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}