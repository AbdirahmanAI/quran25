export function generateMobileAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    'name': 'Quran Kareem - Read, Listen, and Reflect',
    'applicationCategory': 'ReligiousApp',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'Memorize Quran with modern technology',
    'url': 'https://qurankareem.app', // Added URL for the app
    'publisher': {
      '@type': 'Organization',
      'name': 'Quran Kareem',
      'url': 'https://qurankareem.app'
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://qurankareem.app/'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 2, // Adjust for the homepage
        'name': item.name,
        'item': `https://qurankareem.app${item.url}`
      }))
    ]
  };
}

export function generateQuranChapterSchema(chapter: {
  number: number;
  name: string;
  englishName: string;
  versesCount: number;
  url?: string; // Added optional URL
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    'name': chapter.englishName,
    'alternativeHeadline': chapter.name,
    'position': chapter.number,
    'numberOfPages': chapter.versesCount,
    'isPartOf': {
      '@type': 'Book',
      'name': 'The Holy Quran',
      'author': {
        '@type': 'Organization',
        'name': 'Quran Kareem'
      }
    },
    ...(chapter.url ? { url: `https://qurankareem.app${chapter.url}` } : {}), // Added URL if provided
    'inLanguage': 'ar' // Specified language
  };
}
