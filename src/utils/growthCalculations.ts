/**
 * Growth & Revenue Financial Modeling Engine
 * 
 * All business logic, pipeline conversions, unit economics, and growth forecasting
 * formulas are centralized here. Pure functions ensure that calculations are 
 * strictly decoupled from UI presentation layers.
 */

export interface GrowthCalculatorInputs {
  /** Monthly website sessions or unique visitors */
  monthlyTraffic: number;
  /** Visitor to lead/inquiry conversion rate in percent (e.g. 2.5 for 2.5%) */
  conversionRate: number;
  /** Percentage of leads that meet MQL/SQL qualification criteria (e.g. 35 for 35%) */
  qualifiedLeadRate: number;
  /** Percentage of qualified leads that convert to closed-won deals (e.g. 20 for 20%) */
  closeRate: number;
  /** Average contract value (ACV) or first-year deal value */
  averageDealValue: number;
  /** Monthly marketing / growth spend for CAC determination */
  monthlyMarketingSpend: number;
  /** Estimated customer lifespan in months (e.g. 24 or 36) */
  customerLifespanMonths: number;
  /** Gross margin percentage (e.g. 80 for 80%) */
  grossMarginPercent: number;
  /** Currency code for display */
  currency: 'USD' | 'INR' | 'GBP' | 'EUR';
}

export interface GrowthModelMetrics {
  /** Total raw inquiries generated monthly */
  rawLeadsMonthly: number;
  /** Annualized raw inquiries */
  rawLeadsAnnual: number;
  /** Sales-Qualified Leads (SQLs) generated monthly */
  qualifiedLeadsMonthly: number;
  /** Annualized Sales-Qualified Leads */
  qualifiedLeadsAnnual: number;
  /** Total qualified pipeline value created monthly */
  pipelineValueMonthly: number;
  /** Total qualified pipeline value created annually */
  pipelineValueAnnual: number;
  /** Closed-won customers acquired per month */
  closedCustomersMonthly: number;
  /** Closed-won customers acquired annually */
  closedCustomersAnnual: number;
  /** Estimated closed-won revenue generated monthly */
  estimatedRevenueMonthly: number;
  /** Estimated closed-won revenue generated annually */
  estimatedRevenueAnnual: number;
  /** Effective blended Customer Acquisition Cost (CAC) */
  cac: number;
  /** Customer Lifetime Value (LTV) taking into account lifespan and gross margin */
  ltv: number;
  /** LTV to CAC unit economics ratio */
  ltvToCacRatio: number;
  /** Estimated months required to pay back CAC */
  cacPaybackMonths: number;
  /** Return on Growth/Ad Spend (ROAS / ROMS) */
  returnOnMarketingSpend: number;
}

export interface GrowthComparisonResult {
  baseline: GrowthModelMetrics;
  modeled: GrowthModelMetrics;
  /** Delta metrics representing the modeled architectural uplift */
  delta: {
    additionalAnnualRevenue: number;
    additionalAnnualPipeline: number;
    additionalAnnualCustomers: number;
    cacReductionAmount: number;
    cacReductionPercent: number;
    ltvCacImprovement: number;
    percentageRevenueLift: number;
  };
  assumptions: GrowthModelAssumption[];
}

export interface GrowthModelAssumption {
  id: string;
  category: 'Crawl & Traffic' | 'Conversion Optimization' | 'Attribution & CAC' | 'Sales Velocity';
  title: string;
  description: string;
  baselineMultiplier: number;
  modeledMultiplier: number;
}

export interface IndustryBenchmarkPreset {
  id: string;
  name: string;
  category: string;
  currency: 'USD' | 'INR' | 'GBP' | 'EUR';
  defaults: GrowthCalculatorInputs;
  contextNote: string;
}

/**
 * Standard industry benchmark presets for rapid exploration
 */
export const INDUSTRY_GROWTH_PRESETS: IndustryBenchmarkPreset[] = [
  {
    id: 'b2b-saas-enterprise',
    name: 'B2B Enterprise SaaS',
    category: 'Cloud Software',
    currency: 'USD',
    defaults: {
      monthlyTraffic: 45000,
      conversionRate: 2.2,
      qualifiedLeadRate: 35,
      closeRate: 22,
      averageDealValue: 36000,
      monthlyMarketingSpend: 40000,
      customerLifespanMonths: 36,
      grossMarginPercent: 82,
      currency: 'USD',
    },
    contextNote: 'High ACV enterprise sales cycles ($36k+ ACV) with 3-year contract renewals and rigorous technical procurement.',
  },
  {
    id: 'fintech-payments',
    name: 'FinTech & High-Trust Banking',
    category: 'Financial Services',
    currency: 'USD',
    defaults: {
      monthlyTraffic: 80000,
      conversionRate: 3.1,
      qualifiedLeadRate: 28,
      closeRate: 18,
      averageDealValue: 28000,
      monthlyMarketingSpend: 65000,
      customerLifespanMonths: 48,
      grossMarginPercent: 75,
      currency: 'USD',
    },
    contextNote: 'Compliance-heavy conversion funnels where high trust and sub-second page performance heavily drive qualification.',
  },
  {
    id: 'healthtech-lifesciences',
    name: 'HealthTech & MedTech Systems',
    category: 'Healthcare Tech',
    currency: 'USD',
    defaults: {
      monthlyTraffic: 25000,
      conversionRate: 1.8,
      qualifiedLeadRate: 42,
      closeRate: 25,
      averageDealValue: 60000,
      monthlyMarketingSpend: 35000,
      customerLifespanMonths: 40,
      grossMarginPercent: 78,
      currency: 'USD',
    },
    contextNote: 'Institutional procurement with high average contract values and multi-stakeholder approval matrices.',
  },
  {
    id: 'india-saas-scaleup',
    name: 'India & Global Scaleup (INR)',
    category: 'Tech Scaleup',
    currency: 'INR',
    defaults: {
      monthlyTraffic: 60000,
      conversionRate: 2.5,
      qualifiedLeadRate: 32,
      closeRate: 20,
      averageDealValue: 1200000, // ₹12 Lakhs
      monthlyMarketingSpend: 1500000, // ₹15 Lakhs
      customerLifespanMonths: 30,
      grossMarginPercent: 80,
      currency: 'INR',
    },
    contextNote: 'Cross-border SaaS and enterprise services originating from Bangalore/NCR targeting global mid-market buyers.',
  },
  {
    id: 'high-ticket-ecommerce',
    name: 'High-Ticket B2B & D2C',
    category: 'Commerce',
    currency: 'USD',
    defaults: {
      monthlyTraffic: 150000,
      conversionRate: 1.6,
      qualifiedLeadRate: 60,
      closeRate: 30,
      averageDealValue: 4500,
      monthlyMarketingSpend: 50000,
      customerLifespanMonths: 18,
      grossMarginPercent: 65,
      currency: 'USD',
    },
    contextNote: 'High transaction value equipment, wholesale supplies, or luxury custom goods requiring assisted checkout.',
  },
];

/**
 * Baseline Assumptions applied to calculate the modeled growth scenario.
 * These reflect measured impact from technical performance engineering,
 * server-side CAPI attribution, and conversion funnel friction removal.
 */
export const DEFAULT_GROWTH_ASSUMPTIONS: GrowthModelAssumption[] = [
  {
    id: 'traffic-efficiency',
    category: 'Crawl & Traffic',
    title: 'Indexation & High-Intent Organic Reach',
    description: 'Technical SEO edge rendering, Core Web Vitals optimization, and LLM visibility improvements expanding qualified organic reach.',
    baselineMultiplier: 1.0,
    modeledMultiplier: 1.25, // +25% organic high-intent sessions
  },
  {
    id: 'conversion-friction',
    category: 'Conversion Optimization',
    title: 'Funnel Speed & Cognitive Friction Reduction',
    description: 'Sub-second page speeds, dynamic micro-conversion paths, and behavioral form design eliminating drop-off.',
    baselineMultiplier: 1.0,
    modeledMultiplier: 1.35, // +35% visitor-to-lead conversion rate
  },
  {
    id: 'lead-qualification',
    category: 'Sales Velocity',
    title: 'Attribution & Qualification Quality Filter',
    description: 'First-party data capture and enriched qualification pathways delivering higher intent prospects directly to sales.',
    baselineMultiplier: 1.0,
    modeledMultiplier: 1.15, // +15% qualification rate
  },
  {
    id: 'cac-attribution',
    category: 'Attribution & CAC',
    title: 'Server-Side CAPI & Waste Elimination',
    description: 'Pruning un-attributed ad spend, reducing negative keyword overlap, and optimizing bidding for high-LTV cohorts.',
    baselineMultiplier: 1.0,
    modeledMultiplier: 0.78, // -22% blended CAC reduction
  },
];

/**
 * Computes individual core metrics from standard growth inputs.
 * Pure mathematical evaluation with safe division guarding.
 */
export function calculateModelMetrics(inputs: GrowthCalculatorInputs): GrowthModelMetrics {
  const traffic = Math.max(0, inputs.monthlyTraffic);
  const convRateDecimal = Math.max(0, inputs.conversionRate) / 100;
  const qualRateDecimal = Math.max(0, inputs.qualifiedLeadRate) / 100;
  const closeRateDecimal = Math.max(0, inputs.closeRate) / 100;
  const dealValue = Math.max(0, inputs.averageDealValue);
  const spend = Math.max(0, inputs.monthlyMarketingSpend);
  const lifespanYears = Math.max(1, inputs.customerLifespanMonths) / 12;
  const marginDecimal = Math.max(0.1, inputs.grossMarginPercent) / 100;

  // Raw leads
  const rawLeadsMonthly = Math.round(traffic * convRateDecimal);
  const rawLeadsAnnual = rawLeadsMonthly * 12;

  // Qualified leads (MQL/SQL)
  const qualifiedLeadsMonthly = Math.round(rawLeadsMonthly * qualRateDecimal);
  const qualifiedLeadsAnnual = qualifiedLeadsMonthly * 12;

  // Pipeline Value (Qualified Leads * Deal Value)
  const pipelineValueMonthly = qualifiedLeadsMonthly * dealValue;
  const pipelineValueAnnual = pipelineValueMonthly * 12;

  // Closed Deals
  const closedCustomersMonthly = Math.max(0.1, qualifiedLeadsMonthly * closeRateDecimal);
  const closedCustomersAnnual = closedCustomersMonthly * 12;

  // Estimated Revenue
  const estimatedRevenueMonthly = closedCustomersMonthly * dealValue;
  const estimatedRevenueAnnual = estimatedRevenueMonthly * 12;

  // CAC calculation (Spend / Monthly Customers)
  const cac = closedCustomersMonthly > 0 ? Math.round(spend / closedCustomersMonthly) : 0;

  // LTV calculation = Deal Value * (Lifespan Years) * Gross Margin
  const ltv = Math.round(dealValue * lifespanYears * marginDecimal);

  // LTV:CAC Ratio
  const ltvToCacRatio = cac > 0 ? Number((ltv / cac).toFixed(2)) : 0;

  // Payback period in months = CAC / (Monthly Gross Profit per customer)
  const monthlyGrossProfitPerCustomer = (dealValue * marginDecimal) / Math.max(1, inputs.customerLifespanMonths);
  const cacPaybackMonths = monthlyGrossProfitPerCustomer > 0 
    ? Number((cac / monthlyGrossProfitPerCustomer).toFixed(1)) 
    : 0;

  // Return on Marketing Spend (Annual Revenue / Annual Spend)
  const annualSpend = spend * 12;
  const returnOnMarketingSpend = annualSpend > 0 
    ? Number((estimatedRevenueAnnual / annualSpend).toFixed(2)) 
    : 0;

  return {
    rawLeadsMonthly,
    rawLeadsAnnual,
    qualifiedLeadsMonthly,
    qualifiedLeadsAnnual,
    pipelineValueMonthly,
    pipelineValueAnnual,
    closedCustomersMonthly: Number(closedCustomersMonthly.toFixed(1)),
    closedCustomersAnnual: Math.round(closedCustomersAnnual),
    estimatedRevenueMonthly: Math.round(estimatedRevenueMonthly),
    estimatedRevenueAnnual: Math.round(estimatedRevenueAnnual),
    cac,
    ltv,
    ltvToCacRatio,
    cacPaybackMonths,
    returnOnMarketingSpend,
  };
}

/**
 * Computes a side-by-side growth comparison (Baseline Current State vs Optimized Model).
 * Applies verified engineering multipliers to calculate pipeline & revenue expansion.
 */
export function calculateGrowthComparison(
  inputs: GrowthCalculatorInputs,
  assumptions: GrowthModelAssumption[] = DEFAULT_GROWTH_ASSUMPTIONS
): GrowthComparisonResult {
  // 1. Calculate Baseline Current State
  const baseline = calculateModelMetrics(inputs);

  // 2. Find individual assumption multipliers
  const trafficMult = assumptions.find(a => a.id === 'traffic-efficiency')?.modeledMultiplier ?? 1.25;
  const convMult = assumptions.find(a => a.id === 'conversion-friction')?.modeledMultiplier ?? 1.35;
  const qualMult = assumptions.find(a => a.id === 'lead-qualification')?.modeledMultiplier ?? 1.15;
  const cacSpendEfficiency = assumptions.find(a => a.id === 'cac-attribution')?.modeledMultiplier ?? 0.78;

  // 3. Construct optimized inputs based on verified architectural interventions
  const optimizedInputs: GrowthCalculatorInputs = {
    ...inputs,
    monthlyTraffic: Math.round(inputs.monthlyTraffic * trafficMult),
    conversionRate: Number((inputs.conversionRate * convMult).toFixed(2)),
    qualifiedLeadRate: Math.min(90, Number((inputs.qualifiedLeadRate * qualMult).toFixed(1))),
    closeRate: Number((inputs.closeRate * 1.08).toFixed(1)), // conservative +8% close velocity from higher lead intent
    monthlyMarketingSpend: Math.round(inputs.monthlyMarketingSpend * cacSpendEfficiency),
  };

  // 4. Calculate Modeled Optimized State
  const modeled = calculateModelMetrics(optimizedInputs);

  // 5. Derive Deltas
  const additionalAnnualRevenue = Math.max(0, modeled.estimatedRevenueAnnual - baseline.estimatedRevenueAnnual);
  const additionalAnnualPipeline = Math.max(0, modeled.pipelineValueAnnual - baseline.pipelineValueAnnual);
  const additionalAnnualCustomers = Math.max(0, modeled.closedCustomersAnnual - baseline.closedCustomersAnnual);
  const cacReductionAmount = Math.max(0, baseline.cac - modeled.cac);
  const cacReductionPercent = baseline.cac > 0 
    ? Number(((cacReductionAmount / baseline.cac) * 100).toFixed(1)) 
    : 0;
  const ltvCacImprovement = Number((modeled.ltvToCacRatio - baseline.ltvToCacRatio).toFixed(2));
  const percentageRevenueLift = baseline.estimatedRevenueAnnual > 0 
    ? Number(((additionalAnnualRevenue / baseline.estimatedRevenueAnnual) * 100).toFixed(1)) 
    : 0;

  return {
    baseline,
    modeled,
    delta: {
      additionalAnnualRevenue,
      additionalAnnualPipeline,
      additionalAnnualCustomers,
      cacReductionAmount,
      cacReductionPercent,
      ltvCacImprovement,
      percentageRevenueLift,
    },
    assumptions,
  };
}

/**
 * Currency and number formatting utilities for international and Indian enterprise numbering systems
 */
export function formatCurrencyValue(amount: number, currency: 'USD' | 'INR' | 'GBP' | 'EUR'): string {
  if (currency === 'INR') {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';

  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(0)}k`;
  }
  return `${symbol}${amount.toLocaleString('en-US')}`;
}

export function formatCompactNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toLocaleString();
}
