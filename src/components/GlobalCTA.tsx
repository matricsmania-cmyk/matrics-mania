'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { Container } from '../design-system/primitives/Container';
import { Heading } from '../design-system/primitives/Heading';
import { Eyebrow } from '../design-system/primitives/Eyebrow';
import { Button } from '../design-system/primitives/Button';
import { Card, CardVariant } from '../design-system/primitives/Card';

export interface GlobalCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  assurancePoints?: string[];
  onOpenBooking: (prefillInfo?: any) => void;
  onSecondaryAction?: () => void;
  className?: string;
  variant?: CardVariant;
}

export const GlobalCTA: React.FC<GlobalCTAProps> = ({
  eyebrow = '// SCHEDULE TECHNICAL GROWTH REVIEW',
  title = 'Ready to engineer a defensible organic & paid growth engine?',
  description = 'Direct 30-minute technical review with senior search architects and attribution engineers. We audit your crawl graph, vector indexing, and pipeline CAC models.',
  primaryButtonText = 'Schedule Growth Audit',
  secondaryButtonText = 'Explore Case Studies',
  assurancePoints = [
    'Direct consultation with Principal Growth Engineers',
    'Full-funnel technical search & vector indexing audit',
    'Transparent attribution models & pipeline velocity projections',
  ],
  onOpenBooking,
  onSecondaryAction,
  className = '',
  variant = 'blueprint',
}) => {
  return (
    <section className={`py-16 sm:py-24 bg-[#070B14] relative overflow-hidden ${className}`}>
      <Container maxWidth="xl">
        <Card
          variant={variant}
          padding="xl"
          radius="xl"
          className="relative bg-gradient-to-b from-[#0D1424] to-[#070B14] border border-[#1E293B] shadow-2xl"
        >
          {/* Subtle Technical Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 space-y-8 max-w-4xl">
            <div className="space-y-4">
              <Eyebrow variant="mono" dot dotColor="blue">
                {eyebrow}
              </Eyebrow>
              <Heading level={2} size="h2" className="tracking-tight text-white">
                {title}
              </Heading>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onOpenBooking({ intent: 'Global CTA' })}
                iconTrailing={<ArrowRight className="w-4 h-4" />}
              >
                {primaryButtonText}
              </Button>

              {secondaryButtonText && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onSecondaryAction || (() => onOpenBooking({ intent: 'Secondary Action' }))}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>

            {/* Verification & Assurance Badges */}
            {assurancePoints.length > 0 && (
              <div className="pt-8 border-t border-[#1E293B] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#94A3B8]">
                {assurancePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
};
