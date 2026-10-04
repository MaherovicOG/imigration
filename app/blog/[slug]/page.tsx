import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  HelpCircle, 
  ArrowRight, 
  Calculator, 
  BookOpen,
  Share2,
  CheckCircle2,
  Sparkles,
  Star
} from 'lucide-react';
import { BLOG_ARTICLES, getBlogArticleBySlug } from '@/data/blog';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { JsonLd, generateArticleSchema, generateFaqSchema } from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | MoveAmerica USA',
    };
  }

  return {
    title: `${article.title} | MoveAmerica USA`,
    description: article.metaDescription,
    alternates: {
      canonical: `https://moveamericausa.com/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://moveamericausa.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedDate,
      modifiedTime: article.lastUpdatedDate,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription,
    }
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.metaDescription,
    url: `https://moveamericausa.com/blog/${article.slug}`,
    publishedDate: article.publishedDate,
    modifiedDate: article.lastUpdatedDate,
    authorName: article.author.name,
  });

  const faqSchema = generateFaqSchema(article.faqs);

  const relatedArticlesData = article.relatedArticles
    .map((rSlug) => getBlogArticleBySlug(rSlug))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs
        items={[
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` }
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500 font-semibold">
            Updated: October 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>By {article.author.name} ({article.author.role})</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Executive Summary Callout */}
        <div className="bg-blue-50/80 border-l-4 border-blue-600 p-4 rounded-r-xl text-slate-800 text-sm leading-relaxed mt-4">
          <strong className="font-black text-blue-950 block mb-1">Key Takeaway:</strong>
          {article.summary}
        </div>
      </header>

      {/* Table of Contents */}
      {article.tableOfContents.length > 0 && (
        <nav aria-label="Table of contents" className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-blue-950 mb-3 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>In This Article:</span>
          </h2>
          <ol className="space-y-1.5 text-xs font-bold text-blue-900 list-decimal pl-4">
            {article.tableOfContents.map((toc) => (
              <li key={toc.id}>
                <a href={`#${toc.id}`} className="hover:underline hover:text-red-600">
                  {toc.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <AdBanner slotId="article-top-ad" format="horizontal" />

      {/* Main Content Sections */}
      <div className="prose max-w-none text-slate-700 space-y-8">
        {article.contentSections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pb-2 border-b border-slate-100">
              {sec.title}
            </h2>
            <div
              className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}
            />
          </section>
        ))}
      </div>

      <AdBanner slotId="article-mid-ad" format="horizontal" />

      {/* Frequently Asked Questions */}
      {article.faqs.length > 0 && (
        <section id="faq" className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {article.faqs.map((faq, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Interactive Tools */}
      {article.relatedTools.length > 0 && (
        <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-300" />
            <h2 className="text-lg font-black text-white">
              Related MoveAmerica Decision Calculators
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.relatedTools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.url}
                className="bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/15 transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-sm text-white group-hover:text-blue-200 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {tool.description}
                  </p>
                </div>
                <span className="text-xs font-bold text-red-400 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Launch Tool →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticlesData.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-black text-slate-900">
            More Relocation Research & Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticlesData.map((relArt) => {
              if (!relArt) return null;
              return (
                <Link
                  key={relArt.slug}
                  href={`/blog/${relArt.slug}`}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 transition-colors group"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 block mb-1">
                    {relArt.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                    {relArt.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <DisclaimerBanner />
    </div>
  );
}
