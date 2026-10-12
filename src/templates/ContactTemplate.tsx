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
import { MinimalCustomSelect } from '../components/MinimalCustomSelect';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building2,
  Briefcase,
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
  ChevronDown,
  Check,
  Layers,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  Sliders,
  AlertCircle,
  RefreshCw,
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

export const CATEGORIZED_INDUSTRIES = [
  {
    category: 'Software, SaaS & AI',
    options: [
      'B2B SaaS & Cloud Enterprise Software',
      'Artificial Intelligence, Machine Learning & LLMs',
      'Developer Tools, APIs & Infrastructure',
      'Cybersecurity & Identity Management',
      'Data Analytics, BI & Data Warehousing',
      'IT Services & Managed Cloud Consulting',
      'Web3, Blockchain & Crypto Infrastructure',
    ],
  },
  {
    category: 'Finance, Banking & Fintech',
    options: [
      'Fintech, Payments & Neobanking',
      'Investment Banking, VC & Private Equity',
      'InsurTech & Risk Management',
      'Wealth Management & Personal Finance',
      'DeFi & Digital Asset Services',
    ],
  },
  {
    category: 'E-Commerce, Retail & D2C',
    options: [
      'D2C Brand & High-Growth E-Commerce',
      'Retail Tech & Omnichannel Commerce',
      'Enterprise Marketplaces & B2B Platforms',
      'Consumer Goods & FMCG',
      'Fashion, Apparel & Luxury Retail',
    ],
  },
  {
    category: 'Healthcare, Biotech & Life Sciences',
    options: [
      'HealthTech & Digital Health Platforms',
      'Biotechnology & Pharmaceutical Manufacturing',
      'Medical Devices & Diagnostics',
      'Telemedicine & Clinical Operations',
    ],
  },
  {
    category: 'Industrial, Logistics & Supply Chain',
    options: [
      'Supply Chain Tech & Logistics Automation',
      'Manufacturing & Industrial IoT',
      'Automotive, EV & Clean Mobility',
      'Aerospace, Defense & DeepTech',
      'Construction & Building Infrastructure',
    ],
  },
  {
    category: 'Professional, Legal & Corporate Services',
    options: [
      'Management & Strategy Consulting',
      'Legal Services & LegalTech',
      'Accounting, Tax & Financial Advisory',
      'Human Resources & RecruiterTech',
      'Marketing, Advertising & PR Agencies',
    ],
  },
  {
    category: 'Real Estate, PropTech & Hospitality',
    options: [
      'PropTech & Commercial Real Estate',
      'Hospitality, Travel & Leisure',
      'Residential Real Estate & Property Management',
    ],
  },
  {
    category: 'Media, Entertainment & Gaming',
    options: [
      'AdTech, MarTech & Digital Media',
      'Gaming, Esports & Interactive Media',
      'Streaming, Content Creation & Publishing',
    ],
  },
  {
    category: 'Education, EdTech & Non-Profit',
    options: [
      'EdTech & Online Learning Platforms',
      'Higher Education & Research Institutes',
      'Non-Profit & Social Impact Organizations',
    ],
  },
  {
    category: 'Energy, CleanTech & Public Sector',
    options: [
      'CleanTech, Solar & Renewable Energy',
      'Government, Public Policy & Defense',
      'Agriculture & AgTech Systems',
    ],
  },
  {
    category: 'Other Sector',
    options: ['Other Industry / Custom Sector'],
  },
];

export const CATEGORIZED_COUNTRIES = [
  {
    region: 'Primary Markets',
    options: [
      'India',
      'United States',
      'United Kingdom',
      'United Arab Emirates',
      'Canada',
      'Australia',
      'Germany',
      'Singapore',
    ],
  },
  {
    region: 'Asia-Pacific',
    options: [
      'India',
      'Singapore',
      'Japan',
      'Australia',
      'New Zealand',
      'Hong Kong',
      'South Korea',
      'Malaysia',
      'Indonesia',
      'Thailand',
      'Vietnam',
      'Philippines',
    ],
  },
  {
    region: 'North America',
    options: ['United States', 'Canada', 'Mexico'],
  },
  {
    region: 'Europe',
    options: [
      'United Kingdom',
      'Germany',
      'France',
      'Netherlands',
      'Switzerland',
      'Sweden',
      'Ireland',
      'Spain',
      'Italy',
      'Belgium',
      'Denmark',
      'Norway',
      'Finland',
      'Poland',
      'Austria',
    ],
  },
  {
    region: 'Middle East & Africa',
    options: [
      'United Arab Emirates',
      'Saudi Arabia',
      'Qatar',
      'Israel',
      'Egypt',
      'South Africa',
      'Nigeria',
      'Kenya',
    ],
  },
  {
    region: 'Latin America',
    options: ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru'],
  },
  {
    region: 'Other Global Region',
    options: ['Other Country / Global Region'],
  },
];

export interface CountryDialInfo {
  code: string;
  dialCode: string;
  placeholder: string;
  flag: string;
}

export const COUNTRY_DIAL_MAP: Record<string, CountryDialInfo> = {
  'India': { code: 'IN', dialCode: '+91', placeholder: '98765 43210', flag: '🇮🇳' },
  'Brazil': { code: 'BR', dialCode: '+55', placeholder: '11 99999-9999', flag: '🇧🇷' },
  'United States': { code: 'US', dialCode: '+1', placeholder: '(555) 012-3456', flag: '🇺🇸' },
  'United Kingdom': { code: 'GB', dialCode: '+44', placeholder: '7700 900000', flag: '🇬🇧' },
  'United Arab Emirates': { code: 'AE', dialCode: '+971', placeholder: '50 123 4567', flag: '🇦🇪' },
  'Canada': { code: 'CA', dialCode: '+1', placeholder: '(555) 012-3456', flag: '🇨🇦' },
  'Australia': { code: 'AU', dialCode: '+61', placeholder: '400 123 456', flag: '🇦🇺' },
  'Germany': { code: 'DE', dialCode: '+49', placeholder: '151 23456789', flag: '🇩🇪' },
  'Singapore': { code: 'SG', dialCode: '+65', placeholder: '8123 4567', flag: '🇸🇬' },
  'Japan': { code: 'JP', dialCode: '+81', placeholder: '90 1234 5678', flag: '🇯🇵' },
  'New Zealand': { code: 'NZ', dialCode: '+64', placeholder: '21 123 4567', flag: '🇳🇿' },
  'Hong Kong': { code: 'HK', dialCode: '+852', placeholder: '9123 4567', flag: '🇭🇰' },
  'South Korea': { code: 'KR', dialCode: '+82', placeholder: '10 1234 5678', flag: '🇰🇷' },
  'Malaysia': { code: 'MY', dialCode: '+60', placeholder: '12-345 6789', flag: '🇲🇾' },
  'Indonesia': { code: 'ID', dialCode: '+62', placeholder: '812 3456 7890', flag: '🇮🇩' },
  'Thailand': { code: 'TH', dialCode: '+66', placeholder: '81 234 5678', flag: '🇹🇭' },
  'Vietnam': { code: 'VN', dialCode: '+84', placeholder: '90 123 4567', flag: '🇻🇳' },
  'Philippines': { code: 'PH', dialCode: '+63', placeholder: '917 123 4567', flag: '🇵🇭' },
  'Mexico': { code: 'MX', dialCode: '+52', placeholder: '55 1234 5678', flag: '🇲🇽' },
  'France': { code: 'FR', dialCode: '+33', placeholder: '6 12 34 56 78', flag: '🇫🇷' },
  'Netherlands': { code: 'NL', dialCode: '+31', placeholder: '6 12345678', flag: '🇳🇱' },
  'Switzerland': { code: 'CH', dialCode: '+41', placeholder: '79 123 45 67', flag: '🇨🇭' },
  'Sweden': { code: 'SE', dialCode: '+46', placeholder: '70 123 45 67', flag: '🇸🇪' },
  'Ireland': { code: 'IE', dialCode: '+353', placeholder: '87 123 4567', flag: '🇮🇪' },
  'Spain': { code: 'ES', dialCode: '+34', placeholder: '612 34 56 78', flag: '🇪🇸' },
  'Italy': { code: 'IT', dialCode: '+39', placeholder: '312 345 6789', flag: '🇮🇹' },
  'Belgium': { code: 'BE', dialCode: '+32', placeholder: '470 12 34 56', flag: '🇧🇪' },
  'Denmark': { code: 'DK', dialCode: '+45', placeholder: '20 12 34 56', flag: '🇩🇰' },
  'Norway': { code: 'NO', dialCode: '+47', placeholder: '412 34 567', flag: '🇳🇴' },
  'Finland': { code: 'FI', dialCode: '+358', placeholder: '40 123 4567', flag: '🇫🇮' },
  'Poland': { code: 'PL', dialCode: '+48', placeholder: '512 345 678', flag: '🇵🇱' },
  'Austria': { code: 'AT', dialCode: '+43', placeholder: '664 1234567', flag: '🇦🇹' },
  'Saudi Arabia': { code: 'SA', dialCode: '+966', placeholder: '50 123 4567', flag: '🇸🇦' },
  'Qatar': { code: 'QA', dialCode: '+974', placeholder: '5012 3456', flag: '🇶🇦' },
  'Israel': { code: 'IL', dialCode: '+972', placeholder: '50 123 4567', flag: '🇮🇱' },
  'Egypt': { code: 'EG', dialCode: '+20', placeholder: '100 123 4567', flag: '🇪🇬' },
  'South Africa': { code: 'ZA', dialCode: '+27', placeholder: '82 123 4567', flag: '🇿🇦' },
  'Nigeria': { code: 'NG', dialCode: '+234', placeholder: '802 123 4567', flag: '🇳🇬' },
  'Kenya': { code: 'KE', dialCode: '+254', placeholder: '712 345678', flag: '🇰🇪' },
  'Argentina': { code: 'AR', dialCode: '+54', placeholder: '9 11 1234-5678', flag: '🇦🇷' },
  'Chile': { code: 'CL', dialCode: '+56', placeholder: '9 1234 5678', flag: '🇨🇱' },
  'Colombia': { code: 'CO', dialCode: '+57', placeholder: '300 123 4567', flag: '🇨🇴' },
  'Peru': { code: 'PE', dialCode: '+51', placeholder: '912 345 678', flag: '🇵🇪' },
};

export function getCountryDialInfo(countryName: string): CountryDialInfo {
  if (!countryName) {
    return { code: 'IN', dialCode: '+91', placeholder: '+91 98765 43210', flag: '🇮🇳' };
  }
  const match = Object.keys(COUNTRY_DIAL_MAP).find(
    (k) => k.toLowerCase() === countryName.trim().toLowerCase()
  );
  if (match) {
    return COUNTRY_DIAL_MAP[match];
  }
  return { code: 'INTL', dialCode: '+', placeholder: '+1 555 012 3456', flag: '🌐' };
}

const INDUSTRY_OPTIONS = CATEGORIZED_INDUSTRIES.flatMap((c) => c.options);

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

  // Dynamic Country Dial Code & Flag information
  const currentDialInfo = useMemo(() => {
    return getCountryDialInfo(country);
  }, [country]);

  // Strip any leading +dialCode from phone when country changes so input value stays clean digits
  useEffect(() => {
    if (phone.startsWith('+')) {
      const localDigits = phone.replace(/^\+\d{1,4}\s?/, '');
      setPhone(localDigits);
    }
  }, [country]);

  // State & Validation for Email / Phone popup
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const isValidEmail = (eVal: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eVal.trim());
  };

  const isValidPhone = (pVal: string) => {
    if (!pVal.trim()) return false;
    const fullPhone = pVal.trim().startsWith('+')
      ? pVal.trim()
      : `${currentDialInfo.dialCode} ${pVal.trim()}`;
    const digits = fullPhone.replace(/\D/g, '');
    const validChars = /^[\d\s\+\-\(\)]{5,25}$/.test(fullPhone);
    return digits.length >= 7 && digits.length <= 15 && validChars;
  };

  const showEmailError = emailTouched && workEmail.trim().length > 0 && !isValidEmail(workEmail);
  const showPhoneError = phoneTouched && phone.trim().length > 0 && !isValidPhone(phone);
  const annualRevenue = '$10M - $50M ARR';
  const marketingBudget = '$30k - $100k / mo';
  const serviceInterest = selectedServices[0] || 'Technical SEO & Organic Search';

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<ContactSubmissionResult | null>(null);
  const [retryStatus, setRetryStatus] = useState<{
    isRetrying: boolean;
    attempt: number;
    maxRetries: number;
  } | null>(null);

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

  // Final Submission Handler using abstracted Provider with graceful transient retries
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setRetryStatus(null);

    if (!name.trim()) {
      const msg = 'Please provide your full name.';
      setFormError(msg);
      if (onShowToast) onShowToast('Your Name Required', msg, 'error');
      return;
    }
    if (!isValidEmail(workEmail)) {
      setEmailTouched(true);
      const msg = 'Please enter a valid corporate email address.';
      setFormError(msg);
      if (onShowToast) onShowToast('Valid Work Email Required', msg, 'error');
      return;
    }
    if (!isValidPhone(phone)) {
      setPhoneTouched(true);
      const msg = 'Please enter a valid phone number.';
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

    const formattedPhone = phone.trim().startsWith('+')
      ? phone.trim()
      : `${currentDialInfo.dialCode} ${phone.trim()}`;

    const submissionPayload: ContactQualificationData = {
      name: name.trim(),
      email: workEmail.trim(),
      workEmail: workEmail.trim(),
      phone: formattedPhone,
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
      const result = await providerService.submitQualification(submissionPayload, {
        maxRetries: 2,
        initialDelayMs: 600,
        backoffFactor: 1.5,
        onRetry: (attempt, maxRetries) => {
          setRetryStatus({ isRetrying: true, attempt, maxRetries });
          if (onShowToast) {
            onShowToast(
              'Connectivity Blip Detected',
              `Re-establishing server connection (attempt ${attempt} of ${maxRetries})...`,
              'info'
            );
          }
        },
      });
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
      setRetryStatus(null);
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
                    className="p-8 sm:p-12 rounded-2xl bg-[#070B14] border border-emerald-500/30 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-3 max-w-xl mx-auto">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                        <span>Submission Successful</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Thank You for Reaching Out
                      </h2>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        We have received your message. Our team will review your business needs and get back to you shortly.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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
                          setEmailTouched(false);
                          setPhoneTouched(false);
                        }}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold cursor-pointer transition-all shadow-lg shadow-blue-500/20"
                      >
                        Submit Another Inquiry
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
                      <MinimalCustomSelect
                        id="form-industry"
                        label="3. Industry"
                        optional
                        value={industry}
                        onChange={(val) => setIndustry(val)}
                        placeholder="Select Your Industry / Sector..."
                        icon={<Briefcase className="w-4 h-4" />}
                        categories={CATEGORIZED_INDUSTRIES}
                      />

                      {/* 4. Corporate Work Email */}
                      <div className="space-y-1.5 relative">
                        <div className="flex items-center justify-between">
                          <label htmlFor="form-email" className="block text-xs font-mono font-bold text-white">
                            4. Corporate Work Email <span className="text-[#3B82F6]">*</span>
                          </label>
                          <AnimatePresence>
                            {showEmailError && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 2 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 2 }}
                                transition={{ duration: 0.12 }}
                                className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/60 text-red-400 text-[11px] font-mono font-medium flex items-center gap-1 shadow-sm"
                              >
                                <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                                <span>Input is wrong</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="relative">
                          <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${showEmailError ? 'text-red-400' : 'text-[#64748B]'}`}>
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            id="form-email"
                            required
                            value={workEmail}
                            onChange={(e) => {
                              setWorkEmail(e.target.value);
                              setEmailTouched(true);
                            }}
                            onBlur={() => setEmailTouched(true)}
                            placeholder="jane@company.com"
                            className={`w-full pl-10 pr-4 py-3 bg-[#070B14] border rounded-xl text-sm text-white placeholder-[#475569] font-mono outline-none transition-all ${
                              showEmailError
                                ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/50'
                                : 'border-[#1E293B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 5. Phone Number & 6. Country / Region */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 5. Phone Number */}
                      <div className="space-y-1.5 relative">
                        <div className="flex items-center justify-between">
                          <label htmlFor="form-phone" className="block text-xs font-mono font-bold text-white">
                            5. Phone Number <span className="text-[#3B82F6]">*</span>
                          </label>
                          <AnimatePresence>
                            {showPhoneError && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 2 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 0 }}
                                transition={{ duration: 0.12 }}
                                className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/60 text-red-400 text-[11px] font-mono font-medium flex items-center gap-1 shadow-sm"
                              >
                                <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                                <span>Input is wrong</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="relative flex items-center">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none z-10">
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#131D33] border text-xs font-mono font-bold transition-colors ${
                              showPhoneError ? 'border-red-500/60 text-red-400' : 'border-[#1E293B] text-[#60A5FA]'
                            }`}>
                              <span className="text-sm leading-none">{currentDialInfo.flag}</span>
                              <span>{currentDialInfo.dialCode}</span>
                            </div>
                          </div>
                          <input
                            type="tel"
                            id="form-phone"
                            required
                            value={phone}
                            onChange={(e) => {
                              let raw = e.target.value;
                              if (raw.startsWith(currentDialInfo.dialCode)) {
                                raw = raw.slice(currentDialInfo.dialCode.length).trimStart();
                              } else if (raw.startsWith('+')) {
                                raw = raw.replace(/^\+\d{1,4}\s?/, '');
                              }
                              setPhone(raw);
                              setPhoneTouched(true);
                            }}
                            onBlur={() => setPhoneTouched(true)}
                            placeholder={currentDialInfo.placeholder}
                            className={`w-full pl-[98px] pr-4 py-3 bg-[#070B14] border rounded-xl text-sm text-white placeholder-[#475569] font-mono outline-none transition-all ${
                              showPhoneError
                                ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/50'
                                : 'border-[#1E293B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
                            }`}
                          />
                        </div>
                      </div>

                      {/* 6. Country / Region */}
                      <MinimalCustomSelect
                        id="form-country"
                        label="6. Country / Region"
                        required
                        value={country}
                        onChange={(val) => setCountry(val)}
                        placeholder="Select Country / Region..."
                        icon={<Globe className="w-4 h-4" />}
                        categories={CATEGORIZED_COUNTRIES}
                      />
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

                    {/* Automatic Retry / Connectivity Status Notification */}
                    {retryStatus?.isRetrying && (
                      <div className="p-3.5 rounded-xl bg-[#0D1424] border border-[#60A5FA]/40 text-xs font-mono text-[#60A5FA] flex items-center gap-2.5 shadow-lg animate-pulse">
                        <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-[#60A5FA]" />
                        <span>
                          Network blip detected. Automatically retrying submission (attempt {retryStatus.attempt} of {retryStatus.maxRetries})...
                        </span>
                      </div>
                    )}

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
                        {retryStatus?.isRetrying ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Retrying ({retryStatus.attempt}/{retryStatus.maxRetries})...</span>
                          </>
                        ) : isSubmitting ? (
                          <>
                            <Zap className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
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
