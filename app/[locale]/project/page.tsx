import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { Logo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { VideoSection } from "@/components/video-section"
import { muratKaderVideo } from "@/lib/constants"
import { breakpoints, colors } from "@/styles/config.mjs"

export default function Page() {
  return (
    <>
      <AnimatedLine direction="horizontal" />
      <section className="bg-white py-0 lg:py-12 z-20">
        <div className="section-container">
          <FadeInOnScroll>
            <div className={"w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-10 lg:mb-20"}>
              <Logo fill={colors["bricky-brick"]} />
            </div>
          </FadeInOnScroll>
          <div className="space-y-8 lg:space-y-16 3xl:space-y-12 px-44">
            <FadeInOnScroll>
              <div className={"relative w-full h-[40vw]"}>
                <Img
                  alt={`Project Visual`}
                  src={`/img/project/01.jpg`}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className={"relative w-full h-[40vw]"}>
                <Img
                  alt={`Project Visual`}
                  src={`/img/project/02.jpg`}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
          </div>
          <FadeInOnScroll>
            <div className={"relative py-8 lg:py-16"}>
              <VideoSection
                primaryVideoUrl={muratKaderVideo}
                thumbnail="/img/thumbnail-murat-kader.jpg"
                title="PROJEYİ MİMARI ANLATIYOR..."
                className="rounded-sm overflow-hidden"
              />
            </div>
          </FadeInOnScroll>
          <div className="space-y-8 lg:space-y-16 3xl:space-y-12 px-44">
            <FadeInOnScroll>
              <div className={"relative w-full h-[40vw]"}>
                <Img
                  alt={`Project Visual`}
                  src={`/img/project/03.jpg`}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className={"relative w-full h-[40vw]"}>
                <Img
                  alt={`Project Visual`}
                  src={`/img/project/04.jpg`}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className={"relative w-full h-[40vw]"}>
                <Img
                  alt={`Project Visual`}
                  src={`/img/project/05.jpg`}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
    </>
  )
}
