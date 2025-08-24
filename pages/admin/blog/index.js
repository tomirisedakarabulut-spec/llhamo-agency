import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  Tag,
  Star,
  MoreVertical
} from 'lucide-react'
import AdminLayout from '../../../components/AdminLayout'
import { getAllBlogPosts } from '../../../lib/content'

export default function AdminBlogList({ blogPosts }) {
  const [posts, setPosts] = useState(blogPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [showDeleteModal, setShowDeleteModal] = useState(null)

  const categories = ['ALL', ...new Set(posts.map(post => post.category))]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDeletePost = async (slug) => {
    try {
      const response = await fetch(`/api/admin/blog/delete/${slug}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug))
        setShowDeleteModal(null)
        alert('Post deleted successfully!')
      } else {
        alert('Error deleting post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post')
    }
  }

  return (
    <AdminLayout title="BLOG MANAGEMENT">
      <Head>
        <title>Blog Management | LHAMO Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 
              className="text-3xl font-black text-black mb-2"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              BRUTAL CONTENT ARMY
            </h1>
            <p className="font-bold text-gray-600">
              Manage your savage blog posts with brutal efficiency
            </p>
          </div>
          
          <Link href="/admin/blog/new">
            <motion.button
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 0, y: 0 }}
              className="neo-button flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>CREATE POST</span>
            </motion.button>
          </Link>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="neo-card bg-white p-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="SEARCH BRUTAL POSTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full neo-input pr-12 uppercase placeholder:text-gray-500"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-black" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="neo-input min-w-[150px] font-bold"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`neo-card p-6 group relative ${
                post.featured ? 'bg-red-600 text-white' : 'bg-white text-black'
              }`}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-yellow-300 text-black p-2 border-4 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-12">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Post Content */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 border-2 text-xs font-bold ${
                    post.featured 
                      ? 'bg-yellow-300 text-black border-white' 
                      : 'bg-black text-white border-black'
                  }`}>
                    {post.category}
                  </span>
                  
                  <div className="relative group">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 
                  className="text-lg font-black mb-2 leading-tight group-hover:text-red-600 transition-colors duration-200"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {post.title}
                </h3>

                <p className={`text-sm font-bold mb-4 leading-tight ${
                  post.featured ? 'text-white opacity-90' : 'text-gray-700'
                }`}>
                  {post.excerpt}
                </p>

                <div className={`flex items-center space-x-4 text-xs font-bold ${
                  post.featured ? 'text-white opacity-75' : 'text-gray-600'
                }`}>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className={`flex-1 text-center py-2 px-3 border-2 font-bold text-sm transition-all duration-200 ${
                    post.featured
                      ? 'bg-white text-black border-white hover:bg-yellow-300'
                      : 'bg-gray-100 text-black border-black hover:bg-black hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  VIEW
                </Link>
                
                <Link
                  href={`/admin/blog/edit/${post.slug}`}
                  className={`flex-1 text-center py-2 px-3 border-2 font-bold text-sm transition-all duration-200 ${
                    post.featured
                      ? 'bg-yellow-300 text-black border-white hover:bg-white'
                      : 'bg-black text-white border-black hover:bg-red-600'
                  }`}
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  EDIT
                </Link>
                
                <button
                  onClick={() => setShowDeleteModal(post.slug)}
                  className={`p-2 border-2 transition-all duration-200 ${
                    post.featured
                      ? 'bg-black text-white border-white hover:bg-red-800'
                      : 'bg-red-600 text-white border-black hover:bg-red-800'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card bg-white text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Plus className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-black text-black mb-2">
              NO BRUTAL POSTS FOUND
            </h3>
            <p className="font-bold text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'ALL' 
                ? 'Try adjusting your search or filters'
                : 'Create your first savage content!'
              }
            </p>
            <Link href="/admin/blog/new">
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="neo-button"
              >
                CREATE FIRST POST
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'TOTAL POSTS', value: posts.length },
            { label: 'FEATURED', value: posts.filter(p => p.featured).length },
            { label: 'CATEGORIES', value: categories.length - 1 },
            { label: 'SHOWING', value: filteredPosts.length }
          ].map((stat, index) => (
            <div key={stat.label} className="neo-card bg-black text-white p-4 text-center">
              <div className="text-2xl font-black text-red-600 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
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
              This action cannot be undone. The post will be permanently destroyed.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 neo-button-secondary"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleDeletePost(showDeleteModal)}
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

export async function getServerSideProps() {
  const blogPosts = getAllBlogPosts()
  
  return {
    props: {
      blogPosts
    }
  }
}
