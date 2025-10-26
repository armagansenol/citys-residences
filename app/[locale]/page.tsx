import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Wrapper } from '@/components/wrapper'

import Home from './home/page'
import ProjectPage from './project/page'
import ResidencesPage from './residences/page'
import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'

export default async function Page({ params }: { params: { locale: string } }) {
  console.log(params)

  return (
    <>
      <Header />
      <Wrapper>
        <Home params={params} />
        <ProjectPage />
        <ResidencesPage params={params} />
        <CitysIstanbulAvm />
      </Wrapper>
      <Footer />
    </>
  )
}
