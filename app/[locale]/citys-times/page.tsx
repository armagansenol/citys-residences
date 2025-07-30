import { IconWrapper } from "@/components/icon-wrapper"
import { socialIcons } from "@/components/icons"
import { Img } from "@/components/utility/img"

export default async function Page() {
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
      <section className="flex">
        <div className="w-64 font-primary font-medium bg-bricky-brick text-white text-lg p-8 flex flex-col items-start space-y-6 min-h-screen pt-24">
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0">{socialIcons.instagram}</IconWrapper>
            <span>Instagram</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0">{socialIcons.tiktok}</IconWrapper>
            <span>TikTok</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0">{socialIcons.youtube}</IconWrapper>
            <span>YouTube</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0">{socialIcons.facebook}</IconWrapper>
            <span>Facebook</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0">{socialIcons.x}</IconWrapper>
            <span>X</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0">{socialIcons.linkedin}</IconWrapper>
            <span>Linkedin</span>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0">{socialIcons.events}</IconWrapper>
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
