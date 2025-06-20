"use client"

import { cn } from "@/lib/utils"

import { Img } from "@/components/utility/img"
import { useImageGalleryStore } from "@/lib/store/image-gallery"

export interface ImagesSectionProps {
  images: {
    url: string
    fullWidth?: boolean
  }[]
}

export function ImagesSection({ images }: ImagesSectionProps) {
  const { openModal } = useImageGalleryStore()

  const handleImageClick = (itemImages: { url: string }[], index: number) => {
    const slides = itemImages.map((image) => (
      <div key={image.url} className="h-[80vh] w-[100vw] relative">
        <Img src={image.url} fill sizes="100vw" alt="Residence Interior" className="object-contain" />
      </div>
    ))
    openModal(slides, index)
  }

  return (
    <div className="container">
      <div className="relative grid grid-cols-12 gap-2 bt:gap-5">
        {images.map((image, i) => (
          <div
            key={image.url}
            className={cn(
              "relative h-full min-h-[50vw] bt:min-h-[45vw] bd:h-[40vw]",
              image.fullWidth ? "col-span-12" : "col-span-12 bd:col-span-6"
            )}
            onClick={() => handleImageClick(images, i)}
          >
            <Img src={image.url} fill sizes="98vw" alt="City's Park" className="object-cover" loading="lazy" />
            <div className="absolute left-0 bottom-0 right-0 h-12 bg-white flex items-center justify-center text-[#a0a0a0] font-suisse-intl text-sm font-normal italic">
              Park Alanı
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
