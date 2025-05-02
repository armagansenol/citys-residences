"use client"

import { useLenis } from "lenis/react"
import { X } from "lucide-react"
import { useEffect } from "react"

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog"
import { useImageGalleryStore } from "@/lib/store/image-gallery"
import { ImageGallery } from "./index"

export function ImageGalleryModal() {
  const { isOpen, slides, currentSlide, closeModal } = useImageGalleryStore()
  const lenis = useLenis()

  useEffect(() => {
    return isOpen ? lenis?.stop() : lenis?.start()
  }, [isOpen, lenis])

  return (
    <Dialog defaultOpen={isOpen} open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="w-screen h-screen min-h-screen min-w-screen min-w-none max-w-none p-0 box-shadow-none bg-transparent border-none flex items-center justify-center z-[var(--z-modal)]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50">
          <X className="text-white w-6 h-6" />
        </DialogClose>
        <ImageGallery slides={slides} currentSlide={currentSlide} />
      </DialogContent>
    </Dialog>
  )
}
