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

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
  onRetry?: (attempt: number, maxRetries: number, error: Error) => void;
}

export interface ContactSubmissionProvider {
  submitQualification(
    data: ContactQualificationData,
    retryOptions?: RetryOptions
  ): Promise<ContactSubmissionResult>;
}

export class TransientSubmissionError extends Error {
  public status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'TransientSubmissionError';
    this.status = status;
  }
}

export function isTransientError(err: unknown): boolean {
  if (!err) return false;
  if (err instanceof TransientSubmissionError) return true;

  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    if (
      err.name === 'AbortError' ||
      err.name === 'TimeoutError' ||
      msg.includes('failed to fetch') ||
      msg.includes('network error') ||
      msg.includes('networkerror') ||
      msg.includes('connection reset') ||
      msg.includes('econnreset') ||
      msg.includes('etimedout') ||
      msg.includes('temporary') ||
      msg.includes('gateway timeout') ||
      msg.includes('service unavailable') ||
      msg.includes('bad gateway')
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Production Next.js API Relay Provider.
 * Communicates directly with /api/contact, which validates and relays the lead
 * to Google Sheets via authenticated Google Apps Script.
 */
export class ApiContactSubmissionProvider implements ContactSubmissionProvider {
  async submitQualification(
    data: ContactQualificationData,
    retryOptions?: RetryOptions
  ): Promise<ContactSubmissionResult> {
    const maxRetries = retryOptions?.maxRetries ?? 2;
    let delayMs = retryOptions?.initialDelayMs ?? 600;
    const backoff = retryOptions?.backoffFactor ?? 1.5;

    let attempt = 0;

    while (true) {
      attempt++;
      try {
        return await this.executeSingleSubmission(data);
      } catch (err: any) {
        const transient = isTransientError(err);
        const canRetry = transient && attempt <= maxRetries;

        if (canRetry) {
          if (retryOptions?.onRetry) {
            retryOptions.onRetry(attempt, maxRetries, err);
          }
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          delayMs = Math.round(delayMs * backoff);
          continue;
        }

        throw err;
      }
    }
  }

  private async executeSingleSubmission(data: ContactQualificationData): Promise<ContactSubmissionResult> {
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

    let res: Response;
    try {
      res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (fetchErr: any) {
      throw new TransientSubmissionError(
        'Network connectivity error while submitting form: ' + (fetchErr.message || 'Failed to fetch')
      );
    }

    if ([408, 502, 503, 504].includes(res.status)) {
      throw new TransientSubmissionError(
        `Temporary server gateway issue (HTTP ${res.status}). Retrying...`,
        res.status
      );
    }

    let resData: { success?: boolean; message?: string; referenceId?: string };
    try {
      resData = await res.json();
    } catch {
      if (res.status >= 500) {
        throw new TransientSubmissionError('Temporary server response parsing error (HTTP ' + res.status + ').');
      }
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
