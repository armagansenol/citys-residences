import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysMembersClubLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { gsapGlobalClasses, membersClubVideo } from "@/lib/constants"
import { getCitysMembersClubContent } from "@/lib/content"

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params
  const items = await getCitysMembersClubContent(locale)

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={membersClubVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-minor-blue">
        <LogoSection foregroundLogo={<IconCitysMembersClubLogo fill="#000000" />} foregroundDuration={0.5} />
        <div className="flex flex-col items-center justify-center pb-24">
          <div className={cn("relative w-[35vw] h-[35vw] mb-12", gsapGlobalClasses.fadeIn)}>
            <Img src="/img/members-cat.png" alt="City's Members Club" fill className="object-contain" />
          </div>
          <h2
            id="masaj"
            className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center"
          >
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              Yaşam yeniden tasarlandı: CITY&apos;S
            </GsapSplitText>
          </h2>
        </div>
      </section>
      <section className="bg-white z-30">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
            sectionId={item.sectionId as string}
          />
        ))}
      </section>
      <LinkToPage
        previous={{ title: "City's Park", href: "/citys-park" }}
        next={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
      />
    </Wrapper>
  )
}
