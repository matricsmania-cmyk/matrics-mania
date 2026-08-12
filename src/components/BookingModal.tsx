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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Schedule Your Free Growth Consultation</h3>
            <p className="text-xs text-slate-400 mt-1">30-Minute 1-on-1 Strategy Session with a Senior Marketing Lead</p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                <div className="p-3.5 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-blue-200 space-y-1">
                  <span className="font-bold text-blue-400 block">Prefilled Strategic Context:</span>
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
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                  1. Select Consultation Date & Time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" /> Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" /> Available Time Slot
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-xs font-semibold uppercase text-slate-400">
                  2. Your Contact & Company Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Company Website Domain</label>
                  <input
                    type="text"
                    placeholder="e.g. company.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Primary Growth Goal or Challenge</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us briefly about your current marketing goals, ad budget, or key bottlenecks..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-extrabold text-white">Your Call is Booked!</h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                We have emailed a Google Meet calendar invitation to <strong className="text-white">{email}</strong> for <strong className="text-white">{selectedDate} at {selectedTime}</strong>.
              </p>
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 max-w-md mx-auto text-xs text-slate-400 space-y-1">
                <div>📅 Date: {selectedDate}</div>
                <div>⏰ Time: {selectedTime}</div>
                <div>👤 Assigned Strategist: Marcus Vance (Founder & Growth Director)</div>
              </div>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
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
