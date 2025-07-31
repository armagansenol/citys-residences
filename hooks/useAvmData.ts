"use client"

import { useState, useEffect } from "react"
import { Category, SubCategory, Floor } from "@/types"
import { fetchCategories, fetchSubCategories, fetchFloors } from "@/lib/api/queries"
import { useParams } from "next/navigation"

interface UseAvmDataReturn {
  categories: Category[]
  subCategories: SubCategory[]
  floors: Floor[]
  loading: boolean
  error: string | null
  fetchSubCategories: (categoryId: string) => Promise<void>
  clearSubCategories: () => void
}

export function useAvmData(): UseAvmDataReturn {
  const params = useParams()
  const locale = (params.locale as string) || "tr"

  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [floors, setFloors] = useState<Floor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch categories
        const categoriesResponse = await fetchCategories(locale)
        if (categoriesResponse.success && categoriesResponse.data) {
          setCategories(categoriesResponse.data)
        } else {
          console.error("Failed to fetch categories:", categoriesResponse.error)
        }

        // Fetch floors
        const floorsResponse = await fetchFloors(locale)
        if (floorsResponse.success && floorsResponse.data) {
          setFloors(floorsResponse.data)
        } else {
          console.error("Failed to fetch floors:", floorsResponse.error)
        }
      } catch (err) {
        console.error("Error fetching initial data:", err)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [locale])

  const handleFetchSubCategories = async (categoryId: string) => {
    try {
      const response = await fetchSubCategories(categoryId, locale)
      if (response.success && response.data) {
        setSubCategories(response.data)
      } else {
        console.error("Failed to fetch subcategories:", response.error)
        setSubCategories([])
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err)
      setSubCategories([])
    }
  }

  const clearSubCategories = () => {
    setSubCategories([])
  }

  return {
    categories,
    subCategories,
    floors,
    loading,
    error,
    fetchSubCategories: handleFetchSubCategories,
    clearSubCategories,
  }
}
