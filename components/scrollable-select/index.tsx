"use client"

import { ScrollableBox } from "../utility/scrollable-box"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export interface ScrollableSelectProps {
  items: {
    title: string
  }[]
  activeIndex?: number
  goToIndex?: (index: number) => void
}

export function ScrollableSelect({
  items,
  activeIndex: externalActiveIndex,
  goToIndex: externalGoToIndex,
}: ScrollableSelectProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0)

  // Use external activeIndex if provided, otherwise use internal state
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex

  const loopLength = items.length

  const goToIndex = (targetIndex: number) => {
    let newIndex = targetIndex

    if (loopLength > 0) {
      if (newIndex < 0) {
        newIndex = loopLength - 1
      } else if (newIndex >= loopLength) {
        newIndex = 0
      }
    } else {
      newIndex = 0
    }

    // Use external goToIndex if provided, otherwise use internal state
    if (externalGoToIndex) {
      externalGoToIndex(newIndex)
    } else {
      setInternalActiveIndex(newIndex)
    }
  }

  return (
    <div className="w-full flex">
      <ScrollableBox scrollTo={activeIndex !== undefined ? `#item${activeIndex}Button` : null} orientation="horizontal">
        <div className="flex flex-row pt-4">
          {items.map((item, itemIndex) => (
            <motion.div
              id={`item${itemIndex}Button`}
              key={itemIndex}
              className={cn(
                "whitespace-nowrap font-primary text-black cursor-pointer pr-6",
                "text-sm 2xl:text-base",
                "transition-opacity duration-300 hover:opacity-100",
                itemIndex === 0 && "pl-4",
                itemIndex === items.length - 1 && "pr-4",
                itemIndex === activeIndex && "underline",
                itemIndex === activeIndex ? "opacity-100" : "opacity-50"
              )}
              onClick={() => goToIndex(itemIndex)}
            >
              {item.title}
            </motion.div>
          ))}
        </div>
      </ScrollableBox>
    </div>
  )
}
