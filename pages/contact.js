import { motion } from 'framer-motion'
import Head from 'next/head'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  ArrowRight,
  Zap,
  Target,
  Crown,
  MessageSquare,
  Send,
  Shield,
  ChevronUp
} from 'lucide-react'
import { FloatingBackButton } from '../components/BackButton'

const contactMethods = [
  {
    icon: Mail,
    title: 'EMAIL WARFARE',
    value: 'hello@lhamo.agency',
    description: 'Send us your brutal project details',
    color: 'bg-red-600'
  },
  {
    icon: Phone,
    title: 'PHONE DESTRUCTION',
    value: '+90 555 BRUTAL',
    description: 'Call for immediate marketing carnage',
    color: 'bg-yellow-300 text-black'
  },
  {
    icon: MapPin,
    title: 'HEADQUARTERS',
    value: 'Istanbul, Turkey',
    description: 'Visit our brutal creative fortress',
    color: 'bg-black'
  },
  {
    icon: Clock,
    title: 'BATTLE HOURS',
    value: '24/7 BRUTALITY',
    description: 'We never stop creating legends',
    color: 'bg-red-600'
  }
]

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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
        <title>CONTACT THE ARMY | LHAMO - Start Your Brutal Project</title>
        <meta name="description" content="Ready to destroy boring marketing? Contact LHAMO's brutal creative army and start your legendary brand transformation today." />
        <meta name="keywords" content="contact LHAMO, marketing agency contact, brutal marketing, creative agency Istanbul" />
        <meta property="og:title" content="CONTACT THE ARMY | LHAMO" />
        <meta property="og:description" content="Start your brutal marketing transformation today" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
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
              <MessageSquare className="w-5 h-5" />
              <span>CONTACT THE ARMY</span>
            </div>
            
            <h1 
              className="text-6xl lg:text-8xl font-black text-black mb-8 leading-none tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              START YOUR
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                BRUTAL
              </span>
              <br />
              PROJECT
            </h1>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto leading-tight">
              READY TO DESTROY BORING MARKETING? LET'S CREATE SOMETHING LEGENDARY TOGETHER!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-red-600 py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`neo-card p-6 text-center ${method.color} ${
                  method.color.includes('text-black') ? 'text-black' : 'text-white'
                }`}
              >
                <div className={`w-16 h-16 border-4 border-black flex items-center justify-center mx-auto mb-4 ${
                  method.color === 'bg-yellow-300 text-black' ? 'bg-black text-white' : 'bg-white text-black'
                }`}>
                  <method.icon className="w-8 h-8" />
                </div>
                
                <h3 
                  className="text-lg font-black mb-2"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {method.title}
                </h3>
                
                <div className="text-xl font-black mb-2">{method.value}</div>
                <p className="text-sm font-bold opacity-90">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-yellow-300 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="neo-badge inline-flex items-center space-x-2 mb-8">
              <Target className="w-5 h-5" />
              <span>BRUTAL CONTACT FORM</span>
            </div>
            
            <h2 
              className="text-4xl font-black text-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              LET'S PLAN YOUR
              <br />
              <span className="bg-black text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
                DESTRUCTION
              </span>
            </h2>
            
            <p className="text-lg font-bold text-black max-w-2xl mx-auto">
              TELL US ABOUT YOUR PROJECT AND WE'LL SHOW YOU HOW TO DOMINATE YOUR MARKET!
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="neo-card bg-white text-black p-8"
          >
            <form className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    YOUR BRUTAL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ENTER YOUR WARRIOR NAME..."
                    className="neo-input uppercase placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    EMAIL FOR DESTRUCTION *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="YOUR.EMAIL@DOMAIN.COM"
                    className="neo-input placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t-4 border-black">
                <motion.button
                  type="submit"
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="w-full neo-button flex items-center justify-center space-x-3"
                >
                  <Send className="w-6 h-6" />
                  <span>SEND BRUTAL MESSAGE</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </div>
            </form>
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
