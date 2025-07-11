import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysParkLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo, gsapGlobalClasses, pinarVeCemilAktasVideo, sections } from "@/lib/constants"
import { breakpoints } from "@/styles/config.mjs"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"

export default function Page() {
  const t = useTranslations("citys-park")

  const items = [
    {
      title: t("items.i1.title"),
      description: t("items.i1.text"),
      url: ["/img/citys-park/01.jpg"],
    },
    {
      title: t("items.i6.title"),
      description: t("items.i6.text"),
      url: ["/img/citys-park/06.jpg"],
    },
    {
      title: t("items.i2.title"),
      description: t("items.i2.text"),
      url: ["/img/citys-park/02.jpg"],
    },
    {
      title: t("items.i3.title"),
      description: t("items.i3.text"),
      url: ["/img/citys-park/03.jpg"],
    },
    {
      title: t("items.i4.title"),
      description: t("items.i4.text"),
      url: ["/img/citys-park/04.jpg"],
    },
    {
      title: t("items.i5.title"),
      description: t("items.i5.text"),
      url: ["/img/citys-park/05.jpg"],
    },
  ]

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values(sections.home)} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysParkVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white py-5">
        <LogoSection foregroundLogo={<IconCitysParkLogo fill="#5D7261" />} foregroundDuration={0.5} />
        <div className="section-container py-20 flex flex-col items-center gap-20">
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl xl:leading-normal 2xl:text-[40px] 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Şehrin ortasında, sizi yavaşlatan ve merkeze alan benzersiz bir deneyim: City’s Park. City’s ile yaşam
              yeniden tasarlandı.
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
      <section className="relative z-20 bg-white mb-20">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
          />
        ))}
      </section>
      <section className={cn("relative section-container", gsapGlobalClasses.fadeIn)}>
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={pinarVeCemilAktasVideo}
            thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
            title="Peyzaj: Bir Vaha Tasarımı..."
          />
        </div>
      </section>
      <LinkToPage
        previous={{ title: "Daireler", href: "/residences" }}
        next={{ title: "City's Members Club", href: "/citys-members-club" }}
      />
    </Wrapper>
  )
}
