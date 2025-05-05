import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { LinkToPage } from "@/components/link-to-page"
import { Sequenced } from "@/components/sequenced"
import { StackingCards } from "@/components/stacking-cards"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { melihBulgurVideo, mustafaTonerVideo, residencesVideo } from "@/lib/constants"

export default function Page() {
  const items = [
    {
      title: "1+1",
      description: "“Şehir hayatına doğadan konforlu bir dokunuş: Kendi köşen, kendi ritmin.”",
      images: [
        {
          url: "/img/residences/1+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#fbfbfb",
    },
    {
      title: "2+1",
      description: "“Modern profesyoneller için hem çalışmaya hem yaşamaya ilham veren bir düzen.”",
      images: [
        {
          url: "/img/residences/2+1/plan.jpg",
        },
        {
          url: "/img/residences/2+1/interior.jpg",
        },
      ],
      bg: "#fffdfd",
    },
    {
      title: "3+1",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
  ]

  return (
    <Wrapper>
      <section className={cn("h-[var(--svh-calc)] bt:h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <Video
            primaryVideoUrl={residencesVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="bg-white z-20 py-16 bt:py-32 px-4 bt:px-10 bd:px-16">
        <div className="relative bd:container">
          <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
            <VideoWithPlayButton
              primaryVideoUrl={mustafaTonerVideo}
              thumbnail="/img/thumbnail-toners.jpg"
              title="İç Mimari: Doğal Olanın Sessiz Dili"
            />
          </div>
        </div>
      </section>
      <section>
        <Sequenced />
      </section>
      <section className="bg-white z-30 mb-16 bt:mb-32 px-4 bt:px-10 bd:px-16">
        <StackingCards items={items} />
      </section>
      <section className="px-4 bt:px-10 bd:px-16">
        <div className="relative bd:container">
          <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
            <VideoWithPlayButton
              primaryVideoUrl={melihBulgurVideo}
              thumbnail="/img/thumbnail-melih-bulgur.jpg"
              title="Statik: Zeminden Başlayan Güven"
            />
          </div>
        </div>
      </section>
      <LinkToPage previous={{ title: "Anasayfa", href: "/" }} next={{ title: "City's Park", href: "/citys-park" }} />
    </Wrapper>
  )
}
