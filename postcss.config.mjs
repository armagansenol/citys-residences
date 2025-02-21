import { breakpoints as _breakpoints, screens } from "./styles/config.mjs"

const validatePixels = (pixels, dimension) => {
  const numPixels = Number.parseFloat(pixels)
  if (Number.isNaN(numPixels)) {
    throw new Error(`Invalid pixel value: ${pixels}`)
  }
  if (screens[dimension].width === 0 || screens[dimension].height === 0) {
    throw new Error(`Screen ${dimension} dimensions cannot be zero`)
  }
  return numPixels
}

/** @type {import('postcss-load-config').Config} */

const config = {
  plugins: {
    tailwindcss: {},
    "postcss-import": {},
    "postcss-extend-rule": {},
    "postcss-easy-z": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
      features: {
        "custom-properties": false,
      },
    },
    "postcss-nesting": {},
    "postcss-include-media": {
      breakpoints: {
        bm: `${_breakpoints.breakpointMobile}px`,
        bt: `${_breakpoints.breakpointTablet}px`,
      },
      mediaExpressions: {
        hover: "(hover: hover)",
        mobile: `(max-width: ${_breakpoints.breakpointMobile - 1}px)`,
        tablet: `(min-width: ${_breakpoints.breakpointMobile}px) and (max-width: ${
          _breakpoints.breakpointTablet - 1
        }px)`,
        desktop: `(min-width: ${_breakpoints.breakpointTablet}px)`,
        "reduced-motion": "(prefers-reduced-motion: reduce)",
      },
    },
    "postcss-functions": {
      functions: {
        position: (...args) => {
          const [type, top, right, bottom, left] = args
          return `
            position: ${type};
            top: ${top};
            right: ${right};
            bottom: ${bottom};
            left: ${left};
          `.trim()
        },
        "mobile-vw": (pixels) => {
          const numPixels = validatePixels(pixels, "mobile")
          return `${(numPixels * 100) / screens.mobile.width}vw`
        },
        "mobile-vh": (pixels) => {
          const numPixels = validatePixels(pixels, "mobile")
          const vh = `${(numPixels * 100) / screens.mobile.height}`
          return `clamp(${vh}vh, ${vh}svh, ${vh}dvh)`
        },
        "tablet-vw": (pixels) => {
          const numPixels = validatePixels(pixels, "tablet")
          return `${(numPixels * 100) / screens.tablet.width}vw`
        },
        "tablet-vh": (pixels) => {
          const numPixels = validatePixels(pixels, "tablet")
          const vh = `${(numPixels * 100) / screens.tablet.height}`
          return `clamp(${vh}vh, ${vh}svh, ${vh}dvh)`
        },
        "desktop-vw": (pixels) => {
          const numPixels = validatePixels(pixels, "desktop")
          return `${(numPixels * 100) / screens.desktop.width}vw`
        },
        "desktop-vh": (pixels) => {
          const numPixels = validatePixels(pixels, "desktop")
          return `${(numPixels * 100) / screens.desktop.height}svh`
        },
        dims: (width, height) => {
          const h = height || width
          return `width: ${width}; height: ${h};`
        },
      },
    },
    "postcss-sort-media-queries": {},
    "postcss-combine-duplicated-selectors": {},
    cssnano: process.env.NODE_ENV === "production" ? {} : false,
  },
}

export default config
