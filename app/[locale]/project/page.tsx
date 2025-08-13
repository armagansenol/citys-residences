import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "@/components/gsap-split-text"
import { Logo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { VideoSection } from "@/components/video-section"
import { muratKaderVideo } from "@/lib/constants"
import { cn } from "@/lib/utils"
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
          <div className="space-y-8 lg:space-y-16 3xl:space-y-12 px-0 lg:px-44">
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 mt-16",
                    "font-primary font-bold text-bricky-brick lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
                    KARMA YAŞAM PROJESİ
                  </GsapSplitText>
                </h2>
                <div className="relative w-full h-[65vw] lg:h-[40vw]">
                  <Img
                    alt={`Project Visual`}
                    src={`/img/project/01.jpg`}
                    sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                    fill
                    className="object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-16 lg:left-1/2 lg:-translate-x-1/2",
                    "font-primary font-bold text-bricky-brick lg:text-white lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
                    KONUM
                  </GsapSplitText>
                </h2>
                <div className="relative w-full h-[70vw] lg:h-[40vw]">
                  <Img
                    alt={`Project Visual`}
                    src={`/img/project/02.jpg`}
                    sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                    fill
                    className="object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInOnScroll>
          </div>
          <FadeInOnScroll>
            <div className="relative py-20 lg:py-16">
              <VideoSection
                primaryVideoUrl={muratKaderVideo}
                thumbnail="/img/thumbnail-murat-kader.jpg"
                title="PROJEYİ MİMARI ANLATIYOR..."
              />
            </div>
          </FadeInOnScroll>
          <div className="space-y-8 lg:space-y-16 3xl:space-y-12 px-0 lg:px-44">
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-6 lg:left-1/2 lg:-translate-x-1/2 ",
                    "font-primary font-bold text-bricky-brick lg:text-white lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
                    BLOK GİRİŞLERİ
                  </GsapSplitText>
                </h2>
                <div className="relative w-full h-[60vw] lg:h-[40vw]">
                  <Img
                    alt={`Project Visual`}
                    src={`/img/project/03.jpg`}
                    sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                    fill
                    className="object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-44 lg:left-1/2 lg:-translate-x-1/2",
                    "font-primary font-bold text-bricky-brick lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
                    OTOPARK GİRİŞ ÇIKIŞLARI
                  </GsapSplitText>
                </h2>
                <div className="relative w-full h-[60vw] lg:h-[40vw]">
                  <Img
                    alt={`Project Visual`}
                    src={`/img/project/04.jpg`}
                    sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                    fill
                    className="object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-6 lg:left-1/2 lg:-translate-x-1/2",
                    "font-primary font-bold text-bricky-brick lg:text-white lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.005} duration={0.5}>
                    BAHÇE VE TERASLAR
                  </GsapSplitText>
                </h2>
                <div className="relative w-full h-[60vw] lg:h-[40vw]">
                  <Img
                    alt={`Project Visual`}
                    src={`/img/project/05.jpg`}
                    sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                    fill
                    className="object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
    </>
  )
}
