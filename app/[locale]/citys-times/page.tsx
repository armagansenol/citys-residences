import { IconWrapper } from "@/components/icon-wrapper"
import { socialIcons } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { colors } from "@/styles/config.mjs"

export default async function Page() {
  const social = socialIcons(colors["bricky-brick"])
  return (
    <>
      <section className="h-[35vw] relative overflow-hidden">
        <Img
          className="object-cover w-full h-full"
          src="/img/citys-times-banner.jpg"
          alt="Citys Times"
          fill
          sizes="100vw"
        />
      </section>
      <section className="flex mb-8">
        <div className="w-72 font-primary font-medium border-r border-black text-bricky-brick text-xl p-8 flex flex-col items-start space-y-6 min-h-screen pt-24 mt-8">
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {social.instagram}
            </IconWrapper>
            <span>Instagram</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {social.tiktok}
            </IconWrapper>
            <span>TikTok</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {social.youtube}
            </IconWrapper>
            <span>YouTube</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {social.facebook}
            </IconWrapper>
            <span>Facebook</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">{social.x}</IconWrapper>
            <span>X</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {social.linkedin}
            </IconWrapper>
            <span>Linkedin</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {social.events}
            </IconWrapper>
            <span>Etkinlikler</span>
          </div>
        </div>
        <div className="flex-1 bg-white py-20 flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center">
            <h3 className="font-primary font-semibold text-black text-6xl mb-2">CITY&apos;S TIMES</h3>
            <div className="w-full h-0.5 bg-black mb-4"></div>
          </div>
          <p className="font-primary font-medium text-bricky-brick text-6xl">Bizi Takip Edin...</p>
          <div className="grid grid-cols-3 gap-6 w-full border-red-500 mt-12 px-24">
            <div className="w-full xl:h-72 2xl:h-96 aspect-square bg-bricky-brick relative">
              <Img src="/img/avm-1.jpg" alt="Citys Times" fill sizes="30vw" className="object-cover" />
            </div>
            <div className="w-full xl:h-72 2xl:h-96 aspect-square bg-bricky-brick relative">
              <Img src="/img/avm-2.jpg" alt="Citys Times" fill sizes="30vw" className="object-cover" />
            </div>
            <div className="w-full xl:h-72 2xl:h-96 aspect-square bg-bricky-brick relative">
              <Img src="/img/video-bg.jpg" alt="Citys Times" fill sizes="30vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
