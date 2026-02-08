import React from 'react'

const schemas = {
  tr: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ApartmentComplex',
        '@id': 'https://www.citysresidences.com/tr/#complex',
        name: "City's Residences",
        description:
          "İstanbul Kozyatağı'nda metro bağlantılı, City's Istanbul AVM ve Performans Sanatları Merkezi (PSM) ile iç içe lüks konut ve rezidans projesi.",
        url: 'https://www.citysresidences.com/tr',
        telephone: '+902162666600',
        image: [
          'https://www.citysresidences.com/assets/img/dis-cephe.jpg',
          'https://www.citysresidences.com/assets/img/ic-mekan.jpg',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: "City's Istanbul AVM, Kayışdağı Cad. No.2, Kozyatağı",
          addressLocality: 'Ataşehir',
          addressRegion: 'İstanbul',
          postalCode: '34752',
          addressCountry: 'TR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.9734',
          longitude: '29.0950',
        },
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Members Club',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: "City's Istanbul AVM",
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Metro Bağlantısı',
            value: true,
          },
        ],
      },
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://www.citysresidences.com/tr/#organization',
        name: "City's Residences Satış Ofisi",
        url: 'https://www.citysresidences.com/tr',
        email: 'info@citysresidences.com',
        telephone: '+902162666600',
        image: 'https://www.citysresidences.com/assets/img/logo.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: "City's Istanbul AVM, Kayışdağı Cad. No.2, Kozyatağı",
          addressLocality: 'Ataşehir',
          addressRegion: 'İstanbul',
          postalCode: '34752',
          addressCountry: 'TR',
        },
        sameAs: [
          'https://www.facebook.com/people/Citys-Residences/pfbid0ZWTPyTJfBd6ZeZjjrK3ERmDvaumc58TaJz4c9n7qHZUagKa3WHXEa6Uqgkt5Wftrl/',
          'https://www.instagram.com/citysresidences',
          'https://x.com/citysresidences',
          'https://www.tiktok.com/@citysresidences',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.citysresidences.com/tr/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: "City's Residences",
            item: 'https://www.citysresidences.com/tr',
          },
        ],
      },
    ],
  },
  en: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ApartmentComplex',
        '@id': 'https://www.citysresidences.com/en/#complex',
        name: "City's Residences",
        description:
          'Luxury residences in Istanbul Kozyatagi featuring direct Metro access, Shopping Mall, and Performance Arts Center.',
        url: 'https://www.citysresidences.com/en',
        telephone: '+902162666600',
        image: [
          'https://www.citysresidences.com/assets/img/dis-cephe.jpg',
          'https://www.citysresidences.com/assets/img/ic-mekan.jpg',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: "City's Istanbul Mall, Kayisdagi Cad. No.2, Kozyatagi",
          addressLocality: 'Atasehir',
          addressRegion: 'Istanbul',
          postalCode: '34752',
          addressCountry: 'TR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.9734',
          longitude: '29.0950',
        },
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Members Club',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Shopping Mall',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Metro Connection',
            value: true,
          },
        ],
      },
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://www.citysresidences.com/en/#organization',
        name: "City's Residences Sales Office",
        url: 'https://www.citysresidences.com/en',
        email: 'info@citysresidences.com',
        telephone: '+902162666600',
        image: 'https://www.citysresidences.com/assets/img/logo.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: "City's Istanbul Mall, Kayisdagi Cad. No.2, Kozyatagi",
          addressLocality: 'Atasehir',
          addressRegion: 'Istanbul',
          postalCode: '34752',
          addressCountry: 'TR',
        },
        sameAs: [
          'https://www.facebook.com/people/Citys-Residences/pfbid0ZWTPyTJfBd6ZeZjjrK3ERmDvaumc58TaJz4c9n7qHZUagKa3WHXEa6Uqgkt5Wftrl/',
          'https://www.instagram.com/citysresidences',
          'https://x.com/citysresidences',
          'https://www.tiktok.com/@citysresidences',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.citysresidences.com/en/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: "City's Residences",
            item: 'https://www.citysresidences.com/en',
          },
        ],
      },
    ],
  },
}

export const JsonLd = ({ locale }: { locale: string }) => {
  const schema = schemas[locale as keyof typeof schemas] || schemas.tr

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
