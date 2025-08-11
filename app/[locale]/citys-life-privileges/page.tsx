import { getTranslations } from "next-intl/server"

import { AnimatedLine } from "@/components/animated-line"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysLifeLogo } from "@/components/icons"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { citysLifeVideo } from "@/lib/constants"
import { getCitysLifePrivilegesContent } from "@/lib/content"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { cn } from "@/lib/utils"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "citys-life-privileges" })
  console.log("not used warning", t)

  // const tCommon = await getTranslations({ locale, namespace: "common.navigation" })
  const items = await getCitysLifePrivilegesContent(locale)

  return (
    <>
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
      <section className="relative z-20 bg-white pt-10">
        <LogoSection foregroundLogo={<IconCitysLifeLogo fill="#000000" />} />
        <div className="section-container pt-16 pb-32 flex flex-col items-center gap-14">
          <h2
            className={cn(
              "font-primary font-medium text-black text-center",
              "text-2xl lg:text-2xl xl:text-5xl 2xl:text-5xl 3xl:text-[54px]",
              "leading-snug xl:leading-snug 2xl:leading-snug 3xl:leading-snug"
            )}
          >
            <GsapSplitText stagger={0.01} splitBy="chars" duration={1.5}>
              Artık her şey daha kolay...
            </GsapSplitText>
          </h2>
          <FadeInOnScroll delay={0.3}>
            <h2 className="font-primary font-medium text-bricky-brick text-2xl lg:text-2xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl xl:leading-normal 2xl:leading-tight 3xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center flex items-center justify-center">
              Yaşam Yeniden Tasarlandı <span className="font-montserrat font-light text-[1.5em] mx-8">X</span>{" "}
              CITY&apos;S
            </h2>
          </FadeInOnScroll>
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
          />
        ))}
      </section>
    </>
  )
}
