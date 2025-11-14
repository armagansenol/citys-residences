import { LegalLayout } from '@/components/legal-layout'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('legal.explicitConsent')

  return (
    <LegalLayout>
      <h1>{t('title')}</h1>
      <p>{t('paragraph1')}</p>
      <p>{t('paragraph2')}</p>
    </LegalLayout>
  )
}
