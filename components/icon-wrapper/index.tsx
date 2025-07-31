import { cn } from "@/lib/utils"

import { ReactNode } from "react"

export interface IconWrapperProps {
  children: ReactNode
  className?: string
}

export function IconWrapper(props: IconWrapperProps) {
  return (
    <div
      className={cn(
        "border-[2px] rounded-lg w-full h-full flex items-center justify-center flex-grow",
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
