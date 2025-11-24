'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import {
  Brand,
  Category,
  Floor,
  SubCategory,
  ApiResponse,
  BrandsResponse,
} from '@/types'

interface BrandFilters {
  category?: string
  subCategory?: string
  floor?: string
  keyword?: string
}

async function fetchAvmBootstrap(locale: string): Promise<{
  categories: Category[]
  floors: Floor[]
  brands: Brand[]
}> {
  const res = await fetch(`/api/avm/bootstrap?locale=${locale}`)
  if (!res.ok) throw new Error('Failed to fetch bootstrap data')
  return res.json()
}

async function fetchAvmBrands(
  locale: string,
  filters?: BrandFilters
): Promise<ApiResponse<BrandsResponse>> {
  const params = new URLSearchParams({ locale })
  if (filters) {
    if (filters.category && filters.category !== 'all')
      params.append('category', filters.category)
    if (filters.subCategory && filters.subCategory !== 'all')
      params.append('subCategory', filters.subCategory)
    if (filters.floor && filters.floor !== 'all')
      params.append('floor', filters.floor)
    if (filters.keyword) params.append('keyword', filters.keyword)
  }
  const res = await fetch(`/api/avm/brands?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch brands')
  return res.json()
}

async function fetchAvmSubCategories(
  locale: string,
  categoryId: string
): Promise<ApiResponse<SubCategory[]>> {
  const res = await fetch(
    `/api/avm/subcategories?locale=${locale}&categoryId=${categoryId}`
  )
  if (!res.ok) throw new Error('Failed to fetch subcategories')
  return res.json()
}

export function useAvmData() {
  const params = useParams()
  const locale = (params.locale as string) || 'tr'

  const query = useQuery({
    queryKey: ['avm-bootstrap', locale],
    queryFn: () => fetchAvmBootstrap(locale),
    staleTime: 60000,
  })

  return {
    categories: query.data?.categories || [],
    floors: query.data?.floors || [],
    loading: query.isLoading,
    error: query.error,
  }
}

export function useBrands(filters?: BrandFilters, initialBrands?: Brand[]) {
  const params = useParams()
  const locale = (params.locale as string) || 'tr'

  const hasFilters =
    filters &&
    ((filters.category && filters.category !== 'all') ||
      (filters.subCategory && filters.subCategory !== 'all') ||
      (filters.floor && filters.floor !== 'all') ||
      filters.keyword)

  return useQuery({
    queryKey: ['brands', locale, filters],
    queryFn: () => fetchAvmBrands(locale, filters),
    enabled: !!hasFilters,
    initialData: hasFilters
      ? undefined
      : {
          success: true,
          data: {
            items: initialBrands || [],
            categories: {},
            subCategories: {},
          },
        },
  })
}

export function useAvmSubCategories(categoryId: string | null) {
  const params = useParams()
  const locale = (params.locale as string) || 'tr'

  const query = useQuery({
    queryKey: ['subCategories', categoryId, locale],
    queryFn: () => fetchAvmSubCategories(locale, categoryId!),
    enabled: !!categoryId && categoryId !== 'all',
    staleTime: 5 * 60 * 1000,
  })

  return {
    subCategories: (query.data?.data || []) as SubCategory[],
    loading: query.isLoading,
    error: query.error,
  }
}
