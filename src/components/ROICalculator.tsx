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
    <div className="w-full bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Interactive ROI & Revenue Forecaster (INR)</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            See How Much Revenue Matricsmania Can Generate For You
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Adjust your monthly marketing budget in Rupees (₹) and target parameters to calculate estimated monthly customer acquisition and Return on Ad Spend (ROAS).
          </p>

          <div className="space-y-5 pt-2">
            {/* Industry Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
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
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                      industry === item.id
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
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
                <span className="text-slate-300">Monthly Ad & Growth Budget</span>
                <span className="text-blue-400 font-bold">₹{monthlySpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="25000"
                max="5000000"
                step="25000"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>₹25,000/mo</span>
                <span>₹10,000,000/mo</span>
                <span>₹50,000,000/mo</span>
              </div>
            </div>

            {/* Slider 2: Customer LTV / Deal Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-300">Avg Deal / Lifetime Value (LTV)</span>
                <span className="text-purple-400 font-bold">₹{customerValue.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="5000"
                value={customerValue}
                onChange={(e) => setCustomerValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Slider 3: Current Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-300">Current Site Conversion Rate</span>
                <span className="text-emerald-400 font-bold">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-700">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Projected Monthly Impact
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <Zap className="w-3 h-3" />
              Matricsmania Lift
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-blue-400" /> Projected Revenue
              </div>
              <div className="text-xl md:text-2xl font-black text-blue-400">₹{calculations.revenue}</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Estimated ROAS
              </div>
              <div className="text-xl md:text-2xl font-black text-emerald-400">{calculations.roas}</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-purple-400" /> Customers / Mo
              </div>
              <div className="text-xl font-bold text-white">{calculations.conversions}</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-1">
                +{calculations.extraCustomers} extra vs baseline
              </div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Target className="w-3.5 h-3.5 text-pink-400" /> High-Intent Clicks
              </div>
              <div className="text-xl font-bold text-white">{calculations.clicks}</div>
            </div>
          </div>

          <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-500/30 text-xs text-blue-200">
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
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Lock In This Growth Model</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
