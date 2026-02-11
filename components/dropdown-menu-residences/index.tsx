'use client'

import { cn } from '@/lib/utils'
import { forwardRef, useImperativeHandle } from 'react'

import { IconHome } from '@/components/icons'

interface ResidenceOption {
  id: string
  label: string
  disabled?: boolean
}

interface ResidenceTypeSelectorProps {
  title: string
  selectedValues?: string[]
  options: ResidenceOption[]
  onChange?: (ids: string[]) => void
  className?: string
}

export interface ResidenceTypeSelectorRef {
  reset: () => void
}

export const DropdownMenuCheckboxesResidences = forwardRef<
  ResidenceTypeSelectorRef,
  ResidenceTypeSelectorProps
>(({ title, selectedValues = [], options, onChange, className }, ref) => {
  const handleOptionClick = (id: string) => {
    if (onChange) {
      const currentValues = selectedValues || []
      const isSelected = currentValues.includes(id)

      let newValues: string[]
      if (isSelected) {
        // Remove the id from the array
        newValues = currentValues.filter(value => value !== id)
      } else {
        // Add the id to the array
        newValues = [...currentValues, id]
      }

      onChange(newValues)
    }
  }

  useImperativeHandle(ref, () => ({
    reset: () => {
      // Reset to no selection
      onChange?.([])
    },
  }))

  return (
    <div className={cn('space-y-8', className)}>
      <article className='font-primary text-lg font-[400] text-white'>
        {title}
      </article>
      <div className='flex flex-wrap gap-3'>
        {options.map(option => {
          const isSelected = (selectedValues || []).includes(option.id)
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={option.disabled}
              className={cn(
                'flex min-w-[80px] cursor-pointer flex-col items-center justify-center rounded-lg p-4 transition-all duration-200',
                {
                  'bg-white text-bricky-brick': isSelected,
                  'border border-white/30 text-white hover:border-bricky-brick-light/80':
                    !isSelected,
                }
              )}
              aria-label={`Select ${option.label}`}
              type='button'
            >
              <span className='mb-2 flex h-6 w-6 items-center justify-center'>
                <IconHome fill={isSelected ? '#8B2635' : '#fff'} />
              </span>
              <span className='text-sm font-medium tracking-wide'>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
})

DropdownMenuCheckboxesResidences.displayName =
  'DropdownMenuCheckboxesResidences'
