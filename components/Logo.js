export default function Logo({ 
  size = 'md', 
  className = '',
  variant = 'png'
}) {
  const sizeConfig = {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 }
  }

  const config = sizeConfig[size]

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: config.width, height: config.height }}
    >
      <img
        src="/logo.png"
        alt="LHAMO Logo"
        width={config.width}
        height={config.height}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
