"use client"

import { FilterForm } from "@/components/filter-form"
import { useState, useMemo } from "react"
import { Brand } from "@/types"
import { Img } from "@/components/utility/img"

interface FilterableContentProps {
  brands: Brand[]
}

// Floor mapping - since floor data isn't in the API, we'll simulate it
const getFloorForBrand = (brandName: string): string => {
  // This is a simulation - in real scenario this would come from API
  const upperFloorBrands = [
    "BURGER KING",
    "BABY GREEN",
    "ART OF BAKERY",
    "BİZİM LOKANTA",
    "CARL'S JR.",
    "CONI & CO",
    "COOKSHOP",
  ]
  const basementFloorBrands = ["STARBUCKS", "MCDONALD'S"]

  if (upperFloorBrands.some((brand) => brandName.toUpperCase().includes(brand))) {
    return "upper"
  } else if (basementFloorBrands.some((brand) => brandName.toUpperCase().includes(brand))) {
    return "basement"
  }
  return "ground"
}

const getFloorDisplayName = (floor: string): string => {
  switch (floor) {
    case "upper":
      return "Üst Kat"
    case "basement":
      return "Alt Kat"
    case "ground":
      return "Zemin Kat"
    default:
      return "Giriş Kat"
  }
}

// Restaurant/dining subcategory mapping
const getRestaurantType = (subCategory: string | null): string => {
  if (!subCategory) return "other"

  const subcatLower = subCategory.toLowerCase()
  if (subcatLower.includes("restoran") || subcatLower.includes("restaurant")) return "restoran"
  if (subcatLower.includes("kafe") || subcatLower.includes("cafe") || subcatLower.includes("coffee")) return "kafe"
  if (subcatLower.includes("fast") || subcatLower.includes("hızlı")) return "fastfood"

  return "other"
}

export function FilterableContent({ brands }: FilterableContentProps) {
  const [filters, setFilters] = useState({
    category: "",
    restaurant: "",
    floor: "",
    search: "",
  })

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      // Category filter
      if (filters.category && brand.category !== filters.category) {
        return false
      }

      // Restaurant type filter (only applies to yemeIcme category)
      if (filters.restaurant && brand.category === "yemeIcme") {
        const brandRestaurantType = getRestaurantType(brand.subCategory)
        if (brandRestaurantType !== filters.restaurant) {
          return false
        }
      }

      // Floor filter
      if (filters.floor) {
        const brandFloor = getFloorForBrand(brand.name)
        if (brandFloor !== filters.floor) {
          return false
        }
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const brandName = brand.name.toLowerCase()
        if (!brandName.includes(searchTerm)) {
          return false
        }
      }

      return true
    })
  }, [brands, filters])

  const handleFilter = (filterData: { category?: string; restaurant?: string; floor?: string; search?: string }) => {
    console.log("Filtering with:", filterData)
    setFilters({
      category: filterData.category || "",
      restaurant: filterData.restaurant || "",
      floor: filterData.floor || "",
      search: filterData.search || "",
    })
  }

  return (
    <div className="section-container">
      {/* Filters and Search */}
      <FilterForm onFilter={handleFilter} />

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 font-suisse-intl">{filteredBrands.length} sonuç bulundu</p>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {filteredBrands.map((brand, index) => {
          const floor = getFloorForBrand(brand.name)
          const floorDisplay = getFloorDisplayName(floor)

          return (
            <div key={`${brand.name}-${index}`} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-100 h-80 mb-4 flex items-center justify-center">
                <div className="relative w-44 h-44">
                  <Img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback for broken images
                      e.currentTarget.src = "/img/placeholder-logo.png"
                    }}
                    fill
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-suisse-intl font-bold text-sm lg:text-base text-black mb-1 tracking-wide">
                  {brand.name}
                </h3>
                <p className="font-suisse-intl text-xs lg:text-sm text-gray-600">{floorDisplay}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* No results message */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-suisse-intl text-lg">Arama kriterlerinize uygun sonuç bulunamadı.</p>
          <p className="text-gray-400 font-suisse-intl text-sm mt-2">
            Lütfen filtrelerinizi değiştirip tekrar deneyin.
          </p>
        </div>
      )}
    </div>
  )
}
