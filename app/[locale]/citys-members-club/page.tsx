import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { IconCitysMembersClubLogo, IconCollab } from "@/components/icons"
import { MembersClubItem } from "@/components/members-club-item"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { membersClubVideo, navigationConfig } from "@/lib/constants"
import { getCitysMembersClubContent } from "@/lib/content"
import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params
  const items = await getCitysMembersClubContent(locale)

  return (
    <>
      <section className="relative z-20 bg-minor-blue" id={navigationConfig["/citys-members-club"]?.id as string}>
        <div className="flex items-center justify-center w-full pt-12 pb-12">
          <div className="h-40">
            <IconCitysMembersClubLogo fill="#000000" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pb-12 lg:pb-24">
          <FadeInOnScroll>
            <div className="relative w-[90vw] h-[80vw] lg:w-[35vw] lg:h-[22vw]">
              <Img
                src="/img/members-cat.png"
                alt="City's Members Club"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.3}>
            <h2
              className={cn(
                "font-primary font-medium text-center",
                "text-3xl lg:text-2xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl",
                "xl:leading-normal 2xl:leading-tight 3xl:leading-tight",
                "xl:max-w-4xl 2xl:max-w-6xl",
                "flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0"
              )}
            >
              <span>Yaşam Yeniden Tasarlandı </span>
              <span className="w-12 h-12 lg:w-16 lg:h-16 mx-8">
                <IconCollab fill={colors.black} />
              </span>
              <span>CITY&apos;S</span>
            </h2>
          </FadeInOnScroll>
        </div>
      </section>
      <FadeInOnScroll>
        <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
          <Video
            primaryVideoUrl={membersClubVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </section>
      </FadeInOnScroll>
      <section className="bg-minor-blue z-30">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className="transparent"
            titleClassName="text-black"
            subtitleClassName="text-black"
            descriptionClassName="text-black [&_p]:text-black [&_li]:text-black"
            barClassName="bg-black"
            sectionId={item.sectionId as string}
          />
        ))}
      </section>
    </>
  )
}
