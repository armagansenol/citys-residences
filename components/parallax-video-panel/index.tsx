"use client"

import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { useRef } from "react"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"

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
        .fromTo(
          ".gsap-video-panel-c",
          {
            yPercent: -20,
          },
          {
            yPercent: -100,
          },
          "s"
        )

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        scrub: true,
        pin: true,
        end: "+=1000",
      })
    },
    {
      scope: ref,
    }
  )

  const video = (
    <VideoWithPlayButton primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891#t=0.01" />
  )

  return (
    <>
      <div className="w-screen overflow-hidden relative z-10 flex bd:hidden items-center justify-center">{video}</div>
      <div
        className="hidden bd:block w-screen h-[var(--lvh-calc)] overflow-hidden"
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
          className={"gsap-video-panel-c container h-[var(--lvh-calc)] flex items-center justify-center relative z-50"}
        >
          <div className="w-full h-auto overflow-hidden relative z-10 flex items-center justify-center">{video}</div>
        </div>
      </div>
    </>
  )
}
