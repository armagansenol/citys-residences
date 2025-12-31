'use client'

import React, { useEffect, useRef } from 'react'
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone'
import { useLocale, useMessages, useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PhoneInputProps {
  value: string
  onChange: (phone: string) => void
  onCountryChange?: (dialCode: string) => void
  phoneInputRef?: React.Ref<HTMLInputElement>
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onCountryChange,
  phoneInputRef,
}) => {
  const messages = useMessages()
  const t = useTranslations('contact.form.inputs.phone')
  const locale = useLocale()

  const phoneInput = usePhoneInput({
    defaultCountry: 'tr',
    disableDialCodeAndPrefix: true,
    value,
    onChange: (data: { phone: string; country: { dialCode: string } }) => {
      onChange(data.phone)
      if (onCountryChange) {
        onCountryChange(`+${data.country.dialCode}`)
      }
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)

  // Helper function to get country name with fallback
  const getCountryName = React.useCallback(
    (iso2: string, fallbackName: string): string => {
      try {
        // Access the countries messages directly
        const messagesObj = messages as Record<string, unknown>
        const countriesMessages = messagesObj?.countries as
          | Record<string, string>
          | undefined

        const lookupKey = iso2.toUpperCase()
        if (countriesMessages && countriesMessages[lookupKey]) {
          return countriesMessages[lookupKey]
        }
        return fallbackName
      } catch {
        return fallbackName
      }
    },
    [messages]
  )

  useEffect(() => {
    if (phoneInput.inputRef && inputRef.current) {
      phoneInput.inputRef.current = inputRef.current
    }
  }, [inputRef, phoneInput.inputRef])

  // Set initial country code
  useEffect(() => {
    if (onCountryChange && phoneInput.country.dialCode) {
      onCountryChange(`+${phoneInput.country.dialCode}`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sortedCountries = React.useMemo(() => {
    const list = [...defaultCountries].map(c => {
      const country = parseCountry(c)
      return {
        ...country,
        localizedName: getCountryName(country.iso2, country.name.toString()),
        raw: c,
      }
    })

    return list.sort((a, b) => {
      if (a.iso2 === 'tr') return -1
      if (b.iso2 === 'tr') return 1
      return a.localizedName.localeCompare(b.localizedName, locale)
    })
  }, [getCountryName, locale])

  const countryOptions = (
    <>
      {sortedCountries.map((country, index) => {
        const isTurkey = country.iso2 === 'tr'

        return (
          <React.Fragment key={`${index}-${country.iso2}-${country.dialCode}`}>
            <SelectItem
              className='cursor-pointer px-4 py-2 font-primary text-base focus:bg-neutral-50 focus:text-neutral-950 bt:text-sm'
              value={country.iso2}
            >
              {`${country.localizedName} (+${country.dialCode.toString()})`}
            </SelectItem>
            {isTurkey && <SelectSeparator className='bg-neutral-200' />}
          </React.Fragment>
        )
      })}
    </>
  )

  return (
    <div className='flex items-center'>
      <Select
        name='countryCode'
        onValueChange={value => {
          const selectedCountry = defaultCountries.find(
            c => parseCountry(c).iso2 === value
          )
          if (selectedCountry) {
            phoneInput.setCountry(selectedCountry[1].toLowerCase())
            if (onCountryChange) {
              const country = parseCountry(selectedCountry)
              onCountryChange(`+${country.dialCode}`)
            }
          }
        }}
        value={phoneInput.country.iso2}
      >
        <SelectTrigger
          className={cn(
            'h-12 w-12 lg:h-14 lg:w-16 xl:h-14',
            'cursor-pointer rounded-none border-b border-white font-[300]',
            'text-white placeholder:text-white/90',
            'text-sm lg:text-sm 2xl:text-lg',
            '[&>svg]:size-4 [&>svg]:text-white',
            'p-0'
          )}
        >
          <SelectValue placeholder={t('code')}>
            +{phoneInput.country.dialCode}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className='z-[500] rounded-none border border-white bg-white text-neutral-950'>
          <SelectGroup>{countryOptions}</SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className={cn(
          'h-12 lg:h-14 xl:h-14',
          'rounded-none border-b border-white font-[300]',
          'text-white placeholder:text-tangerine-flake',
          'placeholder:text-sm xl:placeholder:text-sm 2xl:placeholder:text-lg',
          'text-sm lg:text-sm xl:text-sm 2xl:text-lg',
          'pl-2'
        )}
        placeholder={
          phoneInput.country.format?.toString().replace(/\S/g, 'X') ||
          t('placeholder')
        }
        type='tel'
        value={phoneInput.inputValue}
        onChange={phoneInput.handlePhoneValueChange}
        ref={phoneInputRef}
        name='phone'
        autoComplete='tel'
      />
    </div>
  )
}
