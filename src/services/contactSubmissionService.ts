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
  workEmail: string;
  role?: string;
  phone?: string;

  // Company & Domain
  company: string;
  website: string;
  country: string;
  industry: string;

  // Growth Economics
  approximateAnnualRevenue: string;
  approximateMarketingBudget: string;
  currentAcquisitionChannels: string[];

  // Technical Scope & Architecture
  serviceInterest: string;
  primaryGrowthProblem: string;
  timeline: string;
  additionalContext?: string;

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
 * Default In-Memory / Client-Side Mock Provider.
 * Stores submission locally for session verification and simulates realistic architectural SLA response.
 */
export class MockContactSubmissionProvider implements ContactSubmissionProvider {
  async submitQualification(data: ContactQualificationData): Promise<ContactSubmissionResult> {
    // Simulate network latency (400-800ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate unique diagnostic intake reference ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `MM-QUAL-${randomSuffix}`;

    // Determine qualification tier based on budget and revenue
    let qualificationTier: 'enterprise_priority' | 'growth_accelerator' | 'advisory_review' = 'advisory_review';
    let estimatedResponseTime = 'Under 4 Business Hours';

    const isEnterpriseBudget =
      data.approximateMarketingBudget.includes('$30k') ||
      data.approximateMarketingBudget.includes('$50k') ||
      data.approximateMarketingBudget.includes('$100k');

    const isEnterpriseRev =
      data.approximateAnnualRevenue.includes('$10M') ||
      data.approximateAnnualRevenue.includes('$50M') ||
      data.approximateAnnualRevenue.includes('$250M');

    if (isEnterpriseBudget || isEnterpriseRev) {
      qualificationTier = 'enterprise_priority';
      estimatedResponseTime = 'Within 2 Hours (Priority Architect SLA)';
    } else if (
      data.approximateMarketingBudget.includes('$10k') ||
      data.approximateAnnualRevenue.includes('$2M')
    ) {
      qualificationTier = 'growth_accelerator';
      estimatedResponseTime = 'Under 3 Business Hours';
    }

    const result: ContactSubmissionResult = {
      success: true,
      referenceId,
      qualificationTier,
      estimatedResponseTime,
      message: 'Intake specification successfully logged. Principal Architect dispatched.',
      data: {
        ...data,
        qualificationTier,
        submittedAt: new Date().toISOString(),
      },
    };

    // Store in localStorage if in browser environment for audit persistence
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

// Singleton Provider instance
let activeProvider: ContactSubmissionProvider = new MockContactSubmissionProvider();

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
