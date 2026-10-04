import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, HelpCircle, ArrowRight, Star } from 'lucide-react';
import { MoveScoreCalculator } from '@/components/calculators/MoveScoreCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Move Score™ Calculator: Compare Relocation Suitability (2026) | MoveAmerica USA',
  description: 'Calculate an objective 0-to-100 relocation suitability score comparing living costs, taxes, housing affordability, job growth, and climate trade-offs.',
  alternates: {
    canonical: 'https://moveamericausa.com/tools/move-score'
  },
  openGraph: {
    title: 'Move Score™ Calculator: Compare Relocation Suitability (2026) | MoveAmerica USA',
    description: 'Calculate an objective 0-to-100 relocation score evaluating living costs, taxes, home prices, and job growth.',
    url: 'https://moveamericausa.com/tools/move-score',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Move Score™ Calculator | MoveAmerica USA',
    description: 'Score any US state relocation route based on your personal priorities.'
  }
};

const FAQS = [
  {
    question: 'How is the Move Score calculated?',
    answer: 'The Move Score combines six core pillars: Cost of Living, Housing Affordability, Tax Environment, Jobs & Economy, Weather/Climate, and Quality of Life. You can customize the weighting of each factor based on what matters most to your household.'
  },
  {
    question: 'What is considered a good Move Score?',
    answer: 'Scores of 85+ (Grade A/A+) represent exceptionally strong relocation financial and lifestyle upgrades. Scores between 70 and 84 (Grade B/B+) represent balanced trade-offs.'
  }
];

export default function MoveScorePage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Move Score Calculator', url: '/tools/move-score' }
        ]}
      />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-blue-900 text-blue-900" />
          <span>MoveWise Multi-Factor Decision Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Move Score™ Relocation Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Calculate a personalized 0-to-100 relocation suitability score comparing living costs, taxes, housing affordability, job growth, and climate trade-offs.
        </p>
      </header>

      <MoveScoreCalculator initialOrigin="california" initialDest="texas" />

      <AdBanner slotId="tool-movescore-mid" format="horizontal" />

      {/* SEO Explanatory Content */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          How the Move Score Is Calculated
        </h2>
        <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            The MoveAmerica USA Move Score evaluates relocation destinations across six distinct economic and quality-of-life pillars:
          </p>
          <ol>
            <li><strong>Cost of Living (25% default weight):</strong> Evaluates regional grocery, healthcare, and utility expenses against the national benchmark (100).</li>
            <li><strong>Housing Affordability (25% default weight):</strong> Evaluates median home prices and 2-bedroom rental rates relative to median household earnings.</li>
            <li><strong>Tax Environment (20% default weight):</strong> Combines top marginal income tax rates, effective residential property tax rates, and state/local sales tax burdens.</li>
            <li><strong>Jobs & Economic Growth (15% default weight):</strong> Analyzes 5-year job creation velocity, unemployment rate, and median wage growth.</li>
            <li><strong>Weather & Sunshine (10% default weight):</strong> Analyzes annual sunny days and winter temperature averages.</li>
            <li><strong>Infrastructure & Public Services (5% default weight):</strong> Measures public transit reliability and educational access.</li>
          </ol>
          <p className="text-xs text-slate-400 mt-2">
            *The score is an analytical decision aid based on available datasets and user-configured weights, not a guarantee of individual satisfaction.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Frequently Asked Questions About Move Score</span>
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 mb-1">{faq.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Related Decision Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Link
            href="/tools/moving-cost-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Moving Cost Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Estimate physical moving costs between states.
            </span>
          </Link>

          <Link
            href="/tools/cost-of-living-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Cost of Living Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Side-by-side monthly expense comparison.
            </span>
          </Link>

          <Link
            href="/compare"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Compare All 50 States →
            </span>
            <span className="text-slate-500 mt-1 block">
              Browse full state comparison directory.
            </span>
          </Link>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
