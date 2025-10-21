'use client'

import { cn } from '@/lib/utils'
import { forwardRef, useImperativeHandle } from 'react'

interface CheckboxOption {
  id: string
  label: string
  disabled?: boolean
  icon: React.ReactNode
}

interface MultiSelectCheckboxesProps {
  title?: string
  selectedValues?: string[]
  options: CheckboxOption[]
  onChange?: (ids: string[]) => void
  className?: string
  textSize?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export interface MultiSelectCheckboxesRef {
  reset: () => void
}

export const MultiSelectCheckboxes = forwardRef<
  MultiSelectCheckboxesRef,
  MultiSelectCheckboxesProps
>(
  (
    {
      title,
      selectedValues = [],
      options,
      onChange,
      className,
      textSize = 'md',
    },
    ref
  ) => {
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
      <div className={cn('space-y-5', className)}>
        {title && (
          <h3 className='font-primary text-lg font-[300] text-white lg:text-sm 2xl:text-lg'>
            {title}
          </h3>
        )}
        <div className='flex flex-wrap justify-between lg:justify-start xl:gap-2.5 2xl:gap-3.5'>
          {options.map(option => {
            const isSelected = (selectedValues || []).includes(option.id)
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={option.disabled}
                className={cn(
                  'flex size-16 flex-shrink-0 cursor-pointer flex-col items-center justify-between rounded-md px-1 transition-all duration-200 lg:size-8 xl:size-20 xl:py-4 2xl:size-[6rem] 2xl:py-5 3xl:size-[6.5rem]',
                  {
                    'bg-white text-bricky-brick': isSelected,
                    'border border-tangerine-flake text-white hover:border-tangerine-flake/40 hover:bg-white/10':
                      !isSelected,
                  }
                )}
                aria-label={`Select ${option.label}`}
                type='button'
              >
                <div className='mb-1 flex items-center justify-center'>
                  {option.icon}
                </div>
                <span
                  className={cn(
                    'font-[300]',
                    textSize === 'sm' &&
                      'text-[0.7rem] xl:text-sm 2xl:text-base',
                    textSize === 'md' &&
                      'text-[0.8rem] xl:text-[0.7rem]/[1.1] 2xl:text-[0.8rem]/[1.1]',
                    textSize === 'lg' &&
                      'text-[1.1rem] xl:text-sm 2xl:text-base'
                  )}
                >
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

MultiSelectCheckboxes.displayName = 'MultiSelectCheckboxes'
