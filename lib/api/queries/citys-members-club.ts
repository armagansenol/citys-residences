import { ComponentType } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { type ApiResponse } from '../client'
import { fetchCitysData } from './helpers'

export interface CitysMembersClubData {
  id: string
  mediaId: string
  componentType: ComponentType
  thumbnail: string
  title?: string
  subtitle?: string
  description?: string
}

// Cached for 1 hour via fetchCitysData helper
export async function fetchCitysMembersClubData(
  lang: string = 'tr'
): Promise<ApiResponse<CitysMembersClubData[]>> {
  return fetchCitysData<CitysMembersClubData>('membersClub.php', lang)
}
