import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysParkLogo, IconCollab } from "@/components/icons"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { citysParkVideo, pinarVeCemilAktasVideo } from "@/lib/constants"
import { getCitysParkContent } from "@/lib/content"
import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"
import { getTranslations } from "next-intl/server"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  // Load content from MDX files based on current locale
  const items = await getCitysParkContent(locale)
  const t = await getTranslations({ locale, namespace: "citys-park" })
  // const tCommon = await getTranslations({ locale, namespace: "common.navigation" })

  return (
    <>
      <section className="relative z-20 bg-army-canvas lg:pt-10">
        <LogoSection foregroundLogo={<IconCitysParkLogo fill={colors.white} />} />
        <div className="flex flex-col items-center gap-8 lg:gap-14">
          <h2
            className={cn(
              "font-primary font-medium text-white text-center",
              "text-3xl lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-3xl",
              "leading-normal xl:leading-snug 2xl:leading-snug 3xl:leading-tight",
              "xl:max-w-4xl 2xl:max-w-6xl"
            )}
          >
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              {t("title1")} <br /> {t("subtitle1")}
            </GsapSplitText>
          </h2>
          <FadeInOnScroll>
            <h2
              className={cn(
                "font-primary font-medium text-center text-white mb-8",
                "text-3xl lg:text-2xl xl:text-5xl 2xl:text-5xl 3xl:text-5xl",
                "xl:leading-normal 2xl:leading-tight 3xl:leading-tight",
                "xl:max-w-4xl 2xl:max-w-6xl",
                "flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0"
              )}
            >
              <span>Yaşam Yeniden Tasarlandı </span>
              <span className="w-12 h-12 mx-8">
                <IconCollab fill={colors.white} />
              </span>
              <span>CITY&apos;S</span>
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <section className="relative section-container">
              <VideoSection
                primaryVideoUrl={pinarVeCemilAktasVideo}
                thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
                title={t("videoTitle")}
              />
            </section>
          </FadeInOnScroll>
          <div className="relative w-full h-[60vw] lg:h-[90vh] mt-5">
            <Video
              primaryVideoUrl={citysParkVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="relative z-20 bg-white">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className="bg-army-canvas"
            titleClassName="text-white"
            subtitleClassName="text-white"
            descriptionClassName="text-white [&_p]:text-white [&_li]:text-white"
            barClassName="bg-white"
            sectionId={item.sectionId}
          />
        ))}
      </section>
      <AnimatedLine direction="horizontal" barClassName="bg-white" />
    </>
  )
}
