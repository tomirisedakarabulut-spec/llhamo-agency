import { useState, useEffect } from 'react'
import SEOHead from '../../components/SEOHead'

export default function SimpleTest() {
  const [authStatus, setAuthStatus] = useState('checking')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('lhamo_admin_auth')
      setAuthStatus(auth === 'true' ? 'authenticated' : 'not-authenticated')
    }
  }

  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lhamo_admin_auth', 'true')
      localStorage.setItem('lhamo_admin_user', 'LHAMO ADMIN')
      localStorage.setItem('lhamo_admin_login_time', new Date().toISOString())
      checkAuthStatus()
      alert('LOGIN SUCCESS!')
    }
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lhamo_admin_auth')
      localStorage.removeItem('lhamo_admin_user')
      localStorage.removeItem('lhamo_admin_login_time')
      checkAuthStatus()
      alert('LOGOUT SUCCESS!')
    }
  }

  const goToDashboard = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/dashboard'
    }
  }

  const goToLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin'
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-yellow-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-2xl font-black text-black">LOADING...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-8">
      <SEOHead 
        title="SIMPLE TEST | LHAMO Admin"
        description="Simple authentication test page"
      />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-black">⚡</span>
          </div>
          <h1 className="text-3xl font-black text-black mb-2">SIMPLE TEST</h1>
          <p className="text-lg font-bold text-black">AUTHENTICATION TEST PAGE</p>
        </div>

        {/* Status Display */}
        <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000] mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-red-600 text-xl">🛡️</span>
            <h2 className="text-xl font-black">AUTHENTICATION STATUS</h2>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            {authStatus === 'authenticated' ? (
              <span className="text-green-400 text-xl">✅</span>
            ) : (
              <span className="text-red-400 text-xl">❌</span>
            )}
            <span className="font-bold text-lg">
              {authStatus === 'authenticated' ? 'AUTHENTICATED' : 'NOT AUTHENTICATED'}
            </span>
          </div>

          <div className="bg-gray-800 p-4 text-sm">
            <p><strong>Auth:</strong> {typeof window !== 'undefined' ? localStorage.getItem('lhamo_admin_auth') || 'null' : 'null'}</p>
            <p><strong>User:</strong> {typeof window !== 'undefined' ? localStorage.getItem('lhamo_admin_user') || 'null' : 'null'}</p>
            <p><strong>Login Time:</strong> {typeof window !== 'undefined' ? localStorage.getItem('lhamo_admin_login_time') || 'null' : 'null'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white border-4 border-white font-bold py-4 shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-[6px_6px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2"
          >
            <span>⚡</span>
            <span>LOGIN</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white border-4 border-white font-bold py-4 shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-[6px_6px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide flex items-center justify-center space-x-2"
          >
            <span>🚫</span>
            <span>LOGOUT</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={goToDashboard}
            className="bg-blue-600 text-white border-4 border-white font-bold py-4 shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-[6px_6px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide"
          >
            GO TO DASHBOARD
          </button>

          <button
            onClick={goToLogin}
            className="bg-purple-600 text-white border-4 border-white font-bold py-4 shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-[6px_6px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide"
          >
            GO TO LOGIN
          </button>
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-6">
          <button
            onClick={checkAuthStatus}
            className="bg-gray-600 text-white border-4 border-white font-bold py-3 px-6 shadow-[4px_4px_0px_0px_#FDE047] hover:shadow-[6px_6px_0px_0px_#FDE047] transition-all duration-200 uppercase tracking-wide"
          >
            REFRESH STATUS
          </button>
        </div>

        {/* Debug Info */}
        <div className="mt-6 bg-black text-white p-4 border-4 border-white">
          <h3 className="font-black mb-2">Debug Info:</h3>
          <p>Mounted: {mounted ? 'Yes' : 'No'}</p>
          <p>Window: {typeof window !== 'undefined' ? 'Available' : 'Not Available'}</p>
          <p>Status: {authStatus}</p>
        </div>
      </div>
    </div>
  )
}
