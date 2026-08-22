'use client';

import React from 'react';
import { Cpu, Terminal, Loader2 } from 'lucide-react';
import { Container } from '../design-system/primitives/Container';
import { Card } from '../design-system/primitives/Card';

export const RouteLoadingState: React.FC<{ message?: string }> = ({
  message = 'RESOLVING ARCHITECTURE & INDEX SCHEMA...',
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-24 bg-[#070B14]">
      <Container maxWidth="sm">
        <Card
          variant="blueprint"
          padding="lg"
          radius="xl"
          className="text-center space-y-6 bg-[#0D1424]/80 backdrop-blur-sm border border-[#1E293B]"
        >
          {/* Radar / Pulse Indicator */}
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#2563EB]/40 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-[#60A5FA]/60 animate-spin" />
            <div className="w-8 h-8 rounded-full bg-[#131D33] border border-[#2563EB] flex items-center justify-center text-[#60A5FA]">
              <Cpu className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#070B14] border border-[#1E293B] font-mono text-[10px] text-[#60A5FA] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              TELEMETRY: FETCHING NODE
            </div>
            <h3 className="text-sm font-mono font-bold text-white tracking-wider">
              {message}
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Hydrating entity graph from decentralized content store.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#070B14] h-1.5 rounded-full overflow-hidden border border-[#1E293B]">
            <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] w-2/3 animate-pulse rounded-full" />
          </div>
        </Card>
      </Container>
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <Card
          key={idx}
          variant="default"
          padding="lg"
          radius="lg"
          className="space-y-4 animate-pulse bg-[#0D1424] border border-[#1E293B]"
        >
          <div className="w-20 h-4 bg-[#131D33] rounded" />
          <div className="w-3/4 h-6 bg-[#1E293B] rounded" />
          <div className="space-y-2 pt-2">
            <div className="w-full h-3 bg-[#131D33] rounded" />
            <div className="w-5/6 h-3 bg-[#131D33] rounded" />
            <div className="w-2/3 h-3 bg-[#131D33] rounded" />
          </div>
          <div className="pt-4 border-t border-[#1E293B] flex justify-between items-center">
            <div className="w-16 h-3 bg-[#131D33] rounded" />
            <div className="w-12 h-3 bg-[#2563EB]/40 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export const DetailHeroSkeleton: React.FC = () => {
  return (
    <div className="w-full py-16 animate-pulse space-y-6">
      <div className="w-32 h-5 bg-[#131D33] rounded font-mono" />
      <div className="w-3/4 h-12 bg-[#1E293B] rounded" />
      <div className="w-1/2 h-6 bg-[#131D33] rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-[#0D1424] border border-[#1E293B] p-4 space-y-2">
            <div className="w-12 h-3 bg-[#131D33] rounded" />
            <div className="w-20 h-6 bg-[#1E293B] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ArticleSkeleton: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 animate-pulse space-y-8">
      <div className="space-y-4">
        <div className="w-24 h-4 bg-[#131D33] rounded" />
        <div className="w-full h-10 bg-[#1E293B] rounded" />
        <div className="w-2/3 h-10 bg-[#1E293B] rounded" />
        <div className="flex items-center gap-4 pt-2">
          <div className="w-10 h-10 rounded-full bg-[#131D33]" />
          <div className="space-y-2">
            <div className="w-28 h-3 bg-[#131D33] rounded" />
            <div className="w-20 h-2 bg-[#131D33] rounded" />
          </div>
        </div>
      </div>
      <div className="w-full h-64 bg-[#0D1424] border border-[#1E293B] rounded-xl" />
      <div className="space-y-4 pt-4">
        <div className="w-full h-4 bg-[#131D33] rounded" />
        <div className="w-full h-4 bg-[#131D33] rounded" />
        <div className="w-4/5 h-4 bg-[#131D33] rounded" />
      </div>
    </div>
  );
};
