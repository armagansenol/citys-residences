'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ConsentCheckboxes } from '@/components/consent-checkboxes'
import { IconCheck, IconLoading } from '@/components/icons'
import { Image } from '@/components/image'
import { InternationalPhoneInputComponent } from '@/components/international-phone-input'
import {
  MultiSelectCheckboxes,
  MultiSelectCheckboxesRef,
} from '@/components/multi-select-checkboxes'
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
import { submitContactForm } from '@/lib/api/submit-contact-form'
import { cn, isPhoneValid } from '@/lib/utils'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'
import { Home, Mail, Phone, SmilePlus } from 'lucide-react'

const getFormSchema = (translations: FormTranslations) => {
  // Ensure contactPreference exists with fallback
  const contactPreferenceTranslations = translations?.inputs
    ?.contactPreference || {
    placeholder: 'Contact Preference',
    errors: { required: 'Required field' },
  }

  return z
    .object({
      name: z
        .string()
        .min(2, { message: translations.inputs.name.errors.required }),
      surname: z
        .string()
        .min(2, { message: translations.inputs.surname.errors.required }),
      countryCode: z.string(),
      phone: z.string().refine(
        val => {
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
      consentSms: z.boolean(),
      consentEmail: z.boolean(),
      consentPhone: z.boolean(),
    })
    .refine(
      data => {
        if (data.consentElectronicMessage) {
          return data.consentSms || data.consentEmail || data.consentPhone
        }
        return true
      },
      {
        message: translations.inputs.consentElectronicMessage.errors.required,
        path: ['consentElectronicMessage'],
      }
    )
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
        <FormLabel className='block text-lg font-[300] leading-none text-white'>
          {label}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value?.toString() ?? ''}
            className={cn(
              'rounded-none border-b border-white text-lg font-[300] placeholder:text-tangerine-flake',
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
  const locale = useLocale()
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
      consentSms: false,
      consentEmail: false,
      consentPhone: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const residenceTypeValue = form.watch('residenceType')
  const howDidYouHearAboutUsValue = form.watch('howDidYouHearAboutUs')
  const contactPreferenceValue = form.watch('contactPreference')

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const result = await submitContactForm(data, locale)
      return result
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

  const residenceTypeOptions = useMemo(
    () => [
      { id: '1+1', label: '1+1', icon: <Home /> },
      { id: '2+1', label: '2+1', icon: <Home /> },
      { id: '3+1', label: '3+1', icon: <Home /> },
      { id: '4+1', label: '4+1', icon: <Home /> },
      { id: '5+1', label: '5+1', icon: <Home /> },
      { id: '6+1', label: '6+1', icon: <Home /> },
    ],
    []
  )

  const howDidYouHearAboutUsOptions = useMemo(
    () => [
      {
        id: 'reference',
        label: translations.inputs.howDidYouHearAboutUs.options.reference,
        icon: <Home />,
      },
      {
        id: 'projectVisit',
        label: translations.inputs.howDidYouHearAboutUs.options.projectVisit,
        icon: <Home />,
      },
      {
        id: 'internetSocialMedia',
        label:
          translations.inputs.howDidYouHearAboutUs.options.internetSocialMedia,
        icon: <Home />,
      },
      {
        id: 'billboard',
        label: translations.inputs.howDidYouHearAboutUs.options.billboard,
        icon: <Home />,
      },
    ],
    [translations.inputs.howDidYouHearAboutUs.options]
  )

  const contactPreferenceOptions = useMemo(
    () => [
      {
        id: 'sms',
        label: translations.inputs.contactPreferenceOptions?.sms || 'SMS',
        icon: <SmilePlus />,
      },
      {
        id: 'email',
        label: translations.inputs.contactPreferenceOptions?.email || 'Email',
        icon: <Mail />,
      },
      {
        id: 'phone',
        label: translations.inputs.contactPreferenceOptions?.phone || 'Phone',
        icon: <Phone />,
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

      form.trigger('contactPreference')
    },
    [form, contactPreferenceOptions]
  )

  useEffect(() => {
    form.register('phone', {
      onChange: () => form.trigger('phone'), // Validate phone on change
    })
    form.register('email', {
      onChange: () => form.trigger('email'), // Validate email on change
    })
  }, [form])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => mutation.mutate(data))}
          className='flex flex-col gap-6 py-10 font-primary lg:py-0'
          noValidate
        >
          <div className='grid grid-cols-24'>
            <div className='col-span-14 flex flex-col justify-between gap-16 pr-24'>
              <div className='flex grid-flow-col flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-6'>
                <FormInput
                  label={translations.inputs.name.label}
                  control={form.control}
                  name='name'
                  placeholder={`${translations.inputs.name.placeholder}*`}
                />
                <FormInput
                  label={translations.inputs.surname.label}
                  control={form.control}
                  name='surname'
                  placeholder={`${translations.inputs.surname.placeholder}*`}
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
                    placeholder={`${locale === 'tr' ? 'E-Posta' : 'Email'}*`}
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
              <ConsentCheckboxes form={form} control={form.control} />
            </div>
            <div className='col-span-8 flex flex-col justify-between gap-16'>
              <div className='grid grid-cols-1 gap-6 lg:gap-4'>
                <div className='flex flex-col'>
                  <FormField
                    control={form.control}
                    name='howDidYouHearAboutUs'
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <MultiSelectCheckboxes
                            title={
                              translations.inputs.howDidYouHearAboutUs.label
                            }
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
                </div>
              </div>
              <div className='grid grid-cols-1 gap-6 lg:gap-4'>
                <div className='flex flex-col'>
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
                </div>
              </div>
              <div className='ml-auto mt-auto flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-0'>
                <button
                  type='submit'
                  disabled={mutation.isPending}
                  className='group relative flex items-center'
                >
                  <span className='px-8 text-sm tracking-[0.4em] text-white lg:text-lg'>
                    {/* <Letter3DSwap
                      mainClassName='text-sm tracking-[0.4em] text-white lg:text-lg'
                      as='span'
                      rotateDirection='top'
                      staggerDuration={0.03}
                      staggerFrom='first'
                      transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 160,
                      }}
                    >
                      {translations.submit.default}
                    </Letter3DSwap> */}
                    {translations.submit.default}
                  </span>
                  <span className='relative flex h-20 w-20 items-center justify-center overflow-hidden bg-gradient-button transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-button-hover before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100'>
                    <Image
                      src='/svg/calendar-plus.svg'
                      alt='Calendar Plus'
                      width={24}
                      height={24}
                      className='svg-icon-white relative z-10'
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
