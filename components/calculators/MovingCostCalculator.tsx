'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  Truck, 
  Package, 
  Box, 
  MapPin, 
  Calendar, 
  Car, 
  Hotel, 
  ShieldAlert, 
  Info, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { ALL_STATES_LIST } from '@/data/states';
import { 
  MovingMethod, 
  HomeSize, 
  calculateMovingCostEstimate, 
  estimateDistanceBetweenStates 
} from '@/data/movingEstimator';

interface MovingCostCalculatorProps {
  initialOriginState?: string;
  initialDestState?: string;
}

export function MovingCostCalculator({
  initialOriginState = 'california',
  initialDestState = 'texas'
}: MovingCostCalculatorProps) {
  const [originState, setOriginState] = useState(initialOriginState);
  const [destState, setDestState] = useState(initialDestState);
  const [homeSize, setHomeSize] = useState<HomeSize>('2_bed');
  const [movingMethod, setMovingMethod] = useState<MovingMethod>('pro_movers');
  const [vehiclesToShip, setVehiclesToShip] = useState<number>(0);
  const [needPackingSupplies, setNeedPackingSupplies] = useState<boolean>(true);
  const [needTemporaryStay, setNeedTemporaryStay] = useState<boolean>(false);
  const [tempStayDays, setTempStayDays] = useState<number>(3);
  const [customDistance, setCustomDistance] = useState<number | ''>('');

  const originData = ALL_STATES_LIST.find((s) => s.slug === originState) || ALL_STATES_LIST[0];
  const destData = ALL_STATES_LIST.find((s) => s.slug === destState) || ALL_STATES_LIST[1];

  const calculatedDistance = useMemo(() => {
    if (customDistance !== '' && Number(customDistance) > 0) {
      return Number(customDistance);
    }
    return estimateDistanceBetweenStates(originData.code, destData.code);
  }, [originData.code, destData.code, customDistance]);

  const estimateResult = useMemo(() => {
    return calculateMovingCostEstimate({
      originStateCode: originData.code,
      destStateCode: destData.code,
      distanceMiles: calculatedDistance,
      homeSize,
      movingMethod,
      vehiclesToShip,
      needPackingSupplies,
      needTemporaryStay,
      tempStayDays
    });
  }, [
    originData.code,
    destData.code,
    calculatedDistance,
    homeSize,
    movingMethod,
    vehiclesToShip,
    needPackingSupplies,
    needTemporaryStay,
    tempStayDays
  ]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs font-semibold mb-3 backdrop-blur-xs">
              <Truck className="w-3.5 h-3.5" />
              <span>Interstate Moving Cost Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Moving Cost Estimator: {originData.name} → {destData.name}
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-2xl">
              Calculate realistic low, typical, and high relocation budgets based on highway mileage (~{calculatedDistance.toLocaleString()} miles), dwelling size, and moving method.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Origin State */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Current State (Origin)
            </label>
            <select
              value={originState}
              onChange={(e) => setOriginState(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`orig-${s.slug}`} value={s.slug}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Destination State */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Destination State
            </label>
            <select
              value={destState}
              onChange={(e) => setDestState(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            >
              {ALL_STATES_LIST.map((s) => (
                <option key={`dest-${s.slug}`} value={s.slug}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Home Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Home Size / Belongings Volume
            </label>
            <select
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value as HomeSize)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            >
              <option value="studio">Studio Apartment (~2,000 lbs)</option>
              <option value="1_bed">1-Bedroom Home/Apt (~3,500 lbs)</option>
              <option value="2_bed">2-Bedroom Home/Apt (~6,000 lbs)</option>
              <option value="3_bed">3-Bedroom House (~9,500 lbs)</option>
              <option value="4_bed_plus">4+ Bedroom House (~14,000 lbs)</option>
            </select>
          </div>

          {/* Moving Method */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Moving Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setMovingMethod('pro_movers')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  movingMethod === 'pro_movers'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Full-Service Movers</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Crew loads, transports, and unloads all household items.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMovingMethod('moving_pod')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  movingMethod === 'moving_pod'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Box className="w-4 h-4 text-indigo-600" />
                  <span>Moving Container (POD)</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  You pack and load; container company drives the freight.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMovingMethod('truck_diy')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  movingMethod === 'truck_diy'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>DIY Rental Truck</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Self-pack and self-drive (U-Haul, Penske, Budget).
                </div>
              </button>
            </div>
          </div>

          {/* Optional Add-ons */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Vehicle Shipping
            </label>
            <select
              value={vehiclesToShip}
              onChange={(e) => setVehiclesToShip(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value={0}>0 Vehicles (Driving self or not shipping)</option>
              <option value={1}>1 Vehicle (Open Auto Carrier)</option>
              <option value={2}>2 Vehicles (Open Auto Carrier)</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Packing Materials Kit
            </label>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="needPackingSupplies"
                checked={needPackingSupplies}
                onChange={(e) => setNeedPackingSupplies(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="needPackingSupplies" className="text-sm font-medium text-slate-700 cursor-pointer">
                Include professional boxes, tape & wrap (~$250-$500)
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Temporary Stay / Hotel En Route
            </label>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="needTemporaryStay"
                checked={needTemporaryStay}
                onChange={(e) => setNeedTemporaryStay(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="needTemporaryStay" className="text-sm font-medium text-slate-700 cursor-pointer">
                Include lodging buffer ({tempStayDays} nights)
              </label>
            </div>
          </div>
        </div>

        {/* RESULTS SECTION */}
        <div className="border-t border-slate-200 pt-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              Estimated Relocation Cost
            </h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ${estimateResult.typicalEstimate.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Estimated typical expense for ~{estimateResult.distanceMiles.toLocaleString()} driving miles
            </p>
          </div>

          {/* Three Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <span className="text-xs font-bold uppercase text-slate-500">Low Estimate</span>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                ${estimateResult.lowEstimate.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Off-peak season, flexible scheduling, minimal packing needs.
              </p>
            </div>

            <div className="bg-blue-50/80 border-2 border-blue-600 rounded-xl p-5 text-center shadow-xs relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase px-3 py-0.5 rounded-full">
                Most Typical
              </span>
              <span className="text-xs font-bold uppercase text-blue-700">Typical Estimate</span>
              <div className="text-3xl font-extrabold text-blue-900 mt-1">
                ${estimateResult.typicalEstimate.toLocaleString()}
              </div>
              <p className="text-xs text-blue-700/80 mt-1">
                Standard mid-month rates, standard transit insurance & setup.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <span className="text-xs font-bold uppercase text-slate-500">High Estimate</span>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                ${estimateResult.highEstimate.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Peak summer surge (June–Aug), expedited delivery, heavy items.
              </p>
            </div>
          </div>

          {/* Itemized Cost Breakdown */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-600" />
              <span>Itemized Cost Breakdown ({estimateResult.distanceMiles.toLocaleString()} Miles)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 block">Transportation & Freight</span>
                <span className="font-bold text-slate-900 text-base">
                  ${estimateResult.breakdown.baseTransportation.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 block">Labor & Base Equipment</span>
                <span className="font-bold text-slate-900 text-base">
                  ${estimateResult.breakdown.laborOrTruckRental.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 block">Fuel, Tolls & Mileage</span>
                <span className="font-bold text-slate-900 text-base">
                  ${estimateResult.breakdown.fuelAndTolls.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500 block">Supplies & Add-ons</span>
                <span className="font-bold text-slate-900 text-base">
                  ${(
                    estimateResult.breakdown.packingSupplies +
                    estimateResult.breakdown.vehicleShipping +
                    estimateResult.breakdown.temporaryLodging +
                    estimateResult.breakdown.insuranceAndFees
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Method Comparison Summary */}
          <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700">
              Moving Methods Comparison for this Route
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center">
              <div className="p-4 bg-white">
                <span className="text-xs text-slate-500 block">DIY Truck Rental</span>
                <span className="text-lg font-bold text-slate-900">
                  ~${estimateResult.methodComparison.truckDIY.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Lowest cost, highest effort</span>
              </div>
              <div className="p-4 bg-white">
                <span className="text-xs text-slate-500 block">Moving Container (POD)</span>
                <span className="text-lg font-bold text-slate-900">
                  ~${estimateResult.methodComparison.movingPod.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Moderate cost & flexible pace</span>
              </div>
              <div className="p-4 bg-white">
                <span className="text-xs text-slate-500 block">Full-Service Movers</span>
                <span className="text-lg font-bold text-slate-900">
                  ~${estimateResult.methodComparison.proMovers.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Highest convenience, hands-off</span>
              </div>
            </div>
          </div>

          {/* Assumptions & Disclaimers */}
          <div className="mt-6 text-xs text-slate-500 space-y-2 bg-slate-50/60 p-4 rounded-lg border border-slate-200/60">
            <div className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>Key Mathematical Assumptions & Notes:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {estimateResult.assumptions.map((assump, idx) => (
                <li key={idx}>{assump}</li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-400 pt-1">
              *The result is an estimate and not a binding quote. Actual moving company quotes vary based on physical in-home weight audits, stairs/elevators, and exact zip codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
