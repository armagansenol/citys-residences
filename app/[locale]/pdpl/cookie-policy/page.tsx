import { LegalLayout } from '@/components/legal-layout'
import { Link } from '@/components/utility/link'
import { ScrollableBox } from '@/components/utility/scrollable-box'
import { cn } from '@/lib/utils'

import { useTranslations } from 'next-intl'
import Balancer from 'react-wrap-balancer'

export default function Page() {
  const t = useTranslations('legal.cookiePolicy')

  const textContent = (
    <>
      <p>{t('paragraph1')}</p>
      <p>{t('paragraph2')}</p>
      <p>{t('paragraph3')}</p>
      <h2>{t('section1.title')}</h2>
      <p>{t('section1.content1')}</p>
      <p>{t('section1.content2')}</p>
      <ul>
        {t.raw('section1.items').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>{t('section1.content3')}</p>
      <h2>{t('section2.title')}</h2>
      <h3>{t('section2.section2_1.title')}</h3>
      <ul>
        <li>
          <strong>{t('section2.section2_1.session.title')}</strong>{' '}
          {t('section2.section2_1.session.content')}
        </li>
        <li>
          <strong>{t('section2.section2_1.persistent.title')}</strong>{' '}
          {t('section2.section2_1.persistent.content')}
        </li>
      </ul>
      <h3>{t('section2.section2_2.title')}</h3>
      <ul>
        <li>
          <strong>{t('section2.section2_2.firstParty.title')}</strong>{' '}
          {t('section2.section2_2.firstParty.content')}
        </li>
        <li>
          <strong>{t('section2.section2_2.thirdParty.title')}</strong>{' '}
          {t('section2.section2_2.thirdParty.content')}
        </li>
      </ul>
      <h3>{t('section2.section2_3.title')}</h3>
      <ul>
        <li>
          <strong>{t('section2.section2_3.mandatory.title')}</strong>{' '}
          {t('section2.section2_3.mandatory.content')}
        </li>
        <li>
          <strong>{t('section2.section2_3.functionality.title')}</strong>{' '}
          {t('section2.section2_3.functionality.content')}
        </li>
        <li>
          <strong>{t('section2.section2_3.performance.title')}</strong>{' '}
          {t('section2.section2_3.performance.content')}
        </li>
        <li>
          <strong>{t('section2.section2_3.marketing.title')}</strong>{' '}
          {t('section2.section2_3.marketing.content')}
        </li>
      </ul>
      <h2>{t('section3.title')}</h2>
      <p>{t('section3.content')}</p>
      <p>{t('section3.affectedFeatures')}</p>
      <ul>
        {t.raw('section3.items').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>{t('section4.title')}</h2>
      <p>{t('section4.content')}</p>
      <ul>
        <li>
          {t('section4.browsers.chrome')}
          <Link href='http://www.google.com/support/chrome/bin/answer.py?hl=en&amp;answer=95647'>
            http://www.google.com/support/chrome/bin/answer.py?hl=en&amp;answer=95647
          </Link>
        </li>
        <li>
          {t('section4.browsers.ie')}
          <Link href='https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies'>
            https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies
          </Link>
        </li>
        <li>
          {t('section4.browsers.firefox')}
          <Link href='http://support.mozilla.com/en-US/kb/Cookies'>
            http://support.mozilla.com/en-US/kb/Cookies
          </Link>
        </li>
        <li>
          {t('section4.browsers.opera')}
          <Link href='http://www.google.com/support/chrome/bin/answer.py?hl=en&amp;answer=95647'>
            http://www.google.com/support/chrome/bin/answer.py?hl=en&amp;answer=95647
          </Link>
        </li>
        <li>
          {t('section4.browsers.safari')}
          <Link href='http://www.google.com/support/chrome/bin/answer.py?hl=en&amp;answer=95647'>
            http://www.google.com/support/chrome/bin/answer.py?hl=en&amp;answer=95647
          </Link>
        </li>
      </ul>
      <h2>{t('section5.title')}</h2>
      <div className='max-w-full overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              <th className='bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                {t('section5.table.cookie')}
              </th>
              <th className='bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                {t('section5.table.type')}
              </th>
              <th className='bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                {t('section5.table.domain')}
              </th>
              <th className='bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                {t('section5.table.details')}
              </th>
              <th className='bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                {t('section5.table.duration')}
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            <tr>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
                {t('section5.table.ga.name')}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
                {t('section5.table.ga.type')}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
                {t('section5.table.ga.domain')}
              </td>
              <td className='px-6 py-4 text-sm text-gray-900'>
                {t('section5.table.ga.details')}
                <Link href='https://policies.google.com/privacy?hl=tr'>
                  https://policies.google.com/privacy?hl=tr
                </Link>
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
                {t('section5.table.ga.duration')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
