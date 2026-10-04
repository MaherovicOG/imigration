'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Percent, 
  DollarSign, 
  ArrowRight, 
  ShieldAlert, 
  TrendingUp, 
  Building, 
  Info,
  Scale
} from 'lucide-react';
import { ALL_STATES_LIST, getStateBySlug } from '@/data/states';
import { calculateTakeHomePay, FilingStatus } from '@/data/taxes';

interface TakeHomePayCalculatorProps {
  initialState?: string;
  compareState?: string;
}

export function TakeHomePayCalculator({
  initialState = 'california',
  compareState = 'texas'
}: TakeHomePayCalculatorProps) {
  const [salary, setSalary] = useState<number>(95000);
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [comparisonState, setComparisonState] = useState<string>(compareState);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [preTaxDeductions, setPreTaxDeductions] = useState<number>(3000);

  const state1Data = ALL_STATES_LIST.find((s) => s.slug === selectedState) || ALL_STATES_LIST[0];
  const state2Data = ALL_STATES_LIST.find((s) => s.slug === comparisonState) || ALL_STATES_LIST[1];

  const result1 = useMemo(() => {
    return calculateTakeHomePay(salary, selectedState, filingStatus, preTaxDeductions);
  }, [salary, selectedState, filingStatus, preTaxDeductions]);

  const result2 = useMemo(() => {
    return calculateTakeHomePay(salary, comparisonState, filingStatus, preTaxDeductions);
  }, [salary, comparisonState, filingStatus, preTaxDeductions]);

  const annualTaxDifference = result2.netAnnualPay - result1.netAnnualPay;
  const monthlyTaxDifference = result2.netMonthlyPay - result1.netMonthlyPay;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-950 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/20">
          <Percent className="w-3.5 h-3.5" />
          <span>2026 Federal & State Tax Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Take-Home Pay & Net Salary Calculator
        </h2>
        <p className="text-sm text-emerald-100 mt-1 max-w-2xl">
          Estimate your exact paycheck take-home after Federal Income Tax, Social Security, Medicare, and individual State Income Tax brackets.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Salary Input */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Gross Annual Salary
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-base">
                $
              </span>
              <input
                type="number"
                min={10000}
                max={2000000}
                step={5000}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Filing Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-emerald-500 focus:outline-none"
            >
              <option value="single">Single Filer</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head_of_household">Head of Household</option>
            </select>
          </div>

          {/* Pre-Tax Deductions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Annual 401(k) / Pre-Tax
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-semibold">
                $
              </span>
              <input
                type="number"
                min={0}
                max={60000}
                step={500}
                value={preTaxDeductions}
                onChange={(e) => setPreTaxDeductions(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white pl-7 pr-3 py-2.5 text-sm font-medium text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Primary State */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Primary State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`tax-s1-${s.slug}`} value={s.slug}>
                  {s.name} (Top Tax: {s.stateIncomeTaxMax}%)
                </option>
              ))}
            </select>
          </div>

          {/* Comparison State */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Compare Against Second State
            </label>
            <select
              value={comparisonState}
              onChange={(e) => setComparisonState(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`tax-s2-${s.slug}`} value={s.slug}>
                  {s.name} (Top Tax: {s.stateIncomeTaxMax}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* COMPARISON HERO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Primary State Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {state1Data.name} Take-Home
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                  ${result1.netAnnualPay.toLocaleString()}
                  <span className="text-sm font-medium text-slate-500"> / year</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400 block">Total Effective Tax</span>
                <span className="text-lg font-bold text-slate-800">
                  {result1.totalEffectiveTaxRate.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-400 block">Monthly Paycheck</span>
                <span className="font-bold text-slate-900 text-base">
                  ${result1.netMonthlyPay.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-400 block">Bi-Weekly Paycheck</span>
                <span className="font-bold text-slate-900 text-base">
                  ${result1.netBiWeeklyPay.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Deductions breakdown */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Federal Income Tax</span>
                <span className="font-semibold text-slate-800">-${result1.federalTax.toLocaleString()} ({result1.effectiveFederalRate.toFixed(1)}%)</span>
              </div>
              <div className="flex justify-between">
                <span>Social Security (FICA)</span>
                <span className="font-semibold text-slate-800">-${result1.socialSecurityTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Medicare (FICA)</span>
                <span className="font-semibold text-slate-800">-${result1.medicareTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>State Income Tax ({state1Data.code})</span>
                <span className="text-rose-700">-${result1.stateTax.toLocaleString()} ({result1.effectiveStateRate.toFixed(1)}%)</span>
              </div>
            </div>
          </div>

          {/* Comparison State Card */}
          <div className="bg-emerald-50/70 rounded-2xl border-2 border-emerald-500/50 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {state2Data.name} Take-Home
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-0.5">
                  ${result2.netAnnualPay.toLocaleString()}
                  <span className="text-sm font-medium text-emerald-700"> / year</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-700 block">Total Effective Tax</span>
                <span className="text-lg font-bold text-emerald-950">
                  {result2.totalEffectiveTaxRate.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded-lg border border-emerald-200">
                <span className="text-xs text-slate-400 block">Monthly Paycheck</span>
                <span className="font-bold text-slate-900 text-base">
                  ${result2.netMonthlyPay.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-200">
                <span className="text-xs text-slate-400 block">Bi-Weekly Paycheck</span>
                <span className="font-bold text-slate-900 text-base">
                  ${result2.netBiWeeklyPay.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Deductions breakdown */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-emerald-200">
              <div className="flex justify-between">
                <span>Federal Income Tax</span>
                <span className="font-semibold text-slate-800">-${result2.federalTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Social Security (FICA)</span>
                <span className="font-semibold text-slate-800">-${result2.socialSecurityTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Medicare (FICA)</span>
                <span className="font-semibold text-slate-800">-${result2.medicareTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-emerald-200">
                <span>State Income Tax ({state2Data.code})</span>
                <span className="text-emerald-800">-${result2.stateTax.toLocaleString()} ({result2.effectiveStateRate.toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* NET TAKE-HOME GAIN/LOSS CALLOUT */}
        {annualTaxDifference !== 0 && (
          <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Net State Tax Relocation Impact
              </span>
              <div className="text-xl font-bold mt-0.5">
                {annualTaxDifference > 0 ? (
                  <>You keep <span className="text-emerald-400">+${annualTaxDifference.toLocaleString()}</span> more per year in {state2Data.name}</>
                ) : (
                  <>You pay <span className="text-rose-400">${Math.abs(annualTaxDifference).toLocaleString()}</span> more per year in {state2Data.name}</>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Difference of {annualTaxDifference > 0 ? '+' : ''}${monthlyTaxDifference.toLocaleString()} in your monthly paycheck.
              </p>
            </div>
            <Link
              href={`/compare/states/${state1Data.slug}-vs-${state2Data.slug}`}
              className="shrink-0 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              Full {state1Data.name} vs {state2Data.name} Report →
            </Link>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-slate-500 bg-amber-50/80 p-4 rounded-lg border border-amber-200/80 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Estimated results only.</strong> Tax calculations apply standardized federal and state tax tables for wage income and do not account for local municipal income taxes (e.g. NYC, Philadelphia), itemized deductions, child tax credits, or investment income. Consult a licensed Certified Public Accountant (CPA) for binding tax filing counsel.
          </span>
        </div>
      </div>
    </div>
  );
}
