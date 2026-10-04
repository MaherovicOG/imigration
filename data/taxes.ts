export type FilingStatus = 'single' | 'married' | 'head_of_household';

export interface TaxBracket {
  rate: number;
  upTo: number; // upper bound of bracket taxable income (Infinity for top)
}

// 2026 Federal Tax Standard Deductions (Estimated indexed)
export const FEDERAL_STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
  head_of_household: 22500
};

// 2026 Federal Income Tax Brackets
export const FEDERAL_TAX_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.10, upTo: 11925 },
    { rate: 0.12, upTo: 48475 },
    { rate: 0.22, upTo: 103350 },
    { rate: 0.24, upTo: 197300 },
    { rate: 0.32, upTo: 250525 },
    { rate: 0.35, upTo: 626350 },
    { rate: 0.37, upTo: Infinity }
  ],
  married: [
    { rate: 0.10, upTo: 23850 },
    { rate: 0.12, upTo: 96950 },
    { rate: 0.22, upTo: 206700 },
    { rate: 0.24, upTo: 394600 },
    { rate: 0.32, upTo: 501050 },
    { rate: 0.35, upTo: 751600 },
    { rate: 0.37, upTo: Infinity }
  ],
  head_of_household: [
    { rate: 0.10, upTo: 17000 },
    { rate: 0.12, upTo: 64850 },
    { rate: 0.22, upTo: 103350 },
    { rate: 0.24, upTo: 197300 },
    { rate: 0.32, upTo: 250500 },
    { rate: 0.35, upTo: 626350 },
    { rate: 0.37, upTo: Infinity }
  ]
};

// FICA Parameters
export const FICA_CONFIG = {
  socialSecurityRate: 0.062,
  socialSecurityWageCap: 176100, // 2026 indexed wage base
  medicareRate: 0.0145,
  additionalMedicareThreshold: {
    single: 200000,
    married: 250000,
    head_of_household: 200000
  },
  additionalMedicareRate: 0.009
};

// State Tax Computation Rules
export interface StateTaxRule {
  type: 'none' | 'flat' | 'graduated';
  flatRate?: number;
  brackets?: TaxBracket[];
  standardDeduction?: Record<FilingStatus, number>;
}

export const STATE_TAX_RULES: Record<string, StateTaxRule> = {
  california: {
    type: 'graduated',
    standardDeduction: { single: 5540, married: 11080, head_of_household: 11080 },
    brackets: [
      { rate: 0.01, upTo: 10756 },
      { rate: 0.02, upTo: 25499 },
      { rate: 0.04, upTo: 40245 },
      { rate: 0.06, upTo: 55866 },
      { rate: 0.08, upTo: 70606 },
      { rate: 0.093, upTo: 360659 },
      { rate: 0.103, upTo: 432787 },
      { rate: 0.113, upTo: 721314 },
      { rate: 0.123, upTo: 1000000 },
      { rate: 0.133, upTo: Infinity }
    ]
  },
  texas: { type: 'none' },
  florida: { type: 'none' },
  nevada: { type: 'none' },
  washington: { type: 'none' },
  tennessee: { type: 'none' },
  arizona: {
    type: 'flat',
    flatRate: 0.025,
    standardDeduction: { single: 14600, married: 29200, head_of_household: 21900 }
  },
  illinois: {
    type: 'flat',
    flatRate: 0.0495,
    standardDeduction: { single: 2625, married: 5250, head_of_household: 2625 }
  },
  north_carolina: {
    type: 'flat',
    flatRate: 0.045,
    standardDeduction: { single: 12750, married: 25500, head_of_household: 19125 }
  },
  colorado: {
    type: 'flat',
    flatRate: 0.044,
    standardDeduction: { single: 15000, married: 30000, head_of_household: 22500 }
  },
  georgia: {
    type: 'flat',
    flatRate: 0.0539,
    standardDeduction: { single: 12000, married: 24000, head_of_household: 12000 }
  },
  new_york: {
    type: 'graduated',
    standardDeduction: { single: 8000, married: 16050, head_of_household: 11200 },
    brackets: [
      { rate: 0.04, upTo: 8500 },
      { rate: 0.045, upTo: 11700 },
      { rate: 0.0525, upTo: 13900 },
      { rate: 0.055, upTo: 80650 },
      { rate: 0.06, upTo: 215400 },
      { rate: 0.0685, upTo: 1077550 },
      { rate: 0.0965, upTo: 5000000 },
      { rate: 0.109, upTo: Infinity }
    ]
  },
  new_jersey: {
    type: 'graduated',
    standardDeduction: { single: 1000, married: 2000, head_of_household: 1000 },
    brackets: [
      { rate: 0.014, upTo: 20000 },
      { rate: 0.0175, upTo: 35000 },
      { rate: 0.035, upTo: 40000 },
      { rate: 0.05525, upTo: 75000 },
      { rate: 0.0637, upTo: 500000 },
      { rate: 0.0897, upTo: 1000000 },
      { rate: 0.1075, upTo: Infinity }
    ]
  }
};

export interface TaxCalculationResult {
  grossSalary: number;
  federalTax: number;
  effectiveFederalRate: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalFicaTax: number;
  stateTax: number;
  effectiveStateRate: number;
  totalTaxes: number;
  totalEffectiveTaxRate: number;
  netAnnualPay: number;
  netMonthlyPay: number;
  netBiWeeklyPay: number;
}

export function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (taxableIncome > previousLimit) {
      const taxableAmountInBracket = Math.min(taxableIncome - previousLimit, bracket.upTo - previousLimit);
      tax += taxableAmountInBracket * bracket.rate;
      previousLimit = bracket.upTo;
    } else {
      break;
    }
  }
  return tax;
}

export function calculateTakeHomePay(
  grossSalary: number,
  stateSlug: string,
  filingStatus: FilingStatus = 'single',
  preTaxDeductionsAnnual: number = 0
): TaxCalculationResult {
  const adjustedSalary = Math.max(0, grossSalary - preTaxDeductionsAnnual);

  // 1. Federal Tax
  const fedDeduction = FEDERAL_STANDARD_DEDUCTION[filingStatus];
  const fedTaxableIncome = Math.max(0, adjustedSalary - fedDeduction);
  const federalTax = calculateProgressiveTax(fedTaxableIncome, FEDERAL_TAX_BRACKETS[filingStatus]);

  // 2. FICA Taxes (FICA is based on gross wages prior to standard deductions)
  const ssTaxableWage = Math.min(grossSalary, FICA_CONFIG.socialSecurityWageCap);
  const socialSecurityTax = ssTaxableWage * FICA_CONFIG.socialSecurityRate;

  let medicareTax = grossSalary * FICA_CONFIG.medicareRate;
  const addMedicareThreshold = FICA_CONFIG.additionalMedicareThreshold[filingStatus];
  if (grossSalary > addMedicareThreshold) {
    medicareTax += (grossSalary - addMedicareThreshold) * FICA_CONFIG.additionalMedicareRate;
  }
  const totalFicaTax = socialSecurityTax + medicareTax;

  // 3. State Income Tax
  let stateTax = 0;
  const normalizedSlug = stateSlug.toLowerCase().replace(/-/g, '_');
  const stateRule = STATE_TAX_RULES[normalizedSlug] || { type: 'flat', flatRate: 0.045, standardDeduction: { single: 5000, married: 10000, head_of_household: 7500 } };

  if (stateRule.type === 'flat') {
    const sDeduction = stateRule.standardDeduction ? stateRule.standardDeduction[filingStatus] : 0;
    const stateTaxable = Math.max(0, adjustedSalary - sDeduction);
    stateTax = stateTaxable * (stateRule.flatRate || 0);
  } else if (stateRule.type === 'graduated' && stateRule.brackets) {
    const sDeduction = stateRule.standardDeduction ? stateRule.standardDeduction[filingStatus] : 0;
    const stateTaxable = Math.max(0, adjustedSalary - sDeduction);
    stateTax = calculateProgressiveTax(stateTaxable, stateRule.brackets);
  }

  const totalTaxes = federalTax + totalFicaTax + stateTax;
  const netAnnualPay = Math.max(0, grossSalary - totalTaxes);
  const netMonthlyPay = netAnnualPay / 12;
  const netBiWeeklyPay = netAnnualPay / 26;

  return {
    grossSalary,
    federalTax: Math.round(federalTax),
    effectiveFederalRate: grossSalary > 0 ? (federalTax / grossSalary) * 100 : 0,
    socialSecurityTax: Math.round(socialSecurityTax),
    medicareTax: Math.round(medicareTax),
    totalFicaTax: Math.round(totalFicaTax),
    stateTax: Math.round(stateTax),
    effectiveStateRate: grossSalary > 0 ? (stateTax / grossSalary) * 100 : 0,
    totalTaxes: Math.round(totalTaxes),
    totalEffectiveTaxRate: grossSalary > 0 ? (totalTaxes / grossSalary) * 100 : 0,
    netAnnualPay: Math.round(netAnnualPay),
    netMonthlyPay: Math.round(netMonthlyPay),
    netBiWeeklyPay: Math.round(netBiWeeklyPay)
  };
}
