import { createDeal, getDeals } from '../../../lib/crm'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get deals with optional filters
        const { stage, owner } = req.query
        const filters = { stage, owner }
        const result = getDeals(filters)
        
        if (result.success) {
          res.status(200).json(result)
        } else {
          res.status(500).json({ error: result.error })
        }
        break

      case 'POST':
        // Create new deal
        const dealData = req.body
        const createResult = createDeal(dealData)
        
        if (createResult.success) {
          res.status(201).json(createResult)
        } else {
          res.status(400).json({ error: createResult.error })
        }
        break

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('CRM Deals API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
