import React, { useState } from 'react';
import { PageType } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onShowToast }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [domain, setDomain] = useState('');
  const [serviceInterest, setServiceInterest] = useState('SEO & Organic Performance');
  const [budget, setBudget] = useState('₹2,50,000 - ₹10,00,000/mo');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState<'blr' | 'mum' | 'delhi'>('blr');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      onShowToast('Required fields missing', 'Please provide your name and work email.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onShowToast(
        'Inquiry Submitted!',
        `Thank you ${fullName}. Our senior growth team will contact you within 2 hours.`,
        'success'
      );
    }, 1000);
  };

  const offices = {
    blr: {
      city: 'Bengaluru (India HQ)',
      address: 'Indiranagar 100ft Road, 4th Block, Bengaluru, Karnataka 560038',
      phone: '+91 (80) 4567-8900',
      timeZone: 'IST (UTC+5:30)',
      localTime: '11:30 AM IST',
    },
    mum: {
      city: 'Mumbai Office',
      address: 'Bandra Kurla Complex (BKC), Level 12, Mumbai, Maharashtra 400051',
      phone: '+91 (22) 6789-0123',
      timeZone: 'IST (UTC+5:30)',
      localTime: '11:30 AM IST',
    },
    delhi: {
      city: 'Delhi NCR Office',
      address: 'DLF Cyber City, Tower B, Gurugram, Haryana 122002',
      phone: '+91 (124) 456-7890',
      timeZone: 'IST (UTC+5:30)',
      localTime: '11:30 AM IST',
    },
  };

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white max-w-4xl mx-auto tracking-tight">
          Let’s Discuss Your Next <span className="gradient-text-primary">Growth Breakthrough</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you need a full technical audit, a high-ROAS ad funnel, or a custom analytics dashboard, we are ready to build your solution.
        </p>
      </section>

      {/* MAIN FORM & CONTACT DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Request Your Free Growth Audit & Proposal
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Guaranteed response in under 2 hours during business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Inquiry Received!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you <strong className="text-slate-900 dark:text-white">{fullName}</strong>. One of our Senior Growth Strategists will review <strong className="text-slate-900 dark:text-white">{domain || 'your company website'}</strong> and send over your custom audit report to <strong className="text-slate-900 dark:text-white">{email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Sterling"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Website Domain</label>
                  <input
                    type="text"
                    placeholder="e.g. mycompany.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Growth Focus</label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="SEO & Organic Performance">SEO & Organic Performance</option>
                    <option value="Paid Acquisition (PPC Ads)">Paid Acquisition (PPC Ads)</option>
                    <option value="Social Media & Viral Content">Social Media & Viral Content</option>
                    <option value="Conversion Optimization & Web Dev">Conversion Optimization & Web Dev</option>
                    <option value="Marketing Intelligence & GA4">Marketing Intelligence & GA4</option>
                    <option value="Full Omnichannel Growth Package">Full Omnichannel Growth Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Monthly Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Under ₹2,50,000/mo">Under ₹2,50,000 / month</option>
                    <option value="₹2,50,000 - ₹10,00,000/mo">₹2,50,000 - ₹10,00,000 / month</option>
                    <option value="₹10,00,000 - ₹25,00,000/mo">₹10,00,000 - ₹25,00,000 / month</option>
                    <option value="₹25,00,000+/mo">₹25,00,000+ / month</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Message or Project Scope</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your current CAC, conversion goals, or timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Request...' : 'Submit Growth Request'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Contact Info & Calendar Booking Prompt */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Schedule Call Block */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white">Prefer to talk live right away?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Skip the email back-and-forth and select a 30-minute window directly on our founder's calendar.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Schedule Live Strategy Session</span>
            </button>
          </div>

          {/* Contact Details Cards */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Agency Contact Lines</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Email Inquiries</span>
                  <a href="mailto:hello@matricsmania.com" className="text-slate-500 dark:text-slate-400 hover:text-blue-500">
                    hello@matricsmania.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Direct Phone Line</span>
                  <span className="text-slate-500 dark:text-slate-400">+91 (80) 4567-8900</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Operating Hours</span>
                  <span className="text-slate-500 dark:text-slate-400">Monday – Saturday: 9:00 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Response Guarantee: Under 2 Hours</span>
            </div>
          </div>

          {/* Office Location Switcher */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" /> Indian Regional Offices
            </h3>

            <div className="flex gap-2">
              {(['blr', 'mum', 'delhi'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveOffice(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeOffice === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {key === 'blr' ? 'Bengaluru' : key === 'mum' ? 'Mumbai' : 'Delhi NCR'}
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
              <p className="font-bold text-slate-900 dark:text-white">{offices[activeOffice].city}</p>
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                {offices[activeOffice].address}
              </p>
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                Local Time: {offices[activeOffice].localTime}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
