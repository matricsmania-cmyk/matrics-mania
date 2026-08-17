import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle, Send, Globe, DollarSign } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: {
    domain?: string;
    spend?: string;
    industry?: string;
    projectedRevenue?: string;
    auditScore?: number;
    services?: string[];
    monthlyBudget?: string;
    totalMonthlyEstimate?: string;
  } | null;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefillData,
  onShowToast,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-14');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM EST');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (prefillData?.domain) {
      setDomain(prefillData.domain);
    }
  }, [prefillData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      onShowToast('Missing required fields', 'Please enter your name and email.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmed');
      onShowToast(
        'Strategy Call Scheduled!',
        `Calendar invite sent to ${email} for ${selectedDate} at ${selectedTime}.`,
        'success'
      );
    }, 1200);
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0D1424] border border-[#1E293B] rounded-2xl shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E293B] bg-[#070B14]">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">Schedule Your Free Growth Consultation</h3>
            <p className="text-xs text-[#94A3B8] mt-1">30-Minute 1-on-1 Strategy Session with a Senior Marketing Lead</p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#131D33] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prefill highlights if any */}
              {prefillData && (
                <div className="p-3.5 bg-[#131D33] border border-[#1E293B] rounded-xl text-xs text-[#60A5FA] space-y-1">
                  <span className="font-bold text-[#60A5FA] block">Prefilled Strategic Context:</span>
                  {prefillData.domain && (
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Target Site: {prefillData.domain}
                    </div>
                  )}
                  {prefillData.spend && (
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" /> Target Budget: {prefillData.spend}
                    </div>
                  )}
                  {prefillData.totalMonthlyEstimate && (
                    <div>Custom Quote Estimate: {prefillData.totalMonthlyEstimate}</div>
                  )}
                </div>
              )}

              {/* Step 1: Date & Time Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#94A3B8] mb-2">
                  1. Select Consultation Date &amp; Time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" /> Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#60A5FA]" /> Available Time Slot
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option value="09:00 AM EST">09:00 AM EST</option>
                      <option value="10:00 AM EST">10:00 AM EST</option>
                      <option value="01:30 PM EST">01:30 PM EST</option>
                      <option value="03:00 PM EST">03:00 PM EST</option>
                      <option value="05:00 PM EST">05:00 PM EST</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Contact Info */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase text-[#94A3B8]">
                  2. Your Contact &amp; Company Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white mb-1">Company Website Domain</label>
                  <input
                    type="text"
                    placeholder="e.g. company.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white mb-1">Primary Growth Goal or Challenge</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us briefly about your current marketing goals, ad budget, or key bottlenecks..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#070B14] border border-[#1E293B] rounded-xl p-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span>Reserving Calendar Slot...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm Strategy Call</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-[#10B981]/10 text-[#34D399] rounded-full flex items-center justify-center mx-auto border border-[#10B981]/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-extrabold text-white">Your Call is Booked!</h4>
              <p className="text-[#94A3B8] text-sm max-w-md mx-auto">
                We have emailed a Google Meet calendar invitation to <strong className="text-white">{email}</strong> for <strong className="text-white">{selectedDate} at {selectedTime}</strong>.
              </p>
              <div className="p-4 bg-[#070B14] rounded-xl border border-[#1E293B] max-w-md mx-auto text-xs text-[#94A3B8] space-y-1">
                <div>📅 Date: {selectedDate}</div>
                <div>⏰ Time: {selectedTime}</div>
                <div>👤 Assigned Strategist: Senior Growth Director</div>
              </div>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
