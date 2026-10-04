import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightLeft, HelpCircle, ArrowRight, Star } from 'lucide-react';
import { CostOfLivingCalculator } from '@/components/calculators/CostOfLivingCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Cost of Living Calculator: Compare State Expenses (2026) | MoveAmerica USA',
  description: 'Compare side-by-side monthly expenses for rent, groceries, utilities, transportation, healthcare, and childcare between any two US states.',
  alternates: {
    canonical: 'https://moveamericausa.com/tools/cost-of-living-calculator'
  },
  openGraph: {
    title: 'Cost of Living Calculator: Compare State Expenses (2026) | MoveAmerica USA',
    description: 'Compare side-by-side monthly expenses for rent, groceries, utilities, and transportation between US states.',
    url: 'https://moveamericausa.com/tools/cost-of-living-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cost of Living Calculator | MoveAmerica USA',
    description: 'Build your customized monthly budget comparison for any two US states.'
  }
};

const FAQS = [
  {
    question: 'How is the Cost of Living index calculated?',
    answer: 'The Cost of Living index benchmarks overall regional price levels against the US national average (100). Scores above 100 represent higher than average living expenses, while scores below 100 represent lower living costs.'
  },
  {
    question: 'What is the equivalent salary benchmark?',
    answer: 'The equivalent salary indicates the exact annual gross income you must earn in your destination state to maintain the exact purchasing power and living standards of your current salary.'
  }
];

export default function CostOfLivingCalculatorPage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Cost of Living Calculator', url: '/tools/cost-of-living-calculator' }
        ]}
      />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-blue-900 text-blue-900" />
          <span>Relocation Expense Comparison Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Cost of Living Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Compare side-by-side monthly expenses for rent, groceries, utilities, transportation, and childcare between any two US states.
        </p>
      </header>

      <CostOfLivingCalculator initialOrigin="california" initialDestination="texas" />

      <AdBanner slotId="tool-col-mid" format="horizontal" />

      {/* SEO Explanatory Content */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          How to Use the Cost of Living Calculator
        </h2>
        <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            The MoveAmerica USA Cost of Living Calculator constructs a personalized monthly expense profile based on official BLS Consumer Expenditure data:
          </p>
          <h3 className="text-base font-bold text-slate-900">Key Expense Categories:</h3>
          <ul>
            <li><strong>Housing:</strong> Scales according to whether you rent a multi-bedroom apartment or own a single-family home.</li>
            <li><strong>Household Members & Children:</strong> Dynamically calculates grocery costs and child care/daycare burdens based on household size.</li>
            <li><strong>Equivalent Salary Needed:</strong> Indicates the exact target gross income required in your new state to match your current lifestyle.</li>
          </ul>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Frequently Asked Questions About Cost of Living</span>
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

      {/* Related Tools Internal Links */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Related Decision Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Link
            href="/tools/take-home-pay-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Take-Home Pay Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Calculate net salary after federal & state taxes.
            </span>
          </Link>

          <Link
            href="/tools/rent-affordability-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Rent Affordability Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Find safe rent brackets using the 30% rule.
            </span>
          </Link>

          <Link
            href="/tools/move-score"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Move Score™ Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Multi-factor relocation suitability scoring.
            </span>
          </Link>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
