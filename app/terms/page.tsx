import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Terms of Service & Disclaimer | MoveAmerica USA',
  description: 'MoveAmerica USA Terms of Service and statutory disclaimer regarding financial, tax, moving estimate, and legal limitations.',
  alternates: {
    canonical: 'https://moveamericausa.com/terms'
  }
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ name: 'Terms of Service', url: '/terms' }]} />

      <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service & Disclaimer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last updated: October 2026
          </p>
        </div>

        <div className="prose text-slate-600 text-sm leading-relaxed space-y-4">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using MoveAmerica USA (moveamericausa.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Informational & Estimation Nature of Platform (Critical Disclaimer)</h2>
          <p className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-950 font-medium">
            This website provides estimates and general informational content for planning purposes only. Results may vary based on individual circumstances, location, income, household size, taxes, housing costs, and other factors. MoveAmerica USA does not provide legal, tax, financial, immigration, or professional moving brokerage advice.
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Not a Professional Service Provider</h2>
          <p>
            MoveAmerica USA is not a licensed Certified Public Accountant (CPA), financial advisory firm, real estate brokerage, moving carrier, or law firm. All tax models, moving estimates, and cost indices are mathematical approximations based on public government and industry datasets. Users should consult licensed CPAs, attorneys, and USDOT-registered moving carriers for binding quotations and advice.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            In no event shall MoveAmerica USA, its founders, or contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools or information provided on this platform.
          </p>
        </div>
      </article>

      <DisclaimerBanner />
    </div>
  );
}
