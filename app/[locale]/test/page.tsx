import dynamic from 'next/dynamic'

import Home from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'

const CitysIstanbulAvm = dynamic(
  () => import('@/components/sections/citys-istanbul-avm')
)
const CitysTimes = dynamic(() => import('@/components/sections/citys-times'))

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <Home params={params} />
      <ProjectSection params={params} />
      <ResidencesSection params={params} />
      <CitysIstanbulAvm />
      <CitysTimes locale={params.locale} />
    </>
  )
}
