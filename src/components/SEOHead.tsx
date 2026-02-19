import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  jsonLd?: object | object[];
}

const SITE_URL = 'https://www.quelartisan85.fr';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/dcngcvz9k/image/upload/v1758201228/6_bsskhi.jpg';

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  article,
  jsonLd
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    setMetaTag('description', description);
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
    setLinkTag('canonical', canonicalUrl);

    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', 'Quel Artisan 85', true);
    setMetaTag('og:locale', 'fr_FR', true);

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    if (ogType === 'article' && article) {
      if (article.publishedTime) setMetaTag('article:published_time', article.publishedTime, true);
      if (article.modifiedTime) setMetaTag('article:modified_time', article.modifiedTime, true);
      if (article.author) setMetaTag('article:author', article.author, true);
      if (article.section) setMetaTag('article:section', article.section, true);
    }

    if (jsonLd) {
      const existingScript = document.querySelector('script[data-seo-jsonld]');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      const jsonLdData = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      script.textContent = JSON.stringify(jsonLdData.length === 1 ? jsonLdData[0] : jsonLdData);
      document.head.appendChild(script);
      return () => { script.remove(); };
    }
  }, [title, description, canonical, ogImage, ogType, article, jsonLd]);

  return null;
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quel Artisan 85',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: 'Plateforme de mise en relation avec des artisans qualifiés en Vendée (85).',
    address: { '@type': 'PostalAddress', addressRegion: 'Vendée', addressCountry: 'FR' },
    areaServed: { '@type': 'AdministrativeArea', name: 'Vendée' }
  };
}

export function generateLocalBusinessSchema(trade: string, city?: string, postalCode?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: city ? `${trade} à ${city}` : `${trade} en Vendée`,
    description: city
      ? `Trouvez un ${trade.toLowerCase()} qualifié à ${city}. Devis gratuits.`
      : `Trouvez un ${trade.toLowerCase()} qualifié en Vendée (85).`,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city || 'Vendée',
      postalCode: postalCode || '85000',
      addressRegion: 'Vendée',
      addressCountry: 'FR'
    },
    priceRange: '€€'
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}${article.url}`,
    image: article.image || DEFAULT_OG_IMAGE,
    datePublished: article.publishedTime || new Date().toISOString(),
    dateModified: article.modifiedTime || article.publishedTime || new Date().toISOString(),
    author: { '@type': 'Organization', name: article.author || 'Quel Artisan 85' },
    publisher: {
      '@type': 'Organization',
      name: 'Quel Artisan 85',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` }
    }
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@type': 'LocalBusiness', name: service.provider || 'Quel Artisan 85' },
    areaServed: { '@type': 'AdministrativeArea', name: service.areaServed || 'Vendée' },
    priceRange: service.priceRange || '€€'
  };
}
