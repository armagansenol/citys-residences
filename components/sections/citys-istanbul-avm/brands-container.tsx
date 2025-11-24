'use client'

import { Brand } from '@/types'
import { FilterableContent } from '@/components/sections/citys-istanbul-avm/filterable-content'

interface BrandsContainerProps {
  initialBrands: Brand[]
}

export function BrandsContainer({ initialBrands }: BrandsContainerProps) {
  return <FilterableContent brands={initialBrands} />
}
