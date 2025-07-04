import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysParkBgLogo, IconCitysParkLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo, gsapGlobalClasses, pinarVeCemilAktasVideo } from "@/lib/constants"
import { breakpoints } from "@/styles/config.mjs"

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
        <div className="w-full h-[30vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={1.5}>
            <IconCitysParkBgLogo fill="#000000" />
          </FadeInOnScroll>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-60">
          <FadeInOnScroll duration={0.5}>
            <IconCitysParkLogo fill="#5D7261" />
          </FadeInOnScroll>
        </div>
      </section>
      <section>
        <AnimatedLine direction="horizontal" />
        <div className={cn("section-container py-20 flex flex-col gap-20", gsapGlobalClasses.fadeIn)}>
          <h2 className="font-suisse-intl font-normal text-black text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl max-w-2xl">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              City’s Park ayrıcalıkları ile yepyeni bir deneyim sizi bekliyor. Şehrin merkezinde, sizin için
              oluşturulmuş huzur ve keyif dolu bir yaşam alanı.
            </GsapSplitText>
          </h2>
          <div className="relative w-full h-[90vh]">
            <MaskedParallaxImage
              imgSrc={"/img/citys-park-banner.jpg"}
              sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
            />
          </div>
        </div>
      </section>
      <section className="relative z-20 bg-white mb-20">
        {items.map((item, i) => (
          <MembersClubItem key={i} item={item} align={i % 2 === 0 ? "ltr" : "rtl"} />
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
