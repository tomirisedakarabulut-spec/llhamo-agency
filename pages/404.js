import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'
import { FloatingBackButton } from '../components/BackButton'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Sayfa Bulunamadı | LHAMO Agency</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı. LHAMO Agency ana sayfasına dönün veya diğer hizmetlerimizi keşfedin." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-yellow-300 flex items-center justify-center px-4">
        <FloatingBackButton />
        <div className="max-w-2xl mx-auto text-center">
          {/* Neo Brutalist 404 Design */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Large 404 Number */}
              <div className="text-9xl md:text-[12rem] font-black text-red-600 border-8 border-black shadow-[12px_12px_0px_0px_#000] transform rotate-2 mb-8">
                404
              </div>
              
              {/* Warning Icon */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-black border-4 border-black shadow-[4px_4px_0px_0px_#DC2626] flex items-center justify-center transform -rotate-12">
                <AlertTriangle className="w-8 h-8 text-yellow-300" />
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              SAYFA
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                BULUNAMADI
              </span>
            </h1>
            
            <p className="text-xl font-bold text-black mb-6 max-w-lg mx-auto">
              Aradığınız sayfa bu evrende yok! Belki başka bir galakside kaybolmuştur.
            </p>
          </motion.div>

          {/* Navigation Options */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Main Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-black text-white px-8 py-4 font-bold border-4 border-black shadow-[8px_8px_0px_0px_#DC2626] hover:shadow-[4px_4px_0px_0px_#DC2626] transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span>ANA SAYFA</span>
                </motion.button>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 font-bold border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>GERİ DÖN</span>
              </button>
            </div>

            {/* Popular Pages */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6">
              <h3 className="text-xl font-black text-black mb-4">POPÜLER SAYFALAR</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: '/services', label: 'HİZMETLER' },
                  { href: '/portfolio', label: 'PORTFOLYO' },
                  { href: '/about', label: 'HAKKIMIZDA' },
                  { href: '/contact', label: 'İLETİŞİM' }
                ].map((page) => (
                  <Link key={page.href} href={page.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-yellow-300 text-black px-4 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all duration-200"
                    >
                      {page.label}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="bg-red-600 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Search className="w-6 h-6 text-white" />
                <h3 className="text-xl font-black text-white">ARAMA YAPIN</h3>
              </div>
              <p className="text-white font-bold mb-4">
                Aradığınız içeriği bulamadıysanız, sitemizde arama yapabilirsiniz.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ne arıyorsunuz?"
                  className="flex-1 px-4 py-2 border-2 border-black font-bold placeholder-black"
                />
                <button className="bg-black text-white px-6 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all duration-200">
                  ARA
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#DC2626] p-6"
          >
            <h3 className="text-xl font-black mb-2">YARDIMA MI İHTİYACINIZ VAR?</h3>
            <p className="font-bold mb-4">
              Eğer bu bir hata olduğunu düşünüyorsanız, bizimle iletişime geçin.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-6 py-3 font-bold border-2 border-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all duration-200"
              >
                İLETİŞİME GEÇ
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}
