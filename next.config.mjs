/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  // For static export (GitHub Pages)
  // output: 'export',
  // basePath: '/home',

  // Handle sql.js for client-side usage
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // sql.js needs these Node modules stubbed for browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  },

  // Transpile the local @hanzo/stats package
  transpilePackages: ['@hanzo/stats'],
}

export default nextConfig
