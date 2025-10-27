'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { PhoneInput } from './phone-input'
import { useTranslations } from 'next-intl'

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
            className='block text-sm font-[300] text-white lg:text-sm 2xl:text-lg'
            htmlFor='phone'
          >
            {t('form.inputs.phone.label')}
          </FormLabel>
          <FormControl>
            <PhoneInput
              value={field.value}
              onChange={phone => field.onChange(phone)}
              onCountryChange={dialCode => {
                form.setValue('countryCode', dialCode)
              }}
              phoneInputRef={field.ref}
            />
          </FormControl>
          <FormMessage className='text-white' />
        </FormItem>
      )}
    />
  )
}
