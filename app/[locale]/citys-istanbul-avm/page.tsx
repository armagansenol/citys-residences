import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysIstanbulLogo } from "@/components/icons"
import { Video } from "@/components/utility/video"
// import { getBrandsData } from "@/lib/api/queries"
import { citysIstanbulAvmVideo } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"
import { BrandsResponse } from "@/types"
import { FilterableContent } from "./filterable-content"

// Mock data for brands
const mockBrandsData: BrandsResponse = {
  items: [
    {
      name: "BURGER KING",
      category: "yemeIcme",
      subCategory: "fastfood",
      logo: "/img/citys-istanbul-avm/yemek/yemek-2.png",
      floor: "first",
    },
    {
      name: "MCDONALD'S",
      category: "yemeIcme",
      subCategory: "fastfood",
      logo: "/img/citys-istanbul-avm/yemek/yemek-3.png",
      floor: "ground",
    },
    {
      name: "STARBUCKS",
      category: "yemeIcme",
      subCategory: "kafe",
      logo: "/img/citys-istanbul-avm/yemek/yemek-4.png",
      floor: "ground",
    },
    {
      name: "BİZİM LOKANTA",
      category: "yemeIcme",
      subCategory: "restoran",
      logo: "/img/citys-istanbul-avm/yemek/yemek-5.png",
      floor: "first",
    },
    {
      name: "CARL'S JR.",
      category: "yemeIcme",
      subCategory: "fastfood",
      logo: "/img/citys-istanbul-avm/yemek/yemek-6.png",
      floor: "first",
    },
    {
      name: "CONI & CO",
      category: "yemeIcme",
      subCategory: "kafe",
      logo: "/img/citys-istanbul-avm/yemek/yemek-7.png",
      floor: "first",
    },
    {
      name: "COOKSHOP",
      category: "alisveris",
      subCategory: null,
      logo: "/img/citys-istanbul-avm/yemek/yemek-8.png",
      floor: "first",
    },
    {
      name: "BABY GREEN",
      category: "alisveris",
      subCategory: null,
      logo: "/img/citys-istanbul-avm/yemek/yemek-9.png",
      floor: "first",
    },
    {
      name: "ZARA",
      category: "alisveris",
      subCategory: null,
      logo: "/img/citys-istanbul-avm/alisveris/av-1.png",
      floor: "ground",
    },
    {
      name: "H&M",
      category: "alisveris",
      subCategory: null,
      logo: "/img/citys-istanbul-avm/alisveris/av-2.png",
      floor: "ground",
    },
    {
      name: "MANGO",
      category: "alisveris",
      subCategory: null,
      logo: "/img/citys-istanbul-avm/alisveris/av-3.png",
      floor: "ground",
    },
    {
      name: "OYSHO",
      category: "alisveris",
      subCategory: null,
      logo: "/img/citys-istanbul-avm/alisveris/av-4.png",
      floor: "first",
    },
  ],
  categories: {
    yemeIcme: "Yeme İçme",
    alisveris: "Alışveriş",
    eglence: "Eğlence",
  },
  subCategories: {
    restoran: "Restoran",
    kafe: "Kafe",
    fastfood: "Fast Food",
  },
}

export default async function Page() {
  // const brands = await getBrandsData()
  const brands = mockBrandsData

  return (
    <>
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <Video
          primaryVideoUrl={citysIstanbulAvmVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </section>
      <section className="relative z-30 bg-white flex flex-col items-center">
        <div className="w-3/12 h-48 flex items-center justify-center bg-aqua-belt mb-8">
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
          <FilterableContent brands={brands.items || []} />
        </div>
      </section>
      {/* <AnimatedLine direction="horizontal" /> */}
      {/* <LinkToPage
        previous={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
        next={{ title: "Anasayfa", href: "/" }}
      /> */}
    </>
  )
}
