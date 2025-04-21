"use client"

import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
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
      url: "/img/citys-park/02.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/03.jpg",
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
      url: "/img/citys-park/06.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/07.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/08.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/09.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/10.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/11.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/12.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/13.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/14.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/15.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/16.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/17.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/18.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/19.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/20.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/21.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/22.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/23.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/24.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/25.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/26.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/27.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/28.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/29.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/30.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/31.jpg",
      fullWidth: false,
    },
    {
      url: "/img/citys-park/32.jpg",
      fullWidth: true,
    },
    {
      url: "/img/citys-park/33.jpg",
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
          {/* <div className="absolute top-0 left-0 w-full h-full bg-black/50">
            <div className="container flex h-full">
              <h1 className="block font-montserrat text-white text-2xl bt:text-4xl font-medium mt-auto mb-20">
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  CITY&apos;S PARK
                </TextRevealOnScroll>
              </h1>
            </div>
          </div> */}
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
