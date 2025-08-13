import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysParkLogo } from "@/components/icons"
import { LogoSection } from "@/components/logo-section"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { citysParkVideo } from "@/lib/constants"
import { getCitysParkContent } from "@/lib/content"
import { cn } from "@/lib/utils"
import { breakpoints } from "@/styles/config.mjs"
import { getTranslations } from "next-intl/server"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  // Load content from MDX files based on current locale
  const items = await getCitysParkContent(locale)
  const t = await getTranslations({ locale, namespace: "citys-park" })
  // const tCommon = await getTranslations({ locale, namespace: "common.navigation" })

  return (
    <>
      <FadeInOnScroll>
        <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
          <Video
            primaryVideoUrl={citysParkVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </section>
      </FadeInOnScroll>
      <section className="relative z-20 bg-white lg:pt-10">
        <LogoSection foregroundLogo={<IconCitysParkLogo fill="#5D7261" />} />
        <div className="section-container pb-20 pt-10 flex flex-col items-center gap-8 lg:gap-8">
          <h2
            className={cn(
              "font-primary font-medium text-black text-center xl:max-w-4xl 2xl:max-w-6xl",
              "text-3xl lg:text-2xl xl:text-5xl 2xl:text-5xl 3xl:text-[58px]",
              "leading-normal xl:leading-snug 2xl:leading-snug 3xl:leading-tight"
            )}
          >
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              {t("title1")} <br /> {t("subtitle1")}
            </GsapSplitText>
          </h2>
          <FadeInOnScroll>
            <h2
              className={cn(
                "font-primary font-medium text-center text-bricky-brick mb-8",
                "text-3xl lg:text-2xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl",
                "xl:leading-normal 2xl:leading-tight 3xl:leading-tight",
                "xl:max-w-4xl 2xl:max-w-6xl",
                "flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0"
              )}
            >
              <span>Yaşam Yeniden Tasarlandı </span>
              <span className="block lg:inline font-montserrat font-light text-[1.5em] mx-8">X</span>
              <span>CITY&apos;S</span>
            </h2>
          </FadeInOnScroll>
          <div className="relative w-full h-[60vw] lg:h-[90vh] mt-5">
            <MaskedParallaxImage
              imgSrc={"/img/citys-park-banner.jpg"}
              sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
            />
          </div>
        </div>
      </section>
      <section className="relative z-20 bg-white">
        <AnimatedLine direction="horizontal" />
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
            sectionId={item.sectionId}
          />
        ))}
      </section>
      <FadeInOnScroll>
        <section className="relative section-container py-20">
          <VideoSection
            primaryVideoUrl={citysParkVideo}
            thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
            title={t("videoTitle")}
          />
        </section>
      </FadeInOnScroll>
      <AnimatedLine direction="horizontal" />
    </>
  )
}
