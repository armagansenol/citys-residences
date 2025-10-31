'use client'

import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ArrowsOutSimpleIcon } from '@phosphor-icons/react'
import { useLenis } from 'lenis/react'

interface ZoomImageDialogProps {
  dialogTrigger?: React.ReactNode
  dialogContent?: React.ReactNode
}

export function ZoomImageDialog({
  dialogTrigger,
  dialogContent,
}: ZoomImageDialogProps) {
  const lenis = useLenis()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [lenis, open])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {dialogTrigger && (
        <DialogTrigger className='group relative h-full w-full cursor-pointer'>
          {dialogTrigger}

          <span className='blur-bg-white absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-bricky-brick p-3 text-white transition-transform duration-300 ease-in-out group-hover:scale-110 xl:size-16'>
            <ArrowsOutSimpleIcon className='size-full' weight='thin' />
          </span>
        </DialogTrigger>
      )}
      <DialogContent className='grid items-center justify-center'>
        <div className='relative max-h-[90vh] w-full xl:w-[75vw] 2xl:w-[70vw]'>
          {dialogContent}
        </div>
      </DialogContent>
    </Dialog>
  )
}
