import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'lhamo-brutal-secret-key-2024'
const SALT_ROUNDS = 12

// Admin credentials (in production, use database)
const ADMIN_CREDENTIALS = {
  username: 'lhamo',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAk6e6Yv3c1yqBWVHxkd0LHAk6e6Yv3c1yqB', // 'brutal2024' hashed
  role: 'admin',
  permissions: ['read', 'write', 'delete', 'admin']
}

// Rate limiting
const loginAttempts = new Map()
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

export function isRateLimited(ip) {
  const attempts = loginAttempts.get(ip)
  if (!attempts) return false
  
  const now = Date.now()
  const recentAttempts = attempts.filter(time => now - time < LOCKOUT_TIME)
  
  if (recentAttempts.length >= MAX_ATTEMPTS) {
    return true
  }
  
  loginAttempts.set(ip, recentAttempts)
  return false
}

export function recordLoginAttempt(ip) {
  const attempts = loginAttempts.get(ip) || []
  attempts.push(Date.now())
  loginAttempts.set(ip, attempts)
}

export async function authenticateUser(username, password, ip) {
  // Check rate limiting
  if (isRateLimited(ip)) {
    throw new Error('Too many login attempts. Please try again later.')
  }

  // Validate credentials
  if (username !== ADMIN_CREDENTIALS.username) {
    recordLoginAttempt(ip)
    throw new Error('Invalid credentials')
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.password)
  if (!isValidPassword) {
    recordLoginAttempt(ip)
    throw new Error('Invalid credentials')
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      username: ADMIN_CREDENTIALS.username,
      role: ADMIN_CREDENTIALS.role,
      permissions: ADMIN_CREDENTIALS.permissions,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    },
    JWT_SECRET
  )

  return {
    token,
    user: {
      username: ADMIN_CREDENTIALS.username,
      role: ADMIN_CREDENTIALS.role,
      permissions: ADMIN_CREDENTIALS.permissions
    }
  }
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export function hasPermission(user, permission) {
  return user && user.permissions && user.permissions.includes(permission)
}

export function requireAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
      
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' })
      }

      const user = verifyToken(token)
      req.user = user
      
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' })
    }
  }
}

export function requirePermission(permission) {
  return (handler) => {
    return async (req, res) => {
      try {
        if (!hasPermission(req.user, permission)) {
          return res.status(403).json({ error: 'Insufficient permissions' })
        }
        
        return handler(req, res)
      } catch (error) {
        return res.status(403).json({ error: 'Permission check failed' })
      }
    }
  }
}

// Client-side authentication helpers
export function getAuthToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('lhamo_admin_token')
}

export function setAuthToken(token) {
  if (typeof window === 'undefined') return
  localStorage.setItem('lhamo_admin_token', token)
}

export function removeAuthToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('lhamo_admin_token')
  localStorage.removeItem('lhamo_admin_user')
}

export function isAuthenticated() {
  const token = getAuthToken()
  if (!token) return false
  
  try {
    const decoded = verifyToken(token)
    return decoded.exp > Math.floor(Date.now() / 1000)
  } catch {
    removeAuthToken()
    return false
  }
}

export function getUser() {
  const token = getAuthToken()
  if (!token) return null
  
  try {
    return verifyToken(token)
  } catch {
    removeAuthToken()
    return null
  }
}
