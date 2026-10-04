import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Home, 
  Sun, 
  Clock, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  Scale
} from 'lucide-react';
import { CityData } from '@/data/cities';
import { AdBanner } from '@/components/layout/AdBanner';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

interface CityComparisonViewProps {
  city1: CityData;
  city2: CityData;
}

export function CityComparisonView({ city1, city2 }: CityComparisonViewProps) {
  const colDiff = city2.costOfLivingIndex - city1.costOfLivingIndex;
  const colDiffPercent = Math.round(Math.abs(colDiff) / city1.costOfLivingIndex * 100);
  const isCity2Cheaper = colDiff < 0;

  return (
    <article className="space-y-10">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/20">
            <span>Metro Area Comparison</span>
            <span>•</span>
            <span>2026 Relocation Data</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {city1.name}, {city1.stateCode} vs {city2.name}, {city2.stateCode}: Cost of Living & Moving Guide
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Compare rental prices, median home values, transit times, weather, top job industries, and lifestyle vibes between {city1.name} and {city2.name}.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">
              {city1.name} COL: <strong>{city1.costOfLivingIndex}</strong>
            </span>
            <span className="text-blue-400 font-bold text-sm">VS</span>
            <span className="px-3 py-1.5 rounded-lg bg-blue-600/30 text-blue-200 border border-blue-400/30">
              {city2.name} COL: <strong>{city2.costOfLivingIndex}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
              {isCity2Cheaper ? `${city2.name} is ~${colDiffPercent}% more affordable` : `${city1.name} is ~${colDiffPercent}% more affordable`}
            </span>
          </div>
        </div>
      </div>

      <AdBanner slotId="city-compare-top" format="horizontal" />

      {/* Quick Comparison Table */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {city1.name} vs {city2.name}: Key Metro Indicators
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standardized metropolitan statistical area metrics (US Baseline = 100).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 text-xs uppercase font-bold">
              <tr>
                <th className="p-3.5 border border-slate-200">Metric</th>
                <th className="p-3.5 border border-slate-200 bg-blue-50/50 text-blue-950 font-extrabold">
                  {city1.name}, {city1.stateCode}
                </th>
                <th className="p-3.5 border border-slate-200 bg-indigo-50/50 text-indigo-950 font-extrabold">
                  {city2.name}, {city2.stateCode}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Cost of Living Index</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city1.costOfLivingIndex}</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city2.costOfLivingIndex}</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Median Home Price</td>
                <td className="p-3.5 border border-slate-200 font-bold">${city1.medianHomePrice.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 font-bold">${city2.medianHomePrice.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Median 2-Bed Rent</td>
                <td className="p-3.5 border border-slate-200 font-bold">${city1.medianMonthlyRent.toLocaleString()}/mo</td>
                <td className="p-3.5 border border-slate-200 font-bold">${city2.medianMonthlyRent.toLocaleString()}/mo</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Median Household Income</td>
                <td className="p-3.5 border border-slate-200 font-bold">${city1.medianHouseholdIncome.toLocaleString()}</td>
                <td className="p-3.5 border border-slate-200 font-bold">${city2.medianHouseholdIncome.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Average Commute Time</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city1.avgCommuteMinutes} mins</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city2.avgCommuteMinutes} mins</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Walk Score / Transit Score</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city1.walkScore} / {city1.transitScore}</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city2.walkScore} / {city2.transitScore}</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-semibold text-slate-900">Annual Sunny Days</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city1.sunnyDays} days</td>
                <td className="p-3.5 border border-slate-200 font-bold">{city2.sunnyDays} days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Metro Vibe & Top Industries */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            <span>Living in {city1.name}</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {city1.vibeSummary}
          </p>
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Key Employment Sectors:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {city1.topIndustries.map((ind, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-600" />
            <span>Living in {city2.name}</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {city2.vibeSummary}
          </p>
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Key Employment Sectors:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {city2.topIndustries.map((ind, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 text-xs font-medium">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
    </article>
  );
}
