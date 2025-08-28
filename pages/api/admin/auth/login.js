import { authenticateUser } from '../../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'

    // Authenticate user
    const result = await authenticateUser(username, password, clientIP)

    res.status(200).json({
      message: 'Authentication successful',
      token: result.token,
      user: result.user
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(401).json({ 
      message: error.message || 'Authentication failed' 
    })
  }
}






