import { getCRMAnalytics } from '../../../lib/crm'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = getCRMAnalytics()
    
    if (result.success) {
      res.status(200).json(result)
    } else {
      res.status(500).json({ error: result.error })
    }
  } catch (error) {
    console.error('CRM Analytics API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
