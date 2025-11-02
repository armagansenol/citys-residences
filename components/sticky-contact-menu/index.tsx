'use client'

import s from './sticky-contact-menu.module.css'

import { cn } from '@/lib/utils'
import { useLenis } from 'lenis/react'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { ContactForm } from '@/components/form-contact'
import { IconInquiry, IconTelephone, IconWhatsapp } from '@/components/icons'
import { Link } from '@/components/utility/link'
import { ScrollableBox } from '@/components/utility/scrollable-box'
import { useVisibilityStore } from '@/lib/store/visibility'
import { FormTranslations } from '@/types'

export function StickyContactMenu() {
  const t = useTranslations('contact')
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { isStickyContactMenuVisible } = useVisibilityStore()
  const lenis = useLenis()

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
        label: t('form.inputs.phone.label'),
        placeholder: t('form.inputs.phone.placeholder'),
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

  useEffect(() => {
    return isOpen ? lenis?.stop() : lenis?.start()
  }, [isOpen, lenis])

  return (
    <>
      <div
        className={cn(
          s.stickyContactMenu,
          'blur-bg-bricky-brick fixed bottom-0 left-0 right-0 grid grid-cols-3 font-primary bt:hidden',
          'transition-all duration-300 ease-in-out',
          {
            'opacity-100': isStickyContactMenuVisible,
            'opacity-0': !isStickyContactMenuVisible,
            'pointer-events-none': !isStickyContactMenuVisible,
            [s.active]: isOpen,
          }
        )}
        ref={ref}
      >
        <Link
          href='tel:+902162666600'
          className='flex flex-col items-center justify-center gap-2 border-r border-black/15 py-2 text-white'
        >
          <IconTelephone className='h-4 w-4' />
          <div className='text-[0.8rem] font-medium leading-none'>Telefon</div>
        </Link>
        <div
          className='flex flex-col items-center justify-center gap-2 border-r border-black/15 py-2 text-white'
          onClick={() => setIsOpen(true)}
        >
          <IconInquiry className='h-4 w-4' />
          <div className='text-[0.8rem] font-medium leading-none'>
            Randevu Al
          </div>
        </div>

        <Link
          href='https://wa.me/+9002162666600'
          className='flex flex-col items-center justify-center gap-2 py-2 text-white'
        >
          <IconWhatsapp className='h-4 w-4' />
          <div className='text-[0.8rem] font-medium leading-none'>Whatsapp</div>
        </Link>
      </div>
      <div
        className={cn(s.dModal, 'blur-bg', {
          [s.active]: isOpen,
        })}
        onClick={() => setIsOpen(false)}
      >
        <div className='absolute right-4 top-4 h-6 w-6'>
          <X className='text-white' />
          <span className='sr-only'>Close</span>
        </div>
        <div
          className={cn(s.dContent, 'px-4 pb-20')}
          onClick={e => e.stopPropagation()}
        >
          <ScrollableBox>
            <p className='mt-5 text-left font-primary text-base font-normal leading-normal text-neutral-900 bt:text-center bt:text-sm bd:text-left'>
              {t.rich('description', {
                br: () => <br className='hidden bt:block' />,
              })}
            </p>
            <ContactForm translations={formTranslations} />
          </ScrollableBox>
        </div>
      </div>
    </>
  )
}
