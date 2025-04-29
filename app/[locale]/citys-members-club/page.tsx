import { cn } from "@/lib/utils"

import { AccordionStackingCards } from "@/components/accordion-stacking-cards"
import { ScaleOut } from "@/components/animations/scale-out"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { residencesVideo } from "@/lib/constants"
import { LinkToPage } from "@/components/link-to-page"

export default function Page() {
  const items = [
    {
      title: "Spor ve Sağlık",
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
      title: "Kids Club",
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
      title: "Eğlence ve Sanat",
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
          {/* <div className="container flex h-full">
              <h1 className="block font-montserrat text-white text-2xl bt:text-4xl font-medium mt-auto mb-20">
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  DAİRELER
                </TextRevealOnScroll>
              </h1>
            </div> */}
        </ScaleOut>
      </section>
      <section className="bg-white z-30">
        <AccordionStackingCards items={items} />
      </section>
      <LinkToPage title="City's Life Ayrıcalıkları" href="/citys-life-privileges" />
    </Wrapper>
  )
}
