import { LegalLayout } from '@/components/legal-layout'
import { Link } from '@/components/utility/link'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('legal.pdplRelatedInformation')

  return (
    <LegalLayout>
      <h1>{t('title')}</h1>
      <h2>{t('section1.title')}</h2>
      <p>{t('section1.content')}</p>
      <h2>{t('section2.title')}</h2>
      <p>{t('section2.content')}</p>
      <h3>{t('section2_1.title')}</h3>
      <ul>
        <li>
          <strong>{t('section2_1.items.identity')}</strong>
        </li>
        <li>
          <strong>{t('section2_1.items.contact')}</strong>
        </li>
        <li>
          <strong>{t('section2_1.items.professional')}</strong>
        </li>
        <li>
          <strong>{t('section2_1.items.customer')}</strong>
        </li>
      </ul>
      <h3>{t('section2_2.title')}</h3>
      <p>{t('section2_2.content')}</p>
      <ul>
        {t.raw('section2_2.items').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>{t('section2_3.title')}</h3>
      <p>{t('section2_3.content')}</p>
      <h3>{t('section2_4.title')}</h3>
      <p>{t('section2_4.content')}</p>
      <h3>{t('section2_5.title')}</h3>
      <p>{t('section2_5.content')}</p>
      <h2>{t('section3.title')}</h2>
      <p>{t('section3.content')}</p>
      <h2>{t('section4.title')}</h2>
      <p>{t('section4.content')}</p>
      <ul>
        {t.raw('section4.items').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>
        {t('section4.application')}
        <Link href='https://www.citysresidences.com'>
          {t('section4.website')}
        </Link>
        ,{' '}
        <Link href='mailto:info@citysresidences.com'>
          {t('section4.email1')}
        </Link>
        ,{' '}
        <Link href='mailto:citysgayrimenkul@hs02.Kep.tr'>
          {t('section4.email2')}
        </Link>{' '}
        {t('section4.address')}
      </p>
      <p>{t('section4.note')}</p>
    </LegalLayout>
  )
}
