import { GsapSplitText } from "@/components/gsap-split-text"

export interface PageTitleProps {
  title: string
  id: string
}

export function PageTitle(props: PageTitleProps) {
  return (
    <div className="container flex items-center justify-center gap-6 bd:gap-2 py-12 bt:py-20" id={props.id}>
      <h2 className="text-bricky-brick font-primary font-semibold text-base xl:text-3xl 2xl:text-7xl xl:leading-tight 2xl:leading-tight">
        <GsapSplitText splitBy="chars" stagger={0.02} duration={1}>
          {props.title}
        </GsapSplitText>
      </h2>
    </div>
  )
}
