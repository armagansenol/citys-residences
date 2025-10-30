import { ComponentType } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { panelClient, type ApiResponse } from '../client'

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

export async function fetchCitysParkData(
  lang: string = 'tr'
): Promise<ApiResponse<CitysParkData[]>> {
  return panelClient.get<CitysParkData[]>(`/citysPark.php?lang=${lang}`)
}
