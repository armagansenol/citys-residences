"use client"

import s from "./parallax-video-panel.module.css"

import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { useRef } from "react"
import cn from "clsx"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { Video } from "@/components/utility/video"

export function ParallaxVideoPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true })

      tl.to(
        ".gsap-img-c",
        {
          filter: "blur(8px)",
          opacity: 0.3,
        },
        "s"
      )
        .to(
          ".gsap-img",
          {
            scale: 1.1,
          },
          "s"
        )
        .to(
          ".gsap-video-panel-c",
          {
            y: `-100%`,
            scale: 1,
          },
          "s"
        )
        .to(".gsap-video-panel-c", {
          y: `-100%`,
          duration: 0.05,
        })

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        scrub: true,
        pin: true,
        end: "+=3500",
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div
      className="w-screen h-[var(--lvh-calc)] overflow-hidden bg-bricky-brick"
      ref={ref}
      onClick={() => {
        videoRef.current?.play()
      }}
    >
      <div className="gsap-img-c w-screen h-[var(--lvh-calc)] relative inset-0">
        <Image
          src="/img/slides-2/1.jpg"
          alt="Parallax Image"
          fill
          className="gsap-img object-cover gsap-parallax-img z-30"
        />
      </div>
      <div
        className={cn(
          s["video-panel-c"],
          "gsap-video-panel-c w-screen h-[var(--lvh-calc)] flex items-center justify-center"
        )}
      >
        <div className="w-screen aspect-video bd:aspect-none bd:h-[var(--lvh-calc)] overflow-hidden relative z-10 flex items-center justify-center">
          <Video
            primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891#t=0.01"
            className="w-full h-full object-cover"
            controls
            ref={videoRef}
          />
        </div>
      </div>
    </div>
  )
}
