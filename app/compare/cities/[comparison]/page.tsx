import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CITIES_DATA, CityData } from '@/data/cities';
import { CityComparisonView } from '@/components/comparison/CityComparisonView';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface PageProps {
  params: Promise<{
    comparison: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { comparison: 'los-angeles-vs-austin' },
    { comparison: 'new-york-city-vs-miami' },
    { comparison: 'san-francisco-vs-seattle' }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { comparison } = await params;
  const parts = comparison.split('-vs-');
  if (parts.length !== 2) {
    return { title: 'City Comparison | MoveAmerica USA' };
  }

  const c1 = CITIES_DATA[parts[0]];
  const c2 = CITIES_DATA[parts[1]];

  if (!c1 || !c2) {
    return { title: 'City Comparison Not Found | MoveAmerica USA' };
  }

  return {
    title: `${c1.name} vs ${c2.name} Cost of Living & Rent Comparison (2026) | MoveAmerica USA`,
    description: `Compare ${c1.name}, ${c1.stateCode} vs ${c2.name}, ${c2.stateCode}: cost of living index, median home prices, 2-bedroom rental rates, commute times, and career opportunities.`,
    alternates: {
      canonical: `https://moveamericausa.com/compare/cities/${comparison}`
    },
    openGraph: {
      title: `${c1.name} vs ${c2.name} Cost of Living & Rent Comparison (2026)`,
      description: `Compare ${c1.name}, ${c1.stateCode} vs ${c2.name}, ${c2.stateCode}: cost of living index, median home prices, 2-bedroom rental rates, commute times, and career opportunities.`,
      url: `https://moveamericausa.com/compare/cities/${comparison}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${c1.name} vs ${c2.name} Comparison`,
      description: `Compare living costs and housing between ${c1.name} and ${c2.name}.`
    }
  };
}

export default async function CityComparisonPage({ params }: PageProps) {
  const { comparison } = await params;
  const parts = comparison.split('-vs-');
  if (parts.length !== 2) {
    notFound();
  }

  const city1 = CITIES_DATA[parts[0]];
  const city2 = CITIES_DATA[parts[1]];

  if (!city1 || !city2) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[
          { name: 'Compare', url: '/compare' },
          { name: `${city1.name} vs ${city2.name}`, url: `/compare/cities/${comparison}` }
        ]}
      />

      <CityComparisonView city1={city1} city2={city2} />
    </div>
  );
}
