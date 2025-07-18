import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysLifeLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysLifeVideo } from "@/lib/constants"

export default function Page() {
  // const t = useTranslations("citys-life")
  const items = [
    {
      title: `Resepsiyon & <br /> Concierge Hizmeti`,
      subtitle: "İhtiyaçlarınız sizin için tasarlandı.",
      description: `
      <p>08:00 - 24:00 arasında hizmet veren concierge ekibimiz yaşamınızın kolaylaşması için her ayrıntıda yanınızda.</p>
      <ul>
        <li>Güvenlik, vale, kargo, otopark ve teknik destek.</li>
        <li>AVM, etkinlik ve sosyal aktivitelerinde bilgilendirme.</li>
        <li>Siz evde yokken teslimat yönetimi ve özel yönlendirmeler.</li>
      </ul>
      <p>Sizin düşünmek zorunda kalmadan yaşadığınız, sizin için tasarlanmış bir hayatı daha dolu yaşayın...</p>
      `,
      url: ["/img/citys-life/01.jpg"],
    },
    {
      title: `Vale & Otopark <br /> Hizmetleri`,
      subtitle: "Park yeriniz hazır. <br /> İsterseniz valeniz de var.",
      description: `
      <p>Konfor sadece evinizin içinde değil; aracınızı bıraktığınız ilk andan itibaren başlar.</p>
      <p><span>“Kolay Park”</span> altyapımız ile aracınızın güvenliğini ve erişim kolaylığını sağlayacak en kusursuz yere park edin.</p>
      <p>İsterseniz profesyonel <span>“Kolay Vale”</span> ekibimiz ile park stresi yaşamadan aracınızı bırakın. </p>
      <p>Hayatı daha kolay yaşayın...</p>
   `,
      url: ["/img/citys-life/02.jpg"],
    },
    {
      title: `Kargo Teslim Servisi`,
      subtitle: "Kargonuz güvenli ellerde",
      description: `
      <p>Her paket sizin kadar kıymetli. Kimi zaman beklediğiniz bir kitap, kimi zaman bir sürpriz...</p>
      <p>Kargolarınız asla kapıda kalmaz. Profesyonel concierge ekibimiz tarafından karşılanır. <br /> Siz evde olmasanız da biz buradayız.</p>
      <p>Kargonuzu siz düşünmeyin, biz çoktan ilgilendik bile. Size özel sakladık. İstediğiniz anda size teslim ettik.</p>
      <p>Hayatı daha huzurlu yaşa...</p>
   `,
      url: ["/img/citys-life/03.jpg"],
    },
    {
      title: `JUSTWork <br /> Office Campus`,
      subtitle: "Burada çalışmak; sadece iş değil, yeni bir yaşam tarzı...",
      description: `
      <p>Bireysel çalışanlardan büyük ekiplere, sıra dışı Tasarım, Teknoloji ve Network bir arada... <br /> Sadece çalışmak değil, üretmek, bağlantı kurmak ve ilham almak için tasarlanmış yeni nesil ofis alanları.</p>
      <p>Sabah kahveni alıp terasta güne başlamak, gün içinde lounge alanlarda network kurmak, öğleden sonra ise ilham veren bir toplantı odasında fikirlerini dünyaya açmak...</p>
      <p>Kargonuzu siz düşünmeyin, biz çoktan ilgilendik bile. Size özel sakladık. İstediğiniz anda size teslim ettik.</p>
      <p><span>“JUSTWork”</span> iş hayatına yepyeni bir soluk getiriyor.</p>
   `,
      url: ["/img/citys-life/04.jpg"],
    },
    {
      title: `JUSTStay <br /> Yeni Nesil Konaklama`,
      subtitle: "Hiçbir şeye benzemeyen her şeye uyan bir deneyim...",
      description: `
      <p><strong>JUSTWork’ün yaratıcı DNA’sından doğan JUSTStay,</strong> geleneksel hotel kalıplarını geride bırakıyor: <br /> Özgür, esnek, erişilebilir ama her detayında özenli yeni nesil bir konaklama ruhu sizinle... Kompakt, Konforlu, Akıllı odalar, gün boyu yaşayan sosyal ortamlar.</p>
      <p>Şehirde konaklamak sadece bir gece geçirmek demek değil, bir yaşam tarzına dokunmak demek.</p>
      <p>JUSTStay’de her şey ihtiyacın kadar. Tam kararında.</p>
      <p><span>ÖZGÜR YAŞA...</span></p>
   `,
      url: ["/img/citys-life/05.jpg"],
    },
    {
      title: `JUSTEvent`,
      subtitle: "Hayatı kutlamanın yeni hali...",
      description: `
      <p>Enerjisi yüksek, hikayesi güçlü, teknolojisi hazır, estetiği tam kararında bir buluşma noktası.</p>
      <p><strong>JUSTWork’ün DNA’sından doğan JUSTEvent;</strong> <br /> markaların, ekiplerin ve fikirlerin sahneye çıktığı, <br /> yeni nesil bir etkinlik alanı.</p>
      <p>Şirketlerin toplantıdan lansmana, panelden seminere, partilere kadar tüm anlarına hayat verdiği uluslararası  standartlarda, 1.100 m2 yeni nesil bir <strong>“Event”</strong> alanı...</p>
      <p>Siz fikrinizi getirin, biz onu en yaratıcı şekilde sahneye çıkaralım.</p>
   `,
      url: ["/img/citys-life/06.jpg"],
    },
    {
      title: `Pet Hotel & Pet <br /> Hospital`,
      subtitle: "Onlar sadece evcil hayvan değil, ailemizin en kıymetlileri…",
      description: `
      <p>City’s Life’ta patili dostlarınız için her şey düşünüldü.</p>
      <p>İster birlikte City’s Park’ta doğanın ve günün tadını çıkarın,</p>
      <p>İster sağlıkları için Pet Hospital’da emin ellerde olsunlar…</p>
      <p>Ya da siz seyahatteyken Pet Hotel’de konforla ağırlayalım, sevgiyle ilgilenelim.</p>
      <p>City’s Life’ta sadece siz değil, ailenizin en sevimli üyeleri de bu ayrıcalıklı yaşamın tadını çıkarır.</p>

   `,
      url: ["/img/citys-life/07.jpg"],
    },
  ]
  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysLifeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white">
        <LogoSection foregroundLogo={<IconCitysLifeLogo fill="#000000" />} foregroundDuration={0.5} />
        <div className="section-container pt-16 pb-40 flex flex-col items-center gap-20">
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-5xl 2xl:text-5xl xl:leading-normal  2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Yaşam Yeniden Tasarlandı: CITY’S <br /> Artık her şey daha kolay...
            </GsapSplitText>
          </h2>
          {/* <div className={cn("relative w-full h-[90vh]", gsapGlobalClasses.fadeIn)}>
            <MaskedParallaxImage
              imgSrc={"/img/citys-life/04.jpg"}
              sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
            />
          </div> */}
        </div>
      </section>
      <section className="relative z-20 bg-white">
        <AnimatedLine direction="horizontal" />
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
          />
        ))}
      </section>
      <LinkToPage
        previous={{ title: "City's Members Club", href: "/citys-members-club" }}
        next={{ title: "City's İstanbul AVM", href: "/citys-istanbul-avm" }}
      />
    </Wrapper>
  )
}
