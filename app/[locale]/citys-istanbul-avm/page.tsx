import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { IconCitysIstanbulLogo, IconCitysParkBgLogo } from "@/components/icons"
import { ImageSlider } from "@/components/image-slider"
import { LinkToPage } from "@/components/link-to-page"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo } from "@/lib/constants"

export default function Page() {
  const slideImages = {
    slides1: [1, 2].map((num) => `/img/avm-${num}.jpg`),
    slides2: [1, 2].map((num) => `/img/avm-${num}.jpg`),
  }
  return (
    <Wrapper>
      <section className={cn("h-[50vh] bd:h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <Video
            primaryVideoUrl={citysParkVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50">
            <div className="flex flex-col h-full bd:container py-8 bt:py-8 px-4 bt:px-10 bd:px-16">
              <h1 className="max-w-lg block font-montserrat leading-snug text-white text-2xl bt:text-4xl font-medium mt-auto mb-8">
                <TextRevealOnScroll splitBy="lines" textAlign="left" staggerDuration={0.005}>
                  ŞEHİR HAYATI BİR ASANSÖR UZAKLIKTA
                </TextRevealOnScroll>
              </h1>
              <p className="max-w-lg block font-halenoir leading-snug text-white text-base bt:text-lg font-normal mb-20">
                <TextRevealOnScroll splitBy="lines" textAlign="left" staggerDuration={0.005}>
                  City’s Residences sakinleri için alışveriş, yeme-içme ve günlük ihtiyaçlar, şehrin merkezinde ama ev
                  rahatlığında. AVM hayatı, yaşam kurgusunun doğal bir parçası.
                </TextRevealOnScroll>
              </p>
            </div>
          </div>
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white pt-8">
        <div className="w-full h-[40vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <IconCitysParkBgLogo fill="#000" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-40">
          <IconCitysIstanbulLogo fill="#000" />
        </div>
      </section>
      <section className="relative z-20 bg-white bd:container py-8 bt:py-8 px-4 bt:px-10 bd:px-16">
        <h2 className="font-montserrat text-3xl font-regular text-center mb-8">ALIŞVERİŞ</h2>
        <div className="grid grid-cols-12 gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="col-span-12 lg:col-span-2 border border-neutral-300 flex items-center justify-center rounded-xl overflow-hidden px-8 py-12"
            >
              <IconCitysIstanbulLogo fill="#000" />
            </div>
          ))}
        </div>
      </section>
      <section className="relative z-20 bg-white py-8 bt:py-8 mb-20">
        <ImageSlider
          items={slideImages.slides1.map((src, index) => (
            <div
              key={index}
              className={cn(
                "h-[40vw] w-full pl-8",
                index === slideImages.slides1.length - 1 && "pr-16",
                index === 0 && "pl-16"
              )}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Img src={src} alt={`Slide ${index}`} fill className="w-full h-full object-cover" sizes="100vw" />
              </div>
            </div>
          ))}
        />
      </section>
      <section className="relative z-20 bg-white bd:container py-8 bt:py-8 px-4 bt:px-10 bd:px-16">
        <h2 className="font-montserrat text-3xl font-regular text-center mb-8">YEME - İÇME</h2>
        <div className="grid grid-cols-12 gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="col-span-12 lg:col-span-2 border border-neutral-300 flex items-center justify-center rounded-xl overflow-hidden p-8"
            >
              <IconCitysIstanbulLogo fill="#000" />
            </div>
          ))}
        </div>
      </section>
      <section className="relative z-20 bg-white py-8 bt:py-8">
        <ImageSlider
          items={slideImages.slides1.map((src, index) => (
            <div
              key={index}
              className={cn(
                "h-[40vw] w-full pl-8",
                index === slideImages.slides1.length - 1 && "pr-16",
                index === 0 && "pl-16"
              )}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Img src={src} alt={`Slide ${index}`} fill className="w-full h-full object-cover" sizes="80vw" />
              </div>
            </div>
          ))}
        />
      </section>
      <LinkToPage
        previous={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
        next={{ title: "Anasayfa", href: "/" }}
      />
    </Wrapper>
  )
}
