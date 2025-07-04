import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysIstanbulLogo, IconCitysParkBgLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { ListCarousel } from "@/components/list-carousel"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { getBrandsData } from "@/lib/api/queries"
import { citysIstanbulAvmVideo } from "@/lib/constants"

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default async function Page() {
  const brands = await getBrandsData()

  // Helper function to group brands by subcategory
  const groupBySubCategory = (brandsInCategory: typeof brands.items) => {
    return brandsInCategory.reduce((acc, brand) => {
      const subCat = brand.subCategory || "other"
      if (!acc[subCat]) {
        acc[subCat] = []
      }
      acc[subCat].push(brand)
      return acc
    }, {} as Record<string, typeof brandsInCategory>)
  }

  // Filter brands by category
  const shoppingBrands = brands.items?.filter((brand) => brand.category === "alisveris" && brand.subCategory) || []
  const diningBrands = brands.items?.filter((brand) => brand.category === "yemeIcme") || []
  const serviceBrands = brands.items?.filter((brand) => brand.category === "hizmet") || []

  // Group each category by subcategory
  const shoppingBySubCategory = groupBySubCategory(shoppingBrands)
  const diningBySubCategory = groupBySubCategory(diningBrands)
  const servicesBySubCategory = groupBySubCategory(serviceBrands)

  // Create data structures for each category
  const alisveris = {
    title: brands.categories?.alisveris || "Alışveriş",
    items: Object.entries(shoppingBySubCategory).map(([subCategoryKey, brandsInCategory]) => ({
      title: toTitleCase(brands.subCategories?.[subCategoryKey] || subCategoryKey),
      logos: brandsInCategory.map((brand) => ({
        url: brand.logo,
      })),
    })),
    images: Array.from({ length: Object.keys(shoppingBySubCategory).length }, (_, index) => ({
      url: `/img/citys-istanbul-avm/slide-${(index % 2) + 1}.jpg`,
    })),
  }

  const yemeIcme = {
    title: brands.categories?.yemeIcme || "Yeme & İçme",
    items: Object.entries(diningBySubCategory).map(([subCategoryKey, brandsInCategory]) => ({
      title:
        subCategoryKey === "other" ? "Diğer" : toTitleCase(brands.subCategories?.[subCategoryKey] || subCategoryKey),
      logos: brandsInCategory.map((brand) => ({
        url: brand.logo,
      })),
    })),
    images: Array.from({ length: Object.keys(diningBySubCategory).length }, (_, index) => ({
      url: `/img/citys-istanbul-avm/slide-${(index % 2) + 1}.jpg`,
    })),
  }

  const hizmetler = {
    title: brands.categories?.hizmet || "Hizmetler",
    items: Object.entries(servicesBySubCategory).map(([subCategoryKey, brandsInCategory]) => ({
      title:
        subCategoryKey === "other"
          ? "Diğer Hizmetler"
          : toTitleCase(brands.subCategories?.[subCategoryKey] || subCategoryKey),
      logos: brandsInCategory.map((brand) => ({
        url: brand.logo,
      })),
    })),
    images: Array.from({ length: Object.keys(servicesBySubCategory).length }, (_, index) => ({
      url: `/img/citys-istanbul-avm/slide-${(index % 2) + 1}.jpg`,
    })),
  }

  return (
    <Wrapper>
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysIstanbulAvmVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30">
            <div className="flex flex-col h-full py-8 md:py-8 section-container">
              <h1 className="max-w-lg block font-primary leading-snug text-white text-2xl md:text-4xl xl:text-2xl font-medium mt-auto mb-2 lg:mb-4">
                {/* <GsapSplitText splitBy="lines" stagger={0.5} duration={1}> */}
                ŞEHİR HAYATI BİR ASANSÖR UZAKLIKTA
                {/* </GsapSplitText> */}
              </h1>
              <p className="max-w-lg block font-primary leading-snug text-white text-base md:text-lg font-normal mb-0 lg:mb-20">
                {/* <GsapSplitText splitBy="lines" stagger={0.5} duration={1}> */}
                City&#39;s Residences sakinleri için alışveriş, yeme-içme ve günlük ihtiyaçlar, şehrin merkezinde ama ev
                rahatlığında. AVM hayatı, yaşam kurgusunun doğal bir parçası.
                {/* </GsapSplitText> */}
              </p>
            </div>
          </div>
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white py-5">
        <div className="w-full h-[30vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={1.5}>
            <IconCitysParkBgLogo fill="#000000" />
          </FadeInOnScroll>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 md:h-36">
          <FadeInOnScroll duration={0.5}>
            <IconCitysIstanbulLogo fill="#000000" />
          </FadeInOnScroll>
        </div>
      </section>
      <section className="bg-white z-30 mb-10">
        <ListCarousel
          title={alisveris.title}
          items={alisveris.items}
          images={alisveris.images}
          withMoveDown
          variant="v2"
        />
      </section>
      <section className="bg-white z-30 mb-10">
        <ListCarousel
          title={yemeIcme.title}
          items={yemeIcme.items}
          images={yemeIcme.images}
          withMoveDown
          variant="v2"
        />
      </section>
      <section className="bg-white z-30 mb-10">
        <ListCarousel
          title={hizmetler.title}
          items={hizmetler.items}
          images={hizmetler.images}
          withMoveDown
          variant="v2"
        />
      </section>
      <AnimatedLine direction="horizontal" />
      {/* <section className="relative z-20 bg-white mt-10 lg:mt-20">
        <h2 className="font-primary text-3xl font-regular text-center mb-8">ALIŞVERİŞ</h2>
        <AutoScrollCarousel options={{ dragFree: true, loop: true }}>
          {[...shoppingBrands, ...shoppingBrands].map((item, index) => (
            <BrandCarouselItem key={index} logo={item.logo} name={item.name} />
          ))}
        </AutoScrollCarousel>
      </section> */}
      {/* <section className="relative z-20 bg-white mt-10 lg:mt-20">
        <h2 className="font-primary text-3xl font-regular text-center mb-8">YEME - İÇME</h2>
        <AutoScrollCarousel options={{ dragFree: true, loop: true }}>
          {[...foodBrands, ...foodBrands].map((item, index) => (
            <BrandCarouselItem key={index} logo={item.logo} name={item.name} />
          ))}
        </AutoScrollCarousel>
      </section> */}
      {/* <section className="relative z-20 bg-white mt-10 lg:mt-20 mb-20">
        <h2 className="font-primary text-3xl font-regular text-center mb-8">HİZMETLER</h2>
        <AutoScrollCarousel options={{ dragFree: true, loop: true }}>
          {[...services, ...services].map((item, index) => (
            <BrandCarouselItem key={index} logo={item.logo} name={item.name} />
          ))}
        </AutoScrollCarousel>
      </section> */}
      {/* <section className="relative z-20 bg-white">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8  py-0 md:py-8 section-container">
          {slides.map((slide, index) => (
            <div key={index} className={cn("h-[120vw] lg:h-[40vw] w-full relative")}>
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Img
                  src={slide.image}
                  alt={`Slide ${index}`}
                  fill
                  className="w-full h-full object-cover"
                  sizes="100vw"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex flex-col h-full py-8 md:py-8 px-4 md:px-10 lg:px-8">
                    <h1 className="max-w-lg block font-primary leading-snug text-white text-2xl md:text-4xl font-medium mt-auto mb-6">
                      {slide.title}
                    </h1>
                    <p className="max-w-lg block font-primary leading-snug text-white text-base md:text-lg font-normal">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}
      <LinkToPage
        previous={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
        next={{ title: "Anasayfa", href: "/" }}
      />
    </Wrapper>
  )
}
