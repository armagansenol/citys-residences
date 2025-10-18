"use client"

import s from "./modal-contact-form.module.css"

import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useLenis } from "lenis/react"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { ContactForm } from "@/components/form-contact"
import { gsap } from "@/components/gsap"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { useEsc } from "@/hooks/useEsc"
import { useVisibilityStore } from "@/lib/store/visibility"
import { FormTranslations } from "@/types"

export function ModalContactForm() {
  const stickyBadgeRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const bgRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("contact")
  const commonT = useTranslations("common")
  const lenis = useLenis()

  const formTranslations: FormTranslations = {
    inputs: {
      name: {
        placeholder: t("form.inputs.name.placeholder"),
        errors: { required: t("form.inputs.name.errors.required") },
      },
      surname: {
        placeholder: t("form.inputs.surname.placeholder"),
        errors: { required: t("form.inputs.surname.errors.required") },
      },
      phone: {
        placeholder: t("form.inputs.phone.placeholder"),
        errors: {
          min: t("form.inputs.phone.errors.min"),
          max: t("form.inputs.phone.errors.max"),
          required: t("form.inputs.phone.errors.required"),
        },
      },
      email: {
        placeholder: t("form.inputs.email.placeholder"),
        errors: {
          required: t("form.inputs.email.errors.required"),
          email: t("form.inputs.email.errors.email"),
        },
      },
      residenceType: {
        placeholder: t("form.inputs.residenceType.placeholder"),
        errors: {
          required: t("form.inputs.residenceType.errors.required"),
        },
      },
      howDidYouHearAboutUs: {
        placeholder: t("form.inputs.howDidYouHearAboutUs.placeholder"),
        errors: {
          required: t("form.inputs.howDidYouHearAboutUs.errors.required"),
        },
        options: {
          reference: t("form.inputs.howDidYouHearAboutUs.options.reference"),
          projectVisit: t("form.inputs.howDidYouHearAboutUs.options.projectVisit"),
          internetSocialMedia: t("form.inputs.howDidYouHearAboutUs.options.internetSocialMedia"),
          billboard: t("form.inputs.howDidYouHearAboutUs.options.billboard"),
          newspaperMagazine: t("form.inputs.howDidYouHearAboutUs.options.newspaperMagazine"),
        },
      },
      message: { placeholder: t("form.inputs.message.placeholder") },
      consent: {
        placeholder: "", // This is handled by ConsentCheckboxes component with t.rich()
        errors: {
          required: t("form.inputs.consent.errors.required"),
        },
      },
      consentElectronicMessage: {
        placeholder: "", // This is handled by ConsentCheckboxes component with t.rich()
        errors: {
          required: t("form.inputs.consentElectronicMessage.errors.required"),
        },
      },
      consentSms: {
        placeholder: t("form.inputs.consentSms.placeholder"),
      },
      consentEmail: {
        placeholder: t("form.inputs.consentEmail.placeholder"),
      },
      consentPhone: {
        placeholder: t("form.inputs.consentPhone.placeholder"),
      },
    },
    submit: {
      default: t("form.submit.default"),
      sending: t("form.submit.sending"),
    },
    messages: {
      error: t("form.messages.error"),
      success: t("form.messages.success"),
      successDialog: {
        title: t("form.messages.successDialog.title"),
        description: t("form.messages.successDialog.description"),
        button: t("form.messages.successDialog.button"),
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
          bgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "s"
        )
        .fromTo(
          formRef.current,
          { width: "0" },
          {
            width: "80vw",
            duration: 0.8,
            ease: "expo.inOut",
          },
          "s"
        )
    },
    {
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      const aloTech = document.querySelector("#Click2ConnectPackageFrame") as HTMLIFrameElement

      if (open) {
        menuTL.current?.play()
        if (aloTech) {
          gsap.to(aloTech, {
            opacity: 0,
            duration: 0.3,
          })
        }
        lenis?.stop()
      } else {
        menuTL.current?.reverse().then(() => {
          if (aloTech) {
            gsap.to(aloTech, {
              opacity: 1,
              duration: 0.3,
            })
          }
        })
        lenis?.start()
      }
    },
    {
      dependencies: [open, lenis],
    }
  )

  const { isAloTechVisible } = useVisibilityStore()

  useEffect(() => {
    if (!stickyBadgeRef.current) return

    stickyBadgeRef.current.style.transition = "opacity 200ms ease"

    stickyBadgeRef.current.style.setProperty("opacity", isAloTechVisible ? "1" : "0")
    stickyBadgeRef.current.style.setProperty("pointer-events", isAloTechVisible ? "auto" : "none")
  }, [isAloTechVisible])

  return (
    <>
      <div
        className={cn(s.bg, "fixed top-0 left-0 w-full h-full blur-bg opacity-0 hidden lg:block", {
          "pointer-events-none": !open,
        })}
        ref={bgRef}
        onClick={() => setOpen(false)}
      ></div>
      <div className={s.form}>
        <div
          className='relative box bg-gradient-appointment h-full w-0'
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
        >
          <div className='absolute top-0 left-0 w-[80vw] h-full flex right-0'>
            <button
              className={cn(
                s.close,
                "absolute top-2 lg:top-6 left-0 w-16 h-16 z-16 -translate-x-full bg-white p-2 text-bricky-brick",
                "opacity-0 transition-opacity duration-700 ease-in-out",
                "flex items-center justify-center",
                {
                  "opacity-100": open,
                }
              )}
              onClick={() => setOpen(false)}
              type='button'
            >
              <ChevronRight className='w-8 h-8' />
              <span className='sr-only'>Close</span>
            </button>
            <div
              className={cn(
                "absolute top-1/2 left-0 bottom-0 -translate-x-full -translate-y-1/2",
                "h-72 w-16",
                "font-primary font-[500] text-white text-lg xl:text-xl bg-gradient-orange tracking-[0.2em]",
                "inline-flex items-center justify-center",
                "cursor-pointer"
              )}
              onClick={() => setOpen((prev) => !prev)}
              ref={stickyBadgeRef}
            >
              <span className='block xl:-rotate-90 whitespace-nowrap pointer-events-none'>{commonT("inquiry")}</span>
            </div>
            <div className='h-full flex flex-col justify-center'>
              <ScrollableBox className='flex flex-grow-0'>
                <div className='px-4 lg:px-8 py-14 lg:py-8 space-y-8 relative'>
                  <p
                    className={cn(
                      "font-primary font-[300] text-white max-w-[90%]",
                      "text-xl lg:text-xl xl:text-xl 2xl:text-xl",
                      "leading-snug lg:leading-snug xl:leading-snug 2xl:leading-snug",
                      "max-w-lg"
                    )}
                  >
                    {t.rich("description", {
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
