import { STATES_DATA, StateData, US_AVERAGE } from './states';

export interface CostBreakdownItem {
  category: string;
  currentCost: number;
  destinationCost: number;
  difference: number;
  percentDifference: number;
  description: string;
}

export interface CostOfLivingComparisonResult {
  currentState: StateData;
  destinationState: StateData;
  monthlyIncome: number;
  householdSize: number;
  currentMonthlyTotal: number;
  destinationMonthlyTotal: number;
  monthlyDifference: number; // positive = destination costs more, negative = saves money
  annualDifference: number;
  annualSavings: number; // positive = savings in destination
  equivalentIncomeNeeded: number;
  categories: CostBreakdownItem[];
}

export interface CostCalculationInput {
  currentStateSlug: string;
  destinationStateSlug: string;
  monthlyIncome: number;
  housingType: 'rent' | 'own';
  householdSize: number;
  vehiclesCount: number;
  childrenCount: number;
}

export function calculateCostOfLivingComparison(input: CostCalculationInput): CostOfLivingComparisonResult {
  const current = STATES_DATA[input.currentStateSlug] || US_AVERAGE;
  const destination = STATES_DATA[input.destinationStateSlug] || US_AVERAGE;

  // Base monthly expenses baseline for US average (scaled by household size)
  const baseRent = input.housingType === 'rent' ? 1650 : 2100;
  const baseGroceries = 380 + (input.householdSize - 1) * 260;
  const baseUtilities = 280 + (input.householdSize - 1) * 60;
  const baseTransport = 450 + (input.vehiclesCount > 1 ? (input.vehiclesCount - 1) * 350 : 0);
  const baseHealthcare = 320 + (input.householdSize - 1) * 140;
  const baseChildcare = input.childrenCount * 950;
  const baseMisc = 400 + (input.householdSize - 1) * 150;

  // Current State Costs
  const currentRent = Math.round(baseRent * (current.housingIndex / 100));
  const currentGroceries = Math.round(baseGroceries * (current.groceryIndex / 100));
  const currentUtilities = Math.round(baseUtilities * (current.utilitiesIndex / 100));
  const currentTransport = Math.round(baseTransport * (current.transportIndex / 100));
  const currentHealthcare = Math.round(baseHealthcare * (current.healthIndex / 100));
  const currentChildcare = Math.round(baseChildcare * (current.costOfLivingIndex / 100));
  const currentMisc = Math.round(baseMisc * (current.costOfLivingIndex / 100));

  const currentTotal = currentRent + currentGroceries + currentUtilities + currentTransport + currentHealthcare + currentChildcare + currentMisc;

  // Destination State Costs
  const destRent = Math.round(baseRent * (destination.housingIndex / 100));
  const destGroceries = Math.round(baseGroceries * (destination.groceryIndex / 100));
  const destUtilities = Math.round(baseUtilities * (destination.utilitiesIndex / 100));
  const destTransport = Math.round(baseTransport * (destination.transportIndex / 100));
  const destHealthcare = Math.round(baseHealthcare * (destination.healthIndex / 100));
  const destChildcare = Math.round(baseChildcare * (destination.costOfLivingIndex / 100));
  const destMisc = Math.round(baseMisc * (destination.costOfLivingIndex / 100));

  const destTotal = destRent + destGroceries + destUtilities + destTransport + destHealthcare + destChildcare + destMisc;

  const buildItem = (name: string, curr: number, dest: number, desc: string): CostBreakdownItem => {
    const diff = dest - curr;
    const pct = curr > 0 ? (diff / curr) * 100 : 0;
    return {
      category: name,
      currentCost: curr,
      destinationCost: dest,
      difference: diff,
      percentDifference: Math.round(pct * 10) / 10,
      description: desc
    };
  };

  const categories: CostBreakdownItem[] = [
    buildItem('Housing (Rent/Mortgage)', currentRent, destRent, `${input.housingType === 'rent' ? 'Median rental rate' : 'Estimated mortgage & property tax'} baseline`),
    buildItem('Groceries & Food', currentGroceries, destGroceries, 'Supermarket, meat, produce, and staple grocery index'),
    buildItem('Utilities & Energy', currentUtilities, destUtilities, 'Electricity, heating/AC, natural gas, water, and trash'),
    buildItem('Transportation & Gas', currentTransport, destTransport, 'Gasoline, vehicle registration, maintenance, and insurance'),
    buildItem('Healthcare', currentHealthcare, destHealthcare, 'Out-of-pocket medical services, health insurance, and prescriptions'),
  ];

  if (input.childrenCount > 0) {
    categories.push(buildItem('Childcare & Education', currentChildcare, destChildcare, `Daycare / preschool costs for ${input.childrenCount} child(ren)`));
  }
  categories.push(buildItem('Goods & Entertainment', currentMisc, destMisc, 'Clothing, dining out, personal care, and recreational activities'));

  const monthlyDiff = destTotal - currentTotal;
  const annualDiff = monthlyDiff * 12;
  const annualSavings = -annualDiff;

  const colRatio = destination.costOfLivingIndex / Math.max(1, current.costOfLivingIndex);
  const equivalentIncomeNeeded = Math.round(input.monthlyIncome * colRatio);

  return {
    currentState: current,
    destinationState: destination,
    monthlyIncome: input.monthlyIncome,
    householdSize: input.householdSize,
    currentMonthlyTotal: currentTotal,
    destinationMonthlyTotal: destTotal,
    monthlyDifference: monthlyDiff,
    annualDifference: annualDiff,
    annualSavings: annualSavings,
    equivalentIncomeNeeded,
    categories
  };
}
