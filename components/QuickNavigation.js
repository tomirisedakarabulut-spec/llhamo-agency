import { motion } from 'framer-motion'
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export default function QuickNavigation() {
  
  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://instagram.com/lhamo.agency', 
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
      brandColor: '#E4405F'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: 'https://twitter.com/lhamoagency', 
      color: 'bg-blue-400',
      brandColor: '#1DA1F2'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/lhamo-agency', 
      color: 'bg-blue-600',
      brandColor: '#0A66C2'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      href: 'https://youtube.com/@lhamoagency', 
      color: 'bg-red-600',
      brandColor: '#FF0000'
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'info@lhamo.agency',
      href: 'mailto:info@lhamo.agency'
    },
    {
      icon: Phone,
      label: 'PHONE',
      value: '+90 212 555 0123',
      href: 'tel:+902125550123'
    },
    {
      icon: MapPin,
      label: 'LOCATION',
      value: 'Istanbul, Turkey',
      href: '#'
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col space-y-3">
        {/* Social Media Buttons */}
        <div className="flex flex-col space-y-2 items-end">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.1, 
                  x: 5,
                  boxShadow: `0 8px 0px 0px ${social.brandColor}`
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
                className={`w-12 h-12 ${social.color} border-4 border-white shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 flex items-center justify-center group cursor-pointer`}
                aria-label={social.name}
              >
                <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
              </motion.a>
            )
          })}
        </div>

        {/* Contact Info */}
        <div className="bg-black border-4 border-white shadow-[6px_6px_0px_0px_#000] p-4 transform -rotate-1">
          <h3 className="text-white font-black text-sm mb-3 text-center">QUICK CONTACT</h3>
          <div className="space-y-2">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  whileHover={{ x: 2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.5 + index * 0.1 
                  }}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <div className="text-xs">
                    <div className="font-bold">{contact.label}</div>
                    <div className="text-gray-300">{contact.value}</div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
