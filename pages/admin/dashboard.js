import { useState, useEffect } from 'react'
import SEOHead from '../../components/SEOHead'
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
  Send
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
    monthlyRevenue: 0
  })

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('lhamo_admin_auth')
      console.log('Dashboard auth check:', auth)
      
      if (auth !== 'true') {
        console.log('Not authenticated, redirecting to login...')
        window.location.href = '/admin'
        return
      }
      
      console.log('Authenticated, loading dashboard...')
      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Data initialization effect - moved to top level
  useEffect(() => {
    if (!isAuthenticated) return

    // Get last login time
    const loginTime = localStorage.getItem('lhamo_admin_login_time')
    if (loginTime) {
      const loginDate = new Date(loginTime)
      setLastLogin(loginDate.toLocaleString('tr-TR'))
      
      // Calculate session duration
      const now = new Date()
      const diff = now - loginDate
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setSessionDuration(`${hours}s ${minutes}dk`)
    }
    
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

    // Fetch CRM data from API endpoints
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
            monthlyRevenue: analytics.monthlyRevenue || 0
          })
        }
      } catch (error) {
        console.error('Error fetching CRM data:', error)
        // Fallback to mock data if API fails
        setMockCRMData()
      }
    }

    fetchCRMData()

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

  }, [isAuthenticated, blogPosts])

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
      monthlyRevenue: totalValue
    })
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl font-bold">CHECKING AUTHENTICATION...</p>
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
      <SEOHead 
        title="Admin Dashboard | LHAMO - Brutal Control Center"
        description="Command your digital empire with savage precision"
        image="/crown-icon.png"
        url="https://lhamo.agency/admin/dashboard"
      />

      <div className="space-y-8">
        {/* Welcome Section */}
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
              </div>
            </div>
            
            {/* Session Info */}
            <div className="text-right">
              <div className="bg-black p-4 border-4 border-white shadow-[4px_4px_0px_0px_#FDE047]">
                <div className="text-sm font-bold text-yellow-300 mb-1">SESSION INFO</div>
                <div className="text-xs text-white">
                  <div>Login: {lastLogin}</div>
                  <div>Duration: {sessionDuration}</div>
                </div>
              </div>
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
