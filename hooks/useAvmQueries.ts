"use client"

import { fetchBrands, fetchCategories, fetchFloors, fetchSubCategories } from "@/lib/api/queries"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export function useCategories() {
  const params = useParams()
  const locale = (params?.locale as string) || "tr"

  return useQuery({
    queryKey: ["categories", locale],
    queryFn: () => fetchCategories(locale),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSubCategories(categoryId: string | null) {
  const params = useParams()
  const locale = (params?.locale as string) || "tr"

  return useQuery({
    queryKey: ["subCategories", categoryId, locale],
    queryFn: () => fetchSubCategories(categoryId!, locale),
    enabled: !!categoryId, // Only run query if categoryId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useFloors() {
  const params = useParams()
  const locale = (params?.locale as string) || "tr"

  return useQuery({
    queryKey: ["floors", locale],
    queryFn: () => fetchFloors(locale),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useBrands(filters?: { category?: string; subCategory?: string; floor?: string; keyword?: string }) {
  const params = useParams()
  const locale = (params?.locale as string) || "tr"

  return useQuery({
    queryKey: ["brands", locale, filters],
    queryFn: () => fetchBrands(locale, filters),
    staleTime: 0, // No caching for search results
    refetchOnWindowFocus: false,
  })
}

// Combined hook for all AVM data
export function useAvmData() {
  const categoriesQuery = useCategories()
  const floorsQuery = useFloors()

  return {
    categories: categoriesQuery.data?.data || [],
    floors: floorsQuery.data?.data || [],
    loading: categoriesQuery.isLoading || floorsQuery.isLoading,
    error: categoriesQuery.error || floorsQuery.error,
  }
}

// Hook for fetching subcategories when category changes
export function useAvmSubCategories(categoryId: string | null) {
  const subCategoriesQuery = useSubCategories(categoryId)

  return {
    subCategories: subCategoriesQuery.data?.data || [],
    loading: subCategoriesQuery.isLoading,
    error: subCategoriesQuery.error,
  }
}
