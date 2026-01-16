/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Next.js automatically supports src/pages directory
  // No additional configuration needed for Pages Router in src/
  experimental: {
    outputFileTracingExcludes: {
      '/admin/*': ['**/*'],
    },
  },
  output: 'export',
  basePath: 'Illustre13.github.io/my-brand-new',
}

export default nextConfig;
