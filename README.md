# 🔥 LHAMO Agency - Brutal Marketing Goddesses

## 💀 Neo Brutalist Digital Marketing Website

A divine digital marketing agency website built with **Neo Brutalism** design philosophy, featuring brutal creativity and mystical power.

### ⚡ Quick Start

```bash
# Stable startup (RECOMMENDED - No Fast Refresh issues)
./start-stable.sh

# Quick start (alternative)
./quick-start.sh

# Manual start
npm install
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy with brutal script
./deploy.sh
```

### 🚀 **STABLE STARTUP (RECOMMENDED)**

To avoid Fast Refresh and JSX runtime errors, use the stable startup script:

```bash
./start-stable.sh
```

This script:
- ✅ Kills existing processes
- ✅ Cleans all cache
- ✅ Builds in production mode
- ✅ Starts in production mode
- ✅ Prevents all Fast Refresh issues

### 🚀 Deployment Options

#### 1. Local Network Access (Recommended)
```bash
# Deploy and make accessible from any device
./deploy.sh

# Get network access information
./network-info.sh
```

#### 2. Manual Production
```bash
# Build and start
npm run production
```

#### 3. Development Mode
```bash
# Development with hot reload
npm run dev
```

### 📱 Multi-Device Access

After running `./deploy.sh`, your site will be accessible from:

- **Desktop**: `http://localhost:3000`
- **Mobile/Tablet**: `http://YOUR_LOCAL_IP:3000`
- **Any device on your network**: Use the IP shown by `./network-info.sh`

### 🎨 Features

#### Neo Brutalist Design
- **Bold typography** with Space Grotesk font
- **Thick black borders** (4px) everywhere
- **Offset shadows** for 3D depth effect
- **High contrast colors**: Yellow, Red, Black, White
- **Geometric shapes** and brutal layouts

#### Responsive & Performance
- **Mobile-first** responsive design
- **PWA support** with service worker
- **Optimized builds** with Next.js
- **Fast loading** with static generation
- **Network resilience** with offline caching

#### Pages & Sections
- **Home** - Hero with mandala logo + Services preview
- **About** - Brand story + Team + Values
- **Services** - Brutal service cards with pricing
- **Portfolio** - Case studies with hover effects
- **Blog** - Marketing insights and articles
- **Careers** - Job openings with company culture
- **Contact** - Brutal contact form + methods

#### Interactive Elements
- **Neo Brutalist Mandala Logo** - Sacred geometric symbol
- **Hover animations** - Scale, rotate, translate effects
- **Smooth transitions** - Framer Motion animations
- **Interactive cards** - Shadow and transform effects

### 🛠 Tech Stack

- **Framework**: Next.js 15.5.0
- **Styling**: TailwindCSS 4.1.12
- **Animations**: Framer Motion 12.23.12
- **Icons**: Lucide React 0.541.0
- **Themes**: Next-themes 0.4.6
- **PWA**: Custom Service Worker
- **Performance**: Optimized builds and caching

### 🔧 Scripts

```bash
npm run dev          # Development server (production mode)
npm run build        # Production build
npm run start        # Production server
npm run production   # Build + Start
npm run lint         # Code linting
npm run clean        # Clean caches
./start-stable.sh    # Stable startup (RECOMMENDED)
./deploy.sh          # Brutal deployment
./network-info.sh    # Network access info
```

### 🌐 Network Configuration

The site automatically configures for:
- **Local access** via localhost
- **Network access** via local IP
- **Mobile testing** on same Wi-Fi
- **Cross-device compatibility**

### 📂 Project Structure

```
Lhamo/
├── components/          # React components
│   ├── MandalaLogo.js  # Neo brutalist mandala
│   ├── Navbar.js       # Navigation with dropdowns
│   ├── Footer.js       # Footer with newsletter
│   ├── HeroSection.js  # Main hero section
│   └── Services.js     # Service cards
├── pages/              # Next.js pages
│   ├── _app.js         # App wrapper with SW
│   ├── _document.js    # HTML document
│   ├── index.js        # Home page
│   ├── about.js        # About page
│   ├── services.js     # Services page
│   ├── portfolio.js    # Portfolio page
│   ├── blog.js         # Blog page
│   ├── careers.js      # Careers page
│   └── contact.js      # Contact page
├── styles/             # Styling
│   └── globals.css     # Global neo-brutalist styles
├── public/             # Static assets
│   ├── manifest.json   # PWA manifest
│   ├── sw.js          # Service worker
│   └── *.svg          # Icons and images
├── start-stable.sh    # Stable startup script
├── deploy.sh          # Deployment script
├── network-info.sh    # Network info script
└── next.config.mjs    # Next.js configuration
```

### 🎯 Performance Features

- **Static Generation** - Pre-rendered pages
- **Code Splitting** - Optimized bundles
- **Image Optimization** - WebP/AVIF support
- **Caching Strategy** - Service worker caching
- **Compression** - Gzip/Brotli compression
- **Security Headers** - XSS, CSRF protection

### 🔒 Security

- **CSP Headers** - Content Security Policy
- **XSS Protection** - Cross-site scripting prevention
- **Frame Protection** - Clickjacking prevention
- **HTTPS Ready** - SSL/TLS compatible
- **Local Network Only** - No external exposure

### 📱 PWA Features

- **Installable** - Add to home screen
- **Offline Support** - Service worker caching
- **App-like Experience** - Standalone mode
- **Fast Loading** - Cached resources
- **Push Notifications** - Ready for future

### 🎨 Brand Identity

- **Name**: LHAMO
- **Tagline**: GODDESS.COGO
- **Personality**: Bold, Mystical, Feminine Power, Innovative, Premium
- **Colors**: Black, Crimson Red, Golden Yellow, White
- **Typography**: Space Grotesk (headings), Inter (body)
- **Symbol**: Neo Brutalist Mandala (sacred geometry)

### 🚀 Deployment Notes

1. **Stable Startup**: `./start-stable.sh` - Recommended for error-free operation
2. **Production**: `./deploy.sh` - Optimized build with network access
3. **Testing**: Use `./network-info.sh` to get access URLs
4. **Mobile**: Same Wi-Fi network required for mobile access

### 💀 Brutal Philosophy

This website embodies **Neo Brutalism** - a design movement that:
- Embraces **raw, unfinished aesthetics**
- Uses **bold, contrasting elements**
- Prioritizes **function over decoration**
- Creates **memorable, impactful experiences**
- Challenges **conventional design norms**

### ⚠️ **ERROR PREVENTION**

To prevent Fast Refresh and JSX runtime errors:

1. **Always use stable startup**: `./start-stable.sh`
2. **Production mode**: All scripts run in production mode
3. **Cache cleaning**: Automatic cache cleaning in startup script
4. **React.createElement**: Used instead of JSX in critical files
5. **HMR disabled**: Hot Module Replacement completely disabled

### 🔧 **TROUBLESHOOTING**

If you encounter any errors:

1. **Stop all processes**: `pkill -f "next"`
2. **Clean cache**: `npm run clean`
3. **Use stable startup**: `./start-stable.sh`
4. **Check logs**: Look for specific error messages
5. **Rebuild**: `npm run build && npm run start`

---

**LHAMO Agency** - Where mystical creativity meets cutting-edge technology. Transform your brand into a legend.
