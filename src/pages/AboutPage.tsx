import React from 'react';
import { PageType } from '../types';
import { TEAM_MEMBERS_DATA, MILESTONES_DATA } from '../data/mockData';
import { Shield, Target, Zap, BarChart, CheckCircle2, ArrowRight, Award, Linkedin, Mail } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  const techStack = [
    { name: 'Google Analytics 4', desc: 'Server-side event tracking & revenue attribution' },
    { name: 'Meta Ads Manager', desc: 'Advanced CAPI setup & dynamic creative testing' },
    { name: 'Ahrefs & SEMrush', desc: 'Deep keyword research & link opportunity mapping' },
    { name: 'Looker Studio', desc: 'Custom live executive performance dashboards' },
    { name: 'HubSpot CRM', desc: 'Full-funnel pipeline tracking & automated lead nurturing' },
    { name: 'OpenAI & Claude', desc: 'Programmatic outline research & trend analysis' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          About Matricsmania
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white max-w-4xl mx-auto tracking-tight">
          We Are Performance Marketers Driven By <span className="gradient-text-primary">Mathematical Precision</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Founded on the principle that marketing shouldn't be guesswork, Matricsmania combines data science, creative psychology, and technical engineering to build high-converting growth engines.
        </p>
      </section>

      {/* PHILOSOPHY & VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Our Core Operating Principles
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            What sets Matricsmania apart from traditional marketing agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <BarChart className="w-6 h-6 text-blue-500" />,
              title: 'Mathematical Rigor',
              desc: 'Every campaign metric is audited for direct contribution to bottom-line net profit and customer LTV.',
            },
            {
              icon: <Target className="w-6 h-6 text-purple-500" />,
              title: 'Aggressive ROAS',
              desc: 'We optimize ad accounts daily using algorithmic bidding, custom negative keywords, and creative hooks.',
            },
            {
              icon: <Shield className="w-6 h-6 text-emerald-500" />,
              title: '100% Transparency',
              desc: 'No hidden markup or obfuscated PDF reports. You get live Looker Studio access connected directly to your CRM.',
            },
            {
              icon: <Zap className="w-6 h-6 text-amber-500" />,
              title: 'Speed of Execution',
              desc: 'We launch campaigns and technical fixes in days, not months, ensuring rapid market validation.',
            },
          ].map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{val.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Leadership Team
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Meet the Growth Strategists Behind Matricsmania
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Senior growth architects with decades of combined experience in technical SEO, paid acquisition, and CRO.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TEAM_MEMBERS_DATA.map((member) => (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-blue-500/30"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{member.role}</p>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 pt-1 text-slate-400">
                  <a href={member.socials.linkedin} className="hover:text-blue-500 transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href={`mailto:${member.socials.email}`} className="hover:text-blue-500 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GROWTH MILESTONES TIMELINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Agency Journey
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Matricsmania Growth Milestones
          </h2>
        </div>

        <div className="relative border-l-2 border-blue-500/30 pl-6 ml-4 space-y-8">
          {MILESTONES_DATA.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950" />
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                  {m.year}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">{m.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK MASTERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Our Enterprise Tech Stack
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            We master the industry's most advanced marketing intelligence and automation software.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
            >
              <Award className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">{tech.name}</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 border border-slate-800 shadow-xl">
          <h2 className="text-2xl md:text-4xl font-extrabold">Ready to Partner with Matricsmania?</h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto">
            Get a tailored 90-day performance roadmap designed specifically for your target audience and CAC goals.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Book Founder Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
