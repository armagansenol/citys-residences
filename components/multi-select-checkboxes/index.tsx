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
  textClassName?: string
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
      textClassName,
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
      <div className={cn('space-y-2.5 lg:space-y-5', className)}>
        {title && (
          <label className='font-primary text-base font-[400] text-white lg:text-sm xl:text-lg 2xl:text-lg'>
            {title}
          </label>
        )}
        <div className='flex flex-wrap justify-start gap-2 xl:gap-2.5 2xl:gap-3.5'>
          {options.map(option => {
            const isSelected = (selectedValues || []).includes(option.id)
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={option.disabled}
                className={cn(
                  'flex flex-shrink-0 flex-col items-center justify-start gap-1.5 xl:gap-0.5 2xl:gap-1',
                  'size-[80px] lg:size-[5.25rem] xl:size-[5rem] 2xl:size-[6rem] 3xl:size-[6.85rem]',
                  'cursor-pointer rounded-md px-0.5 py-3.5 xl:py-4 2xl:py-4 3xl:py-5',
                  'transition-all duration-200',
                  'outline-none focus:outline-none focus-visible:outline-none',
                  'select-none active:scale-95',
                  'touch-manipulation',
                  {
                    'bg-white text-bricky-brick': isSelected,
                    'border border-tangerine-flake text-white hover:border-tangerine-flake/40':
                      !isSelected,
                  }
                )}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label={`Select ${option.label}`}
                type='button'
              >
                <span className='flex flex-col items-center justify-center gap-1'>
                  {option.icon}
                  <span
                    className={cn(
                      'font-[300]',
                      textClassName,
                      textSize === 'sm' &&
                        'text-[0.6rem]/[1.1] lg:text-[1.1rem]/[1.1] xl:text-sm/tight 2xl:text-sm/tight 3xl:text-sm/tight',
                      textSize === 'md' &&
                        'text-[0.7rem]/[1.1] lg:text-[0.7rem]/[1.1] xl:text-[0.7rem]/[1.1] 2xl:text-sm/tight 3xl:text-base/tight',
                      textSize === 'lg' &&
                        'text-[1rem]/[1.1] lg:text-[1.1rem]/[1.1] xl:text-sm/tight 2xl:text-[1.15rem]/tight 3xl:text-[1.25rem]/tight'
                    )}
                  >
                    {option.label}
                  </span>
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
