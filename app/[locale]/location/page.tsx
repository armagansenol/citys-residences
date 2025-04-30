import { LinkToPage } from "@/components/link-to-page"
import { Wrapper } from "@/components/wrapper"

export default function Page() {
  return (
    <Wrapper>
      <section className="relative w-full h-screen">
        <iframe
          src="https://www.lunas.pro/l-touch/web-version/london.html"
          className="w-full h-full border-0"
          allowFullScreen
        />
      </section>
      <LinkToPage
        previous={{ title: "Konutlar", href: "/residences" }}
        next={{ title: "City's Park", href: "/citys-park" }}
      />
    </Wrapper>
  )
}
