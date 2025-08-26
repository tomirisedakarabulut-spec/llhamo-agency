import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { 
  Shield, 
  Eye, 
  Lock,
  Crown,
  Zap
} from 'lucide-react'
import { setAuthToken, isAuthenticated } from '../../lib/auth'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin/dashboard')
    }
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok) {
        // Store the token
        setAuthToken(data.token)
        localStorage.setItem('lhamo_admin_user', JSON.stringify(data.user))
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Authentication failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.1 }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-yellow-300 flex items-center justify-center p-4"
    >
      <Head>
        <title>ADMIN LOGIN | LHAMO - Brutal Control Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <div className="w-20 h-20 bg-red-600 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex items-center justify-center mx-auto mb-6 transform -rotate-3">
            <Crown className="w-10 h-10 text-white" />
          </div>
          
          <h1 
            className="text-4xl font-black text-black mb-2"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            ADMIN PANEL
          </h1>
          <p className="text-lg font-bold text-black">
            BRUTAL CONTROL CENTER
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="neo-card bg-black text-white p-8"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
              SECURE LOGIN
            </h2>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-600 text-white p-4 border-4 border-white mb-6 text-center font-bold"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-white mb-2 uppercase tracking-wide">
                <Lock className="w-4 h-4 inline mr-2" />
                USERNAME
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full bg-white text-black border-4 border-white px-4 py-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
                placeholder="ENTER YOUR WARRIOR NAME..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-black text-white mb-2 uppercase tracking-wide">
                <Eye className="w-4 h-4 inline mr-2" />
                PASSWORD
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full bg-white text-black border-4 border-white px-4 py-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
                placeholder="BRUTAL SECRET CODE..."
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 0, y: 0 }}
              className={`w-full bg-red-600 text-white border-4 border-white font-bold py-4 shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-[6px_6px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Zap className="w-5 h-5" />
              <span>{isLoading ? 'AUTHENTICATING...' : 'ENTER BRUTAL ZONE'}</span>
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-300 font-bold">
              AUTHORIZED PERSONNEL ONLY
            </p>
            <div className="text-xs text-yellow-300 font-bold mt-2">
              Demo: lhamo / brutal2024
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-sm font-bold text-black">
            🔒 PROTECTED BY BRUTAL SECURITY
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
