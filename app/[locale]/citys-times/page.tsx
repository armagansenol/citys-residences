import { IconWrapper } from "@/components/icon-wrapper"
import { socialIcons } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { colors } from "@/styles/config.mjs"
import { navigationConfig } from "@/lib/constants"
// import { fetchEvents, getEventImageUrl } from "@/lib/api/queries"

export default async function Page() {
  // { params: { locale } }: { params: { locale: string } }
  const social = socialIcons(colors["bricky-brick"])
  // const eventsResponse = await fetchEvents(locale)
  // const events = eventsResponse.success ? eventsResponse.data || [] : []

  return (
    <>
      <section className="h-[35vw] relative overflow-hidden" id={navigationConfig["/citys-times"]?.id as string}>
        <Img
          className="object-cover w-full h-full"
          src="/img/citys-times-banner.jpg"
          alt="Citys Times"
          fill
          sizes="100vw"
          loading="lazy"
        />
      </section>
      <section className="flex mb-8">
        <div className="w-72 font-primary font-medium border-r-2 border-black text-bricky-brick text-xl p-8 flex flex-col items-start space-y-6 min-h-screen pt-24 mt-8">
          <div className="flex items-center justify-start space-x-3 mb-16">
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {social.events}
            </IconWrapper>
            <span>Etkinlikler</span>
          </div>
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
        </div>
        <div className="flex-1 bg-white py-20 flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center">
            <h3 className="font-primary font-semibold text-black text-6xl mb-2">CITY&apos;S TIMES</h3>
            <div className="w-full h-0.5 bg-black mb-4"></div>
          </div>
          <p className="font-primary font-medium text-bricky-brick text-6xl">Bizi Takip Edin...</p>
          <div className="grid grid-cols-3 gap-6 w-full border-red-500 mt-12 px-24">
            <div className="w-full xl:h-72 2xl:h-96 aspect-square bg-bricky-brick relative">
              <Img src="/img/avm-1.jpg" alt="Citys Times" fill sizes="30vw" className="object-cover" loading="lazy" />
            </div>
            <div className="w-full xl:h-72 2xl:h-96 aspect-square bg-bricky-brick relative">
              <Img src="/img/avm-2.jpg" alt="Citys Times" fill sizes="30vw" className="object-cover" loading="lazy" />
            </div>
            <div className="w-full xl:h-72 2xl:h-96 aspect-square bg-bricky-brick relative">
              <Img
                src="/img/video-bg.jpg"
                alt="Citys Times"
                fill
                sizes="30vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
          {/* {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12 px-24">
              {events.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {event.media.length > 0 && event.media[0].type === "image" && (
                    <div className="w-full h-48 relative">
                      <Img
                        src={getEventImageUrl(event.media[0].src)}
                        alt={event.title}
                        fill
                        sizes="30vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="font-primary font-semibold text-black text-xl mb-2">{event.title}</h4>
                    <p className="font-primary text-gray-600 text-sm mb-3">{event.description}</p>
                    <div className="space-y-1 text-sm text-bricky-brick">
                      <p>
                        <span className="font-medium">Konum:</span> {event.location}
                      </p>
                      <p>
                        <span className="font-medium">Tarih:</span> {event.date}
                      </p>
                      <p>
                        <span className="font-medium">Saat:</span> {event.time}
                      </p>
                    </div>
                    <div className="mt-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.status === "active" ? "Aktif" : "Pasif"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p className="font-primary text-gray-500 text-xl">Henüz etkinlik bulunmamaktadır.</p>
            </div>
          )} */}
        </div>
      </section>
    </>
  )
}
