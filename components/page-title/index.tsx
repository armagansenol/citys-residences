import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"

import { LogoSlim } from "@/components/icons"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "../gsap-split-text"

export interface PageTitleProps {
  title: React.ReactNode
  description: React.ReactNode
  id: string
  className?: string
  bgColor?: string
  itemColor?: string
}

export function PageTitle(props: PageTitleProps) {
  const {
    title,
    description,
    id,
    className,
    bgColor = colors["bricky-brick"],
    itemColor = colors["bricky-brick"],
  } = props
  return (
    <div style={{ color: bgColor }}>
      <div
        className={cn(
          "flex items-center justify-center min-h-[70vw] bg-[url('/img/test-bg.svg')] bg-cover bg-center bg-blend-soft-light relative",
          "before:absolute before:top-0 before:left-0 before:w-full before:h-[25%] before:bg-gradient-to-b before:from-current before:to-transparent",
          "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[25%] after:bg-gradient-to-t after:from-current after:to-transparent",
          className
        )}
        id={id}
      >
        <div className='flex flex-col items-center justify-center gap-6 lg:gap-6'>
          <FadeInOnScroll>
            <span className='w-36 h-36 lg:w-20 lg:h-20'>
              <LogoSlim fill={itemColor} />
            </span>
          </FadeInOnScroll>
          <h2
            className={cn(
              "font-montserrat font-[600] text-center",
              "text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl tracking-[0.4em]",
              "leading-snug lg:leading-snug xl:leading-snug 2xl:leading-snug"
            )}
            style={{ color: itemColor }}
          >
            <GsapSplitText splitBy='chars' stagger={0.02} duration={1}>
              {title}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              "font-montserrat font-[300] text-bricky-brick text-center",
              "text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl",
              "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight",
              "max-w-2xl"
            )}
            style={{ color: itemColor }}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1}>
              {description}
            </GsapSplitText>
          </p>
        </div>
      </div>
    </div>
  )
}
