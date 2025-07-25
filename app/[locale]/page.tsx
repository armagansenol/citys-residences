import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Wrapper } from "@/components/wrapper"
import { GSAPGlobalAnimationInitializer } from "@/components/gsap-global-animation-initializer"

import CitysIstanbulAvm from "./citys-istanbul-avm/page"
import CitysLifePrivileges from "./citys-life-privileges/page"
import CitysMembersClub from "./citys-members-club/page"
import CitysPark from "./citys-park/page"
import CitysTimes from "./citys-times/page"
import Home from "./home/page"
import Location from "./location/page"
import Project from "./project/page"
import Residences from "./residences/page"

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <Header />
      <Wrapper>
        <GSAPGlobalAnimationInitializer />
        <Home params={params} />
        <Project />
        <Location />
        <Residences params={params} />
        <CitysPark params={params} />
        <CitysMembersClub params={params} />
        <CitysLifePrivileges params={params} />
        <CitysIstanbulAvm />
        <CitysTimes />
      </Wrapper>
      <Footer />
    </>
  )
}
