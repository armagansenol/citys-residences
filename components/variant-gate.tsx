import { isStandVariant } from '@/lib/variant'

type Props = { children: React.ReactNode }

export function HideOnStand({ children }: Props) {
  if (isStandVariant()) return null
  return <>{children}</>
}

export function ShowOnStand({ children }: Props) {
  if (!isStandVariant()) return null
  return <>{children}</>
}
