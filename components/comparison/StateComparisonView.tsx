import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  DollarSign, 
  Percent, 
  Home, 
  Sun, 
  Briefcase, 
  Truck, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Scale
} from 'lucide-react';
import { StateData } from '@/data/states';
import { ComparisonDetail } from '@/data/comparisons';
import { MoveScoreCalculator } from '@/components/calculators/MoveScoreCalculator';
import { CostOfLivingCalculator } from '@/components/calculators/CostOfLivingCalculator';
import { MovingCostCalculator } from '@/components/calculators/MovingCostCalculator';
import { AdBanner } from '@/components/layout/AdBanner';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { CitationEmbedWidget } from '@/components/seo/CitationEmbedWidget';

interface StateComparisonViewProps {
  comparison: ComparisonDetail;
  state1: StateData;
  state2: StateData;
}

export function StateComparisonView({ comparison, state1, state2 }: StateComparisonViewProps) {
  const faqSchema = generateFaqSchema(comparison.faqs);

  const colDiff = state2.costOfLivingIndex - state1.costOfLivingIndex;
  const colDiffPercent = Math.round(Math.abs(colDiff) / state1.costOfLivingIndex * 100);
  const isState2Cheaper = colDiff < 0;

  return (
    <article className="space-y-12">
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/20">
            <span>2026 US Relocation Index</span>
            <span>•</span>
            <span>Updated October 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {comparison.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {comparison.heroTagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">
              {state1.name} COL: <strong>{state1.costOfLivingIndex}</strong>
            </span>
            <span className="text-blue-400 font-bold text-sm">VS</span>
            <span className="px-3 py-1.5 rounded-lg bg-blue-600/30 text-blue-200 border border-blue-400/30">
              {state2.name} COL: <strong>{state2.costOfLivingIndex}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
              {isState2Cheaper ? `${state2.name} is ~${colDiffPercent}% cheaper` : `${state1.name} is ~${colDiffPercent}% cheaper`}
            </span>
          </div>
        </div>
      </div>

      {/* Ad placement 1 */}
      <AdBanner slotId="compare-top-leaderboard" format="horizontal" />

      {/* SECTION 1: Introduction & Context */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Overview: Moving from {state1.name} to {state2.name}
        </h2>
        <div className="prose text-slate-600 text-base leading-relaxed space-y-3">
          <p>
            Deciding whether to relocate between <strong>{state1.name}</strong> and <strong>{state2.name}</strong> is one of the most critical personal and financial decisions you will make. This comprehensive comparison analyzes official 2026 data from the US Bureau of Labor Statistics, the US Census Bureau, state tax authorities, and housing indexes.
          </p>
          <p>
            Whether you are evaluating a corporate job transfer, transitioning to full-time remote work, seeking lower housing prices, or aiming to reduce your personal state income tax burden, this analysis breaks down the real mathematical numbers behind both destinations.
          </p>
        </div>
      </section>

      {/* SECTION 2: Quick Comparison Table */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {state1.name} vs {state2.name}: Quick Comparison Table
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official benchmark indicators compared against the national baseline (US Avg = 100).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 text-xs uppercase font-bold">
              <tr>
                <th className="p-3.5 border border-slate-200">Indicator</th>
                <th className="p-3.5 border border-slate-200 bg-blue-50/50 text-blue-950 font-extrabold">
                  {state1.name} ({state1.code})
                </th>
                <th className="p-3.5 border border-slate-200 bg-indigo-50/50 text-indigo-950 font-extrabold">
                  {state2.name} ({state2.code})
                </th>
                <th className="p-3.5 border border-slate-200 text-slate-500">US National Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Cost of Living Index</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state1.costOfLivingIndex}</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state2.costOfLivingIndex}</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">100.0</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Median Single-Family Home Price</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state1.medianHomePrice.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state2.medianHomePrice.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">$412,000</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Median 2-Bed Monthly Rent</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state1.medianMonthlyRent.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state2.medianMonthlyRent.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">$1,650</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Top State Individual Income Tax</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state1.stateIncomeTaxMax}%</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state2.stateIncomeTaxMax}%</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">Varies (0-13.3%)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Effective Property Tax Rate</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state1.effectivePropertyTax}%</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state2.effectivePropertyTax}%</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">1.05%</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Combined State + Local Sales Tax</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state1.avgSalesTax}%</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state2.avgSalesTax}%</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">6.57%</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Median Household Income</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state1.medianHouseholdIncome.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state2.medianHouseholdIncome.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">$75,149</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Average Gas Price ($/gal)</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state1.gasPriceAvg.toFixed(2)}</td>
                <td className="p-3.5 border border-slate-200 font-bold">${state2.gasPriceAvg.toFixed(2)}</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">$3.42</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Annual Sunny Days</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state1.sunnyDays} days</td>
                <td className="p-3.5 border border-slate-200 font-bold">{state2.sunnyDays} days</td>
                <td className="p-3.5 border border-slate-200 text-slate-400">205 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: Deep Dive Cost of Living */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <span>Cost of Living Comparison</span>
        </h2>
        <p className="text-slate-600 leading-relaxed">
          {comparison.costAnalysis}
        </p>
      </section>

      {/* SECTION 4: Housing Costs & Rent Comparison */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Home className="w-6 h-6 text-blue-600" />
          <span>Housing Costs & Rent Comparison</span>
        </h2>
        <p className="text-slate-600 leading-relaxed">
          {comparison.housingAnalysis}
        </p>
      </section>

      {/* SECTION 5: Taxes & Take-Home Pay */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Percent className="w-6 h-6 text-blue-600" />
          <span>State Tax Differences: Income, Sales & Property</span>
        </h2>
        <p className="text-slate-600 leading-relaxed">
          {comparison.taxAnalysis}
        </p>
        <div className="pt-2">
          <Link
            href="/tools/take-home-pay-calculator"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800"
          >
            <span>Calculate your exact net paycheck in both states</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 6: Salaries and Career Opportunities */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <span>Salary and Job Market Growth</span>
        </h2>
        <p className="text-slate-600 leading-relaxed">
          {comparison.salaryAndJobsAnalysis}
        </p>
      </section>

      {/* Ad placement 2 */}
      <AdBanner slotId="compare-mid-content" format="horizontal" />

      {/* SECTION 7: Neutral Editorial Verdict */}
      <section className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-slate-600" />
          <span>Objective Editorial Analysis</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {comparison.verdictTitle}
        </h2>
        <p className="text-slate-700 text-base leading-relaxed">
          {comparison.verdictContent}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-2">
              Who Should Choose {state1.name}?
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {comparison.whoShouldMoveToState1.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-2">
              Who Should Choose {state2.name}?
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {comparison.whoShouldMoveToState2.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 8: Interactive Move Score Tool */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Calculate Your Personalized {state1.name} → {state2.name} Move Score
        </h2>
        <MoveScoreCalculator initialOrigin={state1.slug} initialDest={state2.slug} />
      </section>

      {/* SECTION 9: Interactive Cost of Living Calculator */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Compare Monthly Expenses: {state1.name} vs {state2.name}
        </h2>
        <CostOfLivingCalculator initialOrigin={state1.slug} initialDestination={state2.slug} />
      </section>

      {/* SECTION 10: Interactive Moving Cost Estimator */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Estimate Moving Costs from {state1.name} to {state2.name}
        </h2>
        <MovingCostCalculator initialOriginState={state1.slug} initialDestState={state2.slug} />
      </section>

      {/* SECTION 11: Frequently Asked Questions */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Frequently Asked Questions ({state1.name} vs {state2.name})</span>
        </h2>

        <div className="space-y-4">
          {comparison.faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: Related State Comparisons */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Related State Comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link
            href={`/compare/states/${state1.slug}-vs-florida`}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all font-semibold text-xs text-slate-800 flex items-center justify-between group"
          >
            <span>{state1.name} vs Florida</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </Link>
          <Link
            href={`/compare/states/${state1.slug}-vs-texas`}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all font-semibold text-xs text-slate-800 flex items-center justify-between group"
          >
            <span>{state1.name} vs Texas</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </Link>
          <Link
            href={`/compare/states/${state1.slug}-vs-arizona`}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all font-semibold text-xs text-slate-800 flex items-center justify-between group"
          >
            <span>{state1.name} vs Arizona</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </Link>
          <Link
            href={`/compare/states/${state2.slug}-vs-florida`}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all font-semibold text-xs text-slate-800 flex items-center justify-between group"
          >
            <span>{state2.name} vs Florida</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </Link>
          <Link
            href={`/compare/states/new-york-vs-${state2.slug}`}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all font-semibold text-xs text-slate-800 flex items-center justify-between group"
          >
            <span>New York vs {state2.name}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </Link>
          <Link
            href="/compare"
            className="p-3.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100/70 transition-all font-bold text-xs text-blue-700 flex items-center justify-between group"
          >
            <span>Explore All 50 States</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </Link>
        </div>
      </section>

      {/* Citation & Embed Backlink Tool */}
      <CitationEmbedWidget
        title={comparison.title}
        url={`/compare/states/${comparison.slug}`}
      />

      {/* Global Disclaimer */}
      <DisclaimerBanner />
    </article>
  );
}
