import Head from 'next/head'

export default function SEOHead({ 
  title = "LHAMO - Brutal Marketing Warfare",
  description = "Unleash your brand's brutal power with LHAMO. Premium digital marketing agency specializing in creative campaigns, AI-powered marketing, and legendary brand transformation.",
  image = "/logo.png",
  url = "https://lhamo.agency",
  type = "website"
}) {
  const fullUrl = url.startsWith('http') ? url : `https://lhamo.agency${url}`
  const fullImageUrl = image.startsWith('http') ? image : `https://lhamo.agency${image}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="digital marketing, creative agency, branding, AI marketing, video production, social media, advertising, Türkiye, İstanbul" />
      <meta name="author" content="LHAMO Agency" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:image:alt" content="LHAMO - Divine Digital Marketing Agency Logo" />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content="LHAMO Agency" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@lhamoagency" />
      <meta name="twitter:site" content="@lhamoagency" />
      
      {/* Additional SEO */}
      <link rel="canonical" href={fullUrl} />
      <link rel="icon" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/logo.png" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LHAMO Agency",
            "url": "https://lhamo.agency",
            "logo": "https://lhamo.agency/logo.png",
            "description": "Brutal Digital Marketing Agency specializing in creative campaigns and AI-powered marketing",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Istanbul",
              "addressCountry": "TR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "hello@lhamo.agency"
            },
            "sameAs": [
              "https://twitter.com/lhamoagency",
              "https://linkedin.com/company/lhamo-agency"
            ]
          })
        }}
      />
    </Head>
  )
}
