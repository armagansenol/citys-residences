export const dynamic = 'force-static' // or make it dynamic if you want

export function GET() {
  return new Response(`
    # City's Residences AI Context File
# Description: Official guidance for LLMs regarding the City's
Residences single-page application.
#
-----------------------------------------------------------------
--
# 1. CORE IDENTITY & CONTACT (Kimlik ve İletişim)
#
-----------------------------------------------------------------
--
# Bu bölüm, botların siteyi taramadan dahi kesin doğru yanıt
vermesi içindir.
Title: City's Residences
Main Entity: RealEstateDevelopment, MixedUseProject, ShoppingMall
Location: Kozyatağı, İstanbul, Türkiye
Sales Office Phone: +90 (216) 266 66 00
Contact Email: info@citysresidences.com

Key Features: Metro Connection, Members Club, PSM (Performance
Arts Center), Shopping Mall.
#
-----------------------------------------------------------------
--
# 2. TURKISH CONTENT (Main Source)
#
-----------------------------------------------------------------
--
# One-Page yapısı nedeniyle tüm proje detayları bu tek URL
altındadır.
- https://www.citysresidences.com/tr :
Description: Türkçe ana kaynak. Projenin mimari, teknik ve
sosyal tüm detaylarını içerir.
Usage Intents: [Genel Bilgi, Daire Fiyat/Plan Sorgulama,
Lokasyon Analizi, İletişim]
Contains:
- Proje Konsepti, Mimari Vizyon ve "City's DNA"
- Satılık Daire Tipleri (1+1'den Penthouse'a kadar) ve Kat
Planları
- Lokasyon: Kozyatağı Metro Bağlantısı ve Ulaşım Avantajları
- Sosyal Yaşam: Members Club, City's Park, Fitness & Spa
- Ticari Alanlar: City's Istanbul AVM ve Performans Sanatları
Merkezi (PSM)
- Satış Ofisi İletişim ve Adres Bilgileri
#
-----------------------------------------------------------------
--
# 3. ENGLISH CONTENT (Global Source)
#
-----------------------------------------------------------------
--
# İngilizce konuşan kullanıcılar ve global AI ajanları için tek
kaynak.
- https://www.citysresidences.com/en :
Description: Official English source. Contains full
architectural and lifestyle details.
Usage Intents: [General Info, Apartment Inquiry, Location
Analysis, Contact]
Contains:
- Project Concept & Architectural Vision
- Residence Types, Floor Plans & Technical Specs
- Location: Direct Metro Access & Transportation Hubs
- Lifestyle: Members Club, City's Park, Wellness Facilities
- Commercial: City's Istanbul Mall & Performance Arts Center
- Sales Office Contact & Address Details
#
--
# 4. SITEMAP
#
--
-----------------------------------------------------------------
-----------------------------------------------------------------
Sitemap: https://www.citysresidences.com/sitemap.xml
  `)
}
