import React from 'react';
import { AlertCircle } from 'lucide-react';

export function DisclaimerBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 leading-relaxed shadow-2xs ${className}`}>
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
        <div>
          <strong className="font-bold text-amber-950">Informational Estimates Only: </strong>
          This platform provides mathematical estimates and general statistical benchmarks for relocation planning purposes only. Calculations and scores may vary based on specific local tax jurisdictions, personalized household spending, mortgage underwriting, and market rate fluctuations. MoveAmerica USA does not provide legal, tax, financial, immigration, or licensed moving brokerage advice.
        </div>
      </div>
    </div>
  );
}
