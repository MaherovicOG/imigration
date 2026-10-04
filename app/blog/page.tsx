import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { BLOG_ARTICLES } from '@/data/blog';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata = {
  title: 'Moving & Cost of Living Guides (2026 Research) | MoveWise USA Blog',
  description: 'In-depth research, tax guides, cost of living breakdowns, and out-of-state moving tips written by relocation and personal finance analysts.',
  alternates: {
    canonical: 'https://movewiseusa.com/blog'
  }
};

export default function BlogIndexPage() {
  const categories = ['All', 'Moving Guides', 'Cost of Living', 'Taxes & Salary', 'State Guides'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Blog & Research', url: '/blog' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>MoveWise Relocation Research</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Moving Guides, Tax Studies & Cost of Living
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Comprehensive, data-driven editorial articles helping you navigate interstate moving costs, rental affordability, and state income tax differences.
        </p>
      </div>

      <AdBanner slotId="blog-index-top" format="horizontal" />

      {/* Featured Article Card */}
      {BLOG_ARTICLES.length > 0 && (
        <Link
          href={`/blog/${BLOG_ARTICLES[0].slug}`}
          className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-blue-500/50 transition-all"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 text-xs text-blue-300 font-semibold">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Featured Guide
              </span>
              <span>•</span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>{BLOG_ARTICLES[0].readingTimeMinutes} min read</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-blue-200 transition-colors leading-tight">
              {BLOG_ARTICLES[0].title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
              {BLOG_ARTICLES[0].summary}
            </p>
          </div>
          <div className="shrink-0 px-5 py-3 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2">
            <span>Read Complete Guide</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      )}

      {/* All Articles Grid */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900">
            All Guides & Research Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTimeMinutes} min
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span className="text-[11px] text-slate-400 font-normal">
                  By {article.author.name}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
