import { cn } from "@/lib/utils"

import { Logo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { gsapGlobalClasses, mainVideo, muratKaderVideo } from "@/lib/constants"
import { breakpoints, colors } from "@/styles/config.mjs"

export default function Page() {
  return (
    <>
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <Video
          primaryVideoUrl={mainVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-bottom"
        />
      </section>
      <section className="bg-white py-0 lg:py-12 z-20">
        <div className="section-container">
          <div className={cn("w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-10 lg:mb-20", gsapGlobalClasses.fadeIn)}>
            <Logo fill={colors["bricky-brick"]} />
          </div>
          <div className="space-y-8 lg:space-y-16">
            <div className={cn("relative w-full h-[55vw]", gsapGlobalClasses.fadeIn)}>
              <Img
                alt={`Project Visual`}
                src={`/img/project/01.jpg`}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                fill
                className="object-cover"
              />
            </div>
            <div className={cn("relative w-full h-[55vw]", gsapGlobalClasses.fadeIn)}>
              <Img
                alt={`Project Visual`}
                src={`/img/project/02.jpg`}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                fill
                className="object-cover"
              />
            </div>
            <div className={cn("relative py-8 lg:py-8", gsapGlobalClasses.fadeIn)}>
              <VideoSection
                primaryVideoUrl={muratKaderVideo}
                thumbnail="/img/thumbnail-murat-kader.jpg"
                title="PROJEYİ MİMARI ANLATIYOR..."
                className="rounded-sm overflow-hidden"
              />
            </div>
            <div className={cn("relative w-full h-[55vw]", gsapGlobalClasses.fadeIn)}>
              <Img
                alt={`Project Visual`}
                src={`/img/project/03.jpg`}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                fill
                className="object-cover"
              />
            </div>
            <div className={cn("relative w-full h-[55vw]", gsapGlobalClasses.fadeIn)}>
              <Img
                alt={`Project Visual`}
                src={`/img/project/04.jpg`}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                fill
                className="object-cover"
              />
            </div>
            <div className={cn("relative w-full h-[55vw]", gsapGlobalClasses.fadeIn)}>
              <Img
                alt={`Project Visual`}
                src={`/img/project/05.jpg`}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <AnimatedLine direction="horizontal" /> */}
      {/* <LinkToPage previous={{ title: "Anasayfa", href: "/" }} next={{ title: "Daireler", href: "/residences" }} /> */}
    </>
  )
}
