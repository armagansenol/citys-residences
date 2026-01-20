import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { PhoneNumberUtil } from 'google-libphonenumber'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUtmParameter = (param: string) => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param) || ''
  }
  return ''
}

const phoneUtil = PhoneNumberUtil.getInstance()

export const isPhoneValid = (phone: string, countryCode?: string) => {
  try {
    if (!phone || phone.trim() === '') return false
    if (countryCode) {
      // If country code is provided, we can validate more specifically
      // but parseAndKeepRawInput handles both + prefixed and local numbers if country is known
      return phoneUtil.isValidNumber(
        phoneUtil.parseAndKeepRawInput(phone, countryCode.startsWith('+') ? undefined : countryCode)
      )
    }
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch {
    return false
  }
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function toAllUppercase(str: string): string {
  return str.toUpperCase()
}

/**
 * Generates a canonical URL for a given pathname
 * @param pathname - The pathname (e.g., '/tr', '/en/citys-dna')
 * @param baseUrl - The base URL (default: 'https://www.citysresidences.com')
 * @returns The full canonical URL
 */
export function generateCanonicalUrl(
  pathname: string,
  baseUrl: string = 'https://www.citysresidences.com'
): string {
  // Remove trailing slash except for root paths
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname
  return `${baseUrl}${normalizedPath}`
}
