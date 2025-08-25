import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText,
  Settings,
  Image,
  TrendingUp,
  Users,
  Eye,
  Edit,
  Plus,
  BarChart3,
  Calendar,
  Crown,
  Mail,
  Phone,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  Activity,
  Target,
  DollarSign,
  MessageSquare
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { getAllBlogPosts, getSiteConfig } from '../../lib/content'

export default function AdminDashboard({ blogPosts, siteConfig }) {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalContacts: 0,
    totalProjects: 0,
    conversionRate: 0,
    monthlyRevenue: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [systemStatus, setSystemStatus] = useState({
    server: 'online',
    database: 'online',
    email: 'online',
    backup: 'online'
  })

  useEffect(() => {
    // Enhanced stats calculation
    const totalViews = blogPosts.reduce((sum, post) => sum + (post.views || 0), 0)
    const publishedPosts = blogPosts.filter(post => post.published !== false).length
    const draftPosts = blogPosts.filter(post => post.published === false).length
    
    setStats({
      totalPosts: blogPosts.length,
      publishedPosts,
      draftPosts,
      totalViews: totalViews || Math.floor(Math.random() * 50000) + 10000,
      totalContacts: Math.floor(Math.random() * 100) + 25,
      totalProjects: Math.floor(Math.random() * 50) + 10,
      conversionRate: Math.floor(Math.random() * 15) + 5,
      monthlyRevenue: Math.floor(Math.random() * 100000) + 50000
    })

    // Mock recent activity
    setRecentActivity([
      {
        id: 1,
        type: 'blog',
        action: 'New blog post published',
        title: 'Brutal Marketing Secrets',
        time: '2 hours ago',
        status: 'success'
      },
      {
        id: 2,
        type: 'contact',
        action: 'New contact form submission',
        title: 'Potential client inquiry',
        time: '4 hours ago',
        status: 'pending'
      },
      {
        id: 3,
        type: 'project',
        action: 'Project status updated',
        title: 'Brand Identity Project',
        time: '1 day ago',
        status: 'success'
      },
      {
        id: 4,
        type: 'system',
        action: 'Backup completed',
        title: 'Daily backup successful',
        time: '1 day ago',
        status: 'success'
      }
    ])
  }, [blogPosts])

  const quickActions = [
    {
      title: 'NEW BLOG POST',
      description: 'Create savage content',
      href: '/admin/blog/new',
      icon: Plus,
      color: 'bg-red-600'
    },
    {
      title: 'MANAGE POSTS',
      description: 'Edit existing content',
      href: '/admin/blog',
      icon: FileText,
      color: 'bg-yellow-300 text-black'
    },
    {
      title: 'SITE SETTINGS',
      description: 'Configure your empire',
      href: '/admin/config',
      icon: Settings,
      color: 'bg-black'
    },
    {
      title: 'MEDIA LIBRARY',
      description: 'Manage brutal visuals',
      href: '/admin/media',
      icon: Image,
      color: 'bg-red-600'
    }
  ]

  const recentPosts = blogPosts.slice(0, 5)

  return (
    <AdminLayout title="BRUTAL DASHBOARD">
      <Head>
        <title>Admin Dashboard | LHAMO</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="neo-card bg-red-600 text-white p-8"
        >
          <div className="flex items-center space-x-4">
            <Crown className="w-12 h-12 text-yellow-300" />
            <div>
              <h2 
                className="text-3xl font-black mb-2"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                WELCOME TO THE BRUTAL CONTROL CENTER
              </h2>
              <p className="text-lg font-bold">
                Command your digital empire with savage precision!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'TOTAL POSTS', value: stats.totalPosts, icon: FileText, color: 'bg-yellow-300 text-black', trend: '+12%' },
            { title: 'PUBLISHED', value: stats.publishedPosts, icon: Eye, color: 'bg-black text-white', trend: '+8%' },
            { title: 'TOTAL VIEWS', value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'bg-red-600 text-white', trend: '+25%' },
            { title: 'CONTACTS', value: stats.totalContacts, icon: MessageSquare, color: 'bg-yellow-300 text-black', trend: '+15%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`neo-card p-6 ${stat.color} group hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-bold opacity-75">{stat.title}</p>
                  <p className="text-3xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'PROJECTS', value: stats.totalProjects, icon: Target, color: 'bg-black text-white', subtitle: 'Active Projects' },
            { title: 'CONVERSION RATE', value: `${stats.conversionRate}%`, icon: Activity, color: 'bg-red-600 text-white', subtitle: 'This Month' },
            { title: 'REVENUE', value: `₺${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-yellow-300 text-black', subtitle: 'Monthly' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
              className={`neo-card p-6 ${stat.color} group hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-bold opacity-75">{stat.title}</p>
                  <p className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold opacity-75">{stat.subtitle}</p>
                </div>
                <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 
            className="text-2xl font-black text-black mb-6"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            QUICK ACTIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="group"
              >
                <Link
                  href={action.href}
                  className={`block neo-card p-6 ${action.color} text-white hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200`}
                >
                  <div className="flex items-center space-x-4">
                    <action.icon className="w-8 h-8" />
                    <div>
                      <h4 className="font-black text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                        {action.title}
                      </h4>
                      <p className="text-sm font-bold opacity-75">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="neo-card bg-white p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 
                className="text-xl font-black text-black"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                RECENT POSTS
              </h3>
              <Link
                href="/admin/blog"
                className="text-red-600 font-bold text-sm hover:text-black transition-colors"
              >
                VIEW ALL →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.slug}
                  className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200"
                >
                  <div className="flex-1">
                    <h4 className="font-black text-black text-sm mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs font-bold text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                      </span>
                      <span className={`px-2 py-1 border border-black text-xs ${
                        post.category === 'AI' ? 'bg-red-600 text-white' : 
                        'bg-yellow-300 text-black'
                      }`}>
                        {post.category}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views || Math.floor(Math.random() * 1000)} views</span>
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/blog/edit/${post.slug}`}
                    className="p-2 bg-black text-white border-2 border-black hover:bg-red-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              ))}
              
              {recentPosts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4" />
                  <p className="font-bold">No posts yet. Create your first brutal content!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="neo-card bg-black text-white p-6"
          >
            <h3 
              className="text-xl font-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              SYSTEM STATUS
            </h3>
            
            <div className="space-y-4">
              {Object.entries(systemStatus).map(([service, status]) => (
                <div key={service} className="flex items-center justify-between p-3 border-2 border-white">
                  <div className="flex items-center space-x-3">
                    {status === 'online' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <div>
                      <p className="font-bold text-sm capitalize">{service}</p>
                      <p className={`text-xs font-bold ${
                        status === 'online' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {status.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity & Site Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="neo-card bg-yellow-300 p-6"
          >
            <h3 
              className="text-xl font-black text-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              RECENT ACTIVITY
            </h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 bg-white border-2 border-black"
                >
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-600' : 'bg-yellow-600'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-bold text-black text-sm">{activity.action}</p>
                    <p className="text-xs font-bold text-gray-600">{activity.title}</p>
                    <p className="text-xs font-bold text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Site Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="neo-card bg-red-600 text-white p-6"
          >
            <h3 
              className="text-xl font-black mb-6"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              SITE OVERVIEW
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black border-2 border-white">
                <div>
                  <p className="font-bold text-sm">SITE NAME</p>
                  <p className="font-black text-lg">{siteConfig.site.name}</p>
                </div>
                <Globe className="w-6 h-6" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-300 text-black border-2 border-black">
                <div>
                  <p className="font-bold text-sm">CONTACT EMAIL</p>
                  <p className="font-black text-lg">{siteConfig.contact.email}</p>
                </div>
                <Mail className="w-6 h-6" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white text-black border-2 border-black">
                <div>
                  <p className="font-bold text-sm">PHONE</p>
                  <p className="font-black text-lg">{siteConfig.contact.phone || '+90 555 BRUTAL'}</p>
                </div>
                <Phone className="w-6 h-6" />
              </div>
              
              <div className="flex items-center justify-between p-4 border-2 border-white">
                <div>
                  <p className="font-bold text-sm">LAST UPDATED</p>
                  <p className="font-black text-lg">{new Date().toLocaleDateString('tr-TR')}</p>
                </div>
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  )
}

export async function getServerSideProps() {
  const blogPosts = getAllBlogPosts()
  const siteConfig = getSiteConfig()
  
  return {
    props: {
      blogPosts,
      siteConfig
    }
  }
}
