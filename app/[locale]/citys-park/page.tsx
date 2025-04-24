"use client"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { ScaleOut } from "@/components/animations/scale-out"
import { MaskedParallaxImageSection } from "@/components/parallax-images-section"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { mainVideoDesktop, pinarVeCemilAktasVideo } from "@/lib/constants"

export default function Page() {
  const t = useTranslations("citys-park")

  const sections = [
    {
      title: t("items.i1.title"),
      text: t("items.i1.text"),
      imgSrc: "/img/citys-park/01.jpg",
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
    {
      title: t("items.i6.title"),
      text: t("items.i6.text"),
      imgSrc: "/img/citys-park/06.jpg",
    },
  ]

  return (
    <Wrapper>
      <section className={cn("h-[var(--svh-calc)] bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <div className="h-full w-full">
            <Video
              primaryVideoUrl={mainVideoDesktop}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50">
            {/* <div className="container flex h-full">
              <h1 className="block font-montserrat text-white text-2xl bt:text-4xl font-medium mt-auto mb-20">
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  CITY&apos;S PARK
                </TextRevealOnScroll>
              </h1>
            </div> */}
          </div>
        </ScaleOut>
      </section>
      {/* <section className="relative bg-white pt-16 bt:pt-24 bd:pt-32 z-20">
        <ImagesSection images={images} />
      </section> */}
      <section className="relative z-20 bg-white">
        <div className="container flex flex-col gap-12 bt:gap-32 bd:gap-48 py-12 bt:py-36 bd:py-40">
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
      <section className="relative container py-16 bt:py-20 bd:py-32">
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={pinarVeCemilAktasVideo}
            thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
            title="Peyzaj: Bir Vaha Tasarımı"
          />
        </div>
      </section>
    </Wrapper>
  )
}
