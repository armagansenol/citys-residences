import s from "./home.module.css"

import cn from "clsx"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { HorizontalScroll } from "@/components/animations/horizontal-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { MPImg } from "@/components/mp-img"
import { ParallaxImagesSection } from "@/components/parallax-images-section"
import { ParallaxVideoPanel } from "@/components/parallax-video-panel"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { ZoomMap } from "@/components/zoom-map"

export default function Home() {
  const slides1 = ["/img/slides-1/1.jpg", "/img/slides-1/2.jpg", "/img/slides-1/3.jpg", "/img/slides-1/4.jpg"]
  // const slides2 = ["/img/slides-2/1.jpg", "/img/slides-2/2.jpg", "/img/slides-2/3.jpg", "/img/slides-2/4.jpg"]
  const slides3 = [
    "/img/slides-3/1.jpg",
    "/img/slides-3/2.jpg",
    "/img/slides-3/3.jpg",
    "/img/slides-3/4.jpg",
    "/img/slides-3/5.jpg",
    "/img/slides-3/6.jpg",
  ]

  const moreSectionData = [
    {
      imgSrc: "/img/aol-1.jpg",
      title: (
        <>
          DAHA <br /> HUZURLU YAŞA
        </>
      ),
      description: "Huzur, sessiz lüks mimaride sonsuz bir güvenle ve cömert doğayla iç içe yaşama ayrıcalığıdır.",
    },
    {
      imgSrc: "/img/aol-2.jpg",
      title: (
        <>
          DAHA ÇOK <br /> YAŞA
        </>
      ),
      description:
        "Hayatın tam merkezinde, zamanı kendinize ve sevdiklerinize ayırabilmek, yaşamı sanata dönüştürmektir.",
    },
    {
      imgSrc: "/img/aol-3.jpg",
      title: (
        <>
          DAHA DOLU <br /> YAŞA
        </>
      ),
      description: "Sporun, sanatın, eğlencenin ve daha fazlasının bir araya geldiği bir yaşam, her anı değerli kılar.",
    },
  ]

  return (
    <Wrapper>
      <section className={cn(s.intro, "bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <div className="h-full w-full">
            <Video
              primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </ScaleOut>
      </section>
      <section className="bg-white font-halenoir py-6 bt:py-12 z-20 relative">
        <div className="container mx-auto py-6 bt:py-12 relative flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-lexend-giga text-bricky-brick text-5xl bt:text-8xl font-medium tracking-widest">
              <TextRevealOnScroll className="leading-tight" staggerDuration={0.05}>
                YAŞAMA
              </TextRevealOnScroll>
            </h1>
            <div className={s.sanati}>
              <FadeInOnScroll>
                <div className="relative w-full h-full">
                  <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" sizes="90vw" />
                </div>
              </FadeInOnScroll>
              <span className="sr-only">SANATI</span>
            </div>
            <p className="text-bricky-brick text-xl bt:text-3xl font-normal tracking-wide bt:tracking-widest text-center">
              <TextRevealOnScroll textAlign="center" staggerDuration={0.01}>
                Zamanı yönetmek yaşamı sanata dönüştürmektir
              </TextRevealOnScroll>
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white font-halenoir px-4 bt:px-8 py-6 bt:py-12 pt-0 z-20 relative">
        <div className="py-6 bt:py-12 relative flex flex-col items-center">
          <div className="w-full flex flex-col gap-16 bt:grid bt:grid-cols-3 bt:gap-6">
            {moreSectionData.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "col-span-1 space-y-10 bt:space-y-16 text-center",
                  index === 0 && "bt:mt-60",
                  index === 1 && "bt:mt-0",
                  index === 2 && "bt:mt-96"
                )}
              >
                <div className="relative aspect-w-10 aspect-h-16 mx-auto">
                  <MPImg imgSrc={item.imgSrc} />
                </div>
                <div className="space-y-6">
                  <h2 className="font-lexend-giga font-normal text-4xl text-bricky-brick mx-auto">{item.title}</h2>
                  <p className="font-halenoir text-base bt:text-xl max-w-sm mx-auto">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative">
        <HorizontalScroll
          title="DAHA ÇOK YAŞA"
          description="Lüks ve zerafetin buluştuğu, zamana meydan okuyan bir yaşam alanı, her biri kendine özgü karakteri ve hikayesiyle eşsiz bir koleksiyon..."
          items={slides1}
        />
      </section>
      <section className="z-20 relative font-halenoir">
        <ZoomMap />
      </section>
      <section className="relative py-4 bt:py-24">
        <ParallaxImagesSection />
      </section>
      <section className="relative">
        <ParallaxVideoPanel />
      </section>
      <section className="relative">
        <HorizontalScroll
          title="DAHA DOLU YAŞA"
          description="Citys Residences, İstanbul'un eşsiz sosyal olanaklarıyla donatılmış bir yaşam sunuyor. Havuzlar, yürüyüş parkurları ve dinlenme alanlarıyla her anı keyifle yaşayın."
          items={slides3}
        />
      </section>
      <section className="relative">
        <div className="w-screen aspect-video bd:aspect-none bd:h-[var(--lvh-calc)] overflow-hidden relative z-10 flex items-center justify-center">
          <Video
            primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891#t=0.01"
            className="w-full h-full object-cover"
            controls
          />
        </div>
      </section>
    </Wrapper>
  )
}
