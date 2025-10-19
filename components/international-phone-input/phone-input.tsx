import React, { useEffect, useRef } from 'react'
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface PhoneInputProps {
  value: string
  onChange: (phone: string) => void
  phoneInputRef?: React.Ref<HTMLInputElement>
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  phoneInputRef,
}) => {
  const phoneInput = usePhoneInput({
    defaultCountry: 'tr',
    disableDialCodeAndPrefix: true,
    value,
    onChange: (data: { phone: string }) => {
      onChange(data.phone)
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (phoneInput.inputRef && inputRef.current) {
      phoneInput.inputRef.current = inputRef.current
    }
  }, [inputRef, phoneInput.inputRef])

  const countryOptions = (
    <>
      {defaultCountries.map((c, index) => {
        const country = parseCountry(c)
        return (
          <SelectItem
            className='cursor-pointer px-4 py-2 font-primary text-base focus:bg-neutral-50 focus:text-neutral-950 bt:text-sm'
            key={`${index}-${country.iso2}-${country.dialCode}`}
            value={country.iso2}
          >
            {`${country.name.toString()} (+${country.dialCode.toString()})`}
            {/* {parseCountry(c).dialCode.toString()} */}
          </SelectItem>
        )
      })}
    </>
  )

  return (
    <div className='flex items-center'>
      <Select
        onValueChange={value => {
          const selectedCountry = defaultCountries.find(
            c => parseCountry(c).iso2 === value
          )
          if (selectedCountry) {
            phoneInput.setCountry(selectedCountry[1].toLowerCase())
          }
        }}
        value={phoneInput.country.iso2}
      >
        <SelectTrigger className='h-14 w-24 cursor-pointer rounded-none border-b border-white text-lg font-[300] text-tangerine-flake placeholder:text-tangerine-flake'>
          <SelectValue placeholder='Code'>
            +{phoneInput.country.dialCode}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className='z-[500] rounded-none border border-white bg-white text-neutral-950'>
          <SelectGroup>{countryOptions}</SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className='h-14 rounded-none border-b border-white text-lg text-white placeholder:text-lg placeholder:text-tangerine-flake'
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
