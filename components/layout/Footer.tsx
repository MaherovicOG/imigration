import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Database, Calendar, Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-700 border-2 border-red-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                USA
              </div>
              <span className="font-black text-2xl text-white tracking-tight">
                Move<span className="text-red-500">America</span>
                <span className="ml-1 text-xs font-bold text-blue-400 uppercase tracking-widest">USA</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              A free, data-driven decision-making platform for individuals and families planning an interstate move within the United States. Compare living costs, calculate taxes, estimate moving budgets, and plan with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 font-semibold text-blue-400">
                <Database className="w-4 h-4" />
                <span>BLS & Census Data</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-red-400">
                <Calendar className="w-4 h-4" />
                <span>Updated: October 2026</span>
              </div>
            </div>
          </div>

          {/* Popular Comparisons */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <Star className="w-3 h-3 text-red-500 fill-red-500" />
              <span>Top State Comparisons</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/compare/states/california-vs-texas" className="hover:text-white transition-colors">
                  California vs Texas
                </Link>
              </li>
              <li>
                <Link href="/compare/states/california-vs-florida" className="hover:text-white transition-colors">
                  California vs Florida
                </Link>
              </li>
              <li>
                <Link href="/compare/states/new-york-vs-florida" className="hover:text-white transition-colors">
                  New York vs Florida
                </Link>
              </li>
              <li>
                <Link href="/compare/states/new-york-vs-texas" className="hover:text-white transition-colors">
                  New York vs Texas
                </Link>
              </li>
              <li>
                <Link href="/compare/states/illinois-vs-texas" className="hover:text-white transition-colors">
                  Illinois vs Texas
                </Link>
              </li>
              <li>
                <Link href="/compare/states/california-vs-arizona" className="hover:text-white transition-colors">
                  California vs Arizona
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-red-400 hover:text-red-300 font-bold">
                  View All State Comparisons →
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators & Decision Tools */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <Star className="w-3 h-3 text-blue-400 fill-blue-400" />
              <span>Decision Calculators</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/tools/moving-cost-calculator" className="hover:text-white transition-colors">
                  Moving Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/cost-of-living-calculator" className="hover:text-white transition-colors">
                  Cost of Living Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/take-home-pay-calculator" className="hover:text-white transition-colors">
                  Take-Home Pay Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/rent-affordability-calculator" className="hover:text-white transition-colors">
                  Rent Affordability Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/move-score" className="hover:text-white transition-colors">
                  Personal Move Score™
                </Link>
              </li>
              <li>
                <Link href="/moving-guides/checklist" className="hover:text-white transition-colors">
                  Interactive Moving Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Resources & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Guides & Research Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About MoveAmerica USA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service & Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Data Sources & Transparency */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="font-bold text-slate-300">Authoritative American Data Sources:</div>
          <p className="leading-relaxed">
            MoveAmerica USA compiles official data metrics from the US Census Bureau (American Community Survey), Bureau of Labor Statistics (BLS OEWS), US Energy Information Administration (EIA Gas Benchmarks), Tax Foundation State Tax Indexes, and local county tax assessors. All cost indices and tax calculations are updated periodically for current year planning.
          </p>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
            <span>
              This website provides estimates and general informational content for planning purposes only. Results may vary based on individual circumstances, location, income, household size, taxes, housing costs, and other factors. MoveAmerica USA does not provide legal, tax, financial, immigration, or professional advice.
            </span>
          </div>
          <div className="shrink-0 text-slate-400 font-medium">
            © {new Date().getFullYear()} MoveAmerica USA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
