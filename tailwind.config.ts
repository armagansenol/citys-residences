import type { Config } from "tailwindcss"

import aspectRatio from "@tailwindcss/aspect-ratio"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "360px",
        md: "640px",
        lg: "900px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
    extend: {
      gridTemplateColumns: {
        "24": "repeat(24, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "24": "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
        "span-21": "span 21 / span 21",
        "span-22": "span 22 / span 22",
        "span-23": "span 23 / span 23",
        "span-24": "span 24 / span 24",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bricky-brick": "var(--bricky-brick)",
      },
      fontFamily: {
        halenoir: ["var(--font-halenoir)"],
      },
    },
  },
  plugins: [aspectRatio],
}
export default config
