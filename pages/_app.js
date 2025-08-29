import React from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  
  // Don't show navbar on admin pages
  const isAdminPage = router.pathname.startsWith('/admin')
  
  return (
    <>
      {!isAdminPage && <Navbar />}
      <Component {...pageProps} />
    </>
  )
}