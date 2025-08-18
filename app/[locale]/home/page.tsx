import { cn } from "@/lib/utils"
import { getTranslations } from "next-intl/server"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { IconCollab, Logo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { kolajVideo, locationVideo, mainVideo, navigationConfig } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"
import { AnimatedLine } from "@/components/animated-line"
import { FullScreenSlider } from "@/components/full-screen-slider"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "home" })
  // const tCommon = await getTranslations({ locale, namespace: "common.navigation" })

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
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden" id={navigationConfig["/"]?.id}>
        <ScaleOut>
          <Video
            primaryVideoUrl={mainVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-bottom"
          />
        </ScaleOut>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div
            className={cn(
              "font-montserrat font-semibold text-white text-center",
              "text-3xl lg:text-5xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl",
              "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight",
              "flex flex-col lg:flex-row items-center justify-center"
            )}
          >
            <span className="whitespace-nowrap">Yaşam Yeniden Tasarlandı</span>
            <span className="w-12 h-12 mx-8">
              <IconCollab fill={colors.white} />
            </span>
            <span className="whitespace-nowrap">CITY&apos;S</span>
          </div>
        </div>
      </section>
      {/* YAŞAMA SANATI */}
      <section className="bg-white py-0 lg:py-12 z-20 relative">
        <div className="mx-auto py-12 lg:py-28 xl:pt-16 xl:pb-8 relative flex flex-col items-center px-0 lg:px-10 xl:px-16">
          <FadeInOnScroll>
            <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-10 lg:mb-20">
              <Logo fill={colors["bricky-brick"]} />
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <div className="flex flex-col items-center gap-2 lg:gap-2">
              <article
                className={cn(
                  "font-montserrat font-semibold text-bricky-brick text-center",
                  "text-5xl lg:text-6xl",
                  "leading-tight lg:leading-tight",
                  "tracking-wide lg:tracking-widest"
                )}
              >
                <GsapSplitText splitBy="chars" stagger={0.02} duration={1.5}>
                  {t("section1.title1")}
                </GsapSplitText>
                <span className="sr-only">{t("section1.title1")}</span>
              </article>
              <article className={"relative w-screen h-24 lg:h-44 xl:h-36"}>
                <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="100vw" loading="lazy" />
                <span className="sr-only">{t("section1.title2")}</span>
              </article>
              <article
                className={cn(
                  "font-montserrat font-medium text-bricky-brick text-center",
                  "text-sm lg:text-xl",
                  "leading-relaxed tracking-wide lg:tracking-widest"
                )}
              >
                <GsapSplitText splitBy="chars" stagger={0.01} duration={1.5}>
                  {t("section1.title3")}
                </GsapSplitText>
              </article>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
      <section
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
                  <span className="font-montserrat whitespace-nowrap text-2xl lg:text-5xl">
                    Yaşam Yeniden Tasarlandı
                  </span>
                  <span className="w-12 h-12 mx-8">
                    <IconCollab fill={colors.white} />
                  </span>
                  <span className="font-montserrat whitespace-nowrap text-2xl lg:text-5xl">CITY&apos;S</span>
                </>
              }
            />
          </div>
        </FadeInOnScroll>
      </section>
      {/* YAŞAMIN TAM MERKEZİNDE */}
      <section className="bg-unbleached py-6 lg:py-12 z-20 relative">
        <FadeInOnScroll>
          <div className="mx-auto py-12 lg:py-28 xl:pt-16 xl:pb-8 relative flex flex-col items-center px-0 lg:px-10 xl:px-16">
            <div className="flex flex-col items-center gap-4 lg:gap-8">
              <article
                className={cn(
                  "font-montserrat text-bricky-brick text-center",
                  "text-4xl lg:text-5xl",
                  "font-semibold leading-tight lg:leading-tight",
                  "tracking-wide lg:tracking-widest"
                )}
              >
                <GsapSplitText splitBy="chars" stagger={0.02} duration={1.5}>
                  {t("section2.title1")}
                </GsapSplitText>
                <span className="sr-only">{t("section2.title1")}</span>
              </article>
              <article className={"relative w-screen h-28 lg:h-44 xl:h-44"}>
                <Img src="/img/tam.png" alt="Tam" fill className="object-contain" sizes="100vw" loading="lazy" />
                <span className="sr-only">{t("section2.title2")}</span>
              </article>
              <article
                className={cn(
                  "font-montserrat font-semibold text-bricky-brick text-center",
                  "text-4xl lg:text-5xl",
                  "leading-tight lg:leading-tight",
                  "tracking-wide lg:tracking-widest"
                )}
              >
                <GsapSplitText splitBy="chars" stagger={0.02} duration={1.5}>
                  {t("section2.title3")}
                </GsapSplitText>
              </article>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
      {/* LOCATION VIDEO */}
      <FadeInOnScroll>
        <section className="flex flex-col h-auto lg:h-[50vw] relative bg-white py-12 lg:py-0">
          <h2
            className={cn(
              "relative lg:absolute lg:top-28 lg:left-1/2 lg:-translate-x-1/2",
              "font-primary font-bold text-bricky-brick lg:title-shadow text-center z-50 mb-4 lg:mb-0",
              "text-4xl lg:text-7xl xl:text-7xl 2xl:text-7xl",
              "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
            )}
          >
            <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
              {t("live.p1.title")}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              "relative lg:absolute lg:bottom-14 lg:left-14",
              "description-bg py-0 lg:py-4 px-6 lg:px-8 mb-8 lg:mb-0 lg:rounded-md z-50",
              "font-primary font-normal",
              "text-black lg:text-white text-center lg:text-left",
              "text-2xl lg:text-4xl xl:text-2xl",
              "leading-snug lg:leading-snug xl:leading-snug",
              "xl:w-[500px]"
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
            className="w-full h-[70vw] lg:h-full object-cover z-0"
          />
        </section>
      </FadeInOnScroll>
      <section className="pb-12 lg:pb-12 pt-0 lg:pt-12">
        <HorizontalScroll
          className="hidden xl:block"
          title={t("live.p2.title")}
          description={t.rich("live.p2.description", {
            br: () => <br className="block xl:hidden" />,
          })}
          items={slideImages.slides2}
        />
        <FullScreenSlider
          className="block xl:hidden"
          title={t("live.p2.title")}
          description={t.rich("live.p2.description", {
            br: () => <br />,
          })}
          items={slideImages.slides2}
        />
      </section>
      <section className="pb-12 lg:pb-12 pt-0 lg:pt-12">
        <HorizontalScroll
          className="hidden xl:block"
          title={t("live.p3.title")}
          description={t.rich("live.p3.description", {
            br: () => <br className="block xl:hidden" />,
          })}
          items={slideImages.slides3}
        />
        <FullScreenSlider
          className="block xl:hidden"
          title={t("live.p3.title")}
          description={t.rich("live.p3.description", {
            br: () => <br />,
          })}
          items={slideImages.slides3}
        />
      </section>
      <AnimatedLine direction="horizontal" />
    </>
  )
}
