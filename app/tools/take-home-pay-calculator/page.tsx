import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Percent, HelpCircle, ArrowRight, Star } from 'lucide-react';
import { TakeHomePayCalculator } from '@/components/calculators/TakeHomePayCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Take-Home Pay Calculator by State (2026 Tax Brackets) | MoveAmerica USA',
  description: 'Calculate your exact net paycheck after Federal income tax, FICA Social Security/Medicare, and State income tax. Compare take-home pay between two states.',
  alternates: {
    canonical: 'https://moveamericausa.com/tools/take-home-pay-calculator'
  },
  openGraph: {
    title: 'Take-Home Pay Calculator by State (2026 Tax Brackets) | MoveAmerica USA',
    description: 'Calculate your exact net paycheck after Federal, FICA, and state income taxes.',
    url: 'https://moveamericausa.com/tools/take-home-pay-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take-Home Pay Calculator | MoveAmerica USA',
    description: 'Simulate your paycheck take-home pay across all 50 US states.'
  }
};

const FAQS = [
  {
    question: 'Which US states have 0% state income tax in 2026?',
    answer: 'Currently, nine states charge 0% personal state income tax on earned wages: Texas, Florida, Washington, Nevada, Tennessee, Wyoming, South Dakota, Alaska, and New Hampshire (interest/dividend tax phaseout complete).'
  },
  {
    question: 'What is FICA tax on my paycheck?',
    answer: 'FICA consists of a 6.2% Social Security tax (applied up to the wage cap of $176,100) and a 1.45% Medicare tax (plus an additional 0.9% on earnings above $200k for single filers or $250k for married couples).'
  }
];

export default function TakeHomePayCalculatorPage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Take-Home Pay Calculator', url: '/tools/take-home-pay-calculator' }
        ]}
      />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-emerald-800 text-emerald-800" />
          <span>2026 Federal & State Tax Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Take-Home Pay Calculator by State
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Simulate your exact net paycheck after Federal income tax, FICA Social Security/Medicare, and individual state income tax brackets.
        </p>
      </header>

      <TakeHomePayCalculator initialState="california" compareState="texas" />

      <AdBanner slotId="tool-tax-mid" format="horizontal" />

      {/* SEO Explanatory Content */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Understanding Your 2026 Take-Home Pay Calculation
        </h2>
        <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Your net paycheck is determined by three distinct layers of taxation:
          </p>
          <ol>
            <li><strong>Federal Income Tax:</strong> Progressive brackets ranging from 10% to 37%, applied after subtracting the 2026 Standard Deduction ($15,000 for single filers, $30,000 for married couples).</li>
            <li><strong>FICA Taxes (Social Security & Medicare):</strong> A mandatory 6.2% Social Security tax on wages up to $176,100, plus a 1.45% Medicare tax on all wages (and an additional 0.9% on wages above $200k/$250k).</li>
            <li><strong>State Income Tax:</strong> Depending on the state, this ranges from 0% (e.g., Texas, Florida, Washington, Nevada, Tennessee) to flat taxes (e.g., Arizona 2.5%, Illinois 4.95%, North Carolina 4.5%) to progressive top rates (e.g., California 13.3%, New York 10.9%, New Jersey 10.75%).</li>
          </ol>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Frequently Asked Questions About State Taxes & Paychecks</span>
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
          Related Relocation Tools
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
              Compare monthly budgets between any two states.
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
              Calculate affordable rent based on income and debt.
            </span>
          </Link>

          <Link
            href="/compare/states/california-vs-texas"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              California vs Texas Report →
            </span>
            <span className="text-slate-500 mt-1 block">
              Compare 0% vs 13.3% state income tax.
            </span>
          </Link>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
