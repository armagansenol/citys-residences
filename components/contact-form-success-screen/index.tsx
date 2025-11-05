'use client'

import { cn } from '@/lib/utils'
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  SealCheckIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'

interface ContactFormSuccessScreenProps {
  isVisible: boolean
  centered?: boolean
}

export function ContactFormSuccessScreen({
  isVisible,
  centered = false,
}: ContactFormSuccessScreenProps) {
  const t = useTranslations()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'grid grid-cols-24',
            'absolute inset-0 z-50',
            'bg-gradient-appointment',
            'px-8 py-16 lg:px-16',
            !centered && 'lg:col-start-4 xl:py-40',
            centered && 'xl:py-20'
          )}
        >
          <div
            className={cn(
              'pb-12 xl:relative xl:pb-0',
              'col-span-24',
              centered &&
                'lg:col-start-1 xl:col-span-18 xl:col-start-4 2xl:col-start-4',
              !centered && 'lg:col-span-18 lg:col-start-6'
            )}
          >
            <div className='sticky top-36 flex flex-col items-center xl:relative xl:top-auto xl:translate-y-0 xl:items-start'>
              <SealCheckIcon
                weight='light'
                className='mb-6 size-20 text-white lg:mb-4 xl:size-24 2xl:size-32'
              />
              {/* Main Heading */}
              <h2 className='mb-6 text-center font-primary text-4xl font-[400] leading-tight text-white lg:mb-6 lg:text-5xl xl:text-left xl:text-6xl'>
                {t('contact.form.messages.thankYou.title')}
              </h2>
              {/* Confirmation Messages */}
              <div className='mb-8 flex flex-col gap-2 text-center lg:mb-10 xl:text-left'>
                <p className='font-primary text-base/snug font-[300] text-white lg:text-lg/snug xl:text-xl/snug 2xl:text-2xl/snug'>
                  {t('contact.form.messages.thankYou.message1')}
                  <br />
                  {t('contact.form.messages.thankYou.message2')}
                </p>
              </div>
              {/* Separator Line */}
              <div className='mb-6 w-36 border-t border-white lg:mb-8 lg:w-48 xl:w-64' />
              {/* Social Media Prompt */}
              <p className='mb-6 text-center font-primary text-sm font-[400] text-white lg:mb-8 lg:text-base xl:text-left xl:text-base 2xl:mb-6'>
                {t('contact.form.messages.thankYou.followUs')}
              </p>
              {/* Social Media Icons */}
              <div className='mx-auto flex gap-2 lg:gap-5 xl:ml-0 xl:mr-auto'>
                <div className='size-12 rounded-md border border-tangerine-flake p-3 lg:size-16'>
                  <FacebookLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </div>
                <div className='size-12 rounded-md border border-tangerine-flake p-3 lg:size-16'>
                  <InstagramLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </div>
                <div className='size-12 rounded-md border border-tangerine-flake p-3 lg:size-16'>
                  <XLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </div>
                <div className='size-12 rounded-md border border-tangerine-flake p-3 lg:size-16'>
                  <YoutubeLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
