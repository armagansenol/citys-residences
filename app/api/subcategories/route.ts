import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const lang = searchParams.get('lang') || 'tr'

    if (!categoryId) {
      return NextResponse.json(
        { error: 'categoryId parameter is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://crm.citysresidences.com/api/subCategories.php?categoryId=${categoryId}&lang=${lang}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching subcategories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    )
  }
}
