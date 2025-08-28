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
        <div className="fixed top-0 left-0 w-full h-2 bg-red-600 z-50 shadow-[0px_4px_0px_0px_#000]"></div>
        <div className="fixed top-0 right-0 w-2 h-full bg-black z-50 shadow-[-4px_0px_0px_0px_#000]"></div>
        <div className="fixed bottom-0 left-0 w-full h-2 bg-red-600 z-50 shadow-[0px_-4px_0px_0px_#000]"></div>
        <div className="fixed top-0 left-0 w-2 h-full bg-black z-50 shadow-[4px_0px_0px_0px_#000]"></div>
        
        {/* Corner Accents */}
        <div className="fixed top-0 left-0 w-8 h-8 bg-red-600 z-50 border-b-2 border-r-2 border-black"></div>
        <div className="fixed top-0 right-0 w-8 h-8 bg-black z-50 border-b-2 border-l-2 border-red-600"></div>
        <div className="fixed bottom-0 left-0 w-8 h-8 bg-black z-50 border-t-2 border-r-2 border-red-600"></div>
        <div className="fixed bottom-0 right-0 w-8 h-8 bg-red-600 z-50 border-t-2 border-l-2 border-black"></div>
        
        {/* Diagonal Corner Lines */}
        <div className="fixed top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-red-600 z-40"></div>
        <div className="fixed top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-black z-40"></div>
        <div className="fixed bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-black z-40"></div>
        <div className="fixed bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-red-600 z-40"></div>
        
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


