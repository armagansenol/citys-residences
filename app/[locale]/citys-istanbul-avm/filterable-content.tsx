"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "motion/react"
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

  // Use React Query for brands with filters
  const brandsQuery = useBrands(filters)
  const filteredBrands = brandsQuery.isLoading ? [] : brandsQuery.data?.data?.items || brands
  const noResultsMessage = brandsQuery.data?.message

  // Use React Query for subcategories
  const { subCategories } = useAvmSubCategories(filters.category || null)

  // Show error state for initial data loading
  if (error) {
    return (
      <div className="section-container">
        <ErrorMessage message={error?.message} />
      </div>
    )
  }

  return (
    <div className="section-container min-h-screen">
      {/* Filters and Search - Always visible, even during loading */}
      <FilterForm
        form={form}
        categories={categories}
        subCategories={subCategories}
        floors={floors}
        isLoading={loading}
      />

      {/* Show loading for initial data load */}
      {loading && <LoadingSpinner message="Yükleniyor..." />}

      {/* Brand Grid with loading state */}
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={`${loading ? "loading" : "loaded"}-${JSON.stringify(filters)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Brands Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-end">
              {filteredBrands.map((brand) => {
                const floorDisplay = getFloorDisplayName(brand.floor)
                return (
                  <div key={`${brand.name}-${brand.category}-${brand.floor}`}>
                    <div className="group cursor-pointer">
                      <h3 className="font-suisse-intl font-bold text-base lg:text-xl text-black mb-2 tracking-wide text-center">
                        {brand.name}
                      </h3>
                      <div className="relative overflow-hidden bg-gray-100 h-64 mb-4 flex items-center justify-center">
                        <Img
                          src={brand.logo}
                          alt={brand.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          fill
                          sizes="25vw"
                        />
                      </div>
                      <p className="font-suisse-intl text-xs lg:text-sm text-gray-800 text-center">{floorDisplay}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* No results message */}
            <AnimatePresence>
              {filteredBrands.length === 0 && !brandsQuery.isLoading && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-gray-500 font-suisse-intl text-lg">
                    {noResultsMessage || "Arama kriterlerinize uygun sonuç bulunamadı."}
                  </p>
                  <p className="text-gray-400 font-suisse-intl text-sm mt-2">
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
