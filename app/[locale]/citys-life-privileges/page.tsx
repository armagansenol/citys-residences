import cn from "clsx"
import { useTranslations } from "next-intl"

import { MaskedParallaxImageSection } from "@/components/parallax-images-section"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { mainVideoDesktop, mainVideoMobile } from "@/lib/constants"

export default function Page() {
  const t = useTranslations("citys-life")
  return (
    <Wrapper>
      <section className={cn("h-screen bg-bricky-brick relative z-10 overflow-hidden")}>
        <div className="h-full w-full">
          <Video
            primaryVideoUrl={mainVideoDesktop}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover hidden bd:block"
          />
          <Video
            primaryVideoUrl={mainVideoMobile}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover block bd:hidden"
          />
        </div>
      </section>
      <section className="relative">
        <div className="flex flex-col gap-12 bt:gap-32 bd:gap-48 py-12 bt:py-16 bd:py-32">
          {[
            {
              title: t("items.i1.title"),
              text: t("items.i1.text"),
              imgSrc: "/img/slides-2/3.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i2.title"),
              text: t("items.i2.text"),
              imgSrc: "/img/slides-2/4.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i3.title"),
              text: t("items.i3.text"),
              imgSrc: "/img/slides-2/2.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i4.title"),
              text: t("items.i4.text"),
              imgSrc: "/img/slides-2/1.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i5.title"),
              text: t("items.i5.text"),
              imgSrc: "/img/slides-2/4.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i6.title"),
              text: t("items.i6.text"),
              imgSrc: "/img/slides-2/2.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i7.title"),
              text: t("items.i7.text"),
              imgSrc: "/img/slides-2/1.jpg",
              horizontalAlignment: "ltr" as const,
            },
          ].map(
            (
              item: {
                title: string
                text: string
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
    </Wrapper>
  )
}
