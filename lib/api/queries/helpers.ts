/**
 * API Query Helper Functions
 *
 * This module provides shared utilities for API queries with ISR caching support.
 * @module lib/api/queries/helpers
 */

import { panelClient, type ApiResponse } from '../client'

/**
 * Build query string with language parameter and additional params
 *
 * @param lang - Language code (e.g., 'tr', 'en')
 * @param additionalParams - Optional additional query parameters
 * @returns URL-encoded query string
 *
 * @example
 * buildQueryString('tr', { categoryId: '123' })
 * // Returns: "lang=tr&categoryId=123"
 */
export function buildQueryString(
  lang: string,
  additionalParams?: Record<string, string>
): string {
  const params = new URLSearchParams({ lang })
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
  }
  return params.toString()
}

/**
 * Shared helper for fetching citys-* endpoints with ISR caching
 *
 * This function implements Next.js 14 ISR with:
 * - 1 hour revalidation period
 * - Dynamic cache tags based on endpoint
 * - Force cache strategy for optimal performance
 *
 * Used by:
 * - fetchCitysParkData (citysPark.php)
 * - fetchCitysLivingData (citysLiving.php)
 * - fetchCitysMembersClubData (membersClub.php)
 *
 * @param endpoint - API endpoint (e.g., 'citysPark.php')
 * @param lang - Language code (default: 'tr')
 * @returns API response with data array
 *
 * @example
 * const data = await fetchCitysData<CitysParkData>('citysPark.php', 'en')
 */
export async function fetchCitysData<T>(
  endpoint: string,
  lang: string = 'tr'
): Promise<ApiResponse<T[]>> {
  return panelClient.get<T[]>(`/${endpoint}?${buildQueryString(lang)}`, {
    next: {
      revalidate: 3600, // Revalidate every hour (citys data is relatively static)
      tags: [`citys-${endpoint.replace('.php', '')}`], // Dynamic tag for granular revalidation
    },
  })
}
