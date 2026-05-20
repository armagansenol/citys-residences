import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { routing } from '@/i18n/routing'
import { isStandHost } from '@/lib/variant'

export default function sitemap(): MetadataRoute.Sitemap {
  // Don't expose a sitemap on the stand subdomain.
  if (isStandHost(headers().get('host'))) {
    return []
  }

  const baseUrl = 'https://citysresidences.com' // Update this to your actual domain
  const locales = routing.locales
  const pathnames = routing.pathnames

  const sitemap: MetadataRoute.Sitemap = []

  // Add routes for each locale
  for (const locale of locales) {
    // Add homepage
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    })

    // Add City's DNA page
    sitemap.push({
      url: `${baseUrl}/${locale}/citys-dna`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    // Add localized pathnames
    Object.entries(pathnames).forEach(([key, value]) => {
      if (key === '/') return // Skip homepage as it's already added

      let localizedPath: string
      if (typeof value === 'string') {
        localizedPath = value
      } else {
        // Get the localized path for the current locale
        localizedPath = value[locale as keyof typeof value] || key
      }

      sitemap.push({
        url: `${baseUrl}/${locale}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    })
  }

  return sitemap
}
