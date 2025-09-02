import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { IconCitysParkLogo, IconCollab } from "@/components/icons"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { citysParkVideo, navigationConfig, pinarVeCemilAktasVideo } from "@/lib/constants"
import { getCitysParkContent } from "@/lib/content"
import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"
import { getTranslations } from "next-intl/server"

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  // Load content from MDX files based on current locale
  const items = await getCitysParkContent(locale)
  const t = await getTranslations({ locale, namespace: "citys-park" })
  // const tCommon = await getTranslations({ locale, namespace: "common.navigation" })

  return (
    <>
      <section className="relative z-20 bg-army-canvas" id={navigationConfig["/citys-park"]?.id as string}>
        <div className="flex items-center justify-center w-full pt-14 pb-12 lg:pb-24">
          <div className="h-28 lg:h-32">
            <IconCitysParkLogo fill={colors.white} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 lg:gap-16 xl:gap-20">
          <FadeInOnScroll>
            <h2
              className={cn(
                "font-primary font-medium text-white text-center",
                "text-2xl sm:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl 3xl:text-3xl",
                "leading-snug xl:leading-snug 2xl:leading-snug 3xl:leading-tight",
                "xl:max-w-4xl 2xl:max-w-6xl",
                "mb-12 lg:mb-0"
              )}
            >
              Şehrin kalbinde,
              <br className="block lg:hidden" /> sizi yavaşlatan,
              <br /> yaşamın en özel hali...
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <h2
              className={cn(
                "xl:max-w-4xl 2xl:max-w-6xl",
                "flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0",
                "mb-6 xl:mb-8 2xl:mb-8 3xl:mb-10"
              )}
            >
              <span
                className={cn(
                  "font-primary font-normal lg:font-semibold text-white text-center whitespace-nowrap",
                  "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-5xl",
                  "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
                )}
              >
                Yaşam Yeniden Tasarlandı
              </span>
              <span className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 mx-8">
                <IconCollab fill={colors.white} />
              </span>
              <span
                className={cn(
                  "font-copperplate font-semibold text-white text-center",
                  "text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl",
                  "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight"
                )}
              >
                CITY<span className="font-montagu-slab font-normal">&apos;</span>S
              </span>
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <div className="relative section-container">
              <VideoSection
                primaryVideoUrl={pinarVeCemilAktasVideo}
                thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
                title={t("videoTitle")}
              />
            </div>
          </FadeInOnScroll>
          <div className="relative w-full h-svh mb-10 lg:mb-0">
            <Video
              primaryVideoUrl={citysParkVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="relative z-20 bg-army-canvas">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className="transparent"
            titleClassName="text-white"
            subtitleClassName="text-white"
            descriptionClassName="text-white [&_p]:text-white [&_li]:text-white"
            barClassName="bg-white"
            sectionId={item.sectionId}
          />
        ))}
      </section>
    </>
  )
}
