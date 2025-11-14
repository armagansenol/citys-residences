import { SelectItem } from '@/components/ui/select'
import { routing } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import { LocaleSwitcherSelect } from './select'

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t('label')}
      className={className}
    >
      {routing.locales.map(cur => (
        <SelectItem key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  )
}
