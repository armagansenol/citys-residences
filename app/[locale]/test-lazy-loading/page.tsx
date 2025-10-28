import { Wrapper } from '@/components/wrapper'

import HomePage from '@/components/sections/home'
import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'
import CitysLivingPage from '@/components/sections/citys-living'
import CitysMembersClubPage from '@/components/sections/citys-members-club'
import CitysParkPage from '@/components/sections/citys-park'
import { CitysTimes } from '@/components/sections/citys-times'
import ProjectPage from '@/components/sections/project'
import ResidencesPage from '@/components/sections/residences'

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Wrapper>
      <HomePage params={params} />
      <ProjectPage />
      <ResidencesPage params={params} />
      <CitysParkPage params={params} />
      <CitysMembersClubPage params={params} />
      <CitysLivingPage params={params} />
      <CitysIstanbulAvm />
      <CitysTimes />
    </Wrapper>
  )
}
