"use client"

import s from "./modal-contact-form.module.css"

import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useLenis } from "lenis/react"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"

import { ContactForm } from "@/components/form-contact"
import { gsap } from "@/components/gsap"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { useEsc } from "@/hooks/useEsc"
import { FormTranslations } from "@/types"

export function ModalContactForm() {
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
        placeholder: t("form.inputs.consent.placeholder"),
        errors: {
          required: t("form.inputs.consent.errors.required"),
        },
      },
      consentElectronicMessage: {
        placeholder: t("form.inputs.consentElectronicMessage.placeholder"),
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
      if (open) {
        menuTL.current?.play()
        lenis?.stop()
      } else {
        menuTL.current?.reverse()
        lenis?.start()
      }
    },

    {
      dependencies: [open, lenis],
      revertOnUpdate: true,
    }
  )

  return (
    <>
      <div
        className={cn("fixed top-0 left-0 w-full h-full blur-bg opacity-0 z-[150] hidden bt:block", {
          "pointer-events-none": !open,
        })}
        ref={bgRef}
        onClick={() => setOpen(false)}
      ></div>
      <div className={cn(s.form)}>
        <div className={cn("relative box bg-white h-full w-0")} onClick={(e) => e.stopPropagation()} ref={formRef}>
          <div className="absolute top-0 left-0 w-[700px] h-full flex right-0">
            <button
              className={cn(
                s.close,
                "absolute top-2 bt:top-6 -left-2 bt:-left-6 w-10 h-10 z-10 -translate-x-full bg-white rounded-full p-2 text-bricky-brick",
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
                "h-72 w-16",
                "font-montserrat font-normal text-white text-lg bd:text-2xl blur-bg-bricky-brick",
                "rounded-bl-2xl rounded-tl-2xl",
                "inline-flex items-center justify-center",
                "cursor-pointer",
                "opacity-90"
              )}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="block bd:-rotate-90 whitespace-nowrap pointer-events-none">{commonT("inquiry")}</span>
            </div>
            <ScrollableBox className="h-full">
              <div className="px-4 bt:px-12 py-14 bt:py-16 space-y-8">
                <h2 className="text-neutral-900 text-base bt:text-sm font-normal font-halenoir text-left bt:text-center bd:text-left leading-normal">
                  {t.rich("description", {
                    br: () => <br className="hidden bt:block" />,
                  })}
                </h2>
                <ContactForm translations={formTranslations} />
              </div>
            </ScrollableBox>
            {/* <div className="hidden bd:block col-span-1">
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
