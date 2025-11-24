import { fetchSubCategories } from '@/lib/api/queries'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'tr'
  const categoryId = searchParams.get('categoryId')

  if (!categoryId) {
    return NextResponse.json(
      { success: false, error: 'CategoryId is required' },
      { status: 400 }
    )
  }

  const response = await fetchSubCategories(categoryId, locale)

  if (!response.success) {
    return NextResponse.json(
      { success: false, error: response.error },
      { status: 500 }
    )
  }

  return NextResponse.json(response)
}
