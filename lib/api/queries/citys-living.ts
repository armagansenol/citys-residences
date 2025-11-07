import { ComponentType } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { type ApiResponse } from '../client'
import { fetchCitysData } from './helpers'

export interface CitysLivingData {
  id: string
  mediaId: string
  componentType: ComponentType
  thumbnail: string
  title?: string
  subtitle?: string
  description?: string
}

// Cached for 1 hour via fetchCitysData helper
export async function fetchCitysLivingData(
  lang: string = 'tr'
): Promise<ApiResponse<CitysLivingData[]>> {
  return fetchCitysData<CitysLivingData>('citysLiving.php', lang)
}
