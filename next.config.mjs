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
}

export default withNextIntl(withMDX(nextConfig))
