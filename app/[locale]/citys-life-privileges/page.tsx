import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

import { ScaleOut } from "@/components/animations/scale-out"
import { MaskedParallaxImageSection } from "@/components/parallax-images-section"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysLifeVideo } from "@/lib/constants"

export default function Page() {
  const t = useTranslations("citys-life")
  return (
    <Wrapper>
      <section className={cn("relative h-[var(--svh-calc)] bd:h-screen bg-bricky-brick z-10 overflow-hidden")}>
        <ScaleOut>
          <div className="h-full w-full">
            <Video
              primaryVideoUrl={citysLifeVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover hidden bd:block"
            />
          </div>
          {/* <div className="container flex flex-col h-full">
              <h1 className="max-w-xl block font-montserrat leading-snug text-white text-2xl bt:text-4xl font-medium mt-auto mb-8">
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  CITY&apos;S LIFE:
                </TextRevealOnScroll>
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  KONFOR VE SOSYAL YAŞAMIN YENİ ADRESİ
                </TextRevealOnScroll>
              </h1>
              <p className="max-w-lg block font-halenoir leading-snug text-white text-base bt:text-lg font-normal mb-20">
                <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                  Hayatın en seçkin anlarını yaşamak için ayrıcalıklı dünyamıza adım adım yaklaşıyorsunuz.
                </TextRevealOnScroll>
              </p>
            </div> */}
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white">
        <div className="container flex flex-col gap-12 bt:gap-32 bd:gap-48 py-12 bt:py-36 bd:py-40">
          {[
            {
              title: t("items.i1.title"),
              text: t("items.i1.text"),
              imgSrc: "/img/citys-life/01.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i2.title"),
              text: t("items.i2.text"),
              imgSrc: "/img/citys-life/02.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i3.title"),
              text: t("items.i3.text"),
              imgSrc: "/img/citys-life/03.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i4.title"),
              text: t("items.i4.text"),
              imgSrc: "/img/citys-life/04.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i5.title"),
              text: t("items.i5.text"),
              imgSrc: "/img/citys-life/05.jpg",
              horizontalAlignment: "ltr" as const,
            },
            {
              title: t("items.i6.title"),
              text: t("items.i6.text"),
              imgSrc: "/img/citys-life/06.jpg",
              horizontalAlignment: "rtl" as const,
            },
            {
              title: t("items.i7.title"),
              text: t("items.i7.text"),
              imgSrc: "/img/citys-life/07.jpg",
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
