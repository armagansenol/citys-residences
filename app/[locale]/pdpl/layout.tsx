import * as React from 'react'

export default function PdplLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return <>{children}</>
}
