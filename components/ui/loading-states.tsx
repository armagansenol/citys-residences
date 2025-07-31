import { ReactNode } from "react"

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export function LoadingSpinner({ message = "Yükleniyor...", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bricky-brick mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  title?: string
  message?: string
  className?: string
}

export function ErrorMessage({
  title = "Hata oluştu",
  message = "Bilinmeyen hata",
  className = "",
}: ErrorMessageProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <p className="text-red-600 mb-2">{title}</p>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
  children?: ReactNode
}

export function LoadingOverlay({ message = "Filtreleme yapılıyor...", children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bricky-brick mx-auto mb-4"></div>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}
