'use client'

import React, { useEffect, useRef } from 'react'
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone'
import { useMessages } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectGroup,
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
  const getCountryName = (iso2: string, fallbackName: string): string => {
    try {
      // Access the countries messages directly
      const messagesObj = messages as Record<string, unknown>
      const countriesMessages = messagesObj?.countries as
        | Record<string, string>
        | undefined
      if (countriesMessages && countriesMessages[iso2]) {
        return countriesMessages[iso2]
      }
      return fallbackName
    } catch {
      return fallbackName
    }
  }

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

  const countryOptions = (
    <>
      {defaultCountries.map((c, index) => {
        const country = parseCountry(c)
        // Get localized country name, fallback to original name if translation not found
        const localizedCountryName = getCountryName(
          country.iso2,
          country.name.toString()
        )
        return (
          <SelectItem
            className='cursor-pointer px-4 py-2 font-primary text-base focus:bg-neutral-50 focus:text-neutral-950 bt:text-sm'
            key={`${index}-${country.iso2}-${country.dialCode}`}
            value={country.iso2}
          >
            {`${localizedCountryName} (+${country.dialCode.toString()})`}
          </SelectItem>
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
        <SelectTrigger className='h-14 w-24 cursor-pointer rounded-none border-b border-white text-sm font-[300] text-white/90 placeholder:text-white/90 lg:text-sm xl:h-12 2xl:h-14 2xl:text-lg'>
          <SelectValue placeholder='Code'>
            +{phoneInput.country.dialCode}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className='z-[500] rounded-none border border-white bg-white text-neutral-950'>
          <SelectGroup>{countryOptions}</SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className={cn(
          'rounded-none border-b border-white font-[300] placeholder:text-tangerine-flake',
          'placeholder:text-sm xl:placeholder:text-sm 2xl:placeholder:text-lg',
          'lg:text-sm xl:text-sm 2xl:text-lg'
        )}
        placeholder={
          phoneInput.country.format?.toString().replace(/\S/g, 'X') ||
          'XXXXXXXXXX'
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
