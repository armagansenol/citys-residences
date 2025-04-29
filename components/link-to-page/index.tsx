import { Link as LocalizedLink } from "@/i18n/routing"
import { ArrowRightIcon } from "lucide-react"
import { routing } from "@/i18n/routing"

export interface LinkToPageProps {
  title: string
  href: keyof typeof routing.pathnames
}

export function LinkToPage(props: LinkToPageProps) {
  return (
    <div className="container flex items-center justify-end gap-2 py-12 bt:py-20">
      <LocalizedLink className="flex items-center gap-2 text-bricky-brick font-halenoir text-xl" href={props.href}>
        <span>{props.title}</span>
        <ArrowRightIcon className="w-4 h-4" />
      </LocalizedLink>
    </div>
  )
}
