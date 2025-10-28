import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { fetchCitysMembersClubData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

export default async function Page({ params }: { params: { locale: string } }) {
  const citysMembersClubData = await fetchCitysMembersClubData(params.locale)
  const data = citysMembersClubData.data || []
  return (
    <>
      <PageTitle
        primaryColor={colors['blue-shimmer']}
        secondaryColor={colors.black}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>MEMBERS CLUB</span>
          </>
        }
        description='Sanat, spor ve sosyal ayrıcalıkların buluştuğu,özel bir yaşam alanı.'
        id={navigationConfig['/citys-members-club']?.id as string}
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
