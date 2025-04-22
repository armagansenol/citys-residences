"use client"

import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { MaskedParallaxImageSection } from "@/components/parallax-images-section"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { mainVideoDesktop, pinarVeCemilAktasVideo } from "@/lib/constants"

export default function Page() {
  const images = [
    {
      url: "/img/citys-park/01.jpg",
    },
    {
      url: "/img/citys-park/02.jpg",
    },
    {
      url: "/img/citys-park/03.jpg",
    },
    {
      url: "/img/citys-park/04.jpg",
    },
    {
      url: "/img/citys-park/05.jpg",
    },
    {
      url: "/img/citys-park/06.jpg",
    },
    {
      url: "/img/citys-park/07.jpg",
    },
    {
      url: "/img/citys-park/08.jpg",
    },
    {
      url: "/img/citys-park/09.jpg",
    },
    {
      url: "/img/citys-park/10.jpg",
    },
    {
      url: "/img/citys-park/11.jpg",
    },
    {
      url: "/img/citys-park/12.jpg",
    },
    {
      url: "/img/citys-park/13.jpg",
    },
    {
      url: "/img/citys-park/14.jpg",
    },
    {
      url: "/img/citys-park/15.jpg",
    },
    {
      url: "/img/citys-park/16.jpg",
    },
    {
      url: "/img/citys-park/17.jpg",
    },
    {
      url: "/img/citys-park/18.jpg",
    },
    {
      url: "/img/citys-park/19.jpg",
    },
    {
      url: "/img/citys-park/20.jpg",
    },
    {
      url: "/img/citys-park/21.jpg",
    },
    {
      url: "/img/citys-park/22.jpg",
    },
    {
      url: "/img/citys-park/23.jpg",
    },
    {
      url: "/img/citys-park/24.jpg",
    },
    {
      url: "/img/citys-park/25.jpg",
    },
    {
      url: "/img/citys-park/26.jpg",
    },
    {
      url: "/img/citys-park/27.jpg",
    },
    {
      url: "/img/citys-park/28.jpg",
    },
    {
      url: "/img/citys-park/29.jpg",
    },
    {
      url: "/img/citys-park/30.jpg",
    },
    {
      url: "/img/citys-park/31.jpg",
    },
    {
      url: "/img/citys-park/32.jpg",
    },
    {
      url: "/img/citys-park/33.jpg",
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
          {images.map((image, index) => (
            <MaskedParallaxImageSection
              key={index}
              title="Park Alanı"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              imgSrc={image.url}
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
            title="Peyzaj: 'Bir Vaha Tasarımı'"
          />
        </div>
      </section>
    </Wrapper>
  )
}
