/**
 * Cache Revalidation Utilities for Next.js ISR
 *
 * This module provides Server Actions for manually revalidating cached data.
 * Use these functions when you need to update the cache before the automatic
 * revalidation period expires (e.g., after content updates in a CMS).
 *
 * @module lib/api/revalidate
 */

'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

/**
 * Revalidate all categories cache
 * @param lang - Optional language code to revalidate specific language only
 */
export async function revalidateCategories(lang?: string) {
  if (lang) {
    revalidateTag(`categories-${lang}`)
  } else {
    revalidateTag('categories')
  }
}

/**
 * Revalidate subcategories cache
 * @param categoryId - Optional category ID to revalidate specific category only
 * @param lang - Optional language code
 */
export async function revalidateSubCategories(
  categoryId?: string,
  lang?: string
) {
  if (categoryId) {
    revalidateTag(`subcategories-${categoryId}`)
  } else if (lang) {
    revalidateTag(`subcategories-${lang}`)
  } else {
    revalidateTag('subcategories')
  }
}

/**
 * Revalidate floors cache
 * @param lang - Optional language code to revalidate specific language only
 */
export async function revalidateFloors(lang?: string) {
  if (lang) {
    revalidateTag(`floors-${lang}`)
  } else {
    revalidateTag('floors')
  }
}

/**
 * Revalidate brands cache
 * @param options - Optional filters to revalidate specific brand queries
 */
export async function revalidateBrands(options?: {
  lang?: string
  category?: string
  subCategory?: string
  floor?: string
}) {
  if (options?.category) {
    revalidateTag(`brands-category-${options.category}`)
  } else if (options?.subCategory) {
    revalidateTag(`brands-subcategory-${options.subCategory}`)
  } else if (options?.floor) {
    revalidateTag(`brands-floor-${options.floor}`)
  } else if (options?.lang) {
    revalidateTag(`brands-${options.lang}`)
  } else {
    revalidateTag('brands')
  }
}

/**
 * Revalidate Citys Times cache
 * @param lang - Optional language code to revalidate specific language only
 */
export async function revalidateCitysTimes(lang?: string) {
  if (lang) {
    revalidateTag(`citys-times-${lang}`)
  } else {
    revalidateTag('citys-times')
  }
}

/**
 * Revalidate Citys Park data cache
 */
export async function revalidateCitysPark() {
  revalidateTag('citys-citysPark')
}

/**
 * Revalidate Citys Living data cache
 */
export async function revalidateCitysLiving() {
  revalidateTag('citys-citysLiving')
}

/**
 * Revalidate Citys Members Club data cache
 */
export async function revalidateCitysMembersClub() {
  revalidateTag('citys-membersClub')
}

/**
 * Revalidate Residences Slider data cache
 */
export async function revalidateResidencesSlider() {
  revalidateTag('residences-slider')
  revalidateTag('citys-residencesSlider')
}

/**
 * Revalidate all Citys data (Park, Living, Members Club, Residences Slider)
 */
export async function revalidateAllCitysData() {
  revalidateCitysPark()
  revalidateCitysLiving()
  revalidateCitysMembersClub()
  revalidateResidencesSlider()
}

/**
 * Revalidate all API cache entries
 * Use with caution - this will invalidate all cached data
 */
export async function revalidateAllApiCache() {
  revalidateTag('categories')
  revalidateTag('subcategories')
  revalidateTag('floors')
  revalidateTag('brands')
  revalidateTag('citys-times')
  revalidateTag('residences-slider')
  revalidateAllCitysData()
}

/**
 * Revalidate entire application cache by path
 * This is a more aggressive approach that clears the Full Route Cache
 *
 * @param path - Path to revalidate (default: '/')
 * @param type - 'page' or 'layout' (default: 'layout')
 */
export async function revalidateAppPath(
  path: string = '/',
  type: 'page' | 'layout' = 'layout'
) {
  revalidatePath(path, type)
}

/**
 * Example usage in a Server Action:
 *
 * @example
 * // In a form submission or webhook handler
 * 'use server'
 *
 * import { revalidateBrands } from '@/lib/api/revalidate'
 *
 * export async function updateBrandAction(formData: FormData) {
 *   // ... update brand data ...
 *
 *   // Invalidate brands cache
 *   await revalidateBrands()
 *
 *   return { success: true }
 * }
 */
