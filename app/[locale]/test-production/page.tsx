import { Wrapper } from '@/components/wrapper'

import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'
import CitysLiving from '@/components/sections/citys-living'
import CitysMembersClub from '@/components/sections/citys-members-club'
import CitysPark from '@/components/sections/citys-park'
import Home from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'
import {
  fetchCitysLivingData,
  fetchCitysMembersClubData,
  fetchCitysParkData,
} from '@/lib/api/queries'
import CitysTimes from '@/components/sections/citys-times'

export default async function TestPage({
  params,
}: {
  params: { locale: string }
}) {
  const citysParkData = await fetchCitysParkData(params.locale)
  const citysParkDataItems = citysParkData.data || []
  const citysMembersClubData = await fetchCitysMembersClubData(params.locale)
  const citysMembersClubDataItems = citysMembersClubData.data || []
  const citysLivingData = await fetchCitysLivingData(params.locale)
  const citysLivingDataItems = citysLivingData.data || []

  return (
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
  )
}
