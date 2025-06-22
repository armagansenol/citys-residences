import { ScaleOut } from "@/components/animations/scale-out"
import { Logo } from "@/components/icons"
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
      description: "“Şehir hayatına konforlu bir dokunuş: Kendi köşen, kendi ritmin.”",
      images: [
        {
          url: "/img/residences/1+1/plan.jpg",
        },
        {
          url: "/img/residences/1+1/interior.jpg",
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
      <section className="h-[50vh] bt:h-screen bg-bricky-brick relative z-10 overflow-hidden">
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
      <section className="relative z-20 bg-white">
        <div className="w-full h-40 bt:h-64 mx-auto my-12 bt:my-32">
          <Logo fill="var(--bricky-brick)" />
        </div>
      </section>
      <section className="bg-white z-20 px-6 bt:px-10 bd:px-16">
        <div className="relative bd:container">
          <div className="w-full h-[300px] bt:h-[90vh] relative z-10 flex items-center justify-center bg-black">
            <VideoWithPlayButton
              primaryVideoUrl={mustafaTonerVideo}
              thumbnail="/img/thumbnail-toners.jpg"
              title="İç Mimari: Doğal Olanın Sessiz Dili"
            />
          </div>
        </div>
      </section>
      <section className="hidden xl:block bg-white z-30 px-6 bt:px-10 bd:px-16 py-12 bd:py-0">
        <Sequenced />
      </section>
      <section className="bg-white z-30 px-6 bt:px-10 bd:px-16 pb-16 bt:pb-72">
        <StackingCards items={items} />
      </section>
      <section className="px-6 bt:px-10 bd:px-16">
        <div className="relative bd:container">
          <div className="w-full h-[350px] bt:h-[90vh] relative z-10 flex items-center justify-center bg-black">
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
