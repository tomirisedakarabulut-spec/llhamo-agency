import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { 
  Save,
  Eye,
  ArrowLeft,
  Calendar,
  Tag,
  Star,
  Image,
  Type,
  FileText,
  Trash2
} from 'lucide-react'
import AdminLayout from '../../../../components/AdminLayout'
import { getBlogPostBySlug, getAllBlogSlugs } from '../../../../lib/content'

export default function EditBlogPost({ post: initialPost }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const [post, setPost] = useState(initialPost || {
    title: '',
    excerpt: '',
    content: '',
    author: 'LHAMO TEAM',
    category: 'BRANDING',
    tags: [],
    featured: false,
    image: '/portfolio/1.svg',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  })

  const categories = ['BRANDING', 'AI', 'SOCIAL', 'VIDEO', 'CONVERSION', 'GROWTH']

  useEffect(() => {
    if (initialPost) {
      setPost({
        ...initialPost,
        tags: initialPost.tags || [],
        seo: initialPost.seo || {
          metaTitle: initialPost.title || '',
          metaDescription: initialPost.excerpt || '',
          keywords: initialPost.tags || []
        }
      })
    }
  }, [initialPost])

  const handleInputChange = (field, value) => {
    setPost(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSEOChange = (field, value) => {
    setPost(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      }
    }))
  }

  const handleTagsChange = (value) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag)
    setPost(prev => ({
      ...prev,
      tags
    }))
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/admin/blog/update/${router.query.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...post,
          readTime: calculateReadTime(post.content)
        })
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        alert('Error updating post')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating post')
    }
    
    setIsLoading(false)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/blog/delete/${router.query.slug}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        alert('Error deleting post')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting post')
    }
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length
    const readTime = Math.ceil(words / wordsPerMinute)
    return `${readTime} MIN`
  }

  if (!initialPost) {
    return (
      <AdminLayout title="POST NOT FOUND">
        <div className="text-center py-12">
          <h1 className="text-2xl font-black text-black mb-4">POST NOT FOUND</h1>
          <button
            onClick={() => router.push('/admin/blog')}
            className="neo-button"
          >
            BACK TO BLOG
          </button>
        </div>
      </AdminLayout>
    )
  }

  if (previewMode) {
    return (
      <AdminLayout title="PREVIEW POST">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPreviewMode(false)}
              className="neo-button-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO EDIT</span>
            </button>
          </div>

          <div className="neo-card bg-white p-8 max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className={`inline-block px-4 py-2 border-4 border-black font-bold text-sm mb-6 ${
                post.category === 'AI' ? 'bg-red-600 text-white' : 'bg-yellow-300 text-black'
              }`}>
                {post.category}
              </div>
              
              <h1 
                className="text-4xl font-black text-black mb-4"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {post.title || 'UNTITLED POST'}
              </h1>
              
              <p className="text-xl font-bold text-black mb-8">
                {post.excerpt || 'No excerpt provided...'}
              </p>
              
              <div className="prose prose-lg">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="EDIT POST">
      <Head>
        <title>Edit Blog Post | LHAMO Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="neo-button-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK</span>
            </button>
            <div>
              <h1 
                className="text-2xl font-black text-black"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                EDIT: {post.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreviewMode(true)}
              className="neo-button-secondary flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>PREVIEW</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 text-white border-4 border-black font-bold px-4 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase tracking-wide flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>DELETE</span>
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading || !post.title || !post.content}
              className="neo-button flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'SAVING...' : 'UPDATE'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neo-card bg-white p-6"
            >
              <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide flex items-center space-x-2">
                <Type className="w-4 h-4" />
                <span>BRUTAL TITLE *</span>
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full neo-input text-lg font-bold"
                placeholder="ENTER YOUR SAVAGE TITLE..."
                required
              />
            </motion.div>

            {/* Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="neo-card bg-white p-6"
            >
              <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                EXCERPT *
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                className="w-full neo-input h-24 resize-none"
                placeholder="BRIEF DESCRIPTION OF YOUR BRUTAL CONTENT..."
                required
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="neo-card bg-white p-6"
            >
              <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                CONTENT *
              </label>
              <textarea
                value={post.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full neo-input h-96 resize-none font-mono"
                placeholder="Write your brutal content here... Use Markdown formatting."
                required
              />
              <div className="mt-2 text-xs font-bold text-gray-600">
                Estimated read time: {calculateReadTime(post.content)}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="neo-card bg-black text-white p-6"
            >
              <h3 className="text-lg font-black mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>POST SETTINGS</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    AUTHOR
                  </label>
                  <input
                    type="text"
                    value={post.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full bg-white text-black border-2 border-white px-3 py-2 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    CATEGORY
                  </label>
                  <select
                    value={post.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-white text-black border-2 border-white px-3 py-2 font-bold"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>TAGS (comma separated)</span>
                  </label>
                  <input
                    type="text"
                    value={post.tags ? post.tags.join(', ') : ''}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    className="w-full bg-white text-black border-2 border-white px-3 py-2 font-bold"
                    placeholder="brutal, marketing, strategy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <Image className="w-4 h-4" />
                    <span>FEATURED IMAGE</span>
                  </label>
                  <input
                    type="text"
                    value={post.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full bg-white text-black border-2 border-white px-3 py-2 font-bold"
                    placeholder="/portfolio/1.svg"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={post.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="flex items-center space-x-2 font-bold text-white">
                    <Star className="w-4 h-4" />
                    <span>FEATURED POST</span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* SEO Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="neo-card bg-red-600 text-white p-6"
            >
              <h3 className="text-lg font-black mb-4">
                SEO SETTINGS
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    META TITLE
                  </label>
                  <input
                    type="text"
                    value={post.seo?.metaTitle || ''}
                    onChange={(e) => handleSEOChange('metaTitle', e.target.value)}
                    className="w-full bg-white text-black border-2 border-white px-3 py-2 font-bold text-sm"
                    placeholder="SEO optimized title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    META DESCRIPTION
                  </label>
                  <textarea
                    value={post.seo?.metaDescription || ''}
                    onChange={(e) => handleSEOChange('metaDescription', e.target.value)}
                    className="w-full bg-white text-black border-2 border-white px-3 py-2 font-bold text-sm h-20 resize-none"
                    placeholder="SEO description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    KEYWORDS
                  </label>
                  <input
                    type="text"
                    value={post.seo?.keywords ? post.seo.keywords.join(', ') : ''}
                    onChange={(e) => handleSEOChange('keywords', e.target.value.split(',').map(k => k.trim()))}
                    className="w-full bg-white text-black border-2 border-white px-3 py-2 font-bold text-sm"
                    placeholder="seo, keywords, here"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="neo-card bg-white max-w-md w-full p-6"
          >
            <h3 className="text-xl font-black text-black mb-4">
              DELETE POST?
            </h3>
            <p className="font-bold text-gray-700 mb-6">
              This action cannot be undone. The post "{post.title}" will be permanently destroyed.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 neo-button-secondary"
              >
                CANCEL
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white border-4 border-black font-bold py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 uppercase"
              >
                DESTROY
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
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
  const post = getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      notFound: true
    }
  }
  
  return {
    props: {
      post
    }
  }
}
