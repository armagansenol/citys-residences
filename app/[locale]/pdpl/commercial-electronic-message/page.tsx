import { LegalLayout } from '@/components/legal-layout'
import { Link } from '@/components/utility/link'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('legal.commercialElectronicMessage')

  return (
    <LegalLayout>
      <h1>{t('title')}</h1>
      <p>{t('paragraph1')}</p>
      <p>{t('paragraph2')}</p>
      <p>{t('paragraph3')}</p>
      <p>{t('paragraph4')}</p>
      <p>
        {t('paragraph5')}
        <Link
          target='_blank'
          rel='noopener noreferrer'
          href='/pdpl/pdpl-related-information'
        >
          {t('linkText')}
        </Link>
        {t('paragraph5Suffix')}
      </p>
    </LegalLayout>
  )
}
