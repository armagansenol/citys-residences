"use client"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysParkBgLogo, IconCitysParkLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { MaskedParallaxImageSection } from "@/components/parallax-images-section"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo, pinarVeCemilAktasVideo } from "@/lib/constants"

export default function Page() {
  const t = useTranslations("citys-park")

  const sections = [
    {
      title: t("items.i1.title"),
      text: t("items.i1.text"),
      imgSrc: "/img/citys-park/01.jpg",
    },
    {
      title: t("items.i6.title"),
      text: t("items.i6.text"),
      imgSrc: "/img/citys-park/06.jpg",
    },
    {
      title: t("items.i2.title"),
      text: t("items.i2.text"),
      imgSrc: "/img/citys-park/02.jpg",
    },
    {
      title: t("items.i3.title"),
      text: t("items.i3.text"),
      imgSrc: "/img/citys-park/03.jpg",
    },
    {
      title: t("items.i4.title"),
      text: t("items.i4.text"),
      imgSrc: "/img/citys-park/04.jpg",
    },
    {
      title: t("items.i5.title"),
      text: t("items.i5.text"),
      imgSrc: "/img/citys-park/05.jpg",
    },
  ]

  return (
    <Wrapper>
      <section className={cn("h-[50vh] bd:h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
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
      <section className="relative z-20 bg-white pt-8">
        <div className="w-full h-[40vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <IconCitysParkBgLogo fill="#5D7261" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-60">
          <IconCitysParkLogo fill="#5D7261" />
        </div>
      </section>
      <section className="relative z-20 bg-white">
        <div className="bd:container flex flex-col gap-12 bt:gap-32 bd:gap-48 py-12 bt:py-36 bd:py-40 px-6 bt:px-10 bd:px-16">
          {sections.map((section, index) => (
            <MaskedParallaxImageSection
              key={index}
              title={section.title}
              text={section.text}
              imgSrc={section.imgSrc}
              horizontalAlignment={index % 2 === 0 ? "ltr" : "rtl"}
            />
          ))}
        </div>
      </section>
      <section className="relative bd:container px-6 bt:px-10 bd:px-16">
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={pinarVeCemilAktasVideo}
            thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
            title="Peyzaj: Bir Vaha Tasarımı"
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
