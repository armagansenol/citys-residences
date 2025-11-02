'use client'

import { AspectCover } from '@/components/aspect-cover'
import { Image } from '@/components/image'
import { WistiaPlayerWrapper } from '@/components/wistia-player-wrapper'
import { useNavigation } from '@/hooks/useNavigation'
import { Locale } from '@/i18n/routing'
import {
  getMenuTextKey,
  getNavigationItems,
  menuMedia,
  projectBanner,
} from '@/lib/constants'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export function MenuNavList() {
  const { handleNavClick } = useNavigation()
  const t = useTranslations('common')
  const tMenu = useTranslations('menu')
  const locale = useLocale()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className='flex justify-between gap-24'>
      <nav className='flex h-full items-end justify-center lg:justify-start'>
        <div
          className={cn(
            'flex w-full flex-col items-stretch gap-2 lg:gap-12 xl:gap-6 2xl:gap-8 3xl:gap-10'
          )}
        >
          <ul className='flex flex-col gap-2 lg:gap-6 xl:gap-3 2xl:gap-4'>
            {getNavigationItems(t, locale as Locale)
              .filter(item => item.mainRoute)
              .map(item => {
                const isHovered = hoveredItem === item.id
                const opacityClass =
                  hoveredItem && !isHovered
                    ? 'opacity-50'
                    : 'opacity-100' +
                      (item.mainRoute === false && 'text-bricky-brick')

                return (
                  <li
                    className='text-3xl sm:text-2xl lg:text-5xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl'
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => handleNavClick(item.id as string)}
                      className={cn(
                        'cursor-pointer text-left font-primary font-[300] text-white transition-all duration-300',
                        opacityClass
                      )}
                      type='button'
                    >
                      {item.title}
                    </button>
                  </li>
                )
              })}
          </ul>
          <ul className='flex flex-col gap-4 lg:gap-6 xl:gap-3 2xl:gap-4'>
            {getNavigationItems(t, locale as Locale)
              .filter(item => !item.mainRoute)
              .map(item => {
                const isHovered = hoveredItem === item.id
                const opacityClass =
                  hoveredItem && !isHovered ? 'opacity-50' : 'opacity-100'

                return (
                  <li
                    className='text-base sm:text-2xl lg:text-2xl xl:text-lg 2xl:text-xl 3xl:text-2xl'
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => handleNavClick(item.id as string)}
                      className={cn(
                        'cursor-pointer text-left font-primary font-[300] text-white transition-all duration-300',
                        opacityClass
                      )}
                      type='button'
                    >
                      {item.title}
                    </button>
                  </li>
                )
              })}
          </ul>
        </div>
      </nav>
      <div className='relative hidden w-[50%] flex-col items-stretch gap-6 xl:flex'>
        <div className='relative aspect-[16/9] h-64 overflow-hidden'>
          <AnimatePresence mode='wait'>
            {hoveredItem &&
              menuMedia[hoveredItem as keyof typeof menuMedia] && (
                <motion.div
                  key={hoveredItem}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='absolute inset-0'
                >
                  {menuMedia[hoveredItem as keyof typeof menuMedia]?.type ===
                    'image' && (
                    <Image
                      src={
                        menuMedia[hoveredItem as keyof typeof menuMedia]?.src
                      }
                      alt='Menu Image'
                      fill
                      className='h-full w-full object-cover'
                    />
                  )}

                  {menuMedia[hoveredItem as keyof typeof menuMedia]?.type ===
                    'video' && (
                    <AspectCover ratio={projectBanner.aspect()}>
                      <WistiaPlayerWrapper
                        mediaId={
                          menuMedia[hoveredItem as keyof typeof menuMedia]?.src
                        }
                        aspect={projectBanner.aspect()}
                        autoplay
                        muted
                        preload='metadata'
                        swatch={false}
                        bigPlayButton={false}
                        silentAutoplay='allow'
                        endVideoBehavior='loop'
                        controlsVisibleOnLoad={false}
                        playBarControl={false}
                        volumeControl={false}
                        settingsControl={false}
                        transparentLetterbox={true}
                        roundedPlayer={0}
                        fullscreenControl={false}
                        playbackRateControl={false}
                        playPauseControl={false}
                      />
                    </AspectCover>
                  )}
                </motion.div>
              )}
          </AnimatePresence>
        </div>
        <div>
          <AnimatePresence mode='wait'>
            {hoveredItem &&
              menuMedia[hoveredItem as keyof typeof menuMedia] && (
                <motion.article
                  key={hoveredItem}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className='text-left font-primary text-base font-[300] text-white'>
                    {tMenu.rich(getMenuTextKey(hoveredItem), {
                      br: () => <br />,
                    })}
                  </p>
                </motion.article>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
