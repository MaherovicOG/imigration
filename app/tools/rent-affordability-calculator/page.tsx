import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, HelpCircle, ArrowRight, Star } from 'lucide-react';
import { RentAffordabilityCalculator } from '@/components/calculators/RentAffordabilityCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Rent Affordability Calculator: How Much Rent Can I Afford? (2026) | MoveAmerica USA',
  description: 'Calculate your recommended rent based on your annual income, debt obligations, the 30% rule, and the 50/30/20 budget framework.',
  alternates: {
    canonical: 'https://moveamericausa.com/tools/rent-affordability-calculator'
  },
  openGraph: {
    title: 'Rent Affordability Calculator (30% Rule & DTI) | MoveAmerica USA',
    description: 'Calculate your recommended rent based on your annual income, debt obligations, and the 30% rule.',
    url: 'https://moveamericausa.com/tools/rent-affordability-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent Affordability Calculator | MoveAmerica USA',
    description: 'Find your safe rent brackets based on your income and monthly debt obligations.'
  }
};

const FAQS = [
  {
    question: 'What is the 30% rent rule?',
    answer: 'The 30% rule recommends spending no more than 30% of your gross monthly income on housing costs (rent plus baseline utilities) to maintain financial flexibility for savings and retirement.'
  },
  {
    question: 'What is the landlord 40x rule?',
    answer: 'In major rental markets (such as New York City, Boston, and San Francisco), landlords often require your annual gross income to equal at least 40 times the monthly rent to qualify for a lease agreement.'
  }
];

export default function RentAffordabilityCalculatorPage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Rent Affordability Calculator', url: '/tools/rent-affordability-calculator' }
        ]}
      />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-indigo-900 text-indigo-900" />
          <span>Housing Affordability & DTI Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Rent Affordability Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Determine how much rent you can safely afford based on the 30% gross income rule, existing monthly debt obligations, and the 50/30/20 budget framework.
        </p>
      </header>

      <RentAffordabilityCalculator />

      <AdBanner slotId="tool-rent-mid" format="horizontal" />

      {/* SEO Explanatory Content */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          How to Calculate Your Maximum Safe Rent
        </h2>
        <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            When searching for an apartment, you should balance personal budget sustainability against formal landlord qualification requirements:
          </p>
          <h3 className="text-base font-bold text-slate-900">Recommended Rent Tiers:</h3>
          <ul>
            <li><strong>Conservative (25% of gross):</strong> Allows rapid debt elimination, maximum 401(k) contributions, and generous travel budgets.</li>
            <li><strong>Moderate (30% of gross):</strong> The standard US benchmark recommended by financial advisors for a healthy financial life.</li>
            <li><strong>Maximum Cap (35% of gross):</strong> Upper limit for high-cost coastal cities (SF, NYC) where compromises are necessary.</li>
          </ul>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Frequently Asked Questions About Rent Affordability</span>
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
            href="/tools/cost-of-living-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Cost of Living Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Compare rental expenses across US states.
            </span>
          </Link>

          <Link
            href="/tools/take-home-pay-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Take-Home Pay Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Calculate your monthly after-tax cash flow.
            </span>
          </Link>

          <Link
            href="/blog/how-much-rent-can-i-afford-complete-guide"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Complete Rent Guide (Article) →
            </span>
            <span className="text-slate-500 mt-1 block">
              In-depth rent affordability analysis by salary.
            </span>
          </Link>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
