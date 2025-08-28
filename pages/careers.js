import { motion } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import Link from 'next/link'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowRight,
  Zap,
  Target,
  Crown,
  Brain,
  Heart,
  Coffee,
  Rocket,
  Shield
} from 'lucide-react'


const jobOpenings = [
  {
    id: 1,
    title: 'SENIOR BRUTAL DESIGNER',
    department: 'CREATIVE WARFARE',
    location: 'ISTANBUL / REMOTE',
    type: 'FULL-TIME',
    salary: '₺25,000 - ₺35,000',
    description: 'Create visual brutality that destroys boring design and builds legendary brands.',
    requirements: ['5+ YEARS BRUTAL DESIGN', 'ADOBE MASTERY', 'BRAND DESTRUCTION SKILLS'],
    featured: true
  },
  {
    id: 2,
    title: 'AI MARKETING DESTROYER',
    department: 'TECH WARFARE',
    location: 'ISTANBUL / REMOTE',
    type: 'FULL-TIME',
    salary: '₺30,000 - ₺45,000',
    description: 'Harness AI power to create marketing campaigns that crush all competition.',
    requirements: ['AI/ML EXPERTISE', 'MARKETING AUTOMATION', 'DATA BRUTALITY'],
    featured: true
  },
  {
    id: 3,
    title: 'SOCIAL MEDIA WARRIOR',
    department: 'DIGITAL WARFARE',
    location: 'ISTANBUL',
    type: 'FULL-TIME',
    salary: '₺18,000 - ₺25,000',
    description: 'Command social media armies and create viral content that dominates feeds.',
    requirements: ['SOCIAL MEDIA MASTERY', 'CONTENT CREATION', 'VIRAL STRATEGIES'],
    featured: false
  },
  {
    id: 4,
    title: 'VIDEO PRODUCTION SAVAGE',
    department: 'CONTENT WARFARE',
    location: 'ISTANBUL',
    type: 'FULL-TIME',
    salary: '₺22,000 - ₺32,000',
    description: 'Create cinematic brutality that captures hearts and destroys competition.',
    requirements: ['VIDEO PRODUCTION', 'POST-PRODUCTION', 'CREATIVE VISION'],
    featured: false
  },
  {
    id: 5,
    title: 'GROWTH HACKING BEAST',
    department: 'STRATEGY WARFARE',
    location: 'REMOTE',
    type: 'FULL-TIME',
    salary: '₺28,000 - ₺40,000',
    description: 'Engineer explosive growth strategies that obliterate business limits.',
    requirements: ['GROWTH HACKING', 'DATA ANALYTICS', 'CONVERSION OPTIMIZATION'],
    featured: false
  },
  {
    id: 6,
    title: 'BRAND STRATEGY GODDESS',
    department: 'STRATEGY WARFARE',
    location: 'ISTANBUL / REMOTE',
    type: 'FULL-TIME',
    salary: '₺32,000 - ₺50,000',
    description: 'Architect brand strategies that transform companies into legendary forces.',
    requirements: ['BRAND STRATEGY', 'MARKET RESEARCH', 'STRATEGIC THINKING'],
    featured: false
  }
]

const benefits = [
  {
    icon: Rocket,
    title: 'BRUTAL GROWTH',
    description: 'Accelerated career progression with savage learning opportunities'
  },
  {
    icon: DollarSign,
    title: 'LEGENDARY SALARY',
    description: 'Competitive compensation that reflects your brutal value'
  },
  {
    icon: Shield,
    title: 'DIVINE BENEFITS',
    description: 'Health insurance, dental, vision, and mental warfare support'
  },
  {
    icon: Coffee,
    title: 'FLEXIBLE BRUTALITY',
    description: 'Remote work options and flexible hours for maximum destruction'
  },
  {
    icon: Users,
    title: 'WARRIOR TRIBE',
    description: 'Join a family of creative savages who support each other'
  },
  {
    icon: Heart,
    title: 'PASSION PROJECTS',
    description: '20% time for personal brutal projects and creative exploration'
  }
]

export default function Careers() {
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
      
      <SEOHead 
        title="JOIN THE ARMY | LHAMO - Brutal Career Opportunities"
        description="Join LHAMO's brutal marketing army. Discover savage career opportunities in creative, tech, and strategy warfare."
        image="/crown-icon.png"
        url="https://lhamo.agency/careers"
      />

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
              <Users className="w-5 h-5" />
              <span>JOIN THE ARMY</span>
            </div>
            
            <h1 
              className="text-6xl lg:text-8xl font-black text-black mb-8 leading-none tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              BECOME A
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                MARKETING
              </span>
              <br />
              WARRIOR
            </h1>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto leading-tight mb-12">
              JOIN THE MOST BRUTAL MARKETING AGENCY WHERE CREATIVITY MEETS SAVAGERY AND LEGENDS ARE BORN!
            </p>

            {/* Company Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { number: '50+', label: 'BRUTAL\nWARRIORS' },
                { number: '3', label: 'GLOBAL\nOFFICES' },
                { number: '98%', label: 'HAPPINESS\nRATE' },
                { number: '∞', label: 'GROWTH\nOPPS' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="neo-grid-item text-center bg-black text-white"
                >
                  <div className="text-3xl font-black text-red-600 mb-1">{stat.number}</div>
                  <div className="text-xs font-bold whitespace-pre-line">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="bg-red-600 py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white mb-16"
          >
            <h2 
              className="text-5xl font-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              OUR BRUTAL CULTURE
            </h2>
            <p className="text-xl font-bold max-w-3xl mx-auto">
              WE DON'T JUST WORK TOGETHER - WE WAGE CREATIVE WAR TOGETHER!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neo-card bg-white text-black p-8 text-center"
              >
                <div className="w-16 h-16 bg-red-600 border-4 border-black flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 
                  className="text-xl font-black mb-4"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {benefit.title}
                </h3>
                
                <p className="font-bold text-sm leading-tight">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
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
              <Target className="w-5 h-5" />
              <span>OPEN POSITIONS</span>
            </div>
            
            <h2 
              className="text-5xl font-black text-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              BRUTAL OPPORTUNITIES
            </h2>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto">
              FIND YOUR PERFECT ROLE IN OUR ARMY OF CREATIVE DESTRUCTION!
            </p>
          </motion.div>

          {/* Featured Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {jobOpenings.filter(job => job.featured).map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="neo-card bg-red-600 text-white p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-yellow-300 text-black px-4 py-2 border-4 border-white font-bold text-sm transform -rotate-1">
                    FEATURED ROLE
                  </div>
                  <div className="bg-white text-black px-3 py-1 border-2 border-white text-xs font-bold">
                    {job.type}
                  </div>
                </div>
                
                <h3 
                  className="text-3xl font-black mb-2"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {job.title}
                </h3>
                
                <div className="text-sm font-bold mb-4 opacity-90">{job.department}</div>
                
                <p className="font-bold mb-6 leading-tight">
                  {job.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-bold">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-bold">{job.salary}</span>
                  </div>
                </div>
                
                <div className="border-t-4 border-white pt-6">
                  <div className="text-sm font-bold mb-3">BRUTAL REQUIREMENTS:</div>
                  <ul className="space-y-1 mb-6">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white border-2 border-white" />
                        <span className="text-sm font-bold">{req}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 0, y: 0 }}
                    className="w-full bg-white text-black border-4 border-white font-bold py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2"
                  >
                    <span>APPLY FOR WAR</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Regular Jobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobOpenings.filter(job => !job.featured).map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neo-card bg-white text-black p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-black text-white px-3 py-1 border-2 border-black text-xs font-bold">
                    {job.department}
                  </div>
                  <div className="text-xs font-bold text-gray-600">{job.type}</div>
                </div>
                
                <h3 
                  className="text-xl font-black mb-2"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {job.title}
                </h3>
                
                <p className="text-sm font-bold mb-4 leading-tight">
                  {job.description}
                </p>
                
                <div className="grid grid-cols-1 gap-2 mb-4 text-xs font-bold text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-3 h-3" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="w-full neo-button-secondary flex items-center justify-center space-x-2"
                >
                  <span>APPLY NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
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
              DON'T SEE YOUR
              <br />
              <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
                PERFECT ROLE?
              </span>
            </h2>
            
            <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
              SEND US YOUR BRUTAL PORTFOLIO AND LET'S CREATE A ROLE THAT FITS YOUR SAVAGE SKILLS!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="neo-button flex items-center space-x-2"
                >
                  <Crown className="w-5 h-5" />
                  <span>SEND PORTFOLIO</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button-secondary flex items-center space-x-2"
              >
                <Brain className="w-5 h-5" />
                <span>LEARN MORE</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
