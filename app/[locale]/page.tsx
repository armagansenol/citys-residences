import { Img } from "@/components/utility/img"
import { MainLayout } from "@/layouts/main-layout"

export default function Home() {
  return (
    <MainLayout headerVariant="v2">
      <div className="h-screen w-screen bg-bricky-brick">
        <Img src="/img/hero.jpg" alt="City's Residences Istanbul" fill className="object-cover" />
      </div>
    </MainLayout>
  )
}
