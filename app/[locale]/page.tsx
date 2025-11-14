import { Wrapper } from '@/components/wrapper'

import Home from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'
import CitysTimes from '@/components/sections/citys-times'
import CitysPark from '@/components/sections/citys-park'
import CitysMembersClub from '@/components/sections/citys-members-club'
import CitysLiving from '@/components/sections/citys-living'
import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'

import {
  fetchCitysParkData,
  fetchCitysLivingData,
  fetchCitysMembersClubData,
} from '@/lib/api/queries'

export default async function Page({ params }: { params: { locale: string } }) {
  // Fetch all data server-side
  const [parkData, livingData, membersClubData] = await Promise.all([
    fetchCitysParkData(params.locale),
    fetchCitysLivingData(params.locale),
    fetchCitysMembersClubData(params.locale),
  ])

  return (
    <Wrapper>
      <Home params={params} />
      <ProjectSection params={params} />
      <ResidencesSection params={params} />
      <CitysPark
        items={parkData.success ? parkData.data || [] : []}
        locale={params.locale}
      />
      <CitysMembersClub
        items={membersClubData.success ? membersClubData.data || [] : []}
        locale={params.locale}
      />
      <CitysLiving
        items={livingData.success ? livingData.data || [] : []}
        locale={params.locale}
      />
      <CitysIstanbulAvm />
      <CitysTimes locale={params.locale} />
    </Wrapper>
  )
}
