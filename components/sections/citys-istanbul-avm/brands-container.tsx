'use client'

import { Brand } from '@/types'
import { FilterableContent } from '@/components/sections/citys-istanbul-avm/filterable-content'
import { useBrands } from '@/hooks/useAvmQueries'

interface AvmBrandsContainerProps {
  initialBrands: Brand[]
}

export function AvmBrandsContainer({ initialBrands }: AvmBrandsContainerProps) {
  // Use React Query to fetch brands (will use initialBrands as fallback)
  const brandsQuery = useBrands()
  const brands = brandsQuery.data?.data?.items || initialBrands

  // FilterableContent handles all loading and error states internally
  return <FilterableContent brands={brands} />
}
