import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import AdminLayout from '../../../components/AdminLayout'
import { 
  PlusCircle, 
  Save, 
  XCircle, 
  Image, 
  Tag, 
  Calendar, 
  User, 
  BookOpen, 
  Star,
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react'

export default function NewBlogPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'LHAMO TEAM',
    date: new Date().toISOString().split('T')[0],
    category: '',
    readTime: '',
    image: '',
    featured: false,
    tags: '',
  })
  const [status, setStatus] = useState({ loading: false, error: null, success: null })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: null, success: null })

    try {
      const response = await fetch('/api/admin/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create blog post')
      }

      setStatus({ loading: false, error: null, success: 'Blog post created successfully!' })
      router.push('/admin/blog')
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: null })
    }
  }

  return (
    <AdminLayout>
      <Head>
        <title>New Blog Post | LHAMO Admin</title>
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-black" style={{ fontFamily: 'Space Grotesk' }}>
            CREATE NEW BLOG POST
          </h1>
          <button onClick={() => router.push('/admin/blog')} className="neo-button-secondary flex items-center space-x-2">
            <XCircle className="w-5 h-5" />
            <span>CANCEL</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="neo-card bg-white p-6 space-y-6">
          {/* Title & Excerpt */}
          <div>
            <label htmlFor="title" className="admin-label">TITLE *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="neo-input"
              placeholder="BRUTAL BRANDING SECRETS"
              required
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="admin-label">EXCERPT *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="neo-input"
              rows="3"
              placeholder="Discover the savage techniques that transform boring brands..."
              required
            ></textarea>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="admin-label">CONTENT (MARKDOWN) *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="neo-input font-mono"
              rows="15"
              placeholder="## Unleash Your Brand's Inner Beast&#10;&#10;In the cutthroat world of modern marketing..."
              required
            ></textarea>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className="admin-label">AUTHOR</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="neo-input pl-12"
                  placeholder="LHAMO TEAM"
                />
              </div>
            </div>
            <div>
              <label htmlFor="date" className="admin-label">DATE *</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="neo-input pl-12"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="admin-label">CATEGORY *</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="neo-input pl-12 uppercase"
                  placeholder="BRANDING"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="readTime" className="admin-label">READ TIME</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="neo-input pl-12"
                  placeholder="5 MIN"
                />
              </div>
            </div>
          </div>

          {/* Image & Tags */}
          <div>
            <label htmlFor="image" className="admin-label">FEATURED IMAGE URL</label>
            <div className="relative">
              <Image className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="neo-input pl-12"
                placeholder="/portfolio/1.svg"
              />
            </div>
          </div>
          <div>
            <label htmlFor="tags" className="admin-label">TAGS (COMMA SEPARATED)</label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="neo-input pl-12"
                placeholder="branding, strategy, design"
              />
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-red-600 border-4 border-black focus:ring-red-600"
            />
            <label htmlFor="featured" className="admin-label !mb-0 flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>MARK AS FEATURED POST</span>
            </label>
          </div>

          {/* Status Messages */}
          {status.error && (
            <p className="text-red-600 font-bold text-sm mt-4 flex items-center space-x-2">
              <XCircle className="w-5 h-5" />
              <span>ERROR: {status.error}</span>
            </p>
          )}
          {status.success && (
            <p className="text-green-600 font-bold text-sm mt-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>SUCCESS: {status.success}</span>
            </p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ x: -2, y: -2 }}
            whileTap={{ x: 0, y: 0 }}
            className="neo-button w-full flex items-center justify-center space-x-3 mt-8"
            disabled={status.loading}
          >
            {status.loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>PUBLISHING...</span>
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                <span>PUBLISH BRUTAL POST</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </AdminLayout>
  )
}
