import { citysParkVideo } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { FadeInOnScroll } from "../animations/fade-in-on-scroll"
import { GsapSplitText } from "../gsap-split-text"
import { Img } from "../utility/img"
import { VideoWithText } from "../video-with-text"

export default function TestSection() {
  const t = useTranslations("home")

  return (
    <div>
      <section className='bg-white py-12 lg:py-12 z-20 relative'>
        <div className='py-12 xl:py-28 relative flex items-center justify-center gap-32 ml-32'>
          <div className='flex flex-col items-center gap-2 lg:gap-2 flex-shrink-0 w-[700px]'>
            <article
              className={cn(
                "font-montserrat font-[500] text-trapped-darkness text-center",
                "text-4xl lg:text-5xl",
                "leading-tight lg:leading-tight",
                "tracking-wide lg:tracking-widest"
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.02} duration={1.5}>
                {t("section1.title1")}
              </GsapSplitText>
              <span className='sr-only'>{t("section1.title1")}</span>
            </article>
            <FadeInOnScroll delay={0.5}>
              <article className='relative w-screen h-16 lg:h-44 xl:h-32'>
                <Img src='/img/sanati.png' alt='Sanatı' fill className='object-contain' sizes='100vw' loading='lazy' />
                <span className='sr-only'>{t("section1.title2")}</span>
              </article>
            </FadeInOnScroll>
          </div>
          <div className='flex w-80 flex-shrink-0'>
            <article
              className={cn(
                "font-montserrat font-[300] text-trapped-darkness text-left",
                "text-[0.8rem] lg:text-2xl",
                "leading-relaxed"
              )}
            >
              <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
                {t("section1.title3")}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <VideoWithText
        primaryVideoUrl={citysParkVideo}
        title={
          <span>
            Daha <strong>huzurlu</strong> yaşa.
          </span>
        }
        description={
          <>
            Farklı ve zamansız mimarinin, doğanın cömertliği ile buluştuğu mekanlarda güven içinde, daha huzurlu yaşa.
          </>
        }
      />
    </div>
  )
}
