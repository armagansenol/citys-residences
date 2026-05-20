import { Wrapper } from '@/components/wrapper'

import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'
import CitysLiving from '@/components/sections/citys-living'
import CitysMembersClub from '@/components/sections/citys-members-club'
import CitysPark from '@/components/sections/citys-park'
import CitysTimes from '@/components/sections/citys-times'
import Home from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'

import { getCountries } from '@/lib/api/countries'
import {
  fetchCitysLivingData,
  fetchCitysMembersClubData,
  fetchCitysParkData,
} from '@/lib/api/queries'
import { ScrollDown } from '@/components/scroll-down'
import { HideOnStand } from '@/components/variant-gate'

export default async function Page({ params }: { params: { locale: string } }) {
  // Fetch all data server-side
  const [parkData, livingData, membersClubData] = await Promise.all([
    fetchCitysParkData(params.locale),
    fetchCitysLivingData(params.locale),
    fetchCitysMembersClubData(params.locale),
  ])

  const countries = getCountries()

  return (
    <>
      <Wrapper countries={countries}>
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
        <HideOnStand>
          <CitysTimes locale={params.locale} />
        </HideOnStand>
      </Wrapper>
      <ScrollDown />
    </>
  )
}
