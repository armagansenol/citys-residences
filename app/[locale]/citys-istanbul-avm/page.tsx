import { AnimatedLine } from "@/components/animated-line"
import { AvmBrandsContainer } from "@/components/avm-brands-container"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysIstanbulLogo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { getBrandsData } from "@/lib/api/server-actions"
import { colors } from "@/styles/config.mjs"

// Fallback data for brands in case API fails - keeping for reference
// const fallbackBrandsData: BrandsResponse = {
//   items: [],
//   categories: {},
//   subCategories: {},
// }

export default async function Page() {
  const brands = await getBrandsData()
  // const brands = mockBrandsData

  return (
    <>
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <Img src="/img/citys-istanbul-avm-hero.jpg" alt="City's Istanbul AVM" fill sizes="100vw" />
      </section>
      <section className="relative z-30 bg-white flex flex-col items-center">
        <div className="w-[530px] h-56 flex items-center justify-center bg-aqua-belt mb-8">
          <div className="w-10/12 flex items-center justify-center">
            <IconCitysIstanbulLogo fill={colors["halite-blue"]} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-primary font-bold text-bricky-brick text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl xl:leading-normal 2xl:leading-snug xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Hayatı Tüm Renkleriyle Yaşa...
            </GsapSplitText>
          </h2>
          <p className="font-primary font-normal text-black text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl xl:leading-normal 2xl:leading-snug xl:max-w-5xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Avrupa ve Asya’yı birbirine bağlayan en değerli lokasyonda ve hayatın tam merkezinde...
            </GsapSplitText>
          </p>
          <p className="font-primary font-normal text-black text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl xl:leading-normal 2xl:leading-snug xl:max-w-5xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Dünyaca tanınan seçkin markalara bir kaç adımda ulaşır, taze bir kahve kokusuyla tanışır, gurme lezzet
              duraklarında soluklanır; sanat, kültür, eğlenceyle buluşur, günün koşturmacasını sakince geride
              bırakırsın...
            </GsapSplitText>
          </p>
          <p className="font-primary font-normal text-black text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl xl:leading-normal 2xl:leading-snug xl:max-w-5xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Daha Çok... Daha Huzurlu... Daha Dolu... Yaşa.
            </GsapSplitText>
          </p>
        </div>
        <div className="section-container py-24">
          <AvmBrandsContainer initialBrands={brands.items || []} />
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
    </>
  )
}
