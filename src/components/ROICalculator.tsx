'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, IndianRupee, Users, ArrowRight, Zap, Target } from 'lucide-react';

interface ROICalculatorProps {
  onOpenBooking: (prefillInfo?: { spend: string; industry: string; projectedRevenue: string }) => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenBooking }) => {
  const [monthlySpend, setMonthlySpend] = useState<number>(250000);
  const [customerValue, setCustomerValue] = useState<number>(45000);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [industry, setIndustry] = useState<string>('saas');

  const industryMultipliers: Record<string, { cpc: number; roasBoost: number }> = {
    saas: { cpc: 250, roasBoost: 1.4 },
    ecommerce: { cpc: 90, roasBoost: 1.6 },
    services: { cpc: 350, roasBoost: 1.3 },
    fintech: { cpc: 450, roasBoost: 1.5 },
  };

  const calculations = useMemo(() => {
    const config = industryMultipliers[industry] || industryMultipliers.saas;
    const estimatedClicks = Math.floor(monthlySpend / config.cpc);
    const baselineConversions = Math.floor(estimatedClicks * (conversionRate / 100));
    
    // Matricsmania optimized conversion lift (+60% avg conversion, improved ROAS)
    const optimizedConvRate = conversionRate * 1.6;
    const optimizedConversions = Math.floor(estimatedClicks * (optimizedConvRate / 100));
    
    const projectedRevenue = optimizedConversions * customerValue;
    const roas = (projectedRevenue / monthlySpend).toFixed(2);
    const netProfit = projectedRevenue - monthlySpend;

    return {
      clicks: estimatedClicks.toLocaleString('en-IN'),
      conversions: optimizedConversions.toLocaleString('en-IN'),
      revenue: projectedRevenue.toLocaleString('en-IN'),
      roas: `${roas}x`,
      profit: netProfit > 0 ? `₹${netProfit.toLocaleString('en-IN')}` : '₹0',
      extraCustomers: (optimizedConversions - baselineConversions).toLocaleString('en-IN'),
    };
  }, [monthlySpend, customerValue, conversionRate, industry]);

  return (
    <div className="w-full bg-[#0D1424] text-white rounded-2xl p-6 md:p-10 border border-[#1E293B] relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-[#60A5FA] font-semibold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Interactive ROI &amp; Revenue Forecaster (INR)</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            See How Much Revenue MatricsMania Can Generate For You
          </h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed">
            Adjust your monthly marketing budget in Rupees (₹) and target parameters to calculate estimated monthly customer acquisition and Return on Ad Spend (ROAS).
          </p>

          <div className="space-y-5 pt-2">
            {/* Industry Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#94A3B8] mb-2">
                Industry Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'saas', label: 'B2B SaaS' },
                  { id: 'ecommerce', label: 'E-Commerce' },
                  { id: 'services', label: 'B2B Services' },
                  { id: 'fintech', label: 'FinTech' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndustry(item.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      industry === item.id
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white border-transparent shadow-sm'
                        : 'bg-[#070B14] text-[#94A3B8] border-[#1E293B] hover:bg-[#131D33] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Monthly Budget */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <label htmlFor="roi-monthly-spend" className="text-[#94A3B8]">Monthly Ad &amp; Growth Budget</label>
                <span className="text-white font-bold">₹{monthlySpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                id="roi-monthly-spend"
                type="range"
                min="25000"
                max="5000000"
                step="25000"
                aria-label="Monthly Ad and Growth Budget"
                aria-valuemin={25000}
                aria-valuemax={5000000}
                aria-valuenow={monthlySpend}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-[#131D33] rounded-lg appearance-none cursor-pointer accent-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <div className="flex justify-between text-[11px] text-[#64748B]">
                <span>₹25,000/mo</span>
                <span>₹25,00,000/mo</span>
                <span>₹50,00,000/mo</span>
              </div>
            </div>

            {/* Slider 2: Customer LTV / Deal Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <label htmlFor="roi-customer-ltv" className="text-[#94A3B8]">Avg Deal / Lifetime Value (LTV)</label>
                <span className="text-white font-bold">₹{customerValue.toLocaleString('en-IN')}</span>
              </div>
              <input
                id="roi-customer-ltv"
                type="range"
                min="1000"
                max="1000000"
                step="5000"
                aria-label="Average Deal Lifetime Value"
                aria-valuemin={1000}
                aria-valuemax={1000000}
                aria-valuenow={customerValue}
                value={customerValue}
                onChange={(e) => setCustomerValue(Number(e.target.value))}
                className="w-full h-2 bg-[#131D33] rounded-lg appearance-none cursor-pointer accent-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            {/* Slider 3: Current Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <label htmlFor="roi-conversion-rate" className="text-[#94A3B8]">Current Site Conversion Rate</label>
                <span className="text-[#10B981] font-bold">{conversionRate}%</span>
              </div>
              <input
                id="roi-conversion-rate"
                type="range"
                min="0.5"
                max="8"
                step="0.1"
                aria-label="Current Site Conversion Rate"
                aria-valuemin={0.5}
                aria-valuemax={8}
                aria-valuenow={conversionRate}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-[#131D33] rounded-lg appearance-none cursor-pointer accent-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 bg-[#070B14] border border-[#1E293B] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              Projected Monthly Impact
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#10B981]/10 text-[#34D399] px-2.5 py-1 rounded-full border border-[#10B981]/30">
              <Zap className="w-3 h-3" />
              MatricsMania Lift
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0D1424] p-4 rounded-xl border border-[#1E293B]">
              <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-[#60A5FA]" /> Projected Revenue
              </div>
              <div className="text-xl md:text-2xl font-extrabold text-white">₹{calculations.revenue}</div>
            </div>

            <div className="bg-[#0D1424] p-4 rounded-xl border border-[#1E293B]">
              <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" /> Estimated ROAS
              </div>
              <div className="text-xl md:text-2xl font-extrabold text-[#10B981]">{calculations.roas}</div>
            </div>

            <div className="bg-[#0D1424] p-4 rounded-xl border border-[#1E293B]">
              <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-[#8B5CF6]" /> Customers / Mo
              </div>
              <div className="text-xl font-bold text-white">{calculations.conversions}</div>
              <div className="text-[10px] text-[#10B981] font-medium mt-1">
                +{calculations.extraCustomers} extra vs baseline
              </div>
            </div>

            <div className="bg-[#0D1424] p-4 rounded-xl border border-[#1E293B]">
              <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-1">
                <Target className="w-3.5 h-3.5 text-[#60A5FA]" /> High-Intent Clicks
              </div>
              <div className="text-xl font-bold text-white">{calculations.clicks}</div>
            </div>
          </div>

          <div className="p-3 bg-[#131D33] rounded-xl border border-[#1E293B] text-xs text-[#94A3B8]">
            💡 <strong>Calculated Strategy:</strong> Based on combining full-funnel CRO landing page optimization with targeted algorithmic bidding.
          </div>

          <button
            onClick={() =>
              onOpenBooking({
                spend: `₹${monthlySpend.toLocaleString('en-IN')}/mo`,
                industry,
                projectedRevenue: `₹${calculations.revenue}/mo`,
              })
            }
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
          >
            <span>Lock In This Growth Model</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
