/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Disable image optimization if using external images
  images: {
    unoptimized: true,
  },
  
  // Exclude old React code from compilation
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/src/**', '**/nextjs/**', '**/dist/**', '**/node_modules/**'],
    };
    return config;
  },
  
  // Note: Environment variables should be prefixed with NEXT_PUBLIC_ to be available in browser
  // They should be set in .env.local file, not here
}

module.exports = nextConfig

