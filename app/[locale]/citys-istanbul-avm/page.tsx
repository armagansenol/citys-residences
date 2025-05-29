import { cn } from "@/lib/utils"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { AutoScrollCarousel } from "@/components/auto-scroll-carousel"
import { IconCitysIstanbulLogo, IconCitysParkBgLogo } from "@/components/icons"
import { ImageSlider } from "@/components/image-slider"
import { LinkToPage } from "@/components/link-to-page"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo } from "@/lib/constants"

export default function Page() {
  const slides = [
    {
      image: "/img/citys-istanbul-avm/slide-1.jpg",
      title: "HER STİLİN, HER İHTİYACIN MERKEZİ",
      description:
        "Şehrin temposuna ayak uyduran yeme-içme alanları ve stil sahibi markalar… City’s İstanbul AVM; zamansız markalar, yeni sezon koleksiyonlar ve şehirli yaşamın ritmine uygun mağazalarla alışveriş deneyimini rutinin bir adım ötesine taşıyor.",
    },
    {
      image: "/img/citys-istanbul-avm/slide-2.jpg",
      title: "GÜNLÜK YAŞAMIN TÜM İHTİYAÇLARI BİR ARADA",
      description:
        "Espressonuzdan eczanenize, kargonuzdan kişisel bakımınıza kadar her şey birkaç adım ötede. Şehrin temposunu kolaylaştıran, pratik ama şık bir yaşam akışı.",
    },
  ]

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
                  City&apos;s Residences sakinleri için alışveriş, yeme-içme ve günlük ihtiyaçlar, şehrin merkezinde ama
                  ev rahatlığında. AVM hayatı, yaşam kurgusunun doğal bir parçası.
                </TextRevealOnScroll>
              </p>
            </div>
          </div>
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white pt-8">
        <div className="w-full h-[40vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={1.5}>
            <IconCitysParkBgLogo fill="#000" />
          </FadeInOnScroll>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-40">
          <FadeInOnScroll duration={0.5}>
            <IconCitysIstanbulLogo fill="#000" />
          </FadeInOnScroll>
        </div>
      </section>
      <section className="relative z-20 bg-white bd:container py-8 bt:py-8">
        <h2 className="font-montserrat text-3xl font-regular text-center mb-8">ALIŞVERİŞ</h2>
        <AutoScrollCarousel>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/01.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/02.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/03.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/04.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/05.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/01.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/02.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/03.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/04.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/alisveris/05.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
        </AutoScrollCarousel>
      </section>
      <section className="relative z-20 bg-white bd:container py-8 bt:py-8">
        <h2 className="font-montserrat text-3xl font-regular text-center mb-8">YEME - İÇME</h2>
        <AutoScrollCarousel>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/01.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/02.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/03.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/04.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/05.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/01.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/02.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/03.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/04.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
          <div className="flex items-center justify-center py-14 px-16 w-64 h-full">
            <Img
              src="/img/citys-istanbul-avm/yemek/05.png"
              alt="City's Istanbul AVM"
              className="w-full h-full object-contain"
              height={400}
              width={400}
            />
          </div>
        </AutoScrollCarousel>
      </section>
      <section className="relative z-20 bg-white py-8 bt:py-8 mb-20">
        <ImageSlider
          items={slides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "h-[40vw] w-full pl-8 relative",
                index === slides.length - 1 && "pr-16",
                index === 0 && "pl-16"
              )}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Img
                  src={slide.image}
                  alt={`Slide ${index}`}
                  fill
                  className="w-full h-full object-cover"
                  sizes="100vw"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex flex-col h-full py-8 bt:py-8 px-4 bt:px-10 bd:px-8">
                    <h1 className="max-w-lg block font-montserrat leading-snug text-white text-2xl bt:text-4xl font-medium mt-auto mb-6">
                      {slide.title}
                    </h1>
                    <p className="max-w-lg block font-halenoir leading-snug text-white text-base bt:text-lg font-normal">
                      {slide.description}
                    </p>
                  </div>
                </div>
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
