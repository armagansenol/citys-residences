export const baseUrl = "mvkgolfcourse.com"
export const initialScroll = true

export const routes = {
  en: {
    home: {
      ariaLabel: "Home",
      name: "home",
      path: "",
      ui: "Home",
      seo: {
        title: "mvkgolfcourse",
        description: "MVK golf course!",
      },
    },
    about: {
      ariaLabel: "About Us",
      name: "about",
      path: "about-us",
      ui: "About Us",
      seo: {
        title: "About Us | mvkgolfcourse",
        description: "MVK golf course!",
      },
    },
    notFound: {
      ariaLabel: "Page Not Found",
      name: "not-found",
      path: "page-not-found",
      ui: "Page Not Found",
      seo: {
        title: "404 Page Not Found",
        description: "The page you are looking for was not found.",
      },
    },
  },
  tr: {
    home: {
      ariaLabel: "Anasayfa",
      name: "home",
      path: "",
      ui: "Anasayfa",
      seo: {
        title: "mvkgolfcourse",
        description: "MVK golf course!",
      },
    },
    about: {
      ariaLabel: "Hakkımızda",
      name: "about",
      path: "hakkimizda",
      ui: "Hakkımızda",
      seo: {
        title: "Hakkımızda | mvkgolfcourse",
        description: "MVK golf course!",
      },
    },
    notFound: {
      ariaLabel: "Sayfa Bulunamadı",
      name: "not-found",
      path: "sayfa-bulunamadi",
      ui: "Sayfa Bulunamadı",
      seo: {
        title: "404 Sayfa Bulunamadı",
        description: "Aradığınız sayfa bulunamadı.",
      },
    },
  },
}
