// LHAMO CRM System - Brutal Customer Relationship Management
import fs from 'fs'
import path from 'path'

// CRM Data Structure
const CRM_DATA_FILE = path.join(process.cwd(), 'data', 'crm.json')
const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json')
const DEALS_FILE = path.join(process.cwd(), 'data', 'deals.json')
const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Initialize CRM data files
const initializeCRMData = () => {
  ensureDataDir()
  
  // Initialize leads file
  if (!fs.existsSync(LEADS_FILE)) {
    const initialLeads = {
      leads: [],
      lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2))
  }
  
  // Initialize deals file
  if (!fs.existsSync(DEALS_FILE)) {
    const initialDeals = {
      deals: [],
      lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(DEALS_FILE, JSON.stringify(initialDeals, null, 2))
  }
  
  // Initialize contacts file
  if (!fs.existsSync(CONTACTS_FILE)) {
    const initialContacts = {
      contacts: [],
      lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(initialContacts, null, 2))
  }
}

// Lead Management
export const createLead = (leadData) => {
  try {
    initializeCRMData()
    const data = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'))
    
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...leadData,
      status: leadData.status || 'new',
      source: leadData.source || 'website',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      score: leadData.score || 0,
      tags: leadData.tags || [],
      notes: leadData.notes || [],
      activities: []
    }
    
    data.leads.push(newLead)
    data.lastUpdated = new Date().toISOString()
    fs.writeFileSync(LEADS_FILE, JSON.stringify(data, null, 2))
    
    return { success: true, lead: newLead }
  } catch (error) {
    console.error('Error creating lead:', error)
    return { success: false, error: error.message }
  }
}

export const getLeads = (filters = {}) => {
  try {
    initializeCRMData()
    const data = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'))
    
    let leads = data.leads
    
    // Apply filters
    if (filters.status) {
      leads = leads.filter(lead => lead.status === filters.status)
    }
    if (filters.source) {
      leads = leads.filter(lead => lead.source === filters.source)
    }
    if (filters.dateFrom) {
      leads = leads.filter(lead => new Date(lead.createdAt) >= new Date(filters.dateFrom))
    }
    if (filters.dateTo) {
      leads = leads.filter(lead => new Date(lead.createdAt) <= new Date(filters.dateTo))
    }
    
    return { success: true, leads, total: leads.length }
  } catch (error) {
    console.error('Error getting leads:', error)
    return { success: false, error: error.message }
  }
}

export const updateLead = (leadId, updateData) => {
  try {
    initializeCRMData()
    const data = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'))
    
    const leadIndex = data.leads.findIndex(lead => lead.id === leadId)
    if (leadIndex === -1) {
      return { success: false, error: 'Lead not found' }
    }
    
    data.leads[leadIndex] = {
      ...data.leads[leadIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    data.lastUpdated = new Date().toISOString()
    fs.writeFileSync(LEADS_FILE, JSON.stringify(data, null, 2))
    
    return { success: true, lead: data.leads[leadIndex] }
  } catch (error) {
    console.error('Error updating lead:', error)
    return { success: false, error: error.message }
  }
}

// Deal Management
export const createDeal = (dealData) => {
  try {
    initializeCRMData()
    const data = JSON.parse(fs.readFileSync(DEALS_FILE, 'utf8'))
    
    const newDeal = {
      id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...dealData,
      stage: dealData.stage || 'prospecting',
      probability: dealData.probability || 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activities: [],
      notes: []
    }
    
    data.deals.push(newDeal)
    data.lastUpdated = new Date().toISOString()
    fs.writeFileSync(DEALS_FILE, JSON.stringify(data, null, 2))
    
    return { success: true, deal: newDeal }
  } catch (error) {
    console.error('Error creating deal:', error)
    return { success: false, error: error.message }
  }
}

export const getDeals = (filters = {}) => {
  try {
    initializeCRMData()
    const data = JSON.parse(fs.readFileSync(DEALS_FILE, 'utf8'))
    
    let deals = data.deals
    
    // Apply filters
    if (filters.stage) {
      deals = deals.filter(deal => deal.stage === filters.stage)
    }
    if (filters.owner) {
      deals = deals.filter(deal => deal.owner === filters.owner)
    }
    
    return { success: true, deals, total: deals.length }
  } catch (error) {
    console.error('Error getting deals:', error)
    return { success: false, error: error.message }
  }
}

// Contact Management
export const createContact = (contactData) => {
  try {
    initializeCRMData()
    const data = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'))
    
    const newContact = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...contactData,
      status: contactData.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interactions: [],
      notes: []
    }
    
    data.contacts.push(newContact)
    data.lastUpdated = new Date().toISOString()
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2))
    
    return { success: true, contact: newContact }
  } catch (error) {
    console.error('Error creating contact:', error)
    return { success: false, error: error.message }
  }
}

// Analytics
export const getCRMAnalytics = () => {
  try {
    initializeCRMData()
    
    const leadsData = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'))
    const dealsData = JSON.parse(fs.readFileSync(DEALS_FILE, 'utf8'))
    const contactsData = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'))
    
    // Lead Analytics
    const leadStats = {
      total: leadsData.leads.length,
      byStatus: {},
      bySource: {},
      conversionRate: 0
    }
    
    leadsData.leads.forEach(lead => {
      leadStats.byStatus[lead.status] = (leadStats.byStatus[lead.status] || 0) + 1
      leadStats.bySource[lead.source] = (leadStats.bySource[lead.source] || 0) + 1
    })
    
    // Deal Analytics
    const dealStats = {
      total: dealsData.deals.length,
      totalValue: dealsData.deals.reduce((sum, deal) => sum + (deal.value || 0), 0),
      byStage: {},
      winRate: 0
    }
    
    dealsData.deals.forEach(deal => {
      dealStats.byStage[deal.stage] = (dealStats.byStage[deal.stage] || 0) + 1
    })
    
    // Calculate conversion rate
    const wonDeals = dealsData.deals.filter(deal => deal.stage === 'closed-won').length
    dealStats.winRate = dealsData.deals.length > 0 ? (wonDeals / dealsData.deals.length) * 100 : 0
    
    return {
      success: true,
      analytics: {
        leads: leadStats,
        deals: dealStats,
        contacts: {
          total: contactsData.contacts.length,
          active: contactsData.contacts.filter(c => c.status === 'active').length
        },
        lastUpdated: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Error getting CRM analytics:', error)
    return { success: false, error: error.message }
  }
}

// Activity Tracking
export const addActivity = (entityType, entityId, activity) => {
  try {
    initializeCRMData()
    
    const activityData = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...activity,
      timestamp: new Date().toISOString()
    }
    
    let filePath, dataKey
    switch (entityType) {
      case 'lead':
        filePath = LEADS_FILE
        dataKey = 'leads'
        break
      case 'deal':
        filePath = DEALS_FILE
        dataKey = 'deals'
        break
      case 'contact':
        filePath = CONTACTS_FILE
        dataKey = 'contacts'
        break
      default:
        return { success: false, error: 'Invalid entity type' }
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const entityIndex = data[dataKey].findIndex(item => item.id === entityId)
    
    if (entityIndex === -1) {
      return { success: false, error: 'Entity not found' }
    }
    
    if (!data[dataKey][entityIndex].activities) {
      data[dataKey][entityIndex].activities = []
    }
    
    data[dataKey][entityIndex].activities.push(activityData)
    data.lastUpdated = new Date().toISOString()
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    
    return { success: true, activity: activityData }
  } catch (error) {
    console.error('Error adding activity:', error)
    return { success: false, error: error.message }
  }
}

// Export all functions
export default {
  createLead,
  getLeads,
  updateLead,
  createDeal,
  getDeals,
  createContact,
  getCRMAnalytics,
  addActivity
}
