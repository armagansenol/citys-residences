"use client"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FilterData } from "@/lib/utils/filter-utils"
import { Category, Floor, SubCategory } from "@/types"
import { Search } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

interface FilterFormProps {
  form: UseFormReturn<FilterData>
  categories?: Category[]
  subCategories?: SubCategory[]
  floors?: Floor[]
  onCategoryChange?: (categoryId: string) => void
  isLoading?: boolean
}

const baseSelectTriggerClasses = "px-4 py-3 bg-white text-gray-700 font-primary text-sm lg:text-base min-w-[200px]"
const defaultSelectTriggerClasses = `${baseSelectTriggerClasses} border border-bricky-brick rounded-md flex-1 w-full [&>svg]:text-bricky-brick`

export function FilterForm({
  form,
  categories = [],
  subCategories = [],
  floors = [],
  onCategoryChange,
  isLoading = false,
}: FilterFormProps) {
  const floorValue = form.watch("floor")
  const handleCategoryChange = (categoryId: string) => {
    // Always reset subcategory when category changes
    form.setValue("subCategory", "")

    if (categoryId && categoryId !== "all") {
      onCategoryChange?.(categoryId)
    } else {
      // When "all" is selected, set subcategory to "all" as well
      form.setValue("subCategory", "all")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col lg:flex-row gap-4 mb-8 lg:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleCategoryChange(value)
                    }}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue placeholder="Tüm Kategoriler">
                        {field.value === "all" || !field.value
                          ? "Tüm Kategoriler"
                          : categories.find((category) => category.id.toString() === field.value)?.title ||
                            "Tüm Kategoriler"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Kategoriler</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    value={field.value}
                    disabled={!form.getValues("category") || form.getValues("category") === "all" || isLoading}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue
                        placeholder={
                          !form.getValues("category") || form.getValues("category") === "all"
                            ? "Önce kategori seçin"
                            : "Alt Kategoriler"
                        }
                      >
                        {field.value === "all" || !field.value
                          ? "Alt Kategoriler"
                          : subCategories.find((subCategory) => subCategory.id.toString() === field.value)?.title ||
                            "Alt Kategoriler"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Alt Kategoriler</SelectItem>
                      {subCategories.map((subCategory) => (
                        <SelectItem key={subCategory.id} value={subCategory.id}>
                          {subCategory.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue placeholder="Tüm Katlar">
                        {(() => {
                          if (floorValue === "all" || !floorValue) {
                            return "Tüm Katlar"
                          }
                          const selectedFloor = floors.find((floor) => floor.id.toString() === floorValue)
                          return selectedFloor ? selectedFloor.title : "Tüm Katlar"
                        })()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Katlar</SelectItem>
                      {floors.map((floor) => (
                        <SelectItem key={floor.id} value={floor.id}>
                          {floor.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full h-12">
                    <button type="button" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
                      <Search className="text-black" size={16} strokeWidth={3} />
                    </button>
                    <Input
                      {...field}
                      placeholder="Marka ara..."
                      className={cn(
                        defaultSelectTriggerClasses,
                        "pl-10 h-full border-t-0 border-x-0 rounded-none border-b border-bricky-brick text-black placeholder:text-black"
                      )}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
