import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysLifeLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysLifeVideo } from "@/lib/constants"
import { getCitysLifePrivilegesContent } from "@/lib/content"
import { getTranslations } from "next-intl/server"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: locale, namespace: "citys-life-privileges" })
  const items = await getCitysLifePrivilegesContent(locale)
  const tCommon = await getTranslations({ locale, namespace: "common.navigation" })

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysLifeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white">
        <LogoSection foregroundLogo={<IconCitysLifeLogo fill="#000000" />} foregroundDuration={0.5} />
        <div className="section-container pt-16 pb-40 flex flex-col items-center gap-20">
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-5xl 2xl:text-5xl xl:leading-normal  2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              {t("title")} <br /> {t("subtitle")}
            </GsapSplitText>
          </h2>
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
      <LinkToPage
        previous={{ title: tCommon("citysMembersClub"), href: "/citys-members-club" }}
        next={{ title: tCommon("citysIstanbul"), href: "/citys-istanbul-avm" }}
      />
    </Wrapper>
  )
}
