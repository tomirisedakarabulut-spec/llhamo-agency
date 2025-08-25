import Image from 'next/image'

export default function Logo({ 
  size = 'md', 
  className = ''
}) {
  const sizeConfig = {
    xs: { width: 32, height: 32 },
    sm: { width: 48, height: 48 },
    md: { width: 64, height: 64 },
    lg: { width: 96, height: 96 },
    xl: { width: 128, height: 128 }
  }

  const config = sizeConfig[size]

  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.png"
        alt="LHAMO Agency Logo"
        width={config.width}
        height={config.height}
        className="object-contain"
        priority={size === 'lg' || size === 'xl'}
      />
    </div>
  )
}

// Preset configurations for different contexts
export const NavbarLogo = (props) => (
  <Logo size="md" className="cursor-pointer" {...props} />
)

export const FooterLogo = (props) => (
  <Logo size="md" className="cursor-pointer" {...props} />
)

export const HeroLogo = (props) => (
  <Logo size="lg" className="cursor-pointer" {...props} />
)
