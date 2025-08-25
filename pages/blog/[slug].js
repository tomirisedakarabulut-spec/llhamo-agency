import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag,
  Share2,
  Heart,
  MessageSquare
} from 'lucide-react'
import { getAllBlogSlugs, getBlogPostContent, getSiteConfig } from '../../lib/content'
import { FloatingBackButton } from '../../components/BackButton'

export default function BlogPost({ post, siteConfig }) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-300">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black mb-4">POST NOT FOUND</h1>
          <Link href="/blog" className="neo-button">
            BACK TO BLOG
          </Link>
        </div>
      </div>
    )
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
        <title>{post.seo?.metaTitle || `${post.title} | ${siteConfig.site.name}`}</title>
        <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
        <meta name="keywords" content={post.seo?.keywords?.join(', ') || post.tags?.join(', ')} />
        <meta name="author" content={post.author} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${siteConfig.site.url}${post.image}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`${siteConfig.site.url}${post.image}`} />
        <link rel="canonical" href={`${siteConfig.site.url}/blog/${post.slug}`} />
      </Head>

      {/* Back Navigation */}
      <section className="bg-black py-8 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">BACK TO BRUTAL INSIGHTS</span>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="bg-yellow-300 pt-16 pb-12 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className={`inline-block px-4 py-2 border-4 border-black font-bold text-sm mb-6 transform -rotate-1 ${
              post.category === 'AI' ? 'bg-red-600 text-white' : 
              post.category === 'BRANDING' ? 'bg-black text-white' :
              'bg-white text-black'
            }`}>
              {post.category}
            </div>
            
            {/* Title */}
            <h1 
              className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              {post.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl font-bold text-black mb-8 leading-tight">
              {post.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-black">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-black prose-headings:text-black prose-headings:font-['Space_Grotesk']
                  prose-h1:text-4xl prose-h1:mb-6 prose-h1:border-b-4 prose-h1:border-red-600 prose-h1:pb-4
                  prose-h2:text-3xl prose-h2:mb-4 prose-h2:text-red-600
                  prose-h3:text-2xl prose-h3:mb-3
                  prose-p:text-black prose-p:font-bold prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-red-600 prose-strong:font-black
                  prose-ul:my-6 prose-li:font-bold prose-li:text-black
                  prose-blockquote:border-l-8 prose-blockquote:border-red-600 prose-blockquote:bg-yellow-300 prose-blockquote:p-6 prose-blockquote:font-black prose-blockquote:text-black
                  prose-code:bg-black prose-code:text-white prose-code:px-2 prose-code:py-1 prose-code:border-2 prose-code:border-black prose-code:font-bold
                  prose-pre:bg-black prose-pre:border-4 prose-pre:border-black prose-pre:shadow-[8px_8px_0px_0px_#DC2626]
                  prose-a:text-red-600 prose-a:font-bold prose-a:no-underline hover:prose-a:text-black prose-a:transition-colors"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </motion.article>
            
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1 space-y-8"
            >
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="neo-card p-6">
                  <h3 className="text-lg font-black text-black mb-4 flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>TAGS</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-black text-white px-3 py-1 border-2 border-black text-xs font-bold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Share */}
              <div className="neo-card p-6">
                <h3 className="text-lg font-black text-black mb-4 flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>SHARE</span>
                </h3>
                <div className="space-y-3">
                  <button className="w-full neo-button-secondary text-sm">
                    SHARE ON TWITTER
                  </button>
                  <button className="w-full neo-button-secondary text-sm">
                    SHARE ON LINKEDIN
                  </button>
                  <button className="w-full neo-button-secondary text-sm">
                    COPY LINK
                  </button>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="neo-card bg-red-600 text-white p-6">
                <h3 className="text-lg font-black mb-4">JOIN THE ARMY</h3>
                <p className="font-bold text-sm mb-4">
                  GET MORE BRUTAL INSIGHTS WEEKLY!
                </p>
                <input
                  type="email"
                  placeholder="YOUR EMAIL..."
                  className="w-full neo-input text-black mb-4"
                />
                <button className="w-full bg-yellow-300 text-black border-4 border-white font-bold py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase text-sm">
                  SUBSCRIBE
                </button>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="neo-section-dark py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 
              className="text-4xl font-black text-white mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              READY FOR
              <br />
              <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
                BRUTAL RESULTS?
              </span>
            </h2>
            
            <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
              LET'S TRANSFORM YOUR BRAND WITH THE SAME SAVAGE STRATEGIES!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="neo-button flex items-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>START PROJECT</span>
                </motion.button>
              </Link>
              <Link href="/blog">
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  className="neo-button-secondary flex items-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>MORE INSIGHTS</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export async function getStaticPaths() {
  const paths = getAllBlogSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = await getBlogPostContent(params.slug)
  const siteConfig = getSiteConfig()
  
  if (!post) {
    return {
      notFound: true
    }
  }
  
  return {
    props: {
      post,
      siteConfig
    }
  }
}
