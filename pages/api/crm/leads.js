import { createLead, getLeads, updateLead } from '../../../lib/crm'

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
        // Get leads with optional filters
        const { status, source, dateFrom, dateTo } = req.query
        const filters = { status, source, dateFrom, dateTo }
        const result = getLeads(filters)
        
        if (result.success) {
          res.status(200).json(result)
        } else {
          res.status(500).json({ error: result.error })
        }
        break

      case 'POST':
        // Create new lead
        const leadData = req.body
        const createResult = createLead(leadData)
        
        if (createResult.success) {
          res.status(201).json(createResult)
        } else {
          res.status(400).json({ error: createResult.error })
        }
        break

      case 'PUT':
        // Update lead
        const { id, ...updateData } = req.body
        const updateResult = updateLead(id, updateData)
        
        if (updateResult.success) {
          res.status(200).json(updateResult)
        } else {
          res.status(404).json({ error: updateResult.error })
        }
        break

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT'])
        res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('CRM Leads API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
