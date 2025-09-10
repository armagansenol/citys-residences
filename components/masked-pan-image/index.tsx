"use client"

import { gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useState, useCallback, useEffect } from "react"
import { useWindowSize } from "react-use"
import { breakpoints } from "@/styles/config.mjs"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export interface MaskedPanImageProps {
  imgSrc: string
  sizes: string
}

export function MaskedPanImage({ imgSrc, sizes = "100vw" }: MaskedPanImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const imageElementRef = useRef<HTMLImageElement | null>(null)

  const { width } = useWindowSize()
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number } | null>(null)

  // Handle image load to get natural dimensions
  const handleImageLoad = useCallback(() => {
    // Find the actual img element inside the container
    if (imgRef.current) {
      const imgElement = imgRef.current.querySelector("img")
      if (imgElement && imgElement.naturalWidth && imgElement.naturalHeight) {
        setImageDimensions({
          width: imgElement.naturalWidth,
          height: imgElement.naturalHeight,
        })
        imageElementRef.current = imgElement
      }
    }
  }, [])

  // Handle container resize
  const updateContainerDimensions = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setContainerDimensions({
        width: rect.width,
        height: rect.height,
      })
    }
  }, [])

  // Set up resize observer to track container size changes
  useEffect(() => {
    updateContainerDimensions()

    if (!ref.current) return

    const resizeObserver = new ResizeObserver(() => {
      updateContainerDimensions()
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [updateContainerDimensions])

  // Check for image dimensions periodically until we get them
  useEffect(() => {
    if (imageDimensions) return

    const checkImage = () => {
      handleImageLoad()
    }

    const interval = setInterval(checkImage, 100)

    return () => {
      clearInterval(interval)
    }
  }, [imageDimensions, handleImageLoad])

  // Calculate the effective image dimensions when object-contain is applied
  const calculateEffectiveDimensions = useCallback(() => {
    if (!imageDimensions || !containerDimensions) return null

    const imageAspect = imageDimensions.width / imageDimensions.height
    const containerAspect = containerDimensions.width / containerDimensions.height

    if (imageAspect > containerAspect) {
      // Image is wider - width will be constrained
      const effectiveWidth = containerDimensions.width
      const effectiveHeight = effectiveWidth / imageAspect
      return { width: effectiveWidth, height: effectiveHeight }
    } else {
      // Image is taller - height will be constrained
      const effectiveHeight = containerDimensions.height
      const effectiveWidth = effectiveHeight * imageAspect
      return { width: effectiveWidth, height: effectiveHeight }
    }
  }, [imageDimensions, containerDimensions])

  useGSAP(
    () => {
      if (!width || !imageDimensions || !containerDimensions) return

      const effectiveDimensions = calculateEffectiveDimensions()
      if (!effectiveDimensions) return

      if (imgRef.current) {
        // Calculate what size the image should be to show its full width at the container height
        const imageAspect = imageDimensions.width / imageDimensions.height
        const containerAspect = containerDimensions.width / containerDimensions.height

        let fullImageWidth, fullImageHeight, scale, maxPanDistance

        if (imageAspect > containerAspect) {
          // Image is wider than container - we want to show full width
          fullImageHeight = containerDimensions.height
          fullImageWidth = fullImageHeight * imageAspect
          scale = containerDimensions.height / effectiveDimensions.height
          maxPanDistance = (fullImageWidth - containerDimensions.width) / 2
        } else {
          // Image is taller than container - it already fits width-wise, but we can still pan a bit
          fullImageWidth = containerDimensions.width
          fullImageHeight = fullImageWidth / imageAspect
          scale = containerDimensions.width / effectiveDimensions.width
          // Even for tall images, create some pan effect by expanding width slightly
          maxPanDistance = containerDimensions.width * 0.1
        }

        // Set the inner container to match the exact rendered image dimensions
        imgRef.current.style.width = `${effectiveDimensions.width}px`
        imgRef.current.style.height = `${effectiveDimensions.height}px`

        // Apply initial scale and center positioning
        imgRef.current.style.transform = `scale(${scale})`
        imgRef.current.style.transformOrigin = "center center"

        // Position the container in the center
        imgRef.current.style.position = "absolute"
        imgRef.current.style.left = "50%"
        imgRef.current.style.top = "50%"
        imgRef.current.style.marginLeft = `-${effectiveDimensions.width / 2}px`
        imgRef.current.style.marginTop = `-${effectiveDimensions.height / 2}px`

        // Calculate duration based on pan distance to maintain consistent speed
        // Responsive base speed: slower on mobile for better UX
        const baseSpeed = width < breakpoints.breakpointTablet ? 50 : 100 // pixels per second
        const panDuration = Math.max(maxPanDistance / baseSpeed, 1) // minimum 1 second
        const returnDuration = panDuration * 0.8 // return to center slightly faster

        const tl = gsap.timeline({ paused: true })

        // Linear animation without easing - from center to right, back to center, to left, back to center
        tl.to(imgRef.current, {
          x: `${maxPanDistance}px`,
          duration: panDuration,
          ease: "none",
        })
          .to(imgRef.current, {
            x: 0,
            duration: returnDuration,
            ease: "none",
          })
          .to(imgRef.current, {
            x: `-${maxPanDistance}px`,
            duration: panDuration,
            ease: "none",
          })
          .to(imgRef.current, {
            x: 0,
            duration: returnDuration,
            ease: "none",
          })

        tl.repeat(-1)

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          markers: false,
          onEnter: () => {
            tl.play()
          },
          onLeave: () => {
            tl.pause()
          },
          onEnterBack: () => {
            tl.play()
          },
          onLeaveBack: () => {
            tl.pause()
          },
        })
      }
    },
    {
      scope: ref,
      dependencies: [width, imageDimensions, containerDimensions],
    }
  )

  return (
    <div className={cn("w-full h-full min-h-full overflow-hidden relative")} ref={ref} style={{ height: "100%" }}>
      <div ref={imgRef}>
        <Img
          src={imgSrc}
          alt='Parallax Image'
          className={cn("w-full h-full object-contain z-40")}
          fill
          sizes={sizes}
          loading='lazy'
        />
      </div>
    </div>
  )
}
