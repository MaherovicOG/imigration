import React from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export function AdBanner({ slotId = 'default-slot', format = 'horizontal', className = '' }: AdBannerProps) {
  // Production ready AdSense container with graceful placeholder styling for development
  return (
    <div className={`ad-container my-8 w-full flex flex-col items-center ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
        Advertisement
      </span>
      <div
        className={`w-full bg-slate-50 border border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center p-4 text-center text-slate-400 text-xs transition-colors hover:bg-slate-100/80 ${
          format === 'horizontal'
            ? 'min-h-[90px] max-w-4xl'
            : format === 'rectangle'
            ? 'min-h-[250px] max-w-md'
            : 'min-h-[120px] max-w-2xl'
        }`}
        data-ad-slot={slotId}
      >
        <div className="flex items-center gap-2 font-medium text-slate-500">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>AdSense Placement Area</span>
        </div>
        <span className="text-[11px] text-slate-400 mt-1">
          Targeted contextual moving & financial services ad unit
        </span>
      </div>
    </div>
  );
}
