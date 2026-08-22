'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Settings2, Check } from 'lucide-react';
import { Button } from '../design-system/primitives/Button';
import { Badge } from '../design-system/primitives/Badge';
import { Card } from '../design-system/primitives/Card';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    performanceAnalytics: true,
    conversionAttribution: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('matricsmania_consent_state');
      if (!stored) {
        // Delay showing banner slightly for clean page load
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked in sandboxed context
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        'matricsmania_consent_state',
        JSON.stringify({
          essential: true,
          performanceAnalytics: true,
          conversionAttribution: true,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {}
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem(
        'matricsmania_consent_state',
        JSON.stringify({
          essential: true,
          performanceAnalytics: false,
          conversionAttribution: false,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {}
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(
        'matricsmania_consent_state',
        JSON.stringify({
          ...preferences,
          essential: true,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {}
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy & Telemetry Consent"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <Card
        variant="elevated"
        padding="md"
        radius="lg"
        className="bg-[#0D1424]/95 backdrop-blur-xl border border-[#1E293B] shadow-2xl space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Telemetry & Privacy Policy
              </h4>
              <span className="text-[10px] font-mono text-[#10B981]">
                Zero 3rd-Party Data Brokering
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="text-[#64748B] hover:text-white transition-colors"
            aria-label="Close and keep essential cookies"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!showPreferences ? (
          <>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We deploy first-party telemetry and Core Web Vitals diagnostic cookies to measure page speed and multi-touch B2B conversion attribution.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
              >
                Accept All Telemetry
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAcceptEssential}
              >
                Essential Only
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(true)}
                iconLeading={<Settings2 className="w-3.5 h-3.5" />}
              >
                Configure
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-3 pt-1 border-t border-[#1E293B]">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-[#070B14] border border-[#1E293B]">
                <div>
                  <span className="text-xs font-semibold text-white block">Essential System State</span>
                  <span className="text-[10px] text-[#64748B]">Required for security, routing & SSL session state.</span>
                </div>
                <Badge variant="mono" size="sm">Always Active</Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#070B14] border border-[#1E293B]">
                <div>
                  <span className="text-xs font-semibold text-white block">Performance Diagnostics</span>
                  <span className="text-[10px] text-[#64748B]">Monitors Core Web Vitals (LCP, CLS, INP) performance.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.performanceAnalytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, performanceAnalytics: e.target.checked })
                  }
                  className="rounded border-[#1E293B] text-[#2563EB] focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#070B14] border border-[#1E293B]">
                <div>
                  <span className="text-xs font-semibold text-white block">Conversion Attribution</span>
                  <span className="text-[10px] text-[#64748B]">First-party multi-touch pipeline attribution.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.conversionAttribution}
                  onChange={(e) =>
                    setPreferences({ ...preferences, conversionAttribution: e.target.checked })
                  }
                  className="rounded border-[#1E293B] text-[#2563EB] focus:ring-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(false)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSavePreferences}
                iconLeading={<Check className="w-3.5 h-3.5" />}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </Card>
    </aside>
  );
};
