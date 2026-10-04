'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Home, 
  DollarSign, 
  PieChart, 
  ShieldCheck, 
  AlertCircle, 
  HelpCircle,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { calculateRentAffordability } from '@/data/housing';

export function RentAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(75000);
  const [monthlyDebt, setMonthlyDebt] = useState<number>(450);
  const [monthlySavingsGoal, setMonthlySavingsGoal] = useState<number>(600);
  const [monthlyOtherExpenses, setMonthlyOtherExpenses] = useState<number>(1400);

  const result = useMemo(() => {
    return calculateRentAffordability({
      annualIncome,
      monthlyDebt,
      monthlySavingsGoal,
      monthlyOtherExpenses
    });
  }, [annualIncome, monthlyDebt, monthlySavingsGoal, monthlyOtherExpenses]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-3 border border-indigo-400/20">
          <Home className="w-3.5 h-3.5" />
          <span>Housing Affordability & DTI Framework</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Rent Affordability Calculator
        </h2>
        <p className="text-sm text-indigo-100 mt-1 max-w-2xl">
          Determine how much rent you can safely afford based on the 30% gross income rule, existing monthly debt obligations, and the 50/30/20 budget framework.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Annual Income */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Annual Pre-Tax Income
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={15000}
                max={600000}
                step={2500}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Monthly Debt Payments */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Monthly Debt Payments
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                max={10000}
                step={50}
                value={monthlyDebt}
                onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Auto loan, student debt, credit cards min
            </span>
          </div>

          {/* Monthly Savings Goal */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Target Monthly Savings
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                max={15000}
                step={50}
                value={monthlySavingsGoal}
                onChange={(e) => setMonthlySavingsGoal(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Emergency fund & investments
            </span>
          </div>

          {/* Other Living Expenses */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Food & Non-Housing Expenses
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                max={20000}
                step={100}
                value={monthlyOtherExpenses}
                onChange={(e) => setMonthlyOtherExpenses(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Groceries, gas, dining & utilities
            </span>
          </div>
        </div>

        {/* THREE RECOMMENDED RENT TIERS */}
        <div className="border-t border-slate-200 pt-6">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Recommended Monthly Rent Tiers
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              For an income of ${annualIncome.toLocaleString()}/year ($
              {result.monthlyGrossIncome.toLocaleString()}/month gross)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Conservative */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Conservative (25%)
              </span>
              <div className="text-3xl font-extrabold text-slate-800 mt-2">
                ${result.conservativeRent.toLocaleString()}
                <span className="text-sm font-normal text-slate-500">/mo</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Maximum financial cushion for accelerated debt payoff, retirement, and travel.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 font-semibold">
                ${(result.conservativeRent * 12).toLocaleString()} / year
              </div>
            </div>

            {/* Moderate (Recommended) */}
            <div className="bg-indigo-50/80 border-2 border-indigo-600 rounded-xl p-6 text-center shadow-xs relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase px-3 py-0.5 rounded-full">
                Standard 30% Guideline
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                Moderate (30%)
              </span>
              <div className="text-4xl font-extrabold text-indigo-950 mt-2">
                ${result.moderateRent.toLocaleString()}
                <span className="text-base font-normal text-indigo-700">/mo</span>
              </div>
              <p className="text-xs text-indigo-900/80 mt-2 leading-relaxed">
                The standard US benchmark balancing lifestyle comfort and balanced savings.
              </p>
              <div className="mt-4 pt-3 border-t border-indigo-200 text-xs text-indigo-900 font-bold">
                ${result.annualRentAtModerate.toLocaleString()} / year
              </div>
            </div>

            {/* Maximum */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Maximum Cap (35%)
              </span>
              <div className="text-3xl font-extrabold text-slate-800 mt-2">
                ${result.aggressiveRent.toLocaleString()}
                <span className="text-sm font-normal text-slate-500">/mo</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Upper limit for high-cost coastal cities (SF, NYC) where compromises are necessary.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 font-semibold">
                ${(result.aggressiveRent * 12).toLocaleString()} / year
              </div>
            </div>
          </div>
        </div>

        {/* 50 / 30 / 20 BUDGET BREAKDOWN & DTI HEALTH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          {/* 50/30/20 Framework */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600" />
              <span>50/30/20 Take-Home Budget Framework</span>
            </h4>
            <p className="text-xs text-slate-500">
              Based on estimated monthly net take-home of <strong>${result.monthlyTakeHomeEstimate.toLocaleString()}/mo</strong>:
            </p>
            <div className="space-y-3 pt-1 text-sm">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Needs (50%)</span>
                  <span className="text-xs text-slate-400">Rent, utilities, groceries, min debt</span>
                </div>
                <span className="font-bold text-slate-900 text-base">
                  ${result.budgetBreakdown503020.needs.toLocaleString()}/mo
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Wants (30%)</span>
                  <span className="text-xs text-slate-400">Dining out, entertainment, shopping</span>
                </div>
                <span className="font-bold text-slate-900 text-base">
                  ${result.budgetBreakdown503020.wants.toLocaleString()}/mo
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Savings & Extra Debt (20%)</span>
                  <span className="text-xs text-slate-400">Emergency fund, 401k, IRA</span>
                </div>
                <span className="font-bold text-emerald-700 text-base">
                  ${result.budgetBreakdown503020.savings.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Debt-to-Income & Methodology */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Debt-to-Income (DTI) & Landlord Qualification</span>
            </h4>
            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Your Calculated DTI:</span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                  result.debtToIncomeRatio <= 36
                    ? 'bg-emerald-100 text-emerald-800'
                    : result.debtToIncomeRatio <= 43
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {result.debtToIncomeRatio}% {result.debtToIncomeRatio <= 36 ? '(Healthy)' : '(Moderate)'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {result.explanation}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">The Landlord "40x Rule" Check:</span>
              <p className="text-xs text-slate-500 leading-relaxed">
                In competitive markets like NYC or LA, landlords require annual income to be at least 40 times monthly rent. With your ${annualIncome.toLocaleString()} income, you would officially qualify for up to <strong>${Math.round(annualIncome / 40).toLocaleString()}/month</strong> on paper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
