"use client"

import { useGSAP } from "@gsap/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"

import { ContactForm } from "@/components/form-contact"
import { gsap, ScrollTrigger } from "@/components/gsap"
import { IconInquiry, IconTelephone, IconWhatsapp } from "@/components/icons"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Link } from "@/components/utility/link"
import { FormTranslations } from "@/types"

export default function StickyContactMenu() {
  const t = useTranslations("contact")
  const ref = useRef<HTMLDivElement>(null)

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

  useGSAP(() => {
    gsap.to(ref.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })

    ScrollTrigger.create({
      trigger: ref.current,
      end: `${ScrollTrigger.maxScroll(window) - window.innerHeight * 2}`,
      onLeave: () => {
        gsap.to(ref.current, {
          yPercent: 100,
          duration: 0.4,
          ease: "power2.inOut",
        })
      },
      onEnterBack: () => {
        gsap.to(ref.current, {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.inOut",
        })
      },
    })
  })

  return (
    <>
      <div
        className="font-montserrat fixed left-0 bottom-0 right-0 bg-bricky-brick grid grid-cols-3 z-[10] bt:hidden"
        ref={ref}
      >
        <Link
          href="tel:+902162666600"
          className="py-3 text-white flex flex-col items-center justify-center gap-2 border-r border-black/15"
        >
          <IconTelephone className="w-6 h-6" />
          <div className="text-sm font-medium leading-none">Telefon</div>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <div className="py-3 text-white flex flex-col items-center justify-center gap-2 border-r border-black/15">
              <IconInquiry className="w-6 h-6" />
              <div className="text-sm font-medium leading-none">Randevu Al</div>
            </div>
          </DialogTrigger>
          <DialogContent className="py-10 h-[90vh] w-[94vw] rounded-md">
            <div className="h-full overflow-y-scroll">
              <ContactForm translations={formTranslations} />
            </div>
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
    </>
  )
}
