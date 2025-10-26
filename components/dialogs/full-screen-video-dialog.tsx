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
import { WistiaPlayer } from '@wistia/wistia-player-react'

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
      <DialogContent className='z-[var(--z-modal)] flex flex-col items-center justify-center border border-red-500'>
        <VisuallyHidden>
          <DialogTitle>Video Player</DialogTitle>
          <DialogDescription>
            Full-screen video player for viewing media content
          </DialogDescription>
        </VisuallyHidden>
        <div className='relative flex aspect-[16/9] max-h-[90vh] w-[80vw] flex-col'>
          {/* <WistiaPlayerWrapper className='h-full w-full' mediaId={mediaId} /> */}
          <WistiaPlayer className='h-full w-full' mediaId={mediaId} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
