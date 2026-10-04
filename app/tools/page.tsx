import React from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  ArrowRightLeft, 
  Percent, 
  Home, 
  TrendingUp, 
  CheckSquare, 
  ArrowRight,
  Calculator
} from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

export const metadata = {
  title: 'Relocation Calculators & Decision Tools (2026) | MoveWise USA',
  description: 'Free relocation decision calculators: Moving Cost Estimator, Cost of Living Comparison, Take-Home Pay Simulator, Rent Affordability, and Move Score.',
  alternates: {
    canonical: 'https://movewiseusa.com/tools'
  }
};

export default function ToolsDirectoryPage() {
  const tools = [
    {
      title: 'Moving Cost Calculator',
      href: '/tools/moving-cost-calculator',
      icon: DollarSign,
      color: 'blue',
      description: 'Estimate realistic Low, Typical, and High moving costs based on driving miles, home size, and pro movers vs DIY trucks.'
    },
    {
      title: 'Cost of Living Calculator',
      href: '/tools/cost-of-living-calculator',
      icon: ArrowRightLeft,
      color: 'emerald',
      description: 'Compare side-by-side monthly expenses for rent, groceries, utilities, transportation, and childcare across any two states.'
    },
    {
      title: 'Take-Home Pay Calculator',
      href: '/tools/take-home-pay-calculator',
      icon: Percent,
      color: 'indigo',
      description: 'Calculate your exact paycheck after Federal, FICA, and state income tax brackets, with side-by-side state tax comparison.'
    },
    {
      title: 'Rent Affordability Calculator',
      href: '/tools/rent-affordability-calculator',
      icon: Home,
      color: 'purple',
      description: 'Determine your recommended rent brackets using the 30% gross income rule, debt-to-income limits, and the 50/30/20 framework.'
    },
    {
      title: 'Move Score Calculator',
      href: '/tools/move-score',
      icon: TrendingUp,
      color: 'amber',
      description: 'Generate an objective 0-to-100 relocation score evaluating living costs, taxes, home prices, job growth, and climate trade-offs.'
    },
    {
      title: 'Interactive Moving Checklist',
      href: '/moving-guides/checklist',
      icon: CheckSquare,
      color: 'teal',
      description: 'A countdown checklist from 8 weeks out to moving day with client-side progress saving and printer-friendly layout.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Tools & Calculators', url: '/tools' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Decision Calculators</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Relocation Tools & Calculators
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Plan your out-of-state move with mathematical precision. All our calculators are 100% free to use with zero registration or logins required.
        </p>
      </div>

      <AdBanner slotId="tools-directory-top" format="horizontal" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Launch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      <DisclaimerBanner />
    </div>
  );
}
