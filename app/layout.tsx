import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd, generateWebSiteSchema, generateOrganizationSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://moveamericausa.com'),
  title: {
    default: 'MoveAmerica USA — Free US Moving Decision Platform & Calculators',
    template: '%s | MoveAmerica USA'
  },
  description: 'Compare US states & cities, estimate out-of-state moving costs, calculate take-home pay, compare cost of living, and find where you can afford to live in America.',
  keywords: [
    'cost of living comparison',
    'state to state moving calculator',
    'moving cost estimator',
    'california vs texas cost of living',
    'rent affordability calculator',
    'take home pay by state',
    'moving checklist',
    'best states to move to'
  ],
  authors: [{ name: 'MoveAmerica USA Editorial Team' }],
  creator: 'MoveAmerica USA',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moveamericausa.com',
    siteName: 'MoveAmerica USA',
    title: 'MoveAmerica USA — US Moving Decision Platform & Cost Calculators',
    description: 'A free data-driven decision-making platform for people planning a move within the United States.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MoveAmerica USA - US Moving Decision Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoveAmerica USA — US Moving Decision Platform',
    description: 'Compare living costs, taxes, home prices, and calculate realistic moving budgets across all 50 US states.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={generateWebSiteSchema()} />
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-100 selection:text-red-900 font-sans">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
