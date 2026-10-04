import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | MoveAmerica USA',
  description: 'MoveAmerica USA privacy policy: We do not require accounts, do not store financial calculations on remote servers, and respect user privacy.',
  alternates: {
    canonical: 'https://moveamericausa.com/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy' }]} />

      <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last updated: October 2026
          </p>
        </div>

        <div className="prose text-slate-600 text-sm leading-relaxed space-y-4">
          <p>
            At <strong>MoveAmerica USA</strong> (accessible at moveamericausa.com), user privacy and anonymity are fundamental to our platform philosophy. This Privacy Policy explains what information is collected and how it is used.
          </p>

          <h2 className="text-lg font-bold text-slate-900">1. No User Accounts & No Database Storage</h2>
          <p>
            MoveAmerica USA does not require account registration, login credentials, or personal email addresses to access any comparison, guide, or calculator. All interactive calculator inputs (including salary figures, debt balances, and moving checklist progress) are computed in real time inside your web browser or stored locally in your browser’s localStorage. None of your financial calculations are transmitted to or stored on our servers.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Cookies & Web Beacons</h2>
          <p>
            Like any modern website, MoveAmerica USA uses standard cookies to ensure website functionality and to serve non-intrusive contextual advertising via Google AdSense.
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Google AdSense & Advertising</h2>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on MoveAmerica USA. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ad Settings.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Analytics</h2>
          <p>
            We may use privacy-preserving web analytics to understand aggregate traffic trends (e.g. which state comparisons are most popular) without collecting personally identifiable information (PII).
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Contact Us</h2>
          <p>
            If you have questions about our privacy policy, contact us at privacy@moveamericausa.com.
          </p>
        </div>
      </article>
    </div>
  );
}
