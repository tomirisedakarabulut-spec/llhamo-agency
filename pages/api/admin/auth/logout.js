import { requireAuth } from '../../../../lib/auth'

async function logout(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return a success response
    // The client should remove the token from localStorage
    
    res.status(200).json({ 
      message: 'Logged out successfully' 
    })

  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default requireAuth(logout)






