'use client'

import { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Image } from '@/components/image'

interface ZoomImageDialogProps {
  dialogTrigger?: React.ReactNode
  image: string
}

export function ZoomImageDialog({
  dialogTrigger,
  image,
}: ZoomImageDialogProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
      <DialogContent className='z-[var(--z-modal)] flex flex-col items-center justify-center border border-red-500'>
        <div className='relative aspect-[16/9] max-h-[100vh] w-screen lg:w-[80vw]'>
          <Image
            src={image}
            alt='Zoom Image'
            mobileSize='90vw'
            desktopSize='90vw'
            fill
            className='h-full w-full object-contain'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
