'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Sliders, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { ALL_STATES_LIST } from '@/data/states';
import { 
  calculateMoveScore, 
  MoveScoreWeights, 
  DEFAULT_MOVE_SCORE_WEIGHTS 
} from '@/data/moveScore';

interface MoveScoreCalculatorProps {
  initialOrigin?: string;
  initialDest?: string;
}

export function MoveScoreCalculator({
  initialOrigin = 'california',
  initialDest = 'texas'
}: MoveScoreCalculatorProps) {
  const [originSlug, setOriginSlug] = useState(initialOrigin);
  const [destSlug, setDestSlug] = useState(initialDest);
  const [weights, setWeights] = useState<MoveScoreWeights>(DEFAULT_MOVE_SCORE_WEIGHTS);
  const [showWeightSliders, setShowWeightSliders] = useState(false);

  const moveScoreResult = useMemo(() => {
    return calculateMoveScore(originSlug, destSlug, weights);
  }, [originSlug, destSlug, weights]);

  const originData = moveScoreResult.originState;
  const destData = moveScoreResult.destinationState;

  const handleWeightChange = (key: keyof MoveScoreWeights, val: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20">
          <Award className="w-3.5 h-3.5" />
          <span>MoveWise Multi-Factor Decision Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Move Score: {originData.name} → {destData.name}
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          An objective suitability score evaluating cost of living, housing prices, state tax models, economic growth, and climate trade-offs.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Origin & Destination Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Current Location (Origin)
            </label>
            <select
              value={originSlug}
              onChange={(e) => setOriginSlug(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`ms-orig-${s.slug}`} value={s.slug}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Destination Location
            </label>
            <select
              value={destSlug}
              onChange={(e) => setDestSlug(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`ms-dest-${s.slug}`} value={s.slug}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CUSTOMIZE WEIGHTINGS TOGGLE */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Personalize Importance Weights
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowWeightSliders(!showWeightSliders)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
            >
              {showWeightSliders ? 'Hide Priorities' : 'Customize Priorities (Sliders)'}
            </button>
          </div>

          {showWeightSliders && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4 mt-3 border-t border-slate-200 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Cost of Living</span>
                  <span>{weights.costOfLiving}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights.costOfLiving}
                  onChange={(e) => handleWeightChange('costOfLiving', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Housing Prices</span>
                  <span>{weights.housing}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights.housing}
                  onChange={(e) => handleWeightChange('housing', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Tax Burden</span>
                  <span>{weights.taxes}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights.taxes}
                  onChange={(e) => handleWeightChange('taxes', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Job Market & Economy</span>
                  <span>{weights.jobs}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights.jobs}
                  onChange={(e) => handleWeightChange('jobs', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Climate & Sunshine</span>
                  <span>{weights.climate}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights.climate}
                  onChange={(e) => handleWeightChange('climate', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Infrastructure & Services</span>
                  <span>{weights.qualityOfLife}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights.qualityOfLife}
                  onChange={(e) => handleWeightChange('qualityOfLife', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* OVERALL MOVE SCORE CARD */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Overall Relocation Move Score
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {originData.name} → {destData.name}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {moveScoreResult.verdictSummary}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0 min-w-[160px]">
            <span className="text-5xl font-black tracking-tight text-white">
              {moveScoreResult.overallScore}
              <span className="text-xl text-blue-300 font-bold">/100</span>
            </span>
            <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/30 text-blue-200 border border-blue-300/30">
              Grade {moveScoreResult.scoreGrade}
            </span>
          </div>
        </div>

        {/* SUB-CATEGORY FACTOR BREAKDOWN */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 flex justify-between items-center">
            <span>Factor Benchmark Breakdown</span>
            <span>{destData.name} vs {originData.name}</span>
          </div>

          <div className="divide-y divide-slate-100">
            {moveScoreResult.categories.map((cat, idx) => (
              <div key={idx} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{cat.name}</span>
                    <span className="text-xs text-slate-400 ml-2">Weight: {cat.weight}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">
                      {originData.code}: <strong>{cat.originScore}</strong> / 100
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="text-sm font-bold text-slate-900">
                      {destData.code}: <strong className="text-blue-600">{cat.destScore}</strong> / 100
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      cat.impactVerdict === 'better'
                        ? 'bg-emerald-100 text-emerald-800'
                        : cat.impactVerdict === 'worse'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {cat.impactVerdict === 'better' ? 'Advantage' : cat.impactVerdict === 'worse' ? 'Deficit' : 'Neutral'}
                    </span>
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.destScore >= 80
                        ? 'bg-emerald-500'
                        : cat.destScore >= 65
                        ? 'bg-blue-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${cat.destScore}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Rationale Note */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-500 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Disclaimer:</strong> {moveScoreResult.dataMethodologyNote}
          </span>
        </div>
      </div>
    </div>
  );
}
