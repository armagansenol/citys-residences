import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface LogoSectionProps {
  foregroundLogo: ReactNode
  className?: string
}

export function LogoSection({ foregroundLogo, className }: LogoSectionProps) {
  return (
    <div className={cn("relative w-full py-12 lg:py-16 xl:py-12 flex items-center justify-center", className)}>
      <div className="w-full max-w-lg h-32 md:h-40 lg:h-48 xl:h-44">
        <FadeInOnScroll>{foregroundLogo}</FadeInOnScroll>
      </div>
    </div>
  )
}
