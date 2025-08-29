import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save,
  Settings,
  Mail,
  Phone,
  MapPin,
  Globe,
  Palette,
  Shield,
  Eye,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Database,
  Server,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  User,
  Lock,
  Key,
  Download,
  Upload,
  Trash2,
  Plus,
  X,
  ExternalLink,
  Activity,
  TrendingUp,
  Target
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { getSiteConfig } from '../../lib/content'

export default function AdminConfig({ initialConfig }) {
  const [config, setConfig] = useState(initialConfig)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('site')
  const [successMessage, setSuccessMessage] = useState('')
  const [notifications, setNotifications] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [backupHistory, setBackupHistory] = useState([])
  const [systemStatus, setSystemStatus] = useState({
    database: 'online',
    email: 'online',
    backup: 'online',
    cdn: 'online'
  })

  const tabs = [
    { id: 'site', label: 'SITE INFO', icon: Globe, color: 'bg-blue-600' },
    { id: 'contact', label: 'CONTACT', icon: Mail, color: 'bg-green-600' },
    { id: 'social', label: 'SOCIAL MEDIA', icon: Shield, color: 'bg-purple-600' },
    { id: 'seo', label: 'SEO SETTINGS', icon: Eye, color: 'bg-orange-600' },
    { id: 'theme', label: 'THEME', icon: Palette, color: 'bg-pink-600' },
    { id: 'security', label: 'SECURITY', icon: Lock, color: 'bg-red-600' },
    { id: 'backup', label: 'BACKUP', icon: Database, color: 'bg-gray-600' }
  ]

  // Add notification function
  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = { id, message, type, duration, timestamp: new Date() }
    setNotifications(prev => [...prev, notification])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, duration)
  }, [])

  // Validate configuration
  const validateConfig = useCallback((configData) => {
    const errors = {}
    
    // Site validation
    if (!configData.site?.name?.trim()) {
      errors.siteName = 'Site name is required'
    }
    if (!configData.site?.url?.trim()) {
      errors.siteUrl = 'Site URL is required'
    }
    if (configData.site?.url && !configData.site.url.startsWith('http')) {
      errors.siteUrl = 'Site URL must start with http:// or https://'
    }
    
    // Contact validation
    if (configData.contact?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configData.contact.email)) {
      errors.contactEmail = 'Invalid email format'
    }
    
    // SEO validation
    if (configData.seo?.metaTitle && configData.seo.metaTitle.length > 60) {
      errors.metaTitle = 'Meta title should be less than 60 characters'
    }
    if (configData.seo?.metaDescription && configData.seo.metaDescription.length > 160) {
      errors.metaDescription = 'Meta description should be less than 160 characters'
    }
    
    return errors
  }, [])

  const handleConfigChange = (section, field, value) => {
    const newConfig = {
      ...config,
      [section]: {
        ...config[section],
        [field]: value
      }
    }
    
    setConfig(newConfig)
    setHasUnsavedChanges(true)
    
    // Clear validation errors for this field
    if (validationErrors[`${section}${field}`]) {
      setValidationErrors(prev => ({
        ...prev,
        [`${section}${field}`]: undefined
      }))
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    setSuccessMessage('')

    // Validate before saving
    const errors = validateConfig(config)
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      addNotification('Please fix validation errors before saving', 'error')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/admin/config/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      })

      if (response.ok) {
        setSuccessMessage('CONFIGURATION SAVED SUCCESSFULLY!')
        setHasUnsavedChanges(false)
        addNotification('Configuration saved successfully!', 'success')
        
        // Add to backup history
        setBackupHistory(prev => [{
          id: Date.now(),
          timestamp: new Date(),
          type: 'manual',
          status: 'success'
        }, ...prev.slice(0, 9)])
        
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        addNotification('Error saving configuration', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      addNotification('Error saving configuration', 'error')
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    setConfig(initialConfig)
    setHasUnsavedChanges(false)
    setValidationErrors({})
    addNotification('Configuration reset to original values', 'info')
  }

  const handleBackup = async () => {
    try {
      addNotification('Creating backup...', 'info')
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setBackupHistory(prev => [{
        id: Date.now(),
        timestamp: new Date(),
        type: 'manual',
        status: 'success'
      }, ...prev.slice(0, 9)])
      
      addNotification('Backup created successfully!', 'success')
    } catch (error) {
      addNotification('Error creating backup', 'error')
    }
  }

  const handleRestore = async (backupId) => {
    try {
      addNotification('Restoring backup...', 'info')
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 1500))
      addNotification('Backup restored successfully!', 'success')
    } catch (error) {
      addNotification('Error restoring backup', 'error')
    }
  }

  // Auto-save indicator
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        addNotification('You have unsaved changes', 'warning')
      }, 30000) // 30 seconds
      
      return () => clearTimeout(timer)
    }
  }, [hasUnsavedChanges, addNotification])

  return (
    <AdminLayout title="SITE CONFIGURATION">
      <Head>
        <title>Site Configuration | LHAMO Admin</title>
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

      <div className="space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="neo-card bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 
                className="text-3xl font-black mb-2"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                BRUTAL CONFIGURATION
              </h1>
              <p className="font-bold opacity-90">
                Control your digital empire's settings with savage precision
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="flex items-center space-x-1">
                  <Database className="w-4 h-4" />
                  <span>Database: {systemStatus.database}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>Email: {systemStatus.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Security: Active</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {hasUnsavedChanges && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1 bg-yellow-300 text-black border-2 border-black text-xs font-bold"
                >
                  UNSAVED CHANGES
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="p-3 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isLoading}
                className={`p-3 bg-green-600 text-white border-2 border-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200 flex items-center space-x-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span className="font-bold text-sm">
                  {isLoading ? 'SAVING...' : 'SAVE CONFIG'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="neo-card bg-green-500 text-white p-4 border-4 border-black"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold">{successMessage}</span>
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="neo-card bg-white p-4"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 font-bold border-4 transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${tab.color} text-white border-black shadow-[4px_4px_0px_0px_#000]`
                    : 'bg-gray-100 text-black border-gray-300 hover:border-black hover:shadow-[2px_2px_0px_0px_#000]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

          {/* Site Info Tab */}
          {activeTab === 'site' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    SITE NAME *
                  </label>
                  <input
                    type="text"
                    value={config.site.name}
                    onChange={(e) => handleConfigChange('site', 'name', e.target.value)}
                    className="w-full neo-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    SITE URL *
                  </label>
                  <input
                    type="url"
                    value={config.site.url}
                    onChange={(e) => handleConfigChange('site', 'url', e.target.value)}
                    className="w-full neo-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                  SITE TITLE *
                </label>
                <input
                  type="text"
                  value={config.site.title}
                  onChange={(e) => handleConfigChange('site', 'title', e.target.value)}
                  className="w-full neo-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                  SITE DESCRIPTION *
                </label>
                <textarea
                  value={config.site.description}
                  onChange={(e) => handleConfigChange('site', 'description', e.target.value)}
                  className="w-full neo-input h-24 resize-none"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>EMAIL ADDRESS *</span>
                  </label>
                  <input
                    type="email"
                    value={config.contact.email}
                    onChange={(e) => handleConfigChange('contact', 'email', e.target.value)}
                    className="w-full neo-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>PHONE NUMBER</span>
                  </label>
                  <input
                    type="text"
                    value={config.contact.phone}
                    onChange={(e) => handleConfigChange('contact', 'phone', e.target.value)}
                    className="w-full neo-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>ADDRESS</span>
                  </label>
                  <input
                    type="text"
                    value={config.contact.address}
                    onChange={(e) => handleConfigChange('contact', 'address', e.target.value)}
                    className="w-full neo-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    WORKING HOURS
                  </label>
                  <input
                    type="text"
                    value={config.contact.workingHours}
                    onChange={(e) => handleConfigChange('contact', 'workingHours', e.target.value)}
                    className="w-full neo-input"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    INSTAGRAM URL
                  </label>
                  <input
                    type="url"
                    value={config.social.instagram}
                    onChange={(e) => handleConfigChange('social', 'instagram', e.target.value)}
                    className="w-full neo-input"
                    placeholder="https://instagram.com/lhamo.co"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    TWITTER URL
                  </label>
                  <input
                    type="url"
                    value={config.social.twitter}
                    onChange={(e) => handleConfigChange('social', 'twitter', e.target.value)}
                    className="w-full neo-input"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    LINKEDIN URL
                  </label>
                  <input
                    type="url"
                    value={config.social.linkedin}
                    onChange={(e) => handleConfigChange('social', 'linkedin', e.target.value)}
                    className="w-full neo-input"
                    placeholder="https://linkedin.com/company/name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    YOUTUBE URL
                  </label>
                  <input
                    type="url"
                    value={config.social.youtube}
                    onChange={(e) => handleConfigChange('social', 'youtube', e.target.value)}
                    className="w-full neo-input"
                    placeholder="https://youtube.com/@channel"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                  DEFAULT META TITLE
                </label>
                <input
                  type="text"
                  value={config.seo.defaultTitle}
                  onChange={(e) => handleConfigChange('seo', 'defaultTitle', e.target.value)}
                  className="w-full neo-input"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                  DEFAULT META DESCRIPTION
                </label>
                <textarea
                  value={config.seo.defaultDescription}
                  onChange={(e) => handleConfigChange('seo', 'defaultDescription', e.target.value)}
                  className="w-full neo-input h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                  DEFAULT KEYWORDS (comma separated)
                </label>
                <input
                  type="text"
                  value={config.seo.keywords.join(', ')}
                  onChange={(e) => handleConfigChange('seo', 'keywords', e.target.value.split(',').map(k => k.trim()))}
                  className="w-full neo-input"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                  OG IMAGE URL
                </label>
                <input
                  type="text"
                  value={config.seo.ogImage}
                  onChange={(e) => handleConfigChange('seo', 'ogImage', e.target.value)}
                  className="w-full neo-input"
                  placeholder="/og-image.jpg"
                />
              </div>
            </motion.div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    PRIMARY COLOR
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.theme.primaryColor}
                      onChange={(e) => handleConfigChange('theme', 'primaryColor', e.target.value)}
                      className="w-16 h-12 border-4 border-black cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.primaryColor}
                      onChange={(e) => handleConfigChange('theme', 'primaryColor', e.target.value)}
                      className="flex-1 neo-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    SECONDARY COLOR
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.theme.secondaryColor}
                      onChange={(e) => handleConfigChange('theme', 'secondaryColor', e.target.value)}
                      className="w-16 h-12 border-4 border-black cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.secondaryColor}
                      onChange={(e) => handleConfigChange('theme', 'secondaryColor', e.target.value)}
                      className="flex-1 neo-input"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    ACCENT COLOR
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.theme.accentColor}
                      onChange={(e) => handleConfigChange('theme', 'accentColor', e.target.value)}
                      className="w-16 h-12 border-4 border-black cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.accentColor}
                      onChange={(e) => handleConfigChange('theme', 'accentColor', e.target.value)}
                      className="flex-1 neo-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                    BACKGROUND COLOR
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.theme.backgroundColor}
                      onChange={(e) => handleConfigChange('theme', 'backgroundColor', e.target.value)}
                      className="w-16 h-12 border-4 border-black cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.backgroundColor}
                      onChange={(e) => handleConfigChange('theme', 'backgroundColor', e.target.value)}
                      className="flex-1 neo-input"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export async function getServerSideProps() {
  const siteConfig = getSiteConfig()
  
  return {
    props: {
      initialConfig: siteConfig
    }
  }
}
