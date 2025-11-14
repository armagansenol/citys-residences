'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { GsapSplitText } from '@/components/gsap-split-text'

const OptimizedVideo = dynamic(
  () => import('@/components/optimized-video').then(mod => mod.OptimizedVideo),
  { ssr: false }
)

export interface FullWidthVideoTextProps {
  title: string
  subtitle: string
  description: string
  mediaId: string
  thumbnail?: string
  videoAspectRatio?: number
}

export function FullWidthVideoText(props: FullWidthVideoTextProps) {
  const { title, subtitle, description, mediaId, thumbnail, videoAspectRatio } =
    props
  const [sanitizedDescription, setSanitizedDescription] = useState(description)
  const [sanitizedSubtitle, setSanitizedSubtitle] = useState(subtitle)
  const [sanitizedTitle, setSanitizedTitle] = useState(title)

  useEffect(() => {
    // Dynamically import DOMPurify only on client side
    import('isomorphic-dompurify').then(module => {
      const DOMPurify = module.default
      setSanitizedDescription(DOMPurify.sanitize(description))
      setSanitizedSubtitle(DOMPurify.sanitize(subtitle))
      setSanitizedTitle(DOMPurify.sanitize(title))
    })
  }, [description, subtitle, title])

  return (
    <section
      className='relative min-h-screen overflow-hidden'
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      {/* <div className='absolute left-0 top-0'>FullWidthVideoText</div> */}
      <div className='relative z-30 grid grid-cols-24 gap-y-16 md:gap-y-12'>
        <div className='col-span-24 flex px-8 pt-20 lg:col-span-7 lg:col-start-6 lg:px-0 lg:pb-16 lg:pt-24 xl:col-span-10 xl:col-start-5 xl:pb-24 xl:pt-44'>
          <div className='flex flex-col gap-4 xl:mr-auto'>
            <h3
              className={cn(
                'font-primary font-[400]',
                'text-3xl/[1.1] xl:text-6xl/[1.1] 2xl:text-6xl/[1.1]'
              )}
            >
              <GsapSplitText
                type='chars'
                stagger={0.01}
                duration={1.5}
                html={sanitizedTitle}
              />
            </h3>
            <h4
              className={cn(
                'font-primary font-[200]',
                'text-xl/snug xl:text-4xl/snug 2xl:text-4xl/snug',
                'md:max-w-[50vw]'
              )}
            >
              <GsapSplitText
                type='lines'
                stagger={0.01}
                duration={1.5}
                html={sanitizedSubtitle}
              />
            </h4>
          </div>
        </div>
        <div className='col-span-24 px-8 pb-20 lg:col-span-10 lg:px-0 lg:pb-16 lg:pl-24 lg:pt-24 xl:col-span-8 xl:px-16 xl:pb-24 xl:pt-44'>
          <FadeInOnScroll delay={0.25}>
            <article
              className={cn(
                'text-left font-primary font-[300]',
                'text-base/[1.25] xl:text-[17px]/[1.25]',
                'max-w-[90%] md:max-w-[55vw] xl:max-w-none',
                'prose-2xl prose-p:m-0 prose-ul:list-disc'
              )}
              style={{ color: 'var(--text-color)' }}
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></article>
          </FadeInOnScroll>
        </div>
      </div>
      <div className='col-span-24 aspect-[16/19] overflow-hidden xl:aspect-[16/7]'>
        <OptimizedVideo
          playbackId={mediaId}
          scrollDelay={1500}
          placeholder={thumbnail}
          aspectRatio={videoAspectRatio}
        />
      </div>
    </section>
  )
}
