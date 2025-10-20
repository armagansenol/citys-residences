'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
// import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { z } from 'zod'

import { IconCheck, IconLoading } from '@/components/icons'
import { InternationalPhoneInputComponent } from '@/components/international-phone-input'
import {
  MultiSelectCheckboxes,
  MultiSelectCheckboxesRef,
} from '@/components/multi-select-checkboxes'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { submitContactForm } from '@/lib/api/submit-contact-form'
import { cn, isPhoneValid } from '@/lib/utils'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'
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

const getFormSchema = (translations: FormTranslations) => {
  // Ensure contactPreference exists with fallback
  const contactPreferenceTranslations = translations?.inputs
    ?.contactPreference || {
    placeholder: 'Contact Preference',
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

const commonInputStyles =
  'bg-transparent text-white rounded-none transition-colors duration-300 ease-in-out placeholder:text-tangerine-flake placeholder:text-lg'

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
        <FormLabel className='block font-[300] leading-none text-white lg:text-sm 2xl:text-lg'>
          {label}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value?.toString() ?? ''}
            className={cn(
              'rounded-none border-b border-white font-[300] placeholder:text-tangerine-flake',
              'placeholder:text-sm xl:placeholder:text-sm 2xl:placeholder:text-lg',
              'lg:text-sm xl:text-sm 2xl:text-lg',
              commonInputStyles,
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
        <FormMessage className='text-white' />
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
}

export function ContactForm({ translations }: FormContactProps) {
  const { showMessage } = useFormMessage()
  // const locale = useLocale() // Uncomment when using real API
  const t = useTranslations()
  const [successDialog, setSuccessDialog] = useState(false)

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
      residenceType: '',
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

      // Development mode: console log and return early
      console.log('Form Data to be submitted:', {
        ...cleanedData,
        timestamp: new Date().toISOString(),
      })

      // Early return for development - bypassing actual API call
      return {
        success: true,
        message: 'Development mode - data logged to console',
      }

      // Uncomment below when ready to use real API
      // const result = await submitContactForm(cleanedData, locale)
      // return result
    },
    onSuccess: result => {
      if (result.success) {
        resetDropdowns()
        form.reset()
        form.clearErrors()
        setSuccessDialog(true)
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

  const iconSize = 'size-5 xl:size-6 2xl:size-7 3xl:size-8'

  const residenceTypeOptions = useMemo(
    () => [
      {
        id: '1+1',
        label: '1+1',
        icon: <HouseSimpleIcon className={iconSize} />,
      },
      {
        id: '2+1',
        label: '2+1',
        icon: <HouseSimpleIcon className={iconSize} />,
      },
      {
        id: '3+1',
        label: '3+1',
        icon: <HouseSimpleIcon className={iconSize} />,
      },
      {
        id: '4+1',
        label: '4+1',
        icon: <HouseSimpleIcon className={iconSize} />,
      },
      {
        id: '5+1',
        label: '5+1',
        icon: <HouseSimpleIcon className={iconSize} />,
      },
      {
        id: '6+1',
        label: '6+1',
        icon: <HouseSimpleIcon className={iconSize} />,
      },
    ],
    []
  )

  const howDidYouHearAboutUsOptions = useMemo(
    () => [
      {
        id: 'reference',
        label: translations.inputs.howDidYouHearAboutUs.options.reference,
        icon: <UserIcon className={iconSize} />,
      },
      {
        id: 'projectVisit',
        label: translations.inputs.howDidYouHearAboutUs.options.projectVisit,
        icon: <StorefrontIcon className={iconSize} />,
      },
      {
        id: 'internetSocialMedia',
        label:
          translations.inputs.howDidYouHearAboutUs.options.internetSocialMedia,
        icon: <DeviceMobileCameraIcon className={iconSize} />,
      },
      {
        id: 'billboard',
        label: translations.inputs.howDidYouHearAboutUs.options.billboard,
        icon: <PresentationIcon className={iconSize} />,
      },
    ],
    [translations.inputs.howDidYouHearAboutUs.options]
  )

  const contactPreferenceOptions = useMemo(
    () => [
      {
        id: 'sms',
        label: translations.inputs.contactPreferenceOptions?.sms,
        icon: <ChatCenteredTextIcon className={iconSize} />,
      },
      {
        id: 'email',
        label: translations.inputs.contactPreferenceOptions?.email,
        icon: <EnvelopeOpenIcon className={iconSize} />,
      },
      {
        id: 'phone',
        label: translations.inputs.contactPreferenceOptions?.phone,
        icon: <DeviceMobileCameraIcon className={iconSize} />,
      },
    ],
    [translations.inputs.contactPreferenceOptions]
  )

  const contactPreferenceTranslations = useMemo(
    () =>
      translations?.inputs?.contactPreference || {
        placeholder: 'Contact Preference',
        errors: { required: 'Required field' },
      },
    [translations.inputs.contactPreference]
  )

  const handleConsentElectronicMessageChange = useCallback(
    (checked: boolean) => {
      form.setValue('consentElectronicMessage', checked)

      if (checked) {
        // If checked, select all contact preference options
        const allContactPreferenceLabels = contactPreferenceOptions
          .map(opt => opt.label)
          .join(',')
        form.setValue('contactPreference', allContactPreferenceLabels, {
          shouldValidate: false,
        })
      } else {
        // If unchecked, clear all contact preference options
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
        // If at least one contact preference is selected, check consentElectronicMessage
        form.setValue('consentElectronicMessage', true, {
          shouldValidate: false,
        })
      } else {
        // If all contact preferences are unselected, uncheck consentElectronicMessage
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
          onSubmit={form.handleSubmit(data => mutation.mutate(data))}
          className='flex flex-col gap-6 py-10 font-primary lg:py-0'
          noValidate
        >
          <div className='grid grid-cols-24'>
            <div className='flex flex-col justify-between gap-16 lg:col-span-14 xl:col-span-15 xl:gap-8 xl:pr-16 2xl:col-span-15 2xl:gap-12 2xl:pr-20 3xl:col-span-14'>
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
                      <FormMessage className='text-white' />
                    </FormItem>
                  )}
                />
              </div>
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
                          <FormLabel className='max-w-[90%] cursor-pointer text-base font-[300] leading-snug text-white xl:text-sm 2xl:text-base'>
                            {t.rich(
                              'contact.form.inputs.consentElectronicMessage.placeholder',
                              {
                                legal4: chunks => (
                                  <a
                                    target='_blank'
                                    rel='norefferer noopener'
                                    href='/pdf/citys-residences-acik-riza-beyani.pdf'
                                    className='font-[400] text-white underline'
                                  >
                                    {chunks}
                                  </a>
                                ),
                              }
                            )}
                          </FormLabel>
                        </div>
                        <FormMessage className='text-white' />
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
                        <FormLabel className='max-w-[90%] cursor-pointer text-base font-[300] leading-snug text-white xl:text-sm 2xl:text-base'>
                          {t.rich('contact.form.inputs.consent.placeholder', {
                            legal1: chunks => (
                              <a
                                target='_blank'
                                rel='norefferer noopener'
                                href='/pdf/citys-residences-kvkk-aydinlatma-metni.pdf'
                                className='font-[400] text-white underline'
                              >
                                {chunks}
                              </a>
                            ),
                            legal2: chunks => (
                              <a
                                target='_blank'
                                rel='norefferer noopener'
                                href='/pdf/citys-residences-acik-riza-metni.pdf'
                                className='font-[400] text-white underline'
                              >
                                {chunks}
                              </a>
                            ),
                            legal3: chunks => (
                              <a
                                target='_blank'
                                rel='norefferer noopener'
                                href='/pdf/citys-residences-ticari-elektronik-ileti-aydinlatma-metni.pdf'
                                className='font-[400] text-white underline'
                              >
                                {chunks}
                              </a>
                            ),
                          })}
                        </FormLabel>
                      </div>
                      <FormMessage className='text-white' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex flex-col justify-between gap-16 lg:col-span-10 xl:col-span-9 xl:gap-8 2xl:col-span-9 2xl:gap-12 3xl:col-span-9'>
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
                    <FormMessage className='text-white' />
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
                        title={`${contactPreferenceTranslations.placeholder}*`}
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
                    <FormMessage className='text-white' />
                  </FormItem>
                )}
              />
              <div className='ml-auto mt-auto flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-0 xl:mb-8'>
                <button
                  type='submit'
                  disabled={mutation.isPending}
                  className='group relative flex items-center'
                >
                  <span className='whitespace-nowrap text-sm tracking-[0.4em] text-white lg:text-lg xl:px-6 xl:text-sm 2xl:px-8 2xl:text-lg'>
                    {translations.submit.default}
                  </span>
                  <span
                    className={cn(
                      'relative flex flex-shrink-0 items-center justify-center overflow-hidden bg-gradient-submit-button text-white transition-all duration-500 group-hover:text-bleeding-crimson xl:size-16 2xl:size-20 3xl:size-24',
                      'before:absolute before:inset-0 before:bg-gradient-submit-button-hover before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100'
                    )}
                  >
                    <CalendarPlusIcon
                      weight='thin'
                      className='relative z-10 xl:size-8 2xl:size-10 3xl:size-12'
                    />
                  </span>
                  {mutation.isPending && (
                    <span className='absolute -right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-full items-center justify-center'>
                      <IconLoading fill={colors['bricky-brick']} />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
        <DialogContent className='flex flex-col items-center justify-center py-8 font-primary'>
          <DialogHeader>
            <DialogTitle className='mb-2 flex flex-col items-center gap-2 text-center text-lg font-medium leading-none text-white lg:text-lg'>
              <div className='flex h-9 w-9 items-center justify-center'>
                <IconCheck />
              </div>
              {translations.messages.successDialog.title}
            </DialogTitle>
            <DialogDescription className='block pb-10 text-center text-sm font-normal leading-none text-white lg:text-lg'>
              {translations.messages.successDialog.description}
            </DialogDescription>
            <DialogClose asChild>
              <button
                className='text-sm text-white underline lg:text-lg'
                type='button'
              >
                {translations.messages.successDialog.button}
              </button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
