import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "@/components/gsap-split-text"
import { Logo } from "@/components/icons"
import { Sequenced } from "@/components/sequenced"
import { StackingCards } from "@/components/stacking-cards"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { melihBulgurVideo, mustafaTonerVideo, residencesVideo, sections } from "@/lib/constants"
import { getResidencesContent } from "@/lib/content"
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
        <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
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
          <div className="w-full h-40 lg:h-64 mx-auto ">
            <Logo fill={colors["bricky-brick"]} />
          </div>
        </FadeInOnScroll>
      </section>
      <section className="bg-white relative z-30 py-12" id={sections.residences.interiorArchitecture.id}>
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
      <section className="hidden xl:block bg-white relative z-30 section-container">
        <div className="relative flex flex-col items-center justify-center lg:max-w-4xl 3xl:max-w-5xl mx-auto py-32 pb-0">
          <h2 className="font-montserrat font-bold text-bricky-brick text-4xl lg:text-7xl xl:text-6xl 2xl:text-6xl 3xl:text-7xl xl:leading-tight 2xl:leading-snug 3xl:leading-snug mb-6 text-center xl:text-center">
            <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
              Yaşama Alan Açan Detaylar
            </GsapSplitText>
          </h2>
          <p className="font-primary font-medium text-md lg:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl xl:leading-snug 2xl:leading-normal 3xl:leading-normal mb-6 text-center xl:text-center">
            <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
              Her metrekaresi ince tasarlanmış, <br /> ferah bir hayata açılan çizgiler
            </GsapSplitText>
          </p>
          <p className="font-primary font-normal text-md lg:text-4xl xl:text-3xl 2xl:text-3xl 3xl:text-3xl xl:leading-normal 2xl:leading-normal 3xl:leading-normal text-center xl:text-center">
            <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
              Günlük alışkanlıklardan uzun vadeli konfora kadar her detay, yaşamın doğal akışına uyum sağlayacak şekilde
              tasarlandı.
            </GsapSplitText>
          </p>
        </div>
        <Sequenced />
      </section>
      <section className="bg-white relative z-30 section-container py-12">
        <StackingCards items={items} />
      </section>
      <FadeInOnScroll>
        <section className="section-container py-12" id={sections.residences.groundSafety.id}>
          <VideoSection
            primaryVideoUrl={melihBulgurVideo}
            thumbnail="/img/thumbnail-melih-bulgur.jpg"
            title="Zemin Güvenliği: Huzur Mühendisliği"
          />
        </section>
      </FadeInOnScroll>
      <AnimatedLine direction="horizontal" />
    </>
  )
}
