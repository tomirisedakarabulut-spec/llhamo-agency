import { useState } from 'react'
import SEOHead from '../../components/SEOHead'
import { 
  Shield, 
  Eye, 
  Lock,
  Crown,
  Zap,
  EyeOff,
  AlertTriangle
} from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log('Login attempt:', { username, password })

    // Simple authentication
    if (username === 'lhamo' && password === 'brutal2024') {
      console.log('Login successful')
      
      // Set authentication
      localStorage.setItem('lhamo_admin_auth', 'true')
      localStorage.setItem('lhamo_admin_user', 'LHAMO ADMIN')
      localStorage.setItem('lhamo_admin_login_time', new Date().toISOString())
      
      // Redirect
      window.location.href = '/admin/dashboard'
    } else {
      console.log('Login failed')
      setError('WRONG CREDENTIALS! TRY AGAIN.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <SEOHead 
        title="ADMIN LOGIN | LHAMO - Brutal Control Panel"
        description="Secure admin access to LHAMO's brutal control center"
        image="/crown-icon.png"
        url="https://lhamo.agency/admin"
      />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-600 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex items-center justify-center mx-auto mb-6 transform -rotate-3">
            <Crown className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-black text-black mb-2">
            ADMIN PANEL
          </h1>
          <p className="text-lg font-bold text-black">
            BRUTAL CONTROL CENTER
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-black">SECURE LOGIN</h2>
          </div>

          {error && (
            <div className="p-4 bg-red-600 border-4 border-white mb-6 text-center font-bold flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-white mb-2 uppercase tracking-wide">
                <Lock className="w-4 h-4 inline mr-2" />
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white text-black border-4 border-white px-4 py-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
                placeholder="ENTER YOUR WARRIOR NAME..."
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-black text-white mb-2 uppercase tracking-wide">
                <Eye className="w-4 h-4 inline mr-2" />
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white text-black border-4 border-white px-4 py-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200 pr-12"
                  placeholder="BRUTAL SECRET CODE..."
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-black transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full border-4 border-white font-bold py-4 shadow-[4px_4px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2 ${
                isLoading 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-red-600 text-white hover:shadow-[6px_6px_0px_0px_#FDE047]'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Zap className="w-5 h-5" />
              )}
              <span>
                {isLoading ? 'AUTHENTICATING...' : 'ENTER BRUTAL ZONE'}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-300 font-bold">
              AUTHORIZED PERSONNEL ONLY
            </p>
            <div className="text-xs text-yellow-300 font-bold mt-2">
              Demo: lhamo / brutal2024
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-3 bg-gray-800 text-xs text-gray-300">
            <p>Debug Info:</p>
            <p>Username: {username}</p>
            <p>Password Length: {password.length}</p>
            <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
            <p>Error: {error || 'None'}</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm font-bold text-black">
            🔒 PROTECTED BY BRUTAL SECURITY
          </p>
        </div>

        {/* Quick Test Links */}
        <div className="mt-6 text-center space-y-2">
          <a 
            href="/admin/simple"
            className="block text-sm text-red-600 font-bold hover:text-black transition-colors"
          >
            SIMPLE TEST
          </a>
          <a 
            href="/admin/debug"
            className="block text-sm text-red-600 font-bold hover:text-black transition-colors"
          >
            DEBUG PAGE
          </a>
          <a 
            href="/admin/test"
            className="block text-sm text-red-600 font-bold hover:text-black transition-colors"
          >
            TEST PAGE
          </a>
        </div>
      </div>
    </div>
  )
}
