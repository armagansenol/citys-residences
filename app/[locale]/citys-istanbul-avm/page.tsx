import { AnimatedLine } from "@/components/animated-line"
import { AvmBrandsContainer } from "@/components/avm-brands-container"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysIstanbulLogo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { getBrandsData } from "@/lib/api/server-actions"
import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"

export default async function Page() {
  const brands = await getBrandsData()

  return (
    <>
      <section className='h-svh bg-bricky-brick relative z-10 overflow-hidden'>
        <Img
          src='/img/citys-istanbul-avm-hero.jpg'
          alt="City's Istanbul AVM"
          fill
          sizes='100vw'
          loading='lazy'
          className='object-cover'
        />
      </section>
      <section className='relative z-30 bg-white flex flex-col items-center'>
        <div className='flex items-center justify-center bg-aqua-belt w-full lg:w-[530px] h-40 lg:h-56 mb-8 lg:mb-20'>
          <div className='flex items-center justify-center w-9/12 lg:w-10/12'>
            <IconCitysIstanbulLogo fill={colors["halite-blue"]} />
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 lg:gap-8 px-4 md:px-0 lg:px-0'>
          <h2
            className={cn(
              "font-primary font-bold text-bricky-brick xl:max-w-4xl 2xl:max-w-6xl text-center",
              "text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl",
              "xl:leading-normal 2xl:leading-snug"
            )}
          >
            <GsapSplitText stagger={0.1} splitBy='lines' duration={1}>
              Hayatı Tüm Renkleriyle Yaşa...
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              "font-primary font-normal text-black xl:max-w-5xl 2xl:max-w-6xl text-center",
              "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl",
              "xl:leading-normal 2xl:leading-snug"
            )}
          >
            <GsapSplitText stagger={0.1} splitBy='lines' duration={1}>
              Avrupa ve Asya’yı birbirine bağlayan en değerli lokasyonda ve hayatın tam merkezinde...
            </GsapSplitText>
          </p>
          <p
            className={cn(
              "font-primary font-normal text-black xl:max-w-5xl 2xl:max-w-5xl text-center",
              "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl",
              "xl:leading-normal 2xl:leading-snug"
            )}
          >
            <GsapSplitText stagger={0.1} splitBy='lines' duration={1}>
              Dünyaca tanınan seçkin markalara bir kaç adımda ulaşır, taze bir kahve kokusuyla tanışır, gurme lezzet
              duraklarında soluklanır; sanat, kültür, eğlenceyle buluşur, günün koşturmacasını sakince geride
              bırakırsın...
            </GsapSplitText>
          </p>
          <p
            className={cn(
              "font-primary font-bold text-black xl:max-w-5xl 2xl:max-w-6xl text-center",
              "text-lg lg:text-2xl xl:text-3xl 2xl:text-3xl",
              "xl:leading-normal 2xl:leading-snug"
            )}
          >
            <GsapSplitText stagger={0.1} splitBy='lines' duration={1}>
              Daha Çok Yaşa... Daha Huzurlu Yaşa... Daha Dolu Yaşa...
            </GsapSplitText>
          </p>
        </div>
      </section>
      <section className='section-container py-16 lg:py-24'>
        <AvmBrandsContainer initialBrands={brands.items || []} />
      </section>
      <AnimatedLine direction='horizontal' />
    </>
  )
}
