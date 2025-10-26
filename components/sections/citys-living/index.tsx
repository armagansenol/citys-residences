import { PageTitle } from '@/components/page-title'
import { CitysLivingData } from '@/lib/api/queries'
import { colors } from '@/styles/config.mjs'
import { LazyCitysLiving } from './lazy-citys-living'
import { navigationConfig } from '@/lib/constants'

export function CitysLiving({
  data,
}: {
  data: CitysLivingData[]
}): React.ReactNode {
  return (
    <>
      <PageTitle
        primaryColor={colors['verve-violet']}
        secondaryColor={colors.white}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>LIVING</span>
          </>
        }
        description='Artık her şey daha kolay.'
        id={navigationConfig['/citys-living']?.id as string}
      />
      <LazyCitysLiving data={data} />
    </>
  )
}
