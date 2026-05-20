import 'server-only'

import { headers } from 'next/headers'

export type Variant = 'default' | 'stand'

export const STAND_HOSTNAME = 'stand.citysresidences.com'

export function isStandHost(hostname: string | null | undefined): boolean {
  if (!hostname) return false
  return hostname.toLowerCase().split(':')[0] === STAND_HOSTNAME
}

export function getVariant(): Variant {
  // Local-dev / preview override. Set VARIANT=stand in .env.local to preview the trimmed build.
  const override = process.env.VARIANT
  if (override === 'stand') return 'stand'
  if (override === 'default') return 'default'

  const host = headers().get('host')
  return isStandHost(host) ? 'stand' : 'default'
}

export function isStandVariant(): boolean {
  return getVariant() === 'stand'
}
