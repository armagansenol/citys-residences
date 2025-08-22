import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCollab, Logo } from "@/components/icons"
import { Sequenced } from "@/components/sequenced"
import { StackingCards } from "@/components/stacking-cards"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { melihBulgurVideo, mustafaTonerVideo, residencesVideo, sections } from "@/lib/constants"
import { getResidencesContent } from "@/lib/content"
import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const residencesContent = await getResidencesContent(locale)

  const items = residencesContent.map((item) => ({
    title: item.title,
    description: item.subtitle,
    images: item.url.map((url) => ({ url })),
    bg: item.bg || "#ffffff",
    sectionId: item.sectionId || "",
  }))

  return (
    <>
      <FadeInOnScroll>
        <section className="h-[65vw] xl:h-svh bg-bricky-brick relative z-10 overflow-hidden">
          <Video
            primaryVideoUrl={residencesVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </section>
      </FadeInOnScroll>
      <section className="bg-white relative z-30 py-12 lg:pt-20 2xl:pt-28">
        <FadeInOnScroll>
          <div className="w-full h-40 lg:h-64 mx-auto">
            <Logo fill={colors["bricky-brick"]} />
          </div>
        </FadeInOnScroll>
      </section>
      <section className="bg-white relative z-30 lg:py-12" id={sections.residences.interiorArchitecture.id}>
        <FadeInOnScroll>
          <div className="section-container">
            <VideoSection
              primaryVideoUrl={mustafaTonerVideo}
              thumbnail="/img/thumbnail-toners.jpg"
              title="İÇ MİMARIN GÖZÜYLE..."
            />
          </div>
        </FadeInOnScroll>
      </section>
      <section className="bg-white relative z-30 section-container">
        <div className="relative flex flex-col items-center justify-center mx-auto py-16 xl:py-32 pb-0 px-4 lg:px-0">
          <h2
            className={cn(
              "font-montserrat font-bold text-bricky-brick text-center mb-5",
              "text-4xl lg:text-6xl xl:text-6xl 2xl:text-7xl 3xl:text-7xl",
              "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight "
            )}
          >
            <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
              Yaşama Alan Açan Detaylar
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              "font-primary font-medium text-md text-center mb-5 lg:mb-10",
              "text-2xl lg:text-4xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl",
              "leading-tighter lg:leading-tighter xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
            )}
          >
            <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
              Her metrekaresi ince tasarlanmış, <br /> ferah bir hayata açılan çizgiler
            </GsapSplitText>
          </p>
          <p
            className={cn(
              "font-primary font-normal text-center",
              "lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl",
              "text-lg lg:text-3xl xl:text-2xl 2xl:text-3xl 3xl:text-3xl",
              "leading-normal lg:leading-normal xl:leading-normal 2xl:leading-normal 3xl:leading-normal"
            )}
          >
            <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
              Günlük alışkanlıklardan uzun vadeli konfora kadar her detay, yaşamın doğal akışına uyum sağlayacak şekilde
              tasarlandı.
            </GsapSplitText>
          </p>
        </div>
        <Sequenced />
      </section>
      <section className="bg-white relative z-30 section-container py-6 lg:py-12 w-full overflow-hidden">
        <StackingCards items={items} />
      </section>
      <FadeInOnScroll>
        <section className="section-container lg:py-12" id={sections.residences.groundSafety.id}>
          <VideoSection
            primaryVideoUrl={melihBulgurVideo}
            thumbnail="/img/thumbnail-melih-bulgur.jpg"
            title={
              <>
                <span className="whitespace-nowrap">Zemin Güvenliği</span>
                <span className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 mx-8">
                  <IconCollab fill={colors.white} />
                </span>
                <span className="whitespace-nowrap">Huzur Mühendisliği</span>
              </>
            }
          />
        </section>
      </FadeInOnScroll>
      <AnimatedLine direction="horizontal" />
    </>
  )
}
