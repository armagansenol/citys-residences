import { cn } from "@/lib/utils"

import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysParkLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo, gsapGlobalClasses } from "@/lib/constants"
import { breakpoints } from "@/styles/config.mjs"

export default function Page() {
  const items = [
    {
      title: `City's Lounge`,
      description: `
      <p>Günlük buluşmalardan özel davetlere kadar her anınıza uyum sağlayan ayrıcalıklı bir sosyal alandır.</p>
      <p>İster doğanın içinde bir masa etrafında buluşun ister zarif bir etkinliğe ev sahipliği yapın.</p>
      `,
      url: ["/img/citys-park/01.jpg"],
    },
    {
      title: `Açıkhava <br /> Meydanları`,
      description: `
      <p>Birlikte olmanın bir plana ihtiyaç duymadığı, hayatın akışında paylaşılan zamanlara ayrılmış birbirinden keyifli mekanlar.</p>
      `,
      url: ["/img/citys-park/06.jpg"],
    },
    {
      title: `Açık Havuzlar`,
      description: `
      <p>City's Residences yaşam tasarımıyla, günün ritmine uyum sağlayan bir kaçış: <br /> Serinlik, güneş, sohbet ve huzur her an sizinle.</p>
      `,
      url: ["/img/citys-park/02.jpg"],
    },
    {
      title: `Çocuk Parkları`,
      description: `
      <p>Doğa, oyun ve hayal gücü bir arada; <br /> Çocukların özgürce büyüdüğü, çocukluklarını doya doya yaşadığı alanlar.</p>
      `,
      url: ["/img/citys-park/03.jpg"],
    },
    {
      title: `Yürüyüş Parkurları`,
      description: `
      <p>Gökyüzü kadar geniş bir hareket alanıyla dilediğinizce yürüyün veya koşun.</p>
      <p>Günlük adımlarınızı atarken nefesinizi ve ritminizi doğaya bırakın.</p>

      `,
      url: ["/img/citys-park/04.jpg"],
    },
    {
      title: `Açık Spor Alanları`,
      description: `
      <p>Doğa ve bedeni aynı ritimde buluşturan yepyeni bir spor yaşamı tasarımı.</p>
      <p>Dilerseniz sabah serinliğinde yoga, dilerseniz gün batımında bisiklet...</p>
      `,
      url: ["/img/citys-park/05.jpg"],
    },
  ]

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysParkVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white py-5">
        <LogoSection foregroundLogo={<IconCitysParkLogo fill="#5D7261" />} foregroundDuration={0.5} />
        <div className="section-container py-20 flex flex-col items-center gap-20">
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-6xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Şehrin kalbinde, <br /> sizi yavaşlatan, yaşamın en özel hali...
            </GsapSplitText>
          </h2>
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.002} splitBy="chars" duration={1.5}>
              Yaşam Yeniden Tasarlandı: CITY&apos;S.
            </GsapSplitText>
          </h2>
          <div className={cn("relative w-full h-[90vh]", gsapGlobalClasses.fadeIn)}>
            <MaskedParallaxImage
              imgSrc={"/img/citys-park-banner.jpg"}
              sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
            />
          </div>
        </div>
      </section>
      <section className="relative z-20 bg-white">
        <AnimatedLine direction="horizontal" />
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
          />
        ))}
      </section>
      <section className={cn("relative section-container py-20", gsapGlobalClasses.fadeIn)}>
        <VideoSection
          primaryVideoUrl={citysParkVideo}
          thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
          title="Peyzaj: Bir Vaha Tasarımı..."
        />
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage
        previous={{ title: "Daireler", href: "/residences" }}
        next={{ title: "City's Members Club", href: "/citys-members-club" }}
      />
    </Wrapper>
  )
}
