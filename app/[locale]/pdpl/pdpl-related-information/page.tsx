import { LegalLayout } from '@/components/legal-layout'
import { Link } from '@/components/utility/link'
import { ScrollableBox } from '@/components/utility/scrollable-box'
import { cn } from '@/lib/utils'

import { useTranslations } from 'next-intl'
import Balancer from 'react-wrap-balancer'

export default function Page() {
  const t = useTranslations('legal.pdplRelatedInformation')

  const textContent = (
    <>
      <p>{t('intro')}</p>
      <p>{t('principles')}</p>
      <ul>
        {t.raw('principlesList').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>{t('purpose')}</p>

      <h2>{t('section1.title')}</h2>
      <p>
        <strong>{t('section1.tradeName')}</strong> {t('section1.tradeNameValue')}
      </p>
      <p>
        <strong>{t('section1.address')}</strong> {t('section1.addressValue')}
      </p>
      <p>
        <strong>{t('section1.mersis')}</strong> {t('section1.mersisValue')}
      </p>
      <p>{t('section1.content')}</p>

      <h2>{t('section2.title')}</h2>
      <p>{t('section2.intro')}</p>
      <ul>
        {t.raw('section2.collectionMethods').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>{t('section2.legalBasis')}</p>
      <ul>
        {t.raw('section2.legalBasisList').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>{t('section2_1.title')}</h3>
      <p>
        <strong>{t('section2_1.identity')}</strong> {t('section2_1.identityValue')}
      </p>
      <p>
        <strong>{t('section2_1.contact')}</strong> {t('section2_1.contactValue')}
      </p>
      <p>
        <strong>{t('section2_1.professional')}</strong> {t('section2_1.professionalValue')}
      </p>
      <p>
        <strong>{t('section2_1.customer')}</strong> {t('section2_1.customerValue')}
      </p>

      <h2>{t('section3.title')}</h2>
      <p>{t('section3.content')}</p>
      <p>{t('section3.sharing')}</p>
      <p>{t('section3.crossBorder')}</p>
      <p>{t('section3.noSharing')}</p>

      <h2>{t('section4.title')}</h2>
      <p>{t('section4.content')}</p>
      <ol>
        {t.raw('section4.rights').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
      <p>{t('section4.responseTime')}</p>
      <p>{t('section4.rejection')}</p>

      <h3>{t('section4.applicationMethod.title')}</h3>
      <p>{t('section4.applicationMethod.content')}</p>
      <ul>
        <li>
          {t('section4.applicationMethod.written')} {t('section4.applicationMethod.address')},
        </li>
        <li>
          {t('section4.applicationMethod.email')}{' '}
          <Link href='mailto:info@citysrecidences.com'>info@citysrecidences.com</Link>,
        </li>
        <li>
          {t('section4.applicationMethod.kep')}{' '}
          <Link href='mailto:citysgayrimenkul@hs02.kep.tr'>citysgayrimenkul@hs02.kep.tr</Link>
        </li>
      </ul>
      <p>{t('section4.applicationMethod.verification')}</p>
      <p>{t('section4.applicationMethod.requirements')}</p>
      <ul>
        {t.raw('section4.applicationMethod.requirementsList').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>{t('section5.title')}</h2>
      <p>{t('section5.content')}</p>
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
