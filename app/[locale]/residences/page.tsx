import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { Logo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Sequenced } from "@/components/sequenced"
import { StackingCards } from "@/components/stacking-cards"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { melihBulgurVideo, mustafaTonerVideo, residencesVideo, sections } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"

export default function Page() {
  const items = [
    {
      title: "<span class='text-6xl'>1+1</span> Daire",
      description: "“Hayatına konforlu bir dokunuş.”",
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
      title: "<span class='text-6xl'>2+1</span> Daire",
      description: "“Çekirdek aile yaşamına ilham veren bir düzen.”",
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
      title: "<span class='text-6xl'>3+1</span> Daire",
      description: "“Köklenen yaşamlar için ideal bir dünya.”",
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
    {
      title: "<span class='text-6xl'>4+1</span> Daire",
      description: "“Daha büyük sofralar, daha geniş alanlar.”",
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
    {
      title: "<span class='text-6xl'>5+1</span> Daire",
      description: "“Kalabalık hayatlar yaşamanın en zarif hali.”",
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
    {
      title: "<span class='text-6xl'>6+1</span> Daire",
      description: "“Büyük yaşamların sıcaklığı, konforu ve en keyifli hali.”",
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
    {
      title: "City's Park Daireleri",
      description: "“Dışarıda doğa, içeride huzur.”",
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
    {
      title: "Teras Evler",
      description: "“Gökyüzünü ve denizi evine kattığın bir ayrıcalık.”",
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
    {
      title: "Penthouse",
      description: "“Limit gökyüzü. Sizi sıra dışı yaşatan bir tasarım.”",
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
      <SectionsMenuInitializer sections={Object.values(sections.residences)} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
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
      <section className="bg-white relative z-30 py-12 lg:py-20 2xl:py-28">
        <div className="w-full h-40 lg:h-64 mx-auto ">
          <Logo fill={colors["bricky-brick"]} />
        </div>
      </section>
      <section className="bg-white relative z-30 py-12" id={sections.residences.interiorArchitecture.id}>
        <div className="section-container">
          <VideoSection
            primaryVideoUrl={mustafaTonerVideo}
            thumbnail="/img/thumbnail-toners.jpg"
            title="İÇ MİMARIN GÖZÜYLE..."
          />
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
      <section className="hidden xl:block bg-white relative z-30 section-container">
        <Sequenced />
      </section>
      <section className="bg-white relative z-30 section-container py-12">
        <StackingCards items={items} />
      </section>
      <section className="section-container py-12" id={sections.residences.groundSafety.id}>
        <VideoSection
          primaryVideoUrl={melihBulgurVideo}
          thumbnail="/img/thumbnail-melih-bulgur.jpg"
          title="Zemin Güvenliği: Huzur Mühendisliği"
        />
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage
        previous={{ title: "Proje", href: "/project" }}
        next={{ title: "City's Park", href: "/citys-park" }}
      />
    </Wrapper>
  )
}
