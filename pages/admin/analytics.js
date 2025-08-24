import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalViews: 45672,
    uniqueVisitors: 12543,
    pageViews: 89234,
    bounceRate: 34.5,
    avgSessionDuration: '2:34',
    topPages: [
      { page: '/', views: 15432, percentage: 34.2 },
      { page: '/services', views: 8765, percentage: 19.4 },
      { page: '/about', views: 6543, percentage: 14.5 },
      { page: '/portfolio', views: 5432, percentage: 12.0 },
      { page: '/blog', views: 4321, percentage: 9.6 }
    ],
    trafficSources: [
      { source: 'Organic Search', visitors: 5432, percentage: 43.3 },
      { source: 'Direct', visitors: 3456, percentage: 27.6 },
      { source: 'Social Media', visitors: 2345, percentage: 18.7 },
      { source: 'Referral', visitors: 1310, percentage: 10.4 }
    ],
    devices: [
      { device: 'Desktop', users: 6789, percentage: 54.1 },
      { device: 'Mobile', users: 4321, percentage: 34.4 },
      { device: 'Tablet', users: 1433, percentage: 11.4 }
    ]
  })

  const [timeRange, setTimeRange] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const statCards = [
    {
      title: 'TOTAL VIEWS',
      value: analytics.totalViews.toLocaleString(),
      change: '+12.5%',
      icon: Eye,
      color: 'bg-yellow-300 text-black'
    },
    {
      title: 'UNIQUE VISITORS',
      value: analytics.uniqueVisitors.toLocaleString(),
      change: '+8.3%',
      icon: Users,
      color: 'bg-red-600 text-white'
    },
    {
      title: 'PAGE VIEWS',
      value: analytics.pageViews.toLocaleString(),
      change: '+15.7%',
      icon: Globe,
      color: 'bg-black text-white'
    },
    {
      title: 'AVG SESSION',
      value: analytics.avgSessionDuration,
      change: '+2.1%',
      icon: Clock,
      color: 'bg-yellow-300 text-black'
    }
  ]

  return (
    <AdminLayout title="BRUTAL ANALYTICS">
      <Head>
        <title>Analytics | LHAMO Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 
              className="text-3xl font-black text-black mb-2"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              BRUTAL ANALYTICS
            </h1>
            <p className="font-bold text-gray-600">
              Track your digital empire's performance with savage precision
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="neo-input font-bold"
            >
              <option value="7d">LAST 7 DAYS</option>
              <option value="30d">LAST 30 DAYS</option>
              <option value="90d">LAST 90 DAYS</option>
              <option value="1y">LAST YEAR</option>
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="neo-button flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'REFRESHING...' : 'REFRESH'}</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`neo-card p-6 ${stat.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8" />
                <div className="text-sm font-bold opacity-75">
                  {stat.change}
                </div>
              </div>
              
              <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                {stat.value}
              </div>
              
              <div className="text-sm font-bold opacity-75">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="neo-card bg-white p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 
                className="text-xl font-black text-black"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                TOP PAGES
              </h3>
              <BarChart3 className="w-6 h-6 text-black" />
            </div>
            
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 text-white border-2 border-black flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-black text-black">{page.page}</div>
                      <div className="text-xs font-bold text-gray-600">
                        {page.percentage}% of total
                      </div>
                    </div>
                  </div>
                  <div className="font-black text-black">
                    {page.views.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="neo-card bg-black text-white p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 
                className="text-xl font-black"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                TRAFFIC SOURCES
              </h3>
              <TrendingUp className="w-6 h-6" />
            </div>
            
            <div className="space-y-4">
              {analytics.trafficSources.map((source, index) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{source.source}</span>
                    <span className="font-black text-yellow-300">
                      {source.visitors.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 border-2 border-white">
                    <div 
                      className="h-full bg-red-600"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs font-bold text-gray-300">
                    {source.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Device Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="neo-card bg-yellow-300 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 
              className="text-xl font-black text-black"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              DEVICE BREAKDOWN
            </h3>
            <div className="flex items-center space-x-2">
              <Monitor className="w-5 h-5 text-black" />
              <Smartphone className="w-5 h-5 text-black" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analytics.devices.map((device, index) => {
              const IconComponent = device.device === 'Desktop' ? Monitor : 
                                   device.device === 'Mobile' ? Smartphone : 
                                   Monitor // Tablet uses monitor icon
              
              return (
                <div key={device.device} className="text-center">
                  <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-2xl font-black text-black mb-2">
                    {device.users.toLocaleString()}
                  </div>
                  
                  <div className="font-bold text-black mb-2">
                    {device.device}
                  </div>
                  
                  <div className="text-sm font-bold text-red-600">
                    {device.percentage}%
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="neo-card bg-red-600 text-white p-6"
        >
          <h3 
            className="text-xl font-black mb-6"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            PERFORMANCE METRICS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'BOUNCE RATE', value: `${analytics.bounceRate}%`, status: 'good' },
              { label: 'PAGES/SESSION', value: '3.2', status: 'excellent' },
              { label: 'CONVERSION RATE', value: '2.8%', status: 'good' },
              { label: 'LOAD TIME', value: '1.2s', status: 'excellent' }
            ].map((metric, index) => (
              <div key={metric.label} className="text-center">
                <div className={`w-16 h-16 border-4 border-white flex items-center justify-center mx-auto mb-4 ${
                  metric.status === 'excellent' ? 'bg-green-500' : 'bg-yellow-300'
                }`}>
                  <BarChart3 className="w-8 h-8 text-black" />
                </div>
                
                <div className="text-2xl font-black mb-2">
                  {metric.value}
                </div>
                
                <div className="font-bold text-sm">
                  {metric.label}
                </div>
                
                <div className={`text-xs font-bold mt-1 ${
                  metric.status === 'excellent' ? 'text-green-300' : 'text-yellow-300'
                }`}>
                  {metric.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
