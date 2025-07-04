import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { AnimatedButton } from "@/components/animated-button"
import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { FullScreenSlider } from "@/components/full-screen-slider"
import { GsapSplitText } from "@/components/gsap-split-text"
import { Logo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { Link } from "@/i18n/routing"
import { gsapGlobalClasses, kolajVideo, locationVideo, mainVideo, muratKaderVideo } from "@/lib/constants"
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
      <section className="bg-white py-0 lg:py-12 z-20 relative">
        <div className=" mx-auto py-12 lg:py-28 xl:pt-16 xl:pb-8 relative flex flex-col items-center px-0 lg:px-10 xl:px-16">
          <div className={cn("w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-10 lg:mb-20", gsapGlobalClasses.fadeIn)}>
            <Logo fill={colors["bricky-brick"]} />
          </div>
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <article className="font-montserrat text-bricky-brick text-4xl lg:text-6xl font-semibold leading-tight lg:leading-tight tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.015} duration={1}>
                {t("section1.title1")}
              </GsapSplitText>
              <span className="sr-only">{t("section1.title1")}</span>
            </article>
            <article className={cn("relative w-screen h-24 lg:h-44 xl:h-64", gsapGlobalClasses.fadeIn)}>
              <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="100vw" />
              <span className="sr-only">{t("section1.title2")}</span>
            </article>
            <article className="font-montserrat text-bricky-brick text-4xl lg:text-2xl font-regular leading-relaxed tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.005} duration={1}>
                {t("section1.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-unbleached py-0 lg:py-12 z-20 relative">
        <div className=" mx-auto py-12 lg:py-28 xl:pt-16 xl:pb-8 relative flex flex-col items-center px-0 lg:px-10 xl:px-16">
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <article className="font-montserrat text-bricky-brick text-4xl lg:text-6xl font-semibold leading-tight lg:leading-tight tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.015} duration={1}>
                {t("section2.title1")}
              </GsapSplitText>
              <span className="sr-only">{t("section2.title1")}</span>
            </article>
            <article className={cn("relative w-screen h-24 lg:h-44 xl:h-64", gsapGlobalClasses.fadeIn)}>
              <Img src="/img/tam.png" alt="Tam" fill className="object-contain" sizes="100vw" />
              <span className="sr-only">{t("section2.title2")}</span>
            </article>
            <article className="font-montserrat text-bricky-brick text-4xl lg:text-7xl font-semibold leading-tight lg:leading-tight tracking-wide lg:tracking-widest text-center">
              <GsapSplitText splitBy="chars" stagger={0.015} duration={1}>
                {t("section2.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <section className={cn("relative  py-8 lg:py-20 section-container", gsapGlobalClasses.fadeIn)}>
        <VideoSection
          primaryVideoUrl={kolajVideo}
          thumbnail="/img/thumbnail-kolaj-video.jpg"
          title="Yaşam Yeniden Tasarlandı: City’s."
        />
      </section>
      <div className={cn(gsapGlobalClasses.fadeIn)}>
        <AnimatedLine direction="horizontal" />
        <div className={cn("flex gap-8 h-[80vh] py-8 section-container")}>
          <div className="flex flex-col items-start justify-center w-6/12 mb-auto">
            <h2 className="font-primary text-bricky-brick text-3xl lg:text-7xl xl:text-6xl 2xl:text-7xl leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight text-left lg:text-center xl:text-left mb-8">
              <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
                {t("live.p1.title")}
              </GsapSplitText>
            </h2>
            <p className="font-primary font-normal text-base lg:text-4xl xl:text-2xl leading-relaxed lg:leading-relaxed xl:leading-relaxed lg:max-w-2xl xl:max-w-xl text-left lg:text-center xl:text-left mb-24">
              <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
                {t("live.p1.description")}
              </GsapSplitText>
            </p>
            <Link className="w-48" href="/location">
              <AnimatedButton text="KONUM" theme="secondary" size="md" />
            </Link>
          </div>
          <AnimatedLine direction="vertical" />
          <div className="flex flex-col w-6/12 relative flex-1">
            <Video
              primaryVideoUrl={locationVideo}
              autoPlay
              loop
              muted
              playsInline
              className="relative w-full h-full object-cover z-0"
            />
          </div>
        </div>
        <AnimatedLine direction="horizontal" />
      </div>
      <section className={cn("py-12 lg:py-24", gsapGlobalClasses.fadeIn)}>
        <FullScreenSlider title={t("live.p2.title")} description={t("live.p2.description")} items={slides2} />
      </section>
      <section className={cn("relative py-8 lg:py-20 section-container", gsapGlobalClasses.fadeIn)}>
        <VideoSection
          primaryVideoUrl={muratKaderVideo}
          thumbnail="/img/thumbnail-murat-kader.jpg"
          title="Mimari: Yaşamın Sanata Döndüğü Bir Proje Yaptık."
          className="rounded-sm overflow-hidden"
        />
      </section>
      <section className={cn(gsapGlobalClasses.fadeIn)}>
        <FullScreenSlider title={t("live.p3.title")} description={t("live.p3.description")} items={slides3} />
      </section>
      <LinkToPage next={{ title: "Daireler", href: "/residences" }} />
    </Wrapper>
  )
}
