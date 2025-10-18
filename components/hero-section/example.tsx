import { HeroSection } from "./index"
import { LogoSlim } from "@/components/icons"

// Example usage of the HeroSection component
export function HeroSectionExample() {
  const handleVideoClick = () => {
    console.log("Video clicked!")
    // Handle video play logic here
  }

  return (
    <HeroSection
      // Logo configuration
      logo={<LogoSlim fill='white' className='w-12 h-12 lg:w-16 lg:h-16' />}
      logoPosition='top-left'
      // Main text content
      mainText='Karma kullanım modeliyle zamanı geri veriyoruz: yaşa, çalış, eğlen—tek ekosistem içinde.'
      mainTextPosition='left'
      // Video configuration
      videoThumbnail='/img/cityscape-night.jpg' // Replace with actual image path
      videoTitle="CITY'S"
      onVideoClick={handleVideoClick}
      // Person configuration
      personImage='/img/murat-kader.jpg' // Replace with actual image path
      personName='Murat Kader'
      personTitle='Yüksek Mimar'
      // Sidebar configuration
      sidebarText='Mimari Proje'
      sidebarIcon={
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' style={{ color: "white" }}>
          <path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' />
        </svg>
      }
      // Styling
      backgroundColor='#b73d25' // bricky-brick color
      textColor='#ffffff'
      // Animation settings
      enableAnimations={true}
      animationDelay={0}
    />
  )
}

// Alternative minimal usage example
export function HeroSectionMinimal() {
  return (
    <HeroSection mainText='Your custom text here' personName='John Doe' personTitle='Architect' sidebarText='Project' />
  )
}

// Custom styling example
export function HeroSectionCustom() {
  return (
    <HeroSection
      mainText='Custom styled hero section'
      backgroundColor='#2c3e50'
      textColor='#ecf0f1'
      className='border-t-4 border-blue-500'
      enableAnimations={false}
    />
  )
}
