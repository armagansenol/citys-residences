import { BrandsResponse, Category, SubCategory, Floor, ApiResponse, ApiBrand } from "@/types"

// Client-side functions for fetching data
export async function fetchCategories(lang: string = "tr"): Promise<ApiResponse<Category[]>> {
  try {
    const url = `https://crm.citysresidences.com/api/categories.php?lang=${lang}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch {
    return { success: false, error: "Failed to fetch categories" }
  }
}

export async function fetchSubCategories(categoryId: string, lang: string = "tr"): Promise<ApiResponse<SubCategory[]>> {
  try {
    const url = `https://crm.citysresidences.com/api/subCategories.php?categoryId=${categoryId}&lang=${lang}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch {
    return { success: false, error: "Failed to fetch subcategories" }
  }
}

export async function fetchFloors(lang: string = "tr"): Promise<ApiResponse<Floor[]>> {
  try {
    const url = `https://crm.citysresidences.com/api/floors.php?lang=${lang}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch {
    return { success: false, error: "Failed to fetch floors" }
  }
}

export async function fetchBrands(
  lang: string = "tr",
  filters?: { category?: string; subCategory?: string; floor?: string; keyword?: string }
): Promise<ApiResponse<BrandsResponse>> {
  try {
    // Build query parameters
    const params = new URLSearchParams()
    params.append("lang", lang)

    if (filters) {
      if (filters.category && filters.category !== "all") {
        params.append("category", filters.category)
      }
      if (filters.subCategory && filters.subCategory !== "all") {
        params.append("subCategory", filters.subCategory)
      }
      if (filters.floor && filters.floor !== "all") {
        params.append("floor", filters.floor)
      }
      if (filters.keyword) {
        params.append("keyword", filters.keyword)
      }
    }

    const url = `https://crm.citysresidences.com/api/brands.php?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()

    // Handle case when no brands are found
    if (responseData.success === false) {
      const emptyData: BrandsResponse = {
        items: [],
        categories: {},
        subCategories: {},
      }

      return { success: true, data: emptyData, message: responseData.message }
    }

    // Handle case when brands are found (array response)
    const apiBrands: ApiBrand[] = responseData

    // Transform API data to match our expected structure
    const items = apiBrands.map((brand) => ({
      name: brand.title,
      category: brand.categoryID,
      subCategory: null, // API doesn't provide subcategory
      logo: brand.image,
      floor: (() => {
        const floorLower = brand.floor.toLowerCase()
        if (floorLower.includes("zemin") || floorLower.includes("ground") || floorLower.includes("0")) {
          return "ground"
        }
        return "first"
      })(),
    }))

    // Create categories mapping
    const categories: Record<string, string> = {}
    const uniqueCategories = Array.from(new Set(apiBrands.map((brand) => brand.categoryID)))
    uniqueCategories.forEach((catId) => {
      categories[catId] = catId // We'll get proper names from categories API
    })

    const data: BrandsResponse = {
      items,
      categories,
      subCategories: {},
    }

    return { success: true, data }
  } catch {
    return { success: false, error: "Failed to fetch brands" }
  }
}
