/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Ignore grpc-web and other problematic dependencies on the server
    if (isServer) {
      config.externals.push({
        '@improbable-eng/grpc-web': 'commonjs @improbable-eng/grpc-web',
        '@onflow/fcl': 'commonjs @onflow/fcl',
      })
    }
    
    // Add fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      path: false,
      os: false,
    }

    return config
  },
}

export default nextConfig
