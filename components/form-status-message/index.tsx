'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import type { JSX } from 'react'
import { useEffect, useState } from 'react'

type FormStatusMessageProps = {
  isError?: boolean
  isSuccess?: boolean
  errorMessage?: string
  successMessage?: string
  className?: string
  autoHideDuration?: number
}

export function FormStatusMessage({
  isError = false,
  isSuccess = false,
  errorMessage = 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
  successMessage = 'Form başarıyla gönderildi!',
  className = '',
  autoHideDuration = 4000,
}: FormStatusMessageProps): JSX.Element | null {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (isSuccess || isError) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, autoHideDuration)

      return () => clearTimeout(timer)
    }
  }, [isSuccess, isError, autoHideDuration])

  if (!isSuccess && !isError) {
    return null
  }

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute -bottom-16 right-0',
            'text-center font-primary text-sm leading-[1.35] xl:text-left xl:text-lg',
            'mt-8 w-full xl:w-[35%]',
            className
          )}
        >
          {isError && <p className='text-tangerine-flake'>{errorMessage}</p>}
          {isSuccess && <p className='text-white'>{successMessage}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
