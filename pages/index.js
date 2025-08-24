import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

export default function Home() {
  return (
    <>
      <Head>
        <title>LHAMO - Divine Digital Marketing Agency | GODDESS.COGO</title>
        <meta name="description" content="Unleash your brand's divine power with LHAMO. Premium digital marketing agency specializing in creative campaigns, AI-powered marketing, and mystical brand transformation." />
        <meta name="keywords" content="digital marketing, creative agency, branding, AI marketing, video production, social media, advertising, Türkiye, İstanbul" />
        <meta name="author" content="LHAMO Agency" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lhamo.agency" />
        <meta property="og:title" content="LHAMO - Divine Digital Marketing Agency" />
        <meta property="og:description" content="Where mystical creativity meets cutting-edge technology. Transform your brand into a legend." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="LHAMO Agency" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://lhamo.agency" />
        <meta name="twitter:title" content="LHAMO - Divine Digital Marketing Agency" />
        <meta name="twitter:description" content="Unleash your brand's divine power with premium digital marketing solutions." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:creator" content="@lhamoagency" />
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://lhamo.agency" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/logo-mandala.svg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LHAMO Agency",
              "url": "https://lhamo.agency",
              "logo": "https://lhamo.agency/logo-mandala.svg",
              "description": "Divine Digital Marketing Agency specializing in creative campaigns and AI-powered marketing",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Istanbul",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@lhamo.agency"
              },
              "sameAs": [
                "https://twitter.com/lhamoagency",
                "https://linkedin.com/company/lhamo-agency"
              ]
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HeroSection />
            <Services />
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  )
}


