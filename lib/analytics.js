// Analytics configuration
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export function initGA() {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      'custom_dimension1': 'user_type',
      'custom_dimension2': 'page_category'
    }
  })

  window.gtag = gtag
}

// Track page views
export function trackPageView(url, title) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title
  })
}

// Track custom events
export function trackEvent(action, category, label, value) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

// Track form submissions
export function trackFormSubmission(formName, success = true) {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'form_interaction',
    formName
  )
}

// Track button clicks
export function trackButtonClick(buttonName, location) {
  trackEvent('button_click', 'user_interaction', buttonName, 1)
}

// Track navigation
export function trackNavigation(from, to) {
  trackEvent('navigation', 'user_journey', `${from} -> ${to}`)
}

// Track scroll depth
export function trackScrollDepth(depth) {
  trackEvent('scroll_depth', 'engagement', `${depth}%`)
}

// Track time on page
export function trackTimeOnPage(timeSpent) {
  trackEvent('time_on_page', 'engagement', 'seconds', Math.round(timeSpent / 1000))
}

// Track performance metrics
export function trackPerformance(metric) {
  trackEvent('performance', 'web_vitals', metric.name, Math.round(metric.value))
}

// Track user engagement
export function trackEngagement(type, details) {
  trackEvent('engagement', 'user_behavior', type, 1)
}

// Custom analytics for LHAMO
export const LHAMOAnalytics = {
  // Track service interest
  trackServiceInterest: (serviceName) => {
    trackEvent('service_interest', 'business', serviceName)
  },

  // Track portfolio view
  trackPortfolioView: (projectName) => {
    trackEvent('portfolio_view', 'business', projectName)
  },

  // Track contact attempt
  trackContactAttempt: (method) => {
    trackEvent('contact_attempt', 'business', method)
  },

  // Track admin actions
  trackAdminAction: (action, details) => {
    trackEvent('admin_action', 'administration', action, 1)
  },

  // Track blog engagement
  trackBlogEngagement: (action, postTitle) => {
    trackEvent('blog_engagement', 'content', action, 1)
  }
}

// Performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        trackPerformance(entry)
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
  }

  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now()
    trackTimeOnPage(loadTime)
  })
}

// Scroll tracking
export function initScrollTracking() {
  if (typeof window === 'undefined') return

  let maxScroll = 0
  let scrollTracked = false

  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      
      // Track at 25%, 50%, 75%, 100%
      if (!scrollTracked && maxScroll >= 25) {
        trackScrollDepth(25)
        scrollTracked = true
      } else if (maxScroll >= 50) {
        trackScrollDepth(50)
      } else if (maxScroll >= 75) {
        trackScrollDepth(75)
      } else if (maxScroll >= 100) {
        trackScrollDepth(100)
      }
    }
  })
}

// Error tracking
export function trackError(error, context = {}) {
  trackEvent('error', 'application', error.message, 1)
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Analytics Error:', error, context)
  }
}

// User identification
export function identifyUser(userId, traits = {}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_TRACKING_ID, {
    user_id: userId,
    custom_map: {
      'custom_dimension1': 'user_type',
      'custom_dimension2': 'user_segment'
    }
  })
}

// E-commerce tracking
export function trackPurchase(orderId, value, currency = 'USD') {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'purchase', {
    transaction_id: orderId,
    value: value,
    currency: currency
  })
}

// Initialize all analytics
export function initAnalytics() {
  initGA()
  initPerformanceMonitoring()
  initScrollTracking()
  
  // Track initial page view
  if (typeof window !== 'undefined') {
    trackPageView(window.location.pathname, document.title)
  }
}
