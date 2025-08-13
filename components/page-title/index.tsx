import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { cn } from "@/lib/utils"

export interface PageTitleProps {
  title: React.ReactNode
  id: string
  textClassName?: string
}

export function PageTitle(props: PageTitleProps) {
  return (
    <div className="flex items-center justify-center gap-6 lg:gap-2 py-12 lg:py-20" id={props.id}>
      <FadeInOnScroll>
        <h2
          className={cn(
            "font-montserrat font-semibold text-bricky-brick text-center",
            "text-4xl lg:text-5xl xl:text-7xl 2xl:text-7xl",
            "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight",
            props.textClassName
          )}
        >
          {props.title}
        </h2>
      </FadeInOnScroll>
    </div>
  )
}
