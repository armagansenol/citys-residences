'use client'

import s from './modal-contact-form.module.css'

import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { ContactForm } from '@/components/form-contact'
import { gsap } from '@/components/gsap'
import { ScrollableBox } from '@/components/utility/scrollable-box'
import { useEsc } from '@/hooks/useEsc'
import { FormTranslations } from '@/types'
import { useLenis } from 'lenis/react'

export function ModalContactForm() {
  const stickyBadgeRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const t = useTranslations('contact')
  const commonT = useTranslations('common')
  const lenis = useLenis()
  const [open, setOpen] = useState(false)

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
          newspaperMagazine: t(
            'form.inputs.howDidYouHearAboutUs.options.newspaperMagazine'
          ),
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

  const menuTL = useRef<gsap.core.Timeline>()

  useEsc(() => setOpen(false), open)

  useGSAP(
    () => {
      menuTL.current = gsap.timeline({
        paused: true,
      })

      menuTL.current
        ?.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          's'
        )
        .fromTo(
          formRef.current,
          { width: '0' },
          {
            width: '80vw',
            duration: 0.8,
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
      // const aloTech = document.querySelector(
      //   '#Click2ConnectPackageFrame'
      // ) as HTMLIFrameElement

      if (open) {
        menuTL.current?.play()
        // if (aloTech) {
        //   gsap.to(aloTech, {
        //     opacity: 0,
        //     duration: 0.3,
        //   })
        // }
        lenis?.stop()
      } else {
        menuTL.current?.reverse().then(() => {
          // if (aloTech) {
          //   gsap.to(aloTech, {
          //     opacity: 1,
          //     duration: 0.3,
          //   })
          // }
        })
        lenis?.start()
      }
    },
    {
      dependencies: [open, lenis],
    }
  )

  // const { isAloTechVisible } = useVisibilityStore()

  // useEffect(() => {
  //   if (!stickyBadgeRef.current) return

  //   stickyBadgeRef.current.style.transition = 'opacity 200ms ease'

  //   stickyBadgeRef.current.style.setProperty(
  //     'opacity',
  //     isAloTechVisible ? '1' : '0'
  //   )
  //   stickyBadgeRef.current.style.setProperty(
  //     'pointer-events',
  //     isAloTechVisible ? 'auto' : 'none'
  //   )
  // }, [isAloTechVisible])

  return (
    <>
      <button
        className={cn(
          s.bg,
          'blur-bg fixed left-0 top-0 z-[var(--z-modal-background)] hidden h-full w-full opacity-0 lg:block',
          {
            'pointer-events-none': !open,
          }
        )}
        ref={overlayRef}
        onClick={() => setOpen(false)}
        type='button'
      ></button>
      <div className={s.form}>
        <div
          className='box relative h-full w-0 bg-gradient-appointment'
          onClick={e => e.stopPropagation()}
          ref={formRef}
        >
          <div className='absolute left-0 right-0 top-0 flex h-full w-[80vw]'>
            <button
              className={cn(
                'z-16 absolute left-0 top-20 h-16 w-16 -translate-x-full bg-white p-2 text-bricky-brick',
                'transition-opacity duration-700 ease-in-out',
                'flex items-center justify-center',
                {
                  'opacity-0': !open,
                  'opacity-100': open,
                }
              )}
              onClick={() => setOpen(false)}
              type='button'
            >
              <ChevronRight className='h-8 w-8' />
              <span className='sr-only'>Close</span>
            </button>
            <button
              className={cn(
                'group',
                'h-72 w-32',
                'absolute bottom-0 left-0 top-1/2 -translate-x-full -translate-y-1/2',
                'font-primary text-lg font-[500] tracking-[0.2em] text-white xl:text-xl',
                'flex cursor-pointer items-center justify-center',
                'relative overflow-hidden bg-gradient-button-hover transition-all duration-300',
                'before:absolute before:inset-0 before:bg-gradient-button before:opacity-0',
                'before:transition-opacity before:duration-300 hover:before:opacity-100',
                'transition-opacity duration-700 ease-in-out',
                {
                  'opacity-0': open,
                  'opacity-100': !open,
                }
              )}
              onClick={() => setOpen(prev => !prev)}
              ref={stickyBadgeRef}
              type='button'
            >
              <span className='pointer-events-none relative z-10 block whitespace-nowrap xl:-rotate-90'>
                {commonT('inquiry')}
              </span>
            </button>
            <div className='flex h-full flex-col justify-center'>
              <ScrollableBox className='flex flex-grow-0'>
                <div className='relative flex h-full flex-col justify-center gap-12 px-16 py-8'>
                  <p
                    className={cn(
                      'max-w-[90%] font-primary font-[300] text-white',
                      'text-xl lg:text-xl xl:text-xl 2xl:text-2xl',
                      'leading-snug lg:leading-snug xl:leading-snug 2xl:leading-snug',
                      'max-w-xl'
                    )}
                  >
                    {t.rich('description', {
                      br: () => <br className='hidden lg:block' />,
                    })}
                  </p>
                  <ContactForm translations={formTranslations} />
                </div>
              </ScrollableBox>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
