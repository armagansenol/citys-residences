import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysMembersClubLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { gsapGlobalClasses, membersClubVideo } from "@/lib/constants"

export default function Page() {
  const items = [
    {
      title: "Kapalı Yüzme Havuzu",
      subtitle: "Her mevsim kendi ritminde",
      description: `
        <p>Yarı olimpik havuzda kulaç atıp, soğuk şok havuzunda bedeninizi uyandırdığınız, sonra başınızı arkaya yaslayıp dinginliğin tadını çıkardığınız eşsiz bir mekan.</p>
        <p>Zihninizi uyandırıp bedeninizi güçlendirirken dört mevsim konforlu ve sağlıklı yaşamın ayrıcalığını doyasıya yaşayın.</p>
      `,
      url: ["/img/citys-members-club/01.jpg"],
      // sectionId: sections.citysMembersClub.indoorSwimmingPool.id,
    },
    {
      title: "Spor & Spa <br /> Resepsiyon",
      subtitle: "Şimdi senin zamanın",
      description: `
        <p>Bireysel antrenmanlardan grup derslerine kendi sınırlarını zorladığın yerdesin</p>
      `,
      url: ["/img/citys-members-club/02.jpg"],
      // sectionId: sections.citysMembersClub.macOne.subitems.training.id,
    },
    {
      title: "Soyunma Odaları",
      subtitle: "Konforun ve hijyenin yeni tanımı",
      description: `
        <p>Yüksek ergonomi, kusursuz işlev, yüksek standartlardaki soyunma odalarınız sadece geçiş noktanız değil;<br />Konforun, zerafetin ve tüm kullanıcı ihtiyaçlarınızın yeniden tanımlandığı sıra dışı bir deneyim için tasarlandı.</p>
      `,
      url: ["/img/citys-members-club/03.jpg"],
      // sectionId: sections.citysMembersClub.macOne.subitems.sauna.id,
    },
    {
      title: "Spor Salonu",
      subtitle: "Antrenman ve Özel Ders",
      description: `
        <p>MAC/One tarafından tasarlanmış fitness mekanları, limitsiz olanaklar, kişiye özel spor antrenmanları veya grup dersleri ile kendinizin en iyi performansına ulaşın.</p>
        <p>Yenilenin, daha çok yaşayın.</p>

      `,
      url: ["/img/citys-members-club/04.jpg"],
      // sectionId: sections.citysMembersClub.macOne.subitems.yoga.id,
    },
    {
      title: "Stüdyolar",
      subtitle: "Yüksek enerji ve sosyalleşme bir arada",
      description: `
        <p>Kimi zaman enerjinin birlikte yükseldiği sosyal mekanlar, kimi zaman kendi vücudunuzu dinleyebileceğiniz bireysel antrenman mekanları.</p>
        <p>HIIT, Zumba, Core, Cycling, Dans, Esneme ve sayısız eğlenceli gruplar, dersler.</p>
        <p>City’s Members Club stüdyolarında her zaman kendinizi daha iyi hissedeceksiniz.</p>
      `,
      url: ["/img/citys-members-club/05.jpg"],
      // sectionId: sections.citysMembersClub.macOne.subitems.pilates.id,
    },
    {
      title: "Yoga Stüdyosu",
      subtitle: "Dinginlik için ayrılmış bir alan",
      description: `
        <p>Nefesin ve hareketin uyumuna zemin hazırlayan yoga stüdyosu ile kendinize iyi gelecek bir yolculuğa davetlisiniz.</p>
      `,
      url: ["/img/citys-members-club/06.jpg"],
    },
    {
      title: "Pilates Stüdyosu",
      subtitle: "Her duruşun bir çizgisi, her çizginin bir dengesi var",
      description: `
        <p>Pilates Stüdyosu, her hareketin merkezinde dengeyi arar.</p>
        <p>Alan, akışa eşlik eden ışık ve dinginlikle kendi ritmini kurar. Her seans, hareketle mekân arasında kurulan sessiz bir uyumdan doğar.</p>

    
      `,
      url: ["/img/citys-members-club/07.jpg"],
    },
    {
      title: "Duşlar",
      subtitle: "Konfor detaylarda gizlidir",
      description: `
        <p>Her ayrıntısıyla özenle tasarlanmış bu alan, antrenman yorgunluğunuzu ödüllendirdiğiniz ve kendinize döndüğünüz bir mekan sunar.</p>
      `,
      url: ["/img/citys-members-club/08.jpg"],
    },

    {
      title: "Sauna",
      subtitle: "Sıcaklığın içsel bir dengeye dönüştüğü alan",
      description: `
        <p>Doğal dokularla şekillenen zarif bir denge içinde tasarlanan saunada, sadece bedeninizi değil zihninizi de arındırın.</p>
      `,
      url: ["/img/citys-members-club/09.jpg"],
    },
    {
      title: "Spa & Wellness",
      subtitle: "Rahatlamak da bir alışkanlık olabilir",
      description: `
        <p>Sauna, buhar odası ve masaj alanlarını içeren wellness bölümühem bedeninizi hem de zihninizi rahatlatmak için kusursuz kurgulandı.</p>
      `,
      url: ["/img/citys-members-club/10.jpg"],
    },
    {
      title: "Masaj",
      subtitle: "Sessizliği planladık",
      description: `
        <p>Dış uyaranlardan izole edilmiş, içe dönüşe alan tanıyan terapi odaları.</p>
      `,
      url: ["/img/citys-members-club/11.jpg"],
    },
    {
      title: "Dinlenme",
      subtitle: "Burada dinlenmek bir yaşam biçimi",
      description: `
        <p>Zihninizin arındığı, bedeninizin yenilendiği alanlar, City's Members Club seçkin yaşam tasarımının bir parçası olarak kurgulandı.</p>
        <p>Enerjinize ve ritminize eşlik eden bir deneyim, sakinliğin yeni dengesi.</p>
      `,
      url: ["/img/citys-members-club/12.jpg"],
    },
    {
      title: "Hamam",
      subtitle: "Zamansız bir ritüelin yeniden tasarımı",
      description: `
        <p>Yüzyıllardır süregelen Türk tarihine özel geleneksel bakım ritüellerini Citys’in modern yorumuyla yaşayın.</p>
        <p>Su, buhar ve sessizlikle bedenin hafifliğini hissedin. <br /> Burada zihniniz arınır, yenilenir ve yeniden doğarsınız.</p> 
      `,
      url: ["/img/citys-members-club/13.jpg"],
    },
    {
      title: "Padel Tenis",
      subtitle: "Yeni nesil sporun adresi",
      description: `
        <p>Dünyanın en hızlı yükselen ve en prestijli sporları arasına giren padel tenise siz de hayatınızda yer açın.</p>
        <p>Arkadaşlarınızla eğlenirken hem forma girin hem de rekabetin keyfini stil sahibi bir atmosferde yaşayın.</p>
        <p>Padel tenis ile enerjiniz tazelensin.</p>
      `,
      url: ["/img/citys-members-club/14.jpg"],
    },
    {
      title: "Basketbol",
      subtitle: "Sınırlar belli. Özgürlük sizin.",
      description: `
        <p>Bir pota, bir top ve siz.</p>
        <p>Dilerseniz bireysel antrenman, kimi zaman omuz omuza arkadaşlarınızla enerjik dostça bir rekabet.</p>
        <p>Enerjiniz her zaman parmaklarınızın ucunda.</p>
        <p>Her atış bir hedef. Her zıplayış bir özgürlük.</p>
      `,
      url: ["/img/citys-members-club/15.jpg"],
    },
    {
      title: "Masa Tenisi",
      subtitle: "Kısa hamleler, kalıcı anlar",
      description: `
        <p>Top sekiyor, kahkahalar yayılıyor. İki raket, bir masa, sonsuz eğlence...</p>
        <p>Hareketin enerji ile buluştuğu, sohbetin oyuna dönüştüğü yer. Sadece bir oyun değil yaşamın en keyifli hali.</p>
      `,
      url: ["/img/citys-members-club/16.jpg"],
    },
    {
      title: "Golf Deneyimi",
      subtitle: "Golf size hiç bu kadar yakın olmamıştı",
      description: `
        <p>Doğanın huzuru, sporun zerafeti ve odaklanmanın gücü artık sizinle birlikte.</p>
        <p>Golf deneyimi için kısa bir mola tüm gününüzü değiştirebilir. ister kendi başınıza sakin bir antrenman ister arkadaşlarınızla keyifli bir vuruş keyfi.</p>
        <p>Yeşilin ritmini sadece birkaç adımda keşfedin.</p>
      `,
      url: ["/img/citys-members-club/17.jpg"],
    },
    {
      title: "Sinema Salonu",
      subtitle: "Sadece size özel.. CineWAM ayrıcalığıyla",
      description: `
        <p>En yeni filmler, sevdiğiniz diziler, büyük maçlar...</p>
        <p>Bir sinema perdesi düşünün ışıklar sönüyor ama bu kez sadece sizin için.</p>
        <p>İster vizyondaki filmi tek başınıza izleyin ister sevdiklerinizle özel bir seans düzenleyin.</p>
        <p>City’s Members Club sinema deneyimi özel tasarlanmış konsepti ile çok farklı.</p>
      `,
      url: ["/img/citys-members-club/18.jpg"],
    },
    {
      title: "Playstation Odası",
      subtitle: "Rakibini getir ya da takımını kur",
      description: `
        <p>Sadece eğlenmek için değil rekabet etmek ve paylaşmak için tasarlandı.</p>
        <p>İster birebir mücadele ister arkadaş grubuyla co-op keyfi... Turnuva modları, özel etkinlikler ve randevulu kullanım.</p>
        <p>Burada her oyun bir anıya, her karşılaşma yeni bir hikayeye dönüşür.</p>
      `,
      url: ["/img/citys-members-club/19.jpg"],
    },
    {
      title: "Müzik & Karaoke",
      subtitle: "Kendinizi duymakla kalmayın. Duyurun.",
      description: `
        <p>İyi bir müzik eşliğinde sesini özgür bırak.</p>
        <p>Dostlarını getir müziğini paylaş. Kayıt yap. Mikrofona değil, kendine yaklaş.</p>
        <p>Eğlence özgürlük tek odada. Burası sadece müzik odası değil, kendin olma alanı.</p>
        <p>Bu stüdyo hayatın ritmini ciddiye alan herkes için tasarlandı.</p>
      `,
      url: ["/img/citys-members-club/20.jpg"],
    },
    {
      title: "Podcast",
      subtitle: "Kayıt burada, etki her yerde",
      description: `
        <p>Bu stüdyo anlatmanın gücünü anlayan herkes için...</p>
        <p>Kayıt tuşuna basman yeterli. Senin sesin ve görüntün ile düşün, anlat, kaydet, iz bırak, dünyaya yayıl.</p>
        <p>Profesyonel altyapısı size özel tasarlanmış ortamı ve yüksek kalitesi ile işlerinizi geliştirin, markanızı yaratın, geleceği yakalayın.</p>
      `,
      url: ["/img/citys-members-club/21.jpg"],
    },
    {
      title: "Meditasyon",
      subtitle: "Sessizliği Planladık",
      description: `
        <p>Günün kesintisiz temposu, dikkat dağınıklığı ve bitmeyen düşünce trafiği arasında City’s Members Club meditasyon odanız zihninize ayrılmış sakin bir durak.</p>
        <p>Zihin yavaşladığında, hayat yeniden başlar.</p>
        <p>Hiçbir şey yapmamak yapılabilecek en iyi şeydir.</p>
        <p>Durmak da bir akıştır.</p>
      `,
      url: ["/img/citys-members-club/22.jpg"],
    },
    {
      title: "Kids Club",
      subtitle: "Oyun, gelişimin en doğal hali",
      description: `
        <p>Oyun çocuk için sadece bir eğlence değil; öğrenmenin, gelişmenin ve dünyayı keşfetmenin ilk yolu...</p>
        <p>City’s Members Club’da iki ayrı katta iki ayrı yaş grubu için özel detaylar ile tasarlanan alanlarda sadece eğlence yok, güven var, özen var, pedagog eşliğinde yapılandırılmış bir öğrenme dünyası var.</p>
        <p>Rahat bir nefes sizin, güvenli ve heyecanlı bir dünya onların.</p>
      `,
      url: [
        "/img/citys-members-club/23.jpg",
        "/img/citys-members-club/24.jpg",
        "/img/citys-members-club/25.jpg",
        "/img/citys-members-club/26.jpg",
        "/img/citys-members-club/27.jpg",
      ],
    },
    {
      title: "Esnek Çalışma",
      subtitle: "Farklı çalış, birlikte üret",
      description: `
        <p>Muhtelif büyüklüklerdeki toplantı odalarında kısa online toplantılar veya uzun soluklu ekip toplantılarına kadar tüm ihtiyaçlarınız ile uyumlu alanlar.</p>
        <p>Çalıştığın alan tasarlanmış bir yaşam tarzı.</p>
        <p>İş değil, üretim. Ofis değil, ekosistem. Aç bilgisayarı. Kapat şehrin gürültüsünü. Kendi ritmini bul.</p>
        <p>Çünkü çalışmak masa değil ortam meselesi.</p>
        <p>Ev gibi değil, daha iyi.</p>
      `,
      url: ["/img/citys-members-club/28.jpg"],
    },
    {
      title: "Toplantı Odaları",
      subtitle: "Bir toplantı değil, bir etkinin başlangıcı.",
      description: `
        <p>Fikirlerin sınırları aştığı alanlar. Burada fikirler konuşmaz, birbiriyle dans eder.</p>
        <p>City’s Members Club tasarımıyla farklılaşan sıra dışı toplantılar, birlikte üretmenin en ideal hali.</p>
        <p>Olağanüstü fikirler ilham veren ortamlar ister. Burası bir toplantı değil, iz bırakma alanı.</p>
        <p>Stratejik kararlarını, mutlulukla sonuçlanan bir başarı hikayesine dönüştür.</p>
      `,
      url: ["/img/citys-members-club/29.jpg"],
    },
    {
      title: "Yemek Atölyesi",
      subtitle: "Lezzet paylaşılırsa çoğalır",
      description: `
          <p>Kahve ve taze ekmeğin rahatlatıcı kokusu, tutkulu, keyifli ve heyecanlı sohbetlerle birleşiyor.</p>
          <p>Mutfak sever çocuk ve yetişkinler için özel hazırlanmış birçok yemek atölyesinden birisi mutlaka sizin için.</p>
        `,
      url: ["/img/citys-members-club/30.jpg"],
    },
    {
      title: "Sanat Atölyesi",
      subtitle: "İlham için yer ayırdık",
      description: `
          <p>Kimi renklerle düşünür, kimi dokunarak anlatır. Biz bu farklı anlatım biçimlerine, bu eşsiz iç dünyalara alan açtık.</p>
          <p>Burası sadece bir atölye değil fırçadan tuvale, hamurdan seramiğe, sanattan hayallere uzanan bir özgürlük alanı...</p>
          <p>Çocukların hayal kurduğu, yetişkinlerin ise duygularına ses verdiği, kendi iç seslerini duyabildiği bir ayrıcalık.</p>
          <p>Hayal eden çocuklar dünyayı değiştirebilir... Kendini ifade eden yetişkinler daha mutlu yaşar. İzin verin yaşam kendi rengini bulsun.</p>
        `,
      url: ["/img/citys-members-club/31.jpg"],
    },
  ]

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
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
      <section className="relative z-20 bg-minor-blue">
        <LogoSection foregroundLogo={<IconCitysMembersClubLogo fill="#000000" />} foregroundDuration={0.5} />
        <div className="flex flex-col items-center justify-center pb-24">
          <div className={cn("relative w-[35vw] h-[35vw] mb-12", gsapGlobalClasses.fadeIn)}>
            <Img src="/img/members-cat.png" alt="City's Members Club" fill className="object-contain" />
          </div>
          <h2
            id="masaj"
            className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center"
          >
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              Yaşam yeniden tasarlandı: CITY’S
            </GsapSplitText>
          </h2>
        </div>
      </section>
      <section className="bg-white z-30">
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
        previous={{ title: "City's Park", href: "/citys-park" }}
        next={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
      />
    </Wrapper>
  )
}
