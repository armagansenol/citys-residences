import { GsapSplitText } from '@/components/gsap-split-text'
import { PageTitle } from '@/components/page-title'
import {
  RepetitiveSectionsWrapper,
  ComponentType,
} from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { navigationConfig } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { colors } from '@/styles/config.mjs'

interface CitysMembersClubProps {
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

export default function CitysMembersClub({ data }: CitysMembersClubProps) {
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
      <section
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          'bg-[url("/img/members-club-card-mobile.jpg")] bg-cover bg-center bg-no-repeat lg:bg-[url("/img/members-club-card.jpg")]',
          'h-screen w-full lg:aspect-[16/7] lg:h-auto'
        )}
      >
        <div className='z-40 mb-40 flex flex-shrink-0 flex-col items-center justify-center gap-2'>
          <h2
            className={cn(
              'text-center font-primary font-[400] text-white',
              'text-4xl/tight lg:text-4xl/tight xl:text-6xl/tight 2xl:text-6xl/tight'
            )}
          >
            <GsapSplitText type='chars' stagger={0.02} duration={1}>
              Her an daha özel.
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[200] text-white',
              'text-xl/tight lg:text-2xl/tight xl:text-2xl/tight 2xl:text-3xl/tight',
              'w-[90vw] md:w-[60vw] lg:w-[60vw] xl:w-[40vw] 2xl:w-[40vw] 3xl:w-[40vw]'
            )}
          >
            <GsapSplitText type='chars' stagger={0.02} duration={1}>
              City&apos;s Members Club
            </GsapSplitText>
          </p>
        </div>
      </section>
    </>
  )
}
