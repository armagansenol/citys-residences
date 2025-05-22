import { ReactNode } from "react"

import { LegalTableOfContents } from "@/components/legal-table-of-contents"
import { Img } from "@/components/utility/img"

export interface LegalLayoutProps {
  children: ReactNode
}

export function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      <div className="h-72 bg-slate-200 col-span-12 relative">
        <Img className="object-cover object-center" src="/img/hero.jpg" alt="Citys Residences" fill sizes="100vw" />
      </div>
      <div className="grid grid-cols-12 bd:container px-4 bt:px-10 bd:px-16 space-y-12 pt-8 pb-16">
        <div className="col-span-12 md:col-span-4">
          <LegalTableOfContents />
        </div>
        <div className="col-span-12 md:col-span-8 gap-4 font-halenoir prose">{children}</div>
      </div>
    </>
  )
}
