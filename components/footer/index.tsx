import Link from "next/link"

import { Logo } from "@/components/icons"

const menuItems = {
  iletisim: [
    {
      title: "City's Istanbul Satış Ofisi",
      items: ["İçerenköy, Çayır Cd No: 1,\n34752 Ataşehir/Istanbul", "info@citysresidences.com", "(0216) 225 50 00"],
    },
    {
      title: "City's Gallery",
      items: ["İçerenköy, Çayır Cd No: 1,\n34752 Ataşehir/Istanbul", "info@citysresidences.com", "(0216) 225 50 00"],
    },
  ],
  sosyalMedya: [
    { title: "LinkedIn", icon: <div></div> },
    { title: "Instagram", icon: <div></div> },
    { title: "Youtube", icon: <div></div> },
    { title: "X", icon: <div></div> },
  ],
  menu: [
    {
      title: "Konutlar",
      href: "#",
    },
    {
      title: "City's Park",
      href: "#",
    },
    {
      title: "City's Club House",
      href: "#",
    },
    {
      title: "Konum",
      href: "#",
    },
    {
      title: "Yeme İçme",
      href: "#",
    },
    {
      title: "Alışveriş",
      href: "#",
    },
    {
      title: "Justwork Campus",
      href: "#",
    },
  ],
  bilgilendirme: [
    {
      title: "KVKK",
      href: "#",
    },
    {
      title: "Ticari Elektronik İleti Aydınlatma Metni",
      href: "#",
    },
    {
      title: "Açık Rıza Metni",
      href: "#",
    },
    {
      title: "KVK İlişkin Aydınlatma Metni",
      href: "#",
    },
    {
      title: "Çerez Politikası",
      href: "#",
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-bricky-brick text-white px-4 py-12 bd:py-14 bd:pb-8 font-halenoir">
      <div className="container flex flex-col">
        <div className="flex flex-col items-stretch bd:grid grid-cols-1 bd:grid-cols-24 gap-16 bt:gap-24 bd:gap-8 mb-12">
          {/* Logo Section */}
          <div className="bt:col-span-8 flex">
            <div className="mx-auto bt:mx-0 bt:mb-auto bt:mr-auto w-[200px] bd:w-[260px]">
              <Logo fill="var(--white)" />
            </div>
          </div>
          <div className="bt:col-span-16">
            {/* Top Section: İletişim and Sosyal Medya */}
            <div className="bt:col-span-9 grid grid-cols-1 gap-10 bt:gap-0 bt:grid-cols-12">
              {/* İletişim Section */}
              <div className="bt:col-span-8">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">İletişim</h2>
                <div className="grid grid-cols-1 bt:grid-cols-2 gap-6 mr-24">
                  {menuItems.iletisim.map((office) => (
                    <div key={office.title} className="space-y-2">
                      <h3 className="text-sm font-medium">{office.title}</h3>
                      {office.items.map((item, index) => (
                        <p key={index} className="text-sm text-white/80 whitespace-pre-line">
                          {item}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Sosyal Medya Section */}
              <div className="bt:col-span-4 bt:col-start-9">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">Sosyal Medya</h2>
                <div className="space-y-2">
                  {menuItems.sosyalMedya.map((item) => (
                    <Link
                      key={item.title}
                      href="#"
                      className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Bottom Section: Menü and Bilgilendirme */}
            <div className="grid grid-cols-1 bt:grid-cols-12 gap-10 bt:gap-0 pt-8 mt-0 bd:mt-10">
              {/* Menü Section */}
              <div className="bt:col-span-8">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">Menü</h2>
                <div className="flex flex-col bt:grid grid-cols-2 gap-y-2 gap-x-6 mr-24">
                  {menuItems.menu.map((item, i) => (
                    <Link key={i} href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Bilgilendirme Section */}
              <div className="bt:col-span-4 bt:col-start-9">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">Bilgilendirme</h2>
                <div className="space-y-2">
                  {menuItems.bilgilendirme.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="block text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="flex flex-col bt:flex-row justify-between items-center gap-5 bd:gap-0 pt-5 border-t border-grenadier text-sm">
          <span>2025 © City&apos;s Residences - Tüm hakları saklıdır.</span>
          <span>
            Made by{" "}
            <Link href="https://justdesignfx.com" target="_blank" rel="noopener noreferrer" className="underline">
              JUST DESIGN FX
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
