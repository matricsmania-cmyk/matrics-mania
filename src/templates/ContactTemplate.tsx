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
  User,
  Terminal,
  Globe,
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

export const SERVICES_OPTIONS = [
  'Technical SEO & Organic Search',
  'Google / Bing Paid Search',
  'Meta & Instagram Ads',
  'LinkedIn Ads & B2B ABM',
  'Programmatic Display & CTV',
  'YouTube & Video Acquisition',
  'Content Authority & AI Search (LLM)',
  'Partner / Affiliate Networks',
  'Outbound Sales Pipeline',
  'Technical SEO & Crawl Engineering',
  'Performance Marketing & Paid Acquisition',
  'Conversion Rate Engineering & Speed',
  'AI Search & LLM Visibility Optimization',
  'CAC Escalation & Ad Fatigue',
  'Organic Stagnation & AI Overview Loss',
  'Conversion Funnel',
  'Custom Engineering',
  'Other',
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

  // Form Fields
  const [website, setWebsite] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Technical SEO & Organic Search',
    'Performance Marketing & Paid Acquisition',
  ]);
  const [note, setNote] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(true);

  // Fallbacks for telemetry rail
  const annualRevenue = '$10M - $50M ARR';
  const marketingBudget = '$30k - $100k / mo';
  const serviceInterest = selectedServices[0] || 'Technical SEO & Organic Search';

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<ContactSubmissionResult | null>(null);

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

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      name.trim().length > 0 &&
      workEmail.includes('@') &&
      workEmail.includes('.') &&
      phone.trim().length > 5 &&
      country.trim().length > 0 &&
      selectedServices.length > 0 &&
      ndaAccepted
    );
  }, [name, workEmail, phone, country, selectedServices, ndaAccepted]);

  // Final Submission Handler using abstracted Provider
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      const msg = 'Please provide your full name.';
      setFormError(msg);
      if (onShowToast) onShowToast('Your Name Required', msg, 'error');
      return;
    }
    if (!workEmail.trim() || !workEmail.includes('@') || !workEmail.includes('.')) {
      const msg = 'Please enter a valid corporate email address.';
      setFormError(msg);
      if (onShowToast) onShowToast('Valid Work Email Required', msg, 'error');
      return;
    }
    if (!phone.trim() || phone.trim().length < 5) {
      const msg = 'Please provide your direct contact number.';
      setFormError(msg);
      if (onShowToast) onShowToast('Phone Number Required', msg, 'error');
      return;
    }
    if (selectedServices.length === 0) {
      const msg = 'Please choose at least one service.';
      setFormError(msg);
      if (onShowToast) onShowToast('Select Services', msg, 'error');
      return;
    }
    if (!ndaAccepted) {
      const msg = 'Please acknowledge the confidentiality protocol.';
      setFormError(msg);
      if (onShowToast) onShowToast('Agreement Required', msg, 'error');
      return;
    }

    setIsSubmitting(true);

    const submissionPayload: ContactQualificationData = {
      name: name.trim(),
      email: workEmail.trim(),
      workEmail: workEmail.trim(),
      phone: phone.trim(),
      country: country.trim(),
      services: selectedServices,
      currentAcquisitionChannels: selectedServices,
      company: company.trim(),
      companyName: company.trim(),
      website: website.trim(),
      companyWebsite: website.trim(),
      industry: industry.trim(),
      note: note.trim(),
      additionalContext: note.trim(),
      approximateAnnualRevenue: '$10M - $50M ARR',
      approximateMarketingBudget: '$30k - $100k / mo',
      serviceInterest: selectedServices[0] || 'Technical SEO & Organic Search',
      primaryGrowthProblem: selectedServices.find((s) => s.includes('Loss') || s.includes('Fatigue') || s.includes('Funnel')) || 'Conversion Funnel',
      timeline: 'Immediate (< 30 Days)',
      source: 'Direct /contact/ Single Page Intake Form',
    };

    try {
      const providerService = getContactSubmissionProvider();
      const result = await providerService.submitQualification(submissionPayload);
      setSubmissionResult(result);
      setFormError(null);
      if (onShowToast) {
        onShowToast(
          'Diagnostic Intake Confirmed',
          `Reference ${result.referenceId} logged to Google Sheets successfully.`,
          'success'
        );
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Unable to record diagnostic intake in Google Sheets. Please retry.';
      setFormError(errorMessage);
      if (onShowToast) {
        onShowToast('Submission Error', errorMessage, 'error');
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
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 border-b border-[#1E293B] overflow-hidden bg-gradient-to-b from-[#0B132B]/60 via-[#070B14] to-[#070B14]">
        {/* Ambient Grid Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B15_1px,transparent_1px),linear-gradient(to_bottom,#1E293B15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Contact Us
          </h1>
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
                          setFormError(null);
                          setWebsite('');
                          setCompany('');
                          setName('');
                          setIndustry('');
                          setWorkEmail('');
                          setPhone('');
                          setCountry('India');
                          setNote('');
                          setSelectedServices(['Technical SEO & Organic Search', 'Performance Marketing & Paid Acquisition']);
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-[#94A3B8] hover:text-white cursor-pointer"
                      >
                        Submit Another Domain
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* =========================================================================
                      SINGLE-PAGE INTAKE FORM
                     ========================================================================= */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="pb-3 border-b border-[#1E293B]">
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Tell us a little about your business and marketing needs. We&apos;ll get back to you soon.
                      </p>
                    </div>

                    {/* Company Website URL (Optional) */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-website" className="block text-xs font-mono font-bold text-white">
                        Company Website URL <span className="text-[#64748B] font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                          <Globe className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="form-website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          onBlur={handleWebsiteBlur}
                          placeholder="company.com"
                          className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] font-mono outline-none transition-all focus:ring-1 focus:ring-[#2563EB]"
                        />
                      </div>
                      <p className="text-[11px] font-mono text-[#64748B]">
                        e.g. yourcompany.com or app.product.io
                      </p>
                    </div>

                    {/* 1. Company Name & 2. Your Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 1. Company Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-company" className="block text-xs font-mono font-bold text-white">
                          1. Company Name <span className="text-[#64748B] font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="form-company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Inc."
                            className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] outline-none transition-all focus:ring-1 focus:ring-[#2563EB]"
                          />
                        </div>
                      </div>

                      {/* 2. Your Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-name" className="block text-xs font-mono font-bold text-white">
                          2. Your Name <span className="text-[#3B82F6]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="form-name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] outline-none transition-all focus:ring-1 focus:ring-[#2563EB]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Industry (Optional) & 4. Corporate Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 3. Industry (Optional) */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-industry" className="block text-xs font-mono font-bold text-white">
                          3. Industry <span className="text-[#64748B] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="form-industry"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="e.g. SaaS, E-Commerce, FinTech..."
                          className="w-full px-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] outline-none transition-all focus:ring-1 focus:ring-[#2563EB]"
                        />
                      </div>

                      {/* 4. Corporate Work Email */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-email" className="block text-xs font-mono font-bold text-white">
                          4. Corporate Work Email <span className="text-[#3B82F6]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            id="form-email"
                            required
                            value={workEmail}
                            onChange={(e) => setWorkEmail(e.target.value)}
                            placeholder="jane@company.com"
                            className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] font-mono outline-none transition-all focus:ring-1 focus:ring-[#2563EB]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 5. Phone Number & 6. Country / Region */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 5. Phone Number */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-phone" className="block text-xs font-mono font-bold text-white">
                          5. Phone Number <span className="text-[#3B82F6]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            id="form-phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 83183 56338"
                            className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] font-mono outline-none transition-all focus:ring-1 focus:ring-[#2563EB]"
                          />
                        </div>
                      </div>

                      {/* 6. Country / Region */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-country" className="block text-xs font-mono font-bold text-white">
                          6. Country / Region <span className="text-[#3B82F6]">*</span>
                        </label>
                        <input
                          type="text"
                          id="form-country"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="e.g. India, United States, UK, UAE..."
                          className="w-full px-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] outline-none transition-all focus:ring-1 focus:ring-[#2563EB]"
                        />
                      </div>
                    </div>

                    {/* 7. Services */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono font-bold text-white">
                          7. Services <span className="text-[#3B82F6]">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-[#60A5FA]">
                          {selectedServices.length} Selected
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">
                        Select the growth channels and technical architectures required for your project:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-[340px] overflow-y-auto pr-1">
                        {SERVICES_OPTIONS.map((srv) => {
                          const isSelected = selectedServices.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => toggleService(srv)}
                              className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                                isSelected
                                  ? "bg-[#2563EB]/15 border-[#2563EB] text-white shadow-sm shadow-blue-500/10"
                                  : "bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#334155]"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-all ${
                                  isSelected
                                    ? "bg-[#2563EB] border-[#2563EB] text-white"
                                    : "border-[#334155] bg-[#0D1424]"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3" />}
                              </div>
                              <span className="font-medium leading-snug">{srv}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 8. Note (Optional) */}
                    <div className="space-y-1.5 pt-2">
                      <label htmlFor="form-note" className="block text-xs font-mono font-bold text-white">
                        8. Note <span className="text-[#64748B] font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="form-note"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Provide any additional context regarding your current technical bottlenecks, stack, monthly acquisition goals, or timeline..."
                        className="w-full px-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-xl text-sm text-white placeholder-[#475569] outline-none transition-all focus:ring-1 focus:ring-[#2563EB] resize-y"
                      />
                    </div>

                    {/* Confidentiality Protocol Acknowledgment */}
                    <div className="pt-2 border-t border-[#1E293B]">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={ndaAccepted}
                          onChange={(e) => setNdaAccepted(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-[#1E293B] bg-[#070B14] text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                        />
                        <span className="text-xs text-[#94A3B8] group-hover:text-white transition-colors leading-relaxed">
                          I acknowledge that telemetry data shared will be handled under MatricsMania's standard Enterprise Mutual Confidentiality Protocol.
                        </span>
                      </label>
                    </div>

                    {/* Honeypot field for bot spam prevention */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Inline Form Error Notification */}
                    {formError && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !isFormValid}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] disabled:opacity-50 text-white text-xs font-mono font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-blue-500/25 cursor-pointer transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <Zap className="w-4 h-4 animate-spin" />
                            <span>Transmitting Diagnostic Specification...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Diagnostic Intake</span>
                          </>
                        )}
                      </button>
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

                  <div className="border-t border-[#1E293B] pt-3 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
                      <span className="font-mono text-[#60A5FA] font-medium">Direct Phone Lines:</span>
                    </div>
                    <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1.5 font-mono text-xs pl-6">
                      <a
                        href="tel:+918318356338"
                        className="text-white hover:text-[#60A5FA] transition-colors font-medium inline-flex items-center gap-1.5"
                      >
                        +91 83183 56338
                      </a>
                      <span className="text-[#334155]">•</span>
                      <a
                        href="tel:+919196068917"
                        className="text-white hover:text-[#60A5FA] transition-colors font-medium inline-flex items-center gap-1.5"
                      >
                        +91 91960 68917
                      </a>
                      <span className="text-[#334155]">•</span>
                      <a
                        href="tel:+917905991037"
                        className="text-white hover:text-[#60A5FA] transition-colors font-medium inline-flex items-center gap-1.5"
                      >
                        +91 79059 91037
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 border-t border-[#1E293B] pt-3">
                    <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <a
                      href={`mailto:${contact?.headquarters?.email || 'info@matricsmania.com'}`}
                      className="text-white font-mono hover:text-[#60A5FA] transition-colors"
                    >
                      {contact?.headquarters?.email || 'info@matricsmania.com'}
                    </a>
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

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
