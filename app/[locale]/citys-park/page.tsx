import { cn } from "@/lib/utils"

import { AnimatedLine } from "@/components/animated-line"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysParkLogo } from "@/components/icons"
import { LogoSection } from "@/components/logo-section"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { citysParkVideo, gsapGlobalClasses } from "@/lib/constants"
import { getCitysParkContent } from "@/lib/content"
import { breakpoints } from "@/styles/config.mjs"
import { getTranslations } from "next-intl/server"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  // Load content from MDX files based on current locale
  const items = await getCitysParkContent(locale)
  const t = await getTranslations({ locale, namespace: "citys-park" })
  // const tCommon = await getTranslations({ locale, namespace: "common.navigation" })

  return (
    <>
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
      <section className="relative z-20 bg-white py-5">
        <LogoSection foregroundLogo={<IconCitysParkLogo fill="#5D7261" />} foregroundDuration={0.5} />
        <div className="section-container py-20 flex flex-col items-center gap-20">
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-6xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              {t("title1")} <br /> {t("subtitle1")}
            </GsapSplitText>
          </h2>
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.002} splitBy="chars" duration={1.5}>
              {t("title2")}
            </GsapSplitText>
          </h2>
          <div className={cn("relative w-full h-[90vh]", gsapGlobalClasses.fadeIn)}>
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
      <section className={cn("relative section-container py-20", gsapGlobalClasses.fadeIn)}>
        <VideoSection
          primaryVideoUrl={citysParkVideo}
          thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
          title={t("videoTitle")}
        />
      </section>
      {/* <AnimatedLine direction="horizontal" /> */}
      {/* <LinkToPage
        previous={{ title: tCommon("residences"), href: "/residences" }}
        next={{ title: tCommon("citysMembersClub"), href: "/citys-members-club" }}
      /> */}
    </>
  )
}
