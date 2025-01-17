import { Header } from "@/components/header"

export async function MainLayout({
  children,
  headerVariant,
}: Readonly<{
  children: React.ReactNode
  headerVariant: "v1" | "v2"
}>) {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Header variant={headerVariant} />
      <div className="flex flex-col flex-1 with-bg overflow-hidden add-header-height">
        <main className="flex-1 min-h-[calc(100vh-var(--header-height))]">{children}</main>
      </div>
    </>
  )
}
