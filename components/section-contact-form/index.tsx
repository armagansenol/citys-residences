import { cn } from '@/lib/utils'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { ContactForm } from '@/components/form-contact'
import { FormTranslations } from '@/types'
import { useTranslations } from 'next-intl'

export function SectionContactForm({
  formTranslations,
}: {
  formTranslations: FormTranslations
}) {
  const t = useTranslations()
  return (
    <section className='bg-gradient-appointment py-16 xl:py-40'>
      <FadeInOnScroll delay={0.25}>
        <div className='grid grid-cols-12 px-8 lg:col-start-4 lg:grid-cols-24 lg:px-16'>
          <div className='col-span-12 mb-12 lg:col-span-18 lg:col-start-6 lg:mb-16'>
            <h3
              className={cn(
                'mb-4 font-primary font-[400] text-white lg:mb-4',
                'text-4xl/tight lg:text-6xl/tight xl:text-6xl/tight 2xl:text-6xl/tight'
              )}
            >
              {t('contact.form.title')}
            </h3>
            <p
              className={cn(
                'max-w-[90%] font-primary font-[300] text-white',
                'text-base/snug lg:text-xl/snug xl:text-xl/snug 2xl:text-2xl/snug 3xl:text-2xl/snug',
                'lg:max-w-sm xl:max-w-md 2xl:max-w-lg 3xl:max-w-lg'
              )}
            >
              {t.rich('contact.description', {
                br: () => <br />,
              })}
            </p>
          </div>
          <div className='col-span-12 pb-12 lg:col-span-18 lg:col-start-6 xl:pb-0'>
            <ContactForm translations={formTranslations} />
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
