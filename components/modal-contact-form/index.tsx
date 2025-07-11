"use client"

import s from "./modal-contact-form.module.css"

import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useLenis } from "lenis/react"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { ContactForm } from "@/components/form-contact"
import { gsap } from "@/components/gsap"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { useEsc } from "@/hooks/useEsc"
import { FormTranslations } from "@/types"
import { useVisibilityStore } from "@/lib/store/visibility"

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
            duration: 0.6,
            ease: "power2.inOut",
          },
          "s"
        )
        .fromTo(
          formRef.current,
          { width: "0" },
          {
            width: "700px",
            duration: 1,
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
      <div className={cn(s.form)}>
        <div className={cn("relative box bg-brilliance h-full w-0")} onClick={(e) => e.stopPropagation()} ref={formRef}>
          <div className="absolute top-0 left-0 w-[700px] h-full flex right-0">
            <button
              className={cn(
                s.close,
                "absolute top-2 lg:top-6 -left-2 lg:-left-6 w-10 h-10 z-10 -translate-x-full bg-white rounded-full p-2 text-bricky-brick",
                "opacity-0 transition-opacity duration-700 ease-in-out",
                {
                  "opacity-100": open,
                }
              )}
              onClick={() => setOpen(false)}
              type="button"
            >
              <X />
            </button>
            <div
              className={cn(
                "absolute top-1/2 left-0 bottom-0 -translate-x-full -translate-y-1/2",
                "h-64 w-12",
                "font-primary font-normal text-white text-lg xl:text-2xl blur-bg-bricky-brick",
                "rounded-bl-2xl rounded-tl-2xl",
                "inline-flex items-center justify-center",
                "cursor-pointer"
              )}
              onClick={() => setOpen((prev) => !prev)}
              ref={stickyBadgeRef}
            >
              <span className="block xl:-rotate-90 whitespace-nowrap pointer-events-none">{commonT("inquiry")}</span>
            </div>
            <div className="h-full flex flex-col justify-center">
              <ScrollableBox className="flex flex-grow-0">
                <div className="px-4 lg:px-8 py-14 lg:py-8 space-y-8">
                  <h2 className="text-neutral-900 text-base lg:text-sm font-normal font-primary text-left lg:text-center xl:text-left leading-normal">
                    {t.rich("description", {
                      br: () => <br className="hidden lg:block" />,
                    })}
                  </h2>
                  <ContactForm translations={formTranslations} />
                </div>
              </ScrollableBox>
            </div>
            {/* <div className="hidden xl:block col-span-1">
                  <Video
                    primaryVideoUrl={mainVideoDesktop}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
