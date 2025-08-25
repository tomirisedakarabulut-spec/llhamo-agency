import Head from 'next/head'
import { motion } from 'framer-motion'
import { Crown, Users, Target, Heart, Zap, Award, Globe, Shield, ChevronUp } from 'lucide-react'
import { HeroLogo } from '../components/Logo'
import { FloatingBackButton } from '../components/BackButton'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

const stats = [
  { number: '500+', label: 'BRANDS\nCRUSHED', icon: Crown },
  { number: '98%', label: 'CLIENT\nDOMINATION', icon: Heart },
  { number: '50+', label: 'AWARDS\nWON', icon: Award },
  { number: '25+', label: 'COUNTRIES\nDESTROYED', icon: Globe }
]

const team = [
  {
    name: 'LHAMO GODDESS',
    role: 'CEO & CREATIVE DESTROYER',
    description: 'The divine leader who transforms brands through mystical brutality.',
    avatar: '/avatars/1.svg'
  },
  {
    name: 'DIGITAL WARRIOR',
    role: 'CTO & TECH SAVAGE',
    description: 'Master of AI-powered marketing destruction and technological warfare.',
    avatar: '/avatars/2.svg'
  },
  {
    name: 'BRAND DESTROYER',
    role: 'CREATIVE DIRECTOR',
    description: 'Visual brutality expert who creates legendary brand identities.',
    avatar: '/avatars/3.svg'
  }
]

const values = [
  {
    icon: Zap,
    title: 'BRUTAL CREATIVITY',
    description: 'We destroy boring marketing with savage creative solutions that shock and inspire.'
  },
  {
    icon: Target,
    title: 'PRECISION WARFARE',
    description: 'Every campaign is a calculated strike designed for maximum market domination.'
  },
  {
    icon: Crown,
    title: 'DIVINE LEADERSHIP',
    description: 'We lead the industry through mystical innovation and legendary results.'
  },
  {
    icon: Shield,
    title: 'CLIENT PROTECTION',
    description: 'Your brand is our sacred responsibility. We defend and elevate it brutally.'
  }
]

export default function About() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <FloatingBackButton />
      <Head>
        <title>ABOUT THE GODDESSES | LHAMO - Brutal Marketing Army</title>
        <meta name="description" content="Meet the divine marketing goddesses of LHAMO. Discover our brutal story of transforming brands through mystical creativity and savage precision." />
        <meta name="keywords" content="LHAMO team, marketing goddesses, brutal creativity, divine marketing, agency team, Türkiye, İstanbul" />
        <meta name="author" content="LHAMO Agency" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lhamo.agency/about" />
        <meta property="og:title" content="ABOUT THE GODDESSES | LHAMO" />
        <meta property="og:description" content="Meet the brutal marketing goddesses transforming brands" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ABOUT THE GODDESSES | LHAMO" />
        <meta name="twitter:description" content="Meet the brutal marketing goddesses transforming brands" />
        <meta name="twitter:image" content="/og-image.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://lhamo.agency/about" />
      </Head>

      {/* Hero Section */}
      <section className="bg-yellow-300 pt-32 pb-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="neo-badge inline-flex items-center space-x-2 mb-8">
              <Crown className="w-5 h-5" />
              <span>OUR BRUTAL STORY</span>
            </div>
            
            <h1 
              className="text-6xl lg:text-8xl font-black text-black mb-8 leading-none tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              WE ARE THE
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                MARKETING
              </span>
              <br />
              GODDESSES
            </h1>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto leading-tight mb-12">
              BORN FROM MYSTICAL FUSION OF ANCIENT WISDOM AND CUTTING-EDGE BRUTALITY!
            </p>

            {/* Mandala Logo Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-12"
            >
              <HeroLogo />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-red-600 py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neo-card bg-white text-black p-6 text-center"
              >
                <div className="w-12 h-12 bg-red-600 border-4 border-black flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="text-3xl font-black text-red-600 mb-2">{stat.number}</div>
                <div className="text-sm font-bold whitespace-pre-line">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-yellow-300 py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-4xl font-black text-black mb-6"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                OUR DIVINE
                <br />
                <span className="bg-black text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
                  ORIGIN
                </span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg font-bold text-black leading-tight">
                  BORN FROM THE SACRED UNION OF ANCIENT TIBETAN WISDOM AND MODERN MARKETING BRUTALITY, LHAMO EMERGED TO DESTROY THE BORING AND CREATE THE LEGENDARY.
                </p>
                
                <p className="font-bold text-black">
                  OUR GODDESSES CHANNEL DIVINE CREATIVITY THROUGH CUTTING-EDGE TECHNOLOGY, TRANSFORMING BRANDS INTO UNSTOPPABLE FORCES OF MARKET DOMINATION.
                </p>
                
                <p className="font-bold text-black">
                  WE DON'T JUST DO MARKETING - WE WAGE CREATIVE WAR AGAINST MEDIOCRITY AND BUILD EMPIRES OF BRUTAL BEAUTY.
                </p>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="neo-card bg-black p-8 text-center"
            >
              <div className="mb-6">
                <HeroLogo className="mx-auto" />
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                GODDESS.COGO
              </h3>
              
              <p className="text-white font-bold">
                THE SACRED SYMBOL OF OUR BRUTAL CREATIVITY AND DIVINE MARKETING POWER
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="neo-section-dark py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="neo-badge inline-flex items-center space-x-2 mb-8 bg-yellow-300 text-black">
              <Users className="w-5 h-5" />
              <span>MEET THE GODDESSES</span>
            </div>
            
            <h2 
              className="text-5xl font-black text-white mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              OUR BRUTAL ARMY
            </h2>
            
            <p className="text-xl font-bold text-white max-w-3xl mx-auto">
              THE DIVINE WARRIORS WHO TRANSFORM BRANDS THROUGH SAVAGE CREATIVITY!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="neo-card bg-white text-black p-8 text-center group"
              >
                <div className="w-24 h-24 bg-red-600 border-4 border-black mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-12 h-12 text-white" />
                </div>
                
                <h3 
                  className="text-xl font-black mb-2"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {member.name}
                </h3>
                
                <div className="bg-red-600 text-white px-3 py-1 border-2 border-black text-sm font-bold inline-block mb-4">
                  {member.role}
                </div>
                
                <p className="font-bold text-sm leading-tight">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-yellow-300 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="neo-badge inline-flex items-center space-x-2 mb-8">
              <Shield className="w-5 h-5" />
              <span>OUR BRUTAL VALUES</span>
            </div>
            
            <h2 
              className="text-5xl font-black text-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              WHAT DRIVES
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                OUR ARMY
              </span>
            </h2>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto">
              THE SACRED PRINCIPLES THAT GUIDE OUR BRUTAL MARKETING WARFARE!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neo-card bg-black text-white p-8"
              >
                <div className="w-16 h-16 bg-red-600 border-4 border-white flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 
                  className="text-2xl font-black mb-4"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {value.title}
                </h3>
                
                <p className="font-bold leading-tight">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="neo-section-dark py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl font-black text-white mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              READY TO JOIN
              <br />
              <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
                THE LEGENDS?
              </span>
            </h2>
            
            <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
              LET THE GODDESSES TRANSFORM YOUR BRAND INTO A BRUTAL FORCE OF MARKET DOMINATION!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button flex items-center space-x-2"
              >
                <Crown className="w-5 h-5" />
                <span>START BRUTALITY</span>
              </motion.button>
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button-secondary flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>MEET THE TEAM</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Menu Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center justify-center group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 group-hover:animate-bounce" />
      </motion.button>
    </motion.div>
  )
}