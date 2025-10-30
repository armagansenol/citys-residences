import { PageTitle } from '@/components/page-title'
import {
  RepetitiveSectionsWrapper,
  ComponentType,
} from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

interface CitysParkProps {
  data: Array<{
    id: string | number
    componentType: ComponentType
    title?: string
    subtitle?: string
    description?: string
    mediaId?: string
    thumbnail?: string
  }>
}

export default function CitysPark({ data }: CitysParkProps) {
  return (
    <>
      <PageTitle
        primaryColor={colors['army-canvas']}
        secondaryColor={colors.white}
        title="CITY'S PARK"
        description='Şehrin kalbinde, sizi yavaşlatan, yeşil bir vaha...'
        id={navigationConfig['/citys-park']?.id as string}
      />
      <div
        style={
          {
            '--bg-color': colors['army-canvas'],
            '--text-color': colors.white,
          } as React.CSSProperties
        }
      >
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
      </div>
    </>
  )
}
