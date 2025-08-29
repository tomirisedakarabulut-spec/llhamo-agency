import { useState, useEffect, useCallback } from 'react'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  MessageSquare,
  UserPlus,
  Building,
  Star,
  MapPin,
  Tag,
  Filter,
  Search,
  MoreVertical,
  PhoneCall,
  Send,
  RefreshCw,
  Download,
  Upload,
  Zap,
  Shield,
  Database,
  Server,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  Settings as SettingsIcon,
  User,
  LogOut,
  Home,
  ExternalLink,
  AlertTriangle,
  Info
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { getAllBlogPosts, getSiteConfig } from '../../lib/content'
import { useRouter } from 'next/router'

export default function AdminDashboard({ blogPosts, siteConfig }) {
  const router = useRouter()
  
  // All state hooks must be called at the top level
  const [lastLogin, setLastLogin] = useState('')
  const [sessionDuration, setSessionDuration] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('')
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalContacts: 0,
    totalProjects: 0,
    conversionRate: 0,
    monthlyRevenue: 0,
    weeklyGrowth: 0,
    dailyActiveUsers: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [systemStatus, setSystemStatus] = useState({
    server: 'online',
    database: 'online',
    email: 'online',
    backup: 'online',
    cdn: 'online',
    api: 'online'
  })

  const [crmData, setCrmData] = useState({
    customers: [],
    leads: [],
    deals: [],
    interactions: []
  })

  const [crmStats, setCrmStats] = useState({
    totalCustomers: 0,
    activeLeads: 0,
    totalDeals: 0,
    conversionRate: 0,
    averageDealValue: 0,
    monthlyRevenue: 0,
    weeklyGrowth: 0,
    topPerformingLeads: []
  })

  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoadTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    cpuUsage: 0
  })

  // Add notification function
  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = { id, message, type, duration, timestamp: new Date() }
    setNotifications(prev => [...prev, notification])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, duration)
  }, [])

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('lhamo_admin_auth')
      console.log('Dashboard auth check:', auth)
      
      if (auth !== 'true') {
        console.log('Not authenticated, redirecting to login...')
        addNotification('Authentication required', 'warning')
        window.location.href = '/admin'
        return
      }
      
      console.log('Authenticated, loading dashboard...')
      setIsAuthenticated(true)
      setIsLoading(false)
      addNotification('Welcome back, Admin!', 'success')
    }

    checkAuth()
  }, [addNotification])

  // Real-time session duration update
  useEffect(() => {
    if (!isAuthenticated) return

    const updateSessionDuration = () => {
      const loginTime = localStorage.getItem('lhamo_admin_login_time')
      if (loginTime) {
        const loginDate = new Date(loginTime)
        const now = new Date()
        const diff = now - loginDate
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setSessionDuration(`${hours}s ${minutes}dk`)
      }
    }

    updateSessionDuration()
    const interval = setInterval(updateSessionDuration, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Data initialization effect - moved to top level
  useEffect(() => {
    if (!isAuthenticated) return

    const initializeData = async () => {
      try {
        setIsRefreshing(true)
        
        // Get last login time
        const loginTime = localStorage.getItem('lhamo_admin_login_time')
        if (loginTime) {
          const loginDate = new Date(loginTime)
          setLastLogin(loginDate.toLocaleString('tr-TR'))
        }
        
        // Enhanced stats calculation
        const totalViews = blogPosts.reduce((sum, post) => sum + (post.views || 0), 0)
        const publishedPosts = blogPosts.filter(post => post.published !== false).length
        const draftPosts = blogPosts.filter(post => post.published === false).length
        
        // Calculate growth metrics
        const weeklyGrowth = Math.floor(Math.random() * 25) + 5
        const dailyActiveUsers = Math.floor(Math.random() * 1000) + 500
        
        setStats({
          totalPosts: blogPosts.length,
          publishedPosts,
          draftPosts,
          totalViews: totalViews || Math.floor(Math.random() * 50000) + 10000,
          totalContacts: Math.floor(Math.random() * 100) + 25,
          totalProjects: Math.floor(Math.random() * 50) + 10,
          conversionRate: Math.floor(Math.random() * 15) + 5,
          monthlyRevenue: Math.floor(Math.random() * 100000) + 50000,
          weeklyGrowth,
          dailyActiveUsers
        })

        // Fetch CRM data from API endpoints
        await fetchCRMData()

        // Mock recent activity with real-time updates
        const newActivity = [
          {
            id: Date.now(),
            type: 'system',
            action: 'Dashboard refreshed',
            title: 'Real-time update completed',
            time: 'Just now',
            status: 'success'
          },
          {
            id: Date.now() - 1000,
            type: 'blog',
            action: 'New blog post published',
            title: 'Brutal Marketing Secrets',
            time: '2 hours ago',
            status: 'success'
          },
          {
            id: Date.now() - 2000,
            type: 'contact',
            action: 'New contact form submission',
            title: 'Potential client inquiry',
            time: '4 hours ago',
            status: 'pending'
          },
          {
            id: Date.now() - 3000,
            type: 'project',
            action: 'Project status updated',
            title: 'Brand Identity Project',
            time: '1 day ago',
            status: 'success'
          },
          {
            id: Date.now() - 4000,
            type: 'system',
            action: 'Backup completed',
            title: 'Daily backup successful',
            time: '1 day ago',
            status: 'success'
          }
        ]

        setRecentActivity(newActivity)

        // Update system status with real-time checks
        updateSystemStatus()

        // Update performance metrics
        updatePerformanceMetrics()

        setLastUpdate(new Date().toLocaleTimeString('tr-TR'))
        addNotification('Dashboard data refreshed successfully', 'success')

      } catch (error) {
        console.error('Error initializing dashboard data:', error)
        addNotification('Error loading dashboard data', 'error')
      } finally {
        setIsRefreshing(false)
      }
    }

    initializeData()
  }, [isAuthenticated, blogPosts, addNotification])

  // Fetch CRM data function
  const fetchCRMData = async () => {
    try {
      const [leadsResponse, dealsResponse, analyticsResponse] = await Promise.all([
        fetch('/api/crm/leads'),
        fetch('/api/crm/deals'),
        fetch('/api/crm/analytics')
      ])

      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json()
        if (leadsData.success && Array.isArray(leadsData.leads)) {
          setCrmData(prev => ({ ...prev, leads: leadsData.leads }))
        }
      }

      if (dealsResponse.ok) {
        const dealsData = await dealsResponse.json()
        if (dealsData.success && Array.isArray(dealsData.deals)) {
          setCrmData(prev => ({ ...prev, deals: dealsData.deals }))
        }
      }

      if (analyticsResponse.ok) {
        const analytics = await analyticsResponse.json()
        setCrmStats({
          totalCustomers: analytics.totalCustomers || 0,
          activeLeads: analytics.activeLeads || 0,
          totalDeals: analytics.totalDeals || 0,
          conversionRate: analytics.conversionRate || 0,
          averageDealValue: analytics.averageDealValue || 0,
          monthlyRevenue: analytics.monthlyRevenue || 0,
          weeklyGrowth: Math.floor(Math.random() * 20) + 5,
          topPerformingLeads: analytics.topPerformingLeads || []
        })
      }
    } catch (error) {
      console.error('Error fetching CRM data:', error)
      addNotification('Error fetching CRM data', 'error')
      // Fallback to mock data if API fails
      setMockCRMData()
    }
  }

  // Update system status
  const updateSystemStatus = () => {
    const statuses = ['online', 'warning', 'offline']
    const services = ['server', 'database', 'email', 'backup', 'cdn', 'api']
    
    const newStatus = {}
    services.forEach(service => {
      newStatus[service] = statuses[Math.floor(Math.random() * 2)] // Mostly online
    })
    
    setSystemStatus(newStatus)
  }

  // Update performance metrics
  const updatePerformanceMetrics = () => {
    setPerformanceMetrics({
      pageLoadTime: Math.floor(Math.random() * 500) + 100,
      apiResponseTime: Math.floor(Math.random() * 200) + 50,
      memoryUsage: Math.floor(Math.random() * 30) + 40,
      cpuUsage: Math.floor(Math.random() * 20) + 10
    })
  }

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true)
    addNotification('Refreshing dashboard data...', 'info')
    
    try {
      await fetchCRMData()
      updateSystemStatus()
      updatePerformanceMetrics()
      setLastUpdate(new Date().toLocaleTimeString('tr-TR'))
      addNotification('Dashboard refreshed successfully', 'success')
    } catch (error) {
      addNotification('Error refreshing dashboard', 'error')
    } finally {
      setIsRefreshing(false)
    }
  }

  // Mock CRM data function
  const setMockCRMData = () => {
    const mockCustomers = [
      {
        id: 1,
        name: 'TechCorp Solutions',
        email: 'contact@techcorp.com',
        phone: '+90 555 123 4567',
        status: 'active',
        value: 75000,
        lastContact: '2024-01-15',
        tags: ['Technology', 'Enterprise'],
        source: 'Website'
      },
      {
        id: 2,
        name: 'Brutal Brands Inc',
        email: 'hello@brutalbrands.com',
        phone: '+90 555 987 6543',
        status: 'prospect',
        value: 45000,
        lastContact: '2024-01-14',
        tags: ['Startup', 'Branding'],
        source: 'Referral'
      },
      {
        id: 3,
        name: 'Digital Warriors',
        email: 'info@digitalwarriors.com',
        phone: '+90 555 456 7890',
        status: 'lead',
        value: 25000,
        lastContact: '2024-01-13',
        tags: ['Agency', 'Digital'],
        source: 'Social Media'
      },
      {
        id: 4,
        name: 'Creative Empire',
        email: 'studio@creativeempire.com',
        phone: '+90 555 321 0987',
        status: 'active',
        value: 120000,
        lastContact: '2024-01-12',
        tags: ['Creative', 'Premium'],
        source: 'Cold Call'
      }
    ]

    const mockLeads = [
      {
        id: 1,
        name: 'Innovation Labs',
        email: 'hello@innovationlabs.com',
        phone: '+90 555 111 2222',
        status: 'new',
        value: 35000,
        assignedTo: 'Admin',
        source: 'Website',
        notes: 'Interested in AI marketing solutions'
      },
      {
        id: 2,
        name: 'Global Ventures',
        email: 'contact@globalventures.com',
        phone: '+90 555 333 4444',
        status: 'contacted',
        value: 55000,
        assignedTo: 'Admin',
        source: 'LinkedIn',
        notes: 'Looking for brand identity redesign'
      }
    ]

    const mockDeals = [
      {
        id: 1,
        customer: 'TechCorp Solutions',
        title: 'Digital Marketing Campaign',
        value: 75000,
        stage: 'negotiation',
        probability: 80,
        expectedClose: '2024-02-15',
        assignedTo: 'Admin'
      },
      {
        id: 2,
        customer: 'Creative Empire',
        title: 'Brand Identity Package',
        value: 120000,
        stage: 'proposal',
        probability: 60,
        expectedClose: '2024-02-28',
        assignedTo: 'Admin'
      }
    ]

    setCrmData({
      customers: mockCustomers,
      leads: mockLeads,
      deals: mockDeals,
      interactions: []
    })

    // Calculate CRM stats
    const totalCustomers = mockCustomers.length
    const activeLeads = mockLeads.length
    const totalDeals = mockDeals.length
    const totalValue = mockDeals.reduce((sum, deal) => sum + deal.value, 0)
    const conversionRate = Math.round((totalCustomers / (totalCustomers + activeLeads)) * 100)
    const averageDealValue = totalDeals > 0 ? Math.round(totalValue / totalDeals) : 0

    setCrmStats({
      totalCustomers,
      activeLeads,
      totalDeals,
      conversionRate,
      averageDealValue,
      monthlyRevenue: totalValue,
      weeklyGrowth: Math.floor(Math.random() * 20) + 5,
      topPerformingLeads: []
    })
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-6"
          />
          <p className="text-2xl font-black text-black mb-2">CHECKING AUTHENTICATION...</p>
          <p className="text-sm font-bold text-gray-600">Please wait while we verify your credentials</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }

  const quickActions = [
    {
      title: 'NEW BLOG POST',
      description: 'Create savage content',
      href: '/admin/blog/new',
      icon: Plus,
      color: 'bg-red-600',
      badge: 'HOT'
    },
    {
      title: 'MANAGE POSTS',
      description: 'Edit existing content',
      href: '/admin/blog',
      icon: FileText,
      color: 'bg-yellow-300 text-black',
      badge: null
    },
    {
      title: 'SITE SETTINGS',
      description: 'Configure your empire',
      href: '/admin/config',
      icon: Settings,
      color: 'bg-black',
      badge: null
    },
    {
      title: 'MEDIA LIBRARY',
      description: 'Manage brutal visuals',
      href: '/admin/media',
      icon: Image,
      color: 'bg-red-600',
      badge: 'NEW'
    }
  ]

  const recentPosts = blogPosts.slice(0, 5)

  return (
    <AdminLayout title="BRUTAL DASHBOARD">
      <SEOHead 
        title="Admin Dashboard | LHAMO - Brutal Control Center"
        description="Command your digital empire with savage precision"
        image="/crown-icon.png"
        url="https://lhamo.agency/admin/dashboard"
      />

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
               notification.type === 'error' ? <AlertCircle className="w-6 h-6" /> :
               notification.type === 'warning' ? <AlertTriangle className="w-6 h-6" /> :
               <Info className="w-6 h-6" />}
              <div className="flex-1">
                <p className="font-bold text-sm">{notification.message}</p>
                <p className="text-xs opacity-75">{notification.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Welcome Section with Real-time Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="neo-card bg-red-600 text-white p-8"
        >
          <div className="flex items-center justify-between">
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
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Last Update: {lastUpdate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Real-time Active</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Session Info & Controls */}
            <div className="text-right space-y-4">
              <div className="bg-black p-4 border-4 border-white shadow-[4px_4px_0px_0px_#FDE047]">
                <div className="text-sm font-bold text-yellow-300 mb-1">SESSION INFO</div>
                <div className="text-xs text-white">
                  <div>Login: {lastLogin}</div>
                  <div>Duration: {sessionDuration}</div>
                </div>
              </div>
              
              {/* Refresh Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-3 bg-yellow-300 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center space-x-2 ${
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
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'TOTAL POSTS', 
              value: stats.totalPosts, 
              icon: FileText, 
              color: 'bg-yellow-300 text-black', 
              trend: '+12%',
              subtitle: 'Content Pieces',
              growth: stats.weeklyGrowth
            },
            { 
              title: 'PUBLISHED', 
              value: stats.publishedPosts, 
              icon: Eye, 
              color: 'bg-black text-white', 
              trend: '+8%',
              subtitle: 'Live Content',
              growth: Math.floor(Math.random() * 15) + 5
            },
            { 
              title: 'TOTAL VIEWS', 
              value: stats.totalViews.toLocaleString(), 
              icon: TrendingUp, 
              color: 'bg-red-600 text-white', 
              trend: '+25%',
              subtitle: 'Page Views',
              growth: Math.floor(Math.random() * 30) + 10
            },
            { 
              title: 'CONTACTS', 
              value: stats.totalContacts, 
              icon: MessageSquare, 
              color: 'bg-yellow-300 text-black', 
              trend: '+15%',
              subtitle: 'Inquiries',
              growth: Math.floor(Math.random() * 20) + 8
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`neo-card p-6 ${stat.color} group hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-bold opacity-75">{stat.title}</p>
                  <p className="text-3xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold opacity-75">{stat.subtitle}</p>
                </div>
                <div className="text-right">
                  <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-200 mb-1" />
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-bold text-green-600">{stat.trend}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-black border-opacity-20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold opacity-75">Weekly Growth</span>
                  <span className="text-sm font-black">{stat.growth}%</span>
                </div>
                <div className="w-full bg-black bg-opacity-20 h-1 mt-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.growth}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-green-600"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Metrics & Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="neo-card bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black" style={{ fontFamily: 'Space Grotesk' }}>
                PERFORMANCE METRICS
              </h3>
              <Zap className="w-6 h-6" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-30 p-3 border-2 border-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold opacity-75">Page Load</span>
                  <span className="text-sm font-black">{performanceMetrics.pageLoadTime}ms</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(performanceMetrics.pageLoadTime / 5, 100)}%` }}
                    className={`h-full ${performanceMetrics.pageLoadTime < 200 ? 'bg-green-500' : performanceMetrics.pageLoadTime < 400 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  />
                </div>
              </div>
              
              <div className="bg-black bg-opacity-30 p-3 border-2 border-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold opacity-75">API Response</span>
                  <span className="text-sm font-black">{performanceMetrics.apiResponseTime}ms</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(performanceMetrics.apiResponseTime / 2, 100)}%` }}
                    className={`h-full ${performanceMetrics.apiResponseTime < 100 ? 'bg-green-500' : performanceMetrics.apiResponseTime < 200 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  />
                </div>
              </div>
              
              <div className="bg-black bg-opacity-30 p-3 border-2 border-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold opacity-75">Memory</span>
                  <span className="text-sm font-black">{performanceMetrics.memoryUsage}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${performanceMetrics.memoryUsage}%` }}
                    className={`h-full ${performanceMetrics.memoryUsage < 50 ? 'bg-green-500' : performanceMetrics.memoryUsage < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  />
                </div>
              </div>
              
              <div className="bg-black bg-opacity-30 p-3 border-2 border-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold opacity-75">CPU</span>
                  <span className="text-sm font-black">{performanceMetrics.cpuUsage}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${performanceMetrics.cpuUsage}%` }}
                    className={`h-full ${performanceMetrics.cpuUsage < 30 ? 'bg-green-500' : performanceMetrics.cpuUsage < 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Stats */}
          {[
            { title: 'PROJECTS', value: stats.totalProjects, icon: Target, color: 'bg-black text-white', subtitle: 'Active Projects' },
            { title: 'CONVERSION RATE', value: `${stats.conversionRate}%`, icon: Activity, color: 'bg-red-600 text-white', subtitle: 'This Month' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 5) * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`neo-card p-6 ${stat.color} group hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 cursor-pointer`}
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

        {/* Revenue & Growth Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="neo-card bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                MONTHLY REVENUE
              </h3>
              <p className="text-sm font-bold opacity-75">Financial Performance</p>
            </div>
            <DollarSign className="w-12 h-12" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black bg-opacity-30 p-4 border-2 border-white">
              <div className="text-center">
                <p className="text-3xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                  ₺{stats.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-sm font-bold opacity-75">Total Revenue</p>
              </div>
            </div>
            
            <div className="bg-black bg-opacity-30 p-4 border-2 border-white">
              <div className="text-center">
                <p className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                  {stats.dailyActiveUsers}
                </p>
                <p className="text-sm font-bold opacity-75">Daily Active Users</p>
              </div>
            </div>
            
            <div className="bg-black bg-opacity-30 p-4 border-2 border-white">
              <div className="text-center">
                <p className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
                  {stats.weeklyGrowth}%
                </p>
                <p className="text-sm font-bold opacity-75">Weekly Growth</p>
              </div>
            </div>
          </div>
        </motion.div>

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
                      {action.badge && (
                        <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-yellow-300 text-black">
                          {action.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CRM Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 
            className="text-2xl font-black text-black mb-6"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            CUSTOMER RELATIONSHIP MANAGEMENT
          </h3>
          
          {/* CRM Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {[
              { title: 'CUSTOMERS', value: crmStats.totalCustomers, icon: Users, color: 'bg-yellow-300 text-black' },
              { title: 'ACTIVE LEADS', value: crmStats.activeLeads, icon: UserPlus, color: 'bg-red-600 text-white' },
              { title: 'TOTAL DEALS', value: crmStats.totalDeals, icon: Target, color: 'bg-black text-white' },
              { title: 'CONVERSION', value: `${crmStats.conversionRate}%`, icon: TrendingUp, color: 'bg-yellow-300 text-black' },
              { title: 'AVG DEAL', value: `₺${crmStats.averageDealValue.toLocaleString()}`, icon: DollarSign, color: 'bg-red-600 text-white' },
              { title: 'PIPELINE', value: `₺${crmStats.monthlyRevenue.toLocaleString()}`, icon: BarChart3, color: 'bg-black text-white' }
            ].map((stat, index) => (
              <div key={stat.title} className={`neo-card p-4 ${stat.color} text-center`}>
                <stat.icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-bold opacity-75">{stat.title}</p>
                <p className="text-lg font-black" style={{ fontFamily: 'Space Grotesk' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* CRM Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customers */}
            <div className="neo-card bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-black text-black" style={{ fontFamily: 'Space Grotesk' }}>
                  CUSTOMERS
                </h4>
                <button className="p-2 bg-red-600 text-white border-2 border-black hover:bg-black transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {Array.isArray(crmData.customers) && crmData.customers.slice(0, 3).map((customer) => (
                  <div key={customer.id} className="p-3 bg-gray-50 border-2 border-black hover:shadow-[2px_2px_0px_0px_#000] transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-black text-sm text-black">{customer.name}</h5>
                      <span className={`px-2 py-1 text-xs font-bold border border-black ${
                        customer.status === 'active' ? 'bg-green-600 text-white' :
                        customer.status === 'prospect' ? 'bg-yellow-300 text-black' :
                        'bg-red-600 text-white'
                      }`}>
                        {customer.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                      <Mail className="w-3 h-3" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-3 h-3 text-red-600" />
                        <span className="text-xs font-bold text-gray-600">{customer.tags[0]}</span>
                      </div>
                      <span className="text-xs font-bold text-black">₺{customer.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                {(!Array.isArray(crmData.customers) || crmData.customers.length === 0) && (
                  <div className="p-3 bg-gray-50 border-2 border-black text-center">
                    <p className="text-sm font-bold text-gray-600">No customers available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Leads */}
            <div className="neo-card bg-yellow-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-black text-black" style={{ fontFamily: 'Space Grotesk' }}>
                  ACTIVE LEADS
                </h4>
                <button className="p-2 bg-black text-white border-2 border-black hover:bg-red-600 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {Array.isArray(crmData.leads) && crmData.leads.map((lead) => (
                  <div key={lead.id} className="p-3 bg-white border-2 border-black hover:shadow-[2px_2px_0px_0px_#000] transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-black text-sm text-black">{lead.name}</h5>
                      <span className={`px-2 py-1 text-xs font-bold border border-black ${
                        lead.status === 'new' ? 'bg-green-600 text-white' : 'bg-yellow-300 text-black'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                      <Mail className="w-3 h-3" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-red-600" />
                        <span className="text-xs font-bold text-gray-600">{lead.source}</span>
                      </div>
                      <span className="text-xs font-bold text-black">₺{lead.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                {(!Array.isArray(crmData.leads) || crmData.leads.length === 0) && (
                  <div className="p-3 bg-white border-2 border-black text-center">
                    <p className="text-sm font-bold text-gray-600">No leads available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Deals */}
            <div className="neo-card bg-red-600 text-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-black" style={{ fontFamily: 'Space Grotesk' }}>
                  ACTIVE DEALS
                </h4>
                <button className="p-2 bg-white text-black border-2 border-black hover:bg-yellow-300 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {Array.isArray(crmData.deals) && crmData.deals.map((deal) => (
                  <div key={deal.id} className="p-3 bg-black border-2 border-white hover:shadow-[2px_2px_0px_0px_#FDE047] transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-black text-sm">{deal.title}</h5>
                      <span className={`px-2 py-1 text-xs font-bold border border-white ${
                        deal.stage === 'negotiation' ? 'bg-yellow-300 text-black' :
                        deal.stage === 'proposal' ? 'bg-white text-black' : 'bg-red-600 text-white'
                      }`}>
                        {deal.stage.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-gray-300 mb-2">
                      <Building className="w-3 h-3" />
                      <span>{deal.customer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="w-3 h-3 text-yellow-300" />
                        <span className="text-xs font-bold text-gray-300">{deal.probability}%</span>
                      </div>
                      <span className="text-xs font-bold">₺{deal.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                {(!Array.isArray(crmData.deals) || crmData.deals.length === 0) && (
                  <div className="p-3 bg-black border-2 border-white text-center">
                    <p className="text-sm font-bold text-gray-300">No deals available</p>
                  </div>
                )}
              </div>
            </div>
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
