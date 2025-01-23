import { HorizontalScroll } from "@/components/horizontal-scroll"
import { ScaleOut } from "@/components/scale-out"
import { TextRevealOnScroll } from "@/components/text-reveal-on-scroll"
import { Img } from "@/components/utility/img"
import { MainLayout } from "@/layouts/main-layout"

export default function Home() {
  return (
    <MainLayout headerVariant="v2">
      <ScaleOut>
        <section className="h-screen w-screen bg-bricky-brick relative z-10">
          <Img src="/img/hero.jpg" alt="City's Residences Istanbul" fill className="object-cover" />
        </section>
      </ScaleOut>
      <section className="bg-stone-100 z-20 relative font-halenoir py-12 md:py-24">
        <div className="container mx-auto py-12 md:py-24 relative flex flex-col items-center">
          <span className="absolute top-0 left-0 text-bricky-brick opacity-30 text-7xl">&quot;</span>
          <span className="absolute bottom-0 right-0 text-bricky-brick opacity-30 text-7xl rotate-180">&quot;</span>
          <div className="text-center mb-8">
            <h1 className="text-bricky-brick text-5xl md:text-7xl mb-4 tracking-wider">
              <TextRevealOnScroll>YAŞAMA</TextRevealOnScroll>
            </h1>
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-6 text-9xl">SANATI</div>
            <p className="text-bric text-lg md:text-xl">
              <TextRevealOnScroll>Zamanı yönetmek yaşamı sanata dönüştürmektir</TextRevealOnScroll>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-16 bg-gray-50 p-8 rounded-lg max-w-5xl">
            <div className="text-center flex-1">
              <h2 className="text-bricky-brick font-medium text-xl mb-4">DAHA ÇOK YAŞA</h2>
              <p className="text-gray-600 leading-relaxed">
                Hayatın tam merkezinde, zamanı kendinize ve sevdiklerinize ayırabilmek, yaşamı sanata dönüştürmektir.
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
        </div>
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
      <section className="relative">
        <HorizontalScroll />
      </section>
      <section className="bg-stone-100">
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
      </section>
      {/* <section>
        <ScaleGrid
          images={[
            "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6",
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
            "https://images.unsplash.com/photo-1486325212027-8081e485255e",
            "https://images.unsplash.com/photo-1478860409698-8707f313ee8b",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
            "https://images.unsplash.com/photo-1464146072230-91cabc968266",
          ]}
        />
      </section> */}
      <section className="h-screen w-screen bg-slate-500"></section>
      <section className="h-screen w-screen bg-slate-600"></section>
      <section className="h-screen w-screen bg-slate-700"></section>
    </MainLayout>
  )
}
