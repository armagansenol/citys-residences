import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { cn } from "@/lib/utils"

export interface PageTitleProps {
  title: string
  id: string
  className?: string
}

export function PageTitle(props: PageTitleProps) {
  return (
    <div
      className={cn(
        "container flex items-center justify-center gap-6 bd:gap-2 py-12 bt:py-20 font-primary",
        props.className
      )}
      id={props.id}
    >
      <FadeInOnScroll>
        <h2
          className="text-bricky-brick font-semibold text-base xl:text-7xl 2xl:text-7xl xl:leading-tight 2xl:leading-tight"
          dangerouslySetInnerHTML={{ __html: props.title }}
        />
      </FadeInOnScroll>
    </div>
  )
}
