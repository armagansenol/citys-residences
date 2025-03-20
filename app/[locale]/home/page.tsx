import s from "./home.module.css"

import cn from "clsx"
import { useTranslations } from "next-intl"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { FullScreenSlider } from "@/components/full-screen-slider"
import { ParallaxImagesSection } from "@/components/parallax-images-section"
import { ParallaxVideoPanel } from "@/components/parallax-video-panel"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"

export default function Home() {
  const t = useTranslations("home")

  const slides1 = [
    <div className="relative w-screen h-screen" key={1}>
      <Img src="/img/slides-1/1.jpg" alt="Slide 1" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={2}>
      <Img src="/img/slides-1/2.jpg" alt="Slide 2" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={3}>
      <Img src="/img/slides-1/3.jpg" alt="Slide 3" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={4}>
      <Img src="/img/slides-1/4.jpg" alt="Slide 4" fill className="object-cover" sizes="100vw" />
    </div>,
  ]
  // const slides2 = ["/img/slides-2/1.jpg", "/img/slides-2/2.jpg", "/img/slides-2/3.jpg", "/img/slides-2/4.jpg"]
  const slides3 = [
    <div className="relative w-screen h-screen" key={1}>
      <Img src="/img/slides-3/1.jpg" alt="Slide 1" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={2}>
      <Img src="/img/slides-3/2.jpg" alt="Slide 2" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={3}>
      <Img src="/img/slides-3/3.jpg" alt="Slide 3" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={4}>
      <Img src="/img/slides-3/4.jpg" alt="Slide 4" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={5}>
      <Img src="/img/slides-3/5.jpg" alt="Slide 5" fill className="object-cover" sizes="100vw" />
    </div>,
    <div className="relative w-screen h-screen" key={6}>
      <Img src="/img/slides-3/6.jpg" alt="Slide 6" fill className="object-cover" sizes="100vw" />
    </div>,
  ]

  const moreSectionData = [
    {
      imgSrc: "/img/aol-1.jpg",
      title: t.rich("section1.p1.title", {
        br: () => <br></br>,
      }),
      description: t("section1.p1.description"),
    },
    {
      imgSrc: "/img/aol-2.jpg",
      title: t.rich("section1.p2.title", {
        br: () => <br></br>,
      }),
      description: t("section1.p2.description"),
    },
    {
      imgSrc: "/img/aol-3.jpg",
      title: t.rich("section1.p3.title", {
        br: () => <br></br>,
      }),
      description: t("section1.p3.description"),
    },
  ]

  return (
    <Wrapper>
      <section className={cn(s.intro, "bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <div className="h-full w-full">
            <Video
              primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </ScaleOut>
      </section>
      <section className="bg-white font-halenoir pt-6 bt:pt-12 z-20 relative">
        <div className="container mx-auto py-6 bt:py-12 relative flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-lexend-giga text-bricky-brick text-5xl bt:text-8xl font-medium tracking-widest">
              <TextRevealOnScroll className="leading-tight" staggerDuration={0.05}>
                {t("section1.title1")}
              </TextRevealOnScroll>
            </h1>
            <div className={s.sanati}>
              <FadeInOnScroll>
                <div className="relative w-full h-full">
                  <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="90vw" />
                </div>
              </FadeInOnScroll>
              <span className="sr-only">{t("section1.title2")}</span>
            </div>
            <p className="text-bricky-brick text-xl bt:text-3xl font-normal tracking-wide bt:tracking-widest text-center">
              <TextRevealOnScroll textAlign="center" staggerDuration={0.01}>
                {t("section1.title3")}
              </TextRevealOnScroll>
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white font-halenoir px-4 bd:px-8 py-6 bd:py-12 pt-0 z-20 relative">
        <div className="py-6 bt:py-12 relative flex flex-col items-center">
          <div className="w-full flex flex-col gap-16 bt:grid bt:grid-cols-3 bt:gap-6 bt:pb-16">
            {moreSectionData.map((item, index) => (
              <div key={index} className="col-span-1 space-y-5 bt:space-y-6 bd:space-y-16 text-center">
                <div className="relative aspect-w-10 aspect-h-10 bt:aspect-h-14 bd:aspect-h-16 mx-auto rounded-2xl overflow-hidden">
                  <Img src={item.imgSrc} alt="City's Lifestyle" fill className="object-cover" sizes="30vw" />
                </div>
                <div className="space-y-6 bt:space-y-4 bd:space-y-6">
                  <h2 className="font-lexend-giga font-normal text-4xl text-bricky-brick mx-auto">{item.title}</h2>
                  <p className="font-halenoir text-base bt:text-xl max-w-sm mx-auto">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative">
        <FullScreenSlider title={t("live.p1.title")} description={t("live.p1.description")} items={slides1} />
        {/* <HorizontalScroll title={t("live.p1.title")} description={t("live.p1.description")} items={slides1} /> */}
      </section>
      <section className="flex items-center justify-center gap-16 py-24">
        {/* <ZoomMap /> */}
        <div className="max-w-lg">
          <p className="font-halenoir text-3xl">
            <TextRevealOnScroll splitBy="lines" textAlign="left" staggerDuration={0.005}>
              {t("map.title")}
            </TextRevealOnScroll>
          </p>
        </div>
        <div className={cn(s.circleVideoC, "overflow-hidden rounded-full")}>
          <Video
            primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <section className="relative py-4 bt:py-24">
        <ParallaxImagesSection />
      </section>
      <section className="relative">
        <ParallaxVideoPanel />
      </section>
      <section className="relative">
        <FullScreenSlider title={t("live.p3.title")} description={t("live.p3.description")} items={slides3} />
        {/* <HorizontalScroll title={t("live.p3.title")} description={t("live.p3.description")} items={slides3} /> */}
      </section>
      <section className="relative container py-10">
        <div className="w-full aspect-video overflow-hidden relative z-10 flex items-center justify-center">
          <VideoWithPlayButton primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891#t=0.01" />
        </div>
      </section>
    </Wrapper>
  )
}
