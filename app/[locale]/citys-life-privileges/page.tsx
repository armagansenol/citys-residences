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
        <div className="flex items-center justify-center w-full pt-16 lg:pt-36 pb-16 lg:pb-32">
          <div className="h-24 lg:h-36">
            <IconCitysLifeLogo fill={colors.black} />
          </div>
        </div>
        <div className="section-container pt-8 lg:pt-6 pb-24 lg:pb-48 flex flex-col items-center gap-24 lg:gap-48">
          <h2
            className={cn(
              "font-primary font-medium text-black text-center",
              "text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl 3xl:text-4xl",
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
                "text-2xl lg:text-2xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl",
                "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight",
                "xl:max-w-4xl 2xl:max-w-6xl",
                "flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0"
              )}
            >
              <span
                className={cn(
                  "font-primary font-normal lg:font-semibold text-bricky-brick text-center whitespace-nowrap",
                  "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-5xl",
                  "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
                )}
              >
                Yaşam Yeniden Tasarlandı
              </span>
              <span className="w-12 h-12 lg:w-16 lg:h-16 mx-8">
                <IconCollab fill={colors["bricky-brick"]} />
              </span>
              <span
                className={cn(
                  "font-copperplate font-semibold text-bricky-brick text-center",
                  "text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl",
                  "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
                )}
              >
                CITY<span className="font-montagu-slab font-normal">&apos;</span>S
              </span>
            </h2>
          </FadeInOnScroll>
        </div>
      </section>
      <FadeInOnScroll>
        <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden mb-12 lg:mb-0">
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
