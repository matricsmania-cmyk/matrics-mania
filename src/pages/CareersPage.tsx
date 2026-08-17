import React, { useState } from 'react';
import { PageType } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, CheckCircle2, Sparkles, Send, X, ShieldCheck } from 'lucide-react';

interface CareersPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  compensation: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onOpenBooking, onShowToast }) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantLinkedin, setApplicantLinkedin] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobs: JobOpening[] = [
    {
      id: 'job-1',
      title: 'Senior Technical SEO Strategist',
      department: 'Organic Growth',
      location: 'Bengaluru / Remote (India)',
      type: 'Full-Time',
      experience: '4+ Years',
      compensation: '₹18L – ₹28L + Profit Share',
      description: 'Lead large-scale programmatic and technical SEO campaigns for enterprise B2B SaaS and multi-brand E-Commerce stores.',
      responsibilities: [
        'Perform advanced server log crawls, JS rendering analysis, and schema engineering',
        'Design semantic topic clusters that dominate Google Search and SGE / AI Overviews',
        'Lead PR-driven digital link building campaigns with top-tier industry publishers',
        'Synthesize findings into executive Looker Studio attribution dashboards',
      ],
      requirements: [
        '4+ years proven experience scaling organic traffic to 100k+ monthly non-branded sessions',
        'Deep mastery of Screaming Frog, Ahrefs, SEMrush, and Google Search Console',
        'Working knowledge of HTML, CSS, JavaScript rendering, and Next.js / React SEO',
      ],
    },
    {
      id: 'job-2',
      title: 'Senior Performance Media Buyer (Google & Meta)',
      department: 'Paid Acquisition',
      location: 'Bengaluru / Hybrid / Remote',
      type: 'Full-Time',
      experience: '3+ Years',
      compensation: '₹16L – ₹26L + Performance Bonus',
      description: 'Manage and scale multi-crore ad budgets across Google Search, Performance Max, Meta Ads, and YouTube with strict ROAS targets.',
      responsibilities: [
        'Architect high-converting campaign structures with tightly mapped audience cohorts',
        'Run systematic dynamic creative variations, hook testing, and landing page CRO',
        'Integrate server-side Conversions API (CAPI) and GA4 custom funnel triggers',
        'Maintain blended client ROAS of 4.5x+ across high-growth accounts',
      ],
      requirements: [
        'Proven track record managing ₹50L+ monthly ad spend profitably',
        'Expert-level understanding of Meta Ads Manager, Google Ads, and CAPI setups',
        'Analytical rigor with strong data storytelling and spreadsheet modeling skills',
      ],
    },
    {
      id: 'job-3',
      title: 'Growth Marketing & AI Automation Specialist',
      department: 'Growth Tech',
      location: 'Bengaluru / Remote',
      type: 'Full-Time',
      experience: '2+ Years',
      compensation: '₹14L – ₹22L + ESOPs',
      description: 'Build automated growth pipelines, AI-driven content workflows, and CRM lead nurturing engines for rapid market expansion.',
      responsibilities: [
        'Develop programmatic workflows using Python, Make.com, Zapier, and LLM APIs',
        'Implement conversion rate optimization experiments and automated reporting pipelines',
        'Collaborate with the strategy team on novel acquisition channels and scraper bots',
      ],
      requirements: [
        'Hands-on experience with API automation tools, web scraping, and generative AI models',
        'Strong problem-solving mindset and eagerness to engineer novel growth loops',
      ],
    },
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantLinkedin('');
      setApplicantNote('');
      onShowToast('Application Submitted!', 'Our hiring team will review your profile within 48 hours.', 'success');
    }, 600);
  };

  return (
    <div className="bg-[#070B14] text-white space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto tracking-tight leading-[1.15]">
            Build the Future of <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Data-Driven Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Join a team of senior growth engineers, data scientists, and creative strategists who refuse to settle for vanity metrics. We value autonomy, mathematical precision, and rapid career progression.
          </p>
        </ScrollReveal>
      </section>

      {/* CULTURE PERKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why You’ll Love Working With Us
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Engineered for high performers who thrive on impact and zero corporate red tape.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'High Autonomy',
              desc: 'No micro-management. You own your client outcomes and have full freedom to test bold hypotheses.',
            },
            {
              title: 'Profit Sharing & Bonuses',
              desc: 'Direct quarterly bonuses tied directly to the client revenue gains and retention you generate.',
            },
            {
              title: 'Flexible & Remote-Friendly',
              desc: 'Work from our Bengaluru hub or anywhere in India with asynchronous workflows and flexible hours.',
            },
            {
              title: 'Continuous Learning Budget',
              desc: '₹1.5L annual allowance for courses, growth conferences, books, and specialized software tools.',
            },
          ].map((perk, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.06}
              className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3 hover:border-[#2563EB]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#131D33] flex items-center justify-center border border-[#1E293B] text-[#60A5FA]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">{perk.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{perk.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Current Openings
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Explore Open Growth Roles
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <ScrollReveal
              key={job.id}
              delay={idx * 0.06}
              className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#2563EB]/40 transition-all"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#131D33] text-[#60A5FA] border border-[#1E293B]">
                    {job.department}
                  </span>
                  <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                  <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {job.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {job.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {job.description}
                </p>

                <div className="text-xs font-bold text-[#10B981]">
                  Compensation: {job.compensation}
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-md shadow-blue-500/20 active:scale-[0.98]"
              >
                <span>View & Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* JOB MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider">
                  {selectedJob.department} • {selectedJob.type}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {selectedJob.location} | Comp: {selectedJob.compensation}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-xl text-[#94A3B8] hover:bg-[#131D33] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-white">
              <h4 className="font-bold uppercase tracking-wider text-[#60A5FA]">Responsibilities:</h4>
              <ul className="space-y-1.5 list-disc list-inside text-[#94A3B8]">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <h4 className="font-bold uppercase tracking-wider text-[#60A5FA] pt-2">Requirements:</h4>
              <ul className="space-y-1.5 list-disc list-inside text-[#94A3B8]">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Quick Application Form */}
            <form onSubmit={handleApplySubmit} className="pt-4 border-t border-[#1E293B] space-y-4">
              <h4 className="text-sm font-bold text-white">Quick Apply</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
              <input
                type="url"
                placeholder="LinkedIn Profile or Portfolio URL"
                value={applicantLinkedin}
                onChange={(e) => setApplicantLinkedin(e.target.value)}
                className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
              <textarea
                placeholder="Briefly tell us why you are a great fit (Optional)"
                rows={2}
                value={applicantNote}
                onChange={(e) => setApplicantNote(e.target.value)}
                className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#1E293B] text-[#94A3B8] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
