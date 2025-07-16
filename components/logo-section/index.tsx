import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface LogoSectionProps {
  backgroundLogo?: ReactNode
  foregroundLogo: ReactNode
  backgroundFill?: string
  foregroundFill?: string
  backgroundDuration?: number
  foregroundDuration?: number
  className?: string
}

export function LogoSection({ foregroundLogo, foregroundDuration = 0.5, className = "" }: LogoSectionProps) {
  return (
    <div className={cn("relative w-full 2xl:py-12 flex items-center justify-center", className)}>
      {/* <div className="w-full h-[30vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={backgroundDuration}>{backgroundLogo}</FadeInOnScroll>
        </div> */}
      <div className="w-full max-w-lg h-32 md:h-40 lg:h-48 xl:h-44">
        <FadeInOnScroll duration={foregroundDuration}>{foregroundLogo}</FadeInOnScroll>
      </div>
    </div>
  )
}
