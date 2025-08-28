import { motion } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import SimpleNavbar from '../components/SimpleNavbar'
import CRMDashboard from '../components/CRMDashboard'

export default function CRM() {
  return (
    <>
      <SEOHead 
        title="CRM WARFARE | LHAMO - Brutal Customer Management"
        description="Manage your leads, deals, and customer relationships with LHAMO's brutal CRM system. Track conversions, analyze performance, and dominate your market."
        image="/logo.png"
        url="https://lhamo.agency/crm"
      />
      
      <div className="min-h-screen bg-yellow-300">
        <SimpleNavbar />
        <main className="pt-20">
          <CRMDashboard />
        </main>
      </div>
    </>
  )
}
