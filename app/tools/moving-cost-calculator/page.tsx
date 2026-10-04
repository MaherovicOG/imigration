import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, HelpCircle, ArrowRight, Truck, Info, Star } from 'lucide-react';
import { MovingCostCalculator } from '@/components/calculators/MovingCostCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Interstate Moving Cost Calculator (2026 Estimates) | MoveAmerica USA',
  description: 'Calculate realistic out-of-state moving costs: Compare full-service movers vs moving pods vs DIY rental trucks, with low, typical, and high estimates.',
  alternates: {
    canonical: 'https://moveamericausa.com/tools/moving-cost-calculator'
  },
  openGraph: {
    title: 'Interstate Moving Cost Calculator (2026 Estimates) | MoveAmerica USA',
    description: 'Calculate realistic out-of-state moving costs: Compare full-service movers vs moving pods vs DIY rental trucks.',
    url: 'https://moveamericausa.com/tools/moving-cost-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interstate Moving Cost Calculator | MoveAmerica USA',
    description: 'Estimate realistic moving budgets across all 50 US states.'
  }
};

const FAQS = [
  {
    question: 'How much does it typically cost to move to another state?',
    answer: 'The typical cost for an interstate move ranges from $3,200 to $6,800 for a 2-to-3 bedroom home traveling an average distance of 1,200 miles. DIY rental trucks cost between $1,400 and $2,800 with fuel and tolls.'
  },
  {
    question: 'What is the cheapest way to move across the country?',
    answer: 'Renting a moving truck (Penske, U-Haul, Budget) or booking a freight container service (U-Pack, PODS) where you load and unload your own items is generally the most cost-effective method.'
  },
  {
    question: 'What factors determine the final price of hiring professional movers?',
    answer: 'Interstate moving companies calculate charges primarily based on the certified shipment weight (in pounds), total driving mileage, stair/elevator access, and optional full-value protection insurance.'
  }
];

export default function MovingCostCalculatorPage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Moving Cost Calculator', url: '/tools/moving-cost-calculator' }
        ]}
      />

      {/* Hero Title Section */}
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-red-600" />
          <span>Interstate Relocation Budget Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Interstate Moving Cost Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Estimate realistic Low, Typical, and High moving costs based on driving miles, home size, and moving method across all 50 US states.
        </p>
      </header>

      {/* Interactive Tool Component */}
      <MovingCostCalculator initialOriginState="california" initialDestState="texas" />

      <AdBanner slotId="tool-moving-cost-mid" format="horizontal" />

      {/* SEO Explanatory Content */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          How Our Moving Cost Calculator Works
        </h2>
        <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            The MoveAmerica USA Interstate Moving Cost Calculator computes relocation budgets based on real-world industry freight weight models, driving distance tables, and current fuel and labor indices.
          </p>
          <h3 className="text-base font-bold text-slate-900">Key Calculation Factors:</h3>
          <ul>
            <li><strong>Dwelling Weight Estimator:</strong> A studio apartment averages ~2,000 lbs, whereas a 3-bedroom single family home averages ~9,500 lbs. Professional movers bill long-distance freight based on total weight and mileage.</li>
            <li><strong>Mileage Formulas:</strong> Highway driving distance between origin and destination states includes standard road transit routing.</li>
            <li><strong>Method Comparison:</strong> Compare the total cost of hiring full-service movers against renting a moving container (POD) or driving a DIY 26-foot rental truck with fuel and toll expenses.</li>
          </ul>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Frequently Asked Questions About Moving Costs</span>
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
            href="/tools/cost-of-living-calculator"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Cost of Living Calculator →
            </span>
            <span className="text-slate-500 mt-1 block">
              Compare monthly expenses between two states.
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
              Simulate net salary after federal and state taxes.
            </span>
          </Link>

          <Link
            href="/moving-guides/checklist"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group block"
          >
            <span className="font-bold text-slate-900 block group-hover:text-blue-600">
              Moving Checklist →
            </span>
            <span className="text-slate-500 mt-1 block">
              8-week interactive relocation task manager.
            </span>
          </Link>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
