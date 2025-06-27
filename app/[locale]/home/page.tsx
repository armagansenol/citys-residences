import s from "./home.module.css"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { FullScreenSlider } from "@/components/full-screen-slider"
import { Logo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { kolajVideo, locationVideo, mainVideo, muratKaderVideo } from "@/lib/constants"
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
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video primaryVideoUrl={mainVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </ScaleOut>
      </section>
      <section className="bg-white py-0 bt:py-12 z-20 relative">
        <div className=" mx-auto py-12 bt:py-28 bd:pt-16 bd:pb-8 relative flex flex-col items-center px-0 bt:px-10 bd:px-16">
          <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-10 lg:mb-20">
            <Logo fill={colors["bricky-brick"]} />
          </div>
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <article className="relative w-screen h-10 lg:h-20 xl:h-24">
              <FadeInOnScroll>
                <Img src="/img/yasama.svg" alt="Sanatı" fill className="object-contain" sizes="100vw" />
              </FadeInOnScroll>
              <span className="sr-only">{t("section1.title1")}</span>
            </article>
            <article className="relative w-screen h-20 lg:h-44 xl:h-64">
              <FadeInOnScroll>
                <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="100vw" />
              </FadeInOnScroll>
              <span className="sr-only">{t("section1.title2")}</span>
            </article>
            <article className="font-montserrat text-bricky-brick text-md bt:text-3xl font-normal tracking-wide bt:tracking-widest text-center">
              <GsapSplitText splitBy="lines" stagger={0.01}>
                {t("section1.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-unbleached py-0 bt:py-12 z-20 relative">
        <div className=" mx-auto py-12 bt:py-28 bd:pt-16 bd:pb-8 relative flex flex-col items-center px-0 bt:px-10 bd:px-16">
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <article className="font-montserrat text-bricky-brick text-4xl bt:text-6xl font-semibold leading-relaxed tracking-wide bt:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.05}>
                {t("section2.title1")}
              </GsapSplitText>
              <span className="sr-only">{t("section2.title1")}</span>
            </article>
            <article className="relative w-screen h-24 lg:h-44 xl:h-64">
              <FadeInOnScroll>
                <Img src="/img/tam.png" alt="Tam" fill className="object-contain" sizes="100vw" />
              </FadeInOnScroll>
              <span className="sr-only">{t("section2.title2")}</span>
            </article>
            <article className="font-montserrat text-bricky-brick text-4xl bt:text-7xl font-semibold leading-relaxed tracking-wide bt:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.05}>
                {t("section2.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <section className="relative  py-8 bt:py-20 section-container">
        <VideoSection
          primaryVideoUrl={kolajVideo}
          thumbnail="/img/thumbnail-kolaj-video.jpg"
          title="Denge Mimarisi: Karma Yaşam Tasarımı"
        />
      </section>
      <section className=" flex flex-col-reverse xl:flex-row items-center justify-between gap-6 lg:gap-20 xl:gap-4 py-6 bt:py-24 section-container">
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="font-suisse-intl font-medium text-bricky-brick text-3xl lg:text-7xl xl:text-6xl 2xl:text-7xl text-left lg:text-center xl:text-left leading-relaxed lg:leading-normal">
            <GsapSplitText splitBy="lines" stagger={0.005}>
              {t("live.p1.title")}
            </GsapSplitText>
          </h2>
          <p className="font-suisse-intl text-base font-normal lg:text-4xl xl:text-2xl lg:max-w-2xl xl:max-w-xl leading-relaxed lg:leading-normal text-left lg:text-center xl:text-left">
            <GsapSplitText splitBy="lines" stagger={0.005}>
              {t("live.p1.description")}
            </GsapSplitText>
          </p>
        </div>
        <div className={cn(s.circleVideoC, "overflow-hidden rounded-sm lg:rounded-full z-20")}>
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
      <section className="py-12 bt:py-24">
        <FullScreenSlider title={t("live.p2.title")} description={t("live.p2.description")} items={slides2} />
        {/* <div className="w-40 h-40 mx-auto bt:hidden">
          <Logo fill={colors["bricky-brick"]} />
        </div> */}
      </section>
      <section className="relative py-8 bt:py-20 section-container">
        <VideoSection
          primaryVideoUrl={muratKaderVideo}
          thumbnail="/img/thumbnail-murat-kader.jpg"
          title="Mimari: Bir Düşünceden Doğan Yaşam"
          className="rounded-sm overflow-hidden"
        />
      </section>
      <section>
        <FullScreenSlider title={t("live.p3.title")} description={t("live.p3.description")} items={slides3} />
        {/* <div className="w-40 h-40 mx-auto bt:hidden">
          <Logo fill={colors["bricky-brick"]} />
        </div> */}
      </section>
      <LinkToPage next={{ title: "Daireler", href: "/residences" }} />
    </Wrapper>
  )
}
