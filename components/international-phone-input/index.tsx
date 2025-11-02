'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load PhoneInput component to avoid loading libphonenumber.js on initial page load
const PhoneInput = dynamic(
  () => import('./phone-input').then(mod => ({ default: mod.PhoneInput })),
  {
    ssr: false, // Client-only
    loading: () => (
      <div className='flex h-12 items-center border-b border-white lg:h-14 xl:h-14'>
        <div className='h-12 w-12 animate-pulse border-b border-white bg-white/10 lg:h-14 lg:w-16 xl:h-14' />
        <div className='ml-1 h-12 flex-1 animate-pulse border-b border-white bg-white/10 lg:h-14 xl:h-14' />
      </div>
    ),
  }
)

export interface InternationalPhoneInputProps {
  form: UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function InternationalPhoneInputComponent({
  form,
}: InternationalPhoneInputProps) {
  const t = useTranslations('contact')
  return (
    <FormField
      control={form.control}
      name='phone'
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className='block text-sm font-[400] text-white lg:text-sm 2xl:text-lg'
            htmlFor='phone'
          >
            {t('form.inputs.phone.label')}
          </FormLabel>
          <FormControl>
            <Suspense
              fallback={
                <div className='flex h-12 items-center border-b border-white lg:h-14 xl:h-14'>
                  <div className='h-12 w-12 animate-pulse border-b border-white bg-white/10 lg:h-14 lg:w-16 xl:h-14' />
                  <div className='ml-1 h-12 flex-1 animate-pulse border-b border-white bg-white/10 lg:h-14 xl:h-14' />
                </div>
              }
            >
              <PhoneInput
                value={field.value}
                onChange={phone => field.onChange(phone)}
                onCountryChange={dialCode => {
                  form.setValue('countryCode', dialCode)
                }}
                phoneInputRef={field.ref}
              />
            </Suspense>
          </FormControl>
          <FormMessage className='text-tangerine-flake' />
        </FormItem>
      )}
    />
  )
}
