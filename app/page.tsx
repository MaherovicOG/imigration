import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  DollarSign, 
  Percent, 
  Home, 
  CheckSquare, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Calculator,
  ArrowRightLeft,
  BookOpen,
  Star
} from 'lucide-react';
import { StateSelector } from '@/components/comparison/StateSelector';
import { ALL_STATES_LIST } from '@/data/states';
import { FEATURED_COMPARISONS } from '@/data/comparisons';
import { BLOG_ARTICLES } from '@/data/blog';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata = {
  title: 'MoveAmerica USA — Compare States, Moving Costs & Cost of Living (2026)',
  description: 'Free US relocation decision platform. Compare state cost of living, 0% vs progressive income taxes, home prices, calculate moving costs, and find where you can afford to live in America.',
  alternates: {
    canonical: 'https://moveamericausa.com'
  }
};

export default function HomePage() {
  const popularComparisonsList = Object.values(FEATURED_COMPARISONS);

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* PATRIOTIC HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 shadow-2xl border-2 border-slate-800 overflow-hidden">
          {/* Subtle US Flag Background Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 shadow-xs backdrop-blur-md">
              <span className="flex items-center gap-1 text-red-400">
                <Star className="w-3.5 h-3.5 fill-red-400" />
                <Star className="w-3.5 h-3.5 fill-white" />
                <Star className="w-3.5 h-3.5 fill-blue-400" />
              </span>
              <span>100% Free US Relocation Platform • Updated October 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Compare States, Estimate Moving Costs & Find Where You Can Afford to Live
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Planning an out-of-state move? <strong className="text-white">MoveAmerica USA</strong> delivers unbiased, data-backed tools to compare state taxes, living costs, housing prices, net take-home pay, and relocation budgets across all 50 states.
            </p>

            {/* Quick Dual State Comparison Tool */}
            <div className="pt-4 max-w-3xl mx-auto text-left">
              <StateSelector defaultState1="california" defaultState2="texas" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Source Highlights */}
      <section className="border-y border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="block text-2xl font-black text-blue-900">50 States</span>
              <span className="text-xs text-slate-500 font-semibold">Standardized Economic Data</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-red-600">5 Free Tools</span>
              <span className="text-xs text-slate-500 font-semibold">Interactive Cost Calculators</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-blue-900">0% Accounts</span>
              <span className="text-xs text-slate-500 font-semibold">No Signups, 100% Public</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-red-600">Census & BLS</span>
              <span className="text-xs text-slate-500 font-semibold">Official Government Benchmarks</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CALCULATORS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-red-600">
            <Star className="w-3 h-3 fill-red-600" />
            <span>Decision Calculators</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Essential Tools for Your Move Across America
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Calculate your budget, compare tax rates, and evaluate housing affordability before packing a single box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Moving Cost */}
          <Link
            href="/tools/moving-cost-calculator"
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-red-500 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors border border-red-200">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                Moving Cost Calculator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Estimate Low, Typical, and High relocation budgets for full-service professional movers, portable storage containers (PODs), or DIY rental trucks across all driving distances.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
              <span>Calculate moving costs</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 2: Cost of Living */}
          <Link
            href="/tools/cost-of-living-calculator"
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors border border-blue-200">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                Cost of Living Calculator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compare side-by-side monthly expenses for rent, groceries, utilities, transportation, and healthcare between any two states with household size adjustments.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
              <span>Compare monthly expenses</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 3: Take-Home Pay */}
          <Link
            href="/tools/take-home-pay-calculator"
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-red-500 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors border border-red-200">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                Take-Home Pay Calculator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Simulate your exact net paycheck after 2026 Federal tax brackets, FICA Social Security/Medicare, and graduated or 0% state income tax rules.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
              <span>Calculate net paycheck</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 4: Rent Affordability */}
          <Link
            href="/tools/rent-affordability-calculator"
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors border border-blue-200">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                Rent Affordability Calculator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Find out how much rent you can safely afford based on the 30% rule, your debt obligations, and the 50/30/20 personal finance framework.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
              <span>Find recommended rent</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 5: Move Score */}
          <Link
            href="/tools/move-score"
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-red-500 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors border border-red-200">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                Move Score™ Calculator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive an objective 0-to-100 relocation score evaluating living costs, tax differences, housing prices, job growth, and climate trade-offs.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
              <span>Calculate Move Score</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 6: Moving Checklist */}
          <Link
            href="/moving-guides/checklist"
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors border border-blue-200">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                Interactive Moving Checklist
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                An 8-week chronological countdown tracking utilities, DMV transfers, decluttering, mover bookings, and packing tasks stored locally in your browser.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
              <span>Open interactive checklist</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Ad placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner slotId="home-mid-banner" format="horizontal" />
      </div>

      {/* POPULAR STATE COMPARISONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-blue-900">
              <Star className="w-3 h-3 fill-blue-900" />
              <span>In-Depth Relocation Analyses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Popular State Comparisons
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Detailed cost of living, tax formulas, home prices, and relocation guides for top interstate routes.
            </p>
          </div>
          <Link
            href="/compare"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 shrink-0 hover:underline"
          >
            <span>View all comparisons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularComparisonsList.map((comp) => {
            const s1 = ALL_STATES_LIST.find((s) => s.slug === comp.state1Slug) || ALL_STATES_LIST[0];
            const s2 = ALL_STATES_LIST.find((s) => s.slug === comp.state2Slug) || ALL_STATES_LIST[1];
            return (
              <Link
                key={comp.slug}
                href={`/compare/states/${comp.slug}`}
                className="bg-white rounded-2xl border-2 border-slate-200 p-5 hover:border-red-500 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">
                      {s1.code} vs {s2.code}
                    </span>
                    <span className="text-[11px] font-bold text-red-600">
                      ★ 2026 Data
                    </span>
                  </div>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-blue-950 transition-colors">
                    {s1.name} vs {s2.name} Cost of Living
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {comp.metaDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500 font-medium">
                    Median: ${s1.medianHomePrice / 1000}k vs ${s2.medianHomePrice / 1000}k
                  </div>
                  <span className="font-bold text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Compare →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED GUIDES & ARTICLES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-red-600">
              <Star className="w-3 h-3 fill-red-600" />
              <span>Research & Practical Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Moving Guides & Cost Analysis
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Data-backed editorial articles to help you navigate moving budgets, taxes, and rental markets.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 shrink-0 hover:underline"
          >
            <span>View all 10 articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-blue-900 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {article.readingTimeMinutes} min read
                  </span>
                </div>
                <h3 className="font-black text-base text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                <span>Read guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Global Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
