import { cn } from "@/lib/utils"

import { AccordionStackingCards } from "@/components/accordion-stacking-cards"
import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysMembersClubLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { membersClubVideo } from "@/lib/constants"

export default function Page() {
  const items = [
    {
      title: "SPOR VE SAĞLIK",
      description: "Tek kişilik yaşamdan çok daha fazlası",
      images: [
        {
          url: "/img/slides-1/1.jpg",
        },
        {
          url: "/img/slides-1/2.jpg",
        },
        {
          url: "/img/slides-1/3.jpg",
        },
        {
          url: "/img/slides-1/4.jpg",
        },
      ],
      bg: "#fbfbfb",
    },
    {
      title: "KIDS CLUB",
      description: "Kendi ritmine alan aç",
      images: [
        {
          url: "/img/slides-2/01.jpg",
        },
        {
          url: "/img/slides-2/02.jpg",
        },
        {
          url: "/img/slides-2/03.jpg",
        },
        {
          url: "/img/slides-2/04.jpg",
        },
      ],
      bg: "#fffdfd",
    },
    {
      title: "EĞLENCE VE SANAT",
      description: "Yaşamın farklı çizgilerine yer ver",
      images: [
        {
          url: "/img/slides-3/01.jpg",
        },
        {
          url: "/img/slides-3/02.jpg",
        },
        {
          url: "/img/slides-3/03.jpg",
        },
        {
          url: "/img/slides-3/04.jpg",
        },
      ],
      bg: "#ffffff",
    },
  ]

  return (
    <Wrapper>
      <section className={cn("h-[50vh] bd:h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <Video
            primaryVideoUrl={membersClubVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* <div className="container flex h-full">
              <h1 className="block font-montserrat text-white text-2xl bt:text-4xl font-medium mt-auto mb-20">
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  DAİRELER
                </TextRevealOnScroll>
              </h1>
            </div> */}
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white">
        <div className="w-full h-32 bt:h-64 mx-auto my-20 bt:my-32">
          <IconCitysMembersClubLogo fill="#000000" />
        </div>
      </section>
      <section className="bg-white z-30">
        <AccordionStackingCards items={items} />
      </section>
      <LinkToPage
        previous={{ title: "City's Park", href: "/citys-park" }}
        next={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
      />
    </Wrapper>
  )
}
