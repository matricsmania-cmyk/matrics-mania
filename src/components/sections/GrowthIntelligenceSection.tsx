'use client';

import React, { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { AuditSimulator } from '../AuditSimulator';
import { GrowthCalculator } from '../GrowthCalculator';
import { ROICalculator } from '../ROICalculator';
import { Activity, Calculator, Sparkles, Terminal, TrendingUp } from 'lucide-react';

export interface GrowthIntelligenceSectionProps {
  onOpenBooking: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const GrowthIntelligenceSection: React.FC<GrowthIntelligenceSectionProps> = ({
  onOpenBooking,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'growth-calc' | 'simulator' | 'roi-fast'>('growth-calc');

  return (
    <section id="growth-intelligence-section" className="py-20 sm:py-28 bg-[#070B14] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <Activity className="w-3.5 h-3.5 text-[#3B82F6]" />
            Growth Intelligence &amp; Measurement Lab
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Interactive Diagnostics &amp; Financial Modeling
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Model the compound impact of conversion rate engineering, qualified pipeline velocity, and CAC optimization, or run an edge-rendered crawl simulation on your domain.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex flex-wrap p-1.5 rounded-xl bg-[#0D1424] border border-[#1E293B] gap-1 mx-auto mt-2 justify-center">
            <button
              id="switch-growth-calc-btn"
              onClick={() => setActiveTab('growth-calc')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'growth-calc'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Full Growth &amp; Pipeline Forecaster</span>
            </button>

            <button
              id="switch-audit-simulator-btn"
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'simulator'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Crawl &amp; Schema Simulator</span>
            </button>

            <button
              id="switch-roi-calculator-btn"
              onClick={() => setActiveTab('roi-fast')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'roi-fast'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Quick INR Ad Spend Model</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Tab Body */}
        <div className="mt-8">
          {activeTab === 'growth-calc' && (
            <GrowthCalculator
              onOpenBooking={onOpenBooking}
              onApplyModel={(model) => {
                if (onShowToast) {
                  onShowToast(
                    'Growth Model Saved',
                    `Model for +${model.delta.additionalAnnualCustomers} annual customers saved. You can submit your intake anytime.`,
                    'info'
                  );
                }
              }}
            />
          )}
          {activeTab === 'simulator' && (
            <AuditSimulator onOpenBooking={onOpenBooking} onShowToast={onShowToast || (() => {})} />
          )}
          {activeTab === 'roi-fast' && (
            <ROICalculator onOpenBooking={onOpenBooking} />
          )}
        </div>
      </div>
    </section>
  );
};

