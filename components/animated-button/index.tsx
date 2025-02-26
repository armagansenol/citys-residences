"use client"

import s from "./animated-button.module.css"

import cn from "clsx"
import { ArrowRight } from "lucide-react"
import { MotionProps, motion } from "motion/react"
import { useState } from "react"

interface AnimatedButtonProps {
  size?: "sm" | "md" | "lg"
  text: string
  theme?: "primary" | "secondary" | "tertiary"
}

export function AnimatedButton({ size = "md", text = "Button Text", theme = "primary" }: AnimatedButtonProps) {
  const [isOn, setIsOn] = useState(false)
  const toggleSwitch = () => setIsOn(!isOn)

  const transition: MotionProps["transition"] = {
    type: "tween",
    duration: 0.4,
    ease: [0.785, 0.135, 0.15, 0.86],
  }

  const themes = {
    primary: {
      textColor: "--white",
      textHoverColor: "--bricky-brick",
      bgColorClassName: "blur-bg-white",
      bgHoverColorClassName: "blur-bg-bricky-brick",
    },
    secondary: {
      textColor: "--bricky-brick",
      textHoverColor: "--white",
      bgColorClassName: "bg-white",
      bgHoverColorClassName: "bg-bricky-brick",
    },
    tertiary: {
      textColor: "--white",
      textHoverColor: "--white",
      bgColorClassName: "blur-bg-bricky-brick",
      bgHoverColorClassName: "bg-transparent",
    },
  }

  return (
    <span
      className={cn(s.button, themes[theme].bgColorClassName, "test flex items-center justify-center cursor-pointer", {
        [s.sm]: size === "sm",
        [s.md]: size === "md",
        [s.lg]: size === "lg",
      })}
      onMouseEnter={toggleSwitch}
      onMouseLeave={toggleSwitch}
    >
      <span
        className={cn("relative w-full h-full flex items-center", {
          "justify-center": isOn,
          "justify-start": !isOn,
        })}
      >
        {/* text */}
        <motion.span
          className={cn("z-20 relative")}
          initial={{
            color: `var(${themes[theme].textColor})`,
          }}
          animate={{
            color: isOn ? `var(${themes[theme].textHoverColor})` : `var(${themes[theme].textColor})`,
          }}
          layout
          transition={transition}
        >
          {/* icon left */}
          <span
            className={cn(
              s.iconC,
              "absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full flex items-center justify-center flex-shrink-0 z-20"
            )}
          >
            <motion.span
              className="block"
              initial={{
                color: `var(${themes[theme].textHoverColor})`,
                x: "-600%",
              }}
              animate={{
                x: isOn ? 0 : "-600%",
              }}
              transition={{
                ...transition,
                duration: 0.4,
              }}
            >
              <ArrowRight className={cn(s.icon)} />
            </motion.span>
          </span>
          {text}
        </motion.span>
      </span>
      {/* background */}
      <motion.span
        className={cn(
          s["bg"],
          themes[theme].bgHoverColorClassName,
          "absolute block w-full h-full translate-y-full z-10"
        )}
        initial={{
          y: "100%",
        }}
        animate={{
          y: isOn ? 0 : "100%",
        }}
        transition={transition}
      ></motion.span>
      {/* icon right */}
      <motion.span
        className={cn(
          s.iconC,
          "absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center flex-shrink-0"
        )}
      >
        <motion.span
          className="block"
          initial={{
            color: `var(${themes[theme].textColor})`,
          }}
          animate={{
            x: isOn ? "200%" : 0,
          }}
          transition={transition}
        >
          <ArrowRight className={cn(s.icon)} />
        </motion.span>
      </motion.span>
    </span>
  )
}
