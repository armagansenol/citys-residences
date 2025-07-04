import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysLifeLogo, IconCitysParkBgLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysLifeVideo, gsapGlobalClasses } from "@/lib/constants"
import { AnimatedLine } from "@/components/animated-line"
import { GsapSplitText } from "@/components/gsap-split-text"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { breakpoints } from "@/styles/config.mjs"

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
      <section className="relative z-20 bg-white py-5">
        <div className="w-full h-[30vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={1.5}>
            <IconCitysParkBgLogo fill="#000" />
          </FadeInOnScroll>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-60">
          <FadeInOnScroll duration={0.5}>
            <IconCitysLifeLogo fill="#000000" />
          </FadeInOnScroll>
        </div>
      </section>
      <section>
        <AnimatedLine direction="horizontal" />
        <div className={cn("section-container py-20 flex flex-col gap-20", gsapGlobalClasses.fadeIn)}>
          <h2 className="font-suisse-intl font-normal text-black text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl max-w-2xl">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              City’s Life ayrıcalıklarıyla modern yaşam yeniden şekilleniyor. Şehrin merkezinde, concierge
              hizmetlerinden konaklamaya, ortak çalışma alanlarından sosyal imkanlara uzanan benzersiz bir deneyim sizi
              bekliyor.
            </GsapSplitText>
          </h2>
          <div className="relative w-full h-[90vh]">
            <MaskedParallaxImage
              imgSrc={"/img/citys-life/04.jpg"}
              sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
            />
          </div>
        </div>
      </section>
      <section className="relative z-20 bg-white">
        {items.map((item, i) => (
          <MembersClubItem key={i} item={item} align={i % 2 === 0 ? "ltr" : "rtl"} />
        ))}
      </section>
      <LinkToPage
        previous={{ title: "City's Members Club", href: "/citys-members-club" }}
        next={{ title: "City's İstanbul AVM", href: "/citys-istanbul-avm" }}
      />
    </Wrapper>
  )
}
