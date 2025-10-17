import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PageTitle } from "@/components/page-title"
import { VideoWithText } from "@/components/video-with-text"
import { citysParkVideo } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"

export default function TestPage() {
  return (
    <div>
      <Header />
      <PageTitle
        className='bg-army-canvas'
        bgColor={colors["army-canvas"]}
        itemColor={colors.white}
        title="CITY'S PARK"
        description='Şehrin kalbinde, sizi yavaşlatan, yeşil bir vaha...'
        id='test'
      />
      <PageTitle
        bgColor={colors["bricky-brick"]}
        title='DAiRELER'
        description='Günlük yaşamın alışkanlıklarından, yıllara yayılan huzurlu anılara kadar her detay; evinizin size ait bir dünyaya dönüşmesi için tasarlandı.'
        id='test'
      />
      <VideoWithText
        primaryVideoUrl={citysParkVideo}
        title={
          <span>
            Daha<strong> huzurlu </strong>yaşa.
          </span>
        }
        description={
          <>
            Farklı ve zamansız mimarinin, doğanın cömertliği ile buluştuğu mekanlarda güven içinde, daha huzurlu yaşa.
          </>
        }
      />
      <PageTitle
        bgColor={colors["blue-shimmer"]}
        className='bg-blue-shimmer'
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>MEMBERS CLUB</span>
          </>
        }
        description='Sanat, spor ve sosyal ayrıcalıkların buluştuğu,özel bir yaşam alanı.'
        itemColor={colors.black}
        id='test'
      />
      <VideoWithText
        primaryVideoUrl={citysParkVideo}
        title={
          <span>
            Daha<strong> dolu </strong>yaşa.
          </span>
        }
        description={
          <>
            Spor, sanat, kültür, alışveriş, eğlence ve çok daha fazlasını bir araya getiren yeni bir yaşam dizaynı ile
            daha dolu yaşa.
          </>
        }
      />
      <PageTitle
        bgColor={colors["verve-violet"]}
        className='bg-verve-violet'
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>LIVING</span>
          </>
        }
        description='Artık her şey daha kolay.'
        itemColor={colors.white}
        id='test'
      />
      <HeroSection
        mainText='Gösteriş değil yaşam kalitesi: zamansız malzeme ve yalın detaylarla ‘gizli lüks’ kurduk.'
        videoThumbnail='/img/thumbnail-kolaj-video.jpg'
      />
      <PageTitle
        bgColor={colors["aqua-belt"]}
        className='bg-aqua-belt'
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>İSTANBUL AVM</span>
          </>
        }
        description='Sanat, spor ve sosyal ayrıcalıkların buluştuğu,özel bir yaşam alanı.'
        itemColor={colors.black}
        id='test'
      />
      <PageTitle
        bgColor={colors["trapped-darkness"]}
        className='bg-trapped-darkness'
        title="CITY'S TIMES"
        description='Bizi takip edin.'
        itemColor={colors.white}
        id='test'
      />

      <Footer />
    </div>
  )
}
