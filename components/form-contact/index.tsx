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
import { useMutation } from '@tanstack/react-query'
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
import { Link } from '@/components/utility/link'
import { submitContactForm } from '@/lib/api/submit-contact-form'
import { cn, isPhoneValid } from '@/lib/utils'
import { FormTranslations } from '@/types'

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
    residenceType: z
      .string()
      .min(1, { message: translations.inputs.residenceType.errors.required }),
    howDidYouHearAboutUs: z.string().min(1, {
      message: translations.inputs.howDidYouHearAboutUs.errors.required,
    }),
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
  onSuccess?: () => void
}

export function ContactForm({ translations, onSuccess }: FormContactProps) {
  const { showMessage } = useFormMessage()
  const t = useTranslations()
  const locale = useLocale()

  const residenceTypeDropdownRef = useRef<MultiSelectCheckboxesRef>(null)
  const howDidYouHearAboutUsDropdownRef = useRef<MultiSelectCheckboxesRef>(null)
  const contactPreferenceDropdownRef = useRef<MultiSelectCheckboxesRef>(null)

  const resetDropdowns = () => {
    residenceTypeDropdownRef.current?.reset()
    howDidYouHearAboutUsDropdownRef.current?.reset()
    contactPreferenceDropdownRef.current?.reset()
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(translations)),
    defaultValues: {
      name: '',
      surname: '',
      countryCode: '',
      phone: '',
      email: '',
      residenceType: '2+1',
      howDidYouHearAboutUs: '',
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
        id: '4+1',
        label: '4+1',
        icon: createIcon('4+1'),
      },
      {
        id: '5+1',
        label: '5+1',
        icon: createIcon('5+1'),
      },
      {
        id: '6+1',
        label: '6+1',
        icon: createIcon('6+1'),
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
      const selectedOptions = residenceTypeOptions.filter(opt =>
        ids.includes(opt.id)
      )
      const selectedLabels = selectedOptions.map(opt => opt.label).join(',')

      form.setValue('residenceType', selectedLabels, {
        shouldValidate: false,
      })

      form.trigger('residenceType')
    },
    [form, residenceTypeOptions]
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
            {/* name and surname */}
            <div className='col-span-12 space-y-8 xl:col-span-15 xl:pr-20'>
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
              <div className='grid grid-cols-1 gap-6 lg:gap-4'>
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
                        />
                      </FormControl>
                      <FormMessage className='text-tangerine-flake' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* how did you hear about us */}
            <div className='col-span-12 space-y-8 xl:col-span-9'>
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
            {/* consent */}
            <div className='col-span-12 space-y-8 xl:col-span-15 xl:pr-20'>
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
                                    href='/pdpl/explicit-consent'
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
            <div className='col-span-12 flex space-y-8 xl:col-span-9 2xl:pr-20'>
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
