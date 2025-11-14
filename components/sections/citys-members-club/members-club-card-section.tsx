'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'

export function MembersClubCardSection() {
  const t = useTranslations('citys-members-club')

  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        'h-screen w-full lg:aspect-[16/7] lg:h-auto'
      )}
    >
      <Image
        src='/img/members-club-card-mobile.jpg'
        alt='Members Club Card'
        fill
        className='absolute inset-0 z-0 block object-cover object-center lg:hidden'
        loading='lazy'
        desktopSize='100vw'
        mobileSize='100vw'
      />
      <Image
        src='/img/members-club-card.jpg'
        alt='Members Club Card'
        fill
        className='absolute inset-0 z-0 hidden object-cover object-center lg:block'
        loading='lazy'
        desktopSize='100vw'
        mobileSize='100vw'
      />
      <div className='z-40 mb-40 flex flex-shrink-0 flex-col items-center justify-center gap-2'>
        <h2
          className={cn(
            'text-center font-primary font-[400] text-white',
            'text-4xl/tight lg:text-4xl/tight xl:text-6xl/tight 2xl:text-6xl/tight'
          )}
        >
          <GsapSplitText type='chars' stagger={0.02} duration={1}>
            {t('card.title')}
          </GsapSplitText>
        </h2>
        <p
          className={cn(
            'text-center font-primary font-[200] text-white',
            'text-xl/tight lg:text-2xl/tight xl:text-2xl/tight 2xl:text-3xl/tight',
            'w-[90vw] md:w-[60vw] lg:w-[60vw] xl:w-[40vw] 2xl:w-[40vw] 3xl:w-[40vw]'
          )}
        >
          <GsapSplitText type='chars' stagger={0.02} duration={1}>
            {t('card.subtitle')}
          </GsapSplitText>
        </p>
      </div>
    </section>
  )
}
