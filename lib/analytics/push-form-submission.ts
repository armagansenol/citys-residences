import { FormValues } from '@/components/form-contact'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export interface SelectOption {
  id: string
  label: string
}

export interface PushFormSubmissionOptions {
  residenceTypeOptions: SelectOption[]
  howDidYouHearAboutUsOptions: SelectOption[]
  contactPreferenceOptions: SelectOption[]
}

// Stable slugs agreed with SEO for analytics segmentation. Keyed by the
// option `id` (locale-independent), not the translated label.
const LEAD_SOURCE_SLUGS: Record<string, string> = {
  internetSocialMedia: 'sosyal_medya_dijital',
  billboard: 'acikhava',
  projectVisit: 'avm_stand_alani',
  reference: 'referans',
}

const CONTACT_PREFERENCE_SLUGS: Record<string, string> = {
  sms: 'sms_whatsapp',
  email: 'email',
  phone: 'telefon',
}

// Lowercase, transliterate Turkish characters and replace anything that is
// not [a-z0-9] with an underscore. "Türkiye" -> "turkiye", "İstanbul" -> "istanbul".
function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics (ş→s, ç→c, ğ→g, ü→u, ö→o, İ→I)
    .replace(/ı/g, 'i')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

// The multi-select fields store comma-joined translated labels. Map each label
// back to its option id so we can resolve a locale-independent slug.
function labelsToIds(value: string, options: SelectOption[]): string[] {
  if (!value) return []
  return value
    .split(',')
    .map(label => label.trim())
    .filter(Boolean)
    .map(label => options.find(opt => opt.label === label)?.id)
    .filter((id): id is string => Boolean(id))
}

function mapToSlugs(ids: string[], slugMap: Record<string, string>): string {
  return ids.map(id => slugMap[id] ?? slugify(id)).join(',')
}

// Build an E.164 phone number from the national number + dial code.
// The phone input uses `disableDialCodeAndPrefix`, so `phone` is the national
// number only and `countryCode` holds the dial code (e.g. "+90").
function toE164(phone: string, countryCode: string): string {
  const national = (phone || '').replace(/\D/g, '').replace(/^0+/, '')
  const cc = (countryCode || '').trim()
  const normalizedCc = cc.startsWith('+') ? cc : `+${cc.replace(/\D/g, '')}`
  if (!national) return ''
  return `${normalizedCc}${national}`
}

async function sha256Hex(value: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value)
  )
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Pushes a `form_submission` event to GTM's dataLayer after a successful
 * contact form submission. All values are read dynamically from the submitted
 * form data; email and phone are SHA-256 hashed before being sent.
 *
 * Must be called with the original submitted values (before form reset) and the
 * option lists so labels can be resolved back to their stable slugs.
 */
export async function pushFormSubmission(
  data: FormValues,
  options: PushFormSubmissionOptions
): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    const leadSourceIds = labelsToIds(
      data.howDidYouHearAboutUs,
      options.howDidYouHearAboutUsOptions
    )
    const contactPreferenceIds = labelsToIds(
      data.contactPreference,
      options.contactPreferenceOptions
    )

    const lead_source = mapToSlugs(leadSourceIds, LEAD_SOURCE_SLUGS)
    const contact_preference = mapToSlugs(
      contactPreferenceIds,
      CONTACT_PREFERENCE_SLUGS
    )

    // unit_type keeps the human-readable labels (e.g. "2+1,3+1") per SEO spec.
    const unit_type = (data.residenceType || '')
      .split(',')
      .map(label => label.trim())
      .filter(Boolean)
      .join(',')

    const user_country = slugify(data.country || '')
    const user_city = slugify(data.city || '')

    const normalizedEmail = (data.email || '').trim().toLowerCase()
    const e164Phone = toE164(data.phone, data.countryCode)

    const [emailHash, phoneHash] = await Promise.all([
      normalizedEmail ? sha256Hex(normalizedEmail) : Promise.resolve(''),
      e164Phone ? sha256Hex(e164Phone) : Promise.resolve(''),
    ])

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'form_submission',
      lead_source,
      contact_preference,
      unit_type,
      user_country,
      user_city,
      user_data: {
        email: emailHash,
        phone: phoneHash,
      },
    })
  } catch (error) {
    // Analytics must never break the success flow.
    console.error('Failed to push form_submission to dataLayer:', error)
  }
}
