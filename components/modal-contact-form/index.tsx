'use client'

import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRef } from 'react'

import { ContactForm } from '@/components/form-contact'
import { gsap } from '@/components/gsap'
import { ScrollableBox } from '@/components/utility/scrollable-box'
import { useEsc } from '@/hooks/useEsc'
import { useUiStore } from '@/lib/store/ui'
import { FormTranslations } from '@/types'
import { CaretRightIcon } from '@phosphor-icons/react'

export function ModalContactForm() {
  const stickyBadgeRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const t = useTranslations('contact')
  const commonT = useTranslations('common')
  const lenis = useLenis()
  const {
    isModalContactFormOpen,
    setIsModalContactFormOpen,
    isInquiryVisible,
  } = useUiStore()

  const formTranslations: FormTranslations = {
    inputs: {
      name: {
        label: t('form.inputs.name.label'),
        placeholder: t('form.inputs.name.placeholder'),
        errors: { required: t('form.inputs.name.errors.required') },
      },
      surname: {
        label: t('form.inputs.surname.label'),
        placeholder: t('form.inputs.surname.placeholder'),
        errors: { required: t('form.inputs.surname.errors.required') },
      },
      phone: {
        placeholder: t('form.inputs.phone.placeholder'),
        label: t('form.inputs.phone.label'),
        errors: {
          min: t('form.inputs.phone.errors.min'),
          max: t('form.inputs.phone.errors.max'),
          required: t('form.inputs.phone.errors.required'),
        },
      },
      email: {
        label: t('form.inputs.email.label'),
        placeholder: t('form.inputs.email.placeholder'),
        errors: {
          required: t('form.inputs.email.errors.required'),
          email: t('form.inputs.email.errors.email'),
        },
      },
      residenceType: {
        label: t('form.inputs.residenceType.label'),
        placeholder: t('form.inputs.residenceType.placeholder'),
        errors: {
          required: t('form.inputs.residenceType.errors.required'),
        },
      },
      howDidYouHearAboutUs: {
        label: t('form.inputs.howDidYouHearAboutUs.label'),
        placeholder: t('form.inputs.howDidYouHearAboutUs.placeholder'),
        errors: {
          required: t('form.inputs.howDidYouHearAboutUs.errors.required'),
        },
        options: {
          reference: t('form.inputs.howDidYouHearAboutUs.options.reference'),
          projectVisit: t(
            'form.inputs.howDidYouHearAboutUs.options.projectVisit'
          ),
          internetSocialMedia: t(
            'form.inputs.howDidYouHearAboutUs.options.internetSocialMedia'
          ),
          billboard: t('form.inputs.howDidYouHearAboutUs.options.billboard'),
        },
      },
      contactPreference: {
        placeholder: t('form.inputs.contactPreference.placeholder'),
        errors: {
          required: t('form.inputs.contactPreference.errors.required'),
        },
      },
      contactPreferenceOptions: {
        sms: t('form.inputs.contactPreferenceOptions.sms'),
        email: t('form.inputs.contactPreferenceOptions.email'),
        phone: t('form.inputs.contactPreferenceOptions.phone'),
      },
      message: { placeholder: t('form.inputs.message.placeholder') },
      consent: {
        placeholder: '', // This is handled by ConsentCheckboxes component with t.rich()
        errors: {
          required: t('form.inputs.consent.errors.required'),
        },
      },
      consentElectronicMessage: {
        placeholder: '', // This is handled by ConsentCheckboxes component with t.rich()
        errors: {
          required: t('form.inputs.consentElectronicMessage.errors.required'),
        },
      },
      consentSms: {
        placeholder: t('form.inputs.consentSms.placeholder'),
      },
      consentEmail: {
        placeholder: t('form.inputs.consentEmail.placeholder'),
      },
      consentPhone: {
        placeholder: t('form.inputs.consentPhone.placeholder'),
      },
    },
    submit: {
      default: t('form.submit.default'),
      sending: t('form.submit.sending'),
    },
    messages: {
      error: t('form.messages.error'),
      success: t('form.messages.success'),
      successDialog: {
        title: t('form.messages.successDialog.title'),
        description: t('form.messages.successDialog.description'),
        button: t('form.messages.successDialog.button'),
      },
    },
  }

  const animationTL = useRef<gsap.core.Timeline>()

  useEsc(
    () => setIsModalContactFormOpen(!isModalContactFormOpen),
    isModalContactFormOpen
  )

  useGSAP(
    () => {
      animationTL.current = gsap.timeline({
        paused: true,
      })

      animationTL.current
        ?.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          's'
        )
        .fromTo(
          formRef.current,
          { x: '100%' },
          {
            x: 0,
            duration: 0.6,
            ease: 'expo.inOut',
          },
          's'
        )
    },
    {
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      if (isModalContactFormOpen) {
        animationTL.current?.play()
        lenis?.stop()
      } else {
        animationTL.current?.reverse()
        lenis?.start()
      }
    },
    {
      dependencies: [isModalContactFormOpen, lenis],
    }
  )

  return (
    <>
      {/* Overlay */}
      <button
        className={cn(
          'blur-bg fixed left-0 top-0 z-[var(--z-modal-overlay)] block h-full w-full opacity-0',
          {
            'pointer-events-none': !isModalContactFormOpen,
            'pointer-events-auto': isModalContactFormOpen,
          }
        )}
        ref={overlayRef}
        onClick={() => setIsModalContactFormOpen(!isModalContactFormOpen)}
        type='button'
      ></button>
      {/* Form */}
      <div
        className={cn(
          'fixed bottom-0 right-0 top-0',
          'h-full w-full translate-x-[100%] lg:w-[85vw]',
          'bg-gradient-appointment',
          'z-[var(--z-modal-contact-form)]'
        )}
        onClick={e => e.stopPropagation()}
        ref={formRef}
      >
        {/* Close Button */}
        <button
          className={cn(
            'z-[var(--z-modal-close-button)] bg-white text-bricky-brick',
            'absolute right-0 top-28 lg:left-0 lg:right-auto lg:top-20 lg:-translate-x-full',
            'size-12 p-3 lg:size-20',
            'transition-opacity duration-300 ease-in-out',
            'flex items-center justify-center',
            {
              'pointer-events-none opacity-0': !isModalContactFormOpen,
              'pointer-events-auto opacity-100': isModalContactFormOpen,
            }
          )}
          onClick={() => setIsModalContactFormOpen(!isModalContactFormOpen)}
          type='button'
          disabled={!isModalContactFormOpen}
        >
          <CaretRightIcon className='size-full' weight='thin' />
          <span className='sr-only'>Close</span>
        </button>
        {/* Trigger Button */}
        <button
          className={cn(
            'group',
            'absolute bottom-0 left-0 top-1/2 -translate-x-full -translate-y-[0%] lg:-translate-y-1/2',
            'font-primary font-[500] tracking-[0.2em] text-white',
            'text-sm xl:text-base 2xl:text-xl',
            'flex items-center justify-center',
            'relative cursor-pointer overflow-hidden bg-gradient-button-hover',
            'before:absolute before:inset-0 before:bg-gradient-button before:opacity-0',
            'before:transition-opacity before:duration-300 hover:before:opacity-100',
            'transition-all duration-300 ease-in-out',
            {
              'pointer-events-none opacity-0':
                !isInquiryVisible || isModalContactFormOpen,
              'pointer-events-auto opacity-100':
                isInquiryVisible && !isModalContactFormOpen,
              'h-52 w-12 lg:w-16 xl:h-60 xl:w-16 2xl:h-72 2xl:w-16 3xl:w-16':
                locale === 'tr',
              'h-72 w-12 lg:w-16 xl:h-80 xl:w-16 2xl:h-96 2xl:w-16 3xl:w-16':
                locale === 'en',
            }
          )}
          onClick={() => setIsModalContactFormOpen(!isModalContactFormOpen)}
          ref={stickyBadgeRef}
          type='button'
          disabled={isModalContactFormOpen}
        >
          <span className='pointer-events-none relative z-10 block -rotate-90 whitespace-nowrap'>
            {commonT('inquiry')}
          </span>
        </button>
        {/* Content */}
        <div className='absolute inset-0'>
          <ScrollableBox className='flex h-full items-start'>
            <div
              className={cn(
                'relative flex min-h-screen flex-col justify-center gap-12',
                'px-8 py-16 pb-16 lg:px-16'
              )}
            >
              <p
                className={cn(
                  'max-w-[90%] font-primary font-[300] text-white',
                  'text-xl/snug lg:text-xl/snug xl:text-xl/snug 2xl:text-2xl/snug',
                  'max-w-xl lg:max-w-2xl xl:max-w-lg 2xl:max-w-xl 3xl:max-w-2xl'
                )}
              >
                {t.rich('description', {
                  br: () => <span className='hidden lg:block' />,
                })}
              </p>
              <ContactForm translations={formTranslations} />
            </div>
          </ScrollableBox>
        </div>
      </div>
    </>
  )
}
