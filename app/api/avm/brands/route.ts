import { panelClient } from '@/lib/api/client'
import { buildQueryString } from '@/lib/api/queries/helpers'
import { ApiBrand, BrandsResponse } from '@/types'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'tr'

  const category = searchParams.get('category')
  const subCategory = searchParams.get('subCategory')
  const floor = searchParams.get('floor')
  const keyword = searchParams.get('keyword')

  const filters = { category, subCategory, floor, keyword }

  try {
    const params: Record<string, string> = {}
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

    const tags = ['brands', `brands-${locale}`]
    if (filters.category && filters.category !== 'all') {
      tags.push(`brands-category-${filters.category}`)
    }
    if (filters.subCategory && filters.subCategory !== 'all') {
      tags.push(`brands-subcategory-${filters.subCategory}`)
    }
    if (filters.floor && filters.floor !== 'all') {
      tags.push(`brands-floor-${filters.floor}`)
    }

    const response = await panelClient.get<ApiBrand[]>(
      `/brands.php?${buildQueryString(locale, params)}`,
      {
        next: {
          revalidate: 3600,
          tags,
        },
      }
    )

    if (!response.success || !response.data) {
      return NextResponse.json({
        success: false,
        error: response.error || 'Failed to fetch brands',
      })
    }

    const responseData = response.data

    // Handle "no results" object response
    const errorResponse = responseData as unknown as {
      success: boolean
      message?: string
    }
    if (!Array.isArray(responseData) && errorResponse?.success === false) {
      return NextResponse.json({
        success: false,
        message: errorResponse.message || 'Marka bulunamadı',
      })
    }

    if (Array.isArray(responseData) && responseData.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          items: [],
          categories: {},
          subCategories: {},
        },
      })
    }

    const apiBrands: ApiBrand[] = responseData as ApiBrand[]
    const items = apiBrands.map(brand => ({
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

    const categories: Record<string, string> = {}
    const uniqueCategories = Array.from(
      new Set(apiBrands.map(brand => brand.categoryID))
    )
    uniqueCategories.forEach(catId => {
      categories[catId] = catId
    })

    const data: BrandsResponse = {
      items,
      categories,
      subCategories: {},
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Brands API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500 }
    )
  }
}
