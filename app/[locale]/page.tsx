import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Wrapper } from "@/components/wrapper"

import Home from "./home/page"

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <Header />
      <Wrapper>
        <Home params={params} />
      </Wrapper>
      <Footer />
    </>
  )
}
