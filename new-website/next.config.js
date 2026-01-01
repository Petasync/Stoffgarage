/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['stoffgarage.de'],
    formats: ['image/avif', 'image/webp'],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Static export für deployment auf eigenem Server
  output: 'export',

  // SEO
  generateEtags: true,
}

module.exports = nextConfig
