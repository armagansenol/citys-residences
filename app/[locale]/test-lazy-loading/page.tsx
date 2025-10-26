import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
// import { CitysLiving } from '@/components/sections/citys-living'
// import { CitysMembersClub } from '@/components/sections/citys-members-club'
import { CitysPark } from '@/components/sections/citys-park'
import { Wrapper } from '@/components/wrapper'
import {
  // fetchCitysLivingData,
  // fetchCitysMembersClubData,
  fetchCitysParkData,
} from '@/lib/api/queries'

export default async function Page({ params }: { params: { locale: string } }) {
  // const citysLivingData = await fetchCitysLivingData(params.locale)
  // const citysMembersClubData = await fetchCitysMembersClubData(params.locale)
  const citysParkData = await fetchCitysParkData(params.locale)
  return (
    <Wrapper>
      <Header />
      <CitysPark data={citysParkData.data || []} />
      {/* <CitysMembersClub data={citysMembersClubData.data || []} />
      <CitysLiving data={citysLivingData.data || []} /> */}
      <Footer />
    </Wrapper>
  )
}
