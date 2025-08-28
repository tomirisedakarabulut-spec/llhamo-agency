import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Plus,
  Filter,
  Search,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Crown,
  Zap,
  ArrowRight,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Upload,
  Settings
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminCRM() {
  const [activeTab, setActiveTab] = useState('overview')
  const [analytics, setAnalytics] = useState(null)
  const [leads, setLeads] = useState([])
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showDealForm, setShowDealForm] = useState(false)

  useEffect(() => {
    fetchAnalytics()
    fetchLeads()
    fetchDeals()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/crm/analytics')
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/crm/leads')
      const data = await response.json()
      if (data.success) {
        setLeads(data.leads)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/crm/deals')
      const data = await response.json()
      if (data.success) {
        setDeals(data.deals)
      }
    } catch (error) {
      console.error('Error fetching deals:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500'
      case 'contacted': return 'bg-yellow-500'
      case 'qualified': return 'bg-green-500'
      case 'lost': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStageColor = (stage) => {
    switch (stage) {
      case 'prospecting': return 'bg-blue-500'
      case 'qualification': return 'bg-yellow-500'
      case 'proposal': return 'bg-purple-500'
      case 'negotiation': return 'bg-orange-500'
      case 'closed-won': return 'bg-green-500'
      case 'closed-lost': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount || 0)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR')
  }

  const exportData = (type) => {
    const data = type === 'leads' ? leads : deals
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(data[0] || {}).join(",") + "\n" +
      data.map(row => Object.values(row).join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${type}_export.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <AdminLayout title="CRM WARFARE">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-red-600" />
            <p className="text-lg font-bold">LOADING BRUTAL CRM DATA...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="CRM WARFARE">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-black mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            🔥 LHAMO CRM WARFARE
          </h1>
          <p className="text-lg font-bold text-gray-600">
            BRUTAL CUSTOMER RELATIONSHIP MANAGEMENT SYSTEM
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex space-x-2 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-2">
            {[
              { id: 'overview', label: 'OVERVIEW', icon: BarChart3 },
              { id: 'leads', label: 'LEADS', icon: Target },
              { id: 'deals', label: 'DEALS', icon: DollarSign },
              { id: 'analytics', label: 'ANALYTICS', icon: TrendingUp },
              { id: 'settings', label: 'SETTINGS', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_#000]'
                    : 'bg-white text-black border-2 border-black hover:bg-yellow-300 hover:shadow-[3px_3px_0px_0px_#000]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Analytics Cards */}
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-black mb-4">BRUTAL METRICS</h2>
                
                {analytics && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Target className="w-8 h-8 text-red-600" />
                        <span className="text-2xl font-black">{analytics.leads.total}</span>
                      </div>
                      <p className="font-bold text-sm">TOTAL LEADS</p>
                    </div>
                    
                    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <DollarSign className="w-8 h-8 text-yellow-600" />
                        <span className="text-2xl font-black">{analytics.deals.total}</span>
                      </div>
                      <p className="font-bold text-sm">ACTIVE DEALS</p>
                    </div>
                    
                    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                        <span className="text-2xl font-black">{formatCurrency(analytics.deals.totalValue)}</span>
                      </div>
                      <p className="font-bold text-sm">PIPELINE VALUE</p>
                    </div>
                    
                    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Crown className="w-8 h-8 text-purple-600" />
                        <span className="text-2xl font-black">{analytics.deals.winRate.toFixed(1)}%</span>
                      </div>
                      <p className="font-bold text-sm">WIN RATE</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-black text-black mb-4">RECENT WARFARE</h2>
                <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
                  <div className="space-y-4">
                    {leads.slice(0, 5).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                        <div>
                          <p className="font-bold">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.company}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-bold text-white ${getStatusColor(lead.status)}`}>
                            {lead.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(lead.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-black">BRUTAL LEADS</h2>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => exportData('leads')}
                    className="bg-yellow-300 text-black border-4 border-black font-bold px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>EXPORT</span>
                  </button>
                  <button 
                    onClick={() => setShowLeadForm(true)}
                    className="bg-red-600 text-white border-4 border-black font-bold px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD LEAD</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-4 border-black">
                      <th className="text-left p-3 font-bold">NAME</th>
                      <th className="text-left p-3 font-bold">COMPANY</th>
                      <th className="text-left p-3 font-bold">EMAIL</th>
                      <th className="text-left p-3 font-bold">STATUS</th>
                      <th className="text-left p-3 font-bold">SOURCE</th>
                      <th className="text-left p-3 font-bold">CREATED</th>
                      <th className="text-left p-3 font-bold">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-bold">{lead.name}</td>
                        <td className="p-3">{lead.company}</td>
                        <td className="p-3">{lead.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-bold text-white ${getStatusColor(lead.status)}`}>
                            {lead.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-bold">{lead.source}</td>
                        <td className="p-3 text-sm">{formatDate(lead.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button className="p-1 hover:bg-yellow-300 border-2 border-black">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-blue-300 border-2 border-black">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-red-300 border-2 border-black">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'deals' && (
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-black">SAVAGE DEALS</h2>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => exportData('deals')}
                    className="bg-yellow-300 text-black border-4 border-black font-bold px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>EXPORT</span>
                  </button>
                  <button 
                    onClick={() => setShowDealForm(true)}
                    className="bg-red-600 text-white border-4 border-black font-bold px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD DEAL</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-4 border-black">
                      <th className="text-left p-3 font-bold">DEAL NAME</th>
                      <th className="text-left p-3 font-bold">COMPANY</th>
                      <th className="text-left p-3 font-bold">VALUE</th>
                      <th className="text-left p-3 font-bold">STAGE</th>
                      <th className="text-left p-3 font-bold">PROBABILITY</th>
                      <th className="text-left p-3 font-bold">OWNER</th>
                      <th className="text-left p-3 font-bold">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map((deal) => (
                      <tr key={deal.id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-bold">{deal.name}</td>
                        <td className="p-3">{deal.company}</td>
                        <td className="p-3 font-bold">{formatCurrency(deal.value)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-bold text-white ${getStageColor(deal.stage)}`}>
                            {deal.stage.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-bold">{deal.probability}%</td>
                        <td className="p-3">{deal.owner}</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button className="p-1 hover:bg-yellow-300 border-2 border-black">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-blue-300 border-2 border-black">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-red-300 border-2 border-black">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && analytics && (
            <div className="space-y-8">
              {/* Lead Analytics */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
                <h2 className="text-2xl font-black text-black mb-6">LEAD WARFARE ANALYTICS</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-bold mb-4">BY STATUS</h3>
                    {Object.entries(analytics.leads.byStatus).map(([status, count]) => (
                      <div key={status} className="flex justify-between items-center mb-2">
                        <span className="font-bold">{status.toUpperCase()}</span>
                        <span className="text-lg font-black">{count}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">BY SOURCE</h3>
                    {Object.entries(analytics.leads.bySource).map(([source, count]) => (
                      <div key={source} className="flex justify-between items-center mb-2">
                        <span className="font-bold">{source.toUpperCase()}</span>
                        <span className="text-lg font-black">{count}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">CONVERSION RATE</h3>
                    <div className="text-center">
                      <span className="text-4xl font-black text-red-600">
                        {analytics.leads.conversionRate.toFixed(1)}%
                      </span>
                      <p className="text-sm text-gray-600">LEAD TO DEAL</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deal Analytics */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
                <h2 className="text-2xl font-black text-black mb-6">DEAL DESTRUCTION ANALYTICS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-4">BY STAGE</h3>
                    {Object.entries(analytics.deals.byStage).map(([stage, count]) => (
                      <div key={stage} className="flex justify-between items-center mb-2">
                        <span className="font-bold">{stage.toUpperCase()}</span>
                        <span className="text-lg font-black">{count}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">PERFORMANCE METRICS</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">TOTAL VALUE</span>
                        <span className="text-lg font-black">{formatCurrency(analytics.deals.totalValue)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">WIN RATE</span>
                        <span className="text-lg font-black">{analytics.deals.winRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">AVG DEAL SIZE</span>
                        <span className="text-lg font-black">
                          {formatCurrency(analytics.deals.totalValue / analytics.deals.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6">
              <h2 className="text-2xl font-black text-black mb-6">CRM SETTINGS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-4">LEAD STATUSES</h3>
                  <div className="space-y-2">
                    {['new', 'contacted', 'qualified', 'lost'].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 ${getStatusColor(status)}`}></div>
                        <span className="font-bold">{status.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4">DEAL STAGES</h3>
                  <div className="space-y-2">
                    {['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'].map((stage) => (
                      <div key={stage} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 ${getStageColor(stage)}`}></div>
                        <span className="font-bold">{stage.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  )
}
