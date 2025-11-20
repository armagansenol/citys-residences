'use client'

import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ArrowsOutSimpleIcon } from '@phosphor-icons/react'
import { useLenis } from 'lenis/react'
import { cn } from '@/lib/utils'

interface ZoomImageDialogProps {
  dialogTrigger?: React.ReactNode
  dialogContent?: React.ReactNode
  aspectRatio?: number // Optional aspect ratio (width/height). If not provided, content will maintain natural aspect ratio
}

export function ZoomImageDialog({
  dialogTrigger,
  dialogContent,
  aspectRatio,
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

          <span className='blur-bg-white absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-bricky-brick p-3 text-white transition-transform duration-300 ease-in-out group-hover:scale-110 xl:size-16'>
            <ArrowsOutSimpleIcon className='size-full' weight='thin' />
          </span>
        </DialogTrigger>
      )}
      <DialogContent className='z-[var(--z-modal)] flex flex-col items-center justify-center'>
        <div
          className={cn(
            'relative',
            'flex flex-col items-center justify-center',
            'max-h-[95vh] max-w-[100vw] xl:max-w-[90vw]',
            'h-full w-screen xl:h-[95vh] xl:w-full'
          )}
          style={
            {
              aspectRatio: aspectRatio,
            } as React.CSSProperties
          }
        >
          {dialogContent}
        </div>
      </DialogContent>
    </Dialog>
  )
}
