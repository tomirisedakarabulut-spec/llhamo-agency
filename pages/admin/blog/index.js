import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  MoreVertical,
  RefreshCw,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  X,
  Settings,
  Zap,
  Target,
  Activity
} from 'lucide-react'
import AdminLayout from '../../../components/AdminLayout'
import { getAllBlogPosts } from '../../../lib/content'

export default function AdminBlogList({ blogPosts }) {
  const [posts, setPosts] = useState(blogPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [notifications, setNotifications] = useState([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    averageViews: 0,
    topPerforming: null
  })

  const categories = ['ALL', ...new Set(posts.map(post => post.category))]
  const statuses = ['ALL', 'published', 'draft']

  // Add notification function
  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = { id, message, type, duration, timestamp: new Date() }
    setNotifications(prev => [...prev, notification])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, duration)
  }, [])

  // Calculate stats
  useEffect(() => {
    const totalPosts = posts.length
    const publishedPosts = posts.filter(post => post.published !== false).length
    const draftPosts = posts.filter(post => post.published === false).length
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0)
    const averageViews = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0
    const topPerforming = posts.reduce((top, post) => 
      (post.views || 0) > (top?.views || 0) ? post : top, null
    )

    setStats({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      averageViews,
      topPerforming
    })
  }, [posts])

  // Enhanced filtering and sorting
  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory
      const matchesStatus = selectedStatus === 'ALL' || 
                           (selectedStatus === 'published' && post.published !== false) ||
                           (selectedStatus === 'draft' && post.published === false)
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date || a.createdAt || 0)
          bValue = new Date(b.date || b.createdAt || 0)
          break
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'views':
          aValue = a.views || 0
          bValue = b.views || 0
          break
        case 'category':
          aValue = a.category.toLowerCase()
          bValue = b.category.toLowerCase()
          break
        default:
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleDeletePost = async (slug) => {
    try {
      const response = await fetch(`/api/admin/blog/delete/${slug}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug))
        setShowDeleteModal(null)
        addNotification('Post deleted successfully!', 'success')
      } else {
        addNotification('Error deleting post', 'error')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      addNotification('Error deleting post', 'error')
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    addNotification('Refreshing blog data...', 'info')
    
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000))
      addNotification('Blog data refreshed successfully!', 'success')
    } catch (error) {
      addNotification('Error refreshing data', 'error')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleBulkAction = (action) => {
    addNotification(`Bulk ${action} action initiated`, 'info')
  }

  return (
    <AdminLayout title="BLOG MANAGEMENT">
      <Head>
        <title>Blog Management | LHAMO Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed top-4 right-4 z-50 max-w-sm w-full ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-600 text-white' :
              notification.type === 'warning' ? 'bg-yellow-300 text-black' :
              'bg-blue-600 text-white'
            } border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4`}
          >
            <div className="flex items-start space-x-3">
              {notification.type === 'success' ? <CheckCircle className="w-6 h-6" /> :
               notification.type === 'error' ? <AlertTriangle className="w-6 h-6" /> :
               <FileText className="w-6 h-6" />}
              <div className="flex-1">
                <p className="font-bold text-sm">{notification.message}</p>
                <p className="text-xs opacity-75">{notification.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="neo-card bg-gradient-to-r from-red-600 to-yellow-300 text-white p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 
                className="text-3xl font-black mb-2"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                BRUTAL CONTENT ARMY
              </h1>
              <p className="font-bold opacity-90">
                Manage your savage blog posts with brutal efficiency
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{stats.totalPosts} Total Posts</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{stats.totalViews.toLocaleString()} Total Views</span>
                </span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stats.averageViews} Avg Views</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-3 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200 flex items-center space-x-2 ${
                  isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
                <span className="font-bold text-sm">
                  {isRefreshing ? 'REFRESHING...' : 'REFRESH'}
                </span>
              </motion.button>
              
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
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: 'TOTAL POSTS', 
              value: stats.totalPosts, 
              icon: FileText, 
              color: 'bg-yellow-300 text-black',
              trend: '+5%'
            },
            { 
              title: 'PUBLISHED', 
              value: stats.publishedPosts, 
              icon: CheckCircle, 
              color: 'bg-green-500 text-white',
              trend: '+12%'
            },
            { 
              title: 'DRAFTS', 
              value: stats.draftPosts, 
              icon: Clock, 
              color: 'bg-orange-500 text-white',
              trend: '-3%'
            },
            { 
              title: 'TOTAL VIEWS', 
              value: stats.totalViews.toLocaleString(), 
              icon: Eye, 
              color: 'bg-red-600 text-white',
              trend: '+25%'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`neo-card p-4 ${stat.color} group hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold opacity-75">{stat.title}</p>
                  <p className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                    {stat.value}
                  </p>
                </div>
                <div className="text-right">
                  <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-200 mb-1" />
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-bold">{stat.trend}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="neo-card bg-white p-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH BRUTAL POSTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-yellow-300 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-red-600 text-white border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#FDE047] transition-all duration-200"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-black text-white border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
              >
                <option value="date">DATE</option>
                <option value="title">TITLE</option>
                <option value="views">VIEWS</option>
                <option value="category">CATEGORY</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-3 bg-gray-800 text-white border-4 border-black font-bold hover:bg-black transition-all duration-200"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedPosts.map((post, index) => (
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
        {filteredAndSortedPosts.length === 0 && (
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
              {searchTerm || selectedCategory !== 'ALL' || selectedStatus !== 'ALL'
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

        {/* Bulk Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="neo-card bg-gray-100 p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="select-all" className="w-4 h-4 text-red-600 focus:ring-red-600 border-gray-300 rounded" />
            <label htmlFor="select-all" className="text-sm font-bold text-gray-700">Select All</label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleBulkAction('publish')}
              className="p-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleBulkAction('unpublish')}
              className="p-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="p-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'TOTAL POSTS', value: stats.totalPosts },
            { label: 'FEATURED', value: posts.filter(p => p.featured).length },
            { label: 'CATEGORIES', value: categories.length - 1 },
            { label: 'SHOWING', value: filteredAndSortedPosts.length }
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
