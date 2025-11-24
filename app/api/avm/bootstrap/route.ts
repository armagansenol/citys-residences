import { panelClient } from '@/lib/api/client'
import { buildQueryString } from '@/lib/api/queries/helpers'
import { ApiBrand, Brand, Category, Floor } from '@/types'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'tr'

  try {
    const [categoriesRes, floorsRes, brandsRes] = await Promise.all([
      panelClient.get<Category[]>(
        `/categories.php?${buildQueryString(locale)}`,
        {
          next: {
            revalidate: 3600,
            tags: ['categories', `categories-${locale}`],
          },
        }
      ),
      panelClient.get<Floor[]>(`/floors.php?${buildQueryString(locale)}`, {
        next: {
          revalidate: 3600,
          tags: ['floors', `floors-${locale}`],
        },
      }),
      panelClient.get<ApiBrand[]>(`/brands.php?${buildQueryString(locale)}`, {
        next: {
          revalidate: 3600,
          tags: ['brands', `brands-${locale}`],
        },
      }),
    ])

    // Transform brands
    let brands: Brand[] = []
    if (brandsRes.success && brandsRes.data) {
      const apiBrands = Array.isArray(brandsRes.data) ? brandsRes.data : []
      brands = apiBrands.map(brand => ({
        name: brand.title,
        category: brand.categoryID,
        subCategory: null,
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
    }

    return NextResponse.json(
      {
        categories: categoriesRes.data || [],
        floors: floorsRes.data || [],
        brands,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
        },
      }
    )
  } catch (error) {
    console.error('Bootstrap API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bootstrap data' },
      { status: 500 }
    )
  }
}
