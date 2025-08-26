import Head from 'next/head'
import BackButton from '../components/BackButton'

export default function About() {
  return (
    <div>
      <BackButton variant="floating" />
      <Head>
        <title>ABOUT THE GODDESSES | LHAMO - Brutal Marketing Army</title>
        <meta name="description" content="Meet the divine marketing goddesses of LHAMO. Discover our brutal story of transforming brands through mystical creativity and savage precision." />
      </Head>

      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold">ABOUT LHAMO</h1>
      </div>
    </div>
  )
}