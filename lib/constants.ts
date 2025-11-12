import { routing, type Locale, type Pathnames } from '@/i18n/routing'

export const baseUrl = 'citysresidences.com'
export const initialScroll = true

export const countryPhoneCodes = {
  en: [
    { name: 'Argentina', code: '+54' },
    { name: 'Australia', code: '+61' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Brazil', code: '+55' },
    { name: 'Canada', code: '+1' },
    { name: 'China', code: '+86' },
    { name: 'Egypt', code: '+20' },
    { name: 'France', code: '+33' },
    { name: 'Germany', code: '+49' },
    { name: 'India', code: '+91' },
    { name: 'Indonesia', code: '+62' },
    { name: 'Italy', code: '+39' },
    { name: 'Japan', code: '+81' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Mexico', code: '+52' },
    { name: 'Nigeria', code: '+234' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Philippines', code: '+63' },
    { name: 'Russia', code: '+7' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Singapore', code: '+65' },
    { name: 'South Africa', code: '+27' },
    { name: 'South Korea', code: '+82' },
    { name: 'Spain', code: '+34' },
    { name: 'Thailand', code: '+66' },
    { name: 'Turkey', code: '+90' },
    { name: 'United Arab Emirates', code: '+971' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'United States', code: '+1' },
    { name: 'Vietnam', code: '+84' },
  ],
  tr: [
    { name: 'Almanya', code: '+49' },
    { name: 'Amerika Birleşik Devletleri', code: '+1' },
    { name: 'Arjantin', code: '+54' },
    { name: 'Avustralya', code: '+61' },
    { name: 'Bangladeş', code: '+880' },
    { name: 'Birleşik Arap Emirlikleri', code: '+971' },
    { name: 'Birleşik Krallık', code: '+44' },
    { name: 'Brezilya', code: '+55' },
    { name: 'Çin', code: '+86' },
    { name: 'Endonezya', code: '+62' },
    { name: 'Filipinler', code: '+63' },
    { name: 'Fransa', code: '+33' },
    { name: 'Güney Afrika', code: '+27' },
    { name: 'Güney Kore', code: '+82' },
    { name: 'Hindistan', code: '+91' },
    { name: 'İspanya', code: '+34' },
    { name: 'İtalya', code: '+39' },
    { name: 'Japonya', code: '+81' },
    { name: 'Kanada', code: '+1' },
    { name: 'Malezya', code: '+60' },
    { name: 'Meksika', code: '+52' },
    { name: 'Mısır', code: '+20' },
    { name: 'Nijerya', code: '+234' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Rusya', code: '+7' },
    { name: 'Singapur', code: '+65' },
    { name: 'Suudi Arabistan', code: '+966' },
    { name: 'Tayland', code: '+66' },
    { name: 'Türkiye', code: '+90' },
    { name: 'Vietnam', code: '+84' },
  ],
}

export const citysIstanbulAvmGoogleMaps =
  'https://maps.app.goo.gl/2hSJUsgo2U198Kqq9'

// Navigation metadata for routes that should appear in navigation
// Keys MUST exist in routing.pathnames (type-safe!)
export type NavigationMetadata = {
  title: string
  titleKey: string
  href: string
  id: string
  order: number
  mainRoute: boolean
  isOnSidebar: boolean
  sections?: {
    [key: string]: {
      label: string
      id: string
    }
  }
}

// Only define metadata for routes that should appear in navigation
type NavigationConfigItem = {
  titleKey: string
  id: string
  order: number
  mainRoute: boolean
  isOnSidebar: boolean
  disabled: boolean
}

export const navigationConfig: Record<string, NavigationConfigItem> = {
  '/': {
    titleKey: 'navigation.home',
    id: 'home',
    order: 1,
    mainRoute: true,
    isOnSidebar: true,
    disabled: false,
  },
  '/project': {
    titleKey: 'navigation.project',
    id: 'project',
    order: 2,
    mainRoute: true,
    isOnSidebar: true,
    disabled: false,
  },
  '/location': {
    titleKey: 'navigation.location',
    id: 'location',
    order: 3,
    mainRoute: true,
    isOnSidebar: false,
    disabled: true,
  },
  '/residences': {
    titleKey: 'navigation.residences',
    id: 'residences',
    order: 4,
    mainRoute: true,
    isOnSidebar: true,
    disabled: false,
  },
  '/citys-park': {
    titleKey: 'navigation.citysPark',
    id: 'citys-park',
    order: 5,
    mainRoute: false,
    isOnSidebar: true,
    disabled: false,
  },
  '/citys-members-club': {
    titleKey: 'navigation.citysMembersClub',
    id: 'citys-members-club',
    order: 6,
    mainRoute: false,
    isOnSidebar: true,
    disabled: false,
  },
  '/citys-living': {
    titleKey: 'navigation.citysLiving',
    id: 'citys-living',
    order: 7,
    mainRoute: false,
    isOnSidebar: true,
    disabled: false,
  },
  '/citys-psm': {
    titleKey: 'navigation.citysPsm',
    id: 'citys-psm',
    order: 8,
    mainRoute: false,
    isOnSidebar: false,
    disabled: true,
  },
  '/citys-times': {
    titleKey: 'navigation.citysTimes',
    id: 'citys-times',
    order: 10,
    mainRoute: false,
    isOnSidebar: false,
    disabled: false,
  },
  '/citys-istanbul-avm': {
    titleKey: 'navigation.citysIstanbulAvm',
    id: 'citys-istanbul-avm',
    order: 9,
    mainRoute: false,
    isOnSidebar: true,
    disabled: false,
  },
}

// Get routes that should appear in navigation
function getNavigationRoutes() {
  return Object.entries(navigationConfig)
    .filter(([, config]) => config !== undefined)
    .map(([routeKey, config]) => ({
      routeKey: routeKey as Pathnames,
      titleKey: config!.titleKey,
      id: config!.id,
      order: config!.order,
      mainRoute: config!.mainRoute,
      isOnSidebar: config!.isOnSidebar,
      disabled: config!.disabled,
    }))
    .sort((a, b) => a.order - b.order)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNavigationItems = (t: (key: any) => string, locale: Locale) =>
  getNavigationRoutes().map(item => ({
    title: t(item.titleKey),
    titleKey: item.titleKey,
    href: getLocalizedPath(item.routeKey, locale),
    id: item.id,
    order: item.order,
    mainRoute: item.mainRoute,
    isOnSidebar: item.isOnSidebar,
    disabled: item.disabled,
  }))

export const getNavigationItem = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: any) => string,
  locale: Locale
) => {
  const item = getNavigationRoutes().find(navItem => navItem.id === id)
  if (!item) return null

  return {
    title: t(item.titleKey),
    href: getLocalizedPath(item.routeKey, locale),
    id: item.id,
  }
}

// Helper function to get localized path from routing configuration
function getLocalizedPath(routeKey: Pathnames, locale: Locale): string {
  const pathConfig = routing.pathnames[routeKey]

  // Fallback in case a routeKey is missing from routing.pathnames
  if (!pathConfig) {
    return routeKey
  }

  if (typeof pathConfig === 'string') {
    return pathConfig
  }

  return pathConfig[locale] || pathConfig[routing.defaultLocale]
}

// Menu media configuration for navigation items

function calculateRatio(width: number, height: number): number {
  const ratio = Number((width / height).toFixed(2))
  return ratio
}

export type Media = {
  name: string
  aspect: () => number
  mediaId: string
  muxSrc?: string
  thumbnail?: string
}

export const heroVideo: Media = {
  name: 'hero',
  aspect: () => {
    return calculateRatio(16, 9)
  },
  mediaId: 'e2tew1zhxj',
  muxSrc: 'xFW02Bl3KwJGCzmUUbAwE5NC5WJW01hIqmm7heGEYx2NM',
  thumbnail:
    'https://image.mux.com/xFW02Bl3KwJGCzmUUbAwE5NC5WJW01hIqmm7heGEYx2NM/thumbnail.webp?width=1920&time=0',
}

export const livePeacefully: Media = {
  name: 'daha huzurlu yaşa',
  aspect: () => {
    return calculateRatio(1280, 852)
  },
  mediaId: 'dxd0f32sha',
  muxSrc: 'y1KN58bThKtP2SOOn8wNl27K3nx01RbSvIcWB3lFycug',
  thumbnail:
    'https://image.mux.com/y1KN58bThKtP2SOOn8wNl27K3nx01RbSvIcWB3lFycug/thumbnail.webp?width=1920&time=0',
}

export const liveMore: Media = {
  name: 'daha dolu yaşa',
  aspect: () => {
    return calculateRatio(1920, 1198)
  },
  mediaId: 'cpkxfmdyvb',
  muxSrc: 'Qj00KNCUeq1hO00Ad2Xk402XRGm8ekmqNfsGOamzsVVcQ00',
  thumbnail:
    'https://image.mux.com/Qj00KNCUeq1hO00Ad2Xk402XRGm8ekmqNfsGOamzsVVcQ00/thumbnail.webp?width=1920&time=0',
}

export const projectBanner: Media = {
  name: 'proje banner',
  aspect: () => {
    return calculateRatio(1920, 896)
  },
  mediaId: 'p4l0a63nut',
  muxSrc: 'fWSlJj9pskvE7rWRKuNLVIY2vQyAOD02NFSNdPwpDLuE',
  thumbnail:
    'https://image.mux.com/fWSlJj9pskvE7rWRKuNLVIY2vQyAOD02NFSNdPwpDLuE/thumbnail.webp?width=1920&time=0',
}

export const residencesBanner: Media = {
  name: 'daireler banner',
  aspect: () => {
    return calculateRatio(1920, 1088)
  },
  mediaId: '4g5plgua2p',
  muxSrc: 'cSjhDoPNBkNtVNwRuAvtWKE9BbGko7zA2Db5FR2oRq4',
  thumbnail:
    'https://image.mux.com/cSjhDoPNBkNtVNwRuAvtWKE9BbGko7zA2Db5FR2oRq4/thumbnail.webp?width=1920&time=0',
}
export const citysIstanbulAvmBanner: Media = {
  name: 'citys istanbul avm banner',
  aspect: () => {
    return calculateRatio(1920, 1026)
  },
  mediaId: 'a5b5zn9o9x',
  muxSrc: 'shU3xvk8cSjG1S3PJaTeSs9LOogQ301jz8JYJ6F5600to',
  thumbnail:
    'https://image.mux.com/shU3xvk8cSjG1S3PJaTeSs9LOogQ301jz8JYJ6F5600to/thumbnail.webp?width=1920&time=0',
}
export const citysTimesBanner: Media = {
  name: 'citys times banner',
  aspect: () => {
    return calculateRatio(1920, 848)
  },
  mediaId: 'luxxfpk3x3',
  muxSrc: 'NB02x73haYbyN18zmvgUntrAutAeqhWaZGf8gkUYUkmA',
  thumbnail:
    'https://image.mux.com/NB02x73haYbyN18zmvgUntrAutAeqhWaZGf8gkUYUkmA/thumbnail.webp?width=1920&time=0',
}

export const scrollDelay = 0.2

export const menuMedia = {
  home: {
    src: 't02RQRZKvwDfeT4fx8geKsf2DJbYycekKIfuNVlN5Pxg',
    type: 'video',
    aspect: () => {
      return calculateRatio(960, 448)
    },
  },
  project: {
    src: '6e1qY5YeSpFR5OMpJ1QlA6yClBrZ9OMIFsFsxD01UQeQ',
    type: 'video',
    aspect: () => {
      return calculateRatio(640, 366)
    },
  },
  location: {
    src: '/img/menu/map.jpg',
    type: 'image',
  },
  residences: {
    src: 'BXqqdjWdoD43nAxkBRFYXyxrYhjlAhoF3la4FVKWO5E',
    type: 'video',
    aspect: () => {
      return calculateRatio(960, 444)
    },
  },
  'citys-park': {
    src: '/img/menu/citys-park.jpg',
    type: 'image',
  },
  'citys-members-club': {
    src: '/img/menu/citys-members-club.jpg',
    type: 'image',
  },
  'citys-living': {
    src: '/img/menu/citys-living.jpg',
    type: 'image',
  },
  'citys-psm': {
    src: 'nOlgN01VRX02T6miPEV9yI01KaJT4VG7vxSKIbw9nEIsEw',
    type: 'video',
    aspect: () => {
      return calculateRatio(640, 400)
    },
  },
  'citys-istanbul-avm': {
    src: '/img/menu/citys-istanbul-avm.jpg',
    type: 'image',
  },
  'citys-times': {
    src: '/img/menu/citys-times.jpg',
    type: 'image',
  },
}

// Get menu text key from item ID
export const getMenuTextKey = (itemId: string): string => {
  const keyMap: Record<string, string> = {
    home: 'home',
    project: 'project',
    location: 'location',
    residences: 'residences',
    'citys-park': 'citysPark',
    'citys-members-club': 'citysMembersClub',
    'citys-living': 'citysLiving',
    'citys-psm': 'citysPsm',
    'citys-istanbul-avm': 'citysIstanbulAvm',
    'citys-times': 'citysTimes',
  }
  return keyMap[itemId] || itemId
}
