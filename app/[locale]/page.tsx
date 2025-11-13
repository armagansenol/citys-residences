import dynamic from 'next/dynamic'
import { Wrapper } from '@/components/wrapper'

import Home from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'
import CitysTimes from '@/components/sections/citys-times'

// Lazy loaded components
const CitysPark = dynamic(() => import('@/components/sections/citys-park'))

const CitysMembersClub = dynamic(
  () => import('@/components/sections/citys-members-club')
)

const CitysLiving = dynamic(() => import('@/components/sections/citys-living'))

const CitysIstanbulAvm = dynamic(
  () => import('@/components/sections/citys-istanbul-avm')
)

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Wrapper>
      <Home params={params} />
      <ProjectSection params={params} />
      <ResidencesSection params={params} />
      <CitysPark />
      <CitysMembersClub />
      <CitysLiving />
      <CitysIstanbulAvm />
      <CitysTimes locale={params.locale} />
    </Wrapper>
  )
}
