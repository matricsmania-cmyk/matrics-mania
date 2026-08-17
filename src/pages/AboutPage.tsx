import React from 'react';
import { PageType } from '../types';
import { TEAM_MEMBERS_DATA, MILESTONES_DATA } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { Shield, Target, Zap, BarChart, ArrowRight, Award, Linkedin, Mail } from 'lucide-react';

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
    <div className="bg-[#070B14] text-white space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto tracking-tight leading-[1.15]">
            We Are Performance Marketers Driven By <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Mathematical Precision</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Founded on the principle that marketing shouldn't be guesswork, MatricsMania combines data science, creative psychology, and technical engineering to build high-converting growth engines.
          </p>
        </ScrollReveal>
      </section>

      {/* PHILOSOPHY & VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Our Core Operating Principles
          </h2>
          <p className="text-[#94A3B8] text-sm">
            What sets MatricsMania apart from traditional marketing agencies.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <BarChart className="w-5 h-5 text-[#60A5FA]" />,
              title: 'Mathematical Rigor',
              desc: 'Every campaign metric is audited for direct contribution to bottom-line net profit and customer LTV.',
            },
            {
              icon: <Target className="w-5 h-5 text-[#60A5FA]" />,
              title: 'Aggressive ROAS',
              desc: 'We optimize ad accounts daily using algorithmic bidding, custom negative keywords, and creative hooks.',
            },
            {
              icon: <Shield className="w-5 h-5 text-[#60A5FA]" />,
              title: '100% Transparency',
              desc: 'No hidden markup or obfuscated PDF reports. You get live Looker Studio access connected directly to your CRM.',
            },
            {
              icon: <Zap className="w-5 h-5 text-[#60A5FA]" />,
              title: 'Speed of Execution',
              desc: 'We launch campaigns and technical fixes in days, not months, ensuring rapid market validation.',
            },
          ].map((val, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.08}
              className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3 hover:border-[#2563EB]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#131D33] flex items-center justify-center border border-[#1E293B]">
                {val.icon}
              </div>
              <h3 className="font-bold text-lg text-white">{val.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{val.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Leadership Team
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Meet the Growth Strategists Behind MatricsMania
          </h2>
          <p className="text-[#94A3B8] text-sm">
            Senior growth architects with decades of combined experience in technical SEO, paid acquisition, and CRO.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TEAM_MEMBERS_DATA.map((member, idx) => (
            <ScrollReveal
              key={member.id}
              delay={idx * 0.06}
              className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-center space-y-4 flex flex-col justify-between hover:border-[#2563EB]/40 transition-colors"
            >
              <div className="space-y-3">
                <OptimizedImage
                  src={member.avatar}
                  alt={member.name}
                  widthParam={200}
                  className="w-20 h-20 rounded-full mx-auto object-cover border border-[#1E293B]"
                />
                <div>
                  <h3 className="font-bold text-sm text-white">{member.name}</h3>
                  <p className="text-[11px] font-semibold text-[#60A5FA]">{member.role}</p>
                </div>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1E293B] space-y-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#131D33] text-[10px] text-[#60A5FA] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 pt-1 text-[#94A3B8]">
                  <a href={member.socials.linkedin} className="hover:text-white transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href={`mailto:${member.socials.email}`} className="hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* GROWTH MILESTONES TIMELINE */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Agency Journey
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              MatricsMania Growth Milestones
            </h2>
          </ScrollReveal>

          <div className="relative border-l-2 border-[#1E293B] pl-6 ml-4 space-y-6">
            {MILESTONES_DATA.map((m, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] border-2 border-[#0D1424]" />
                <div className="bg-[#070B14] p-5 rounded-2xl border border-[#1E293B] space-y-1 hover:border-[#2563EB]/40 transition-colors">
                  <span className="text-xs font-black text-[#60A5FA] bg-[#131D33] px-2.5 py-0.5 rounded-full">
                    {m.year}
                  </span>
                  <h3 className="font-bold text-base text-white pt-1">{m.title}</h3>
                  <p className="text-xs text-[#94A3B8]">{m.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK MASTERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Our Enterprise Tech Stack
          </h2>
          <p className="text-xs text-[#94A3B8]">
            We master the industry's most advanced marketing intelligence and automation software.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {techStack.map((tech, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.05}
              className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] flex items-start gap-3 hover:border-[#2563EB]/40 transition-colors"
            >
              <Award className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-white">{tech.name}</p>
                <p className="text-[#94A3B8] mt-0.5">{tech.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#0D1424] text-white py-20 border-t border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Ready to Partner with MatricsMania?
          </h2>
          <p className="text-[#94A3B8] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Get a tailored 90-day performance roadmap designed specifically for your target audience and CAC goals.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <span>Book Founder Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
