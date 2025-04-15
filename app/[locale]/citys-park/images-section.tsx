"use client"

import { cn } from "@/lib/utils"

import { Img } from "@/components/utility/img"
import { useImageGalleryStore } from "@/lib/store/image-gallery"

export interface ImagesSectionProps {
  images: {
    url: string
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
    <section className="relative bg-white z-20">
      <div className="container py-16 bd:py-32">
        <div className="relative grid grid-cols-12 gap-2 bt:gap-5">
          {images.map((image, i) => (
            <div
              key={image.url}
              className={cn(
                "relative h-full min-h-[50vw] bt:min-h-[45vw] bd:min-h-[50vw]",
                i % 3 === 0 ? "col-span-12" : "col-span-12 bd:col-span-6"
              )}
              onClick={() => handleImageClick(images, i)}
            >
              <Img src={image.url} fill sizes="100vw" alt="City's Park" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
