import { panelClient, type ApiResponse } from '../client'

export interface ResidencesSliderItem {
  id: string
  image: string
}

/**
 * Fetch Residences Slider data with ISR caching
 *
 * @returns API response with residences slider items
 *
 * Note: This endpoint doesn't require language parameter
 * Cache revalidation: 1 hour (images are relatively static)
 */
export async function fetchResidencesSlider(): Promise<
  ApiResponse<ResidencesSliderItem[]>
> {
  const response = await panelClient.get<ResidencesSliderItem[]>(
    '/residencesSlider.php',
    {
      cache: 'force-cache',
      next: {
        revalidate: 3600, // Revalidate every hour (slider images are relatively static)
        tags: ['residences-slider', 'citys-residencesSlider'],
      },
    }
  )

  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch residences slider',
    }
  }

  // The API returns the array directly
  const sliderItems = Array.isArray(response.data) ? response.data : []
  return { success: true, data: sliderItems }
}
