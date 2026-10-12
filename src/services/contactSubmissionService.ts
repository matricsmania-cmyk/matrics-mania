/**
 * MatricsMania High-Ticket Contact & Qualification Submission Abstraction
 * 
 * This service provides a decoupled contract for qualification intake data.
 * It is structured so that CRM integrations (HubSpot, Salesforce, Webhooks, 
 * or WordPress Headless REST APIs) can be connected later without changing UI components.
 */

export interface ContactQualificationData {
  // Personal & Verification
  name: string;
  email?: string;
  workEmail?: string;
  role?: string;
  phone?: string;

  // Company & Domain
  company?: string;
  companyName?: string;
  website?: string;
  companyWebsite?: string;
  country: string;
  industry?: string;

  // Growth Economics
  approximateAnnualRevenue?: string;
  approximateMarketingBudget?: string;
  currentAcquisitionChannels?: string[];
  services?: string[];

  // Technical Scope & Architecture
  serviceInterest?: string;
  primaryGrowthProblem?: string;
  timeline?: string;
  additionalContext?: string;
  note?: string;

  // Conditional Sub-telemetry (derived from service interest / growth problem)
  specificFocusDetails?: {
    estimatedMonthlyTraffic?: string;
    primaryAdSpendPlatforms?: string[];
    crawlScalePages?: string;
    cmsOrTechStack?: string;
  };

  // Telemetry & Session Metadata
  qualificationTier?: 'enterprise_priority' | 'growth_accelerator' | 'advisory_review';
  source?: string;
  submittedAt?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  referenceId: string;
  qualificationTier: 'enterprise_priority' | 'growth_accelerator' | 'advisory_review';
  estimatedResponseTime: string;
  message: string;
  data: ContactQualificationData;
}

export interface ContactSubmissionProvider {
  submitQualification(data: ContactQualificationData): Promise<ContactSubmissionResult>;
}

/**
 * Production Next.js API Relay Provider.
 * Communicates directly with /api/contact, which validates and relays the lead
 * to Google Sheets via authenticated Google Apps Script.
 */
export class ApiContactSubmissionProvider implements ContactSubmissionProvider {
  async submitQualification(data: ContactQualificationData): Promise<ContactSubmissionResult> {
    const payload = {
      name: data.name.trim(),
      email: (data.email || data.workEmail || '').trim(),
      phone: (data.phone || '').trim(),
      country: (data.country || '').trim(),
      services: data.services && data.services.length > 0
        ? data.services
        : (data.currentAcquisitionChannels || []),
      companyWebsite: (data.companyWebsite || data.website || '').trim(),
      companyName: (data.companyName || data.company || '').trim(),
      industry: (data.industry || '').trim(),
      note: (data.note || data.additionalContext || '').trim(),
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let resData: { success?: boolean; message?: string; referenceId?: string };
    try {
      resData = await res.json();
    } catch {
      throw new Error('Received an unexpected response from the submission server.');
    }

    if (!res.ok || resData.success !== true) {
      throw new Error(resData.message || 'Submission could not be completed. Please try again.');
    }

    const referenceId = resData.referenceId || `MM-LEAD-${Math.floor(10000 + Math.random() * 90000)}`;

    const result: ContactSubmissionResult = {
      success: true,
      referenceId,
      qualificationTier: 'enterprise_priority',
      estimatedResponseTime: 'Within 2 Hours (Priority Architect SLA)',
      message: resData.message || 'Intake recorded successfully in Google Sheets.',
      data: {
        ...data,
        qualificationTier: 'enterprise_priority',
        submittedAt: new Date().toISOString(),
      },
    };

    // Store in localStorage if in browser environment for session persistence
    if (typeof window !== 'undefined') {
      try {
        const historyKey = 'mm_qualification_submissions';
        const existing = JSON.parse(localStorage.getItem(historyKey) || '[]');
        existing.unshift(result);
        localStorage.setItem(historyKey, JSON.stringify(existing.slice(0, 10)));
      } catch (err) {
        console.warn('Could not persist qualification submission to localStorage', err);
      }
    }

    return result;
  }
}

/**
 * Fallback In-Memory / Mock Provider for local development or sandbox testing.
 */
export class MockContactSubmissionProvider implements ContactSubmissionProvider {
  async submitQualification(data: ContactQualificationData): Promise<ContactSubmissionResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `MM-MOCK-${randomSuffix}`;

    return {
      success: true,
      referenceId,
      qualificationTier: 'enterprise_priority',
      estimatedResponseTime: 'Within 2 Hours (Priority Architect SLA)',
      message: 'Intake specification successfully logged (Mock mode).',
      data: {
        ...data,
        submittedAt: new Date().toISOString(),
      },
    };
  }
}

// Active singleton provider defaulting to production API Relay
let activeProvider: ContactSubmissionProvider = new ApiContactSubmissionProvider();

/**
 * Retrieve the current submission provider instance.
 */
export function getContactSubmissionProvider(): ContactSubmissionProvider {
  return activeProvider;
}

/**
 * Configure or swap the active submission provider (e.g. for future HubSpot, Webhook or API provider).
 */
export function setContactSubmissionProvider(provider: ContactSubmissionProvider): void {
  activeProvider = provider;
}
