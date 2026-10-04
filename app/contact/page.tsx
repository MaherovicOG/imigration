import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ContactForm } from '@/components/contact/ContactForm';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Contact MoveWise USA — Feedback & Corrections',
  description: 'Get in touch with the MoveWise USA editorial and research team for data suggestions, partnership inquiries, or general feedback.',
  alternates: {
    canonical: 'https://movewiseusa.com/contact'
  }
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Contact', url: '/contact' }]} />

      <header className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact & Data Feedback
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Have a suggestion, found a data discrepancy in your local county, or have an idea for a new calculator? We would love to hear from you.
        </p>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block text-sm mb-1">Editorial & Research</span>
            <p className="text-slate-500">For statistical corrections or data source suggestions:</p>
            <span className="font-semibold text-blue-600 block mt-2">research@movewiseusa.com</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block text-sm mb-1">General Inquiries</span>
            <p className="text-slate-500">For press inquiries, feedback, and technical support:</p>
            <span className="font-semibold text-blue-600 block mt-2">hello@movewiseusa.com</span>
          </div>
        </div>

        <ContactForm />
      </div>

      <DisclaimerBanner />
    </div>
  );
}
