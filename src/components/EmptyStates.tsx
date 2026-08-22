'use client';

import React from 'react';
import { Search, FilterX, Inbox, RefreshCw, ArrowRight, HelpCircle, Terminal } from 'lucide-react';
import { Card } from '../design-system/primitives/Card';
import { Button } from '../design-system/primitives/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

/**
 * Universal Empty Collection / State component
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  description = 'No active entries or architecture documents match the current criteria.',
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <Card
      variant="blueprint"
      padding="xl"
      radius="xl"
      className={`text-center py-16 px-8 max-w-2xl mx-auto bg-[#0D1424]/90 border border-[#1E293B] shadow-xl space-y-6 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#131D33] border border-[#1E293B] text-[#60A5FA] flex items-center justify-center mx-auto shadow-inner">
        {icon || <Inbox className="w-7 h-7" />}
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#070B14] border border-[#1E293B] font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
          <Terminal className="w-3 h-3 text-[#60A5FA]" />
          TELEMETRY: ZERO MATCHES
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {(onAction || onSecondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onAction && (
            <Button variant="primary" onClick={onAction} iconTrailing={<ArrowRight className="w-4 h-4" />}>
              {actionLabel || 'Reset Filters'}
            </Button>
          )}
          {onSecondaryAction && (
            <Button variant="secondary" onClick={onSecondaryAction}>
              {secondaryActionLabel || 'Explore All Services'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

/**
 * Empty Search State
 */
export const EmptySearchResults: React.FC<{
  query: string;
  onClear: () => void;
  onExploreDefault?: () => void;
}> = ({ query, onClear, onExploreDefault }) => {
  return (
    <EmptyState
      icon={<Search className="w-7 h-7 text-[#60A5FA]" />}
      title={`No results found for "${query}"`}
      description="We couldn't locate any technical whitepapers, service deliverables, or client case studies matching your query terms."
      actionLabel="Clear Search"
      onAction={onClear}
      secondaryActionLabel={onExploreDefault ? 'View All Publications' : undefined}
      onSecondaryAction={onExploreDefault}
    />
  );
};

/**
 * Empty Filter State
 */
export const EmptyFilterResults: React.FC<{
  filterName: string;
  onReset: () => void;
}> = ({ filterName, onReset }) => {
  return (
    <EmptyState
      icon={<FilterX className="w-7 h-7 text-[#F59E0B]" />}
      title={`No assets in "${filterName}"`}
      description="There are currently no published entries matching this specific category taxonomy or filter combination."
      actionLabel="Reset Taxonomy Filter"
      onAction={onReset}
    />
  );
};
