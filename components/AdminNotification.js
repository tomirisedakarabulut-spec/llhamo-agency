import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  X,
  Bell
} from 'lucide-react'

const notificationTypes = {
  success: { icon: CheckCircle, color: 'bg-green-500', textColor: 'text-white' },
  warning: { icon: AlertTriangle, color: 'bg-yellow-300', textColor: 'text-black' },
  error: { icon: AlertTriangle, color: 'bg-red-600', textColor: 'text-white' },
  info: { icon: Info, color: 'bg-blue-600', textColor: 'text-white' }
}

export default function AdminNotification({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(true)
  const config = notificationTypes[type]
  const Icon = config.icon

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed top-4 right-4 z-50 max-w-sm w-full ${config.color} ${config.textColor} border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4`}
        >
          <div className="flex items-start space-x-3">
            <Icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-sm">{message}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onClose?.(), 300)
              }}
              className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-20 rounded transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Notification Manager Hook
export function useNotifications() {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = { id, message, type, duration }
    
    setNotifications(prev => [...prev, notification])
    
    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  }
}

// Notification Bell Component
export function NotificationBell({ count = 0, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="relative p-2 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_#DC2626] hover:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
    >
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
        >
          {count > 99 ? '99+' : count}
        </motion.div>
      )}
    </motion.button>
  )
}

