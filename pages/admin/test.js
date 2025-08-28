import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '../../components/SEOHead'

export default function AdminTest() {
  const [authStatus, setAuthStatus] = useState('checking')
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('lhamo_admin_auth')
      const adminUser = localStorage.getItem('lhamo_admin_user')
      const loginTime = localStorage.getItem('lhamo_admin_login_time')

      if (isAuthenticated === 'true') {
        setAuthStatus('authenticated')
        setUserData({
          user: adminUser,
          loginTime: loginTime,
          isAuthenticated: true
        })
      } else {
        setAuthStatus('not_authenticated')
        setUserData({
          user: null,
          loginTime: null,
          isAuthenticated: false
        })
      }
    }

    checkAuth()
  }, [])

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
    router.reload()
  }

  const clearAll = () => {
    localStorage.clear()
    router.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <SEOHead 
        title="Admin Test | LHAMO"
        description="Admin authentication test page"
      />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black mb-8">ADMIN AUTH TEST</h1>

        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000] mb-6">
          <h2 className="text-xl font-black mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {authStatus}</p>
            <p><strong>User:</strong> {userData?.user || 'None'}</p>
            <p><strong>Login Time:</strong> {userData?.loginTime || 'None'}</p>
            <p><strong>Is Authenticated:</strong> {userData?.isAuthenticated ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>

        <div className="mt-8 bg-yellow-300 p-4 border-4 border-black">
          <h3 className="font-black mb-2">Test Instructions:</h3>
          <ul className="space-y-1 text-sm">
            <li>• Click LOGIN to simulate authentication</li>
            <li>• Click LOGOUT to clear auth data</li>
            <li>• Click CLEAR ALL to clear all localStorage</li>
            <li>• Check the status above to see changes</li>
          </ul>
        </div>

        <div className="mt-4">
          <a 
            href="/admin"
            className="bg-blue-600 text-white p-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold inline-block hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            GO TO LOGIN PAGE
          </a>
        </div>
      </div>
    </div>
  )
}
