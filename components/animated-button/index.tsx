'use client'

import s from './animated-button.module.css'

import { cn } from '@/lib/utils'
import { colors } from '@/styles/config.mjs'
import { ArrowRight } from 'lucide-react'
import { MotionProps, motion } from 'motion/react'
import { useState } from 'react'
import { useMeasure } from 'react-use'

interface AnimatedButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'fit-content'
  text: string
  theme?: 'primary' | 'secondary' | 'tertiary' | 'transparent'
  fontFamily?: 'font-primary'
}

export function AnimatedButton({
  size = 'md',
  text = 'Button Text',
  theme = 'primary',
  fontFamily = 'font-primary',
}: AnimatedButtonProps) {
  const [isOn, setIsOn] = useState(false)
  const toggleSwitch = () => setIsOn(!isOn)
  const [buttonMeasureRef, { width: buttonWidth }] =
    useMeasure<HTMLSpanElement>()
  const [contentMeasureRef, { width: contentWidth }] =
    useMeasure<HTMLSpanElement>()

  const transition: MotionProps['transition'] = {
    type: 'tween',
    duration: 0.8,
    ease: [0.785, 0.135, 0.15, 0.86],
  }

  const themes = {
    primary: {
      textColor: colors.white,
      textHoverColor: colors['bricky-brick'],
      bgColorClassName: 'blur-bg-white',
      bgHoverColorClassName: 'blur-bg-bricky-brick',
      borderColorClassName: 'border border-bricky-brick',
      borderHoverColorClassName: ' borderborder-bricky-brick',
    },
    secondary: {
      textColor: colors['bricky-brick'],
      textHoverColor: colors.white,
      bgColorClassName: 'bg-white',
      bgHoverColorClassName: 'bg-bricky-brick',
      borderColorClassName: 'border border-bricky-brick',
      borderHoverColorClassName: 'border border-bricky-brick',
    },
    tertiary: {
      textColor: colors.white,
      textHoverColor: colors.white,
      bgColorClassName: 'bg-bricky-brick',
      bgHoverColorClassName: 'bg-tabasco',
      borderColorClassName: 'border-none',
      borderHoverColorClassName: 'border-none',
    },
    transparent: {
      textColor: colors.white,
      textHoverColor: colors.white,
      bgColorClassName: 'bg-transparent',
      bgHoverColorClassName: 'bg-transparent',
      borderColorClassName: 'border-none',
    },
  }

  return (
    <span
      className={cn(
        s.button,
        themes[theme].bgColorClassName,
        themes[theme].borderColorClassName,
        fontFamily,
        'relative flex cursor-pointer items-center overflow-hidden rounded-lg',
        {
          [s.sm]: size === 'sm',
          [s.md]: size === 'md',
          [s.lg]: size === 'lg',
          [s['fit-content']]: size === 'fit-content',
          'justify-center gap-6': size === 'fit-content',
          'w-full justify-between': size !== 'fit-content',
        }
      )}
      onMouseEnter={toggleSwitch}
      onMouseLeave={toggleSwitch}
      ref={buttonMeasureRef}
    >
      <span className={cn('flex items-center')}>
        {/* text */}
        <motion.span
          className={cn('relative z-20 flex items-center')}
          initial={{
            color: themes[theme].textColor,
          }}
          animate={{
            color: isOn
              ? themes[theme].textHoverColor
              : themes[theme].textColor,
            x: isOn ? (buttonWidth - contentWidth) / 2 : 0,
          }}
          transition={transition}
          ref={contentMeasureRef}
        >
          {/* icon left */}
          <span
            className={cn(
              s['icon-c'],
              'absolute left-0 top-1/2 z-20 -translate-x-3/4 -translate-y-1/2'
            )}
          >
            <motion.span
              className='block'
              initial={{
                color: themes[theme].textHoverColor,
                x: `-${buttonWidth}px`,
              }}
              animate={{
                x: isOn ? 0 : `-${buttonWidth}px`,
              }}
              transition={{
                ...transition,
                duration: 0.6,
              }}
            >
              <ArrowRight className={cn(s.icon)} />
            </motion.span>
          </span>
          <span className={cn(s['text-c'], 'whitespace-nowrap font-normal')}>
            {text}
          </span>
        </motion.span>
      </span>
      {/* icon right */}
      <motion.span className={cn(s['icon-c'])}>
        <motion.span
          className='block'
          initial={{
            color: themes[theme].textColor,
          }}
          animate={{
            x: isOn ? '200%' : 0,
          }}
          transition={transition}
        >
          <ArrowRight className={cn(s.icon)} />
        </motion.span>
      </motion.span>
      {/* background */}
      <motion.span
        className={cn(
          s['bg'],
          themes[theme].bgHoverColorClassName,
          'absolute z-10 block h-full w-[150%] translate-y-full'
        )}
        initial={{
          y: '105%',
        }}
        animate={{
          y: isOn ? 0 : '105%',
        }}
        transition={transition}
      ></motion.span>
    </span>
  )
}
