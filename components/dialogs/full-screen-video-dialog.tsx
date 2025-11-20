'use client'

import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import MuxPlayer from '@mux/mux-player-react/lazy'
import { colors } from '@/styles/config.mjs'
import { useLenis } from 'lenis/react'
import { cn } from '@/lib/utils'

interface FullScreenVideoDialogProps {
  dialogTrigger?: React.ReactNode
  mediaId: string
  aspectRatio?: number // Optional aspect ratio (width/height). If not provided, video will maintain natural aspect ratio
  onOpenChange?: (open: boolean) => void
}

export function FullScreenVideoDialog({
  dialogTrigger,
  mediaId,
  aspectRatio,
  onOpenChange,
}: FullScreenVideoDialogProps) {
  const lenis = useLenis()
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  useEffect(() => {
    if (open) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [open, lenis])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
      <DialogContent className='z-[var(--z-modal)] flex flex-col items-center justify-center'>
        <VisuallyHidden>
          <DialogTitle>Video Player</DialogTitle>
          <DialogDescription>
            Full-screen video player for viewing media content
          </DialogDescription>
        </VisuallyHidden>
        <div
          className={cn(
            'relative',
            'flex flex-col items-center justify-center',
            'max-h-[95vh] max-w-[100vw] xl:max-w-[90vw]',
            'h-full w-[100vw]'
          )}
          style={
            {
              aspectRatio: aspectRatio,
            } as React.CSSProperties
          }
        >
          <MuxPlayer
            className='h-full w-full'
            playbackId={mediaId}
            autoPlay
            playsInline
            streamType='on-demand'
            style={
              {
                aspectRatio: aspectRatio,
                '--media-object-fit': 'contain',
                '--pip-button': 'none',
                width: '100%',
                height: '100%',
              } as React.CSSProperties
            }
            thumbnailTime={3}
            loading='viewport'
            accentColor={colors['tangerine-flake']}
            primaryColor={colors['white']}
            secondaryColor={colors['transparent']}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
