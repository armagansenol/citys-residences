import { ComponentType } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { type ApiResponse } from '../client'
import { fetchCitysData } from './helpers'

export interface CitysParkData {
  id: string
  mediaId: string
  componentType: ComponentType
  thumbnail: string
  width?: number
  height?: number
  aspectRatio?: number
  title?: string
  subtitle?: string
  description?: string
}

// Cached for 1 hour via fetchCitysData helper
export async function fetchCitysParkData(
  lang: string = 'tr'
): Promise<ApiResponse<CitysParkData[]>> {
  return fetchCitysData<CitysParkData>('citysPark.php', lang)
}
