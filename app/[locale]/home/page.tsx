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

  // const slides1 = slideImages.slides1.map((src, index) => createSlide(src, index + 1))
  const slides2 = slideImages.slides2.map((src, index) => createSlide(src, index + 1))
  const slides3 = slideImages.slides3.map((src, index) => createSlide(src, index + 1))

  // const moreSectionData = [
  //   {
  //     imgSrc: "/img/aol-1.jpg",
  //     title: t.rich("section1.p1.title", {
  //       br: () => <br></br>,
  //     }),
  //     description: t("section1.p1.description"),
  //   },
  //   {
  //     imgSrc: "/img/aol-2.jpg",
  //     imgSrcMobile: "/img/aol-2-mobile.jpg",
  //     title: t.rich("section1.p2.title", {
  //       br: () => <br></br>,
  //     }),
  //     description: t("section1.p2.description"),
  //   },
  //   {
  //     imgSrc: "/img/aol-3.jpg",
  //     title: t.rich("section1.p3.title", {
  //       br: () => <br></br>,
  //     }),
  //     description: t("section1.p3.description"),
  //   },
  // ]

  return (
    <Wrapper>
      <section className={cn(s.intro, "h-[50vh] bt:h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <div className="h-full w-full">
            <Video primaryVideoUrl={mainVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            {/* <Video
              primaryVideoUrl={mainVideoDesktop}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover block bd:hidden"
            /> */}
          </div>
        </ScaleOut>
      </section>
      <section className="bg-white font-halenoir pt-0 bt:pt-12 z-20 relative">
        <div className="container mx-auto py-16 bt:py-28 bd:pt-40 bd:pb-8 relative flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-montserrat text-bricky-brick text-4xl bt:text-8xl font-semibold tracking-widest">
              <TextRevealOnScroll className="leading-tight" staggerDuration={0.05}>
                {t("section1.title1")}
              </TextRevealOnScroll>
            </h1>
            <div className={s.sanati}>
              <FadeInOnScroll>
                <div className="relative w-full h-full">
                  <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="100vw" />
                </div>
              </FadeInOnScroll>
              <span className="sr-only">{t("section1.title2")}</span>
            </div>
            <p className="text-bricky-brick text-md bt:text-3xl font-normal tracking-wide bt:tracking-widest text-center">
              <TextRevealOnScroll textAlign="center" staggerDuration={0.01}>
                {t("section1.title3")}
              </TextRevealOnScroll>
            </p>
          </div>
        </div>
      </section>
      <section className="w-64 h-64 mx-auto hidden bt:block">
        <Logo fill={"var(--bricky-brick)"} />
      </section>
      <section className="relative bd:container py-8 bt:py-20 px-4 bt:px-10">
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={kolajVideo}
            thumbnail="/img/thumbnail-kolaj-video.jpg"
            title="Karma yaşamın mimarisi"
          />
        </div>
      </section>
      {/* <section className="bg-white px-4 bd:px-12 py-12 bt:pb-16 bd:py-12 z-20 relative flex-col hidden bt:grid bt:grid-cols-3 gap-4 bt:gap-6">
        <div
          className={cn(
            "group",
            "hover:scale-95 transition-all duration-700",
            "relative col-span-1 rounded-2xl overflow-hidden border-2 border-neutral-100",
            'before:content-[""] before:absolute before:left-0 before:bottom-0 bt:before:top-0 bt:before:bottom-auto before:right-0 before:h-4/5 before:w-full  before:bg-gradient-to-t bt:before:bg-gradient-to-b before:from-white before:to-transparent before:z-10',
            "order-1 bt:order-none"
          )}
        >
          <div className="w-full h-[360px] bt:h-[500px] bd:h-[700px] relative group-hover:scale-110 transition-all duration-700 hidden bt:block">
            <Img src={moreSectionData[1].imgSrc} alt="City's Lifestyle" fill className="object-cover" sizes="30vw" />
          </div>
          <div className="w-full h-[360px] bt:h-[500px] bd:h-[700px] relative group-hover:scale-110 transition-all duration-700 block bt:hidden">
            <Img
              src={moreSectionData[1].imgSrcMobile as string}
              alt="City's Lifestyle"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute left-0 bottom-0 bt:bottom-auto bt:top-0 right-0 space-y-4 bt:space-y-4 bd:space-y-8 text-left text-black px-4 bt:px-4 bd:px-8 py-5 bt:py-8 bd:py-12 z-20">
            <h2 className="font-montserrat font-normal text-3xl bt:text-2xl bd:text-4xl">
              {moreSectionData[1].title}
            </h2>
            <p className="font-halenoir text-base bt:text-md bd:text-xl max-w-sm">{moreSectionData[1].description}</p>
          </div>
        </div>
        <div
          className={cn(
            "group",
            "hover:scale-95 transition-all duration-700",
            "relative col-span-1 rounded-2xl overflow-hidden border-2 border-neutral-100",
            'before:content-[""] before:absolute before:left-0 before:bottom-0 before:right-0 before:h-4/5 before:w-full before:bg-gradient-to-t before:from-white before:to-transparent before:z-10',
            "order-2 bt:order-none"
          )}
        >
          <div className="w-full h-[360px] bt:h-[500px] bd:h-[700px] relative group-hover:scale-110 transition-all duration-700">
            <Img
              src={moreSectionData[0].imgSrc}
              alt="City's Lifestyle"
              fill
              className="object-cover"
              sizes="100vw bt:30vw"
            />
          </div>
          <div className="absolute left-0 bottom-0 right-0 space-y-4 bt:space-y-4 bd:space-y-8 text-left text-black px-4 bt:px-4 bd:px-8 py-5 bt:py-8 bd:py-12 z-20">
            <h2 className="font-montserrat font-normal text-3xl bt:text-2xl bd:text-4xl">
              {moreSectionData[0].title}
            </h2>
            <p className="font-halenoir text-base bt:text-md bd:text-xl max-w-sm">{moreSectionData[0].description}</p>
          </div>
        </div>
        <div
          className={cn(
            "group",
            "hover:scale-95 transition-all duration-700",
            "relative col-span-1 rounded-2xl overflow-hidden border-2 border-neutral-100",
            'before:content-[""] before:absolute before:left-0 before:top-0 before:right-0 before:h-1/2 before:w-full before:bg-gradient-to-b before:from-white before:to-transparent before:z-10',
            "order-3 bt:order-none"
          )}
        >
          <div className="w-full h-[360px] bt:h-[500px] bd:h-[700px] relative group-hover:scale-110 transition-all duration-700">
            <Img
              src={moreSectionData[2].imgSrc}
              alt="City's Lifestyle"
              fill
              className="object-cover"
              sizes="100vw bt:30vw"
            />
          </div>
          <div className="absolute left-0 top-0 right-0 space-y-4 bt:space-y-4 bd:space-y-8 text-left text-black px-4 bt:px-4 bd:px-8 py-5 bt:py-8 bd:py-12 z-20">
            <h2 className="font-montserrat font-normal text-3xl bt:text-2xl bd:text-4xl">
              {moreSectionData[2].title}
            </h2>
            <p className="font-halenoir text-base bt:text-md bd:text-xl max-w-sm">{moreSectionData[2].description}</p>
          </div>
        </div>
      </section> */}
      <section className="bd:container flex flex-col-reverse bd:flex-row items-center justify-between gap-10 bt:gap-20 bd:gap-16 py-6 bt:py-24 px-4 bt:px-10">
        <div className="px-4 bt:px-0 flex flex-col items-center justify-center bd:items-start">
          <h2 className="font-montserrat font-normal text-bricky-brick text-4xl bt:text-7xl bd:text-7xl mb-5 bt:mb-10 hidden bd:block">
            <TextRevealOnScroll
              className="hidden bd:block"
              elementLevelClassName="leading-relaxed"
              splitBy="lines"
              textAlign="left"
              staggerDuration={0.005}
            >
              {t("live.p1.title")}
            </TextRevealOnScroll>
            <TextRevealOnScroll
              className="block bd:hidden"
              elementLevelClassName="leading-relaxed"
              splitBy="lines"
              textAlign="center"
              staggerDuration={0.005}
            >
              {t("live.p1.title")}
            </TextRevealOnScroll>
          </h2>
          <p className="font-halenoir text-md bt:text-4xl bd:text-3xl text-center max-w-sm bt:max-w-xl bd:max-w-xl bd:leading-normal">
            <TextRevealOnScroll
              className="hidden bd:block"
              elementLevelClassName="leading-relaxed"
              splitBy="lines"
              textAlign="left"
              staggerDuration={0.005}
            >
              {t("live.p1.description")}
            </TextRevealOnScroll>
            <TextRevealOnScroll
              className="block bd:hidden"
              elementLevelClassName="leading-relaxed"
              splitBy="lines"
              textAlign="center"
              staggerDuration={0.005}
            >
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
        <h2 className="font-montserrat font-normal text-bricky-brick text-4xl bt:text-7xl bd:text-7xl block bd:hidden">
          <TextRevealOnScroll
            className="hidden bd:block"
            elementLevelClassName="leading-relaxed"
            splitBy="lines"
            textAlign="left"
            staggerDuration={0.005}
          >
            {t("live.p1.title")}
          </TextRevealOnScroll>
          <TextRevealOnScroll
            className="block bd:hidden"
            elementLevelClassName="leading-relaxed"
            splitBy="lines"
            textAlign="center"
            staggerDuration={0.005}
          >
            {t("live.p1.title")}
          </TextRevealOnScroll>
        </h2>
      </section>
      {/* <section className="relative container py-12 bt:py-40">
        <h3 className="font-halenoir text-black text-4xl bt:text-7xl font-black tracking-widest text-center">
          <TextRevealOnScroll splitBy="lines" textAlign="center" staggerDuration={0.005}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </TextRevealOnScroll>
        </h3>
      </section> */}
      {/* <section className="py-8">
        <FullScreenSlider title={t("live.p1.title")} description={t("live.p1.description")} items={slides1} />
      </section> */}
      <section>
        <FullScreenSlider title={t("live.p2.title")} description={t("live.p2.description")} items={slides2} />
        <div className="w-40 h-40 mx-auto bt:hidden">
          <Logo fill={"var(--bricky-brick)"} />
        </div>
      </section>
      <section className="relative container py-12 bt:py-20 px-4 bt:px-10">
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
      <LinkToPage
        previous={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
        next={{ title: "Konutlar", href: "/residences" }}
      />
    </Wrapper>
  )
}
