'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CalendarPlusIcon,
  ChatCenteredTextIcon,
  DeviceMobileCameraIcon,
  EnvelopeOpenIcon,
  HouseSimpleIcon,
  PresentationIcon,
  StorefrontIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormStatusMessage } from '@/components/form-status-message'
import { InternationalPhoneInputComponent } from '@/components/international-phone-input'
import {
  MultiSelectCheckboxes,
  MultiSelectCheckboxesRef,
} from '@/components/multi-select-checkboxes'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Combobox, ComboboxOption } from '@/components/ui/combobox'
import { Link } from '@/components/utility/link'
import { submitContactForm } from '@/lib/api/submit-contact-form'
import { cn, isPhoneValid } from '@/lib/utils'
import { FormTranslations } from '@/types'

interface CountryData {
  isoCode: string
  name: string
}

interface StateData {
  isoCode: string
  name: string
  countryCode: string
}

const getFormSchema = (translations: FormTranslations) => {
  // Ensure contactPreference exists with fallback
  const contactPreferenceTranslations = translations?.inputs
    ?.contactPreference || {
    placeholder: 'Preferred Contact Method',
    errors: { required: 'Required field' },
  }

  return z.object({
    name: z
      .string()
      .min(2, { message: translations.inputs.name.errors.required }),
    surname: z
      .string()
      .min(2, { message: translations.inputs.surname.errors.required }),
    countryCode: z.string(),
    phone: z
      .string()
      .min(1, { message: translations.inputs.phone.errors.required })
      .refine(
        val => {
          if (!val || val.trim() === '') return false
          return isPhoneValid(val)
        },
        { message: translations.inputs.phone.errors.required }
      ),
    email: z
      .string()
      .min(1, { message: translations.inputs.email.errors.required })
      .email({ message: translations.inputs.email.errors.email }),
    country: z
      .string()
      .min(1, { message: translations.inputs.country.errors.required }),
    city: z
      .string()
      .min(1, { message: translations.inputs.city.errors.required }),
    residenceType: z
      .string()
      .min(1, { message: translations.inputs.residenceType.errors.required }),
    howDidYouHearAboutUs: z.string().min(1, {
      message: translations.inputs.howDidYouHearAboutUs.errors.required,
    }),
    profession: z.string().optional(),
    contactPreference: z
      .string()
      .min(1, { message: contactPreferenceTranslations.errors.required }),
    consent: z.boolean().refine(data => data === true, {
      message: translations.inputs.consent.errors.required,
    }),
    consentElectronicMessage: z.boolean().refine(data => data === true, {
      message: translations.inputs.consentElectronicMessage.errors.required,
    }),
  })
}

export type FormValues = z.infer<ReturnType<typeof getFormSchema>>

interface FormInputProps {
  name: keyof FormValues
  control: Control<FormValues>
  placeholder: string
  type?: string
  className?: string
  label: string
}

const FormInput = ({
  name,
  control,
  placeholder,
  label,
  type = 'text',
  className,
}: FormInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className='block font-[400] leading-none text-white lg:text-sm 2xl:text-lg'>
          {label}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value?.toString() ?? ''}
            className={cn(
              'h-12 lg:h-14 xl:h-14',
              'rounded-none border-b border-white font-[300]',
              'text-white placeholder:text-tangerine-flake',
              'placeholder:text-sm xl:placeholder:text-sm 2xl:placeholder:text-lg',
              'text-sm lg:text-sm xl:text-sm 2xl:text-lg',
              className
            )}
            onChange={e => {
              const value = e.target.value
              if (name === 'name' || name === 'surname') {
                // Allow letters including Turkish characters
                const formattedValue = value.replace(
                  /[^a-zA-ZğĞıİöÖüÜşŞçÇ\s]/g,
                  ''
                )
                field.onChange(formattedValue)
              } else {
                field.onChange(value)
              }
            }}
          />
        </FormControl>
        <FormMessage className='text-tangerine-flake' />
      </FormItem>
    )}
  />
)

interface UseFormMessage {
  message: { type: 'success' | 'error'; text: string } | null
  showMessage: (type: 'success' | 'error', text: string) => void
  clearMessage: () => void
}

const useFormMessage = (timeout = 5000): UseFormMessage => {
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const clearMessage = useCallback(() => setMessage(null), [])

  const showMessage = useCallback(
    (type: 'success' | 'error', text: string) => {
      setMessage({ type, text })
      setTimeout(clearMessage, timeout)
    },
    [timeout, clearMessage]
  )

  return { message, showMessage, clearMessage }
}

interface FormContactProps {
  translations: FormTranslations
  countries: CountryData[]
  onSuccess?: () => void
}

export function ContactForm({
  translations,
  countries,
  onSuccess,
}: FormContactProps) {
  const { showMessage } = useFormMessage()
  const t = useTranslations()
  const locale = useLocale()

  // Track selected country code for fetching cities
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('')

  // Track if user has made their first interaction with residenceType
  // This is used to clear the default "2+1" on first user selection
  const [residenceTypeInitialized, setResidenceTypeInitialized] =
    useState<boolean>(false)

  // Fetch cities/states when country changes
  const { data: citiesData, isLoading: isCitiesLoading } = useQuery({
    queryKey: ['cities', selectedCountryCode],
    queryFn: async () => {
      if (!selectedCountryCode) return { states: [] }
      const response = await fetch(
        `/api/cities?countryCode=${selectedCountryCode}`
      )
      if (!response.ok) throw new Error('Failed to fetch cities')
      return response.json() as Promise<{ states: StateData[] }>
    },
    enabled: !!selectedCountryCode,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  // Localize and sort countries
  const localizedCountries = useMemo(() => {
    const displayNames = new Intl.DisplayNames([locale], { type: 'region' })
    return countries
      .map(country => ({
        ...country,
        localizedName: displayNames.of(country.isoCode) || country.name,
      }))
      .sort((a, b) => a.localizedName.localeCompare(b.localizedName, locale))
  }, [countries, locale])

  // Sort cities alphabetically
  const sortedCities = useMemo(() => {
    if (!citiesData?.states) return []
    return [...citiesData.states].sort((a, b) =>
      a.name.localeCompare(b.name, locale)
    )
  }, [citiesData?.states, locale])

  const residenceTypeDropdownRef = useRef<MultiSelectCheckboxesRef>(null)
  const howDidYouHearAboutUsDropdownRef = useRef<MultiSelectCheckboxesRef>(null)
  const contactPreferenceDropdownRef = useRef<MultiSelectCheckboxesRef>(null)

  const resetDropdowns = () => {
    residenceTypeDropdownRef.current?.reset()
    howDidYouHearAboutUsDropdownRef.current?.reset()
    contactPreferenceDropdownRef.current?.reset()
    setSelectedCountryCode('')
    setResidenceTypeInitialized(false)
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(translations)),
    defaultValues: {
      name: '',
      surname: '',
      countryCode: '',
      phone: '',
      email: '',
      country: '',
      city: '',
      residenceType: '2+1',
      howDidYouHearAboutUs: '',
      profession: '',
      contactPreference: '',
      consent: false,
      consentElectronicMessage: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const residenceTypeValue = form.watch('residenceType')
  const howDidYouHearAboutUsValue = form.watch('howDidYouHearAboutUs')
  const contactPreferenceValue = form.watch('contactPreference')

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      // Clean phone number - remove country code if it was somehow included
      let cleanPhone = data.phone

      // If phone starts with the country code, remove it
      if (data.countryCode && cleanPhone.startsWith(data.countryCode)) {
        cleanPhone = cleanPhone.slice(data.countryCode.length).trim()
      }
      // Also handle case where phone starts with + followed by country code
      else if (
        data.countryCode &&
        cleanPhone.startsWith(`+${data.countryCode.replace('+', '')}`)
      ) {
        cleanPhone = cleanPhone.slice(data.countryCode.length).trim()
      }

      const cleanedData = {
        ...data,
        phone: cleanPhone,
      }

      const result = await submitContactForm(cleanedData, locale)
      return result
    },
    onSuccess: result => {
      if (result.success) {
        resetDropdowns()
        form.reset()
        form.clearErrors()
        showMessage('success', 'Form submitted successfully')
        onSuccess?.()
      } else {
        showMessage('error', result.message)
      }
    },
    onError: (error: unknown) => {
      console.error('Form submission error:', error)

      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          showMessage('error', 'Network error occurred')
        } else {
          showMessage('error', error.message)
        }
      } else {
        showMessage('error', 'An unexpected error occurred')
      }

      // Clear error message after 5 seconds
      setTimeout(() => {
        showMessage('error', '')
      }, 5000)
    },
  })

  const iconSize = 'size-6 xl:size-6 2xl:size-7 3xl:size-8'

  const residenceTypeOptions = useMemo(() => {
    const selectedLabels = residenceTypeValue
      ? residenceTypeValue.split(',').map(label => label.trim())
      : []

    const createIcon = (label: string) => {
      const isSelected = selectedLabels.includes(label)
      return (
        <span className='relative inline-block'>
          <HouseSimpleIcon
            className={cn(
              iconSize,
              'transition-opacity duration-300',
              isSelected ? 'opacity-0' : 'opacity-100'
            )}
            weight='thin'
          />
          <HouseSimpleIcon
            className={cn(
              iconSize,
              'absolute inset-0 transition-opacity duration-300',
              isSelected ? 'opacity-100' : 'opacity-0'
            )}
            weight='fill'
          />
        </span>
      )
    }

    return [
      {
        id: '1+1',
        label: '1+1',
        icon: createIcon('1+1'),
      },
      {
        id: '2+1',
        label: '2+1',
        icon: createIcon('2+1'),
      },
      {
        id: '3+1',
        label: '3+1',
        icon: createIcon('3+1'),
      },
      {
        id: '3,5+1',
        label: '3.5+1',
        icon: createIcon('3.5+1'),
      },
      {
        id: '4+1',
        label: '4+1',
        icon: createIcon('4+1'),
      },
      {
        id: '4,5+1',
        label: '4.5+1',
        icon: createIcon('4.5+1'),
      },
      {
        id: '5+1',
        label: '5+1',
        icon: createIcon('5+1'),
      },
      {
        id: '5,5+1',
        label: '5.5+1',
        icon: createIcon('5.5+1'),
      },
    ]
  }, [residenceTypeValue])

  const howDidYouHearAboutUsOptions = useMemo(
    () => [
      {
        id: 'internetSocialMedia',
        label:
          translations.inputs.howDidYouHearAboutUs.options.internetSocialMedia,
        icon: <DeviceMobileCameraIcon className={iconSize} weight='thin' />,
      },
      {
        id: 'billboard',
        label: translations.inputs.howDidYouHearAboutUs.options.billboard,
        icon: <PresentationIcon className={iconSize} weight='thin' />,
      },

      {
        id: 'projectVisit',
        label: translations.inputs.howDidYouHearAboutUs.options.projectVisit,
        icon: <StorefrontIcon className={iconSize} weight='thin' />,
      },
      {
        id: 'reference',
        label: translations.inputs.howDidYouHearAboutUs.options.reference,
        icon: <UserIcon className={iconSize} weight='thin' />,
      },
    ],
    [translations.inputs.howDidYouHearAboutUs.options]
  )

  const contactPreferenceOptions = useMemo(
    () => [
      {
        id: 'sms',
        label: translations.inputs.contactPreferenceOptions?.sms,
        icon: <ChatCenteredTextIcon className={iconSize} weight='thin' />,
      },
      {
        id: 'email',
        label: translations.inputs.contactPreferenceOptions?.email,
        icon: <EnvelopeOpenIcon className={iconSize} weight='thin' />,
      },
      {
        id: 'phone',
        label: translations.inputs.contactPreferenceOptions?.phone,
        icon: <DeviceMobileCameraIcon className={iconSize} weight='thin' />,
      },
    ],
    [translations.inputs.contactPreferenceOptions]
  )

  const contactPreferenceTranslations = useMemo(
    () =>
      translations?.inputs?.contactPreference || {
        placeholder: 'Preferred Contact Method',
        errors: { required: 'Required field' },
      },
    [translations.inputs.contactPreference]
  )

  const handleConsentElectronicMessageChange = useCallback(
    (checked: boolean) => {
      form.setValue('consentElectronicMessage', checked)

      if (checked) {
        // If checked, select all Preferred Contact Method options
        const allContactPreferenceLabels = contactPreferenceOptions
          .map(opt => opt.label)
          .join(',')
        form.setValue('contactPreference', allContactPreferenceLabels, {
          shouldValidate: false,
        })
      } else {
        // If unchecked, clear all Preferred Contact Method options
        form.setValue('contactPreference', '', {
          shouldValidate: false,
        })
      }

      form.trigger('consentElectronicMessage')
      form.trigger('contactPreference')
    },
    [form, contactPreferenceOptions]
  )

  const handleResidenceType = useCallback(
    (ids: string[]) => {
      let finalIds = ids

      // On first user interaction, clear the default "2+1" selection
      // and only use what the user actually clicked
      if (!residenceTypeInitialized) {
        setResidenceTypeInitialized(true)
        // Find what the user clicked (the difference between new ids and default)
        // The default is "2+1", so we need to remove it from the selection
        // unless that's what the user explicitly clicked
        const defaultId = '2+1'
        const hadDefault = ids.includes(defaultId)
        const userClickedDefault = ids.length === 1 && ids[0] === defaultId

        if (hadDefault && !userClickedDefault) {
          // User clicked something other than the default, remove the default
          finalIds = ids.filter(id => id !== defaultId)
        } else if (!hadDefault) {
          // User clicked the default to toggle it off, keep it off
          finalIds = ids
        }
      }

      const selectedOptions = residenceTypeOptions.filter(opt =>
        finalIds.includes(opt.id)
      )
      const selectedLabels = selectedOptions.map(opt => opt.label).join(',')

      form.setValue('residenceType', selectedLabels, {
        shouldValidate: false,
      })

      form.trigger('residenceType')
    },
    [form, residenceTypeOptions, residenceTypeInitialized]
  )

  const handleHowDidYouHearAboutUs = useCallback(
    (ids: string[]) => {
      const selectedOptions = howDidYouHearAboutUsOptions.filter(opt =>
        ids.includes(opt.id)
      )
      const selectedLabels = selectedOptions.map(opt => opt.label).join(',')

      form.setValue('howDidYouHearAboutUs', selectedLabels, {
        shouldValidate: false,
      })

      form.trigger('howDidYouHearAboutUs')
    },
    [form, howDidYouHearAboutUsOptions]
  )

  const handleContactPreference = useCallback(
    (ids: string[]) => {
      const selectedOptions = contactPreferenceOptions.filter(opt =>
        ids.includes(opt.id)
      )
      const selectedLabels = selectedOptions.map(opt => opt.label).join(',')

      form.setValue('contactPreference', selectedLabels, {
        shouldValidate: false,
      })

      if (ids.length > 0) {
        // If at least one Preferred Contact Method is selected, check consentElectronicMessage
        form.setValue('consentElectronicMessage', true, {
          shouldValidate: false,
        })
      } else {
        // If all Preferred Contact Methods are unselected, uncheck consentElectronicMessage
        form.setValue('consentElectronicMessage', false, {
          shouldValidate: false,
        })
      }

      form.trigger('contactPreference')
      form.trigger('consentElectronicMessage')
    },
    [form, contactPreferenceOptions]
  )

  return (
    <>
      <Form {...form}>
        <form
          className='relative'
          onSubmit={form.handleSubmit(data => mutation.mutate(data))}
          noValidate
        >
          <div className='grid grid-cols-12 items-start gap-y-12 xl:grid-cols-24'>
            {/* name - surname - phone - email */}
            <div className='order-1 col-span-12 space-y-8 xl:col-span-15 xl:pr-20'>
              <div className='flex grid-flow-col flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-6'>
                <FormInput
                  label={translations.inputs.name.label}
                  control={form.control}
                  name='name'
                  placeholder={translations.inputs.name.placeholder}
                />
                <FormInput
                  label={translations.inputs.surname.label}
                  control={form.control}
                  name='surname'
                  placeholder={translations.inputs.surname.placeholder}
                />
              </div>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6'>
                <div className='col-span-1 flex flex-col gap-1'>
                  <InternationalPhoneInputComponent form={form} />
                </div>
                <div className='col-span-1'>
                  <FormInput
                    label={translations.inputs.email.label}
                    control={form.control}
                    name='email'
                    type='email'
                    placeholder={translations.inputs.email.placeholder}
                    className='col-span-1 lg:col-span-1'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6'>
                <div className='col-span-1'>
                  <FormInput
                    label={translations.inputs.profession.label}
                    control={form.control}
                    name='profession'
                    placeholder={translations.inputs.profession.placeholder}
                  />
                </div>
                <div className='col-span-1 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-4'>
                  <FormField
                    control={form.control}
                    name='country'
                    render={({ field }) => {
                      const turkeyCountry = localizedCountries.find(
                        c => c.isoCode === 'TR'
                      )
                      const turkeyOption: ComboboxOption | undefined =
                        turkeyCountry
                          ? {
                              value: turkeyCountry.localizedName,
                              label: turkeyCountry.localizedName,
                            }
                          : undefined

                      const countryOptions: ComboboxOption[] =
                        localizedCountries
                          .filter(c => c.isoCode !== 'TR')
                          .map(c => ({
                            value: c.localizedName,
                            label: c.localizedName,
                          }))

                      return (
                        <FormItem>
                          <FormLabel className='block font-[400] leading-none text-white lg:text-sm 2xl:text-lg'>
                            {translations.inputs.country.label}
                          </FormLabel>
                          <FormControl>
                            <Combobox
                              options={countryOptions}
                              priorityOptions={
                                turkeyOption ? [turkeyOption] : []
                              }
                              value={field.value}
                              onValueChange={value => {
                                const selectedCountry = localizedCountries.find(
                                  c => c.localizedName === value
                                )
                                if (selectedCountry) {
                                  setSelectedCountryCode(
                                    selectedCountry.isoCode
                                  )
                                  field.onChange(value)
                                  form.setValue('city', '')
                                }
                              }}
                              placeholder={
                                translations.inputs.country.placeholder
                              }
                              searchPlaceholder={
                                translations.inputs.country.placeholder
                              }
                              emptyMessage='No country found.'
                              contentClassName='max-h-[300px]'
                            />
                          </FormControl>
                          <FormMessage className='text-tangerine-flake' />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => {
                      const istanbulCity = sortedCities.find(
                        city =>
                          city.name.toLowerCase() === 'istanbul' ||
                          city.name.toLowerCase() === 'i̇stanbul'
                      )
                      const istanbulOption: ComboboxOption | undefined =
                        istanbulCity
                          ? {
                              value: istanbulCity.name,
                              label: istanbulCity.name,
                            }
                          : undefined

                      const cityOptions: ComboboxOption[] = sortedCities
                        .filter(city => {
                          const cityNameLower = city.name.toLowerCase()
                          return (
                            cityNameLower !== 'istanbul' &&
                            cityNameLower !== 'i̇stanbul'
                          )
                        })
                        .map(city => ({
                          value: city.name,
                          label: city.name,
                        }))

                      return (
                        <FormItem>
                          <FormLabel className='block font-[400] leading-none text-white lg:text-sm 2xl:text-lg'>
                            {translations.inputs.city.label}
                          </FormLabel>
                          <FormControl>
                            <Combobox
                              options={cityOptions}
                              priorityOptions={
                                istanbulOption ? [istanbulOption] : []
                              }
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={!selectedCountryCode || isCitiesLoading}
                              placeholder={
                                isCitiesLoading
                                  ? translations.inputs.city.placeholderLoading
                                  : !selectedCountryCode
                                    ? translations.inputs.city
                                        .placeholderSelectCountry
                                    : translations.inputs.city.placeholder
                              }
                              searchPlaceholder={
                                translations.inputs.city.placeholder
                              }
                              emptyMessage='No city found.'
                              contentClassName='max-h-[300px]'
                            />
                          </FormControl>
                          <FormMessage className='text-tangerine-flake' />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </div>
            </div>
            {/* how did you hear about us - contact preference */}
            <div className='order-4 col-span-12 space-y-8 xl:order-2 xl:col-span-9'>
              <FormField
                control={form.control}
                name='howDidYouHearAboutUs'
                render={() => (
                  <FormItem>
                    <FormControl>
                      <MultiSelectCheckboxes
                        title={translations.inputs.howDidYouHearAboutUs.label}
                        selectedValues={
                          howDidYouHearAboutUsValue
                            ? howDidYouHearAboutUsOptions
                                .filter(opt =>
                                  howDidYouHearAboutUsValue
                                    .split(',')
                                    .includes(opt.label)
                                )
                                .map(opt => opt.id)
                            : []
                        }
                        options={howDidYouHearAboutUsOptions}
                        onChange={handleHowDidYouHearAboutUs}
                        ref={howDidYouHearAboutUsDropdownRef}
                      />
                    </FormControl>
                    <FormMessage className='text-tangerine-flake' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='contactPreference'
                render={() => (
                  <FormItem>
                    <FormControl>
                      <MultiSelectCheckboxes
                        title={`${contactPreferenceTranslations.placeholder}`}
                        selectedValues={
                          contactPreferenceValue
                            ? contactPreferenceOptions
                                .filter(opt =>
                                  contactPreferenceValue
                                    .split(',')
                                    .includes(opt.label)
                                )
                                .map(opt => opt.id)
                            : []
                        }
                        options={contactPreferenceOptions}
                        onChange={handleContactPreference}
                        ref={contactPreferenceDropdownRef}
                      />
                    </FormControl>
                    <FormMessage className='text-tangerine-flake' />
                  </FormItem>
                )}
              />
            </div>
            {/* residence type */}
            <div className='order-2 col-span-12 space-y-8 xl:order-3 xl:col-span-24 xl:pr-20'>
              <div className='grid grid-cols-1 gap-6 pr-0 md:pr-72 lg:gap-4 xl:pr-40'>
                <FormField
                  control={form.control}
                  name='residenceType'
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <MultiSelectCheckboxes
                          title={translations.inputs.residenceType.label}
                          selectedValues={
                            residenceTypeValue
                              ? residenceTypeOptions
                                  .filter(opt =>
                                    residenceTypeValue
                                      .split(',')
                                      .includes(opt.label)
                                  )
                                  .map(opt => opt.id)
                              : []
                          }
                          options={residenceTypeOptions}
                          onChange={handleResidenceType}
                          ref={residenceTypeDropdownRef}
                          textSize='lg'
                          textClassName='tracking-[0.25em]'
                        />
                      </FormControl>
                      <FormMessage className='text-tangerine-flake' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* consent */}
            <div className='order-5 col-span-12 space-y-8 xl:order-5 xl:col-span-15 xl:pr-20'>
              <div className='space-y-5'>
                <div className='space-y-3'>
                  <FormField
                    control={form.control}
                    name='consentElectronicMessage'
                    render={({ field }) => (
                      <FormItem>
                        <div className='group flex flex-row gap-2 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={checked => {
                                field.onChange(checked)
                                handleConsentElectronicMessageChange(
                                  checked as boolean
                                )
                              }}
                            />
                          </FormControl>
                          <FormLabel className='cursor-pointer text-sm font-[300] leading-snug text-white xl:max-w-[90%] xl:text-sm 2xl:text-base'>
                            {t.rich(
                              'contact.form.inputs.consentElectronicMessage.placeholder',
                              {
                                legal4: chunks => (
                                  <Link
                                    href='/pdpl/commercial-electronic-message-consent'
                                    className='font-[400] text-white underline'
                                  >
                                    {chunks}
                                  </Link>
                                ),
                              }
                            )}
                          </FormLabel>
                        </div>
                        <FormMessage className='text-tangerine-flake' />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='consent'
                  render={({ field }) => (
                    <FormItem>
                      <div className='group flex flex-row gap-2 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className='cursor-pointer text-sm font-[300] leading-snug text-white xl:max-w-[90%] xl:text-sm 2xl:text-base'>
                          {t.rich('contact.form.inputs.consent.placeholder', {
                            legal1: chunks => (
                              <Link
                                target='_blank'
                                rel='norefferer noopener'
                                href='/pdpl/pdpl-related-information'
                                className='font-[400] text-white underline'
                              >
                                {chunks}
                              </Link>
                            ),
                            legal2: chunks => (
                              <Link
                                target='_blank'
                                rel='norefferer noopener'
                                href='/pdpl/explicit-consent'
                                className='font-[400] text-white underline'
                              >
                                {chunks}
                              </Link>
                            ),
                            legal3: chunks => (
                              <Link
                                target='_blank'
                                rel='norefferer noopener'
                                href='/pdpl/commercial-electronic-message'
                                className='font-[400] text-white underline'
                              >
                                {chunks}
                              </Link>
                            ),
                          })}
                        </FormLabel>
                      </div>
                      <FormMessage className='text-tangerine-flake' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* submit button */}
            <div className='order-6 col-span-12 flex space-y-8 xl:order-6 xl:col-span-9 2xl:pr-20'>
              <button
                type='submit'
                disabled={mutation.isPending}
                className='group relative flex w-full items-center justify-between lg:ml-auto lg:w-auto lg:justify-end'
              >
                <span className='whitespace-nowrap pr-4 text-sm font-[500] tracking-[0.2em] text-white lg:text-lg xl:pr-6 xl:text-base 2xl:pr-8 2xl:text-lg'>
                  {translations.submit.default}
                </span>
                <span
                  className={cn(
                    'relative flex flex-shrink-0 items-center justify-center overflow-hidden',
                    'bg-gradient-submit-button text-white transition-all duration-500 group-hover:text-bleeding-crimson',
                    'size-[3.5rem] xl:size-16 2xl:size-20 3xl:size-24',
                    'p-3 xl:p-4 3xl:p-6',
                    'before:absolute before:inset-0 before:bg-gradient-submit-button-hover before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100'
                  )}
                >
                  <CalendarPlusIcon
                    weight='thin'
                    className='z-10 size-full'
                    pointerEvents='none'
                  />
                </span>
              </button>
            </div>
          </div>
          <FormStatusMessage
            isError={
              mutation.isError ||
              (mutation.isSuccess && mutation.data && !mutation.data.success)
            }
            isSuccess={mutation.isSuccess && mutation.data?.success}
            errorMessage={
              mutation.isSuccess && mutation.data && !mutation.data.success
                ? mutation.data.message
                : t('contact.form.messages.error')
            }
            successMessage={
              mutation.data?.message || t('contact.form.messages.success')
            }
          />
        </form>
      </Form>
    </>
  )
}
