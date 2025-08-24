import { motion } from 'framer-motion'
import { 
  Palette, 
  Target, 
  Crown, 
  Video, 
  Brain,
  TrendingUp,
  ArrowRight,
  Zap
} from 'lucide-react'

const services = [
  {
    id: 'creative',
    title: 'CREATIVE\nCAMPAIGNS',
    description: 'WE SMASH BORING WITH BRUTAL CREATIVITY THAT MAKES YOUR BRAND LEGENDARY!',
    icon: Palette,
    features: ['BRAND STORYTELLING', 'VISUAL IDENTITY', 'CAMPAIGN STRATEGY'],
    price: '$5,000',
    color: 'red'
  },
  {
    id: 'digital-ads',
    title: 'DIGITAL\nADVERTISING',
    description: 'PRECISION STRIKES ACROSS ALL PLATFORMS WITH AI-POWERED DESTRUCTION!',
    icon: Target,
    features: ['GOOGLE ADS', 'META ADVERTISING', 'PERFORMANCE ANALYTICS'],
    price: '$3,000',
    color: 'yellow'
  },
  {
    id: 'branding',
    title: 'BRAND\nIDENTITY',
    description: 'TRANSFORM YOUR BRAND INTO AN UNSTOPPABLE VISUAL FORCE!',
    icon: Crown,
    features: ['LOGO DESIGN', 'BRAND GUIDELINES', 'VISUAL SYSTEMS'],
    price: '$8,000',
    color: 'red'
  },
  {
    id: 'video',
    title: 'VIDEO\nPRODUCTION',
    description: 'CINEMATIC BRUTALITY THAT CAPTURES HEARTS AND DESTROYS COMPETITION!',
    icon: Video,
    features: ['VIDEO PRODUCTION', 'CONTENT CREATION', 'POST-PRODUCTION'],
    price: '$4,000',
    color: 'yellow'
  },
  {
    id: 'ai',
    title: 'AI\nMARKETING',
    description: 'HARNESS THE POWER OF ARTIFICIAL INTELLIGENCE FOR TOTAL DOMINATION!',
    icon: Brain,
    features: ['AI ANALYTICS', 'AUTOMATION', 'PERSONALIZATION'],
    price: '$6,000',
    color: 'red'
  },
  {
    id: 'growth',
    title: 'GROWTH\nSTRATEGY',
    description: 'DATA-DRIVEN WARFARE FOR SUSTAINABLE BUSINESS DESTRUCTION OF LIMITS!',
    icon: TrendingUp,
    features: ['GROWTH HACKING', 'CONVERSION OPTIMIZATION', 'ANALYTICS'],
    price: '$4,500',
    color: 'yellow'
  }
]

export default function Services() {
  return (
    <section className="py-16 sm:py-20 neo-section-dark">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Neo Brutalist Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="neo-badge inline-flex items-center space-x-2 mb-8">
            <Zap className="w-5 h-5" />
            <span>BRUTAL SERVICES</span>
          </div>
          
          <h2 
            className="text-5xl lg:text-7xl font-black text-white mb-8 leading-none tracking-tight"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            MARKETING
            <br />
            <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
              WARFARE
            </span>
          </h2>
          
          <p className="text-xl font-bold text-white max-w-3xl mx-auto leading-tight">
            WE DON'T DO GENTLE MARKETING. WE CRUSH COMPETITION WITH BRUTAL CREATIVITY!
          </p>
        </motion.div>

        {/* Services Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`neo-card p-4 sm:p-6 lg:p-8 h-full flex flex-col ${
                service.color === 'red' ? 'bg-red-600 text-white' : 'bg-yellow-300 text-black'
              }`}>
                {/* Icon - Mobile Responsive */}
                <motion.div 
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-2 sm:border-4 border-black flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    service.color === 'red' ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 
                    className="text-lg sm:text-xl lg:text-2xl font-black mb-3 sm:mb-4 leading-tight whitespace-pre-line"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {service.title}
                  </h3>
                  
                  <p className="font-bold mb-4 sm:mb-6 leading-tight text-xs sm:text-sm">
                    {service.description}
                  </p>

                  {/* Features - Mobile Responsive */}
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                      >
                        <div className={`w-2 h-2 border border-black ${
                          service.color === 'red' ? 'bg-white' : 'bg-black'
                        }`} />
                        <span className="font-bold text-xs">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA - Mobile Responsive */}
                <div className="border-t-2 sm:border-t-4 border-black pt-4 sm:pt-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-sm sm:text-lg lg:text-xl font-black opacity-75">FROM</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black">{service.price}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 0, y: 0 }}
                    className={`w-full font-bold py-2 sm:py-3 border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] sm:hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                      service.color === 'red' ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
                  >
                    <span className="hidden sm:inline">DESTROY LIMITS</span>
                    <span className="sm:hidden">GET BRUTAL</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="neo-card p-12 bg-yellow-300 text-black">
            <h3 
              className="text-4xl font-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              READY FOR
              <br />
              TOTAL DOMINATION?
            </h3>
            <p className="text-xl font-bold mb-8 max-w-2xl mx-auto">
              LET'S CREATE A BRUTAL MARKETING STRATEGY THAT CRUSHES YOUR COMPETITION!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button"
              >
                START WAR
              </motion.button>
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button-secondary"
              >
                VIEW CARNAGE
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}