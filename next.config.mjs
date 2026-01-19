/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // This tells Next.js to not bundle this package, 
    // keeping the binary file intact on Vercel.
    serverComponentsExternalPackages: ['better-sqlite3'], 
  },
}

export default nextConfig