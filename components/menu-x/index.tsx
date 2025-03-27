"use client"

import { motion, SVGMotionProps, Transition } from "motion/react"

interface Props extends SVGMotionProps<SVGSVGElement> {
  isOpen?: boolean
  color?: string
  strokeWidth?: string | number
  transition?: Transition
  lineProps?: SVGMotionProps<SVGLineElement>
}

export function MenuX({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  color = "#fff",
  transition = {},
  lineProps = {},
  ...props
}: Props): JSX.Element {
  const variant = isOpen ? "opened" : "closed"
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  }
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  }
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  }

  const unitHeight = 2
  const unitWidth = (unitHeight * (width as number)) / (height as number)

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      pointerEvents="none"
      preserveAspectRatio="none"
      width={width}
      height={height}
      {...props}
    >
      <motion.line x1="0" x2={unitWidth} y1="-1" y2="-1" variants={top} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="1" y2="1" variants={center} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="3" y2="3" variants={bottom} {...lineProps} />
    </motion.svg>
  )
}
