import { useTranslations } from "next-intl"

import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysLifeLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysLifeVideo, sections } from "@/lib/constants"
import { AnimatedLine } from "@/components/animated-line"

export default function Page() {
  const t = useTranslations("citys-life")
  const items = [
    {
      title: t("items.i1.title"),
      subtitle: t("items.i1.spot"),
      description: t("items.i1.text"),
      url: ["/img/citys-life/01.jpg"],
    },
    {
      title: t("items.i2.title"),
      subtitle: t("items.i2.spot"),
      description: t("items.i2.text"),
      url: ["/img/citys-life/02.jpg"],
    },
    {
      title: t("items.i3.title"),
      subtitle: t("items.i3.spot"),
      description: t("items.i3.text"),
      url: ["/img/citys-life/03.jpg"],
    },
    {
      title: t("items.i4.title"),
      subtitle: t("items.i4.spot"),
      description: t("items.i4.text"),
      url: ["/img/citys-life/04.jpg"],
    },
    {
      title: t("items.i5.title"),
      subtitle: t("items.i5.spot"),
      description: t("items.i5.text"),
      url: ["/img/citys-life/05.jpg"],
    },
    {
      title: t("items.i6.title"),
      subtitle: t("items.i6.spot"),
      description: t("items.i6.text"),
      url: ["/img/citys-life/06.jpg"],
    },
    {
      title: t("items.i7.title"),
      subtitle: t("items.i7.spot"),
      description: t("items.i7.text"),
      url: ["/img/citys-life/07.jpg"],
    },
  ]
  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values(sections.home)} />
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
              Yaşam Yeniden Tasarlandı: CITY’S <br /> Artık her şey daha kolay...
            </GsapSplitText>
          </h2>
          {/* <div className={cn("relative w-full h-[90vh]", gsapGlobalClasses.fadeIn)}>
            <MaskedParallaxImage
              imgSrc={"/img/citys-life/04.jpg"}
              sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
            />
          </div> */}
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
        previous={{ title: "City's Members Club", href: "/citys-members-club" }}
        next={{ title: "City's İstanbul AVM", href: "/citys-istanbul-avm" }}
      />
    </Wrapper>
  )
}
