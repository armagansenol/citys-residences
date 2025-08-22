"use client"

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FilterForm } from "@/components/filter-form"
import { ErrorMessage, LoadingSpinner } from "@/components/ui/loading-states"
import { Img } from "@/components/utility/img"
import { useAvmData, useAvmSubCategories, useBrands } from "@/hooks/useAvmQueries"
import { getFloorDisplayName, processFilters, type FilterData } from "@/lib/utils/filter-utils"
import { Brand } from "@/types"

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

  const DEFAULT_VISIBLE_COUNT = 8
  const [visibleCount, setVisibleCount] = useState<number>(DEFAULT_VISIBLE_COUNT)

  // Create form in parent component to prevent re-creation
  const form = useForm<FilterData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: "",
      subCategory: "",
      floor: "",
      keyword: "",
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
  const filteredBrands = brandsQuery.isLoading ? [] : brandsQuery.data?.data?.items || brands
  const noResultsMessage = brandsQuery.data?.message

  // Use React Query for subcategories
  const { subCategories } = useAvmSubCategories(filters.category || null)

  // Show error state for initial data loading
  if (error) {
    return <ErrorMessage message={error?.message} />
  }

  return (
    <div className="min-h-screen px-6 md:px-0 lg:px-0">
      <FilterForm
        form={form}
        categories={categories}
        subCategories={subCategories}
        floors={floors}
        isLoading={loading}
      />

      {loading && <LoadingSpinner message="Yükleniyor..." />}

      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={`${loading ? "loading" : "loaded"}-${JSON.stringify(filters)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 items-end">
              <AnimatePresence>
                {filteredBrands.slice(0, visibleCount).map((brand) => {
                  const floorDisplay = getFloorDisplayName(brand.floor)
                  return (
                    <motion.div
                      key={`${brand.name}-${brand.category}-${brand.floor}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <div className="group cursor-pointer">
                        <h3
                          className={cn(
                            "font-primary font-bold",
                            "text-3xl lg:text-xl",
                            "text-black mb-2 tracking-wide text-center"
                          )}
                        >
                          {brand.name}
                        </h3>
                        <div
                          className={cn(
                            "relative overflow-hidden bg-gray-100 mb-4",
                            // "h-[65vw] sm:h-48 md:h-56 lg:h-72",
                            "flex items-center justify-center",
                            "pb-[100%]"
                          )}
                        >
                          <Img
                            src={brand.logo}
                            alt={brand.name}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                            loading="lazy"
                          />
                        </div>
                        <p
                          className={cn(
                            "font-primary",
                            "text-base md:text-sm lg:text-base",
                            "text-gray-800 text-center"
                          )}
                        >
                          {floorDisplay}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {filteredBrands.length > visibleCount && (
              <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
                <button
                  type="button"
                  className={cn(
                    "rounded-md",
                    "border-2 border-bricky-brick bg-bricky-brick text-white hover:bg-white hover:text-bricky-brick",
                    "transition-colors font-primary font-medium",
                    "px-4 py-2.5 text-base md:px-6 md:py-3 md:text-lg"
                  )}
                  onClick={() => setVisibleCount(filteredBrands.length)}
                >
                  Tümünü Gör
                </button>
              </div>
            )}

            <AnimatePresence>
              {filteredBrands.length === 0 && !brandsQuery.isLoading && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-gray-500 font-primary text-lg">
                    {noResultsMessage || "Arama kriterlerinize uygun sonuç bulunamadı."}
                  </p>
                  <p className="text-gray-400 font-primary text-sm mt-2">
                    Lütfen filtrelerinizi değiştirip tekrar deneyin.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
