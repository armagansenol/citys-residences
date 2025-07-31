"use server"

import { BrandsResponse, Category, SubCategory, Floor, ApiResponse, ApiBrand } from "@/types"

export async function getBrandsData(lang: string = "tr"): Promise<BrandsResponse> {
  try {
    const response = await fetch(`https://crm.citysresidences.com/api/brands.php?lang=${lang}`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const apiBrands: ApiBrand[] = await response.json()

    // Transform API data to match our expected structure
    const items = apiBrands.map((brand) => ({
      name: brand.title,
      category: brand.categoryID,
      subCategory: null, // API doesn't provide subcategory
      logo: brand.image,
      floor: brand.floor === "Zemin Kat" ? "ground" : "first",
    }))

    // Create categories mapping
    const categories: Record<string, string> = {}
    const uniqueCategories = Array.from(new Set(apiBrands.map((brand) => brand.categoryID)))
    uniqueCategories.forEach((catId) => {
      categories[catId] = catId // We'll get proper names from categories API
    })

    return {
      items,
      categories,
      subCategories: {},
    }
  } catch (error) {
    console.error("Error fetching brands data:", error)
    // Return a fallback structure that matches BrandsResponse
    return {
      items: [],
      categories: {},
      subCategories: {},
    }
  }
}

export async function getCategories(lang: string = "tr"): Promise<ApiResponse<Category[]>> {
  try {
    const response = await fetch(`https://crm.citysresidences.com/api/categories.php?lang=${lang}`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error fetching categories:", error)
    return { success: false, error: "Failed to fetch categories" }
  }
}

export async function getSubCategories(categoryId: string, lang: string = "tr"): Promise<ApiResponse<SubCategory[]>> {
  try {
    const response = await fetch(
      `https://crm.citysresidences.com/api/subCategories.php?categoryId=${categoryId}&lang=${lang}`,
      {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error fetching subcategories:", error)
    return { success: false, error: "Failed to fetch subcategories" }
  }
}

export async function getFloors(lang: string = "tr"): Promise<ApiResponse<Floor[]>> {
  try {
    const response = await fetch(`https://crm.citysresidences.com/api/floors.php?lang=${lang}`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error fetching floors:", error)
    return { success: false, error: "Failed to fetch floors" }
  }
}
