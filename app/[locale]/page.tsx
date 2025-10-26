import { Wrapper } from '@/components/wrapper'

import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'
import { CitysTimes } from '@/components/sections/citys-times'
import Home from './home/page'
import ProjectPage from './project/page'
import ResidencesPage from './residences/page'

export default async function Page({ params }: { params: { locale: string } }) {
  console.log(params)

  return (
    <>
      <Wrapper>
        <Home params={params} />
        <ProjectPage />
        <ResidencesPage params={params} />
        <CitysIstanbulAvm />
        <CitysTimes />
      </Wrapper>
    </>
  )
}
