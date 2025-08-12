import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import Home from "../home/page"

export default function TestPage() {
  return (
    <div>
      <Header />
      <Home params={{ locale: "tr" }} />
      <Footer />
    </div>
  )
}
