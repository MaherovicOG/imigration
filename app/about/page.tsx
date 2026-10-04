import React from 'react';
import { Metadata } from 'next';
import { Compass, Database, ShieldCheck, Users, Target, CheckCircle2, Star } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'About MoveAmerica USA — Our Mission, Data & Team',
  description: 'Learn about MoveAmerica USA: A 100% free US moving decision platform built with official Census, BLS, and state tax datasets.',
  alternates: {
    canonical: 'https://moveamericausa.com/about'
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'About MoveAmerica USA', url: '/about' }]} />

      <header className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
          <Star className="w-3.5 h-3.5 text-red-600 fill-red-600" />
          <span>Our Mission & Vision</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Move<span className="text-red-600">America</span> USA
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Democratizing transparent, objective relocation intelligence for anyone planning a move across the United States.
        </p>
      </header>

      {/* Mission Box */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 border-2 border-red-600/60">
        <h2 className="text-2xl font-black text-white">
          Our Core Mission: "What would my life look like if I moved from here to there?"
        </h2>
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          Relocating out of state is one of the most consequential decisions an individual or family will make. Yet most people are forced to piece together fragmented blog posts, opaque mover quote forms that trigger aggressive sales calls, and confusing tax tables.
        </p>
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          MoveAmerica USA was created as a <strong>100% free, public decision-making engine</strong>. We provide instant mathematical transparency into state tax brackets, cost of living differentials, realistic moving expenses, and rental affordability without asking for your email or selling your personal information.
        </p>
      </div>

      {/* What We Are NOT */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Our Principles & Clear Positioning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">❌ What We Are Not:</span>
            <ul className="space-y-1.5 text-slate-600">
              <li>• Not a moving broker selling your phone number to telemarketers</li>
              <li>• Not a real estate brokerage or lead generation blog</li>
              <li>• Not an immigration legal firm</li>
              <li>• Not a generic AI-generated content farm</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <span className="font-bold text-blue-950 block text-sm">✅ What We Are:</span>
            <ul className="space-y-1.5 text-blue-900">
              <li>• A free, client-side interactive decision engine</li>
              <li>• Grounded in official US Census, BLS, and Tax Foundation datasets</li>
              <li>• 100% anonymous: No user tracking or accounts required</li>
              <li>• Fast, responsive, and completely accessible</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>Our Data Sources & Methodology</span>
        </h2>
        <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            All benchmarks and statistical indexes on MoveAmerica USA are compiled from authoritative public datasets:
          </p>
          <ul>
            <li><strong>US Census Bureau:</strong> American Community Survey (ACS) 5-year and 1-year estimates for median household income, population, and housing valuations.</li>
            <li><strong>US Bureau of Labor Statistics (BLS):</strong> Occupational Employment and Wage Statistics (OEWS) and Consumer Expenditure Surveys for grocery, healthcare, and utility allocations.</li>
            <li><strong>Tax Foundation & State Departments of Revenue:</strong> Up-to-date state income tax bracket tables, standard deductions, and county-level effective property tax benchmarks.</li>
            <li><strong>US Energy Information Administration (EIA):</strong> Regional retail gasoline and residential electricity tariff datasets.</li>
          </ul>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
