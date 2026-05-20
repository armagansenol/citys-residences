import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { isStandHost } from '@/lib/variant'

export default function robots(): MetadataRoute.Robots {
  const host = headers().get('host')

  if (isStandHost(host)) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://citysresidences.com/sitemap.xml',
  }
}
