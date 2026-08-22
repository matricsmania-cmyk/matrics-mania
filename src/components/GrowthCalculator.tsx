'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  BarChart3,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Zap,
  HelpCircle,
  Clock,
  Briefcase,
} from 'lucide-react';
import {
  GrowthCalculatorInputs,
  GrowthComparisonResult,
  IndustryBenchmarkPreset,
  INDUSTRY_GROWTH_PRESETS,
  DEFAULT_GROWTH_ASSUMPTIONS,
  calculateGrowthComparison,
  formatCurrencyValue,
  formatCompactNumber,
} from '../utils/growthCalculations';

export interface GrowthCalculatorProps {
  title?: string;
  subtitle?: string;
  initialPresetId?: string;
  initialInputs?: Partial<GrowthCalculatorInputs>;
  variant?: 'full' | 'compact' | 'embedded';
  currency?: 'USD' | 'INR' | 'GBP' | 'EUR';
  onOpenBooking?: (prefillInfo?: any) => void;
  onApplyModel?: (modelResult: GrowthComparisonResult) => void;
  className?: string;
}

export const GrowthCalculator: React.FC<GrowthCalculatorProps> = ({
  title = 'Enterprise Pipeline & Growth Financial Forecaster',
  subtitle = 'Model the compounding impact of technical SEO, conversion rate engineering, and server-side attribution on your pipeline and net revenue.',
  initialPresetId = 'b2b-saas-enterprise',
  initialInputs,
  variant = 'full',
  currency: propCurrency,
  onOpenBooking,
  onApplyModel,
  className = '',
}) => {
  // 1. Selected Preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);

  const activePreset = useMemo(
    () => INDUSTRY_GROWTH_PRESETS.find((p) => p.id === selectedPresetId) || INDUSTRY_GROWTH_PRESETS[0],
    [selectedPresetId]
  );

  // 2. Active Currency
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'GBP' | 'EUR'>(
    propCurrency || activePreset.currency
  );

  // 3. Calculation Inputs State
  const [inputs, setInputs] = useState<GrowthCalculatorInputs>({
    ...activePreset.defaults,
    currency: propCurrency || activePreset.currency,
    ...initialInputs,
  });

  // 4. View Modes & Collapsibles
  const [activeTab, setActiveTab] = useState<'overview' | 'unit-economics' | 'pipeline-funnel'>(
    'overview'
  );
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);
  const [showAdvancedInputs, setShowAdvancedInputs] = useState<boolean>(false);

  // 5. When user switches preset, re-seed defaults
  const handleSelectPreset = (preset: IndustryBenchmarkPreset) => {
    setSelectedPresetId(preset.id);
    setCurrency(preset.currency);
    setInputs({
      ...preset.defaults,
      currency: preset.currency,
    });
  };

  // 6. Update single input field
  const updateInput = <K extends keyof GrowthCalculatorInputs>(
    key: K,
    value: GrowthCalculatorInputs[K]
  ) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 7. Calculate pure mathematical outputs via decoupled calculation engine
  const calculationResult: GrowthComparisonResult = useMemo(() => {
    return calculateGrowthComparison(inputs, DEFAULT_GROWTH_ASSUMPTIONS);
  }, [inputs]);

  const { baseline, modeled, delta, assumptions } = calculationResult;

  // Currency Formatter Helper
  const fmt = (val: number) => formatCurrencyValue(val, currency);

  return (
    <div
      id="growth-calculator-container"
      className={`w-full bg-[#0D1424] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#1E293B] shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 space-y-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070B14] border border-[#2563EB]/40 text-xs font-mono font-semibold text-[#60A5FA] tracking-wider uppercase shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Interactive Growth &amp; Unit Economics Engine</span>
          </div>

          {/* Currency Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs font-mono">
            {(['USD', 'INR', 'GBP', 'EUR'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => {
                  setCurrency(curr);
                  updateInput('currency', curr);
                }}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  currency === curr
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : curr === 'GBP' ? '£ GBP' : '€ EUR'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-3xl mt-1.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Industry Presets Selector */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
            <span className="uppercase tracking-wider">Load Verified Industry Benchmark Preset:</span>
            <span className="text-[#60A5FA]">{activePreset.name} active</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {INDUSTRY_GROWTH_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#2563EB]/20 border-[#2563EB] text-white shadow-lg shadow-blue-500/10'
                      : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs truncate text-white">{preset.name}</div>
                  <div className="text-[10px] text-[#64748B] font-mono mt-0.5">{preset.category}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Mathematical Projections on Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =========================================================================
            LEFT COLUMN: INPUT CONTROLS & SLIDERS (5 Cols on large screens)
           ========================================================================= */}
        <div className="lg:col-span-5 space-y-5 bg-[#070B14] p-5 sm:p-6 rounded-2xl border border-[#1E293B]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-[#3B82F6]" />
              <span>Current Funnel Parameters</span>
            </div>
            <button
              type="button"
              onClick={() => handleSelectPreset(activePreset)}
              className="text-[11px] font-mono text-[#64748B] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset to benchmark defaults"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Control 1: Monthly Traffic */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="gc-traffic" className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Monthly Website Visitors</span>
              </label>
              <span className="text-white font-bold bg-[#0D1424] px-2 py-0.5 rounded border border-[#1E293B]">
                {inputs.monthlyTraffic.toLocaleString()}
              </span>
            </div>
            <input
              id="gc-traffic"
              type="range"
              min="2000"
              max="500000"
              step="2000"
              value={inputs.monthlyTraffic}
              onChange={(e) => updateInput('monthlyTraffic', Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
              <span>2k sessions</span>
              <span>250k</span>
              <span>500k+</span>
            </div>
          </div>

          {/* Control 2: Visitor-to-Lead Conversion Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="gc-conv-rate" className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Visitor-to-Lead Conversion Rate</span>
              </label>
              <span className="text-white font-bold bg-[#0D1424] px-2 py-0.5 rounded border border-[#1E293B]">
                {inputs.conversionRate.toFixed(1)}%
              </span>
            </div>
            <input
              id="gc-conv-rate"
              type="range"
              min="0.5"
              max="10.0"
              step="0.1"
              value={inputs.conversionRate}
              onChange={(e) => updateInput('conversionRate', Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
              <span>0.5% (Low)</span>
              <span>2.5% (Avg)</span>
              <span>10.0% (Top 1%)</span>
            </div>
          </div>

          {/* Control 3: Qualified Lead Rate (MQL/SQL) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="gc-qual-rate" className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lead Qualification Rate (MQL/SQL)</span>
              </label>
              <span className="text-white font-bold bg-[#0D1424] px-2 py-0.5 rounded border border-[#1E293B]">
                {inputs.qualifiedLeadRate}%
              </span>
            </div>
            <input
              id="gc-qual-rate"
              type="range"
              min="10"
              max="80"
              step="1"
              value={inputs.qualifiedLeadRate}
              onChange={(e) => updateInput('qualifiedLeadRate', Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
              <span>10% (Broad)</span>
              <span>35% (Targeted)</span>
              <span>80% (Strict)</span>
            </div>
          </div>

          {/* Control 4: Close Rate (SQL to Customer) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="gc-close-rate" className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>SQL-to-Customer Close Rate</span>
              </label>
              <span className="text-white font-bold bg-[#0D1424] px-2 py-0.5 rounded border border-[#1E293B]">
                {inputs.closeRate}%
              </span>
            </div>
            <input
              id="gc-close-rate"
              type="range"
              min="5"
              max="50"
              step="1"
              value={inputs.closeRate}
              onChange={(e) => updateInput('closeRate', Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
              <span>5% (Complex Enterprise)</span>
              <span>20% (Standard)</span>
              <span>50% (High Velocity)</span>
            </div>
          </div>

          {/* Control 5: Average Deal Value (ACV) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="gc-deal-value" className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Average Deal Value (ACV)</span>
              </label>
              <span className="text-emerald-400 font-bold bg-[#0D1424] px-2 py-0.5 rounded border border-[#1E293B]">
                {fmt(inputs.averageDealValue)}
              </span>
            </div>
            <input
              id="gc-deal-value"
              type="range"
              min={currency === 'INR' ? 100000 : 1000}
              max={currency === 'INR' ? 10000000 : 250000}
              step={currency === 'INR' ? 50000 : 1000}
              value={inputs.averageDealValue}
              onChange={(e) => updateInput('averageDealValue', Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Control 6: Monthly Marketing / Growth Spend */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="gc-spend" className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Monthly Growth &amp; Media Spend</span>
              </label>
              <span className="text-white font-bold bg-[#0D1424] px-2 py-0.5 rounded border border-[#1E293B]">
                {fmt(inputs.monthlyMarketingSpend)}
              </span>
            </div>
            <input
              id="gc-spend"
              type="range"
              min={currency === 'INR' ? 100000 : 2000}
              max={currency === 'INR' ? 10000000 : 250000}
              step={currency === 'INR' ? 50000 : 1000}
              value={inputs.monthlyMarketingSpend}
              onChange={(e) => updateInput('monthlyMarketingSpend', Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
          </div>

          {/* Advanced Inputs Toggle (LTV Lifespan & Margins) */}
          <div className="pt-2 border-t border-[#1E293B]">
            <button
              type="button"
              onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}
              className="w-full flex items-center justify-between text-xs font-mono text-[#60A5FA] hover:text-white cursor-pointer py-1"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3 h-3" />
                <span>Advanced Retention &amp; Margin Variables</span>
              </span>
              {showAdvancedInputs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvancedInputs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-3 mt-2 border-t border-[#1E293B]/60 text-xs font-mono"
              >
                {/* Lifespan */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Customer Retention Lifespan:</span>
                    <span className="text-white font-bold">{inputs.customerLifespanMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="3"
                    value={inputs.customerLifespanMonths}
                    onChange={(e) => updateInput('customerLifespanMonths', Number(e.target.value))}
                    className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                </div>

                {/* Gross Margin */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Gross Margin Percentage:</span>
                    <span className="text-white font-bold">{inputs.grossMarginPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    step="5"
                    value={inputs.grossMarginPercent}
                    onChange={(e) => updateInput('grossMarginPercent', Number(e.target.value))}
                    className="w-full h-1.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: MATHEMATICAL GROWTH FORECAST & METRIC TILES (7 Cols)
           ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Hero Projection Card: Modeled Annual Revenue Delta */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#0D1424] to-[#070B14] border border-[#2563EB]/40 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-[#60A5FA] pb-3 border-b border-[#1E293B]">
              <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                Modeled Annual Revenue Expansion
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                +{delta.percentageRevenueLift}% Modeled Lift
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 items-center">
              <div>
                <div className="text-xs font-mono text-[#94A3B8] uppercase">
                  Projected Annual Closed Revenue
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                  {fmt(modeled.estimatedRevenueAnnual)}
                </div>
                <div className="text-xs text-[#64748B] font-mono mt-1 flex items-center gap-1">
                  <span>Current Baseline:</span>
                  <span className="line-through text-[#94A3B8]">{fmt(baseline.estimatedRevenueAnnual)}</span>
                </div>
              </div>

              {/* Net Delta Callout */}
              <div className="p-4 rounded-xl bg-[#070B14]/80 border border-emerald-500/30 space-y-1">
                <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Additional Revenue Delta
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  +{fmt(delta.additionalAnnualRevenue)} / yr
                </div>
                <p className="text-[10px] text-[#94A3B8] leading-tight">
                  Driven by +{delta.additionalAnnualCustomers} incremental closed accounts per year.
                </p>
              </div>
            </div>
          </div>

          {/* Metric Category Tabs */}
          <div className="flex border-b border-[#1E293B] gap-4 text-xs font-mono">
            {[
              { id: 'overview', label: 'Revenue & Pipeline', icon: DollarSign },
              { id: 'unit-economics', label: 'CAC, LTV & Payback', icon: TrendingUp },
              { id: 'pipeline-funnel', label: 'Funnel Stage Counts', icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#2563EB] text-white'
                    : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: REVENUE & PIPELINE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Annual Pipeline */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Annual Qualified Pipeline</div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  {fmt(modeled.pipelineValueAnnual)}
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  +{fmt(delta.additionalAnnualPipeline)} delta
                </div>
              </div>

              {/* Monthly Revenue */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Monthly Run-Rate</div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  {fmt(modeled.estimatedRevenueMonthly)}
                </div>
                <div className="text-[10px] font-mono text-[#64748B]">
                  Baseline: {fmt(baseline.estimatedRevenueMonthly)}
                </div>
              </div>

              {/* Annual Growth ROAS */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Return on Growth Spend</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-400">
                  {modeled.returnOnMarketingSpend}x ROMS
                </div>
                <div className="text-[10px] font-mono text-[#64748B]">
                  Baseline: {baseline.returnOnMarketingSpend}x
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UNIT ECONOMICS (CAC, LTV, PAYBACK) */}
          {activeTab === 'unit-economics' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* CAC Tile */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Blended CAC</div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  {fmt(modeled.cac)}
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  -{delta.cacReductionPercent}% lower cost
                </div>
              </div>

              {/* LTV Tile */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                <div className="text-[11px] font-mono text-[#94A3B8] uppercase">Customer LTV</div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  {fmt(modeled.ltv)}
                </div>
                <div className="text-[10px] font-mono text-[#64748B]">
                  {inputs.customerLifespanMonths} mo @ {inputs.grossMarginPercent}% margin
                </div>
              </div>

              {/* LTV:CAC Ratio Tile */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-mono text-[#94A3B8] uppercase">LTV : CAC Health</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-400">
                  {modeled.ltvToCacRatio}:1
                </div>
                <div className="text-[10px] font-mono text-[#64748B]">
                  Payback: {modeled.cacPaybackMonths} Months
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FUNNEL STAGE COUNTS */}
          {activeTab === 'pipeline-funnel' && (
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[#94A3B8]">1. Monthly Inquiries / Raw Leads:</span>
                <span className="text-white font-bold">{modeled.rawLeadsMonthly} leads / mo</span>
              </div>
              <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[#94A3B8]">2. Qualified SQL Pipeline Deals:</span>
                <span className="text-[#60A5FA] font-bold">{modeled.qualifiedLeadsMonthly} SQLs / mo</span>
              </div>
              <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[#94A3B8]">3. Closed-Won Customer Velocity:</span>
                <span className="text-emerald-400 font-bold">{modeled.closedCustomersMonthly} closed / mo ({modeled.closedCustomersAnnual} / yr)</span>
              </div>
            </div>
          )}

          {/* Assumptions & Formula Multipliers Collapsible */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-3">
            <button
              type="button"
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="w-full flex items-center justify-between text-xs font-mono font-bold text-[#60A5FA] hover:text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#3B82F6]" />
                <span>Explicit Mathematical Assumptions &amp; Engineering Levers</span>
              </span>
              {showAssumptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAssumptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 pt-2 text-xs text-[#94A3B8] border-t border-[#1E293B]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                  {assumptions.map((assump) => (
                    <div key={assump.id} className="p-3 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-1">
                      <div className="text-white font-bold">{assump.title}</div>
                      <div className="text-[10px] text-[#64748B]">{assump.description}</div>
                      <div className="text-[#60A5FA] font-bold text-[10px]">
                        Modeled Intervention Multiplier: {assump.modeledMultiplier}x
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {onOpenBooking && (
              <button
                type="button"
                onClick={() =>
                  onOpenBooking({
                    annualPipeline: fmt(modeled.pipelineValueAnnual),
                    dealValue: fmt(inputs.averageDealValue),
                    monthlyTraffic: inputs.monthlyTraffic.toString(),
                    industry: activePreset.name,
                    preset: selectedPresetId,
                  })
                }
                className="w-full sm:flex-1 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
              >
                <span>Schedule Executive Growth Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onApplyModel && (
              <button
                type="button"
                onClick={() => onApplyModel(calculationResult)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#070B14] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                Apply Model to Intake
              </button>
            )}
          </div>

          {/* MANDATORY DISCLAIMER CALLOUT */}
          <div className="p-4 rounded-xl bg-[#070B14]/60 border border-[#1E293B] flex items-start gap-3 text-[11px] text-[#64748B] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#94A3B8]">Hypothetical Mathematical Modeling Notice:</span>{' '}
              All outputs, pipeline estimations, CAC reductions, and revenue projections generated by this tool are hypothetical modeling calculations based on user-supplied variables and agency historical averages. They do not constitute guaranteed commercial returns or binding performance warranties.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
