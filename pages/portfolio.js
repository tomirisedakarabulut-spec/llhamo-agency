import { motion } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import Link from 'next/link'
import { 
  ExternalLink, 
  ArrowRight, 
  Filter,
  Zap,
  Target,
  Crown,
  TrendingUp,
  Eye,
  Heart,
  ChevronUp
} from 'lucide-react'
import SimpleNavbar from '../components/SimpleNavbar'


const portfolioItems = [
  {
    id: 1,
    title: 'SAVAGE SNEAKER EMPIRE',
    category: 'BRANDING',
    client: 'SNEAKERBEAST',
    description: 'Complete brand destruction and reconstruction for premium sneaker empire.',
    results: '+347% SALES BRUTALITY',
    image: '/portfolio/1.svg',
    featured: true,
    tags: ['BRANDING', 'DESIGN', 'STRATEGY']
  },
  {
    id: 2,
    title: 'TECH STARTUP DOMINATION',
    category: 'DIGITAL ADS',
    client: 'NEXTECH AI',
    description: 'AI-powered ad campaigns that crushed the competition.',
    results: '+892% USER ACQUISITION',
    image: '/portfolio/2.svg',
    featured: false,
    tags: ['ADS', 'AI', 'TECH']
  },
  {
    id: 3,
    title: 'RESTAURANT CHAIN MASSACRE',
    category: 'SOCIAL MEDIA',
    client: 'BRUTAL BURGERS',
    description: 'Social media warfare that made competitors cry.',
    results: '+234% ENGAGEMENT KILL',
    image: '/portfolio/3.svg',
    featured: false,
    tags: ['SOCIAL', 'FOOD', 'VIRAL']
  },
  {
    id: 4,
    title: 'FASHION BRAND APOCALYPSE',
    category: 'VIDEO',
    client: 'DARK FASHION CO',
    description: 'Video content that destroyed fashion industry standards.',
    results: '+567% BRAND AWARENESS',
    image: '/portfolio/4.svg',
    featured: true,
    tags: ['VIDEO', 'FASHION', 'CONTENT']
  },
  {
    id: 5,
    title: 'CRYPTO EXCHANGE WARFARE',
    category: 'BRANDING',
    client: 'CRYPTOBEAST',
    description: 'Complete brand identity for crypto trading platform.',
    results: '+1.2M USER DESTRUCTION',
    image: '/portfolio/5.svg',
    featured: false,
    tags: ['CRYPTO', 'FINTECH', 'UI/UX']
  },
  {
    id: 6,
    title: 'FITNESS EMPIRE BRUTALITY',
    category: 'CAMPAIGN',
    client: 'IRON WARRIORS GYM',
    description: 'Integrated campaign that crushed fitness competition.',
    results: '+445% MEMBERSHIP KILL',
    image: '/portfolio/6.svg',
    featured: false,
    tags: ['FITNESS', 'CAMPAIGN', 'LIFESTYLE']
  }
]

const categories = ['ALL', 'BRANDING', 'DIGITAL ADS', 'SOCIAL MEDIA', 'VIDEO', 'CAMPAIGN']

export default function Portfolio() {
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
      
      <SEOHead 
        title="BRUTAL PORTFOLIO | LHAMO - Marketing Warfare Results"
        description="Witness the brutal marketing campaigns that destroyed competition. See LHAMO's savage portfolio of legendary brand transformations."
        image="/logo.png"
        url="https://lhamo.agency/portfolio"
      />

      {/* Navigation */}
      <SimpleNavbar />

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
              <span>BRUTAL PORTFOLIO</span>
            </div>
            
            <h1 
              className="text-6xl lg:text-8xl font-black text-black mb-8 leading-none tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              LEGENDARY
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                CARNAGE
              </span>
              <br />
              RESULTS
            </h1>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto leading-tight mb-12">
              WITNESS THE BRUTAL CAMPAIGNS THAT DESTROYED COMPETITION AND CREATED MARKETING WARRIORS!
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { number: '500+', label: 'BRANDS\nCRUSHED' },
                { number: '2.5M+', label: 'USERS\nDESTROYED' },
                { number: '847%', label: 'AVG GROWTH\nKILL' },
                { number: '∞', label: 'BRUTAL\nRESULTS' }
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

      {/* Categories Filter */}
      <section className="bg-black py-8 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className={`px-6 py-3 font-bold border-4 border-white shadow-[4px_4px_0px_0px_#DC2626] hover:shadow-[6px_6px_0px_0px_#DC2626] transition-all duration-200 uppercase tracking-wide ${
                  category === 'ALL' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-black hover:bg-yellow-300'
                }`}
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-yellow-300 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Featured Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {portfolioItems.filter(item => item.featured).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="neo-card bg-white text-black p-0 overflow-hidden group"
              >
                {/* Enhanced Visual Section */}
                <div className="bg-gradient-to-br from-black via-gray-900 to-black h-80 flex items-center justify-center border-b-4 border-black relative overflow-hidden">
                  {/* Dynamic Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 gap-2 h-full">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="bg-red-600 border border-yellow-300"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Main Visual Element */}
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-red-600 border-4 border-white shadow-[8px_8px_0px_0px_#000] flex items-center justify-center mb-4 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="bg-yellow-300 text-black px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_#000] transform -rotate-6">
                      <span className="font-black text-sm">{item.category}</span>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 border-2 border-black transform rotate-45"
                    animate={{ rotate: [45, -45, 45] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute top-4 right-4 w-6 h-6 bg-red-600 border-2 border-white transform -rotate-45"
                    animate={{ rotate: [-45, 45, -45] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute bottom-4 left-4 w-4 h-4 bg-white border-2 border-black"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute bottom-4 right-4 w-5 h-5 bg-red-600 border-2 border-yellow-300 transform rotate-12"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/90 via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <div className="text-center">
                      <Eye className="w-8 h-8 text-white mx-auto mb-2" />
                      <span className="text-white font-bold text-sm">VIEW BRUTALITY</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-600 text-white px-3 py-1 border-2 border-black text-xs font-bold">
                      {item.category}
                    </div>
                    <div className="bg-yellow-300 text-black px-3 py-1 border-2 border-black text-xs font-bold">
                      FEATURED
                    </div>
                  </div>
                  
                  <h3 
                    className="text-2xl font-black mb-2 leading-tight group-hover:text-red-600 transition-colors duration-200"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {item.title}
                  </h3>
                  
                  <p className="text-sm font-bold text-gray-600 mb-2">{item.client}</p>
                  
                  <p className="text-sm font-bold mb-4 leading-tight">
                    {item.description}
                  </p>
                  
                  <div className="bg-black text-white p-3 border-4 border-black mb-6">
                    <div className="text-center">
                      <div className="text-lg font-black text-red-600 mb-1">RESULT:</div>
                      <div className="text-sm font-bold">{item.results}</div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-gray-200 text-black px-2 py-1 border-2 border-black text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href={`/portfolio/${item.id}`} className="flex-1">
                      <motion.button
                        whileHover={{ x: -2, y: -2 }}
                        whileTap={{ x: 0, y: 0 }}
                        className="w-full neo-button-secondary flex items-center justify-center space-x-2"
                      >
                        <span>VIEW CASE</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 0, y: 0 }}
                      className="px-4 py-3 bg-red-600 text-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Regular Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.filter(item => !item.featured).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neo-card bg-white text-black p-0 overflow-hidden group"
              >
                {/* Image */}
                <div className="bg-black h-48 flex items-center justify-center border-b-4 border-black relative overflow-hidden">
                  <TrendingUp className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="w-6 h-6 text-white mx-auto mb-2" />
                      <span className="text-white font-bold text-xs">VIEW</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="bg-black text-white px-3 py-1 border-2 border-black text-xs font-bold inline-block mb-3">
                    {item.category}
                  </div>
                  
                  <h3 
                    className="text-lg font-black mb-2 leading-tight group-hover:text-red-600 transition-colors duration-200"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {item.title}
                  </h3>
                  
                  <p className="text-xs font-bold text-gray-600 mb-2">{item.client}</p>
                  
                  <p className="text-sm font-bold mb-4 leading-tight">
                    {item.description}
                  </p>
                  
                  <div className="bg-red-600 text-white p-2 border-2 border-black mb-4">
                    <div className="text-xs font-bold text-center">{item.results}</div>
                  </div>
                  
                  <Link href={`/portfolio/${item.id}`}>
                    <motion.button
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 0, y: 0 }}
                      className="w-full neo-button-secondary flex items-center justify-center space-x-2"
                    >
                      <span>VIEW CASE</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 0, y: 0 }}
              className="neo-button flex items-center space-x-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              <span>LOAD MORE CARNAGE</span>
            </motion.button>
          </motion.div>
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
              LET'S CREATE YOUR BRUTAL SUCCESS STORY THAT DESTROYS ALL COMPETITION!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="neo-button flex items-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>START BRUTALITY</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button-secondary flex items-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>VIEW ALL CASES</span>
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
