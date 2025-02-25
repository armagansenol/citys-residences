"use client"

import s from "./modal-contact-form.module.css"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

import { ContactForm } from "@/components/form-contact"
import { gsap } from "@/components/gsap"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { Video } from "@/components/utility/video"
import { FormTranslations } from "@/types"

interface ModalContactFormProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function ModalContactForm({ open, setOpen }: ModalContactFormProps) {
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslations("contact")

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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [open, setOpen])

  useGSAP(
    () => {
      menuTL.current = gsap.timeline({
        paused: true,
      })

      menuTL.current?.fromTo(
        ref.current,
        { clipPath: "inset(0% 0% 0% 100%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "expo.inOut",
        }
      )
    },

    {
      scope: ref,
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      if (open) {
        menuTL.current?.play()
      } else {
        menuTL.current?.reverse()
      }
    },
    {
      dependencies: [open],
      revertOnUpdate: true,
    }
  )

  return (
    <div className={cn(s.frame, "blur-bg")} ref={ref} onClick={() => setOpen(false)}>
      <div className={cn(s.wrapper, "wrapper")}>
        <div className={cn(s.menu, "menu")}>
          <div className={cn(s.content, "flex items-center justify-center w-full h-full")}>
            <div className={cn(s.box, "relative rounded-lg overflow-hidden h-full")}>
              <button
                className={cn(
                  s.close,
                  "absolute top-4 right-4 w-10 h-10 z-10 bg-white rounded-full p-2 text-bricky-brick"
                )}
                onClick={() => setOpen(false)}
                type="button"
              >
                <X />
              </button>
              <div className="bg-white grid grid-cols-2 w-full h-full" onClick={(e) => e.stopPropagation()}>
                <div className="col-span-1 flex flex-col justify-center gap-10 px-12 h-full overflow-hidden">
                  <ScrollableBox>
                    <div className="py-16 space-y-8">
                      <h2 className="text-neutral-900 text-base bt:text-sm font-normal font-halenoir text-left bt:text-center bd:text-left leading-normal">
                        {t.rich("description", {
                          br: () => <br className="hidden bt:block" />,
                        })}
                      </h2>
                      <ContactForm translations={formTranslations} />
                    </div>
                  </ScrollableBox>
                </div>
                <div className="col-span-1 bg-slate-400">
                  <Video
                    primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
