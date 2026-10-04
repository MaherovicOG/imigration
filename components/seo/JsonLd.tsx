import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MoveAmerica USA',
    url: 'https://moveamericausa.com',
    description: 'Free decision-making platform for moving within the United States. Compare cost of living, taxes, housing, salaries, and estimate moving costs.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://moveamericausa.com/compare/states/{search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MoveAmerica USA',
    url: 'https://moveamericausa.com',
    logo: 'https://moveamericausa.com/logo.png',
    description: 'Authoritative data-driven US relocation comparison and moving cost calculation platform.'
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `https://moveamericausa.com${crumb.item}`
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  modifiedDate: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    author: {
      '@type': 'Person',
      name: article.authorName
    },
    publisher: {
      '@type': 'Organization',
      name: 'MoveAmerica USA',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moveamericausa.com/logo.png'
      }
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate
  };
}
