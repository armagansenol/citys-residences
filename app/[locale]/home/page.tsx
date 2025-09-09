import { cn } from "@/lib/utils"
import { getTranslations, getMessages } from "next-intl/server"

import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { FullScreenSlider } from "@/components/full-screen-slider"
import { GsapSplitText } from "@/components/gsap-split-text"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { IconCollab, Logo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { locationVideo, mainVideo, navigationConfig } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"
import { ContactForm } from "@/components/form-contact"
import { FormTranslations } from "@/types"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "home" })
  const messages = await getMessages({ locale })
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form

  // const createSlide = (imgSrc: string, index: number) => (
  //   <div className="relative w-screen h-[70vw] lg:h-[60vw] xl:h-[105vh]" key={index}>
  //     <Img src={imgSrc} alt={`Slide ${index}`} fill className="w-full h-full object-cover" sizes="100vw" />
  //   </div>
  // )

  const slideImages = {
    slides1: [1, 2, 3, 4].map((num) => `/img/slides-1/${num}.jpg`),
    slides2: [1, 2, 3, 4].map((num) => `/img/slides-2/0${num}.jpg`),
    slides3: [1, 2, 3, 4].map((num) => `/img/slides-3/0${num}.jpg`),
  }

  // const slides2 = slideImages.slides2.map((src, index) => createSlide(src, index + 1))
  // const slides3 = slideImages.slides3.map((src, index) => createSlide(src, index + 1))

  return (
    <>
      <section className='h-svh bg-bricky-brick relative z-10 overflow-hidden' id={navigationConfig["/"]?.id}>
        <ScaleOut>
          <Video
            primaryVideoUrl={mainVideo}
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-full object-cover object-bottom'
          />
        </ScaleOut>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
          <div className={cn("flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0")}>
            <span
              className={cn(
                "font-montserrat font-medium lg:font-semibold text-white text-center whitespace-nowrap",
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
                "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
              )}
            >
              CITY<span className='font-montagu-slab font-normal'>&apos;</span>S
            </span>
          </div>
        </div>
      </section>
      {/* YAŞAMA SANATI */}
      <section className='bg-white py-12 lg:py-12 z-20 relative'>
        <div className='mx-auto py-12 xl:py-28 xl:pt-16 xl:pb-32 relative flex flex-col items-center px-0 lg:px-10 xl:px-16'>
          <div className='w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-20 lg:mb-20'>
            <FadeInOnScroll delay={0.5}>
              <Logo fill={colors["bricky-brick"]} />
            </FadeInOnScroll>
          </div>
          <div className='flex flex-col items-center gap-2 lg:gap-2'>
            <article
              className={cn(
                "font-montserrat font-semibold text-bricky-brick text-center",
                "text-4xl lg:text-6xl",
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
            <article
              className={cn(
                "font-montserrat font-medium text-bricky-brick text-center",
                "text-[0.8rem] lg:text-xl",
                "leading-relaxed tracking-wide lg:tracking-widest"
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.01} duration={1.5}>
                {t("section1.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      {/* <section
        className={cn(
          "relative py-0 lg:py-12",
          "before:absolute before:bottom-0 before:left-0 before:w-full before:h-1/2 before:bg-unbleached"
        )}
      >
        <FadeInOnScroll>
          <div className="section-container">
            <VideoSection
              primaryVideoUrl={kolajVideo}
              thumbnail="/img/thumbnail-kolaj-video.jpg"
              title={
                <>
                  <span
                    className={cn(
                      "font-normal lg:font-semibold text-white text-center whitespace-nowrap",
                      "text-2xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl",
                      "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
                    )}
                  >
                    Yaşam Yeniden Tasarlandı
                  </span>
                  <span className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 mx-8">
                    <IconCollab fill={colors.white} />
                  </span>
                  <span
                    className={cn(
                      "font-copperplate font-semibold text-white text-center",
                      "text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl",
                      "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
                    )}
                  >
                    CITY<span className="font-montagu-slab font-normal">&apos;</span>S
                  </span>
                </>
              }
            />
          </div>
        </FadeInOnScroll>
      </section> */}
      <div className='w-screen h-svh lg:h-[55vw] xl:h-screen bg-bricky-brick/30 relative'>
        <Img src='/img/from-sky.jpg' alt='Lunas' fill sizes='100vw' className='object-cover' />
      </div>
      {/* YAŞAMIN TAM MERKEZİNDE */}
      <section className='bg-unbleached py-16 lg:py-12 z-20 relative'>
        <div className='mx-auto py-12 xl:pt-32 xl:pb-32 relative flex flex-col items-center px-0 lg:px-10 xl:px-16'>
          <div className='flex flex-col items-center gap-4 lg:gap-8'>
            <article
              className={cn(
                "font-montserrat text-bricky-brick text-center",
                "text-3xl lg:text-5xl",
                "font-semibold leading-tight lg:leading-tight",
                "tracking-wide lg:tracking-widest"
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.02} duration={1.5}>
                {t("section2.title1")}
              </GsapSplitText>
              <span className='sr-only'>{t("section2.title1")}</span>
            </article>
            <FadeInOnScroll delay={0.5}>
              <article className={"relative w-screen h-24 lg:h-44 xl:h-44"}>
                <Img src='/img/tam.png' alt='Tam' fill className='object-contain' sizes='100vw' loading='lazy' />
                <span className='sr-only'>{t("section2.title2")}</span>
              </article>
            </FadeInOnScroll>
            <article
              className={cn(
                "font-montserrat font-semibold text-bricky-brick text-center",
                "text-3xl lg:text-5xl",
                "leading-tight lg:leading-tight",
                "tracking-wide lg:tracking-widest"
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.02} duration={1.5}>
                {t("section2.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      {/* LOCATION VIDEO */}
      <FadeInOnScroll>
        <section className='flex flex-col h-auto lg:h-[65vw] xl:h-[50vw] relative bg-white py-12 lg:py-0'>
          <h2
            className={cn(
              "relative lg:absolute lg:top-28 lg:left-1/2 lg:-translate-x-1/2",
              "font-primary font-bold text-bricky-brick lg:title-shadow text-center z-50 mb-4 lg:mb-0",
              "text-3xl lg:text-6xl xl:text-7xl 2xl:text-7xl",
              "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
            )}
          >
            {/* <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}> */}
            {t("live.p1.title")}
            {/* </GsapSplitText> */}
          </h2>
          <p
            className={cn(
              "relative lg:absolute lg:bottom-14 lg:left-14",
              "description-bg py-0 lg:py-4 px-6 lg:px-8 mb-8 lg:mb-0 lg:rounded-md z-50",
              "font-primary font-normal",
              "text-black lg:text-white text-center lg:text-left",
              "text-xl lg:text-2xl xl:text-2xl",
              "leading-snug lg:leading-snug xl:leading-snug",
              "lg:w-[460px] xl:w-[500px]"
            )}
          >
            {t.rich("live.p1.description", {
              br: () => <br />,
            })}
          </p>
          <Video
            primaryVideoUrl={locationVideo}
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-[70vw] lg:h-full object-cover z-0'
          />
        </section>
      </FadeInOnScroll>
      <section className='pb-12 lg:pb-12 pt-0 lg:pt-12'>
        <HorizontalScroll
          className='hidden xl:block'
          title={t("live.p2.title")}
          description={t.rich("live.p2.description", {
            br: () => <br className='block xl:hidden' />,
          })}
          items={slideImages.slides2}
        />
        <FullScreenSlider
          className='block xl:hidden'
          title={t("live.p2.title")}
          description={t.rich("live.p2.description", {
            br: () => <br />,
          })}
          items={slideImages.slides2}
        />
      </section>
      <section className='section-container mb-8 xl:mb-0 py-8 xl:py-16'>
        <div className='grid grid-cols-12 lg:grid-cols-24 px-4 lg:px-0'>
          <div className='col-span-12 lg:col-span-10'>
            <h3
              className={cn(
                "font-primary font-bold text-bricky-brick  mb-4 lg:mb-4",
                "text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl",
                "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
              )}
            >
              İletişim Formu
            </h3>
            <p
              className={cn(
                "font-primary font-normal text-black max-w-[90%]",
                "text-base lg:text-base xl:text-base 2xl:text-base",
                "leading-snug lg:leading-snug xl:leading-snug 2xl:leading-snug"
              )}
            >
              City&apos;s Residences projesine gösterdiğiniz ilgi için teşekkür ederiz. <br />
              Ekibimizin sizinle iletişime geçebilmesi için lütfen kayıt formunu doldurunuz.
            </p>
          </div>
          <div className='col-span-12 lg:col-span-14'>
            <ContactForm translations={formTranslations} />
          </div>
        </div>
      </section>
      <section className='pb-0 lg:pb-12 pt-0 xl:pt-12'>
        <HorizontalScroll
          className='hidden xl:block'
          title={t("live.p3.title")}
          description={t.rich("live.p3.description", {
            br: () => <br className='block xl:hidden' />,
          })}
          items={slideImages.slides3}
        />
        <FullScreenSlider
          className='block xl:hidden'
          title={t("live.p3.title")}
          description={t.rich("live.p3.description", {
            br: () => <br />,
          })}
          items={slideImages.slides3}
        />
      </section>
      <AnimatedLine direction='horizontal' />
    </>
  )
}
