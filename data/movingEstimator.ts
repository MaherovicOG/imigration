export type MovingMethod = 'pro_movers' | 'truck_diy' | 'moving_pod';
export type HomeSize = 'studio' | '1_bed' | '2_bed' | '3_bed' | '4_bed_plus';

export interface MovingEstimatorInput {
  originStateCode: string;
  destStateCode: string;
  distanceMiles: number;
  homeSize: HomeSize;
  movingMethod: MovingMethod;
  vehiclesToShip: number;
  needPackingSupplies: boolean;
  needTemporaryStay: boolean;
  tempStayDays: number;
}

export interface MovingEstimateResult {
  lowEstimate: number;
  typicalEstimate: number;
  highEstimate: number;
  distanceMiles: number;
  breakdown: {
    baseTransportation: number;
    laborOrTruckRental: number;
    fuelAndTolls: number;
    packingSupplies: number;
    vehicleShipping: number;
    temporaryLodging: number;
    insuranceAndFees: number;
  };
  methodComparison: {
    proMovers: number;
    movingPod: number;
    truckDIY: number;
  };
  assumptions: string[];
}

// Approximate state-to-state driving distance map helper (fallback to reasonable estimates)
export const STATE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  CA: { lat: 36.7783, lng: -119.4179 },
  TX: { lat: 31.9686, lng: -99.9018 },
  FL: { lat: 27.6648, lng: -81.5158 },
  AZ: { lat: 34.0489, lng: -111.0937 },
  NV: { lat: 38.8026, lng: -116.4194 },
  WA: { lat: 47.7511, lng: -120.7401 },
  NY: { lat: 40.7128, lng: -74.0060 },
  IL: { lat: 40.6331, lng: -89.3985 },
  NJ: { lat: 40.0583, lng: -74.4057 },
  NC: { lat: 35.7596, lng: -79.0193 },
  TN: { lat: 35.5175, lng: -86.5804 },
  CO: { lat: 39.5501, lng: -105.7821 },
  GA: { lat: 32.1656, lng: -82.9001 }
};

export function estimateDistanceBetweenStates(originCode: string, destCode: string): number {
  if (originCode === destCode) return 60; // Local move within state
  const orig = STATE_COORDINATES[originCode] || { lat: 37.0902, lng: -95.7129 };
  const dest = STATE_COORDINATES[destCode] || { lat: 37.0902, lng: -95.7129 };

  // Haversine formula
  const R = 3958.8; // Earth radius in miles
  const dLat = ((dest.lat - orig.lat) * Math.PI) / 180;
  const dLng = ((dest.lng - orig.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((orig.lat * Math.PI) / 180) *
      Math.cos((dest.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const airDistance = R * c;

  // Road factor is roughly 1.25x straight-line distance
  return Math.max(50, Math.round(airDistance * 1.25));
}

const HOME_SIZE_WEIGHTS: Record<HomeSize, { weightLbs: number; truckDays: number; baseCost: number }> = {
  studio: { weightLbs: 2000, truckDays: 2, baseCost: 750 },
  '1_bed': { weightLbs: 3500, truckDays: 3, baseCost: 1200 },
  '2_bed': { weightLbs: 6000, truckDays: 4, baseCost: 1950 },
  '3_bed': { weightLbs: 9500, truckDays: 5, baseCost: 2800 },
  '4_bed_plus': { weightLbs: 14000, truckDays: 7, baseCost: 4100 }
};

export function calculateMovingCostEstimate(input: MovingEstimatorInput): MovingEstimateResult {
  const miles = input.distanceMiles > 0 ? input.distanceMiles : estimateDistanceBetweenStates(input.originStateCode, input.destStateCode);
  const home = HOME_SIZE_WEIGHTS[input.homeSize] || HOME_SIZE_WEIGHTS['2_bed'];

  // Base rate calculation per method
  // 1. Pro Movers: Base weight charge + rate per mile ($0.95 - $1.40/mile/thousand lbs)
  const proMoverBase = home.baseCost * 1.6;
  const proMoverMileage = miles * (home.weightLbs / 1000) * 0.48;
  const proMoverTotal = proMoverBase + proMoverMileage;

  // 2. Moving Pod / Container: Container rental + freight transit per mile
  const podCount = input.homeSize === '4_bed_plus' ? 3 : input.homeSize === '3_bed' ? 2 : 1;
  const podBase = podCount * 650;
  const podTransit = podCount * miles * 1.35;
  const podTotal = podBase + podTransit;

  // 3. DIY Rental Truck: Daily rate + Mileage fee / flat rate + fuel
  const truckDaily = 79 * (Math.ceil(miles / 450) + 2);
  const truckBaseRate = miles * 0.95;
  const truckFuel = (miles / 9) * 3.85; // ~9 MPG for 26ft box truck
  const truckDIYTotal = truckDaily + truckBaseRate + truckFuel;

  // Selected method primary cost
  let primaryTransportCost = 0;
  let laborCost = 0;
  let fuelAndTolls = 0;

  if (input.movingMethod === 'pro_movers') {
    primaryTransportCost = Math.round(proMoverMileage);
    laborCost = Math.round(proMoverBase);
    fuelAndTolls = Math.round(miles * 0.22);
  } else if (input.movingMethod === 'moving_pod') {
    primaryTransportCost = Math.round(podTransit);
    laborCost = Math.round(podBase);
    fuelAndTolls = 120;
  } else {
    primaryTransportCost = Math.round(truckBaseRate);
    laborCost = Math.round(truckDaily);
    fuelAndTolls = Math.round(truckFuel + miles * 0.08); // fuel + tolls
  }

  // Packing supplies
  const packingSuppliesCost = input.needPackingSupplies
    ? Math.round(home.weightLbs * 0.065 + 120)
    : 0;

  // Vehicle shipping (open carrier ~ $0.85/mile per car, min $500)
  const vehicleShippingCost = input.vehiclesToShip > 0
    ? Math.round(input.vehiclesToShip * Math.max(550, miles * 0.85))
    : 0;

  // Temporary stay lodging
  const tempStayCost = input.needTemporaryStay
    ? Math.round(input.tempStayDays * 165)
    : 0;

  // Insurance & transit valuation
  const insurance = Math.round((primaryTransportCost + laborCost) * 0.08 + 150);

  const typicalEstimate = Math.round(
    primaryTransportCost +
    laborCost +
    fuelAndTolls +
    packingSuppliesCost +
    vehicleShippingCost +
    tempStayCost +
    insurance
  );

  const lowEstimate = Math.round(typicalEstimate * 0.82);
  const highEstimate = Math.round(typicalEstimate * 1.28);

  const assumptions = [
    `Estimated distance of ~${miles.toLocaleString()} highway driving miles between states.`,
    `Standard household weight estimate for a ${input.homeSize.replace('_', ' ')} home (~${home.weightLbs.toLocaleString()} lbs).`,
    input.movingMethod === 'pro_movers'
      ? 'Full-service professional movers including basic loading, transportation, and unloading.'
      : input.movingMethod === 'moving_pod'
      ? 'Portable storage container delivered to origin, shipped via freight, and unloaded at destination.'
      : 'Self-driven rental truck (e.g. U-Haul / Penske) with estimated diesel fuel costs and standard insurance.',
    input.vehiclesToShip > 0 ? `Open-trailer auto transport for ${input.vehiclesToShip} vehicle(s).` : 'Assumes personal vehicles driven separately.',
    'Moving rates fluctuate seasonally; peak summer months (May–August) can see 15–25% higher pricing.'
  ];

  return {
    lowEstimate,
    typicalEstimate,
    highEstimate,
    distanceMiles: miles,
    breakdown: {
      baseTransportation: primaryTransportCost,
      laborOrTruckRental: laborCost,
      fuelAndTolls,
      packingSupplies: packingSuppliesCost,
      vehicleShipping: vehicleShippingCost,
      temporaryLodging: tempStayCost,
      insuranceAndFees: insurance
    },
    methodComparison: {
      proMovers: Math.round(proMoverTotal + vehicleShippingCost + tempStayCost + packingSuppliesCost),
      movingPod: Math.round(podTotal + vehicleShippingCost + tempStayCost + packingSuppliesCost),
      truckDIY: Math.round(truckDIYTotal + vehicleShippingCost + tempStayCost + packingSuppliesCost)
    },
    assumptions
  };
}
