#!/usr/bin/env node

// LHAMO CRM Data Seeder - Brutal Test Data Generator
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const leadsFile = path.join(dataDir, 'leads.json')
const dealsFile = path.join(dataDir, 'deals.json')
const contactsFile = path.join(dataDir, 'contacts.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Sample data
const sampleLeads = [
  {
    id: 'lead_1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@techstartup.com',
    company: 'TechStartup Inc.',
    phone: '+90 555 123 4567',
    message: 'We need a brutal rebranding campaign for our startup. Looking for something that will make us stand out in the crowded tech market.',
    source: 'contact_form',
    status: 'new',
    score: 85,
    tags: ['startup', 'tech', 'rebranding'],
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
    activities: []
  },
  {
    id: 'lead_2',
    name: 'Zeynep Kaya',
    email: 'zeynep@fashionbrand.com',
    company: 'FashionBrand Co.',
    phone: '+90 555 987 6543',
    message: 'Our fashion brand needs a savage social media presence. We want to dominate Instagram and TikTok with brutal content.',
    source: 'website',
    status: 'contacted',
    score: 92,
    tags: ['fashion', 'social_media', 'instagram'],
    createdAt: '2024-01-14T14:20:00.000Z',
    updatedAt: '2024-01-15T09:15:00.000Z',
    activities: [
      {
        id: 'activity_1',
        type: 'email',
        description: 'Initial contact email sent',
        timestamp: '2024-01-15T09:15:00.000Z'
      }
    ]
  },
  {
    id: 'lead_3',
    name: 'Mehmet Demir',
    email: 'mehmet@restaurant.com',
    company: 'Savage Restaurant',
    phone: '+90 555 456 7890',
    message: 'We are opening a new restaurant and need a complete marketing strategy. From branding to digital advertising.',
    source: 'referral',
    status: 'qualified',
    score: 78,
    tags: ['restaurant', 'branding', 'digital_ads'],
    createdAt: '2024-01-13T16:45:00.000Z',
    updatedAt: '2024-01-15T11:30:00.000Z',
    activities: [
      {
        id: 'activity_2',
        type: 'call',
        description: 'Qualification call completed',
        timestamp: '2024-01-15T11:30:00.000Z'
      }
    ]
  },
  {
    id: 'lead_4',
    name: 'Ayşe Özkan',
    email: 'ayse@consulting.com',
    company: 'Strategic Consulting',
    phone: '+90 555 321 6547',
    message: 'Looking for AI-powered marketing solutions for our consulting firm. We want to automate our lead generation.',
    source: 'linkedin',
    status: 'new',
    score: 88,
    tags: ['consulting', 'ai', 'automation'],
    createdAt: '2024-01-16T08:20:00.000Z',
    updatedAt: '2024-01-16T08:20:00.000Z',
    activities: []
  },
  {
    id: 'lead_5',
    name: 'Can Arslan',
    email: 'can@ecommerce.com',
    company: 'E-Commerce Empire',
    phone: '+90 555 789 1234',
    message: 'Our e-commerce platform needs a complete marketing overhaul. We want to increase conversions and dominate our niche.',
    source: 'contact_form',
    status: 'contacted',
    score: 95,
    tags: ['ecommerce', 'conversion', 'marketing'],
    createdAt: '2024-01-15T13:10:00.000Z',
    updatedAt: '2024-01-16T10:45:00.000Z',
    activities: [
      {
        id: 'activity_3',
        type: 'meeting',
        description: 'Discovery meeting scheduled',
        timestamp: '2024-01-16T10:45:00.000Z'
      }
    ]
  }
]

const sampleDeals = [
  {
    id: 'deal_1',
    name: 'TechStartup Rebranding',
    company: 'TechStartup Inc.',
    value: 25000,
    stage: 'proposal',
    probability: 75,
    owner: 'LHAMO TEAM',
    description: 'Complete rebranding campaign including logo design, brand guidelines, and marketing materials.',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-16T14:20:00.000Z',
    activities: [
      {
        id: 'activity_4',
        type: 'proposal',
        description: 'Proposal sent to client',
        timestamp: '2024-01-16T14:20:00.000Z'
      }
    ],
    notes: []
  },
  {
    id: 'deal_2',
    name: 'FashionBrand Social Media',
    company: 'FashionBrand Co.',
    value: 18000,
    stage: 'negotiation',
    probability: 90,
    owner: 'LHAMO TEAM',
    description: 'Social media management and content creation for Instagram and TikTok.',
    createdAt: '2024-01-14T14:20:00.000Z',
    updatedAt: '2024-01-16T16:30:00.000Z',
    activities: [
      {
        id: 'activity_5',
        type: 'negotiation',
        description: 'Contract negotiation in progress',
        timestamp: '2024-01-16T16:30:00.000Z'
      }
    ],
    notes: []
  },
  {
    id: 'deal_3',
    name: 'Savage Restaurant Launch',
    company: 'Savage Restaurant',
    value: 35000,
    stage: 'qualification',
    probability: 60,
    owner: 'LHAMO TEAM',
    description: 'Complete marketing strategy for restaurant launch including branding, digital ads, and PR.',
    createdAt: '2024-01-13T16:45:00.000Z',
    updatedAt: '2024-01-15T11:30:00.000Z',
    activities: [
      {
        id: 'activity_6',
        type: 'qualification',
        description: 'Requirements gathering completed',
        timestamp: '2024-01-15T11:30:00.000Z'
      }
    ],
    notes: []
  },
  {
    id: 'deal_4',
    name: 'E-Commerce Marketing Overhaul',
    company: 'E-Commerce Empire',
    value: 42000,
    stage: 'prospecting',
    probability: 40,
    owner: 'LHAMO TEAM',
    description: 'Complete marketing overhaul including conversion optimization, email marketing, and retargeting campaigns.',
    createdAt: '2024-01-15T13:10:00.000Z',
    updatedAt: '2024-01-16T10:45:00.000Z',
    activities: [
      {
        id: 'activity_7',
        type: 'discovery',
        description: 'Discovery meeting completed',
        timestamp: '2024-01-16T10:45:00.000Z'
      }
    ],
    notes: []
  }
]

const sampleContacts = [
  {
    id: 'contact_1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@techstartup.com',
    company: 'TechStartup Inc.',
    phone: '+90 555 123 4567',
    position: 'CEO',
    status: 'active',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
    interactions: [],
    notes: []
  },
  {
    id: 'contact_2',
    name: 'Zeynep Kaya',
    email: 'zeynep@fashionbrand.com',
    company: 'FashionBrand Co.',
    phone: '+90 555 987 6543',
    position: 'Marketing Director',
    status: 'active',
    createdAt: '2024-01-14T14:20:00.000Z',
    updatedAt: '2024-01-15T09:15:00.000Z',
    interactions: [
      {
        id: 'interaction_1',
        type: 'email',
        description: 'Initial contact email sent',
        timestamp: '2024-01-15T09:15:00.000Z'
      }
    ],
    notes: []
  }
]

// Write data files
const leadsData = {
  leads: sampleLeads,
  lastUpdated: new Date().toISOString()
}

const dealsData = {
  deals: sampleDeals,
  lastUpdated: new Date().toISOString()
}

const contactsData = {
  contacts: sampleContacts,
  lastUpdated: new Date().toISOString()
}

try {
  fs.writeFileSync(leadsFile, JSON.stringify(leadsData, null, 2))
  fs.writeFileSync(dealsFile, JSON.stringify(dealsData, null, 2))
  fs.writeFileSync(contactsFile, JSON.stringify(contactsData, null, 2))
  
  console.log('🔥 LHAMO CRM Data Seeded Successfully!')
  console.log('📊 Sample Data Created:')
  console.log(`   - ${sampleLeads.length} Leads`)
  console.log(`   - ${sampleDeals.length} Deals`)
  console.log(`   - ${sampleContacts.length} Contacts`)
  console.log('')
  console.log('🚀 You can now test the CRM system at:')
  console.log('   - Public CRM: /crm')
  console.log('   - Admin CRM: /admin/crm')
  console.log('')
  console.log('💀 BRUTAL CRM WARFARE IS READY!')
} catch (error) {
  console.error('❌ Error seeding CRM data:', error)
  process.exit(1)
}
