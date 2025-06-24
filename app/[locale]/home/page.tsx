import s from "./home.module.css"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { FullScreenSlider } from "@/components/full-screen-slider"
import { Logo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { kolajVideo, locationVideo, mainVideo, muratKaderVideo } from "@/lib/constants"

export default function Home() {
  const t = useTranslations("home")

  const createSlide = (imgSrc: string, index: number) => (
    <div className="relative w-screen h-[35vh] bt:h-[105vh]" key={index}>
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
      <section className={cn(s.intro, "h-[50vh] bt:h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <Video primaryVideoUrl={mainVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </ScaleOut>
      </section>
      <section className="bg-white pt-0 bt:pt-12 z-20 relative">
        <div className="bd:container mx-auto py-16 bt:py-28 bd:pt-16 bd:pb-8 relative flex flex-col items-center px-6 bt:px-10 bd:px-16">
          <div className="w-64 h-64 mx-auto hidden bt:block mb-10">
            <Logo fill={"var(--bricky-brick)"} />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-halenoir text-bricky-brick text-4xl bt:text-8xl font-semibold tracking-widest text-center">
              <TextRevealOnScroll staggerDuration={0.05}>{t("section1.title1")}</TextRevealOnScroll>
            </h1>
            <div className={s.sanati}>
              <FadeInOnScroll>
                <div className="relative w-full h-full">
                  <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="100vw" />
                </div>
              </FadeInOnScroll>
              <span className="sr-only">{t("section1.title2")}</span>
            </div>
            <p className="font-halenoir text-bricky-brick text-md bt:text-3xl font-normal tracking-wide bt:tracking-widest text-center">
              <TextRevealOnScroll staggerDuration={0.01}>{t("section1.title3")}</TextRevealOnScroll>
            </p>
          </div>
        </div>
      </section>
      <section className="relative bd:container py-8 bt:py-20 px-6 bt:px-10 bd:px-16">
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={kolajVideo}
            thumbnail="/img/thumbnail-kolaj-video.jpg"
            title="Denge Mimarisi: Karma Yaşam Tasarımı"
          />
        </div>
      </section>
      <section className="bd:container flex flex-col bd:flex-row items-center justify-between gap-10 bt:gap-20 bd:gap-4 py-12 bt:py-24 px-6 bt:px-10 bd:px-16">
        <div className="px-4 bt:px-0 flex flex-col items-center justify-center bd:items-start">
          <h2 className="font-suisse-intl font-normal text-bricky-brick text-4xl md:text-7xl xl:text-6xl 2xl:text-7xl mb-5 bt:mb-10 text-center xl:text-left">
            <TextRevealOnScroll elementLevelClassName="leading-relaxed" splitBy="lines" staggerDuration={0.005}>
              {t("live.p1.title")}
            </TextRevealOnScroll>
          </h2>
          <p className="font-suisse-intl text-md bt:text-4xl bd:text-2xl max-w-sm bt:max-w-xl bd:max-w-xl bd:leading-normal text-center xl:text-left">
            <TextRevealOnScroll elementLevelClassName="leading-relaxed" splitBy="lines" staggerDuration={0.005}>
              {t("live.p1.description")}
            </TextRevealOnScroll>
          </p>
        </div>
        <div className={cn(s.circleVideoC, "overflow-hidden rounded-full z-20")}>
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
      <section>
        <FullScreenSlider title={t("live.p2.title")} description={t("live.p2.description")} items={slides2} />
        <div className="w-40 h-40 mx-auto bt:hidden">
          <Logo fill={"var(--bricky-brick)"} />
        </div>
      </section>
      <section className="relative bd:container py-12 bt:py-20 px-6 bt:px-10 bd:px-16">
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={muratKaderVideo}
            thumbnail="/img/thumbnail-murat-kader.jpg"
            title="Mimari: Bir Düşünceden Doğan Yaşam"
          />
        </div>
      </section>
      <section>
        <FullScreenSlider title={t("live.p3.title")} description={t("live.p3.description")} items={slides3} />
        <div className="w-40 h-40 mx-auto bt:hidden">
          <Logo fill={"var(--bricky-brick)"} />
        </div>
      </section>
      <LinkToPage next={{ title: "Daireler", href: "/residences" }} />
    </Wrapper>
  )
}
