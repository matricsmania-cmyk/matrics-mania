'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactInformation } from '../models';
import {
  getContactSubmissionProvider,
  ContactQualificationData,
  ContactSubmissionResult,
} from '../services/contactSubmissionService';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building2,
  Globe2,
  DollarSign,
  TrendingUp,
  Target,
  Clock,
  Send,
  Lock,
  Zap,
  HelpCircle,
  FileText,
  ChevronRight,
  Check,
  Layers,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  Sliders,
  AlertCircle,
  UserCheck,
} from 'lucide-react';

export interface ContactTemplateProps {
  contactInfo?: ContactInformation;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

const INDUSTRY_OPTIONS = [
  'B2B SaaS & Cloud Software',
  'FinTech, Payments & Banking',
  'HealthTech & Life Sciences',
  'High-Growth E-Commerce & D2C',
  'AI, DeepTech & Machine Learning',
  'Enterprise Marketplaces',
  'EdTech & Professional Learning',
  'Industrial & Supply Chain Tech',
  'Professional & Legal Services',
  'Other Enterprise Sector',
];

const COUNTRY_OPTIONS = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'IN', name: 'India' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'DE', name: 'Germany' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'OTHER', name: 'Other Global Region' },
];

const REVENUE_OPTIONS = [
  { value: '< $2M ARR', label: '< $2M ARR', desc: 'Emerging Scaleup' },
  { value: '$2M - $10M ARR', label: '$2M – $10M ARR', desc: 'Series A / B High-Growth' },
  { value: '$10M - $50M ARR', label: '$10M – $50M ARR', desc: 'Growth Stage Enterprise' },
  { value: '$50M - $250M ARR', label: '$50M – $250M ARR', desc: 'Upper Mid-Market' },
  { value: '$250M+ ARR', label: '$250M+ ARR', desc: 'Global Enterprise' },
];

const BUDGET_OPTIONS = [
  { value: '< $10k / mo', label: '< $10k / mo', desc: 'Exploratory' },
  { value: '$10k - $30k / mo', label: '$10k – $30k / mo', desc: 'Growth Accelerator Track' },
  { value: '$30k - $100k / mo', label: '$30k – $100k / mo', desc: 'Enterprise Priority SLA' },
  { value: '$100k+ / mo', label: '$100k+ / mo', desc: 'Dedicated Strategic Architecture' },
];

const CHANNEL_OPTIONS = [
  'Technical SEO & Organic Search',
  'Google / Bing Paid Search',
  'Meta & Instagram Ads',
  'LinkedIn Ads & B2B ABM',
  'Programmatic Display & CTV',
  'YouTube & Video Acquisition',
  'Content Authority & AI Search (LLM)',
  'Partner / Affiliate Networks',
  'Outbound Sales Pipeline',
];

const SERVICE_OPTIONS = [
  {
    id: 'seo',
    title: 'Technical SEO & Crawl Engineering',
    desc: 'Edge-rendered indexing, log auditing, schema graphs & Core Web Vitals.',
  },
  {
    id: 'paid',
    title: 'Performance Marketing & Paid Acquisition',
    desc: 'Server-side CAPI attribution, high-intent Google/LinkedIn ad scaling.',
  },
  {
    id: 'cro',
    title: 'Conversion Rate Engineering & Speed',
    desc: 'Full-funnel behavioral testing, checkout optimization & sub-second latency.',
  },
  {
    id: 'ai-search',
    title: 'AI Search & LLM Visibility Optimization',
    desc: 'Reverse-engineering Perplexity, ChatGPT, and Google Gemini citations.',
  },
  {
    id: 'attribution',
    title: 'Enterprise Attribution & Data Engineering',
    desc: 'Multi-touch pipeline modeling, BigQuery warehousing & CDP pipelines.',
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Growth Architecture Retainer',
    desc: 'Comprehensive multi-disciplinary team driving ARR expansion.',
  },
];

const GROWTH_PROBLEMS = [
  {
    id: 'cac-escalation',
    title: 'CAC Escalation & Ad Fatigue',
    desc: 'Rising customer acquisition cost and diminishing ROAS across primary channels.',
  },
  {
    id: 'seo-stagnation',
    title: 'Organic Stagnation & AI Overview Loss',
    desc: 'Declining keyword rankings, indexing blockers, or traffic loss to AI search snippets.',
  },
  {
    id: 'conversion-leakage',
    title: 'Conversion Funnel Leakage',
    desc: 'High landing page bounce rates, low MQL/SQL conversion, and speed bottlenecks.',
  },
  {
    id: 'attribution-blackbox',
    title: 'Attribution Black Box',
    desc: 'Inability to connect ad spend to downstream closed-won enterprise revenue.',
  },
  {
    id: 'scale-bottleneck',
    title: 'Enterprise Pipeline Expansion Stall',
    desc: 'Need to penetrate Fortune 500 / Mid-market accounts with high-value ABM.',
  },
  {
    id: 'other',
    title: 'Custom Engineering / Infrastructure Challenge',
    desc: 'Multi-region expansion, internationalization, or legacy replatforming.',
  },
];

const TIMELINE_OPTIONS = [
  { value: 'Immediate (< 30 Days)', label: 'Immediate (< 30 Days)', tag: 'Urgent' },
  { value: 'Next Quarter (30 - 60 Days)', label: 'Next Quarter (30–60 Days)', tag: 'Scheduled' },
  { value: '3 - 6 Months', label: '3–6 Months', tag: 'Strategic' },
  { value: 'Exploratory / RFI', label: 'Exploratory / Budget Planning', tag: 'Planning' },
];

import { useRouter } from 'next/navigation';

export const ContactTemplate: React.FC<ContactTemplateProps> = ({
  contactInfo: propContactInfo,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
  onShowToast,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const contact = propContactInfo || provider.getContactInfo();

  // Form Step State (1: Company, 2: Economics, 3: Scope & Problem, 4: Point of Contact)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [website, setWebsite] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('United States');
  const [industry, setIndustry] = useState('B2B SaaS & Cloud Software');

  const [annualRevenue, setAnnualRevenue] = useState('$10M - $50M ARR');
  const [marketingBudget, setMarketingBudget] = useState('$30k - $100k / mo');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'Technical SEO & Organic Search',
    'Google / Bing Paid Search',
  ]);

  const [serviceInterest, setServiceInterest] = useState('Technical SEO & Crawl Engineering');
  const [primaryGrowthProblem, setPrimaryGrowthProblem] = useState(
    'Organic Stagnation & AI Overview Loss'
  );
  const [timeline, setTimeline] = useState('Immediate (< 30 Days)');
  const [additionalContext, setAdditionalContext] = useState('');

  // Conditional Sub-telemetry
  const [crawlScale, setCrawlScale] = useState('10k - 100k URLs');
  const [monthlyTraffic, setMonthlyTraffic] = useState('50k - 250k Sessions/mo');
  const [targetRoasGoal, setTargetRoasGoal] = useState('3.5x - 5.0x ROAS');

  // Contact Info
  const [name, setName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(true);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ContactSubmissionResult | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auto-extract company name from domain if empty
  const handleWebsiteBlur = () => {
    if (website && !company) {
      try {
        let clean = website.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0];
        const parts = clean.split('.');
        if (parts.length > 1 && parts[0].length > 1) {
          const autoName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
          setCompany(autoName);
        }
      } catch {
        // ignore
      }
    }
  };

  // Toggle Channel Selection
  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter((c) => c !== channel));
      }
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  // Real-time Qualification Assessment
  const qualificationScore = useMemo(() => {
    let score = 50;
    if (annualRevenue.includes('$10M') || annualRevenue.includes('$50M') || annualRevenue.includes('$250M')) {
      score += 25;
    } else if (annualRevenue.includes('$2M')) {
      score += 15;
    }

    if (marketingBudget.includes('$100k') || marketingBudget.includes('$30k')) {
      score += 25;
    } else if (marketingBudget.includes('$10k')) {
      score += 15;
    }

    return Math.min(100, score);
  }, [annualRevenue, marketingBudget]);

  const qualificationTier = useMemo(() => {
    if (marketingBudget.includes('$100k') || marketingBudget.includes('$30k') || annualRevenue.includes('$50M')) {
      return {
        label: 'Priority Enterprise Tier',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        sla: '2-Hour Principal Architect SLA',
        advisoryTeam: 'Senior Growth & Systems Architecture Core',
      };
    }
    if (marketingBudget.includes('$10k') || annualRevenue.includes('$2M')) {
      return {
        label: 'Strategic Growth Accelerator',
        badgeColor: 'bg-[#2563EB]/15 text-[#60A5FA] border-[#2563EB]/40',
        sla: 'Under 4 Business Hours SLA',
        advisoryTeam: 'Growth Engineering Discipline Lead',
      };
    }
    return {
      label: 'Advisory Review Track',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      sla: 'Same-Day Scope Evaluation',
      advisoryTeam: 'Technical Evaluation Team',
    };
  }, [marketingBudget, annualRevenue]);

  // Step Validation Checkers
  const isStep1Valid = website.trim().length > 3 && company.trim().length > 1;
  const isStep2Valid = annualRevenue.length > 0 && marketingBudget.length > 0 && selectedChannels.length > 0;
  const isStep3Valid = serviceInterest.length > 0 && primaryGrowthProblem.length > 0 && timeline.length > 0;
  const isStep4Valid = name.trim().length > 1 && workEmail.includes('@') && workEmail.includes('.');

  // Navigation between steps
  const handleNextStep = () => {
    if (currentStep === 1 && !isStep1Valid) {
      if (onShowToast) {
        onShowToast('Company & Website Required', 'Please provide a valid company website and organization name.', 'error');
      }
      return;
    }
    if (currentStep === 2 && !isStep2Valid) {
      if (onShowToast) {
        onShowToast('Economics Required', 'Please choose your revenue, growth budget, and at least one channel.', 'error');
      }
      return;
    }
    if (currentStep === 3 && !isStep3Valid) {
      if (onShowToast) {
        onShowToast('Scope Required', 'Please specify your primary service interest and growth bottleneck.', 'error');
      }
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      // Smooth scroll to top of form
      const el = document.getElementById('qualification-form-header');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      const el = document.getElementById('qualification-form-header');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Final Submission Handler using abstracted Provider
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep4Valid) {
      if (onShowToast) {
        onShowToast('Work Email Required', 'Please enter your corporate name and work email address.', 'error');
      }
      return;
    }

    setIsSubmitting(true);

    const submissionPayload: ContactQualificationData = {
      name,
      workEmail,
      role: role || undefined,
      phone: phone || undefined,
      company,
      website: website.startsWith('http') ? website : `https://${website}`,
      country,
      industry,
      approximateAnnualRevenue: annualRevenue,
      approximateMarketingBudget: marketingBudget,
      currentAcquisitionChannels: selectedChannels,
      serviceInterest,
      primaryGrowthProblem,
      timeline,
      additionalContext: additionalContext.trim() || undefined,
      specificFocusDetails: {
        crawlScalePages: serviceInterest.includes('SEO') || serviceInterest.includes('AI') ? crawlScale : undefined,
        estimatedMonthlyTraffic: serviceInterest.includes('CRO') ? monthlyTraffic : undefined,
        primaryAdSpendPlatforms: serviceInterest.includes('Paid') ? [targetRoasGoal] : undefined,
      },
      source: 'Direct /contact/ Intake Form',
    };

    try {
      const providerService = getContactSubmissionProvider();
      const result = await providerService.submitQualification(submissionPayload);
      setSubmissionResult(result);
      if (onShowToast) {
        onShowToast(
          'Diagnostic Intake Confirmed',
          `Reference ${result.referenceId} dispatched to ${result.qualificationTier === 'enterprise_priority' ? 'Principal Architect Core' : 'Growth Discipline Team'}.`,
          'success'
        );
      }
    } catch (err) {
      if (onShowToast) {
        onShowToast('Transmission Error', 'Unable to record diagnostic intake. Please retry.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        pageType="contact"
        canonicalUrl="https://matricsmania.com/contact/"
        title="Enterprise Diagnostic & Account Qualification | MatricsMania"
        description="Initiate an architectural growth diagnostic. MatricsMania qualifies high-ticket enterprise accounts for direct Principal Architect engagements."
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 border-b border-[#1E293B] overflow-hidden bg-gradient-to-b from-[#0B132B]/60 via-[#070B14] to-[#070B14]">
        {/* Ambient Grid Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B15_1px,transparent_1px),linear-gradient(to_bottom,#1E293B15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1424] border border-[#2563EB]/40 text-xs font-mono font-semibold tracking-wider text-[#60A5FA] uppercase shadow-lg shadow-blue-500/10">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Architectural Diagnostic &amp; Qualification</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Qualify for a MatricsMania <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#93C5FD] to-[#3B82F6]">
                Growth Engineering Retainer
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl">
              We partner with a disciplined cohort of enterprise brands and scaleups. Complete our structured qualification intake to receive a direct diagnostic evaluation from our Principal Growth Architects with zero sales scripts.
            </p>

            {/* Value Guarantees Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1E293B]/80 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#0D1424]/80 border border-[#1E293B] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[#CBD5E1]">Mutual NDA Protected</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1424]/80 border border-[#1E293B] flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span className="text-[#CBD5E1]">2-Hour Review SLA</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1424]/80 border border-[#1E293B] flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span className="text-[#CBD5E1]">Direct Architect Intake</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1424]/80 border border-[#1E293B] flex items-center gap-2.5">
                <Target className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[#CBD5E1]">Zero Sales Pitching</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Qualification & Layout Section */}
      <section className="py-12 md:py-16 bg-[#050811] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Col: Qualification Form (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div
                id="qualification-form-header"
                className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-8 shadow-2xl relative"
              >
                {/* Form Progress Bar */}
                {!submissionResult && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#60A5FA] font-bold uppercase tracking-wider flex items-center gap-2">
                        <span>Step {currentStep} of 4</span>
                        <span className="text-[#64748B]">•</span>
                        <span className="text-white">
                          {currentStep === 1 && 'Domain & Organization Profile'}
                          {currentStep === 2 && 'Growth Economics & Current Channels'}
                          {currentStep === 3 && 'Architecture & Growth Bottlenecks'}
                          {currentStep === 4 && 'Point of Contact & Verification'}
                        </span>
                      </span>
                      <span className="text-[#94A3B8] font-bold">
                        {currentStep === 1 && '25%'}
                        {currentStep === 2 && '50%'}
                        {currentStep === 3 && '75%'}
                        {currentStep === 4 && '100%'}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-[#070B14] rounded-full overflow-hidden border border-[#1E293B]">
                      <div
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all duration-300 rounded-full"
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                      />
                    </div>

                    {/* Step Navigator Chips */}
                    <div className="grid grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                      {[
                        { step: 1, label: '1. Organization' },
                        { step: 2, label: '2. Economics' },
                        { step: 3, label: '3. Technical Scope' },
                        { step: 4, label: '4. Contact' },
                      ].map((s) => (
                        <button
                          key={s.step}
                          type="button"
                          onClick={() => {
                            if (s.step < currentStep) setCurrentStep(s.step);
                          }}
                          disabled={s.step > currentStep}
                          className={`py-2 px-2.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                            currentStep === s.step
                              ? 'bg-[#2563EB]/20 border border-[#2563EB] text-white font-bold'
                              : s.step < currentStep
                              ? 'bg-[#070B14] border border-[#1E293B] text-emerald-400 hover:text-white'
                              : 'bg-[#070B14]/40 border border-[#1E293B]/40 text-[#64748B] cursor-not-allowed'
                          }`}
                        >
                          {s.step < currentStep ? `✓ ${s.label.split(' ')[1]}` : s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* =========================================================================
                    SUBMISSION SUCCESS CONFIRMATION VIEW
                   ========================================================================= */}
                {submissionResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 sm:p-10 rounded-2xl bg-[#070B14] border border-emerald-500/30 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2 max-w-xl mx-auto">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                        <span>Intake Verified &amp; Routed</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Diagnostic Specification Logged
                      </h2>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        Your technical parameters have been routed to our Senior Growth Architects. We have dispatched automated telemetry checks against <span className="text-white font-mono">{submissionResult.data.website}</span>.
                      </p>
                    </div>

                    {/* Receipt Card */}
                    <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-left space-y-4 max-w-lg mx-auto font-mono text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                        <span className="text-[#64748B]">Reference Token:</span>
                        <span className="font-bold text-[#60A5FA] bg-[#070B14] px-2.5 py-1 rounded border border-[#1E293B]">
                          {submissionResult.referenceId}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                        <span className="text-[#64748B]">Account Qualification:</span>
                        <span className="font-bold text-emerald-400 uppercase">
                          {submissionResult.qualificationTier.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                        <span className="text-[#64748B]">Response SLA:</span>
                        <span className="text-white font-bold">{submissionResult.estimatedResponseTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Assigned Dispatch Node:</span>
                        <span className="text-[#CBD5E1]">Bangalore Core Lab &amp; Global Lead</span>
                      </div>
                    </div>

                    {/* Next Steps Timeline */}
                    <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-left space-y-4 max-w-lg mx-auto">
                      <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                        Next Protocol Steps
                      </div>
                      <ol className="space-y-3 text-xs text-[#94A3B8]">
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#2563EB]/20 border border-[#2563EB] text-[#60A5FA] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5">
                            1
                          </span>
                          <div>
                            <span className="font-bold text-white">Domain &amp; Crawl Telemetry Ingestion:</span> Initial server header checks, indexation volume, and ad footprint analysis.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#2563EB]/20 border border-[#2563EB] text-[#60A5FA] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5">
                            2
                          </span>
                          <div>
                            <span className="font-bold text-white">Architectural Brief Dispatch:</span> A structured summary with specific bottleneck hypotheses delivered to <span className="text-white">{submissionResult.data.workEmail}</span>.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#2563EB]/20 border border-[#2563EB] text-[#60A5FA] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5">
                            3
                          </span>
                          <div>
                            <span className="font-bold text-white">Executive Technical Walkthrough:</span> Optional 30-minute diagnostic session with the Principal Architect.
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenBooking({
                            domain: submissionResult.data.website,
                            monthlyBudget: submissionResult.data.approximateMarketingBudget,
                            industry: submissionResult.data.industry,
                            referenceId: submissionResult.referenceId,
                          })
                        }
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Priority Strategy Call Now</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmissionResult(null);
                          setCurrentStep(1);
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-[#94A3B8] hover:text-white cursor-pointer"
                      >
                        Submit Another Domain
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* =========================================================================
                      MULTI-STEP QUALIFICATION FORM
                     ========================================================================= */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {/* STEP 1: ORGANIZATION & DOMAIN */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-5"
                        >
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <Building2 className="w-5 h-5 text-[#60A5FA]" />
                              Organization &amp; Domain Telemetry
                            </h3>
                            <p className="text-xs text-[#94A3B8]">
                              Provide your production domain so our architects can inspect live crawl headers and attribution setups.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label htmlFor="form-website" className="block text-xs font-mono text-[#94A3B8]">
                                Company Website URL <span className="text-rose-400">*</span>
                              </label>
                              <div className="relative">
                                <Globe2 className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                                <input
                                  id="form-website"
                                  type="text"
                                  required
                                  value={website}
                                  onChange={(e) => setWebsite(e.target.value)}
                                  onBlur={handleWebsiteBlur}
                                  placeholder="company.com"
                                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] placeholder-[#475569]"
                                />
                              </div>
                              <p className="text-[11px] text-[#64748B]">e.g. yourcompany.com or app.product.io</p>
                            </div>

                            <div className="space-y-1.5">
                              <label htmlFor="form-company" className="block text-xs font-mono text-[#94A3B8]">
                                Organization Name <span className="text-rose-400">*</span>
                              </label>
                              <input
                                id="form-company"
                                type="text"
                                required
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="e.g. Acme Corp"
                                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] placeholder-[#475569]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label htmlFor="form-industry" className="block text-xs font-mono text-[#94A3B8]">
                                Industry Vertical <span className="text-rose-400">*</span>
                              </label>
                              <select
                                id="form-industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
                              >
                                {INDUSTRY_OPTIONS.map((ind) => (
                                  <option key={ind} value={ind} className="bg-[#070B14]">
                                    {ind}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label htmlFor="form-country" className="block text-xs font-mono text-[#94A3B8]">
                                Headquarters Country / Region <span className="text-rose-400">*</span>
                              </label>
                              <select
                                id="form-country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
                              >
                                {COUNTRY_OPTIONS.map((c) => (
                                  <option key={c.name} value={c.name} className="bg-[#070B14]">
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: GROWTH ECONOMICS & CHANNELS */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-[#60A5FA]" />
                              Growth Economics &amp; Scale
                            </h3>
                            <p className="text-xs text-[#94A3B8]">
                              MatricsMania architectures are tailored to businesses with established product-market traction.
                            </p>
                          </div>

                          {/* Annual Revenue */}
                          <div className="space-y-2">
                            <label className="block text-xs font-mono text-[#94A3B8]">
                              Approximate Annual Revenue (ARR / Turnover) <span className="text-rose-400">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              {REVENUE_OPTIONS.map((rev) => (
                                <button
                                  key={rev.value}
                                  type="button"
                                  onClick={() => setAnnualRevenue(rev.value)}
                                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                    annualRevenue === rev.value
                                      ? 'bg-[#2563EB]/15 border-[#2563EB] text-white shadow-lg shadow-blue-500/10'
                                      : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
                                  }`}
                                >
                                  <div className="font-bold text-xs text-white">{rev.label}</div>
                                  <div className="text-[11px] text-[#64748B] mt-0.5">{rev.desc}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Monthly Marketing Budget */}
                          <div className="space-y-2">
                            <label className="block text-xs font-mono text-[#94A3B8]">
                              Planned Monthly Growth / Marketing Budget <span className="text-rose-400">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {BUDGET_OPTIONS.map((bg) => (
                                <button
                                  key={bg.value}
                                  type="button"
                                  onClick={() => setMarketingBudget(bg.value)}
                                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                                    marketingBudget === bg.value
                                      ? 'bg-[#2563EB]/15 border-[#2563EB] text-white shadow-lg shadow-blue-500/10'
                                      : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
                                  }`}
                                >
                                  <div>
                                    <div className="font-bold text-xs text-white">{bg.label}</div>
                                    <div className="text-[11px] text-[#64748B]">{bg.desc}</div>
                                  </div>
                                  {marketingBudget === bg.value && (
                                    <Check className="w-4 h-4 text-[#60A5FA] shrink-0" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Current Acquisition Channels Multi-Select */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-xs font-mono text-[#94A3B8]">
                                Active Acquisition Channels (Select all that apply) <span className="text-rose-400">*</span>
                              </label>
                              <span className="text-[11px] font-mono text-[#60A5FA]">
                                {selectedChannels.length} selected
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {CHANNEL_OPTIONS.map((chan) => {
                                const isSelected = selectedChannels.includes(chan);
                                return (
                                  <button
                                    key={chan}
                                    type="button"
                                    onClick={() => toggleChannel(chan)}
                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                                      isSelected
                                        ? 'bg-[#2563EB]/20 border-[#2563EB] text-white font-semibold'
                                        : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#334155]'
                                    }`}
                                  >
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isSelected ? 'bg-[#60A5FA]' : 'bg-[#334155]'
                                      }`}
                                    />
                                    <span>{chan}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: TECHNICAL SCOPE & BOTTLENECKS */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <Target className="w-5 h-5 text-[#60A5FA]" />
                              Engineering Scope &amp; Bottlenecks
                            </h3>
                            <p className="text-xs text-[#94A3B8]">
                              Specify the exact discipline and primary growth friction point you want resolved.
                            </p>
                          </div>

                          {/* Primary Service Interest */}
                          <div className="space-y-2">
                            <label className="block text-xs font-mono text-[#94A3B8]">
                              Primary Service Interest <span className="text-rose-400">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {SERVICE_OPTIONS.map((srv) => (
                                <button
                                  key={srv.id}
                                  type="button"
                                  onClick={() => setServiceInterest(srv.title)}
                                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                    serviceInterest === srv.title
                                      ? 'bg-[#2563EB]/15 border-[#2563EB] text-white shadow-lg shadow-blue-500/10'
                                      : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
                                  }`}
                                >
                                  <div className="font-bold text-xs text-white">{srv.title}</div>
                                  <div className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                                    {srv.desc}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* CONDITIONAL SUB-QUESTIONS BASED ON SERVICE INTEREST */}
                          {(serviceInterest.includes('SEO') || serviceInterest.includes('AI Search')) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="p-4 rounded-xl bg-[#070B14] border border-[#2563EB]/30 space-y-2"
                            >
                              <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
                                <Sliders className="w-3.5 h-3.5" />
                                <span>Crawl Architecture Scope (Indexable URLs)</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {['< 10k URLs', '10k - 100k URLs', '100k - 1M URLs', '1M+ Programmatic'].map(
                                  (opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setCrawlScale(opt)}
                                      className={`py-2 px-3 rounded-lg text-xs font-mono text-center border cursor-pointer ${
                                        crawlScale === opt
                                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                                          : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}

                          {serviceInterest.includes('CRO') && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="p-4 rounded-xl bg-[#070B14] border border-[#2563EB]/30 space-y-2"
                            >
                              <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
                                <BarChart3 className="w-3.5 h-3.5" />
                                <span>Current Monthly Traffic Volume</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {['< 20k Sessions/mo', '20k - 100k Sessions', '100k - 500k Sessions', '500k+ High-Scale'].map(
                                  (opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setMonthlyTraffic(opt)}
                                      className={`py-2 px-3 rounded-lg text-xs font-mono text-center border cursor-pointer ${
                                        monthlyTraffic === opt
                                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                                          : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}

                          {serviceInterest.includes('Performance') && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="p-4 rounded-xl bg-[#070B14] border border-[#2563EB]/30 space-y-2"
                            >
                              <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>Primary Paid Growth Target</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {['Lower Blended CAC', 'Scale Spend 2x-5x', 'High-LTV ABM Pipeline', '3.5x+ ROAS Floor'].map(
                                  (opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setTargetRoasGoal(opt)}
                                      className={`py-2 px-3 rounded-lg text-xs font-mono text-center border cursor-pointer ${
                                        targetRoasGoal === opt
                                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                                          : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}

                          {/* Primary Growth Problem */}
                          <div className="space-y-2">
                            <label className="block text-xs font-mono text-[#94A3B8]">
                              Primary Growth Bottleneck / Challenge <span className="text-rose-400">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {GROWTH_PROBLEMS.map((prob) => (
                                <button
                                  key={prob.id}
                                  type="button"
                                  onClick={() => setPrimaryGrowthProblem(prob.title)}
                                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                    primaryGrowthProblem === prob.title
                                      ? 'bg-[#2563EB]/15 border-[#2563EB] text-white shadow-lg shadow-blue-500/10'
                                      : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
                                  }`}
                                >
                                  <div className="font-bold text-xs text-white">{prob.title}</div>
                                  <div className="text-[11px] text-[#64748B] mt-0.5">{prob.desc}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Timeline */}
                          <div className="space-y-2">
                            <label className="block text-xs font-mono text-[#94A3B8]">
                              Target Deployment Timeline <span className="text-rose-400">*</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {TIMELINE_OPTIONS.map((tm) => (
                                <button
                                  key={tm.value}
                                  type="button"
                                  onClick={() => setTimeline(tm.value)}
                                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                    timeline === tm.value
                                      ? 'bg-[#2563EB]/20 border-[#2563EB] text-white font-bold'
                                      : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:text-white'
                                  }`}
                                >
                                  <div className="text-xs">{tm.label}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Additional Context */}
                          <div className="space-y-1.5">
                            <label htmlFor="form-context" className="block text-xs font-mono text-[#94A3B8]">
                              Additional Architectural Context / Stack Details <span className="text-[#64748B]">(Optional)</span>
                            </label>
                            <textarea
                              id="form-context"
                              rows={3}
                              value={additionalContext}
                              onChange={(e) => setAdditionalContext(e.target.value)}
                              placeholder="e.g. Current stack: Next.js + Headless CMS. Recent 30% organic drop after core algorithm update. Primary KPI: +50 enterprise demo bookings / month."
                              className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] placeholder-[#475569]"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: CONTACT VERIFICATION */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <UserCheck className="w-5 h-5 text-[#60A5FA]" />
                              Lead Point of Contact &amp; Routing
                            </h3>
                            <p className="text-xs text-[#94A3B8]">
                              We do not send generic marketing blasts. Your work email is only used for the Principal Architect diagnostic brief.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label htmlFor="form-name" className="block text-xs font-mono text-[#94A3B8]">
                                Full Name <span className="text-rose-400">*</span>
                              </label>
                              <input
                                id="form-name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Alexander Vance"
                                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label htmlFor="form-email" className="block text-xs font-mono text-[#94A3B8]">
                                Corporate Work Email <span className="text-rose-400">*</span>
                              </label>
                              <input
                                id="form-email"
                                type="email"
                                required
                                value={workEmail}
                                onChange={(e) => setWorkEmail(e.target.value)}
                                placeholder="alex@company.com"
                                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label htmlFor="form-role" className="block text-xs font-mono text-[#94A3B8]">
                                Job Title / Role <span className="text-[#64748B]">(Optional)</span>
                              </label>
                              <input
                                id="form-role"
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="e.g. VP Growth / CMO / CTO / CEO"
                                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label htmlFor="form-phone" className="block text-xs font-mono text-[#94A3B8]">
                                Direct Phone <span className="text-[#64748B]">(Optional for SMS SLA alert)</span>
                              </label>
                              <input
                                id="form-phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              />
                            </div>
                          </div>

                          {/* Intake Summary Review Box */}
                          <div className="p-5 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-[#60A5FA] font-bold uppercase">Specification Summary</span>
                              <span className={`px-2 py-0.5 rounded border text-[10px] ${qualificationTier.badgeColor}`}>
                                {qualificationTier.label}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-[#94A3B8]">
                              <div>
                                <span className="text-[#64748B]">Domain:</span> <span className="text-white">{website || 'Not specified'}</span>
                              </div>
                              <div>
                                <span className="text-[#64748B]">Budget:</span> <span className="text-white">{marketingBudget}</span>
                              </div>
                              <div>
                                <span className="text-[#64748B]">Timeline:</span> <span className="text-white">{timeline.split(' ')[0]}</span>
                              </div>
                            </div>
                          </div>

                          {/* Mutual NDA & Privacy Guarantee */}
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#070B14] border border-[#1E293B]">
                            <input
                              id="form-nda"
                              type="checkbox"
                              checked={ndaAccepted}
                              onChange={(e) => setNdaAccepted(e.target.checked)}
                              className="mt-0.5 w-4 h-4 rounded text-[#2563EB] bg-[#0D1424] border-[#1E293B] focus:ring-[#2563EB] cursor-pointer"
                            />
                            <label htmlFor="form-nda" className="text-xs text-[#94A3B8] leading-relaxed cursor-pointer">
                              I acknowledge that telemetry data shared will be handled under MatricsMania&apos;s standard{' '}
                              <a href="/privacy/" onClick={(e) => { e.preventDefault(); onNavigate('/privacy/'); }} className="text-[#60A5FA] hover:underline">
                                Enterprise Mutual Confidentiality Protocol
                              </a>
                              .
                            </label>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-[#1E293B]">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-5 py-3 rounded-xl bg-[#070B14] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-[#94A3B8] hover:text-white flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Previous Step</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
                        >
                          <span>Proceed to Step {currentStep + 1}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting || !isStep4Valid}
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] disabled:opacity-50 text-white text-xs font-mono font-bold flex items-center gap-2.5 shadow-xl shadow-blue-500/25 cursor-pointer transition-all"
                        >
                          {isSubmitting ? (
                            <>
                              <Zap className="w-4 h-4 animate-spin" />
                              <span>Transmitting Intake Parameters...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Diagnostic Specification</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>

              {/* Direct Alternative: Pre-qualified Instant Strategy Call */}
              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase flex items-center justify-center sm:justify-start gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Need Immediate Strategic Discussion?</span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    Executives managing $10M+ ARR accounts can bypass standard intake for an immediate 30-min strategy session.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onOpenBooking({
                      interest: 'Direct Executive Strategy Call',
                      domain: website || undefined,
                      monthlyBudget: marketingBudget,
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-[#070B14] hover:bg-[#1E293B] border border-[#2563EB]/40 text-xs font-mono text-[#60A5FA] hover:text-white shrink-0 cursor-pointer transition-all flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Open Direct Calendar</span>
                </button>
              </div>
            </div>

            {/* Right Col: Telemetry Rail & Location Info (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Dynamic Live Telemetry Card */}
              <div className="p-6 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                  <span className="text-[10px] font-mono uppercase text-[#60A5FA] tracking-wider font-bold">
                    Intake Qualification Telemetry
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${qualificationTier.badgeColor}`}>
                    {qualificationTier.label}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Target SLA:</span>
                    <span className="font-mono text-emerald-400 font-bold">{qualificationTier.sla}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Primary Discipline:</span>
                    <span className="text-white font-medium text-right line-clamp-1 max-w-[170px]">
                      {serviceInterest}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Annual Scale:</span>
                    <span className="text-[#CBD5E1] font-mono">{annualRevenue}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Monthly Budget:</span>
                    <span className="text-[#CBD5E1] font-mono">{marketingBudget}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Review Core:</span>
                    <span className="text-[#93C5FD] text-[11px] text-right">{qualificationTier.advisoryTeam}</span>
                  </div>
                </div>

                {/* Score Indicator */}
                <div className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#64748B]">Enterprise Fit Index</span>
                    <span className="text-white font-bold">{qualificationScore}% Fit</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0D1424] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${qualificationScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Headquarters Node Card */}
              <div className="p-6 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#60A5FA] tracking-wider">
                      Primary Engineering Node
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">Bangalore Headquarters Lab</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#94A3B8]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">{contact.headquarters.address.line1}</div>
                      <div>
                        {contact.headquarters.address.city}, {contact.headquarters.address.state}{' '}
                        {contact.headquarters.address.postalCode}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 border-t border-[#1E293B] pt-3">
                    <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span className="text-white font-mono">{contact.headquarters.phone}</span>
                  </div>

                  <div className="flex items-center gap-2.5 border-t border-[#1E293B] pt-3">
                    <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span className="text-white font-mono">{contact.headquarters.email}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E293B]">
                  <a
                    href="/locations/bangalore/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/locations/bangalore/');
                    }}
                    className="text-xs font-mono text-[#60A5FA] hover:text-white flex items-center justify-between group no-underline"
                  >
                    <span>View Bangalore Lab Infrastructure</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Qualification Standards FAQ */}
              <div className="p-6 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <div className="text-xs font-mono uppercase text-[#60A5FA] font-bold tracking-wider">
                  Qualification Criteria
                </div>
                <div className="space-y-3 text-xs">
                  {[
                    {
                      q: 'Why does MatricsMania qualify accounts?',
                      a: 'Our Principal Architects personally audit live crawl logs, server response latencies, and conversion pipelines. We cap active concurrent client engagements to maintain deep architectural execution.',
                    },
                    {
                      q: 'What if we are an early-stage startup?',
                      a: 'If you are pre-$2M ARR, we provide our open technical research papers and diagnostic audit tools in our Insights hub.',
                    },
                    {
                      q: 'Is our telemetry protected under NDA?',
                      a: 'Yes. All domain logs, analytics permissions, and architecture disclosures are covered by our standard mutual non-disclosure agreement.',
                    },
                  ].map((faq, idx) => (
                    <div key={idx} className="border-b border-[#1E293B] pb-3 last:border-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left font-medium text-white hover:text-[#60A5FA] flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <span className="text-[#64748B] font-mono text-xs">{activeFaq === idx ? '−' : '+'}</span>
                      </button>
                      {activeFaq === idx && (
                        <p className="text-[11px] text-[#94A3B8] leading-relaxed mt-2 pl-1 border-l-2 border-[#2563EB]">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
