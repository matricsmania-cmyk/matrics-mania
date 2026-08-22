'use client';

import React, { useState, useMemo } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface PackageBuilderProps {
  onOpenBookingWithQuote: (quoteData: {
    services: string[];
    monthlyBudget: string;
    totalMonthlyEstimate: string;
  }) => void;
}

export const PackageBuilder: React.FC<PackageBuilderProps> = ({ onOpenBookingWithQuote }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['seo-growth', 'ppc-advertising']);
  const [budgetRange, setBudgetRange] = useState<string>('₹2,50,000 - ₹10,00,000/mo');

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totals = useMemo(() => {
    // Base estimation logic in INR
    let monthlyBase = 0;
    selectedServices.forEach((id) => {
      if (id === 'seo-growth') monthlyBase += 49999;
      if (id === 'ppc-advertising') monthlyBase += 75000;
      if (id === 'social-media-growth') monthlyBase += 39999;
      if (id === 'content-marketing') monthlyBase += 49999;
      if (id === 'cro-web-engineering') monthlyBase += 35000;
      if (id === 'analytics-marketing-ai') monthlyBase += 39999;
    });

    // Multi-service bundle discount
    let discount = 0;
    if (selectedServices.length >= 3) discount = 0.15; // 15% bundle discount
    if (selectedServices.length >= 5) discount = 0.25; // 25% bundle discount

    const discountedTotal = Math.round(monthlyBase * (1 - discount));

    return {
      rawTotal: monthlyBase,
      discountPercent: Math.round(discount * 100),
      discountedTotal,
    };
  }, [selectedServices]);

  return (
    <div className="bg-white dark:bg-[#21201D] border border-[#DCD6C9] dark:border-[#38352F] rounded-3xl p-6 md:p-10 text-[#171717] dark:text-[#F7F5F0] space-y-8 shadow-xl">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-2 text-xs font-bold bg-[#E9E5DC] dark:bg-[#2B2925] text-[#8C7343] dark:text-[#C7B082] px-3.5 py-1 rounded-full border border-[#DCD6C9] dark:border-[#38352F] uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" /> Interactive Package Estimator
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#171717] dark:text-[#F7F5F0]">
          Build Your Custom Growth Package (INR)
        </h3>
        <p className="text-[#5A564E] dark:text-[#BDB7AA] text-sm">
          Select the growth modules your business requires to see an estimated monthly investment breakdown in Rupees (₹) with custom bundle discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Service Checklist */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICES_DATA.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F4EFE6] dark:bg-[#2F2B22] border-[#B39A6B] shadow-md shadow-[#B39A6B]/10'
                    : 'bg-[#F7F5F0] dark:bg-[#171717] border-[#DCD6C9] dark:border-[#38352F] hover:border-[#B39A6B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#8C7343] dark:text-[#C7B082]">{service.category}</span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-[#B39A6B] border-[#B39A6B] text-[#171717]'
                          : 'border-[#DCD6C9] dark:border-[#38352F] bg-white dark:bg-[#21201D]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-[#171717] dark:text-[#F7F5F0]">{service.title}</h4>
                  <p className="text-xs text-[#5A564E] dark:text-[#BDB7AA] line-clamp-2 mt-1">{service.shortDesc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#DCD6C9] dark:border-[#38352F] flex items-center justify-between text-xs">
                  <span className="text-[#5A564E] dark:text-[#8C877C]">Starts at</span>
                  <span className="font-bold text-[#8C7343] dark:text-[#C7B082]">{service.priceStarting}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estimated Summary Panel */}
        <div className="lg:col-span-5 bg-[#F7F5F0] dark:bg-[#171717] border border-[#DCD6C9] dark:border-[#38352F] rounded-2xl p-6 space-y-6 shadow-md sticky top-24">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A564E] dark:text-[#BDB7AA] border-b border-[#DCD6C9] dark:border-[#38352F] pb-3">
            Package Estimate Summary
          </h4>

          {/* Budget Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#171717] dark:text-[#F7F5F0] mb-2">
              Monthly Ad / Media Spend Budget
            </label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full bg-white dark:bg-[#21201D] border border-[#DCD6C9] dark:border-[#38352F] rounded-xl px-3 py-2.5 text-xs text-[#171717] dark:text-[#F7F5F0] focus:outline-none focus:ring-2 focus:ring-[#B39A6B]"
            >
              <option value="Under ₹2,50,000/mo">Under ₹2,50,000 / month</option>
              <option value="₹2,50,000 - ₹10,00,000/mo">₹2,50,000 - ₹10,00,000 / month</option>
              <option value="₹10,00,000 - ₹25,00,000/mo">₹10,00,000 - ₹25,00,000 / month</option>
              <option value="₹25,00,000+/mo">₹25,00,000+ / month</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs text-[#5A564E] dark:text-[#BDB7AA]">
              <span>Selected Modules:</span>
              <span className="font-bold text-[#171717] dark:text-[#F7F5F0]">{selectedServices.length} Services</span>
            </div>

            {totals.discountPercent > 0 && (
              <div className="flex justify-between text-xs text-[#2E7D32] dark:text-[#4ADE80] font-semibold bg-[#EBF5EC] dark:bg-[#1C2E1E] p-2.5 rounded-xl border border-[#A5D6A7] dark:border-[#2E5E32]">
                <span>Multi-Module Bundle Discount:</span>
                <span>-{totals.discountPercent}% OFF</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#DCD6C9] dark:border-[#38352F] flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#5A564E] dark:text-[#BDB7AA] block">Est. Agency Retainer</span>
                {totals.discountPercent > 0 && (
                  <span className="text-xs text-[#8C877C] line-through">
                    ₹{totals.rawTotal.toLocaleString('en-IN')}/mo
                  </span>
                )}
              </div>
              <div className="text-3xl font-black text-[#8C7343] dark:text-[#C7B082]">
                ₹{totals.discountedTotal.toLocaleString('en-IN')}
                <span className="text-xs text-[#5A564E] dark:text-[#BDB7AA] font-normal">/mo</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#5A564E] dark:text-[#BDB7AA]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80] shrink-0" />
              <span>Includes Dedicated Growth Strategist</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80] shrink-0" />
              <span>Live Looker Analytics Dashboard Access</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80] shrink-0" />
              <span>No Long-Term Lock-in (Month-to-month after 90 days)</span>
            </div>
          </div>

          <button
            disabled={selectedServices.length === 0}
            onClick={() =>
              onOpenBookingWithQuote({
                services: selectedServices.map(
                  (id) => SERVICES_DATA.find((s) => s.id === id)?.title || id
                ),
                monthlyBudget: budgetRange,
                totalMonthlyEstimate: `₹${totals.discountedTotal.toLocaleString('en-IN')}/mo`,
              })
            }
            className="w-full py-3.5 px-6 rounded-xl bg-[#B39A6B] hover:bg-[#9E8557] text-[#171717] font-bold text-sm shadow-md shadow-[#B39A6B]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span>Request Custom Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
