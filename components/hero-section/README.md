# HeroSection Component

A flexible and responsive hero section component that matches the layout from the provided design. Features a red-orange background with logo, main text, video thumbnail, person portrait, and sidebar elements.

## Features

- 🎨 **Customizable styling** with color props
- 📱 **Responsive design** for mobile, tablet, and desktop
- ✨ **GSAP animations** with fade-in effects
- 🎯 **Flexible layout** with customizable positioning
- 🖼️ **Video thumbnail** with play button overlay
- 👤 **Person section** with portrait and details
- 📋 **Sidebar** with vertical text and icon

## Props

### Required Props
- `mainText: string` - The main text content to display

### Optional Props

#### Logo
- `logo?: React.ReactNode` - Logo component to display
- `logoPosition?: "top-left" | "top-center" | "top-right"` - Logo position (default: "top-left")

#### Text Content
- `mainTextPosition?: "left" | "center" | "right"` - Text alignment (default: "left")

#### Video
- `videoThumbnail?: string` - URL/path to video thumbnail image
- `videoTitle?: string` - Title to display on video thumbnail
- `onVideoClick?: () => void` - Callback when video is clicked

#### Person
- `personImage?: string` - URL/path to person's portrait image
- `personName?: string` - Person's name
- `personTitle?: string` - Person's title/position

#### Sidebar
- `sidebarText?: string` - Text to display vertically (default: "Mimari Proje")
- `sidebarIcon?: React.ReactNode` - Icon to display above sidebar text

#### Styling
- `backgroundColor?: string` - Background color (default: bricky-brick #b73d25)
- `textColor?: string` - Text color (default: white #ffffff)
- `className?: string` - Additional CSS classes

#### Animation
- `enableAnimations?: boolean` - Enable/disable animations (default: true)
- `animationDelay?: number` - Animation delay in seconds (default: 0)

## Usage

### Basic Usage

```tsx
import { HeroSection } from "@/components/hero-section"

function MyPage() {
  return (
    <HeroSection
      mainText="Your main text here"
      personName="John Doe"
      personTitle="Architect"
    />
  )
}
```

### Full Featured Usage

```tsx
import { HeroSection } from "@/components/hero-section"
import { LogoSlim } from "@/components/icons"

function MyPage() {
  const handleVideoClick = () => {
    // Handle video play logic
    console.log("Video clicked!")
  }

  return (
    <HeroSection
      logo={<LogoSlim fill="white" className="w-16 h-16" />}
      logoPosition="top-left"
      
      mainText="Karma kullanım modeliyle zamanı geri veriyoruz: yaşa, çalış, eğlen—tek ekosistem içinde."
      mainTextPosition="left"
      
      videoThumbnail="/img/cityscape-night.jpg"
      videoTitle="CITY'S"
      onVideoClick={handleVideoClick}
      
      personImage="/img/murat-kader.jpg"
      personName="Murat Kader"
      personTitle="Yüksek Mimar"
      
      sidebarText="Mimari Proje"
      sidebarIcon={<DocumentIcon />}
      
      backgroundColor="#b73d25"
      textColor="#ffffff"
      
      enableAnimations={true}
      animationDelay={0}
    />
  )
}
```

## Styling

The component uses Tailwind CSS classes and supports custom styling through props. The layout is responsive and adapts to different screen sizes:

- **Mobile**: Single column layout with stacked elements
- **Tablet**: Improved spacing and sizing
- **Desktop**: Full grid layout with optimal positioning

## Dependencies

- `@/lib/utils` - For `cn` utility function
- `@/styles/config.mjs` - For color constants
- `@/components/animations/fade-in-on-scroll` - For fade-in animations
- `@/components/gsap-split-text` - For text animations

## Examples

See `example.tsx` for various usage examples including:
- Full featured implementation
- Minimal usage
- Custom styling
