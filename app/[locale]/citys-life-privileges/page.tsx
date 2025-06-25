import { useTranslations } from "next-intl"
import { ReactNode } from "react"

import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysLifeLogo, IconCitysParkBgLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { MaskedParallaxImageSection } from "@/components/parallax-images-section"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysLifeVideo } from "@/lib/constants"

export default function Page() {
  const t = useTranslations("citys-life")
  return (
    <Wrapper>
      <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysLifeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white pt-8">
        <div className="w-full h-[40vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <IconCitysParkBgLogo fill="#000" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-60">
          <IconCitysLifeLogo fill="#000000" />
        </div>
      </section>
      <section className="relative z-20 bg-white">
        <div className=" flex flex-col gap-12 bt:gap-32 bd:gap-48 py-12 bt:py-24 bd:py-40 section-container">
          {[
            {
              title: t("items.i1.title"),
              text: t.rich("items.i1.text", {
                br: () => <br />,
                strong: (chunks) => <strong>{chunks}</strong>,
              }),
              imgSrc: "/img/citys-life/01.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i2.title"),
              text: t.rich("items.i2.text", {
                br: () => <br />,
                strong: (chunks) => <strong>{chunks}</strong>,
              }),
              imgSrc: "/img/citys-life/02.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i3.title"),
              text: t.rich("items.i3.text", {
                br: () => <br />,
                strong: (chunks) => <strong>{chunks}</strong>,
              }),
              imgSrc: "/img/citys-life/03.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i4.title"),
              text: t.rich("items.i4.text", {
                br: () => <br />,
                strong: (chunks) => <strong>{chunks}</strong>,
              }),
              imgSrc: "/img/citys-life/04.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i5.title"),
              text: t.rich("items.i5.text", {
                br: () => <br />,
                strong: (chunks) => <strong>{chunks}</strong>,
              }),
              imgSrc: "/img/citys-life/05.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i6.title"),
              text: t.rich("items.i6.text", {
                br: () => <br />,
                strong: (chunks) => <strong>{chunks}</strong>,
              }),
              imgSrc: "/img/citys-life/06.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i7.title"),
              text: t.rich("items.i7.text", {
                br: () => <br />,
                strong: (chunks) => <strong>{chunks}</strong>,
              }),
              imgSrc: "/img/citys-life/07.jpg",
              horizontalAlignment: "ltr" as const,
            },
          ].map(
            (
              item: {
                title: string
                text: ReactNode
                imgSrc: string
                horizontalAlignment: "ltr" | "rtl"
                link?: { url: string; text: string }
              },
              index
            ) => (
              <MaskedParallaxImageSection
                key={index}
                title={item.title}
                text={item.text}
                imgSrc={item.imgSrc}
                horizontalAlignment={item.horizontalAlignment}
                {...(item.link && { link: item.link })}
              />
            )
          )}
        </div>
      </section>
      <LinkToPage
        previous={{ title: "City's Members Club", href: "/citys-members-club" }}
        next={{ title: "City's İstanbul AVM", href: "/citys-istanbul-avm" }}
      />
    </Wrapper>
  )
}
