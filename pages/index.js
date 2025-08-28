import SEOHead from '../components/SEOHead'
import SimpleNavbar from '../components/SimpleNavbar'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Footer from '../components/Footer'
import QuickNavigation from '../components/QuickNavigation'

export default function Home() {
  return (
    <>
      <SEOHead 
        title="LHAMO - Brutal Marketing Warfare | Competition Ends Here"
        description="Where mystical creativity meets cutting-edge technology. Transform your brand into a legend."
        image="/logo.png"
        url="https://lhamo.agency"
      />
      
      <div className="min-h-screen flex flex-col bg-yellow-300">
        <SimpleNavbar />
        <main className="flex-1">
          <HeroSection />
          <Services />
        </main>
        <Footer />
        <QuickNavigation />
      </div>
    </>
  )
}


