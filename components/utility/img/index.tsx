'use client'

import { cn } from '@/lib/utils'
import type { ImageProps } from 'next/image'
import NextImage from 'next/image'
import { useState } from 'react'

const Img = (props: ImageProps) => {
  const {
    alt,
    className,
    fill,
    height,
    loading = 'eager',
    priority = false,
    src,
    quality = 100,
    width,
    placeholder,
    blurDataURL,
    sizes,
  } = props
  const [loaded, setLoaded] = useState(false)

  return (
    <NextImage
      alt={alt}
      className={cn(
        'block h-full w-full transition duration-300',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      loading={loading}
      onLoad={() => setLoaded(true)}
      priority={priority}
      src={src}
      quality={quality}
      fill={fill}
      {...(blurDataURL && { blurDataURL })}
      {...(placeholder && { placeholder })}
      {...(height && { height })}
      {...(width && { width })}
      {...(sizes && { sizes })}
    />
  )
}

export { Img }
