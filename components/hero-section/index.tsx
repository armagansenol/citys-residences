import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { GsapSplitText } from "../gsap-split-text"
import { Img } from "../utility/img"

export interface HeroSectionProps {
  // Logo props
  logo?: React.ReactNode
  logoPosition?: "top-left" | "top-center" | "top-right"

  // Text content props
  mainText: string
  mainTextPosition?: "left" | "center" | "right"

  // Video props
  videoThumbnail?: string
  videoTitle?: string
  onVideoClick?: () => void

  // Person props
  personImage?: string
  personName?: string
  personTitle?: string

  // Sidebar props
  sidebarText?: string
  sidebarIcon?: React.ReactNode

  // Styling props
  backgroundColor?: string
  textColor?: string
  className?: string

  // Animation props
  enableAnimations?: boolean
  animationDelay?: number
}

export function HeroSection({
  logo,
  logoPosition = "top-left",
  mainText,
  mainTextPosition = "left",
  videoThumbnail,
  videoTitle,
  onVideoClick,
  personImage,
  personName,
  personTitle,
  sidebarText = "Mimari Proje",
  sidebarIcon,
  backgroundColor = colors["bricky-brick"],
  textColor = colors.white,
  className,
  enableAnimations = true,
  animationDelay = 0,
}: HeroSectionProps) {
  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden", className)} style={{ backgroundColor }}>
      {/* Background */}
      <div className='absolute inset-0 w-full h-full' style={{ backgroundColor }} />

      {/* Logo Section */}
      {logo && (
        <FadeInOnScroll delay={animationDelay}>
          <div
            className={cn("absolute top-6 lg:top-8 z-10", {
              "left-6 lg:left-8": logoPosition === "top-left",
              "left-1/2 transform -translate-x-1/2": logoPosition === "top-center",
              "right-6 lg:right-8": logoPosition === "top-right",
            })}
          >
            {logo}
          </div>
        </FadeInOnScroll>
      )}

      {/* Main Content Grid */}
      <div className='relative z-10 h-screen grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 lg:p-8'>
        {/* Left Content - Main Text */}
        <div
          className={cn("flex flex-col justify-center lg:col-span-5", {
            "items-start": mainTextPosition === "left",
            "items-center": mainTextPosition === "center",
            "items-end": mainTextPosition === "right",
          })}
        >
          <FadeInOnScroll delay={animationDelay + 0.2}>
            <div
              className='text-2xl lg:text-3xl xl:text-4xl font-montserrat font-light leading-tight max-w-lg'
              style={{ color: textColor }}
            >
              {enableAnimations ? (
                <GsapSplitText splitBy='lines' stagger={0.1} duration={1}>
                  {mainText}
                </GsapSplitText>
              ) : (
                mainText
              )}
            </div>
          </FadeInOnScroll>
        </div>

        {/* Center Content - Video Thumbnail */}
        {videoThumbnail && (
          <div className='lg:col-span-4 flex items-center justify-center'>
            <FadeInOnScroll delay={animationDelay + 0.4}>
              <div className='relative group cursor-pointer' onClick={onVideoClick}>
                <div className='relative w-full max-w-md lg:max-w-lg aspect-video overflow-hidden rounded-lg shadow-2xl'>
                  <Img
                    src={videoThumbnail}
                    alt={videoTitle || "Video thumbnail"}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                    fill
                  />

                  {/* Play Button Overlay */}
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300'>
                    <div className='w-16 h-16 lg:w-20 lg:h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg'>
                      <div
                        className='w-0 h-0 border-l-[12px] lg:border-l-[16px] border-l-current border-y-[8px] lg:border-y-[10px] border-y-transparent ml-1'
                        style={{ color: backgroundColor }}
                      />
                    </div>
                  </div>

                  {/* Video Title Overlay */}
                  {videoTitle && (
                    <div className='absolute bottom-4 left-4 right-4'>
                      <div
                        className='text-sm lg:text-base font-montserrat font-semibold px-3 py-2 rounded backdrop-blur-sm'
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          color: backgroundColor,
                        }}
                      >
                        {videoTitle}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        )}

        {/* Right Content - Person and Sidebar */}
        <div className='lg:col-span-3 flex flex-col justify-end items-end'>
          {/* Person Section */}
          {personImage && (
            <FadeInOnScroll delay={animationDelay + 0.6}>
              <div className='mb-6 lg:mb-8 text-right'>
                <div className='relative'>
                  <Img
                    src={personImage}
                    alt={personName || "Person"}
                    className='w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-lg shadow-lg grayscale hover:grayscale-0 transition-all duration-300'
                    fill
                  />
                </div>
                {(personName || personTitle) && (
                  <div className='mt-3 text-right'>
                    {personName && (
                      <div className='text-lg lg:text-xl font-montserrat font-semibold' style={{ color: textColor }}>
                        {personName}
                      </div>
                    )}
                    {personTitle && (
                      <div
                        className='text-sm lg:text-base font-montserrat font-light opacity-90'
                        style={{ color: textColor }}
                      >
                        {personTitle}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FadeInOnScroll>
          )}

          {/* Sidebar */}
          <FadeInOnScroll delay={animationDelay + 0.8}>
            <div className='flex flex-col items-center space-y-2'>
              {sidebarIcon && <div className='w-6 h-6 flex items-center justify-center'>{sidebarIcon}</div>}
              <div
                className='text-sm lg:text-base font-montserrat font-light tracking-wider writing-mode-vertical-rl text-orientation-mixed'
                style={{
                  color: textColor,
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                {sidebarText}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  )
}
