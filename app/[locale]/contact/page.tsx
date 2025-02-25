import { useTranslations } from "next-intl"
import Image from "next/image"

import { ContactForm } from "@/components/form-contact"
import { FormTranslations } from "@/types"
import { Wrapper } from "@/components/wrapper"

export default function Contact() {
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

  // const video = (
  //   <Video
  //     primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
  //     autoPlay
  //     loop
  //     muted
  //     playsInline
  //     className="w-full h-full object-cover"
  //   />
  // )

  return (
    <Wrapper>
      <div className="flex flex-col bd:grid grid-cols-2 mt-[var(--header-height)]">
        <div className="col-span-1 flex flex-col">
          <div className="flex flex-col items-center justify-center bd:items-start gap-6 bt:gap-8 px-4 bt:px-12 pb-8 bt:pb-0">
            <div className="bd:hidden col-span-1 -mx-4 bt:-mx-12 py-4 bt:py-8 px-4 bt:px-64 bd:px-32 flex items-center justify-center">
              <Image src="/img/yasama-sanati.png" alt="Contact Form Image" width={1500} height={1500} />
            </div>
            <h2 className="text-neutral-900 text-base bt:text-sm font-normal font-halenoir text-left bt:text-center bd:text-left leading-normal">
              {t.rich("description", {
                br: () => <br className="hidden bt:block" />,
              })}
            </h2>
            <div className="bt:px-12 bd:px-0 pb-12 bt:pb-0 bd:pb-12">
              <ContactForm translations={formTranslations} />
            </div>
          </div>
        </div>
        <div className="col-span-1 bd:flex items-center px-16">
          <Image src="/img/yasama-sanati.png" alt="Contact Form Image" width={1500} height={1500} />
        </div>
      </div>
    </Wrapper>
  )
}
