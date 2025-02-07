import { ContactForm } from "@/components/form-contact"
import { LogoHorizontal } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Video } from "@/components/utility/video"

export default function Contact() {
  return (
    <div className="flex flex-col-reverse lg:flex-col xl:grid grid-cols-2 h-auto lg:h-screen w-screen">
      <div className="col-span-1 p-4 lg:p-5 md:p-10 space-y-4 md:space-y-10 flex flex-col justify-start">
        <div className="flex items-center justify-between py-2 md:py-4 border-b border-bricky-brick-light">
          <div className="w-48 md:w-64">
            <LogoHorizontal />
          </div>
          <div>
            <LocaleSwitcher theme="dark" />
          </div>
        </div>
        <div className="block lg:hidden col-span-1 -mx-4">
          <Video
            primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-neutral-900 text-lg md:text-xl font-normal font-halenoir max-w-xl">
          Lütfen iletişim bilgilerinizi giriniz. Satış ekibimiz kısa süre içinde sizinle iletişime geçecektir.
        </h1>
        <ContactForm />
      </div>
      <div className="hidden lg:block col-span-1">
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
  )
}
