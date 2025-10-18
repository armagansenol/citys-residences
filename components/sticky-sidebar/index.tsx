"use client"

import { navigationConfig } from "@/lib/constants"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

export const StickySidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(navigationConfig["/"]?.id || null)

  const items = [
    {
      label: "ANASAYFA",
      href: "/",
      id: navigationConfig["/"]?.id,
    },
    {
      label: "PROJE",
      href: "/project",
      id: navigationConfig["/project"]?.id,
    },
    {
      label: "RESIDENCES",
      href: "/residences",
      id: navigationConfig["/residences"]?.id,
    },
    {
      label: "CITY'S PARK",
      href: "/citys-park",
      id: navigationConfig["/citys-park"]?.id,
    },
    {
      label: "MEMBERS CLUB",
      href: "/citys-members-club",
      id: navigationConfig["/citys-members-club"]?.id,
    },
    {
      label: "CITY'S LIVING",
      href: "/citys-life-privileges",
      id: navigationConfig["/citys-life-privileges"]?.id,
    },
    {
      label: "CITY'S ISTANBUL AVM",
      href: "/citys-istanbul-avm",
      id: navigationConfig["/citys-istanbul-avm"]?.id,
    },
  ]

  return (
    <div className='fixed top-1/2 -translate-y-[40%] left-16  z-[var(--z-sticky-menu)] flex flex-col mix-blend-difference'>
      {items.map((item) => (
        <div
          className={cn("w-64 h-20 relative border-l-2 border-white transition-all duration-300 ease-in-out", {
            "border-l-4": activeItem === item.label,
          })}
          key={item.href}
        >
          <div
            className='font-primary absolute top-1/2 -translate-y-1/2 left-4 text-sm font-[600] block text-white cursor-pointer tracking-[0.4em]'
            onClick={() => setActiveItem(item.label || null)}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}
