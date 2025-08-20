import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysLifeLogo, IconCollab } from "@/components/icons"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { citysLifeVideo, navigationConfig } from "@/lib/constants"
import { getCitysLifePrivilegesContent } from "@/lib/content"
import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"
import { getTranslations } from "next-intl/server"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "citys-life-privileges" })
  console.log("not used warning", t)

  // const tCommon = await getTranslations({ locale, namespace: "common.navigation" })
  const items = await getCitysLifePrivilegesContent(locale)

  return (
    <>
      <section className="relative z-20 bg-white" id={navigationConfig["/citys-life-privileges"]?.id as string}>
        <div className="flex items-center justify-center w-full pt-12 pb-16">
          <div className="h-36">
            <IconCitysLifeLogo fill={colors.black} />
          </div>
        </div>
        <div className="section-container pt-8 lg:pt-6 pb-16 lg:pb-24 flex flex-col items-center gap-16">
          <h2
            className={cn(
              "font-primary font-medium text-black text-center",
              "text-3xl lg:text-2xl xl:text-5xl 2xl:text-5xl 3xl:text-4xl",
              "leading-snug xl:leading-snug 2xl:leading-snug 3xl:leading-snug"
            )}
          >
            <GsapSplitText stagger={0.01} splitBy="chars" duration={1.5}>
              Artık her şey daha kolay...
            </GsapSplitText>
          </h2>
          <FadeInOnScroll delay={0.3}>
            <h2
              className={cn(
                "font-primary font-semibold text-center text-bricky-brick",
                "text-3xl lg:text-2xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl",
                "xl:leading-normal 2xl:leading-tight 3xl:leading-tight",
                "xl:max-w-4xl 2xl:max-w-6xl",
                "flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0"
              )}
            >
              <span>Yaşam Yeniden Tasarlandı </span>
              <span className="w-12 h-12 lg:w-16 lg:h-16 mx-8">
                <IconCollab fill={colors["bricky-brick"]} />
              </span>
              <span>CITY&apos;S</span>
            </h2>
          </FadeInOnScroll>
        </div>
      </section>
      <FadeInOnScroll>
        <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden">
          <Video
            primaryVideoUrl={citysLifeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </section>
      </FadeInOnScroll>
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
    </>
  )
}
