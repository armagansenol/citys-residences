"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { AnimationOptions, motion } from "motion/react"
import { cn } from "@/lib/utils"
import React from "react"

export interface TextProps {
  children: React.ReactNode
  reverse?: boolean
  transition?: AnimationOptions
  splitBy?: "words" | "characters" | "lines" | string
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | "random" | number
  containerClassName?: string
  wordLevelClassName?: string
  elementLevelClassName?: string
  containerLevelClassName?: string
  onClick?: () => void
  onStart?: () => void
  onComplete?: () => void
  autoStart?: boolean // Whether to start the animation automatically
}

// Ref interface to allow external control of the animation
export interface VerticalCutRevealRef {
  startAnimation: () => void
  reset: () => void
}

interface TextSegment {
  text: string
  element?: React.ReactElement
  isText: boolean
}

interface AnimatedSegment {
  segments: (string | React.ReactNode)[]
  totalLength: number
}

// Utility to split text into characters with support for unicode and emojis
const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), ({ segment }) => segment)
  }
  return Array.from(text)
}

// Utility to flatten ReactNode children and extract text segments
const flattenReactNode = (node: React.ReactNode): TextSegment[] => {
  const segments: TextSegment[] = []

  const processNode = (n: React.ReactNode): void => {
    if (typeof n === "string") {
      if (n.trim()) {
        segments.push({ text: n, isText: true })
      }
    } else if (typeof n === "number") {
      segments.push({ text: n.toString(), isText: true })
    } else if (React.isValidElement(n)) {
      // Handle self-closing elements like <br />
      if (!n.props.children) {
        segments.push({ text: "", element: n, isText: false })
      } else {
        // For elements with children, we need to preserve the wrapper but process the children
        const childSegments: TextSegment[] = []
        React.Children.forEach(n.props.children, (child) => {
          const childFlattened = flattenReactNode(child)
          childSegments.push(...childFlattened)
        })

        // Group all text segments within this element
        const textContent = childSegments
          .filter((s) => s.isText)
          .map((s) => s.text)
          .join("")
        if (textContent.trim()) {
          segments.push({
            text: textContent,
            element: React.cloneElement(n, { ...n.props, children: textContent }),
            isText: true,
          })
        }

        // Add any non-text elements
        childSegments.filter((s) => !s.isText).forEach((s) => segments.push(s))
      }
    } else if (Array.isArray(n)) {
      n.forEach(processNode)
    }
  }

  processNode(node)
  return segments
}

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
  (
    {
      children,
      reverse = false,
      transition = {
        type: "spring",
        stiffness: 190,
        damping: 22,
      },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      onClick,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    // Process the children and create animated segments
    const processedContent = useMemo((): AnimatedSegment => {
      if (typeof children === "string") {
        // Handle simple string case
        const segments =
          splitBy === "words"
            ? children.split(" ")
            : splitBy === "characters"
            ? splitIntoCharacters(children)
            : splitBy === "lines"
            ? children.split("\n")
            : children.split(splitBy)

        return {
          segments,
          totalLength: segments.length,
        }
      }

      // Handle ReactNode case
      const textSegments = flattenReactNode(children)
      const allSegments: (string | React.ReactNode)[] = []
      let totalLength = 0

      textSegments.forEach((segment) => {
        if (segment.isText && segment.text.trim()) {
          const splitText =
            splitBy === "words"
              ? segment.text.split(" ")
              : splitBy === "characters"
              ? splitIntoCharacters(segment.text)
              : splitBy === "lines"
              ? segment.text.split("\n")
              : segment.text.split(splitBy)

          if (segment.element) {
            // Wrap each split part in the original element
            splitText.forEach((part, index) => {
              if (part.trim()) {
                const wrappedElement = React.cloneElement(segment.element!, {
                  ...segment.element!.props,
                  key: `${totalLength}-${index}`,
                  children: part,
                })
                allSegments.push(wrappedElement)
                totalLength++
              }
            })
          } else {
            // Plain text segments
            splitText.forEach((part) => {
              if (part.trim()) {
                allSegments.push(part)
                totalLength++
              }
            })
          }
        } else if (!segment.isText && segment.element) {
          // Non-text elements like <br />
          allSegments.push(segment.element)
        }
      })

      return {
        segments: allSegments,
        totalLength,
      }
    }, [children, splitBy])

    // Calculate stagger delays based on staggerFrom
    const getStaggerDelay = useCallback(
      (index: number) => {
        const total = processedContent.totalLength
        if (staggerFrom === "first") return index * staggerDuration
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2)
          return Math.abs(center - index) * staggerDuration
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total)
          return Math.abs(randomIndex - index) * staggerDuration
        }
        return Math.abs(staggerFrom - index) * staggerDuration
      },
      [processedContent.totalLength, staggerFrom, staggerDuration]
    )

    const startAnimation = useCallback(() => {
      setIsAnimating(true)
      onStart?.()
    }, [onStart])

    // Expose the startAnimation function via ref
    useImperativeHandle(ref, () => ({
      startAnimation,
      reset: () => setIsAnimating(false),
    }))

    // Auto start animation
    useEffect(() => {
      if (autoStart) {
        startAnimation()
      }
    }, [autoStart, startAnimation])

    const variants = {
      hidden: { y: reverse ? "-100%" : "100%" },
      visible: (i: number) => ({
        y: 0,
        transition: {
          ...transition,
          delay: ((transition?.delay as number) || 0) + getStaggerDelay(i),
        },
      }),
    }

    // Get plain text for screen readers
    const getPlainText = (node: React.ReactNode): string => {
      if (typeof node === "string") return node
      if (typeof node === "number") return node.toString()
      if (React.isValidElement(node)) {
        if (node.props.children) {
          return getPlainText(node.props.children)
        }
        return ""
      }
      if (Array.isArray(node)) {
        return node.map(getPlainText).join("")
      }
      return ""
    }

    return (
      <span className={cn(containerClassName, "whitespace-pre-wrap")} onClick={onClick} ref={containerRef} {...props}>
        <span className="sr-only">{getPlainText(children)}</span>
        <span aria-hidden="true" className="inline-flex flex-wrap">
          {processedContent.segments.map((segment, index) => {
            // Handle non-text elements (like <br />)
            if (React.isValidElement(segment) && !segment.props.children) {
              return React.cloneElement(segment, { key: index })
            }

            // Handle text segments (both plain and wrapped in elements)
            return (
              <span key={index} className={cn("inline-flex overflow-hidden", wordLevelClassName)}>
                <span className={cn(elementLevelClassName, "whitespace-pre-wrap relative")}>
                  <motion.span
                    custom={index}
                    initial="hidden"
                    animate={isAnimating ? "visible" : "hidden"}
                    variants={variants}
                    onAnimationComplete={index === processedContent.segments.length - 1 ? onComplete : undefined}
                    className="inline-block"
                  >
                    {segment}
                  </motion.span>
                </span>
                {/* Add space after words (except for last item) */}
                {splitBy === "words" && index < processedContent.segments.length - 1 && <span> </span>}
              </span>
            )
          })}
        </span>
      </span>
    )
  }
)

VerticalCutReveal.displayName = "VerticalCutReveal"
export default VerticalCutReveal
