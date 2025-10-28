import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { fetchCitysLivingData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

export default async function Page({ params }: { params: { locale: string } }) {
  const citysLivingData = await fetchCitysLivingData(params.locale)
  const data = citysLivingData.data || []
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
      {data.map(item => (
        <RepetitiveSectionsWrapper
          key={item.id}
          componentType={item.componentType}
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          mediaId={item.mediaId}
          thumbnail={item.thumbnail}
        />
      ))}
    </>
  )
}
