'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Terminal,
  HelpCircle,
  PhoneCall,
  Compass,
  Home,
} from 'lucide-react';
import { Container } from '../design-system/primitives/Container';
import { Card } from '../design-system/primitives/Card';
import { Heading } from '../design-system/primitives/Heading';
import { Eyebrow } from '../design-system/primitives/Eyebrow';
import { Button } from '../design-system/primitives/Button';
import { SEOHead } from './SEOHead';

export interface NotFoundStateProps {
  attemptedPath?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  attemptedPath = '/unknown/',
  onNavigate: propNavigate,
  onOpenBooking,
}) => {
  const handleNav = (path: string) => {
    if (propNavigate) {
      propNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 bg-[#070B14]">
      {/* Client-side SEO Head updating for 404 routes */}
      <SEOHead
        title="404 Page Not Found | Architecture Resource Unresolved | MatricsMania"
        description="The requested resource or architecture blueprint could not be resolved on the MatricsMania network."
        canonicalUrl={`https://matricsmania.com${attemptedPath}`}
        noindex={true}
        nofollow={true}
      />

      <Container maxWidth="lg">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card
            variant="blueprint"
            padding="xl"
            radius="xl"
            className="space-y-8 bg-[#0D1424] border border-[#1E293B] shadow-2xl"
          >
            {/* Header Telemetry */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
              <Eyebrow variant="mono" dot dotColor="amber">
                // HTTP 404 • ROUTE UNRESOLVED
              </Eyebrow>
              <div className="flex items-center gap-3 font-mono text-xs text-[#64748B]">
                <span>STATUS: 404_NOT_FOUND</span>
                <span>•</span>
                <span>EDGE: CANONICAL_GATEWAY</span>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <Heading level={1} size="h2" className="text-white">
                Resource Unresolved on Canonical Gateway
              </Heading>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                The path <code className="px-2 py-0.5 rounded bg-[#131D33] text-[#60A5FA] font-mono text-xs sm:text-sm font-semibold">{attemptedPath}</code> does not match any active service specification, industry playbook, location node, or published research whitepaper.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Button
                variant="primary"
                onClick={() => handleNav('/')}
                iconLeading={<ArrowLeft className="w-4 h-4" />}
              >
                Return to Homepage
              </Button>
              {onOpenBooking && (
                <Button
                  variant="secondary"
                  onClick={() => onOpenBooking({ intent: '404 Route Inquire' })}
                  iconLeading={<PhoneCall className="w-4 h-4" />}
                >
                  Contact Architects
                </Button>
              )}
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export const Error500State: React.FC<{
  error?: Error;
  onReset: () => void;
  onNavigateHome?: () => void;
}> = ({ error, onReset, onNavigateHome }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 bg-[#070B14]">
      <Container maxWidth="md">
        <Card
          variant="elevated"
          padding="xl"
          radius="xl"
          className="space-y-6 border border-[#EF4444]/30 bg-[#0D1424] shadow-2xl text-white"
        >
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
            <div className="flex items-center gap-3 text-[#EF4444]">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h2 className="text-base font-mono font-bold uppercase tracking-wider">
                HTTP 500 • RUNTIME FAULT
              </h2>
            </div>
            <span className="font-mono text-xs text-[#64748B]">
              NODE: EDGE_PROCESSOR
            </span>
          </div>

          <div className="space-y-3">
            <Heading level={2} size="h3" className="text-white">
              An unexpected execution fault occurred.
            </Heading>
            <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
              The application engine caught an unhandled state during view resolution. The execution trace has been isolated.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-[#070B14] border border-[#1E293B] rounded-lg font-mono text-xs text-[#F87171] overflow-x-auto space-y-1">
              <div className="font-bold">Error: {error.name}</div>
              <div className="text-[11px] opacity-90">{error.message}</div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={onReset}
              iconLeading={<RefreshCw className="w-4 h-4" />}
            >
              Reinitialize Session
            </Button>
            {onNavigateHome && (
              <Button
                variant="secondary"
                onClick={onNavigateHome}
                iconLeading={<Home className="w-4 h-4" />}
              >
                Return to Home
              </Button>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught exception in application shell:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Error500State
          error={this.state.error}
          onReset={this.handleReset}
          onNavigateHome={() => {
            window.location.href = '/';
          }}
        />
      );
    }

    return this.props.children;
  }
}
