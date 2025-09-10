import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { PageTitle } from "@/components/page-title"
import { Wrapper } from "@/components/wrapper"
import { navigationConfig } from "@/lib/constants"

import CitysIstanbulAvm from "./citys-istanbul-avm/page"
import CitysLifePrivileges from "./citys-life-privileges/page"
import CitysMembersClub from "./citys-members-club/page"
import CitysPark from "./citys-park/page"
import CitysTimes from "./citys-times/page"
import Home from "./home/page"
import Project from "./project/page"
import Residences from "./residences/page"
import { Img } from "@/components/utility/img"

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <Header />
      <Wrapper>
        <Home params={params} />
        <PageTitle title='PROJE' id={navigationConfig["/project"]?.id as string} />
        <Project />
        <PageTitle title='KONUM' id={navigationConfig["/location"]?.id as string} />
        <div className='w-screen h-svh lg:h-[55vw] xl:h-screen bg-bricky-brick/30 relative'>
          <Img src='/img/lunas.jpg' alt='Lunas' fill sizes='100vw' className='object-cover' />
        </div>
        <PageTitle className='pb:8 lg:pb-8' title='RESIDENCES' id={navigationConfig["/residences"]?.id as string} />
        <Residences params={params} />
        {/* <PageTitle title="CITY'S PARK" id={navigationConfig["/citys-park"]?.id as string} /> */}
        <CitysPark params={params} />
        {/* <PageTitle title="CITY'S MEMBERS CLUB" id={navigationConfig["/citys-members-club"]?.id as string} /> */}
        <CitysMembersClub params={params} />
        {/* <PageTitle title="CITY'S LIFE AYRICALIKLARI" id={navigationConfig["/citys-life-privileges"]?.id as string} /> */}
        <CitysLifePrivileges params={params} />
        <PageTitle
          textClassName='font-copperplate text-center'
          title={
            <>
              CITY<span className='font-montserrat'>&apos;</span>S İSTANBUL <br /> AVM
            </>
          }
          id={navigationConfig["/citys-istanbul-avm"]?.id as string}
        />
        <CitysIstanbulAvm />
        {/* <PageTitle title="CITY'S TIMES" id={navigationConfig["/citys-times"]?.id as string} /> */}
        <CitysTimes
        //  params={params}
        />
      </Wrapper>
      <Footer />
    </>
  )
}
