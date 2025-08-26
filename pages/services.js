import { motion } from 'framer-motion'
import Head from 'next/head'
import { 
  Palette, 
  Target, 
  Crown, 
  Video, 
  Brain,
  TrendingUp,
  ArrowRight,
  Zap,
  CheckCircle,
  Star,
  ChevronUp,
  Sparkles,
  Rocket,
  Shield,
  Megaphone,
  BarChart3,
  Users,
  Globe,
  Smartphone,
  Camera,
  Cpu,
  LineChart,
  Eye,
  Heart,
  Award,
  Lightbulb,
  Settings,
  Database,
  Network
} from 'lucide-react'
import SimpleNavbar from '../components/SimpleNavbar'


const services = [
  {
    id: 'creative',
    title: 'CREATIVE CAMPAIGNS',
    description: 'WE SMASH BORING WITH BRUTAL CREATIVITY THAT MAKES YOUR BRAND LEGENDARY!',
    icon: Sparkles,
    features: ['BRAND STORYTELLING', 'VISUAL IDENTITY', 'CAMPAIGN STRATEGY', 'CONTENT CREATION'],
    price: '₺15,000',
    color: 'red'
  },
  {
    id: 'digital-ads',
    title: 'DIGITAL ADVERTISING',
    description: 'PRECISION STRIKES ACROSS ALL PLATFORMS WITH AI-POWERED DESTRUCTION!',
    icon: Rocket,
    features: ['GOOGLE ADS', 'META ADVERTISING', 'TIKTOK ADS', 'PERFORMANCE ANALYTICS'],
    price: '₺12,000',
    color: 'yellow'
  },
  {
    id: 'branding',
    title: 'BRAND IDENTITY',
    description: 'TRANSFORM YOUR BRAND INTO AN UNSTOPPABLE VISUAL FORCE!',
    icon: Crown,
    features: ['LOGO DESIGN', 'BRAND GUIDELINES', 'VISUAL SYSTEMS', 'BRAND STRATEGY'],
    price: '₺25,000',
    color: 'red'
  }
]

export default function Services() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-yellow-300">
      
      <Head>
        <title>BRUTAL SERVICES | LHAMO - Marketing Warfare Arsenal</title>
        <meta name="description" content="Discover LHAMO's brutal marketing services. From creative campaigns to AI-powered strategies, we destroy boring marketing with divine precision." />
      </Head>

      {/* Navigation */}
      <SimpleNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-8 bg-red-600 text-white px-4 py-2 border-2 border-black">
              <Zap className="w-5 h-5" />
              <span className="font-bold">BRUTAL SERVICES</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-black mb-8 leading-none tracking-tight">
              MARKETING
              <br />
              <span className="bg-red-600 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1">
                WARFARE
              </span>
              <br />
              ARSENAL
            </h1>
            
            <p className="text-xl font-bold text-black max-w-3xl mx-auto leading-tight">
              WE DON'T DO GENTLE MARKETING. WE CRUSH COMPETITION WITH BRUTAL CREATIVITY!
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="group relative">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-300">
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center mb-4 bg-red-600 text-white">
                    <service.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-black mb-4 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-black mb-6 font-bold">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-bold text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-black text-red-600">
                      {service.price}
                    </div>
                    <button className="bg-red-600 text-white border-2 border-black font-bold px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200">
                      START BRUTALITY
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            READY FOR
            <br />
            <span className="bg-yellow-300 text-black px-4 py-2 border-4 border-white shadow-[8px_8px_0px_0px_#DC2626] inline-block transform rotate-1">
              TOTAL DOMINATION?
            </span>
          </h2>
          
          <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
            LET'S CREATE A BRUTAL MARKETING STRATEGY THAT CRUSHES YOUR COMPETITION!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-300 text-black border-4 border-black font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200">
              START PROJECT
            </button>
            <button className="bg-white text-black border-4 border-black font-bold px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200">
              VIEW PORTFOLIO
            </button>
          </div>
        </div>
      </section>

      {/* Floating Menu Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 flex items-center justify-center"
      >
        <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </div>
  )
}