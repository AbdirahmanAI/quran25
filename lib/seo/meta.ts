import { Metadata } from 'next';

interface GenerateMetaProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
}

export function generateMeta({
  title,
  description,
  path,
  type = 'website',
  image = '/og-image.jpg'
}: GenerateMetaProps): Metadata {
  const url = `https://qurankareem.app${path}`;

  return {
    title: `${title} - qurankareem.app - Read, Listen, and Reflect`,
    description,
    metadataBase: new URL('https://qurankareem.app'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} - qurankareem.app - Read, Listen, and Reflect`,
      description,
      url,
      siteName: 'qurankareem.app - Read, Listen, and Reflect',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - qurankareem.app - Read, Listen, and Reflect`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - qurankareem.app - Read, Listen, and Reflect`,
      description,
      images: [image],
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'qurankareem.app - Read, Listen, and Reflect',
      'format-detection': 'telephone=no',
    },
  };
}
