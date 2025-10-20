'use client'

import Lottie from 'lottie-react'

interface LottiePlayerProps {
  animationData: unknown
}

export function LottiePlayer({ animationData }: LottiePlayerProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      width='100%'
      height='100%'
    />
  )
}
