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
    </Wrapper>
  )
}
