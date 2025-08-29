import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Menu,
  X,
  Home,
  FileText,
  Settings,
  Image,
  Users,
  BarChart3,
  LogOut,
  Crown,
  Shield,
  Bell
} from 'lucide-react'
import AdminNotification, { useNotifications, NotificationBell } from './AdminNotification'

const adminNavigation = [
  { name: 'DASHBOARD', href: '/admin/dashboard', icon: Home, badge: null },
  { name: 'BLOG POSTS', href: '/admin/blog', icon: FileText, badge: 'NEW' },
  { name: 'SITE CONFIG', href: '/admin/config', icon: Settings, badge: null },
  { name: 'MEDIA', href: '/admin/media', icon: Image, badge: null },
  { name: 'ANALYTICS', href: '/admin/analytics', icon: BarChart3, badge: 'HOT' },
]

export default function AdminLayout({ children, title = 'ADMIN PANEL' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()
  const { notifications, addNotification, removeNotification } = useNotifications()

  useEffect(() => {
    // Check authentication only if we're not already on login page
    if (router.pathname === '/admin') return
    
    const isAuthenticated = localStorage.getItem('lhamo_admin_auth')
    const adminUser = localStorage.getItem('lhamo_admin_user')
    
    if (isAuthenticated !== 'true') {
      router.replace('/admin')
      return
    }
    
    setUser(adminUser || 'ADMIN')
  }, [router.pathname, router])

  const handleLogout = () => {
    addNotification('Logging out...', 'info', 2000)
    setTimeout(() => {
      // Clear all admin data
      localStorage.removeItem('lhamo_admin_auth')
      localStorage.removeItem('lhamo_admin_user')
      localStorage.removeItem('lhamo_admin_login_time')
      localStorage.removeItem('lhamo_admin_token')
      
      // Redirect to login page
      router.push('/admin')
    }, 2000)
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed inset-y-0 left-0 w-64 bg-black border-r-4 border-black z-40 lg:relative lg:translate-x-0 lg:flex-shrink-0 lg:h-screen lg:flex lg:flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-red-600 border-b-4 border-black">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-yellow-300" />
            <div>
              <div className="font-black text-white text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                LHAMO
              </div>
              <div className="text-xs font-bold text-yellow-300">
                ADMIN
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-white hover:text-yellow-300 border-2 border-white hover:border-yellow-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {adminNavigation.map((item) => {
            const Icon = item.icon
            const isActive = router.pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 font-bold transition-all duration-200 border-4 relative ${
                  isActive
                    ? 'bg-red-600 text-white border-white shadow-[4px_4px_0px_0px_#FDE047]'
                    : 'text-white border-transparent hover:bg-white hover:text-black hover:border-white hover:shadow-[2px_2px_0px_0px_#DC2626]'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span style={{ fontFamily: 'Space Grotesk' }}>{item.name}</span>
                </div>
                {item.badge && (
                  <div className={`px-2 py-1 text-xs font-bold rounded ${
                    item.badge === 'NEW' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-300 text-black'
                  }`}>
                    {item.badge}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User info & logout */}
        <div className="p-4 bg-yellow-300 border-t-4 border-black flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-black" />
              <div>
                <div className="font-black text-black text-sm">{user}</div>
                <div className="text-xs font-bold text-red-600">BRUTAL ADMIN</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 bg-red-600 text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Top bar */}
        <header className="bg-yellow-300 border-b-4 border-black h-16 flex items-center justify-between px-6 flex-shrink-0 relative z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#DC2626]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 
              className="text-2xl font-black text-black"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              {title}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationBell 
              count={notifications.length} 
              onClick={() => setShowNotifications(!showNotifications)} 
            />
            <Link
              href="/"
              target="_blank"
              className="neo-button-secondary text-sm"
            >
              VIEW SITE
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Notifications */}
      {notifications.map((notification) => (
        <AdminNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}
