"use client"

import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { ContactForm } from "@/components/form-contact"
import { IconInquiry, IconTelephone, IconWhatsapp } from "@/components/icons"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Link } from "@/components/utility/link"
import { useVisibilityStore } from "@/lib/store/visibility"
import { FormTranslations } from "@/types"

export function StickyContactMenu() {
  const t = useTranslations("contact")
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { isStickyContactMenuVisible } = useVisibilityStore()
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

  useEffect(() => {
    return isOpen ? lenis?.stop() : lenis?.start()
  }, [isOpen, lenis])

  return (
    <div
      className={cn(
        "font-montserrat fixed left-0 bottom-0 right-0 blur-bg-bricky-brick-light grid grid-cols-3 z-[var(--z-sticky)] bt:hidden",
        "transition-opacity duration-300 ease-in-out",
        {
          "opacity-100": isStickyContactMenuVisible,
          "opacity-0": !isStickyContactMenuVisible,
        }
      )}
      ref={ref}
    >
      <Link
        href="tel:+902162666600"
        className="py-3 text-white flex flex-col items-center justify-center gap-2 border-r border-black/15"
      >
        <IconTelephone className="w-6 h-6" />
        <div className="text-sm font-medium leading-none">Telefon</div>
      </Link>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="py-3 text-white flex flex-col items-center justify-center gap-2 border-r border-black/15">
            <IconInquiry className="w-6 h-6" />
            <div className="text-sm font-medium leading-none">Randevu Al</div>
          </div>
        </DialogTrigger>
        <DialogContent className="py-0 px-4 w-[96vw] rounded-tr-3xl rounded-tl-3xl h-screen">
          {/* <DialogClose>
            <X className="fixed top-4 right-4 w-6 h-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose> */}
          <p className="text-neutral-900 text-base bt:text-sm font-normal font-halenoir text-left bt:text-center bd:text-left leading-normal mt-5">
            {t.rich("description", {
              br: () => <br className="hidden bt:block" />,
            })}
          </p>
          <ContactForm translations={formTranslations} />
        </DialogContent>
      </Dialog>
      <Link
        href="https://wa.me/02162666600"
        className="py-3 text-white flex flex-col items-center justify-center gap-2"
      >
        <IconWhatsapp className="w-6 h-6" />
        <div className="text-sm font-medium leading-none">Whatsapp</div>
      </Link>
    </div>
  )
}
