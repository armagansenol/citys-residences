import { Link as LocalizedLink } from "@/i18n/routing"
import { ArrowRightIcon } from "lucide-react"
import { routing } from "@/i18n/routing"

export interface LinkToPageProps {
  previous: {
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
    <div className="container flex items-center justify-between gap-6 bd:gap-2 py-12 bt:py-20">
      <LocalizedLink
        className="flex items-center gap-2 text-bricky-brick font-halenoir text-base bt:text-xl"
        href={props.previous.href}
      >
        <ArrowRightIcon className="w-4 h-4 rotate-180" />
        <span>{props.previous.title}</span>
      </LocalizedLink>
      <LocalizedLink
        className="flex items-center gap-2 text-bricky-brick font-halenoir text-base bt:text-xl"
        href={props.next.href}
      >
        <span>{props.next.title}</span>
        <ArrowRightIcon className="w-4 h-4" />
      </LocalizedLink>
    </div>
  )
}
