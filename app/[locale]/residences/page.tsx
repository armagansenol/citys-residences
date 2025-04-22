import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { StackingCards } from "@/components/stacking-cards"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { melihBulgurVideo, mustafaTonerVideo, residencesVideo } from "@/lib/constants"

export default function Page() {
  const items = [
    {
      title: "1+1",
      images: [
        {
          url: "/img/residences/1+1/plan.jpg",
        },
        {
          url: "/img/residences/1+1/interior.jpg",
        },
      ],
    },
    {
      title: "2+1",
      images: [
        {
          url: "/img/residences/2+1/plan.jpg",
        },
        {
          url: "/img/residences/2+1/interior.jpg",
        },
      ],
    },
    {
      title: "3+1",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
    },
  ]

  return (
    <Wrapper>
      <section className={cn("h-[var(--svh-calc)] bt:h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <div className="h-full w-full">
            <Video
              primaryVideoUrl={residencesVideo}
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
                  DAİRELER
                </TextRevealOnScroll>
              </h1>
            </div> */}
          </div>
        </ScaleOut>
      </section>
      <section className="py-32 bg-white z-20">
        <div className="relative container">
          <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
            <VideoWithPlayButton
              primaryVideoUrl={mustafaTonerVideo}
              thumbnail="/img/thumbnail-toners.jpg"
              title="İç Mimari: 'Doğal Olanın Sessiz Dili "
            />
          </div>
        </div>
      </section>
      <section className="relative h-screen bg-white z-20 flex items-center justify-center">
        <span className="text-8xl font-black text-center">3D</span>
      </section>
      <section>
        <StackingCards items={items} />
      </section>
      <section className="py-32 bg-white z-20">
        <div className="relative container">
          <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
            <VideoWithPlayButton
              primaryVideoUrl={melihBulgurVideo}
              thumbnail="/img/thumbnail-melih-bulgur.jpg"
              title="Statik: Zeminden Başlayan Güven"
            />
          </div>
        </div>
      </section>
    </Wrapper>
  )
}
