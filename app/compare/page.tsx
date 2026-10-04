import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles, Building, ArrowRightLeft } from 'lucide-react';
import { ALL_STATES_LIST } from '@/data/states';
import { FEATURED_COMPARISONS } from '@/data/comparisons';
import { CITIES_DATA } from '@/data/cities';
import { StateSelector } from '@/components/comparison/StateSelector';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata = {
  title: 'Compare US States & Cities: Cost of Living, Taxes & Relocation Data (2026)',
  description: 'Explore side-by-side state and city comparisons across the US. Compare living costs, 0% vs graduated income taxes, home prices, weather, and relocation budgets.',
  alternates: {
    canonical: 'https://movewiseusa.com/compare'
  }
};

export default function CompareDirectoryPage() {
  const featuredList = Object.values(FEATURED_COMPARISONS);
  const citiesList = Object.values(CITIES_DATA);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Compare', url: '/compare' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Relocation Comparison Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Compare US States & Metropolitan Areas
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Select any two US states or major cities to view in-depth cost of living indexes, state tax bracket breakdowns, median real estate pricing, and estimated moving costs.
        </p>

        {/* State Selector */}
        <div className="pt-4 text-left">
          <StateSelector defaultState1="california" defaultState2="texas" />
        </div>
      </div>

      <AdBanner slotId="compare-directory-top" format="horizontal" />

      {/* Featured State Comparisons */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Featured State Comparisons (2026 Data)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            The top 10 most requested interstate relocation routes in the United States.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredList.map((comp) => {
            const s1 = ALL_STATES_LIST.find((s) => s.slug === comp.state1Slug) || ALL_STATES_LIST[0];
            const s2 = ALL_STATES_LIST.find((s) => s.slug === comp.state2Slug) || ALL_STATES_LIST[1];
            return (
              <Link
                key={comp.slug}
                href={`/compare/states/${comp.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                      {s1.code} vs {s2.code}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      COL {s1.costOfLivingIndex} vs {s2.costOfLivingIndex}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {s1.name} vs {s2.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {comp.metaDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>View Full Comparison</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Major City Comparisons */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Popular City & Metro Area Comparisons
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Compare rental markets, commute times, and job industries between major US metropolitan areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link
            href="/compare/cities/los-angeles-vs-austin"
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                CA vs TX
              </span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                Los Angeles vs Austin
              </h3>
              <p className="text-xs text-slate-500">
                Compare West Coast entertainment and tech hub against Texas Silicon Hills with 0% state income tax.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Compare LA vs Austin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/compare/cities/new-york-city-vs-miami"
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                NY vs FL
              </span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                New York City vs Miami
              </h3>
              <p className="text-xs text-slate-500">
                Compare finance capital NYC with Wall Street South in Miami, sunshine, and zero local income taxes.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Compare NYC vs Miami</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/compare/cities/san-francisco-vs-seattle"
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                CA vs WA
              </span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                San Francisco vs Seattle
              </h3>
              <p className="text-xs text-slate-500">
                Compare Silicon Valley tech epicenter with Seattle cloud giants and 0% state wage income tax.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Compare SF vs Seattle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* All States Quick Directory */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Browse by State
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs font-semibold">
          {ALL_STATES_LIST.map((state) => (
            <Link
              key={state.slug}
              href={`/compare/states/${state.slug}-vs-texas`}
              className="p-2.5 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 transition-colors"
            >
              {state.name} ({state.code})
            </Link>
          ))}
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
