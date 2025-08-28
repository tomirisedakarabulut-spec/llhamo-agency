import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '../../components/SEOHead'

export default function AdminDebug() {
  const [debugInfo, setDebugInfo] = useState({})
  const [localStorageData, setLocalStorageData] = useState({})
  const router = useRouter()

  useEffect(() => {
    const getDebugInfo = () => {
      const auth = localStorage.getItem('lhamo_admin_auth')
      const user = localStorage.getItem('lhamo_admin_user')
      const loginTime = localStorage.getItem('lhamo_admin_login_time')
      const token = localStorage.getItem('lhamo_admin_token')

      setDebugInfo({
        auth,
        user,
        loginTime,
        token,
        isAuthenticated: auth === 'true',
        currentPath: router.pathname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })

      // Get all localStorage data
      const allData = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          allData[key] = localStorage.getItem(key)
        }
      }
      setLocalStorageData(allData)
    }

    getDebugInfo()
  }, [router.pathname])

  const handleLogin = () => {
    localStorage.setItem('lhamo_admin_auth', 'true')
    localStorage.setItem('lhamo_admin_user', 'LHAMO ADMIN')
    localStorage.setItem('lhamo_admin_login_time', new Date().toISOString())
    router.reload()
  }

  const handleLogout = () => {
    localStorage.removeItem('lhamo_admin_auth')
    localStorage.removeItem('lhamo_admin_user')
    localStorage.removeItem('lhamo_admin_login_time')
    localStorage.removeItem('lhamo_admin_token')
    router.reload()
  }

  const clearAll = () => {
    localStorage.clear()
    router.reload()
  }

  const testRedirect = () => {
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <SEOHead 
        title="Admin Debug | LHAMO"
        description="Admin authentication debug page"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8">ADMIN DEBUG PANEL</h1>

        {/* Debug Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
            <h2 className="text-xl font-black mb-4">Authentication Status</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(debugInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-bold">{key}:</span>
                  <span className="text-gray-600">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
            <h2 className="text-xl font-black mb-4">LocalStorage Data</h2>
            <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
              {Object.entries(localStorageData).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-bold">{key}:</span>
                  <span className="text-gray-600">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            LOGIN
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            LOGOUT
          </button>

          <button
            onClick={clearAll}
            className="bg-yellow-600 text-black p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            CLEAR ALL
          </button>

          <button
            onClick={testRedirect}
            className="bg-blue-600 text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            TEST REDIRECT
          </button>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/admin"
            className="bg-purple-600 text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold text-center hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            LOGIN PAGE
          </a>
          
          <a 
            href="/admin/dashboard"
            className="bg-orange-600 text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold text-center hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            DASHBOARD
          </a>
          
          <a 
            href="/admin/test"
            className="bg-pink-600 text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold text-center hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            TEST PAGE
          </a>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-300 p-6 border-4 border-black">
          <h3 className="font-black mb-4">Debug Instructions:</h3>
          <ul className="space-y-2 text-sm">
            <li>• Check authentication status above</li>
            <li>• Use buttons to test login/logout</li>
            <li>• Check localStorage data</li>
            <li>• Test redirects to dashboard</li>
            <li>• Monitor console for errors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
