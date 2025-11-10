/**
 * API Query Functions with ISR (Incremental Static Regeneration)
 *
 * This module implements Next.js 14 path-based ISR caching for all data fetching queries.
 * Each query uses the `next: { revalidate, tags }` option to enable efficient caching.
 *
 * CACHING STRATEGY:
 * ------------------
 * - Categories: 1 hour (3600s) - Rarely change
 * - SubCategories: 1 hour (3600s) - Rarely change
 * - Floors: 2 hours (7200s) - Very static data
 * - Brands: 30 minutes (1800s) - Change occasionally
 * - Events: 5 minutes (300s) - More dynamic content
 * - Citys Data (Park/Living/Members): 1 hour (3600s) - via helpers.ts
 *
 * CACHE TAGS:
 * -----------
 * Each query is tagged for fine-grained revalidation:
 * - General tags: 'categories', 'brands', 'events', etc.
 * - Language-specific: 'categories-tr', 'brands-en', etc.
 * - Parameter-specific: 'subcategories-<categoryId>', 'brands-category-<id>', etc.
 *
 * MANUAL REVALIDATION:
 * -------------------
 * Use revalidateTag() in Server Actions to invalidate specific cache entries:
 *
 * @example
 * import { revalidateTag } from 'next/cache'
 * revalidateTag('brands') // Invalidates all brand queries
 * revalidateTag('brands-tr') // Invalidates Turkish brand queries only
 * revalidateTag('events') // Invalidates all event queries
 *
 * For path-based revalidation:
 * @example
 * import { revalidatePath } from 'next/cache'
 * revalidatePath('/') // Revalidates entire app
 * revalidatePath('/[locale]', 'layout') // Revalidates specific layout
 */

import {
  BrandsResponse,
  Category,
  SubCategory,
  Floor,
  ApiResponse,
  ApiBrand,
  CitysTimesItem,
} from '@/types'
import { panelClient } from '../client'
import { buildQueryString } from './helpers'
export async function fetchCategories(
  lang: string = 'tr'
): Promise<ApiResponse<Category[]>> {
  const response = await panelClient.get<Category[]>(
    `/categories.php?${buildQueryString(lang)}`,
    {
      next: {
        revalidate: 3600, // Revalidate every hour (categories rarely change)
        tags: ['categories', `categories-${lang}`],
      },
    }
  )
  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch categories',
    }
  }
  return response
}

export async function fetchSubCategories(
  categoryId: string,
  lang: string = 'tr'
): Promise<ApiResponse<SubCategory[]>> {
  const response = await panelClient.get<SubCategory[]>(
    `/subCategories.php?${buildQueryString(lang, { categoryId })}`,
    {
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: [
          'subcategories',
          `subcategories-${lang}`,
          `subcategories-${categoryId}`,
        ],
      },
    }
  )
  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch subcategories',
    }
  }
  return response
}

export async function fetchFloors(
  lang: string = 'tr'
): Promise<ApiResponse<Floor[]>> {
  const response = await panelClient.get<Floor[]>(
    `/floors.php?${buildQueryString(lang)}`,
    {
      next: {
        revalidate: 7200, // Revalidate every 2 hours (floors are very static)
        tags: ['floors', `floors-${lang}`],
      },
    }
  )
  if (!response.success) {
    return { success: false, error: response.error || 'Failed to fetch floors' }
  }
  return response
}

export async function fetchBrands(
  lang: string = 'tr',
  filters?: {
    category?: string
    subCategory?: string
    floor?: string
    keyword?: string
  }
): Promise<ApiResponse<BrandsResponse>> {
  try {
    // Build query parameters
    const params: Record<string, string> = {}
    if (filters) {
      if (filters.category && filters.category !== 'all') {
        params.category = filters.category
      }
      if (filters.subCategory && filters.subCategory !== 'all') {
        params.subCategory = filters.subCategory
      }
      if (filters.floor && filters.floor !== 'all') {
        params.floor = filters.floor
      }
      if (filters.keyword) {
        params.keyword = filters.keyword
      }
    }

    // Build cache tags based on filters
    const tags = ['brands', `brands-${lang}`]
    if (filters?.category && filters.category !== 'all') {
      tags.push(`brands-category-${filters.category}`)
    }
    if (filters?.subCategory && filters.subCategory !== 'all') {
      tags.push(`brands-subcategory-${filters.subCategory}`)
    }
    if (filters?.floor && filters.floor !== 'all') {
      tags.push(`brands-floor-${filters.floor}`)
    }

    const response = await panelClient.get<ApiBrand[]>(
      `/brands.php?${buildQueryString(lang, params)}`,
      {
        next: {
          revalidate: 1800, // Revalidate every 30 minutes (brands change occasionally)
          tags,
        },
      }
    )

    if (!response.success || !response.data) {
      return {
        success: false,
        error: response.error || 'Failed to fetch brands',
      }
    }

    const responseData = response.data

    // Handle case when no brands are found (if API returns success: false)
    if (Array.isArray(responseData) && responseData.length === 0) {
      const emptyData: BrandsResponse = {
        items: [],
        categories: {},
        subCategories: {},
      }
      return { success: true, data: emptyData }
    }

    // Transform API data to match our expected structure
    const apiBrands: ApiBrand[] = responseData
    const items = apiBrands.map(brand => ({
      name: brand.title,
      category: brand.categoryID,
      subCategory: null, // API doesn't provide subcategory
      logo: brand.image,
      floor: (() => {
        const floorLower = brand.floor.toLowerCase()
        if (
          floorLower.includes('zemin') ||
          floorLower.includes('ground') ||
          floorLower.includes('0')
        ) {
          return 'ground'
        }
        return 'first'
      })(),
    }))

    // Create categories mapping
    const categories: Record<string, string> = {}
    const uniqueCategories = Array.from(
      new Set(apiBrands.map(brand => brand.categoryID))
    )
    uniqueCategories.forEach(catId => {
      categories[catId] = catId // We'll get proper names from categories API
    })

    const data: BrandsResponse = {
      items,
      categories,
      subCategories: {},
    }

    return { success: true, data }
  } catch {
    return { success: false, error: 'Failed to fetch brands' }
  }
}

export async function fetchCitysTimes(
  lang: string = 'tr'
): Promise<ApiResponse<CitysTimesItem[]>> {
  const response = await panelClient.get<CitysTimesItem[]>(
    `/citysTimes.php?${buildQueryString(lang)}`,
    {
      next: {
        revalidate: 300, // Revalidate every 5 minutes (events are more dynamic)
        tags: ['citys-times', `citys-times-${lang}`],
      },
    }
  )

  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch citys times',
    }
  }

  // The API returns the array directly
  const items = Array.isArray(response.data) ? response.data : []
  return { success: true, data: items }
}

// Utility function to get proper image URLs for citys times (deprecated - images now come with full URLs)
export function getEventImageUrl(imageSrc: string): string {
  if (imageSrc.startsWith('http')) {
    return imageSrc
  }
  return `https://panel.citysresidences.com/assets/images/citysTimes/${imageSrc}`
}

// Export citys-park queries
export { fetchCitysParkData, type CitysParkData } from './citys-park'

// Export citys-living queries
export { fetchCitysLivingData, type CitysLivingData } from './citys-living'

// Export citys-members-club queries
export {
  fetchCitysMembersClubData,
  type CitysMembersClubData,
} from './citys-members-club'

// Export residences-slider queries
export {
  fetchResidencesSlider,
  type ResidencesSliderItem,
} from './residences-slider'

// Export revalidation utilities (Server Actions)
export {
  revalidateCategories,
  revalidateSubCategories,
  revalidateFloors,
  revalidateBrands,
  revalidateCitysTimes,
  revalidateCitysPark,
  revalidateCitysLiving,
  revalidateCitysMembersClub,
  revalidateResidencesSlider,
  revalidateAllCitysData,
  revalidateAllApiCache,
  revalidateAppPath,
} from '../revalidate'
