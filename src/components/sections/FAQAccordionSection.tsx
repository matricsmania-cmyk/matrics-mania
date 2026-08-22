'use client';

import React, { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ } from '../../models';

export interface FAQAccordionSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQ[] | Array<{ question: string; answer: string }>;
  defaultOpenIndex?: number | null;
}

export const FAQAccordionSection: React.FC<FAQAccordionSectionProps> = ({
  title = 'Frequently Asked Engineering Questions',
  subtitle = 'Technical clarity on implementation SLAs, measurement architecture, and commercial engagements.',
  faqs,
  defaultOpenIndex = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
            Engineering FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const headingId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden transition-colors"
              >
                <button
                  id={headingId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-[#60A5FA] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-inset transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#E2E8F0]">
                    {faq.question}
                  </span>
                  <div
                    aria-hidden="true"
                    className={`p-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/50"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
