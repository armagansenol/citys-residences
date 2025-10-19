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
          <h3 className='font-primary text-lg font-[400] text-white'>
            {title}
          </h3>
        )}
        <div className='flex flex-wrap gap-5'>
          {options.map(option => {
            const isSelected = (selectedValues || []).includes(option.id)
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={option.disabled}
                className={cn(
                  'flex h-24 w-24 flex-shrink-0 cursor-pointer flex-col items-center justify-between rounded-lg px-1 py-4 transition-all duration-200',
                  {
                    'bg-white text-bricky-brick': isSelected,
                    'border border-tangerine-flake text-white hover:border-bricky-brick-light/80':
                      !isSelected,
                  }
                )}
                aria-label={`Select ${option.label}`}
                type='button'
              >
                <div className='mb-2 flex h-6 w-6 items-center justify-center'>
                  {/* <IconHome fill={isSelected ? '#8B2635' : '#fff'} /> */}
                  {option.icon}
                </div>
                <span
                  className={cn(
                    'font-[300] leading-tight tracking-wide',
                    textSize === 'sm'
                      ? 'text-[0.7rem]'
                      : textSize === 'md'
                        ? 'text-[0.8rem]'
                        : 'text-[1.1rem]'
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
