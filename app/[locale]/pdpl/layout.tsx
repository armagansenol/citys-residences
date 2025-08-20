import { Header } from "@/components/header"
import { Wrapper } from "@/components/wrapper"
import * as React from "react"

export default function PdplLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <>
      <Header nonHome />
      <Wrapper>{children}</Wrapper>
    </>
  )
}
