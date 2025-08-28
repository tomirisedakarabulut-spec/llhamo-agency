import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
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
  RefreshCw
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { getSiteConfig } from '../../lib/content'

export default function AdminConfig({ initialConfig }) {
  const [config, setConfig] = useState(initialConfig)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('site')
  const [successMessage, setSuccessMessage] = useState('')

  const tabs = [
    { id: 'site', label: 'SITE INFO', icon: Globe },
    { id: 'contact', label: 'CONTACT', icon: Mail },
    { id: 'social', label: 'SOCIAL MEDIA', icon: Shield },
    { id: 'seo', label: 'SEO SETTINGS', icon: Eye },
    { id: 'theme', label: 'THEME', icon: Palette }
  ]

  const handleConfigChange = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setSuccessMessage('')

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
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        alert('Error saving configuration')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving configuration')
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    setConfig(initialConfig)
  }

  return (
    <AdminLayout title="SITE CONFIGURATION">
      <Head>
        <title>Site Configuration | LHAMO Admin</title>
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
              BRUTAL CONFIGURATION
            </h1>
            <p className="font-bold text-gray-600">
              Control your digital empire's settings with savage precision
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="neo-button-secondary flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RESET</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="neo-button flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'SAVING...' : 'SAVE CHANGES'}</span>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card bg-green-500 text-white p-4 text-center font-bold"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="neo-card bg-white p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 font-bold border-4 border-black transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-[4px_4px_0px_0px_#000]'
                    : 'bg-white text-black hover:bg-yellow-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

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
