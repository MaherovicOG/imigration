'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightLeft, ArrowRight, Star, Sparkles } from 'lucide-react';
import { ALL_STATES_LIST } from '@/data/states';

interface StateSelectorProps {
  defaultState1?: string;
  defaultState2?: string;
  className?: string;
}

export function StateSelector({
  defaultState1 = 'california',
  defaultState2 = 'texas',
  className = ''
}: StateSelectorProps) {
  const router = useRouter();
  const [s1, setS1] = useState(defaultState1);
  const [s2, setS2] = useState(defaultState2);

  const handleSwap = () => {
    const temp = s1;
    setS1(s2);
    setS2(temp);
  };

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (s1 === s2) {
      alert('Please choose two different states to compare.');
      return;
    }
    router.push(`/compare/states/${s1}-vs-${s2}`);
  };

  return (
    <form
      onSubmit={handleCompare}
      className={`bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl p-6 sm:p-7 relative overflow-hidden ${className}`}
    >
      {/* Patriotic Accent Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-red-700">
            <Star className="w-4 h-4 fill-red-600" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-950">
            Compare Any Two US States
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          50 States + DC
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
        {/* State 1 */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-900 mb-1.5">
            Current State (Origin)
          </label>
          <select
            value={s1}
            onChange={(e) => setS1(e.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
          >
            {ALL_STATES_LIST.map((state) => (
              <option key={`s1-${state.slug}`} value={state.slug}>
                {state.name} ({state.code})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center md:col-span-1 pt-1 md:pt-4">
          <button
            type="button"
            onClick={handleSwap}
            className="p-3 rounded-full bg-blue-50 hover:bg-red-50 text-blue-900 hover:text-red-600 border-2 border-blue-200 hover:border-red-200 transition-all hover:scale-110 shadow-xs cursor-pointer"
            title="Swap origin and destination states"
            aria-label="Swap states"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* State 2 */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-red-900 mb-1.5">
            Destination State
          </label>
          <select
            value={s2}
            onChange={(e) => setS2(e.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all cursor-pointer"
          >
            {ALL_STATES_LIST.map((state) => (
              <option key={`s2-${state.slug}`} value={state.slug}>
                {state.name} ({state.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 font-medium">
          Instant comparison of living costs, 0% vs graduated income taxes, home prices, and Move Score.
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
        >
          <span>Compare States Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
