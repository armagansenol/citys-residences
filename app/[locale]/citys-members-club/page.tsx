import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysMembersClubLogo, IconCitysParkBgLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { membersClubVideo } from "@/lib/constants"

export default function Page() {
  const sportsAndHealth = {
    title: "Spor ve Sağlık",
    items: [
      {
        title: "Kapalı Yüzme Havuzu",
        subtitle: "Her mevsim kendi ritminde",
        description:
          "Isı kontrollü, ileri filtre sistemine sahip kapalı yüzme havuzu; sabah sporundan akşam rahatlamasına günün her anına eşlik eder.",
        url: ["/img/members-club/01/01.jpg"],
      },
      {
        title: "Spor Kulübü",
        subtitle: "Konforlu alan, profesyonel tempo",
        description:
          "Modern ekipmanlarla donatılmış, hem bireysel antrenmanlara hem de rutin takibe uygun kapsamlı spor alanı",
        url: ["/img/members-club/01/02.jpg"],
      },
      {
        title: "Spa & Wellness",
        subtitle: "Dinlenmek de bir alışkanlık olabilir",
        description:
          "Sauna, buhar odası ve masaj alanlarını içeren wellness bölümü; beden kadar zihni de rahatlatmak için kurgulandı.",
        url: ["/img/members-club/01/03.jpg"],
      },
      {
        title: "Hamam",
        subtitle: "Zamansız bir ritüelin yeniden yorumu",
        description: "Yüzyıllardır süregelen bir ritüelin izinde; su, buhar ve sessizlikle bedenin hafifliğini hisset.",
        url: ["/img/members-club/01/10.jpg"],
      },
      {
        title: "Sauna",
        subtitle: "Sıcaklığın içsel bir dengeye dönüştüğü alan",
        description:
          "Doğal dokularla şekillenen zarif bir denge içinde tasarlanan sauna, bedenin fazlalıklardan arınmasını ve zihnin hafiflemesini destekler.",
        url: ["/img/members-club/01/11.jpg"],
      },
      {
        title: "Basketbol Sahası",
        subtitle: "Sınırlar içinde özgürlük",
        description: "Tam ölçülerde tasarlanmış, bireysel antrenman veya dostça oyunlar için açık basketbol sahası.",
        url: ["/img/members-club/01/04.jpg"],
      },
      {
        title: "Padel Tenis Kortu",
        subtitle: "Yeni nesil oyuna özel alan",
        description: "Aydınlatmalı padel kortu, sosyalleşmenin en dinamik yollarından birine ev sahipliği yapıyor.",
        url: ["/img/members-club/01/05.jpg"],
      },
      {
        title: "Golf Simülatör Sahası",
        subtitle: "Şehre rağmen sahadasınız",
        description:
          "Yüksek hassasiyetli sistemlerle donatılmış iç mekân golf deneyimi; bireysel gelişim ve keyifli anlar için.",
        url: ["/img/members-club/01/06.jpg"],
      },
      {
        title: "Masa Tenisi",
        subtitle: "Kısa oyun, uzun sohbet",
        description: "Rahatça erişilebilen masa tenisi alanı, gündelik hareket ve spontane rekabet için tasarlandı.",
        url: ["/img/members-club/01/07.jpg"],
      },
      {
        title: "Yoga Stüdyosu",
        subtitle: "Dinginlik için ayrılmış bir alan",
        description: "Doğal ışıkla beslenen yoga stüdyosu; nefesin ve hareketin uyumuna zemin hazırlıyor.",
        url: ["/img/members-club/01/08.jpg"],
      },
      {
        title: "Pilates Stüdyosu",
        subtitle: "Her duruşun bir çizgisi, her çizginin bir dengesi var",
        description:
          "Pilates Stüdyosu, her hareketin merkezinde dengeyi arar. Alan, akışa eşlik eden ışık ve dinginlikle kendi ritmini kurar. Her seans, hareketle mekân arasında kurulan sessiz bir uyumdan doğar.",
        url: ["/img/members-club/01/09.jpg"],
      },
    ],
  }

  const eventsAndEntertainment = {
    title: "Etkinlik & Eğlence",
    items: [
      {
        title: "Meditasyon Odası",
        subtitle: "Sessizliği planladık",
        description: "Dış uyaranlardan izole edilmiş, içe dönüşe alan tanıyan akustik düzenlemeli meditasyon odası.",
        url: ["/img/members-club/02/01.jpg"],
      },
      {
        title: "Özel Sinema Salonu",
        subtitle: "Filmi paylaşmak, deneyimi derinleştirir",
        description: "Yüksek çözünürlüklü görüntü ve çevresel ses sistemiyle donatılmış özel sinema alanı.",
        url: ["/img/members-club/02/02.jpg"],
      },
      {
        title: "Yemek Atölyesi",
        subtitle: "Lezzet paylaşılırsa çoğalır",
        description:
          "Kapsamlı mutfak altyapısı sayesinde bireysel deneyimlerden özel atölyelere, iş birliklerinden etkinlik kiralamalarına kadar çok yönlü kullanım sunar.",
        url: ["/img/members-club/02/03.jpg"],
      },
      {
        title: "Sanat Atölyesi",
        subtitle: "İlham için yer ayırdık",
        description:
          "Seramikten tuvale farklı üretim biçimlerine açık bu atölye, teknikten ifadeye çok amaçlı alan tanır.",
        url: ["/img/members-club/02/04.jpg"],
      },
      {
        title: "Müzik & Karaoke Stüdyosu",
        subtitle: "Sesini açmak için profesyonel bir zemin",
        description:
          "Bireysel kayıt, arkadaşlarla eğlence ya da özel müzik etkinlikleri… Bu akustik altyapılı stüdyo, yaratıcı ve sosyal tüm buluşmalara açık.",
        url: ["/img/members-club/02/05.jpg"],
      },
      {
        title: "Podcast Stüdyosu",
        subtitle: "Dünya standartlarında B2B şovunuzu oluşturun; fikirden yayına, Members Club sizinle",
        description:
          "Kayıt, düzenleme ve yayın altyapısına sahip bu alan; fikirlerini kendi dilinle anlatman için tasarlandı.",
        url: ["/img/members-club/02/06.jpg"],
      },
      {
        title: "Playstation Odası",
        subtitle: "Oyun ciddiye alınmalı",
        description:
          "Yeni nesil konsollar ve çoklu oyuncu düzeniyle donatılmış bu oda, rekabet kadar paylaşımı da merkeze alır.",
        url: ["/img/members-club/02/07.jpg"],
      },
    ],
  }

  const kidsAndFamily = {
    title: "Kids Club",
    items: [
      {
        title: "Kids Club",
        subtitle: "Oyun, gelişimin en doğal hali",
        description:
          "Yaş gruplarına özel kurgulanmış bu güvenli alan; çocukların enerjisini yönlendirirken ebeveynlere de rahat bir nefes alanı sunar.",
        url: [
          "/img/members-club/03/01.jpg",
          "/img/members-club/03/02.jpg",
          "/img/members-club/03/03.jpg",
          "/img/members-club/03/04.jpg",
          "/img/members-club/03/05.jpg",
          "/img/members-club/03/06.jpg",
          "/img/members-club/03/07.jpg",
          "/img/members-club/03/08.jpg",
        ],
      },
    ],
  }

  return (
    <Wrapper>
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={membersClubVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white py-5">
        <div className="w-full h-[30vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={1.5}>
            <IconCitysParkBgLogo fill="#000" />
          </FadeInOnScroll>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-60">
          <FadeInOnScroll duration={0.5}>
            <IconCitysMembersClubLogo fill="#000000" />
          </FadeInOnScroll>
        </div>
      </section>
      <section>
        <AnimatedLine direction="horizontal" />
        <div className="section-container py-20">
          <h2 className="font-suisse-intl font-normal text-black text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl max-w-2xl">
            <GsapSplitText stagger={0.1} splitBy="lines" duration={0.5}>
              Ayrıcalıklar dünyası City’s ile yeniden tasarlandı. Yaşamın tam merkezinde, size özel ayrıcalıklarla dolu
              bir deneyim.
            </GsapSplitText>
          </h2>
        </div>
        <AnimatedLine direction="horizontal" />
      </section>
      <section className="bg-white z-30">
        {sportsAndHealth.items.map((item, i) => (
          <MembersClubItem key={i} item={item} align={i % 2 === 0 ? "rtl" : "ltr"} />
        ))}
        <div className="h-px w-full bg-black"></div>
        {eventsAndEntertainment.items.map((item, i) => (
          <MembersClubItem key={i} item={item} align={i % 2 === 0 ? "ltr" : "rtl"} />
        ))}
        {kidsAndFamily.items.map((item, i) => (
          <MembersClubItem key={i} item={item} align={i % 2 === 0 ? "rtl" : "ltr"} />
        ))}
      </section>
      <LinkToPage
        previous={{ title: "City's Park", href: "/citys-park" }}
        next={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
      />
    </Wrapper>
  )
}
