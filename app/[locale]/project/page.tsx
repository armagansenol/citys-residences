import { cn } from "@/lib/utils"

import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { Logo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { gsapGlobalClasses, mainVideo, muratKaderVideo, sections } from "@/lib/constants"
import { breakpoints, colors } from "@/styles/config.mjs"

export default function Page() {
  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={mainVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-bottom"
          />
        </ScaleOut>
      </section>
      <section className="bg-white py-0 lg:py-12 z-20 section-container">
        <div className={cn("w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-10 lg:mb-20", gsapGlobalClasses.fadeIn)}>
          <Logo fill={colors["bricky-brick"]} />
        </div>
        <div className="space-y-8 lg:space-y-16">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((imageNumber) => (
            <div key={imageNumber} className={cn("relative w-full h-[55vw]", gsapGlobalClasses.fadeIn)}>
              <Img
                alt={`Project ${imageNumber}`}
                src={`/img/project/${imageNumber.toString().padStart(2, "0")}.jpg`}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                fill
              />
            </div>
          ))}
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
      <section
        className={cn("relative py-8 lg:py-16 section-container", gsapGlobalClasses.fadeIn)}
        id={sections.home.section4.id}
      >
        <VideoSection
          primaryVideoUrl={muratKaderVideo}
          thumbnail="/img/thumbnail-murat-kader.jpg"
          title="Mimari: Yaşamın Sanata Döndüğü Bir Proje Yaptık."
          className="rounded-sm overflow-hidden"
        />
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage previous={{ title: "Anasayfa", href: "/" }} next={{ title: "Daireler", href: "/residences" }} />
    </Wrapper>
  )
}
