/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable all problematic features
  reactStrictMode: false,
  
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  
  // Disable webpack optimizations
  webpack: (config) => {
    // Disable HMR completely
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'HotModuleReplacementPlugin';
    });
    
    // Disable source maps
    config.devtool = false;
    
    return config;
  },
  
  // Disable compression
  compress: false,
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Disable etags
  generateEtags: false,
}

export default nextConfig