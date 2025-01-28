import s from "./home.module.css"

import cn from "clsx"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { HorizontalScroll } from "@/components/animations/horizontal-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { VerticalParallaxSections } from "@/components/animations/vertical-parallax-sections"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"

export default function Home() {
  return (
    <Wrapper>
      <section className="h-screen w-screen bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <div>
            <Video
              primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
              secondaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </ScaleOut>
      </section>
      <section className="z-20 relative">
        <section className="bg-stone-100 font-halenoir py-12 md:py-12">
          <div className="container  mx-auto py-12 md:py-24 relative flex flex-col items-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-bricky-brick text-5xl md:text-8xl font-medium tracking-widest">
                <TextRevealOnScroll staggerDuration={0.05}>YAŞAMA</TextRevealOnScroll>
              </h1>
              <div className={cn(s.sanati, "h-[300px] w-[1300px] relative")}>
                <FadeInOnScroll>
                  <Img src="/img/sanati.png" alt="Sanatı" fill className="object-contain" />
                </FadeInOnScroll>
                <span className="sr-only">SANATI</span>
              </div>
              <p className="text-bricky-brick text-lg md:text-2xl font-normal tracking-widest">
                <TextRevealOnScroll staggerDuration={0.01}>
                  Zamanı yönetmek yaşamı sanata dönüştürmektir
                </TextRevealOnScroll>
              </p>
            </div>
            <FadeInOnScroll>
              <div className="flex flex-col md:flex-row gap-8 mt-16 bg-stone-200 p-8 rounded-lg max-w-5xl">
                <div className="text-center flex-1">
                  <h2 className="text-bricky-brick font-medium text-xl mb-4">DAHA ÇOK YAŞA</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Hayatın tam merkezinde, zamanı kendinize ve sevdiklerinize ayırabilmek, yaşamı sanata
                    dönüştürmektir.
                  </p>
                </div>
                <div className="text-center flex-1">
                  <h2 className="text-bricky-brick font-medium text-xl mb-4">DAHA HUZURLU YAŞA</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Huzur, sessiz lüks mimaride sonsuz bir güvenle ve cömert doğayla iç içe yaşama ayrıcalığıdır.
                  </p>
                </div>
                <div className="text-center flex-1">
                  <h2 className="text-bricky-brick font-medium text-xl mb-4">DAHA DOLU YAŞA</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Sporun, sanatın, eğlencenin ve daha fazlasının bir araya geldiği bir yaşam, her anı değerli kılar.
                  </p>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </section>
      <section className="relative">
        <HorizontalScroll
          title="DAHA ÇOK YAŞA"
          description="Lüks ve zerafetin buluştuğu, zamana meydan okuyan bir yaşam alanı, her biri kendine özgü karakteri ve hikayesiyle eşsiz bir koleksiyon..."
        />
      </section>
      <section className="bg-stone-100 z-20 relative font-halenoir">
        <div className="container mx-auto py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square h-[550px] w-[550px] max-w-[550px] mx-auto">
              <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                <Img src="/img/hero.jpg" alt="City's Residences Istanbul" fill className="object-cover" />
              </div>
            </div>
            <div className="max-w-xl">
              <h2 className="text-2xl font-normal leading-relaxed text-black">
                Hayatın tam merkezinde, zamanı kendinize ve sevdiklerinize ayırabilmek, yaşamı sanata dönüştürmektir.
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-stone-100 relative p-10 pt-0">
        <VerticalParallaxSections
          title="DAHA HUZURLU YAŞA"
          description="Estetik ve kaliteyi, yeşile cömertçe davet eden peyzaj tasarımıyla harmanlayan City's Residences, sizlere fonksiyonel ve konforlu bir yaşam sunuyor."
        />
      </section>
      <section className="relative">
        <HorizontalScroll
          title="DAHA DOLU YAŞA"
          description="Citys Residences, İstanbul’un eşsiz sosyal olanaklarıyla donatılmış bir yaşam sunuyor. Havuzlar, yürüyüş parkurları ve dinlenme alanlarıyla her anı keyifle yaşayın."
        />
      </section>
      {/* <section className="bg-stone-100">
        <div className="container mx-auto py-12 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 xl:gap-60">
            <div className="space-y-12">
              <div className="aspect-w-9 aspect-h-11 w-full overflow-hidden relative z-10">
                <Img src="/img/hero.jpg" alt="City's Residences Istanbul" fill className="object-cover" />
              </div>
              <p className="text-xl text-black leading-relaxed">
                Şehrin yoğunluğundan sıyrılıp eve atılan ilk adımdaki huzur cömertçe sunan City&apos;s Residences,
                yemyeşil alanları ve zamana meydan okuyan tasarımıyla sizi dinginliğin tam kalbine taşır.
              </p>
            </div>
            <div className="space-y-12 lg:mt-32">
              <p className="text-xl text-black leading-relaxed">
                Şehrin yoğunluğundan sıyrılıp eve atılan ilk adımdaki huzur cömertçe sunan City&apos;s Residences,
                yemyeşil alanları ve zamana meydan okuyan tasarımıyla sizi dinginliğin tam kalbine taşır.
              </p>
              <div className="aspect-w-9 aspect-h-11 w-full overflow-hidden relative z-10">
                <Img src="/img/hero.jpg" alt="City's Residences Istanbul" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="h-screen w-screen bg-stone-100"></section>
      <section className="h-screen w-screen bg-stone-200"></section>
      <section className="h-screen w-screen bg-stone-300"></section>
    </Wrapper>
  )
}
