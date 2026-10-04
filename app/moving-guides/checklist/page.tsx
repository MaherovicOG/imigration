import React from 'react';
import { Metadata } from 'next';
import { MovingChecklistTool } from '@/components/calculators/MovingChecklistTool';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Interactive Out-of-State Moving Checklist (2026) | MoveWise USA',
  description: 'Free interactive moving checklist with 8-week countdown, printable checklist, and client-side progress saving for your interstate move.',
  alternates: {
    canonical: 'https://movewiseusa.com/moving-guides/checklist'
  }
};

export default function MovingChecklistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Moving Guides', url: '/moving-guides' },
          { name: 'Interactive Checklist', url: '/moving-guides/checklist' }
        ]}
      />

      <MovingChecklistTool />

      <AdBanner slotId="checklist-bottom-ad" format="horizontal" />

      {/* SEO Explanatory Content */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          How to Manage an Out-of-State Relocation Timeline
        </h2>
        <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Relocating across state lines involves dozens of simultaneous logistical, financial, and legal tasks. Breaking your move into chronological milestones guarantees that critical items—such as obtaining written mover estimates, transferring medical records, and scheduling utility transitions—happen without stress.
          </p>
          <p>
            <strong>Privacy Guarantee:</strong> All completed checkmarks and custom tasks are stored 100% locally in your browser's localStorage. No personal data or moving details are ever uploaded or stored in a remote database.
          </p>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
