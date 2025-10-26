'use client'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FilterForm } from '@/components/filter-form'
import { ErrorMessage, LoadingSpinner } from '@/components/ui/loading-states'
import { Img } from '@/components/utility/img'
import {
  useAvmData,
  useAvmSubCategories,
  useBrands,
} from '@/hooks/useAvmQueries'
import {
  // getFloorDisplayName,
  processFilters,
  type FilterData,
} from '@/lib/utils/filter-utils'
import { Brand } from '@/types'

const filterSchema = z.object({
  category: z.string().optional(),
  subCategory: z.string().optional(),
  floor: z.string().optional(),
  keyword: z.string().optional(),
})

interface FilterableContentProps {
  brands: Brand[]
}

export function FilterableContent({ brands }: FilterableContentProps) {
  const { categories, floors, loading, error } = useAvmData()

  const DEFAULT_VISIBLE_COUNT = 25
  const [visibleCount, setVisibleCount] = useState<number>(
    DEFAULT_VISIBLE_COUNT
  )

  // Create form in parent component to prevent re-creation
  const form = useForm<FilterData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: '',
      subCategory: '',
      floor: '',
      keyword: '',
    },
  })

  // Watch form values for changes
  const watchedValues = form.watch()

  // Process watched values into filters for API calls
  const filters = processFilters(watchedValues)

  // Reset visible count whenever filters change
  useEffect(() => {
    setVisibleCount(DEFAULT_VISIBLE_COUNT)
  }, [filters.category, filters.subCategory, filters.floor, filters.keyword])

  // Use React Query for brands with filters
  const brandsQuery = useBrands(filters)
  const filteredBrands = brandsQuery.isLoading
    ? []
    : brandsQuery.data?.data?.items || brands
  const noResultsMessage = brandsQuery.data?.message

  // Use React Query for subcategories
  const { subCategories } = useAvmSubCategories(filters.category || null)

  // Show error state for initial data loading
  if (error) {
    return <ErrorMessage message={error?.message} />
  }

  return (
    <div className='grid min-h-screen grid-cols-24 gap-4 px-6 md:px-0 lg:px-0'>
      <div className='col-span-24 lg:col-span-19 lg:col-start-5'>
        <FilterForm
          form={form}
          categories={categories}
          subCategories={subCategories}
          floors={floors}
          isLoading={loading}
        />
      </div>
      <div className='col-span-24 lg:col-span-19 lg:col-start-5'>
        {loading && <LoadingSpinner message='Yükleniyor...' />}
        <AnimatePresence mode='wait'>
          {!loading && (
            <motion.div
              key={`${loading ? 'loading' : 'loaded'}-${JSON.stringify(filters)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='grid grid-cols-2 items-end gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5 lg:gap-4'>
                <AnimatePresence>
                  {filteredBrands.slice(0, visibleCount).map(brand => {
                    // const floorDisplay = getFloorDisplayName(brand.floor)
                    return (
                      <motion.div
                        key={`${brand.name}-${brand.category}-${brand.floor}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <div className='group cursor-pointer'>
                          {/* <h3
                            className={cn(
                              'font-primary font-bold',
                              'text-lg lg:text-xl',
                              'mb-1 text-center tracking-wide text-black lg:mb-2'
                            )}
                          >
                            {brand.name}
                          </h3> */}
                          <div
                            className={cn(
                              'relative overflow-hidden',
                              'pb-[100%]',
                              'flex items-center justify-center'
                            )}
                          >
                            <Img
                              src={brand.logo}
                              alt={brand.name}
                              className='object-cover transition-transform duration-300 group-hover:scale-105'
                              fill
                              sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
                              loading='lazy'
                            />
                          </div>
                          {/* <p
                            className={cn(
                              'font-primary',
                              'text-[0.8rem] md:text-sm lg:text-base',
                              'text-center text-gray-800'
                            )}
                          >
                            {floorDisplay}
                          </p> */}
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
              {filteredBrands.length > visibleCount && (
                <button
                  type='button'
                  className={cn(
                    'mt-12 w-full rounded-md',
                    'bg-slate-200 text-slate-950',
                    'font-primary font-[300] transition-colors',
                    'py-5 text-center text-base'
                  )}
                  onClick={() => setVisibleCount(filteredBrands.length)}
                >
                  Tümünü Gör
                </button>
              )}
              <AnimatePresence>
                {filteredBrands.length === 0 && !brandsQuery.isLoading && (
                  <motion.div
                    className='py-12 text-center'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className='font-primary text-lg text-gray-500'>
                      {noResultsMessage ||
                        'Arama kriterlerinize uygun sonuç bulunamadı.'}
                    </p>
                    <p className='mt-2 font-primary text-sm text-gray-400'>
                      Lütfen filtrelerinizi değiştirip tekrar deneyin.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
