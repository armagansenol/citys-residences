'use client'

import { useState } from 'react'

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

interface FullScreenVideoDialogProps {
  dialogTrigger?: React.ReactNode
  mediaId: string
}

export function FullScreenVideoDialog({
  dialogTrigger,
  mediaId,
}: FullScreenVideoDialogProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

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
        <div className='relative flex aspect-[16/9] max-h-[100vh] w-screen flex-col xl:w-[80vw]'>
          {/* <WistiaPlayerWrapper className='h-full w-full' mediaId={mediaId} /> */}
          {/* <WistiaPlayer className='h-full w-full' mediaId={mediaId} /> */}
          <MuxPlayer
            className='h-full w-full object-cover'
            playbackId={mediaId}
            autoPlay
            playsInline
            streamType='on-demand'
            style={
              {
                aspectRatio: 16 / 9,
                '--media-object-fit': 'contain',
                '--pip-button': 'none',
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
