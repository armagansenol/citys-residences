import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        textareaRef.current?.setAttribute("data-lenis-prevent", "")
        props.onFocus?.(e)
      },
      [props]
    )

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        textareaRef.current?.removeAttribute("data-lenis-prevent")
        props.onBlur?.(e)
      },
      [props]
    )

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full text-neutral-950 rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 bt:text-sm",
          className
        )}
        ref={textareaRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
