export interface RentAffordabilityInput {
  annualIncome: number;
  monthlyDebt: number; // Student loans, car notes, minimum credit cards
  monthlySavingsGoal: number;
  monthlyOtherExpenses: number;
}

export interface RentAffordabilityResult {
  monthlyGrossIncome: number;
  conservativeRent: number; // 25% of gross
  moderateRent: number; // 30% standard rule
  aggressiveRent: number; // 35% maximum cap
  recommendedMaxRentWithDebt: number; // Back-end DTI cap at 43%
  annualRentAtModerate: number;
  monthlyTakeHomeEstimate: number;
  remainingDiscretionary: number;
  budgetBreakdown503020: {
    needs: number; // 50%
    wants: number; // 30%
    savings: number; // 20%
  };
  debtToIncomeRatio: number;
  explanation: string;
}

export function calculateRentAffordability(input: RentAffordabilityInput): RentAffordabilityResult {
  const monthlyGross = Math.max(0, input.annualIncome / 12);
  
  // Standard thresholds
  const conservativeRent = Math.round(monthlyGross * 0.25);
  const moderateRent = Math.round(monthlyGross * 0.30);
  const aggressiveRent = Math.round(monthlyGross * 0.35);

  // Maximum allowed housing under standard 43% total back-end debt-to-income ratio
  const maxAllowableTotalDebt = monthlyGross * 0.43;
  const maxRentUnderDTI = Math.max(0, Math.round(maxAllowableTotalDebt - input.monthlyDebt));
  const recommendedMaxRentWithDebt = Math.min(moderateRent, maxRentUnderDTI);

  // Estimated after-tax take-home (approx 78% national median)
  const monthlyTakeHome = monthlyGross * 0.78;
  const totalFixedCosts = recommendedMaxRentWithDebt + input.monthlyDebt + input.monthlyOtherExpenses;
  const remainingDiscretionary = Math.max(0, Math.round(monthlyTakeHome - totalFixedCosts - input.monthlySavingsGoal));

  const dti = monthlyGross > 0 ? Math.round(((input.monthlyDebt + recommendedMaxRentWithDebt) / monthlyGross) * 100) : 0;

  return {
    monthlyGrossIncome: Math.round(monthlyGross),
    conservativeRent,
    moderateRent,
    aggressiveRent,
    recommendedMaxRentWithDebt,
    annualRentAtModerate: moderateRent * 12,
    monthlyTakeHomeEstimate: Math.round(monthlyTakeHome),
    remainingDiscretionary,
    budgetBreakdown503020: {
      needs: Math.round(monthlyTakeHome * 0.50),
      wants: Math.round(monthlyTakeHome * 0.30),
      savings: Math.round(monthlyTakeHome * 0.20)
    },
    debtToIncomeRatio: dti,
    explanation: `Based on the traditional 30% gross income guideline and your existing monthly debt obligations of $${input.monthlyDebt.toLocaleString()}, a moderate monthly rent of $${recommendedMaxRentWithDebt.toLocaleString()} keeps your overall Debt-to-Income (DTI) at a safe ${dti}%.`
  };
}
