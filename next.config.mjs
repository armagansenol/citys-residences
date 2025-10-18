/** @type {import('next').NextConfig} */

import createMDX from "@next/mdx"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.citysresidences.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "citys-istanbul.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "crm.citysresidences.com",
        pathname: "**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for Wistia player vendor chunks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Handle Wistia player vendor chunks properly
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          wistia: {
            test: /[\\/]node_modules[\\/]@wistia[\\/]/,
            name: "wistia",
            chunks: "all",
            priority: 10,
          },
        },
      },
    }

    return config
  },
}

export default withNextIntl(withMDX(nextConfig))
