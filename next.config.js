/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  webpack: (config, { isServer, dev }) => {
    // Fix for Next.js 14.2.x
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };

    // Optimize bundle splitting for production
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          
          // Framework chunks
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          
          // 3D libraries
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three|postprocessing)[\\/]/,
            name: 'three',
            priority: 30,
            reuseExistingChunk: true,
          },
          
          // Animation libraries
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: 'gsap',
            priority: 25,
            reuseExistingChunk: true,
          },
          
          // UI libraries
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer',
            priority: 20,
            reuseExistingChunk: true,
          },
          
          // Commons chunk
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ]
      }
    ];
  },
  
  // Compression
  compress: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
};

module.exports = nextConfig;
