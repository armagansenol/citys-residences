import dynamic from 'next/dynamic'
import { Wrapper } from '@/components/wrapper'

import Home from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'

// Lazy loaded components (server-rendered with code splitting)
const CitysPark = dynamic(() => import('@/components/sections/citys-park'))
const CitysMembersClub = dynamic(
  () => import('@/components/sections/citys-members-club')
)
const CitysLiving = dynamic(() => import('@/components/sections/citys-living'))
const CitysIstanbulAvm = dynamic(
  () => import('@/components/sections/citys-istanbul-avm')
)
const CitysTimes = dynamic(() => import('@/components/sections/citys-times'))

import {
  fetchCitysLivingData,
  fetchCitysMembersClubData,
  fetchCitysParkData,
} from '@/lib/api/queries'

export default async function Page({ params }: { params: { locale: string } }) {
  const citysParkData = await fetchCitysParkData(params.locale)
  const citysParkDataItems = citysParkData.data || []
  const citysMembersClubData = await fetchCitysMembersClubData(params.locale)
  const citysMembersClubDataItems = citysMembersClubData.data || []
  const citysLivingData = await fetchCitysLivingData(params.locale)
  const citysLivingDataItems = citysLivingData.data || []
  return (
    <>
      <Wrapper>
        <Home params={params} />
        <ProjectSection params={params} />
        <ResidencesSection params={params} />
        <CitysPark data={citysParkDataItems} />
        <CitysMembersClub data={citysMembersClubDataItems} />
        <CitysLiving data={citysLivingDataItems} />
        <CitysIstanbulAvm />
        <CitysTimes locale={params.locale} />
      </Wrapper>
    </>
  )
}
