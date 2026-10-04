import React from 'react';
import Link from 'next/link';
import { CheckSquare, BookOpen, Truck, ArrowRight, Calendar, Compass } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { BLOG_ARTICLES } from '@/data/blog';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata = {
  title: 'US Moving Guides, Checklist & Resources (2026) | MoveWise USA',
  description: 'Comprehensive guides, checklists, and timelines for planning an out-of-state move in America.',
  alternates: {
    canonical: 'https://movewiseusa.com/moving-guides'
  }
};

export default function MovingGuidesHubPage() {
  const movingArticles = BLOG_ARTICLES.filter((a) => a.category === 'Moving Guides');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Moving Guides', url: '/moving-guides' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>Relocation Resources Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Moving Guides & Interactive Checklists
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Everything you need to plan, budget, declutter, and execute a seamless out-of-state relocation.
        </p>
      </div>

      {/* Featured Checklist Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/20">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            The 8-Week Out-of-State Moving Checklist
          </h2>
          <p className="text-sm text-slate-300">
            A comprehensive, client-side interactive task manager tracking utility transfers, DMV deadlines, packing schedules, and moving day logistics.
          </p>
        </div>
        <Link
          href="/moving-guides/checklist"
          className="shrink-0 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-2"
        >
          <span>Open Interactive Checklist</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <AdBanner slotId="guides-hub-mid" format="horizontal" />

      {/* Moving Guides Articles */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Step-by-Step Moving Guides
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Practical advice from experienced relocation analysts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movingArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 inline-block">
                  {article.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Read guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
