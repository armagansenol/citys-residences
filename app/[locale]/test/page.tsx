import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { PageTitle } from '@/components/page-title'
import {
  ComponentType,
  RepetitiveSectionsWrapper,
} from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { colors } from '@/styles/config.mjs'

export default function TestPage() {
  return (
    <div>
      <Header />
      <PageTitle
        primaryColor={colors['trapped-darkness']}
        secondaryColor={colors.white}
        title="CITY'S TIMES"
        description='Bizi takip edin.'
        id='citys-times'
      />
      <RepetitiveSectionsWrapper
        componentType={ComponentType.FullWidthSingleVideo}
        mediaId='p4l0a63nut'
        thumbnail='/img/thumbnail-kolaj-video.jpg'
      />
      <RepetitiveSectionsWrapper
        componentType={ComponentType.FullWidthVideoText}
        title='Dynamic Zone'
        subtitle='Hareket hiç bu kadar eğlenceli olmamıştı.'
        description='Dilediğiniz oyunu seçin, enerjinizi ortaya koyun! Padel, basketbol, masa tenisi ve golf simülatörüyle her gününüzü farklı bir heyecana dönüştürün. Arkadaşlarınızla kıyasıya rekabet, bol kahkahalı anlar ve sınırsız enerji… Dynamic Zone’da spor sadece bir aktivite değil, unutulmaz bir deneyim. Hazır mısınız? Çünkü burada her an bir oyuna dönüşüyor.'
        mediaId='p4l0a63nut'
      />
      <RepetitiveSectionsWrapper
        componentType={ComponentType.CenterVideoText}
        title='Dynamic Zone'
        subtitle='Hareket hiç bu kadar eğlenceli olmamıştı.'
        description='Dilediğiniz oyunu seçin, enerjinizi ortaya koyun! Padel, basketbol, masa tenisi ve golf simülatörüyle her gününüzü farklı bir heyecana dönüştürün. Arkadaşlarınızla kıyasıya rekabet, bol kahkahalı anlar ve sınırsız enerji… Dynamic Zone’da spor sadece bir aktivite değil, unutulmaz bir deneyim. Hazır mısınız? Çünkü burada her an bir oyuna dönüşüyor.'
        mediaId='p4l0a63nut'
      />
      <RepetitiveSectionsWrapper
        componentType={ComponentType.BackgroundVideoText}
        title='Dynamic Zone'
        subtitle='Hareket hiç bu kadar eğlenceli olmamıştı.'
        description='Dilediğiniz oyunu seçin, enerjinizi ortaya koyun! Padel, basketbol, masa tenisi ve golf simülatörüyle her gününüzü farklı bir heyecana dönüştürün. Arkadaşlarınızla kıyasıya rekabet, bol kahkahalı anlar ve sınırsız enerji… Dynamic Zone’da spor sadece bir aktivite değil, unutulmaz bir deneyim. Hazır mısınız? Çünkü burada her an bir oyuna dönüşüyor.'
        mediaId='p4l0a63nut'
      />
      <Footer />
    </div>
  )
}
