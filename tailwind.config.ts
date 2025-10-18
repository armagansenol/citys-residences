import type { Config } from "tailwindcss"

import aspectRatio from "@tailwindcss/aspect-ratio"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"
import { breakpoints, colors } from "./styles/config.mjs"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1680px",
      },
    },
    screens: {
      bt: `${breakpoints.breakpointMobile}px`,
      bd: `${breakpoints.breakpointTablet}px`,
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
      "3xl": "120rem",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: "1em",
              marginBottom: "1em",
            },
          },
        },
        "2xl": {
          css: {
            p: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
          },
        },
        // Add custom prose sizes with different paragraph spacing
        tight: {
          css: {
            p: {
              marginTop: "0.75em",
              marginBottom: "0.75em",
            },
          },
        },
        loose: {
          css: {
            p: {
              marginTop: "2em",
              marginBottom: "2em",
            },
          },
        },
      },
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
        "col-start-1": "col-start 1",
        "col-start-2": "col-start 2",
        "col-start-3": "col-start 3",
        "col-start-4": "col-start 4",
        "col-start-5": "col-start 5",
        "col-start-6": "col-start 6",
        "col-start-7": "col-start 7",
        "col-start-8": "col-start 8",
        "col-start-9": "col-start 9",
        "col-start-10": "col-start 10",
        "col-start-11": "col-start 11",
        "col-start-12": "col-start 12",
        "col-start-13": "col-start 13",
        "col-start-14": "col-start 14",
        "col-start-15": "col-start 15",
        "col-start-16": "col-start 16",
        "col-start-17": "col-start 17",
        "col-start-18": "col-start:18",
        "col-start-19": "col-start 19",
        "col-start-20": "col-start 20",
        "col-start-21": "col-start 21",
        "col-start-22": "col-start 22",
        "col-start-23": "col-start 23",
        "col-start-24": "col-start 24",
        "col-end-1": "col-end 1",
        "col-end-2": "col-end 2",
        "col-end-3": "col-end 3",
        "col-end-4": "col-end 4",
        "col-end-5": "col-end 5",
        "col-end-6": "col-end 6",
        "col-end-7": "col-end 7",
        "col-end-8": "col-end 8",
        "col-end-9": "col-end 9",
        "col-end-10": "col-end 10",
        "col-end-11": "col-end 11",
        "col-end-12": "col-end 12",
        "col-end-13": "col-end 13",
        "col-end-14": "col-end 14",
        "col-end-15": "col-end 15",
        "col-end-16": "col-end 16",
        "col-end-17": "col-end 17",
        "col-end-18": "col-end 18",
        "col-end-19": "col-end 19",
        "col-end-20": "col-end 20",
        "col-end-21": "col-end 21",
        "col-end-22": "col-end 22",
        "col-end-23": "col-end 23",
        "col-end-24": "col-end 24",
      },
      colors: {
        "bricky-brick-light": "rgba(183, 61, 37, 0.25)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        ...colors,
      },
      fontFamily: {
        halenoir: "var(--font-halenoir)",
        montserrat: "var(--font-montserrat)",
        "suisse-intl": "var(--font-suisse-intl)",
        "aktiv-grotesk": "var(--font-aktiv-grotesk)",
        "montagu-slab": "var(--font-montagu-slab)",
        primary: "var(--font-suisse-intl)",
        copperplate: "var(--font-copperplate)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        svh: "var(--svh-calc)",
        lvh: "var(--lvh-calc)",
      },
      minHeight: {
        svh: "var(--svh-calc)",
        lvh: "var(--lvh-calc)",
      },
      maxHeight: {
        svh: "var(--svh-calc)",
        lvh: "var(--lvh-calc)",
      },
      backgroundImage: {
        "gradient-appointment": "linear-gradient(135deg, #E65A2E 0%, #99170F 50.29%, #320201 100.58%)",
        "gradient-appointment-reversed": "linear-gradient(-45deg, #E65A2E 0%, #99170F 50.29%, #320201 100.58%)",
        "gradient-orange": "linear-gradient(315deg, #FA8773 0%, #E1533B 100%)",
      },
    },
  },
  plugins: [aspectRatio, animate, typography],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
export default config
