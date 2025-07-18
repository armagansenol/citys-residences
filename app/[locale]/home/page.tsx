import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { FullScreenSlider } from "@/components/full-screen-slider"
import { GsapSplitText } from "@/components/gsap-split-text"
import { Logo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { gsapGlobalClasses, kolajVideo, locationVideo, mainVideo } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"

export default function Home() {
  const t = useTranslations("home")

  const createSlide = (imgSrc: string, index: number) => (
    <div className="relative w-screen h-[70vw] lg:h-[60vw] xl:h-[105vh]" key={index}>
      <Img src={imgSrc} alt={`Slide ${index}`} fill className="w-full h-full object-cover" sizes="100vw" />
    </div>
  )

  const slideImages = {
    slides1: [1, 2, 3, 4].map((num) => `/img/slides-1/${num}.jpg`),
    slides2: [1, 2, 3, 4].map((num) => `/img/slides-2/0${num}.jpg`),
    slides3: [1, 2, 3, 4].map((num) => `/img/slides-3/0${num}.jpg`),
  }

  const slides2 = slideImages.slides2.map((src, index) => createSlide(src, index + 1))
  const slides3 = slideImages.slides3.map((src, index) => createSlide(src, index + 1))

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
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
      </section>
      <section className="bg-white py-0 lg:py-12 z-20 relative">
        <div className=" mx-auto py-12 lg:py-28 xl:pt-16 xl:pb-8 relative flex flex-col items-center px-0 lg:px-10 xl:px-16">
          <div className={cn("w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-10 lg:mb-20", gsapGlobalClasses.fadeIn)}>
            <Logo fill={colors["bricky-brick"]} />
          </div>
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <article className="font-montserrat text-bricky-brick text-4xl lg:text-6xl font-semibold leading-tight lg:leading-tight tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.02} duration={1.5}>
                {t("section1.title1")}
              </GsapSplitText>
              <span className="sr-only">{t("section1.title1")}</span>
            </article>
            <article className={cn("relative w-screen h-24 lg:h-44 xl:h-48", gsapGlobalClasses.fadeIn)}>
              <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="100vw" />
              <span className="sr-only">{t("section1.title2")}</span>
            </article>
            <article className="font-montserrat text-bricky-brick text-4xl lg:text-xl font-regular leading-relaxed tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.01} duration={1.5}>
                {t("section1.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <section
        className={cn(
          "relative py-8 lg:py-20",
          "before:absolute before:bottom-0 before:left-0 before:w-full before:h-1/2 before:bg-unbleached"
        )}
      >
        <div className="section-container">
          <VideoSection
            className={gsapGlobalClasses.fadeIn}
            primaryVideoUrl={kolajVideo}
            thumbnail="/img/thumbnail-kolaj-video.jpg"
            title="Yaşam Yeniden Tasarlandı : City’s."
          />
        </div>
      </section>
      <section className="bg-unbleached py-0 lg:py-12 z-20 relative">
        <div className="mx-auto py-12 lg:py-28 xl:pt-16 xl:pb-8 relative flex flex-col items-center px-0 lg:px-10 xl:px-16">
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <article className="font-montserrat text-bricky-brick text-4xl lg:text-5xl font-semibold leading-tight lg:leading-tight tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.02} duration={1.5}>
                {t("section2.title1")}
              </GsapSplitText>
              <span className="sr-only">{t("section2.title1")}</span>
            </article>
            <article className={cn("relative w-screen h-24 lg:h-44 xl:h-44", gsapGlobalClasses.fadeIn)}>
              <Img src="/img/tam.png" alt="Tam" fill className="object-contain" sizes="100vw" />
              <span className="sr-only">{t("section2.title2")}</span>
            </article>
            <article className="font-montserrat text-bricky-brick text-5xl lg:text-5xl font-semibold leading-tight lg:leading-tight tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.02} duration={1.5}>
                {t("section2.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <section className={cn(gsapGlobalClasses.fadeIn)}>
        <div className="flex gap-8 h-[60vw] relative">
          <h2 className="title-shadow absolute top-28 left-1/2 -translate-x-1/2 font-primary font-bold text-bricky-brick text-3xl lg:text-7xl xl:text-7xl 2xl:text-8xl leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight text-left lg:text-center z-50">
            <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
              {t("live.p1.title")}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              "absolute bottom-64 left-32",
              "font-primary font-semibold text-white text-base lg:text-4xl xl:text-2xl leading-relaxed lg:leading-relaxed xl:leading-relaxed lg:max-w-2xl xl:max-w-lg",
              "blur-bg-bricky-brick z-50 p-4 rounded-md"
            )}
          >
            {t("live.p1.description")}
          </p>
          <Video
            primaryVideoUrl={locationVideo}
            autoPlay
            loop
            muted
            playsInline
            className="relative w-full h-full object-cover z-0"
          />
        </div>
      </section>
      <section className={cn("py-12 lg:py-8", gsapGlobalClasses.fadeIn)}>
        <FullScreenSlider title={t("live.p2.title")} description={t("live.p2.description")} items={slides2} />
      </section>
      <AnimatedLine direction="horizontal" />
      <section className={cn("py-12 lg:py-8 mt-8", gsapGlobalClasses.fadeIn)}>
        <FullScreenSlider title={t("live.p3.title")} description={t("live.p3.description")} items={slides3} />
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage next={{ title: "Daireler", href: "/residences" }} />
    </Wrapper>
  )
}
