'use client';

import React from 'react';
import { Card } from './Card';
import { Heading } from './Heading';
import { Eyebrow } from './Eyebrow';
import { Button } from './Button';
import { Link } from './Link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export type CTAVariant = 'panel' | 'banner' | 'minimal';

export interface CTAAction {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
}

export interface CTAProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  assuranceItems?: string[];
  variant?: CTAVariant;
  className?: string;
  id?: string;
}

export const CTA: React.FC<CTAProps> = ({
  eyebrow = '// SCHEDULE TECHNICAL REVIEW',
  title,
  description,
  primaryAction,
  secondaryAction,
  assuranceItems = [
    '30-minute growth architecture review',
    'Direct consultation with senior growth engineers',
    'Transparent performance attribution metrics',
  ],
  variant = 'panel',
  className = '',
  id,
  ...rest
}) => {
  if (variant === 'banner') {
    return (
      <div
        id={id}
        className={`p-6 sm:p-8 rounded-xl bg-[#0D1424] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-6 ${className}`}
        {...rest}
      >
        <div className="space-y-2 text-center md:text-left">
          {eyebrow && <Eyebrow variant="mono">{eyebrow}</Eyebrow>}
          <Heading level={3} size="h3">
            {title}
          </Heading>
          {description && (
            <p className="text-sm text-[#94A3B8] max-w-xl">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {secondaryAction && (
            <Button
              variant="secondary"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={primaryAction.onClick}
            iconTrailing={primaryAction.icon || <ArrowRight className="w-4 h-4" />}
          >
            {primaryAction.label}
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        id={id}
        className={`py-12 text-center space-y-6 max-w-3xl mx-auto ${className}`}
        {...rest}
      >
        {eyebrow && (
          <div className="flex justify-center">
            <Eyebrow variant="accent">{eyebrow}</Eyebrow>
          </div>
        )}
        <Heading level={2} size="h2" className="leading-tight">
          {title}
        </Heading>
        {description && (
          <p className="text-base text-[#94A3B8] leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={primaryAction.onClick}
            iconTrailing={primaryAction.icon || <ArrowRight className="w-4 h-4" />}
          >
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button
              variant="secondary"
              size="lg"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Default 'panel' variant
  return (
    <Card
      id={id}
      variant="blueprint"
      padding="lg"
      radius="xl"
      className={`space-y-8 ${className}`}
      {...rest}
    >
      <div className="space-y-4 max-w-3xl">
        {eyebrow && <Eyebrow variant="mono">{eyebrow}</Eyebrow>}
        <Heading level={2} size="h2" className="tracking-tight">
          {title}
        </Heading>
        {description && (
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <Button
          variant="primary"
          size="lg"
          onClick={primaryAction.onClick}
          iconTrailing={primaryAction.icon || <ArrowRight className="w-4 h-4" />}
        >
          {primaryAction.label}
        </Button>
        {secondaryAction && (
          <Button
            variant="secondary"
            size="lg"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>

      {assuranceItems && assuranceItems.length > 0 && (
        <div className="pt-6 border-t border-[#1E293B] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#94A3B8]">
          {assuranceItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
