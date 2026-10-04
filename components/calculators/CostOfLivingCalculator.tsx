'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowRightLeft, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Home, 
  Users, 
  Car, 
  Baby, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { ALL_STATES_LIST, getStateBySlug } from '@/data/states';
import { calculateCostOfLivingComparison } from '@/data/costOfLiving';

interface CostOfLivingCalculatorProps {
  initialOrigin?: string;
  initialDestination?: string;
}

export function CostOfLivingCalculator({
  initialOrigin = 'california',
  initialDestination = 'texas'
}: CostOfLivingCalculatorProps) {
  const [currentState, setCurrentState] = useState(initialOrigin);
  const [destinationState, setDestinationState] = useState(initialDestination);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(6500);
  const [housingType, setHousingType] = useState<'rent' | 'own'>('rent');
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [vehiclesCount, setVehiclesCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  const comparison = useMemo(() => {
    return calculateCostOfLivingComparison({
      currentStateSlug: currentState,
      destinationStateSlug: destinationState,
      monthlyIncome,
      housingType,
      householdSize,
      vehiclesCount,
      childrenCount
    });
  }, [
    currentState,
    destinationState,
    monthlyIncome,
    housingType,
    householdSize,
    vehiclesCount,
    childrenCount
  ]);

  const isSaving = comparison.annualSavings >= 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Interactive Relocation Budget Comparison</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Cost of Living: {comparison.currentState.name} vs {comparison.destinationState.name}
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          Compare estimated monthly expenses for housing, groceries, utilities, transportation, and childcare across both states.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Current State */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Current Location
            </label>
            <select
              value={currentState}
              onChange={(e) => setCurrentState(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`col-curr-${s.slug}`} value={s.slug}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Destination State */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Destination Location
            </label>
            <select
              value={destinationState}
              onChange={(e) => setDestinationState(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`col-dest-${s.slug}`} value={s.slug}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Monthly Income */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Monthly Household Income
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-semibold text-sm">
                $
              </span>
              <input
                type="number"
                min={1000}
                max={50000}
                step={250}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Housing Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Housing Preference
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHousingType('rent')}
                className={`py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                  housingType === 'rent'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Renting
              </button>
              <button
                type="button"
                onClick={() => setHousingType('own')}
                className={`py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                  housingType === 'own'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Homeowner
              </button>
            </div>
          </div>

          {/* Household Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Household Adults
            </label>
            <select
              value={householdSize}
              onChange={(e) => setHouseholdSize(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value={1}>1 Person</option>
              <option value={2}>2 Adults</option>
              <option value={3}>3 Adults</option>
              <option value={4}>4+ Adults</option>
            </select>
          </div>

          {/* Vehicles */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Vehicles Owned
            </label>
            <select
              value={vehiclesCount}
              onChange={(e) => setVehiclesCount(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value={0}>0 (Public Transit)</option>
              <option value={1}>1 Vehicle</option>
              <option value={2}>2 Vehicles</option>
              <option value={3}>3+ Vehicles</option>
            </select>
          </div>

          {/* Children */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Children (Daycare / School Age)
            </label>
            <select
              value={childrenCount}
              onChange={(e) => setChildrenCount(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value={0}>0 Children</option>
              <option value={1}>1 Child</option>
              <option value={2}>2 Children</option>
              <option value={3}>3+ Children</option>
            </select>
          </div>
        </div>

        {/* SUMMARY HERO METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Location Expenses
            </span>
            <div className="text-3xl font-extrabold text-slate-800 mt-1">
              ${comparison.currentMonthlyTotal.toLocaleString()}
              <span className="text-sm font-medium text-slate-500">/mo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {comparison.currentState.name} (Index: {comparison.currentState.costOfLivingIndex})
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Destination Location Expenses
            </span>
            <div className="text-3xl font-extrabold text-slate-800 mt-1">
              ${comparison.destinationMonthlyTotal.toLocaleString()}
              <span className="text-sm font-medium text-slate-500">/mo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {comparison.destinationState.name} (Index: {comparison.destinationState.costOfLivingIndex})
            </p>
          </div>

          <div className={`rounded-xl p-6 text-center border shadow-xs ${
            isSaving
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider">
              {isSaving ? 'Estimated Monthly Savings' : 'Estimated Added Monthly Cost'}
            </span>
            <div className={`text-3xl font-extrabold mt-1 ${isSaving ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isSaving ? '+' : '-'}${Math.abs(comparison.monthlyDifference).toLocaleString()}
              <span className="text-sm font-medium">/mo</span>
            </div>
            <p className="text-xs mt-1 font-semibold">
              {isSaving ? '+$' + comparison.annualSavings.toLocaleString() + ' yearly savings' : '-$' + Math.abs(comparison.annualSavings).toLocaleString() + ' yearly difference'}
            </p>
          </div>
        </div>

        {/* EQUIVALENT SALARY BENCHMARK CALLOUT */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-blue-700">
              Equivalent Income Needed in {comparison.destinationState.name}
            </span>
            <div className="text-xl font-bold text-blue-950 mt-0.5">
              ${(comparison.equivalentIncomeNeeded * 12).toLocaleString()} / year
              <span className="text-sm font-normal text-blue-800 ml-1">
                (${comparison.equivalentIncomeNeeded.toLocaleString()}/month)
              </span>
            </div>
            <p className="text-xs text-blue-700 mt-0.5">
              To match the exact purchasing power of a ${(monthlyIncome * 12).toLocaleString()}/year salary in {comparison.currentState.name}.
            </p>
          </div>
          <Link
            href="/tools/take-home-pay-calculator"
            className="shrink-0 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Check Take-Home Pay →
          </Link>
        </div>

        {/* DETAILED CATEGORY EXPENSE TABLE */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
            Side-by-Side Monthly Expense Breakdown
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                <tr>
                  <th className="p-4">Category</th>
                  <th className="p-4">{comparison.currentState.name}</th>
                  <th className="p-4">{comparison.destinationState.name}</th>
                  <th className="p-4 text-right">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparison.categories.map((cat, idx) => {
                  const isCatCheaper = cat.difference < 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{cat.category}</div>
                        <div className="text-xs text-slate-400">{cat.description}</div>
                      </td>
                      <td className="p-4 font-medium text-slate-800">
                        ${cat.currentCost.toLocaleString()}
                      </td>
                      <td className="p-4 font-medium text-slate-800">
                        ${cat.destinationCost.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isCatCheaper
                            ? 'bg-emerald-100 text-emerald-800'
                            : cat.difference === 0
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {cat.difference > 0 ? '+' : ''}${cat.difference.toLocaleString()} ({cat.percentDifference > 0 ? '+' : ''}{cat.percentDifference}%)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100/70 font-bold text-slate-900 border-t border-slate-200">
                <tr>
                  <td className="p-4">Total Monthly Estimated Baseline</td>
                  <td className="p-4">${comparison.currentMonthlyTotal.toLocaleString()}</td>
                  <td className="p-4">${comparison.destinationMonthlyTotal.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <span className={isSaving ? 'text-emerald-700' : 'text-rose-700'}>
                      {comparison.monthlyDifference > 0 ? '+' : ''}${comparison.monthlyDifference.toLocaleString()} / mo
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Methodology Note */}
        <div className="text-xs text-slate-400 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200/60 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            Expense estimates are generated from the US Bureau of Labor Statistics Consumer Expenditure Survey, adjusted by official 2026 state-level cost indices. Results are mathematical benchmarks for planning purposes and do not represent guaranteed real-world expenditure.
          </span>
        </div>
      </div>
    </div>
  );
}
