import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Search,
  Filter,
  Zap,
  TrendingUp,
  Brain,
  Target,
  ChevronUp
} from 'lucide-react'

import { getAllBlogPosts, getBlogCategories } from '../lib/content'
import QuickNavigation from '../components/QuickNavigation'
import SimpleNavbar from '../components/SimpleNavbar'


export default function Blog({ blogPosts, categories }) {
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
      
      <Head>
        <title>BRUTAL INSIGHTS | LHAMO - Marketing Warfare Blog</title>
        <meta name="description" content="Brutal marketing insights and strategies that destroy competition. Read LHAMO's savage blog for divine marketing wisdom." />
        <meta name="keywords" content="marketing blog, brutal marketing, AI marketing, branding insights, social media strategy" />
        <meta property="og:title" content="BRUTAL INSIGHTS | LHAMO" />
        <meta property="og:description" content="Savage marketing insights that destroy competition" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

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
              <Brain className="w-5 h-5" />
              <span>BRUTAL INSIGHTS</span>
            </div>
            
            <h1 
              className="text-6xl lg:text-8xl font-black text-black mb-8 leading-none tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              MARKETING
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform rotate-1">
                WARFARE
              </span>
              <br />
              BLOG
            </h1>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto leading-tight mb-12">
              SAVAGE INSIGHTS THAT DESTROY BORING MARKETING AND CREATE LEGENDARY BRANDS!
            </p>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="SEARCH BRUTAL INSIGHTS..."
                  className="neo-input pr-12 uppercase placeholder:text-gray-600"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
              </div>
              <button className="neo-button-secondary flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>FILTER</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
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

      {/* Blog Posts Grid */}
      <section className="bg-yellow-300 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="neo-card p-8 mb-16 bg-red-600 text-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-yellow-300 text-black px-4 py-2 border-4 border-white font-bold text-sm inline-block mb-4 transform -rotate-1">
                    FEATURED BRUTAL POST
                  </div>
                  
                  <h2 
                    className="text-4xl font-black mb-4 leading-tight"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {post.title}
                  </h2>
                  
                  <p className="text-lg font-bold mb-6 leading-tight">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-6 mb-6 text-sm font-bold">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="bg-white text-black px-2 py-1 border-2 border-white text-xs">
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <motion.button
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 0, y: 0 }}
                      className="bg-white text-black border-4 border-white font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide flex items-center space-x-2"
                    >
                      <span>DESTROY IGNORANCE</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
                
                <div className="neo-grid-item bg-white p-0 overflow-hidden">
                  <div className="bg-black h-64 flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="neo-card bg-white text-black p-0 overflow-hidden group"
              >
                <div className="bg-black h-48 flex items-center justify-center border-b-4 border-black">
                  <Target className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="p-6">
                  <div className={`inline-block px-3 py-1 border-2 border-black text-xs font-bold mb-4 ${
                    post.category === 'AI' ? 'bg-red-600 text-white' : 
                    post.category === 'BRANDING' ? 'bg-yellow-300 text-black' :
                    'bg-black text-white'
                  }`}>
                    {post.category}
                  </div>
                  
                  <h3 
                    className="text-xl font-black mb-3 leading-tight group-hover:text-red-600 transition-colors duration-200"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {post.title}
                  </h3>
                  
                  <p className="text-sm font-bold mb-4 leading-tight text-gray-700">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-4">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <motion.button
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 0, y: 0 }}
                      className="w-full neo-button-secondary flex items-center justify-center space-x-2"
                    >
                      <span>READ MORE</span>
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
              <span>LOAD MORE BRUTALITY</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
              JOIN THE
              <br />
              <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#DC2626] inline-block transform -rotate-1">
                BRUTAL ARMY
              </span>
            </h2>
            
            <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
              GET SAVAGE MARKETING INSIGHTS DELIVERED TO YOUR INBOX WEEKLY!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL FOR DESTRUCTION..."
                className="neo-input flex-1 uppercase placeholder:text-gray-600"
              />
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button whitespace-nowrap"
              >
                JOIN ARMY
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <QuickNavigation />

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

export async function getStaticProps() {
  const blogPosts = getAllBlogPosts()
  const categories = getBlogCategories()
  
  return {
    props: {
      blogPosts,
      categories
    }
  }
}
