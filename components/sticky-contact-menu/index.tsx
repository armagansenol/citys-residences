"use client"

import { IconInquiry, IconTelephone, IconWhatsapp } from "@/components/icons"
import { Link } from "@/components/utility/link"

export default function StickyContactMenu() {
  return (
    <div className="font-montserrat fixed left-0 bottom-0 right-0 bg-bricky-brick grid grid-cols-3 z-[200] bt:hidden">
      <Link
        href="tel:+902162666600"
        className="py-3 text-white flex flex-col items-center justify-center gap-2 border-r border-black/15"
      >
        <IconTelephone className="w-6 h-6" />
        <div className="text-sm font-medium leading-none">Telefon</div>
      </Link>
      <div className="py-3 text-white flex flex-col items-center justify-center gap-2border-r border-black/15">
        <IconInquiry className="w-6 h-6" />
        <div className="text-sm font-medium leading-none">Randevu Al</div>
      </div>
      <Link
        href="https://wa.me/902162666600"
        className="py-3 text-white flex flex-col items-center justify-center gap-2"
      >
        <IconWhatsapp className="w-6 h-6" />
        <div className="text-sm font-medium leading-none">Whatsapp</div>
      </Link>
    </div>
  )
}
