import SEOHead from '../components/SEOHead'
import SimpleNavbar from '../components/SimpleNavbar'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <SEOHead 
        title="LHAMO - Brutal Marketing Warfare | Competition Ends Here"
        description="Where mystical creativity meets cutting-edge technology. Transform your brand into a legend."
        image="/logo.png"
        url="https://lhamo.agency"
      />
      
      <div className="min-h-screen flex flex-col bg-yellow-300 relative">
        {/* Page Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-1 bg-red-600 z-50"></div>
        <div className="fixed top-0 right-0 w-1 h-full bg-black z-50"></div>
        <div className="fixed bottom-0 left-0 w-full h-1 bg-red-600 z-50"></div>
        <div className="fixed top-0 left-0 w-1 h-full bg-black z-50"></div>
        
        <SimpleNavbar />
        <main className="flex-1">
          <HeroSection />
          <Services />
        </main>
        <Footer />
      </div>
    </>
  )
}


