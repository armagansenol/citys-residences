'use client'

import { socialMedia } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  CheckIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ContactFormSuccessScreenProps {
  isVisible: boolean
  centered?: boolean
}

export function ContactFormSuccessScreen({
  isVisible,
  centered = false,
}: ContactFormSuccessScreenProps) {
  const t = useTranslations()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed inset-0 z-[var(--z-contact-form-success-screen)]',
            'grid grid-cols-24',
            'bg-gradient-appointment',
            'overflow-y-auto',
            'px-8 py-16 lg:px-16',
            !centered && 'lg:col-start-4 xl:py-40',
            centered && 'xl:py-20'
          )}
        >
          <div
            className={cn(
              'pb-12 xl:pb-0',
              'col-span-24',
              'flex items-center justify-center',
              centered &&
                'lg:col-start-1 xl:col-span-18 xl:col-start-4 2xl:col-start-4',
              !centered && 'lg:col-span-18 lg:col-start-6'
            )}
          >
            <div className='flex flex-col items-center xl:items-start'>
              <CheckIcon
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
              <div className='mx-auto flex gap-4 lg:gap-5 xl:ml-0 xl:mr-auto'>
                <Link
                  href={socialMedia.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='size-8'
                >
                  <FacebookLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </Link>
                <Link
                  href={socialMedia.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='size-8'
                >
                  <InstagramLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </Link>
                <Link
                  href={socialMedia.x}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='size-8'
                >
                  <XLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </Link>
                <Link
                  href={socialMedia.tiktok}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='size-8'
                >
                  <TiktokLogoIcon
                    weight='fill'
                    className='size-full cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
