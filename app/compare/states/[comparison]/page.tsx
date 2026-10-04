import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getComparisonData, FEATURED_COMPARISONS } from '@/data/comparisons';
import { getStateBySlug, ALL_STATES_LIST, US_AVERAGE } from '@/data/states';
import { StateComparisonView } from '@/components/comparison/StateComparisonView';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface PageProps {
  params: Promise<{
    comparison: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(FEATURED_COMPARISONS).map((slug) => ({
    comparison: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { comparison } = await params;
  const data = getComparisonData(comparison);

  if (!data) {
    return {
      title: 'State Comparison Not Found | MoveAmerica USA',
    };
  }

  return {
    title: `${data.title} | MoveAmerica USA`,
    description: data.metaDescription,
    alternates: {
      canonical: `https://moveamericausa.com/compare/states/${data.slug}`,
    },
    openGraph: {
      title: `${data.title} — 2026 Cost of Living & Tax Analysis`,
      description: data.metaDescription,
      url: `https://moveamericausa.com/compare/states/${data.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.metaDescription,
    }
  };
}

export default async function StateComparisonPage({ params }: PageProps) {
  const { comparison } = await params;
  const comparisonData = getComparisonData(comparison);

  if (!comparisonData) {
    notFound();
  }

  const state1 = getStateBySlug(comparisonData.state1Slug) || US_AVERAGE;
  const state2 = getStateBySlug(comparisonData.state2Slug) || US_AVERAGE;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[
          { name: 'Compare', url: '/compare' },
          { name: `${state1.name} vs ${state2.name}`, url: `/compare/states/${comparisonData.slug}` }
        ]}
      />

      <StateComparisonView
        comparison={comparisonData}
        state1={state1}
        state2={state2}
      />
    </div>
  );
}
