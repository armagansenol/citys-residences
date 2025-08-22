"use client"

import { IconWrapper } from "@/components/icon-wrapper"
import { IconCitysTimesLogo, socialIcons } from "@/components/icons"
import { ScrollableSelect } from "@/components/scrollable-select"
import { Img } from "@/components/utility/img"
import { colors } from "@/styles/config.mjs"
import { useState } from "react"

type SocialPlatform = "events" | "instagram" | "tiktok" | "youtube" | "facebook" | "x" | "linkedin"

interface SocialItem {
  id: SocialPlatform
  title: string
  icon: React.ReactNode
}

interface ContentData {
  title: string
  images?: string[]
  videos?: string[]
}

export function Content() {
  const social = socialIcons(colors["bricky-brick"])
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>("instagram")

  const items: Record<SocialPlatform, SocialItem> = {
    events: {
      id: "events",
      title: "Etkinlikler",
      icon: social.events,
    },
    instagram: {
      id: "instagram",
      title: "Instagram",
      icon: social.instagram,
    },
    tiktok: {
      id: "tiktok",
      title: "TikTok",
      icon: social.tiktok,
    },
    youtube: {
      id: "youtube",
      title: "YouTube",
      icon: social.youtube,
    },
    facebook: {
      id: "facebook",
      title: "Facebook",
      icon: social.facebook,
    },
    x: {
      id: "x",
      title: "X",
      icon: social.x,
    },
    linkedin: {
      id: "linkedin",
      title: "Linkedin",
      icon: social.linkedin,
    },
  }

  // Content data for each platform - you can add your content here later
  const platformContent: Record<SocialPlatform, ContentData> = {
    events: {
      title: "Etkinlikler",
      images: ["/img/avm-1.jpg", "/img/avm-2.jpg", "/img/video-bg.jpg"],
    },
    instagram: {
      title: "Instagram",
      images: ["/img/avm-1.jpg", "/img/avm-2.jpg", "/img/video-bg.jpg"],
    },
    tiktok: {
      title: "TikTok",
      images: ["/img/avm-1.jpg", "/img/avm-2.jpg", "/img/video-bg.jpg"],
    },
    youtube: {
      title: "YouTube",
      images: ["/img/avm-1.jpg", "/img/avm-2.jpg", "/img/video-bg.jpg"],
    },
    facebook: {
      title: "Facebook",
      images: ["/img/avm-1.jpg", "/img/avm-2.jpg", "/img/video-bg.jpg"],
    },
    x: {
      title: "X",
      images: ["/img/avm-1.jpg", "/img/avm-2.jpg", "/img/video-bg.jpg"],
    },
    linkedin: {
      title: "LinkedIn",
      images: ["/img/avm-1.jpg", "/img/avm-2.jpg", "/img/video-bg.jpg"],
    },
  }

  const currentContent = platformContent[selectedPlatform]

  const handlePlatformSelect = (platform: SocialPlatform) => {
    setSelectedPlatform(platform)
  }

  const handleScrollableSelectChange = (index: number) => {
    const platformKeys = Object.keys(items) as SocialPlatform[]
    setSelectedPlatform(platformKeys[index])
  }

  return (
    <div>
      <section className="flex flex-col lg:flex-row mb-8">
        <div className="hidden lg:flex flex-col items-start w-72 font-primary font-medium border-r-2 border-black text-bricky-brick text-xl p-8 space-y-6 xl:min-h-screen pt-24 mt-8">
          <div
            className={
              "flex items-center justify-start space-x-3 mb-16 cursor-pointer transition-opacity hover:opacity-70"
            }
            onClick={() => handlePlatformSelect("events")}
          >
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {items.events.icon}
            </IconWrapper>
            <span>{items.events.title}</span>
          </div>
          <div
            className={"flex items-center justify-start space-x-3 cursor-pointer transition-opacity hover:opacity-70"}
            onClick={() => handlePlatformSelect("instagram")}
          >
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {items.instagram.icon}
            </IconWrapper>
            <span>{items.instagram.title}</span>
          </div>
          <div
            className={"flex items-center justify-start space-x-3 cursor-pointer transition-opacity hover:opacity-70"}
            onClick={() => handlePlatformSelect("tiktok")}
          >
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {items.tiktok.icon}
            </IconWrapper>
            <span>{items.tiktok.title}</span>
          </div>
          <div
            className={"flex items-center justify-start space-x-3 cursor-pointer transition-opacity hover:opacity-70"}
            onClick={() => handlePlatformSelect("youtube")}
          >
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {items.youtube.icon}
            </IconWrapper>
            <span>{items.youtube.title}</span>
          </div>
          <div
            className={"flex items-center justify-start space-x-3 cursor-pointer transition-opacity hover:opacity-70"}
            onClick={() => handlePlatformSelect("facebook")}
          >
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {items.facebook.icon}
            </IconWrapper>
            <span>{items.facebook.title}</span>
          </div>
          <div
            className={"flex items-center justify-start space-x-3 cursor-pointer transition-opacity hover:opacity-70"}
            onClick={() => handlePlatformSelect("x")}
          >
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {items.x.icon}
            </IconWrapper>
            <span>{items.x.title}</span>
          </div>
          <div
            className={"flex items-center justify-start space-x-3 cursor-pointer transition-opacity hover:opacity-70"}
            onClick={() => handlePlatformSelect("linkedin")}
          >
            <IconWrapper className="w-14 h-14 flex-shrink-0 flex-grow-0 border-bricky-brick">
              {items.linkedin.icon}
            </IconWrapper>
            <span>{items.linkedin.title}</span>
          </div>
        </div>
        <div className="flex flex-col items-center flex-1 bg-white py-12 w-full">
          <div className="mb-4 h-10 lg:h-14">
            <IconCitysTimesLogo />
          </div>
          <p className="font-primary font-semibold text-bricky-brick text-3xl lg:text-4xl">Bizi Takip Edin...</p>
          <div className="lg:hidden my-8 w-full">
            <ScrollableSelect
              items={Object.values(items)}
              activeIndex={Object.keys(items).indexOf(selectedPlatform)}
              goToIndex={handleScrollableSelectChange}
            />
          </div>
          <div className="w-full mt-8 md:mt-12 px-4 sm:px-8 md:px-16 lg:px-8 xl:px-24">
            <h5 className="font-primary font-normal text-bricky-brick text-2xl sm:text-2xl md:text-3xl mb-4 md:mb-6">
              {currentContent.title}
            </h5>
            {currentContent.images && currentContent.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-6">
                {currentContent.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-full bg-bricky-brick relative pb-[100%] ${
                      index === currentContent.images!.length - 1 && currentContent.images!.length % 2 === 1
                        ? "sm:col-span-2 lg:col-span-1"
                        : ""
                    }`}
                  >
                    <Img
                      src={image}
                      alt={`${currentContent.title} ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover absolute inset-0"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {(!currentContent.images || currentContent.images.length === 0) && (
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                <p className="font-primary text-gray-500 text-lg">
                  {currentContent.title} içeriği yakında eklenecek...
                </p>
              </div>
            )}
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
    </div>
  )
}
