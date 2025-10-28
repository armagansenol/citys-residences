import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { fetchCitysParkData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

export default async function Page({ params }: { params: { locale: string } }) {
  const citysParkData = await fetchCitysParkData(params.locale)
  const data = citysParkData.data || []
  return (
    <>
      <PageTitle
        primaryColor={colors['army-canvas']}
        secondaryColor={colors.white}
        title="CITY'S PARK"
        description='Şehrin kalbinde, sizi yavaşlatan, yeşil bir vaha...'
        id={navigationConfig['/citys-park']?.id as string}
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
