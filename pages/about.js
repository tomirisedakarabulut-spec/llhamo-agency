import SEOHead from '../components/SEOHead'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Award, 
  Globe, 
  Shield,
  ChevronUp,
  Star,
  Rocket,
  Eye,
  Brain,
  Sparkles
} from 'lucide-react'
import BackButton from '../components/BackButton'
import SimpleNavbar from '../components/SimpleNavbar'

export default function About() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <SEOHead 
          title="ABOUT THE WARRIORS | LHAMO - Brutal Marketing Army"
  description="Meet the legendary marketing warriors of LHAMO. Discover our brutal story of transforming brands through savage creativity and strategic warfare."
        image="/logo.png"
        url="https://lhamo.agency/about"
      />

      <SimpleNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yellow-300 via-red-500 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-black transform rotate-45"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-red-600 transform -rotate-12"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-yellow-300 transform rotate-3"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 mb-8 px-4 py-2 bg-red-600 text-white border-4 border-black shadow-[6px_6px_0px_0px_#000] transform rotate-2">
              <Crown className="w-5 h-5" />
              <span className="font-bold">LEGENDARY MARKETING WARRIORS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="block">WE ARE</span>
              <span className="bg-red-600 text-white px-6 py-4 border-8 border-black shadow-[12px_12px_0px_0px_#000] inline-block transform -rotate-2">
                LHAMO
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-bold text-black mb-12 max-w-4xl mx-auto leading-relaxed">
              THE BRUTAL MARKETING ARMY THAT CRUSHES BORING BRANDS AND TRANSFORMS THEM INTO LEGENDARY WARRIORS OF THEIR INDUSTRY
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { number: '500+', label: 'BRANDS CRUSHED', icon: Target },
                { number: '98%', label: 'SUCCESS RATE', icon: Award },
                { number: '24/7', label: 'BRUTAL SUPPORT', icon: Shield },
                { number: '∞', label: 'CREATIVE POWER', icon: Sparkles }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 text-center transform hover:scale-105 transition-all duration-200"
                  >
                    <Icon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-black text-black mb-1">{stat.number}</div>
                    <div className="text-sm font-bold text-gray-600">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-black mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              OUR BRUTAL STORY
            </h2>
            <div className="w-32 h-2 bg-red-600 mx-auto border-2 border-black shadow-[4px_4px_0px_0px_#000]"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-yellow-300 border-8 border-black shadow-[12px_12px_0px_0px_#000] p-8 transform rotate-2">
                <h3 className="text-3xl font-black text-black mb-6">FROM ZERO TO LEGEND</h3>
                <p className="text-lg font-bold text-black leading-relaxed">
                  LHAMO was born from the ashes of boring marketing. We saw brands drowning in mediocrity, 
                                      following the same tired formulas, and decided to become the brutal force that would
                    transform them into legendary warriors of their industry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="bg-red-600 text-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform -rotate-1">
                  <h4 className="text-xl font-black mb-3">THE AWAKENING</h4>
                  <p className="font-bold">We realized that most agencies were just copying each other. 
                  No originality, no passion, no brutal spark. That's when we decided to become the 
                  marketing warriors the world needed.</p>
                </div>
                
                <div className="bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_#DC2626] p-6 transform rotate-1">
                  <h4 className="text-xl font-black mb-3">THE TRANSFORMATION</h4>
                  <p className="font-bold">We developed our brutal methodology - combining savage creativity 
                  with strategic precision. Every campaign became a masterpiece, every brand a legend.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-yellow-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-black mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              OUR WARRIOR VALUES
            </h2>
            <div className="w-32 h-2 bg-red-600 mx-auto border-2 border-black shadow-[4px_4px_0px_0px_#000]"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'BRUTAL CREATIVITY', 
                description: 'We don\'t play safe. Every idea must be bold, every concept must be savage, every execution must be legendary.',
                icon: Brain,
                color: 'bg-red-600 text-white'
              },
              { 
                title: 'STRATEGIC PRECISION', 
                description: 'Like warriors, we strike with perfect accuracy. Every pixel, every word, every moment is calculated for maximum impact.',
                icon: Target,
                color: 'bg-black text-white'
              },
              { 
                title: 'UNLIMITED POWER', 
                description: 'We believe in infinite possibilities. No challenge is too big, no dream is too wild, no brand is beyond transformation.',
                icon: Zap,
                color: 'bg-yellow-300 text-black'
              },
              { 
                title: 'LEGENDARY RESULTS', 
                description: 'We don\'t just deliver campaigns, we create legends. Every client becomes a story of transformation and triumph.',
                icon: Award,
                color: 'bg-red-600 text-white'
              },
              { 
                title: 'GLOBAL DOMINANCE', 
                description: 'Our reach knows no boundaries. We conquer markets, we dominate industries, we rule the digital realm.',
                icon: Globe,
                color: 'bg-black text-white'
              },
              { 
                title: 'UNBREAKABLE SHIELD', 
                description: 'We protect our clients like legendary guardians. Their success is our mission, their victory is our glory.',
                icon: Shield,
                color: 'bg-yellow-300 text-black'
              }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${value.color} border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform hover:scale-105 transition-all duration-200`}
                >
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-black mb-3">{value.title}</h3>
                  <p className="font-bold leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-black mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              THE WARRIORS
            </h2>
            <div className="w-32 h-2 bg-red-600 mx-auto border-2 border-black shadow-[4px_4px_0px_0px_#000]"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'TOMIRIS',
                role: 'CREATIVE WARRIOR',
                description: 'The mastermind behind every legendary campaign. Her creativity knows no bounds.',
                icon: Crown,
                color: 'bg-red-600 text-white'
              },
              {
                name: 'LHAMO',
                role: 'STRATEGY WARRIOR',
                description: 'The legendary strategist who turns chaos into conquest. Every plan is a masterpiece.',
                icon: Eye,
                color: 'bg-black text-white'
              },
              {
                name: 'WARRIOR.COGO',
                role: 'TECHNOLOGY WARRIOR',
                description: 'The digital warrior who wields technology like a legendary weapon.',
                icon: Rocket,
                color: 'bg-yellow-300 text-black'
              }
            ].map((member, index) => {
              const Icon = member.icon
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`${member.color} border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-center transform hover:scale-105 transition-all duration-200`}
                >
                  <div className="w-24 h-24 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-black" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{member.name}</h3>
                  <p className="text-lg font-bold mb-4">{member.role}</p>
                  <p className="font-bold leading-relaxed">{member.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              OUR WARRIOR MISSION
            </h2>
            <div className="w-32 h-2 bg-red-600 mx-auto border-2 border-white shadow-[4px_4px_0px_0px_#DC2626] mb-12"></div>
            
            <div className="bg-red-600 border-8 border-white shadow-[12px_12px_0px_0px_#000] p-12 transform rotate-1">
              <p className="text-2xl md:text-3xl font-black leading-relaxed mb-8">
                TO TRANSFORM EVERY BRAND INTO A LEGENDARY WARRIOR OF THEIR INDUSTRY THROUGH BRUTAL CREATIVITY AND STRATEGIC PRECISION
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-black text-white px-6 py-3 font-bold border-2 border-white shadow-[4px_4px_0px_0px_#DC2626]">
                  <Star className="w-5 h-5 inline mr-2" />
                  LEGENDARY RESULTS
                </div>
                <div className="bg-yellow-300 text-black px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                  <Zap className="w-5 h-5 inline mr-2" />
                  BRUTAL CREATIVITY
                </div>
                <div className="bg-white text-black px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                  <Crown className="w-5 h-5 inline mr-2" />
                  LEGENDARY POWER
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-300">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-black mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              READY TO BECOME A LEGEND?
            </h2>
            <p className="text-xl font-bold text-black mb-12">
              JOIN THE BRUTAL MARKETING ARMY AND TRANSFORM YOUR BRAND INTO A LEGENDARY WARRIOR
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-red-600 text-white font-black text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200"
              >
                START YOUR TRANSFORMATION
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white font-black text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200"
              >
                VIEW OUR WORK
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-red-600 text-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center justify-center"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </>
  )
}