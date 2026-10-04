import { StateData, STATES_DATA, US_AVERAGE } from './states';

export interface MoveScoreWeights {
  costOfLiving: number; // e.g. 25
  housing: number;      // e.g. 25
  taxes: number;        // e.g. 20
  jobs: number;         // e.g. 15
  climate: number;      // e.g. 10
  qualityOfLife: number;// e.g. 5
}

export const DEFAULT_MOVE_SCORE_WEIGHTS: MoveScoreWeights = {
  costOfLiving: 25,
  housing: 25,
  taxes: 20,
  jobs: 15,
  climate: 10,
  qualityOfLife: 5
};

export interface MoveScoreCategoryScore {
  name: string;
  originScore: number;
  destScore: number;
  weight: number;
  impactVerdict: 'better' | 'comparable' | 'worse';
  description: string;
}

export interface MoveScoreResult {
  originState: StateData;
  destinationState: StateData;
  overallScore: number; // 0 to 100
  scoreGrade: string; // 'A+', 'A', 'B+', 'B', 'C+', 'C'
  verdictSummary: string;
  categories: MoveScoreCategoryScore[];
  dataMethodologyNote: string;
}

export function calculateMoveScore(
  originSlug: string,
  destSlug: string,
  weights: MoveScoreWeights = DEFAULT_MOVE_SCORE_WEIGHTS
): MoveScoreResult {
  const orig = STATES_DATA[originSlug] || US_AVERAGE;
  const dest = STATES_DATA[destSlug] || US_AVERAGE;

  // 1. Cost of living score (Lower index = higher score)
  // Benchmark 100 = 75 pts. 80 = 95 pts. 140 = 45 pts.
  const calcColScore = (s: StateData) => Math.min(100, Math.max(30, Math.round(155 - s.costOfLivingIndex * 0.8)));
  const origCol = calcColScore(orig);
  const destCol = calcColScore(dest);

  // 2. Housing score (Based on median home price and rent affordability)
  const calcHousingScore = (s: StateData) => {
    const homeAfford = Math.max(30, Math.min(100, 140 - (s.medianHomePrice / 7000)));
    const rentAfford = Math.max(30, Math.min(100, 140 - (s.medianMonthlyRent / 25)));
    return Math.round((homeAfford + rentAfford) / 2);
  };
  const origHousing = calcHousingScore(orig);
  const destHousing = calcHousingScore(dest);

  // 3. Tax score (Income tax + property tax + sales tax)
  const calcTaxScore = (s: StateData) => {
    let score = 85;
    if (s.stateIncomeTaxType === 'none') score += 12;
    else if (s.stateIncomeTaxMax > 10) score -= 25;
    else if (s.stateIncomeTaxMax > 6) score -= 12;
    else score -= 4;

    if (s.effectivePropertyTax > 2.0) score -= 15;
    else if (s.effectivePropertyTax < 0.8) score += 6;

    if (s.avgSalesTax > 9.0) score -= 6;
    return Math.min(100, Math.max(30, score));
  };
  const origTax = calcTaxScore(orig);
  const destTax = calcTaxScore(dest);

  // 4. Jobs & Economy score (Unemployment, job growth, median income)
  const calcJobScore = (s: StateData) => {
    const growthPts = s.jobGrowthRate * 18;
    const unempPts = (6 - s.unemploymentRate) * 7;
    const incomePts = (s.medianHouseholdIncome / 1000) * 0.45;
    return Math.min(100, Math.max(35, Math.round(growthPts + unempPts + incomePts)));
  };
  const origJobs = calcJobScore(orig);
  const destJobs = calcJobScore(dest);

  // 5. Climate score (Sunny days, winter low)
  const calcClimateScore = (s: StateData) => {
    const sunPts = (s.sunnyDays / 300) * 55;
    const winterPts = (Math.max(10, s.avgWinterLow) / 50) * 45;
    return Math.min(100, Math.max(35, Math.round(sunPts + winterPts)));
  };
  const origClimate = calcClimateScore(orig);
  const destClimate = calcClimateScore(dest);

  // 6. Quality of Life & Infrastructure
  const origQoL = orig.overallQualityScore;
  const destQoL = dest.overallQualityScore;

  // Normalized category score
  const totalWeight = weights.costOfLiving + weights.housing + weights.taxes + weights.jobs + weights.climate + weights.qualityOfLife;
  const safeTotalWeight = totalWeight > 0 ? totalWeight : 100;

  const weightedDest = (
    destCol * weights.costOfLiving +
    destHousing * weights.housing +
    destTax * weights.taxes +
    destJobs * weights.jobs +
    destClimate * weights.climate +
    destQoL * weights.qualityOfLife
  ) / safeTotalWeight;

  const overallScore = Math.min(99, Math.max(40, Math.round(weightedDest)));

  const getVerdict = (diff: number): 'better' | 'comparable' | 'worse' => {
    if (diff >= 6) return 'better';
    if (diff <= -6) return 'worse';
    return 'comparable';
  };

  const categories: MoveScoreCategoryScore[] = [
    {
      name: 'Cost of Living',
      originScore: origCol,
      destScore: destCol,
      weight: weights.costOfLiving,
      impactVerdict: getVerdict(destCol - origCol),
      description: `COL Index is ${dest.costOfLivingIndex} in ${dest.name} vs ${orig.costOfLivingIndex} in ${orig.name} (US Avg = 100).`
    },
    {
      name: 'Housing Affordability',
      originScore: origHousing,
      destScore: destHousing,
      weight: weights.housing,
      impactVerdict: getVerdict(destHousing - origHousing),
      description: `Median home in ${dest.name} is $${dest.medianHomePrice.toLocaleString()} vs $${orig.medianHomePrice.toLocaleString()} in ${orig.name}.`
    },
    {
      name: 'Tax Environment',
      originScore: origTax,
      destScore: destTax,
      weight: weights.taxes,
      impactVerdict: getVerdict(destTax - origTax),
      description: `${dest.name} top state income tax: ${dest.stateIncomeTaxMax}% vs ${orig.name}: ${orig.stateIncomeTaxMax}%.`
    },
    {
      name: 'Jobs & Economy',
      originScore: origJobs,
      destScore: destJobs,
      weight: weights.jobs,
      impactVerdict: getVerdict(destJobs - origJobs),
      description: `Job growth: ${dest.jobGrowthRate}% (${dest.name}) vs ${orig.jobGrowthRate}% (${orig.name}) with ${dest.unemploymentRate}% unemployment.`
    },
    {
      name: 'Weather & Climate',
      originScore: origClimate,
      destScore: destClimate,
      weight: weights.climate,
      impactVerdict: getVerdict(destClimate - origClimate),
      description: `${dest.sunnyDays} sunny days/yr in ${dest.name} vs ${orig.sunnyDays} days in ${orig.name}.`
    },
    {
      name: 'Quality of Life & Transit',
      originScore: origQoL,
      destScore: destQoL,
      weight: weights.qualityOfLife,
      impactVerdict: getVerdict(destQoL - origQoL),
      description: `Infrastructure and public services index rating.`
    }
  ];

  let grade = 'B';
  if (overallScore >= 92) grade = 'A+';
  else if (overallScore >= 86) grade = 'A';
  else if (overallScore >= 80) grade = 'A-';
  else if (overallScore >= 74) grade = 'B+';
  else if (overallScore >= 68) grade = 'B';
  else if (overallScore >= 60) grade = 'C+';
  else grade = 'C';

  let verdictSummary = '';
  const scoreDiff = destCol + destHousing + destTax - (origCol + origHousing + origTax);
  if (scoreDiff > 15) {
    verdictSummary = `A move from ${orig.name} to ${dest.name} offers substantial financial and tax advantages, lowering recurring monthly living expenses significantly.`;
  } else if (scoreDiff < -15) {
    verdictSummary = `Moving from ${orig.name} to ${dest.name} generally brings higher housing and tax expenses, requiring higher compensation or lifestyle adjustments.`;
  } else {
    verdictSummary = `Moving from ${orig.name} to ${dest.name} presents a balanced trade-off across cost of living, lifestyle preferences, and career opportunities.`;
  }

  return {
    originState: orig,
    destinationState: dest,
    overallScore,
    scoreGrade: grade,
    verdictSummary,
    categories,
    dataMethodologyNote: 'Based on the selected factors, official federal/state datasets, and user-weighted priorities. The Move Score is an analytical decision aid, not an absolute guarantee.'
  };
}
