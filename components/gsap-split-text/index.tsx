'use client'

import { ScrollTrigger, SplitText, gsap, useGSAP } from '@/components/gsap'
import { useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

export interface GsapSplitTextProps extends SplitText.Vars {
  children?: React.ReactNode
  html?: string
}

export function GsapSplitText(props: GsapSplitTextProps) {
  const {
    children,
    html,
    stagger = 0.1,
    duration = 0.6,
    ease = 'expo.out',
    type = 'lines',
    ...rest
  } = props
  const animationRef = useRef<GSAPTween>()
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return

      // Set initial opacity
      gsap.set(ref.current, { opacity: 1 })

      const splitType = type === 'words,lines' ? 'lines' : type
      let splitInstance: SplitText | null = null

      SplitText.create(ref.current, {
        type,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        autoSplit: true,
        mask: splitType as 'lines' | 'words' | 'chars',
        ...rest,
        onSplit: self => {
          splitInstance = self

          const elements = {
            lines: self.lines,
            words: self.words,
            chars: self.chars,
          }

          const targetElements = elements[splitType as keyof typeof elements]

          if (!targetElements || targetElements.length === 0) return

          const anim = gsap.from(targetElements, {
            duration,
            yPercent: 100,
            opacity: 0,
            stagger,
            ease,
            paused: true,
          })

          animationRef.current = anim

          const trigger = ScrollTrigger.create({
            trigger: ref.current,
            onEnter: () => {
              anim.play()
            },
          })

          return () => {
            trigger.kill()
          }
        },
      })

      return () => {
        if (animationRef.current) {
          animationRef.current.kill()
        }
        if (splitInstance) {
          splitInstance.revert()
        }
      }
    },
    {
      dependencies: [type, stagger, duration, ease, html, children, rest],
      revertOnUpdate: true,
    }
  )

  if (html) {
    return (
      <span
        className='split'
        ref={ref}
        style={{ opacity: 0 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span className='split' ref={ref} style={{ opacity: 0 }}>
      {children}
    </span>
  )
}
