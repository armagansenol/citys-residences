import { cn } from "@/lib/utils"
import { getMessages, getTranslations } from "next-intl/server"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { ContactForm } from "@/components/form-contact"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCollab } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { VideoWithText } from "@/components/video-with-text"
import { WistiaPlayerWrapper } from "@/components/wistia-player"
import { citysParkVideo, navigationConfig } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"
import { FormTranslations } from "@/types"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "home" })
  const messages = await getMessages({ locale })
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form

  return (
    <>
      <section className='h-svh bg-bricky-brick relative z-10 overflow-hidden' id={navigationConfig["/"]?.id}>
        <ScaleOut>
          {/* <Video
            primaryVideoUrl={mainVideo}
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-full object-cover object-bottom'
          /> */}
          <div className='w-full h-screen relative pointer-events-none'>
            <WistiaPlayerWrapper
              aspect={16 / 9}
              mediaId='e2tew1zhxj'
              autoplay
              muted
              silentAutoplay
              preload='metadata'
              qualityMin={1080}
            />
          </div>
        </ScaleOut>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
          <div className={cn("flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0")}>
            <span
              className={cn(
                "font-montserrat font-[500] text-white text-center whitespace-nowrap",
                "text-2xl sm:text-3xl lg:text-5xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl",
                "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight",
                "flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0"
              )}
            >
              Yaşam Yeniden Tasarlandı
            </span>
            <span className='w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 mx-8'>
              <IconCollab fill={colors.white} />
            </span>
            <span
              className={cn(
                "font-copperplate font-semibold text-white text-center",
                "text-[44px] lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl",
                "leading-[0] translate-y-1 block"
              )}
            >
              CITY<span className='font-montagu-slab font-normal leading-[0.5]'>&apos;</span>S
            </span>
          </div>
        </div>
      </section>
      {/* YAŞAMA SANATI */}
      <section className='bg-white py-12 lg:py-12 z-20 relative'>
        <div className='py-12 xl:py-28 relative flex items-center justify-center'>
          <div className='flex flex-col items-center gap-2 lg:gap-2 w-72'>
            <article
              className={cn(
                "font-montserrat font-[400] text-trapped-darkness text-center",
                "text-4xl lg:text-5xl",
                "leading-tight lg:leading-tight",
                "tracking-wide lg:tracking-widest"
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.02} duration={1.5}>
                {t("section1.title1")}
              </GsapSplitText>
              <span className='sr-only'>{t("section1.title1")}</span>
            </article>
            <FadeInOnScroll delay={0.5}>
              <article className='relative w-screen h-16 lg:h-44 xl:h-36'>
                <Img src='/img/sanati.png' alt='Sanatı' fill className='object-contain' sizes='100vw' loading='lazy' />
                <span className='sr-only'>{t("section1.title2")}</span>
              </article>
            </FadeInOnScroll>
          </div>
          <div className='flex w-72'>
            <article
              className={cn(
                "font-montserrat font-[400] text-trapped-darkness text-left",
                "text-[0.8rem] lg:text-xl",
                "leading-relaxed"
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.01} duration={1.5}>
                {t("section1.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <VideoWithText
        primaryVideoUrl={citysParkVideo}
        title={
          <span>
            Daha <strong>huzurlu</strong> yaşa.
          </span>
        }
        description={
          <>
            Farklı ve zamansız mimarinin, doğanın cömertliği ile buluştuğu mekanlarda güven içinde, daha huzurlu yaşa.
          </>
        }
      />
      <section className='py-8 xl:py-40 bg-gradient-appointment'>
        <div className='grid grid-cols-12 lg:grid-cols-24 lg:col-start-4 px-4 lg:px-0'>
          <div className='col-span-12 lg:col-span-18 lg:col-start-6 mb-12 lg:mb-24'>
            <h3
              className={cn(
                "font-primary font-[400] text-white  mb-4 lg:mb-4",
                "text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl",
                "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
              )}
            >
              Randevu Al
            </h3>
            <p
              className={cn(
                "font-primary font-[300] text-white max-w-[90%]",
                "text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl",
                "leading-snug lg:leading-snug xl:leading-snug 2xl:leading-snug",
                "max-w-lg"
              )}
            >
              Ekibimizin sizinle iletişime geçebilmesi için lütfen kayıt formunu doldurunuz.
            </p>
          </div>
          <div className='col-span-12 lg:col-span-18 lg:col-start-6'>
            <ContactForm translations={formTranslations} />
          </div>
        </div>
      </section>
      <VideoWithText
        primaryVideoUrl={citysParkVideo}
        title={
          <span>
            Daha <strong>dolu</strong> yaşa.
          </span>
        }
        description={
          <>
            Spor, sanat, kültür, alışveriş, eğlence ve çok daha fazlasını bir araya getiren yeni bir yaşam dizaynı ile
            daha dolu yaşa.
          </>
        }
      />
    </>
  )
}
