import { LegalLayout } from '@/components/legal-layout'
import { ScrollableBox } from '@/components/utility/scrollable-box'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Balancer from 'react-wrap-balancer'

export default function Page() {
  const t = useTranslations('legal.commercialElectronicMessageConsent')

  const textContent = (
    <>
      <p>{t('paragraph1')}</p>
      <p>{t('paragraph2')}</p>
      <p>{t('paragraph3')}</p>
    </>
  )

  return (
    <LegalLayout>
      <Balancer
        as='h1'
        className={cn(
          'relative my-0 py-0',
          'after:hidden xl:after:block',
          'after:absolute after:left-0 after:right-0 after:top-full after:z-50 after:h-[80px] after:w-full after:bg-gradient-to-b after:from-white after:to-transparent'
        )}
      >
        {t('title')}
      </Balancer>
      <div className='hidden xl:flex xl:min-h-0 xl:flex-1 xl:overflow-hidden'>
        <ScrollableBox className='relative overflow-hidden xl:flex xl:flex-grow'>
          <div className='relative pb-24 pt-12'>{textContent}</div>
        </ScrollableBox>
      </div>
      <div className='relative block pb-24 pt-4 xl:hidden'>{textContent}</div>
    </LegalLayout>
  )
}
