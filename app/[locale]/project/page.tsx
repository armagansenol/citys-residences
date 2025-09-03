import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { DynamicAspectImage } from "@/components/dynamic-aspect-image"
import { GsapSplitText } from "@/components/gsap-split-text"
import { Logo } from "@/components/icons"
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
          <div className="space-y-8 xl:space-y-16 3xl:space-y-12 px-0 xl:px-44">
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 mt-16",
                    "font-primary font-semibold lg:font-bold text-bricky-brick lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-2xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.05} duration={0.5}>
                    KARMA YAŞAM PROJESİ
                  </GsapSplitText>
                </h2>
                <DynamicAspectImage
                  alt="Project Visual"
                  src="/img/project/01.jpg"
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-16 3xl:top-24 lg:left-1/2 lg:-translate-x-1/2",
                    "font-primary font-semibold lg:font-bold text-bricky-brick lg:text-white lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-2xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.05} duration={0.5}>
                    KONUM
                  </GsapSplitText>
                </h2>
                <DynamicAspectImage
                  alt="Project Visual"
                  src="/img/project/02.jpg"
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  loading="lazy"
                />
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
          <div className="space-y-8 xl:space-y-16 3xl:space-y-12 px-0 xl:px-44">
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-6 3xl:top-12 lg:left-1/2 lg:-translate-x-1/2 ",
                    "font-primary font-semibold lg:font-bold text-bricky-brick lg:text-white lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-2xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.05} duration={0.5}>
                    BLOK GİRİŞLERİ
                  </GsapSplitText>
                </h2>
                <DynamicAspectImage
                  alt="Project Visual"
                  src="/img/project/03.jpg"
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-44 3xl:top-64 lg:left-1/2 lg:-translate-x-1/2",
                    "font-primary font-semibold lg:font-bold text-bricky-brick lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-2xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.05} duration={0.5}>
                    OTOPARK GİRİŞ ÇIKIŞLARI
                  </GsapSplitText>
                </h2>
                <DynamicAspectImage
                  alt="Project Visual"
                  src="/img/project/04.jpg"
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                  loading="lazy"
                />
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="relative">
                <h2
                  className={cn(
                    "relative lg:absolute lg:top-6 3xl:top-12 lg:left-1/2 lg:-translate-x-1/2",
                    "font-primary font-semibold lg:font-bold text-bricky-brick lg:text-white lg:title-shadow text-center lg:whitespace-nowrap mb-2 lg:mb-0 z-50",
                    "text-2xl lg:text-5xl xl:text-5xl 2xl:text-5xl",
                    "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight"
                  )}
                >
                  <GsapSplitText splitBy="lines" stagger={0.05} duration={0.5}>
                    PARK & BAHÇELER & TERASLAR
                  </GsapSplitText>
                </h2>
                <DynamicAspectImage
                  alt="Project Visual"
                  src="/img/project/05.jpg"
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
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
