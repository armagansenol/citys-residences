'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterData } from '@/lib/utils/filter-utils'
import { Category, Floor, SubCategory } from '@/types'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

interface FilterFormProps {
  form: UseFormReturn<FilterData>
  categories?: Category[]
  subCategories?: SubCategory[]
  floors?: Floor[]
  onCategoryChange?: (categoryId: string) => void
  isLoading?: boolean
}

const defaultSelectTriggerClasses =
  'px-4 pt-10 pb-4 bg-white text-gray-700 font-primary text-sm lg:text-lg bg-slate-100 rounded-none flex-1 w-full [&>svg]:text-bricky-brick'

export function FilterForm({
  form,
  categories = [],
  subCategories = [],
  floors = [],
  onCategoryChange,
  isLoading = false,
}: FilterFormProps) {
  const floorValue = form.watch('floor')
  const [searchValue, setSearchValue] = useState('')

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      form.setValue('keyword', searchValue)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchValue, form])
  const handleCategoryChange = (categoryId: string) => {
    // Always reset subcategory when category changes
    form.setValue('subCategory', '')

    if (categoryId && categoryId !== 'all') {
      onCategoryChange?.(categoryId)
    } else {
      // When "all" is selected, set subcategory to "all" as well
      form.setValue('subCategory', 'all')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={e => e.preventDefault()}
        className='mb-12 flex flex-col gap-8'
      >
        <div className='grid grid-cols-24 gap-4'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='relative col-span-8'>
                <FormLabel className='absolute left-4 top-5 block font-primary text-base font-[400] leading-none text-gray-700'>
                  Kategori
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={value => {
                      field.onChange(value)
                      handleCategoryChange(value)
                    }}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue placeholder='Tüm Kategoriler'>
                        {field.value === 'all' || !field.value
                          ? 'Tüm Kategoriler'
                          : categories.find(
                              category => category.id.toString() === field.value
                            )?.title || 'Tüm Kategoriler'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Tüm Kategoriler</SelectItem>
                      {categories.map(category => (
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
            name='subCategory'
            render={({ field }) => (
              <FormItem className='relative col-span-8'>
                <FormLabel className='absolute left-4 top-5 block font-primary text-base font-[400] leading-none text-gray-700'>
                  Alt Kategori
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={value => {
                      field.onChange(value)
                    }}
                    value={field.value}
                    disabled={
                      !form.getValues('category') ||
                      form.getValues('category') === 'all' ||
                      isLoading
                    }
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue
                        placeholder={
                          !form.getValues('category') ||
                          form.getValues('category') === 'all'
                            ? 'Seçiniz'
                            : 'Seçiniz'
                        }
                      >
                        {field.value === 'all' || !field.value
                          ? 'Alt Kategoriler'
                          : subCategories.find(
                              subCategory =>
                                subCategory.id.toString() === field.value
                            )?.title || 'Seçiniz'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Tüm Alt Kategoriler</SelectItem>
                      {subCategories.map(subCategory => (
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
            name='floor'
            render={({ field }) => (
              <FormItem className='relative col-span-8'>
                <FormLabel className='absolute left-4 top-5 block font-primary text-base font-[400] leading-none text-gray-700'>
                  Katlar
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={value => {
                      field.onChange(value)
                    }}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className={defaultSelectTriggerClasses}>
                      <SelectValue placeholder='Tüm Katlar'>
                        {(() => {
                          if (floorValue === 'all' || !floorValue) {
                            return 'Tüm Katlar'
                          }
                          const selectedFloor = floors.find(
                            floor => floor.id.toString() === floorValue
                          )
                          return selectedFloor
                            ? selectedFloor.title
                            : 'Tüm Katlar'
                        })()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Tüm Katlar</SelectItem>
                      {floors.map(floor => (
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
        </div>
        <div className='lg:col-span-20 lg:col-start-3'>
          <FormField
            control={form.control}
            name='keyword'
            render={() => (
              <FormItem>
                <FormControl>
                  <div className='relative h-16 w-full'>
                    <div className='pointer-events-none absolute bottom-0 right-0 top-0 flex h-full items-center justify-center text-bricky-brick'>
                      <MagnifyingGlassIcon size={24} />
                    </div>
                    <Input
                      value={searchValue}
                      placeholder='Mağaza arayın'
                      className={cn(
                        'h-full rounded-none border-x-0 border-b border-t-0 border-bricky-brick font-primary font-[300] text-bricky-brick placeholder:text-lg placeholder:text-bricky-brick'
                      )}
                      onChange={e => {
                        const newValue = e.target.value
                        setSearchValue(newValue)

                        // If something is typed in search, reset all other filters
                        if (newValue.trim()) {
                          form.setValue('category', 'all')
                          form.setValue('subCategory', 'all')
                          form.setValue('floor', 'all')
                          // Call onCategoryChange to trigger any necessary updates
                          onCategoryChange?.('all')
                        }
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
