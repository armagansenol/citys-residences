'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon, CaretDownIcon } from '@phosphor-icons/react'
import * as React from 'react'

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  priorityOptions?: ComboboxOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  disabled?: boolean
}

export function Combobox({
  options,
  priorityOptions = [],
  value,
  onValueChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  triggerClassName,
  contentClassName,
  itemClassName,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const filteredOptions = React.useMemo(() => {
    return options.filter(option =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [options, search])

  const filteredPriorityOptions = React.useMemo(() => {
    return priorityOptions.filter(option =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [priorityOptions, search])

  const selectedOption = React.useMemo(() => {
    const allOptions = [...priorityOptions, ...options]
    return allOptions.find(opt => opt.value === value)
  }, [options, priorityOptions, value])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <button
          type='button'
          className={cn(
            'flex h-12 w-full items-center justify-between bg-transparent transition-colors lg:h-14 xl:h-14',
            'rounded-none border-b border-white font-[300]',
            'text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            'text-sm lg:text-sm xl:text-sm 2xl:text-lg',
            triggerClassName
          )}
        >
          <span
            className={cn(
              'truncate',
              !selectedOption && 'text-tangerine-flake'
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <CaretDownIcon
            className='ml-2 size-6 flex-shrink-0'
            weight='regular'
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'z-[500] max-h-60 min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-hidden rounded-none border border-white bg-white text-black shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          contentClassName
        )}
        align='start'
      >
        <div className='flex items-center border-b border-gray-100 px-3 py-2'>
          <MagnifyingGlassIcon className='mr-2 size-4 opacity-50' />
          <input
            className='flex h-8 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className='max-h-60 overflow-y-auto p-1' data-lenis-prevent>
          {filteredPriorityOptions.length > 0 && (
            <div className='mb-2'>
              {filteredPriorityOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => {
                    onValueChange(option.value)
                    setOpen(false)
                    setSearch('')
                  }}
                  className={cn(
                    'relative flex w-full cursor-pointer select-none items-center rounded-none py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-neutral-100 focus:bg-neutral-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    itemClassName
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
              <div className='my-1 border-t border-gray-100' />
            </div>
          )}

          {filteredOptions.length === 0 &&
          filteredPriorityOptions.length === 0 ? (
            <div className='py-6 text-center text-sm'>{emptyMessage}</div>
          ) : (
            filteredOptions.map(option => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => {
                  onValueChange(option.value)
                  setOpen(false)
                  setSearch('')
                }}
                className={cn(
                  'relative flex w-full cursor-pointer select-none items-center rounded-none py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-neutral-100 focus:bg-neutral-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  itemClassName
                )}
              >
                {option.label}
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
