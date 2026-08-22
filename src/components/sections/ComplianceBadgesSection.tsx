'use client';

import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export interface ComplianceBadgesSectionProps {
  standards: string[];
  salesCycle?: string;
  averageACV?: string;
}

export const ComplianceBadgesSection: React.FC<ComplianceBadgesSectionProps> = ({
  standards,
  salesCycle,
  averageACV,
}) => {
  if (!standards || standards.length === 0) return null;

  return (
    <section className="py-8 bg-[#070B14] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 p-4 rounded-xl bg-[#0D1424] border border-[#1E293B]">
          {/* Compliance items */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-1 rounded border border-[#2563EB]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>COMPLIANCE VERIFIED</span>
            </div>
            {standards.map((std, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-[#CBD5E1] bg-[#070B14] px-2.5 py-1 rounded border border-[#1E293B]"
              >
                {std}
              </span>
            ))}
          </div>

          {/* Operational economics */}
          {(salesCycle || averageACV) && (
            <div className="flex items-center gap-6 text-xs font-mono text-[#94A3B8]">
              {salesCycle && (
                <div>
                  <span className="text-[#64748B]">Typical Velocity: </span>
                  <span className="text-white font-semibold">{salesCycle}</span>
                </div>
              )}
              {averageACV && (
                <div>
                  <span className="text-[#64748B]">Target Deal Size: </span>
                  <span className="text-[#60A5FA] font-semibold">{averageACV}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
