import { motion } from 'framer-motion'
import Head from 'next/head'
import { 
  Palette, 
  Target, 
  Crown, 
  Video, 
  Brain,
  TrendingUp,
  ArrowRight,
  Zap,
  CheckCircle,
  Star,
  ChevronUp
} from 'lucide-react'
import { FloatingBackButton } from '../components/BackButton'

const services = [
  {
    id: 'creative',
    title: 'CREATIVE\nCAMPAIGNS',
    description: 'WE SMASH BORING WITH BRUTAL CREATIVITY THAT MAKES YOUR BRAND LEGENDARY!',
    icon: Palette,
    features: ['BRAND STORYTELLING', 'VISUAL IDENTITY', 'CAMPAIGN STRATEGY', 'CONTENT CREATION', 'CREATIVE DIRECTION'],
    price: '₺15,000',
    popular: false,
    color: 'red'
  },
  {
    id: 'digital-ads',
    title: 'DIGITAL\nADVERTISING',
    description: 'PRECISION STRIKES ACROSS ALL PLATFORMS WITH AI-POWERED DESTRUCTION!',
    icon: Target,
    features: ['GOOGLE ADS', 'META ADVERTISING', 'TIKTOK ADS', 'PERFORMANCE ANALYTICS', 'CONVERSION OPTIMIZATION'],
    price: '₺12,000',
    popular: true,
    color: 'yellow'
  },
  {
    id: 'branding',
    title: 'BRAND\nIDENTITY',
    description: 'TRANSFORM YOUR BRAND INTO AN UNSTOPPABLE VISUAL FORCE!',
    icon: Crown,
    features: ['LOGO DESIGN', 'BRAND GUIDELINES', 'VISUAL SYSTEMS', 'BRAND STRATEGY', 'TRADEMARK SUPPORT'],
    price: '₺25,000',
    popular: false,
    color: 'red'
  },
  {
    id: 'video',
    title: 'VIDEO\nPRODUCTION',
    description: 'CINEMATIC BRUTALITY THAT CAPTURES HEARTS AND DESTROYS COMPETITION!',
    icon: Video,
    features: ['VIDEO PRODUCTION', 'CONTENT CREATION', 'POST-PRODUCTION', 'MOTION GRAPHICS', 'SOCIAL VIDEO'],
    price: '₺18,000',
    popular: false,
    color: 'yellow'
  },
  {
    id: 'ai',
    title: 'AI\nMARKETING',
    description: 'HARNESS THE POWER OF ARTIFICIAL INTELLIGENCE FOR TOTAL DOMINATION!',
    icon: Brain,
    features: ['AI ANALYTICS', 'AUTOMATION', 'PERSONALIZATION', 'CHATBOTS', 'PREDICTIVE ANALYSIS'],
    price: '₺20,000',
    popular: false,
    color: 'red'
  },
  {
    id: 'growth',
    title: 'GROWTH\nSTRATEGY',
    description: 'DATA-DRIVEN WARFARE FOR SUSTAINABLE BUSINESS DESTRUCTION OF LIMITS!',
    icon: TrendingUp,
    features: ['GROWTH HACKING', 'CONVERSION OPTIMIZATION', 'ANALYTICS', 'A/B TESTING', 'FUNNEL OPTIMIZATION'],
    price: '₺16,000',
    popular: false,
    color: 'yellow'
  }
]

export default function Services() {
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
        <title>BRUTAL SERVICES | LHAMO - Marketing Warfare Arsenal</title>
        <meta name="description" content="Discover LHAMO's brutal marketing services. From creative campaigns to AI-powered strategies, we destroy boring marketing with divine precision." />
        <meta name="keywords" content="marketing services, creative campaigns, digital advertising, brand identity, video production, AI marketing, growth strategy" />
        <meta property="og:title" content="BRUTAL SERVICES | LHAMO" />
        <meta property="og:description" content="Marketing warfare arsenal that destroys competition" />
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
              <Zap className="w-5 h-5" />
              <span>BRUTAL SERVICES</span>
            </div>
            
            <h1 
              className="text-6xl lg:text-8xl font-black text-black mb-8 leading-none tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              MARKETING
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                WARFARE
              </span>
              <br />
              ARSENAL
            </h1>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto leading-tight">
              WE DON'T DO GENTLE MARKETING. WE CRUSH COMPETITION WITH BRUTAL CREATIVITY!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-yellow-300 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 -right-4 z-10">
                    <div className="bg-red-600 text-white px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-12">
                      <Star className="w-4 h-4 inline mr-1" />
                      <span className="text-xs font-black">POPULAR</span>
                    </div>
                  </div>
                )}

                <div className={`neo-card p-8 h-full flex flex-col ${
                  service.color === 'red' ? 'bg-red-600 text-white' : 'bg-white text-black'
                } ${service.popular ? 'border-red-600' : ''}`}>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 border-4 border-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    service.color === 'red' ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    <service.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 
                      className="text-2xl font-black mb-4 leading-tight whitespace-pre-line"
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      {service.title}
                    </h3>
                    
                    <p className="font-bold mb-6 leading-tight text-sm">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-3">
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                            service.color === 'red' ? 'text-white' : 'text-red-600'
                          }`} />
                          <span className="font-bold text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA */}
                  <div className={`border-t-4 pt-6 ${
                    service.color === 'red' ? 'border-white' : 'border-black'
                  }`}>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-black opacity-75">STARTING FROM</span>
                      <span className="text-3xl font-black">{service.price}</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 0, y: 0 }}
                      className={`w-full font-bold py-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2 ${
                        service.color === 'red' ? 'bg-white text-black' : 'bg-black text-white'
                      }`}
                    >
                      <span>START BRUTALITY</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
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
              READY FOR
              <br />
              <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
                TOTAL DOMINATION?
              </span>
            </h2>
            
            <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
              LET'S CREATE A BRUTAL MARKETING STRATEGY THAT CRUSHES YOUR COMPETITION!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>START PROJECT</span>
              </motion.button>
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button-secondary flex items-center space-x-2"
              >
                <Crown className="w-5 h-5" />
                <span>VIEW PORTFOLIO</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-yellow-300 py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="neo-badge inline-flex items-center space-x-2 mb-8 bg-red-600 text-white">
              <Zap className="w-5 h-5" />
              <span>JOIN THE BRUTALITY</span>
            </div>
            
            <h2 
              className="text-4xl lg:text-6xl font-black text-black mb-6 leading-none"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              GET BRUTAL
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform rotate-1">
                MARKETING INSIGHTS
              </span>
            </h2>
            
            <p className="text-xl font-bold text-black mb-8 max-w-2xl mx-auto">
              RECEIVE WEEKLY DESTRUCTION STRATEGIES & EXCLUSIVE CONTENT FOR MARKETING WARFARE!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL FOR DESTRUCTION..."
                className="neo-input flex-1 bg-white text-black border-black placeholder:text-gray-600 uppercase font-bold"
              />
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="bg-black text-white border-4 border-black font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#DC2626] hover:shadow-[6px_6px_0px_0px_#DC2626] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <span>DESTROY INBOX</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <p className="text-sm font-bold text-black mt-4 opacity-75">
              🔥 NO SPAM, ONLY BRUTAL MARKETING WARFARE! 🔥
            </p>
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