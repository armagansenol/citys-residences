"use client"

import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { mainVideoDesktop, pinarVeCemilAktasVideo } from "@/lib/constants"
import { ImagesSection } from "./images-section"

export default function Page() {
  const images = [
    {
      url: "/img/citys-park/01.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/02-01.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/02-02.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/04.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/05.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/06-01.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/06-02.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/08.jpg",
      fullWidth: true,
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
            <div className="container flex h-full">
              <h1 className="block font-montserrat text-white text-2xl bt:text-4xl font-medium mt-auto mb-20">
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  CITY&apos;S PARK
                </TextRevealOnScroll>
              </h1>
            </div>
          </div>
        </ScaleOut>
      </section>
      <section className="relative bg-white pt-16 bt:pt-24 bd:pt-32 z-20">
        <ImagesSection images={images} />
      </section>
      <section className="relative container py-16 bt:py-20 bd:py-32">
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={pinarVeCemilAktasVideo}
            thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
            title="Peyzaj: 'Bir Vaha Tasarımı'"
          />
        </div>
      </section>
    </Wrapper>
  )
}
