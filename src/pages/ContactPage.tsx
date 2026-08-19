import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Building2,
  Globe2,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onShowToast }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');

  const [industry, setIndustry] = useState('Technology & SaaS');
  const [companySize, setCompanySize] = useState('11-50');
  const [primaryMarket, setPrimaryMarket] = useState('India');

  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'Technical SEO & Architecture',
    'AI Search & GEO',
  ]);

  // Industry-specific conditional fields
  const [realEstateType, setRealEstateType] = useState('Luxury Residential');
  const [averageTicket, setAverageTicket] = useState('₹1.5 Cr - ₹5 Cr');
  const [saasModel, setSaasModel] = useState('Enterprise Sales ($20k+ ACV)');

  const [growthGoal, setGrowthGoal] = useState('');
  const [currentBlocker, setCurrentBlocker] = useState('');
  const [alreadyTried, setAlreadyTried] = useState('');

  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [budgetRange, setBudgetRange] = useState('₹1L – ₹3L / month');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Schema structured data for ContactPage
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': 'https://matricsmania.com/contact/#webpage',
          url: 'https://matricsmania.com/contact',
          name: 'Contact MatricsMania Digital Systems',
          description:
            'Start a high-intent conversation regarding search visibility, performance acquisition, web systems, and revenue attribution.',
          isPartOf: {
            '@id': 'https://matricsmania.com/#website',
          },
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://matricsmania.com/#localbusiness',
          name: 'MatricsMania',
          telephone: '+91-80-4567-8900',
          email: 'hello@matricsmania.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Indiranagar 100ft Road, 4th Block',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            postalCode: '560038',
            addressCountry: 'IN',
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+91-80-4567-8900',
              contactType: 'customer service',
              email: 'hello@matricsmania.com',
              areaServed: ['IN', 'US', 'GB', 'CA'],
              availableLanguage: ['English', 'Hindi', 'Kannada'],
            },
          ],
        },
      ],
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schemaData);
    scriptTag.id = 'contact-schema-data';
    document.head.appendChild(scriptTag);

    return () => {
      const existing = document.getElementById('contact-schema-data');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !workEmail.trim() || !company.trim()) {
      onShowToast(
        'Required details missing',
        'Please provide your full name, work email, and company name.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate submission to backend CRM
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onShowToast(
        'Enquiry Received',
        `Thank you ${fullName}. We will review your website and requirements and respond with the appropriate next step.`,
        'success'
      );
    }, 1200);
  };

  const serviceOptions = [
    'Technical SEO & Architecture',
    'AI Search & GEO (Generative Engines)',
    'Google Ads & Paid Search',
    'Meta & LinkedIn Paid Media',
    'Website Design & Engineering',
    'Conversion Rate Optimization (CRO)',
    'Content Strategy & Topic Mapping',
    'CRM & Marketing Automation',
    'Full Integrated Growth System',
  ];

  const inrBudgetOptions = [
    'Under ₹50K / mo',
    '₹50K – ₹1L / mo',
    '₹1L – ₹3L / mo',
    '₹3L – ₹5L / mo',
    '₹5L+ / mo',
    'Not sure yet',
  ];

  const usdBudgetOptions = [
    'Under $1K / mo',
    '$1K – $3K / mo',
    '$3K – $5K / mo',
    '$5K – $10K / mo',
    '$10K+ / mo',
    'Not sure yet',
  ];

  const faqs = [
    {
      q: 'What happens after I submit the form?',
      a: 'We review your business, crawl your existing website architecture, and analyze your competitive space. If there is a clear strategic fit, we schedule an Initial Growth Discussion to evaluate commercial constraints.',
    },
    {
      q: 'Do you work with businesses outside Bangalore?',
      a: 'Yes. While our core team is anchored in Bangalore, we actively collaborate with high-growth companies across Mumbai, Delhi NCR, Hyderabad, Chennai, and Pune through an asynchronous, sprint-based operating cadence.',
    },
    {
      q: 'Do you work with international clients?',
      a: 'Yes. We work digitally with B2B tech and service businesses in the United States, United Kingdom, Canada, and the Middle East, with coordinated meeting windows for your time zone.',
    },
    {
      q: 'What types of projects do you take on?',
      a: 'We take on high-intent engagements where acquisition, search visibility, conversion efficiency, or revenue measurement represents a material business constraint. We do not do low-impact tactical vanity tasks.',
    },
    {
      q: 'Can you work with an existing in-house marketing team?',
      a: 'Frequently. We can either operate as your dedicated growth engineering unit or partner as an embedded specialized team working alongside your internal marketing leads, designers, and software engineers.',
    },
    {
      q: 'Do you offer one-off projects or ongoing engagements?',
      a: 'We offer both: sprint-based architecture projects (e.g. 500-point Technical SEO migrations, Website redesigns, Conversion funnels) as well as continuous multi-quarter growth retainers focused on pipeline generation.',
    },
    {
      q: 'How do you determine whether we’re a good fit?',
      a: 'We look for businesses with clear commercial offerings, verified unit economics or product-market validation, and leadership that values evidence-based iteration over subjective marketing guesswork.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      {/* 01. CONTACT HERO */}
      <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#1E293B] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              CONTACT MATRICSMANIA
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              LET’S TALK
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#E2E8F0]">
              Tell us what you’re trying to achieve.
            </p>

            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
              Whether you’re looking to improve search visibility, generate demand, rebuild your digital experience or solve a specific acquisition problem, give us the context.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 02. DIRECT CONTACT OPTIONS & QUALIFICATION FORM */}
      <section className="py-14 border-b border-[#1E293B]" id="enquiry-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Channels & What Happens Next */}
          <div className="lg:col-span-4 space-y-8">
            <ScrollReveal className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
                  // Direct Channels
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Contact Options</h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Choose the communication channel that best fits your enquiry.
                </p>
              </div>

              <div className="space-y-3">
                {/* Email Option */}
                <a
                  href="mailto:hello@matricsmania.com"
                  className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#131D33] border border-[#1E293B] flex items-center justify-center text-[#60A5FA]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#64748B]">EMAIL</div>
                        <div className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                          hello@matricsmania.com
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] transition-colors" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-2 pl-12">
                    For detailed project briefs and RFP documents.
                  </p>
                </a>

                {/* Call Option */}
                <a
                  href="tel:+918045678900"
                  className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#131D33] border border-[#1E293B] flex items-center justify-center text-[#60A5FA]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#64748B]">PHONE</div>
                        <div className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                          +91 (80) 4567-8900
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] transition-colors" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-2 pl-12">
                    Direct conversations during business hours (9am - 7pm IST).
                  </p>
                </a>

                {/* WhatsApp Option */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#10B981]/50 transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#131D33] border border-[#1E293B] flex items-center justify-center text-[#10B981]">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#64748B]">WHATSAPP</div>
                        <div className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors">
                          +91 98765 43210
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#10B981] transition-colors" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-2 pl-12">
                    For quick scoping questions and preliminary queries.
                  </p>
                </a>
              </div>

              {/* 04. WHAT HAPPENS NEXT (Clear Roadmap) */}
              <div className="p-6 rounded-2xl bg-[#0B101E] border border-[#1E293B] space-y-4">
                <div className="text-xs font-mono font-bold text-[#60A5FA] tracking-wider uppercase">
                  // What happens next
                </div>
                <h4 className="text-sm font-bold text-white">After you enquire:</h4>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] space-y-1">
                    <div className="text-[#60A5FA] font-bold">01 // REVIEW</div>
                    <div className="text-[#94A3B8]">
                      We review your business model, crawl your website, and assess constraints.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] space-y-1">
                    <div className="text-[#60A5FA] font-bold">02 // QUALIFY</div>
                    <div className="text-[#94A3B8]">
                      We determine whether MatricsMania has the capabilities to solve this problem.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] space-y-1">
                    <div className="text-[#60A5FA] font-bold">03 // DISCUSS</div>
                    <div className="text-[#94A3B8]">
                      We hold a focused 30-min discussion on objectives, economics, and hurdles.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] space-y-1">
                    <div className="text-[#60A5FA] font-bold">04 // RECOMMEND</div>
                    <div className="text-[#94A3B8]">
                      If appropriate, we outline the exact architecture and next logical step.
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#64748B] italic">
                  No automated spam. No generic marketing sales pitches.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: High-Ticket Consultation Enquiry Form */}
          <div className="lg:col-span-8">
            <ScrollReveal className="p-6 sm:p-9 rounded-2xl bg-[#0D1424] border border-[#1E293B] shadow-2xl">
              {submitted ? (
                <div className="py-12 px-4 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-[#10B981]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Enquiry Received</h3>
                    <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                      Thank you <strong className="text-white">{fullName}</strong>. We have logged your enquiry for <strong className="text-white">{company}</strong> ({website || 'domain'}).
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#070B14] border border-[#1E293B] max-w-lg mx-auto text-left text-xs font-mono text-[#94A3B8] space-y-2">
                    <div className="text-[#60A5FA] font-bold">// NEXT ACTION</div>
                    <p>
                      Our principal growth team is reviewing your requirements. We will review the information and respond directly to <strong className="text-white">{workEmail}</strong> with the appropriate next step.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setGrowthGoal('');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#131D33] hover:bg-[#1C2A4A] border border-[#1E293B] text-xs font-mono text-white transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="border-b border-[#1E293B] pb-4">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
                      // Project Assessment
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      Initial Growth Enquiry
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Provide as much context as you have. Meaningful answers help us evaluate mutual fit faster.
                    </p>
                  </div>

                  {/* STEP 1: ABOUT YOU */}
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-[#131D33] flex items-center justify-center text-[10px]">1</span>
                      About You & Your Business
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          Work Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="rajesh@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          Company Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Technologies"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          Website URL <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          Phone / WhatsApp <span className="text-[#64748B] text-[11px]">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 2: BUSINESS CONTEXT */}
                  <div className="space-y-4 pt-4 border-t border-[#1E293B]">
                    <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-[#131D33] flex items-center justify-center text-[10px]">2</span>
                      Your Market & Scale
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">Industry</label>
                        <select
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs text-white focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="Technology & SaaS">Technology & SaaS</option>
                          <option value="Real Estate">Real Estate & Housing</option>
                          <option value="Luxury & High-Ticket">Luxury & High-Ticket</option>
                          <option value="Healthcare">Healthcare & Life Sciences</option>
                          <option value="Professional Services">Professional Services</option>
                          <option value="Ecommerce">High-Growth Ecommerce</option>
                          <option value="Education">Education & Edtech</option>
                          <option value="Other">Other Category</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">Company Size</label>
                        <select
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs text-white focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="1-10">1 – 10 Team Members</option>
                          <option value="11-50">11 – 50 Team Members</option>
                          <option value="51-200">51 – 200 Team Members</option>
                          <option value="201-1000">201 – 1,000 Team Members</option>
                          <option value="1000+">1,000+ Enterprise</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">Primary Target Market</label>
                        <select
                          value={primaryMarket}
                          onChange={(e) => setPrimaryMarket(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs text-white focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="India">India (Domestic Focus)</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="UAE & Middle East">UAE & Middle East</option>
                          <option value="Multi-Region Global">Multi-Region Global</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: WHAT DO YOU NEED? */}
                  <div className="space-y-3 pt-4 border-t border-[#1E293B]">
                    <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-[#131D33] flex items-center justify-center text-[10px]">3</span>
                        What Capabilities Are Needed?
                      </div>
                      <span className="text-[10px] text-[#64748B] lowercase">Select all applicable</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {serviceOptions.map((opt) => {
                        const isSelected = selectedNeeds.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => toggleNeed(opt)}
                            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                              isSelected
                                ? 'bg-[#2563EB]/20 border border-[#2563EB] text-white'
                                : 'bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:border-[#334155]'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 4: CURRENT SITUATION & CONDITIONAL INPUTS */}
                  <div className="space-y-4 pt-4 border-t border-[#1E293B]">
                    <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-[#131D33] flex items-center justify-center text-[10px]">4</span>
                      Current Business Context
                    </div>

                    {/* Conditional Fields based on Industry */}
                    {industry === 'Real Estate' && (
                      <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-[#94A3B8] font-mono">Property Segment</label>
                          <select
                            value={realEstateType}
                            onChange={(e) => setRealEstateType(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-white"
                          >
                            <option value="Luxury Residential">Luxury Residential Villas & Apartments</option>
                            <option value="Commercial Office">Commercial Grade-A Office Spaces</option>
                            <option value="Plotted Development">Gated Plotted Land Developments</option>
                            <option value="Mixed Use">Mixed-Use Township</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-[#94A3B8] font-mono">Average Unit Ticket Size</label>
                          <select
                            value={averageTicket}
                            onChange={(e) => setAverageTicket(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-white"
                          >
                            <option value="₹75L - ₹1.5 Cr">₹75 Lakhs – ₹1.5 Crore</option>
                            <option value="₹1.5 Cr - ₹5 Cr">₹1.5 Crore – ₹5 Crore</option>
                            <option value="₹5 Cr+ Ultra-Luxury">₹5 Crore+ Ultra-Luxury</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {industry === 'Technology & SaaS' && (
                      <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1.5">
                        <label className="text-xs text-[#94A3B8] font-mono">Sales Motion & ACV Profile</label>
                        <select
                          value={saasModel}
                          onChange={(e) => setSaasModel(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-white"
                        >
                          <option value="Enterprise Sales ($20k+ ACV)">Enterprise Sales ($20k+ ACV, 3-6mo cycle)</option>
                          <option value="Mid-Market ($5k-$20k ACV)">Mid-Market ($5k – $20k ACV)</option>
                          <option value="Product-Led Growth (Self-serve)">Product-Led Growth (Freemium / Self-Serve)</option>
                        </select>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          What are you trying to achieve?
                        </label>
                        <textarea
                          rows={2}
                          value={growthGoal}
                          onChange={(e) => setGrowthGoal(e.target.value)}
                          placeholder="e.g. Scale qualified inbound demo pipeline by 3x while cutting cost-per-acquisition."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs sm:text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          What is currently not working?
                        </label>
                        <textarea
                          rows={2}
                          value={currentBlocker}
                          onChange={(e) => setCurrentBlocker(e.target.value)}
                          placeholder="e.g. Organic search rankings plateaued; paid campaigns bring unqualified leads that don't close."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs sm:text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#E2E8F0]">
                          What have you already tried?
                        </label>
                        <textarea
                          rows={2}
                          value={alreadyTried}
                          onChange={(e) => setAlreadyTried(e.target.value)}
                          placeholder="e.g. Tried two generalist agencies for Google Ads and publishing blog posts with zero organic conversions."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs sm:text-sm text-white focus:outline-none focus:border-[#2563EB] placeholder:text-[#475569]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 5: INVESTMENT RANGE */}
                  <div className="space-y-4 pt-4 border-t border-[#1E293B]">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-[#131D33] flex items-center justify-center text-[10px]">5</span>
                        Engagement Allocation
                      </div>

                      {/* Currency Toggle */}
                      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setCurrency('INR')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            currency === 'INR' ? 'bg-[#2563EB] text-white font-bold' : 'text-[#64748B]'
                          }`}
                        >
                          INR (₹)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrency('USD')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            currency === 'USD' ? 'bg-[#2563EB] text-white font-bold' : 'text-[#64748B]'
                          }`}
                        >
                          USD ($)
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#94A3B8]">
                      What range are you comfortable allocating toward solving this problem?
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(currency === 'INR' ? inrBudgetOptions : usdBudgetOptions).map((range) => (
                        <button
                          type="button"
                          key={range}
                          onClick={() => setBudgetRange(range)}
                          className={`p-2.5 rounded-xl text-xs font-mono text-center transition-all ${
                            budgetRange === range
                              ? 'bg-[#2563EB]/20 border border-[#2563EB] text-white font-bold'
                              : 'bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:border-[#334155]'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SUBMISSION BUTTON */}
                  <div className="pt-4 border-t border-[#1E293B] space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Evaluating Requirements...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Enquiry →
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-[#64748B] font-mono">
                      We review submitted briefs and respond with the appropriate next step.
                    </p>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 05. WHO WE WORK WITH */}
      <section className="py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // Focus Criteria
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Built for businesses with something meaningful to solve.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              We concentrate our specialized engineering on sectors where high customer LTV and measurable unit economics reward precision.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              'Growth-Stage Businesses',
              'B2B Companies & Tech',
              'Enterprise SaaS Platforms',
              'Real Estate Developers',
              'Professional Services',
              'Healthcare & Life Sciences',
              'High-Ticket Ecommerce',
              'International Scale-ups',
            ].map((sector, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] text-center font-mono text-xs text-[#E2E8F0] hover:border-[#2563EB]/40 transition-colors"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. LOCATION & OPERATING AREA */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6">
            <div className="border-b border-[#1E293B] pb-6 space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
                // Geographic Reach
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Based in Bangalore. Working beyond Bangalore.
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Our operating center is in Bengaluru, Karnataka, serving clients across national and global commercial centers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
                  <MapPin className="w-4 h-4" />
                  PHYSICAL HEADQUARTERS
                </div>
                <div className="text-xs font-mono text-[#94A3B8] space-y-1">
                  <div className="text-white font-bold text-sm">MatricsMania Digital Systems</div>
                  <div>Indiranagar 100ft Road, 4th Block</div>
                  <div>Bengaluru, Karnataka 560038, India</div>
                  <div className="pt-2 text-[#64748B]">Operating Hours: Mon – Fri (9:00 AM – 7:00 PM IST)</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
                  <Globe2 className="w-4 h-4" />
                  SERVING BUSINESSES ACROSS
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-[#070B14] border border-[#1E293B] text-[#E2E8F0]">
                    🇮🇳 India (Domestic)
                  </div>
                  <div className="p-2 rounded bg-[#070B14] border border-[#1E293B] text-[#E2E8F0]">
                    🇺🇸 United States
                  </div>
                  <div className="p-2 rounded bg-[#070B14] border border-[#1E293B] text-[#E2E8F0]">
                    🇬🇧 United Kingdom
                  </div>
                  <div className="p-2 rounded bg-[#070B14] border border-[#1E293B] text-[#E2E8F0]">
                    🇨🇦 Canada
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07. FAQ SECTION */}
      <section className="py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center space-y-4 mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // Common Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Straightforward answers about our engagement model, qualification, and remote execution.
            </p>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0D1424] border border-[#1E293B] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm sm:text-base text-white hover:text-[#60A5FA] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[#64748B] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08. FINAL CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Have a specific growth problem?
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Give us the context. We’ll determine whether MatricsMania is the right fit.
            </p>
            <div className="pt-2">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/20"
              >
                Start an Enquiry
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
