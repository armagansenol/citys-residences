"use client"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const filterSchema = z.object({
  category: z.string().optional(),
  restaurant: z.string().optional(),
  floor: z.string().optional(),
  search: z.string().optional(),
})

type FilterFormValues = z.infer<typeof filterSchema>

interface FilterFormProps {
  onFilter?: (data: FilterFormValues) => void
}

const baseSelectTriggerClasses = "px-4 py-3 bg-white text-gray-700 font-primary text-sm lg:text-base min-w-[200px]"
const defaultSelectTriggerClasses = `${baseSelectTriggerClasses} border border-bricky-brick rounded-md flex-1 w-full`

export function FilterForm({ onFilter }: FilterFormProps) {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: "",
      restaurant: "",
      floor: "",
      search: "",
    },
  })

  const onSubmit = (data: FilterFormValues) => {
    console.log("Filter data:", data)
    onFilter?.(data)
  }

  const handleValueChange = () => {
    const currentValues = form.getValues()
    onFilter?.(currentValues)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-4 mb-8 lg:mb-12">
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
                      handleValueChange()
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue placeholder="Tüm Kategoriler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alisveris">Alışveriş</SelectItem>
                      <SelectItem value="yemeIcme">Yeme & İçme</SelectItem>
                      <SelectItem value="hizmet">Hizmetler</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="restaurant"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleValueChange()
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue placeholder="Tüm Restoranlar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restoran">Restoran</SelectItem>
                      <SelectItem value="kafe">Kafe</SelectItem>
                      <SelectItem value="fastfood">Fast Food</SelectItem>
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
                      handleValueChange()
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue placeholder="Tüm Katlar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ground">Zemin Kat</SelectItem>
                      <SelectItem value="upper">Birinci Kat</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
                      <Search size={16} strokeWidth={2} />
                    </button>
                    <Input
                      {...field}
                      placeholder="Ara"
                      className={cn(
                        defaultSelectTriggerClasses,
                        "pl-10 w-full h-12 border-b border-bricky-brick rounded-none"
                      )}
                      onChange={(e) => {
                        field.onChange(e)
                        const timeoutId = setTimeout(() => {
                          handleValueChange()
                        }, 300)
                        return () => clearTimeout(timeoutId)
                      }}
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
