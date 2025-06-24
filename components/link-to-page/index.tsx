import { Link as LocalizedLink, routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "lucide-react"

export interface LinkToPageProps {
  previous?: {
    title: string
    href: keyof typeof routing.pathnames
  }
  next: {
    title: string
    href: keyof typeof routing.pathnames
  }
}

export function LinkToPage(props: LinkToPageProps) {
  return (
    <div className="container flex items-center justify-between gap-6 bd:gap-2 py-12 bt:py-20 px-4 bt:px-16">
      {props.previous && (
        <LocalizedLink
          className="flex items-center gap-2 text-bricky-brick font-suisse-intl text-base xl:text-xl 2xl:text-2xl"
          href={props.previous.href}
        >
          <ArrowRightIcon className="w-4 h-4 rotate-180" />
          <span>{props.previous.title}</span>
        </LocalizedLink>
      )}
      {props.next && (
        <LocalizedLink
          className={cn(
            "flex items-center gap-2 text-bricky-brick font-suisse-intl text-base xl:text-xl 2xl:text-2xl",
            !props.previous && "ml-auto"
          )}
          href={props.next.href}
        >
          <span>{props.next.title}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </LocalizedLink>
      )}
    </div>
  )
}
