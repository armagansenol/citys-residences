import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysMembersClubLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { membersClubVideo, sections } from "@/lib/constants"

export default function Page() {
  const items = [
    {
      title: "Sauna",
      subtitle: "Sıcaklığın içsel bir dengeye dönüştüğü alan",
      description:
        "Doğal dokularla şekillenen zarif bir denge içinde tasarlanan sauna, bedenin fazlalıklardan arınmasını ve zihnin hafiflemesini destekler.",
      url: ["/img/members-club/01/11.jpg"],
    },
    {
      title: "Spor Kulübü",
      subtitle: "Konforlu alan, profesyonel tempo",
      description:
        "Modern ekipmanlarla donatılmış, hem bireysel antrenmanlara hem de rutin takibe uygun kapsamlı spor alanı",
      url: ["/img/members-club/01/02.jpg"],
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
    {
      title: "Spa & Wellness",
      subtitle: "Dinlenmek de bir alışkanlık olabilir",
      description:
        "Sauna, buhar odası ve masaj alanlarını içeren wellness bölümü; beden kadar zihni de rahatlatmak için kurgulandı.",
      url: ["/img/members-club/01/03.jpg"],
    },
    {
      title: "Meditasyon Odası",
      subtitle: "Sessizliği planladık",
      description: "Dış uyaranlardan izole edilmiş, içe dönüşe alan tanıyan akustik düzenlemeli meditasyon odası.",
      url: ["/img/members-club/02/01.jpg"],
    },
    {
      title: "Hamam",
      subtitle: "Zamansız bir ritüelin yeniden yorumu",
      description: "Yüzyıllardır süregelen bir ritüelin izinde; su, buhar ve sessizlikle bedenin hafifliğini hisset.",
      url: ["/img/members-club/01/10.jpg"],
    },
    {
      title: "Kapalı Yüzme Havuzu",
      subtitle: "Her mevsim kendi ritminde",
      description:
        "Isı kontrollü, ileri filtre sistemine sahip kapalı yüzme havuzu; sabah sporundan akşam rahatlamasına günün her anına eşlik eder.",
      url: ["/img/members-club/01/01.jpg"],
    },
    {
      title: "Masa Tenisi",
      subtitle: "Kısa oyun, uzun sohbet",
      description: "Rahatça erişilebilen masa tenisi alanı, gündelik hareket ve spontane rekabet için tasarlandı.",
      url: ["/img/members-club/01/07.jpg"],
    },
    {
      title: "Golf Simülatör Sahası",
      subtitle: "Şehre rağmen sahadasınız",
      description:
        "Yüksek hassasiyetli sistemlerle donatılmış iç mekân golf deneyimi; bireysel gelişim ve keyifli anlar için.",
      url: ["/img/members-club/01/06.jpg"],
    },
    {
      title: "Padel Tenis Kortu",
      subtitle: "Yeni nesil oyuna özel alan",
      description: "Aydınlatmalı padel kortu, sosyalleşmenin en dinamik yollarından birine ev sahipliği yapıyor.",
      url: ["/img/members-club/01/05.jpg"],
    },
    {
      title: "Basketbol Sahası",
      subtitle: "Sınırlar içinde özgürlük",
      description: "Tam ölçülerde tasarlanmış, bireysel antrenman veya dostça oyunlar için açık basketbol sahası.",
      url: ["/img/members-club/01/04.jpg"],
    },
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
    {
      title: "Sanat Atölyesi",
      subtitle: "İlham için yer ayırdık",
      description:
        "Seramikten tuvale farklı üretim biçimlerine açık bu atölye, teknikten ifadeye çok amaçlı alan tanır.",
      url: ["/img/members-club/02/04.jpg"],
    },
    {
      title: "Yemek Atölyesi",
      subtitle: "Lezzet paylaşılırsa çoğalır",
      description:
        "Kapsamlı mutfak altyapısı sayesinde bireysel deneyimlerden özel atölyelere, iş birliklerinden etkinlik kiralamalarına kadar çok yönlü kullanım sunar.",
      url: ["/img/members-club/02/03.jpg"],
    },
    {
      title: "Playstation Odası",
      subtitle: "Oyun ciddiye alınmalı",
      description:
        "Yeni nesil konsollar ve çoklu oyuncu düzeniyle donatılmış bu oda, rekabet kadar paylaşımı da merkeze alır.",
      url: ["/img/members-club/02/07.jpg"],
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
      title: "Özel Sinema Salonu",
      subtitle: "Filmi paylaşmak, deneyimi derinleştirir",
      description: "Yüksek çözünürlüklü görüntü ve çevresel ses sistemiyle donatılmış özel sinema alanı.",
      url: ["/img/members-club/02/02.jpg"],
    },
  ]

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values(sections.home)} />
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
      <section className="relative z-20 bg-blue-shimmer">
        <LogoSection foregroundLogo={<IconCitysMembersClubLogo fill="#000000" />} foregroundDuration={0.5} />
        <div className="section-container pb-24">
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl xl:leading-normal 2xl:text-[40px] 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              Yaşam yeniden tasarlandı. <br /> Hayatın tam merkezinde. <br /> Citys&apos;e özel ayrıcalıklarla.
            </GsapSplitText>
          </h2>
        </div>
      </section>
      <section className="bg-white z-30">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "rtl" : "ltr"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
          />
        ))}
      </section>
      <LinkToPage
        previous={{ title: "City's Park", href: "/citys-park" }}
        next={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
      />
    </Wrapper>
  )
}
