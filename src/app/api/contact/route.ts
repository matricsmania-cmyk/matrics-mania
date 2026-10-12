import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * ============================================================================
 * GOOGLE SHEETS / APPS SCRIPT CONTACT INTAKE ROUTE HANDLER
 * ============================================================================
 *
 * Endpoint: POST /api/contact
 *
 * Secure server-side relay connecting the Next.js single-page contact form
 * directly to Google Sheets via an authenticated Google Apps Script Web App.
 *
 * Security & Reliability Invariants:
 * 1. Server-side only: Reads GOOGLE_APPS_SCRIPT_URL and GOOGLE_APPS_SCRIPT_SECRET.
 *    Secrets are NEVER exposed to client bundles, browser networks, or error responses.
 * 2. Fail-closed: If environment variables are unconfigured, fails immediately with HTTP 500.
 * 3. Rate Limiting: Sliding-window in-memory limiter per client IP address.
 * 4. Spam Honeypot: Rejects automated bots populating invisible honeypot parameters.
 * 5. Input Sanitization: Strict field length, regex email validation, and request size checks.
 * 6. Redirect Handling: Transparently follows Google Apps Script HTTP 302 redirections.
 * 7. Lead Deduplication: Fails safe without blind automated retries.
 */

// In-memory rate limiting map: ip -> timestamps[]
// Protects individual serverless instances from burst abuse
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up expired IP entries periodically
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}

// RFC 5322 compliant email validator
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Server-Side Environment Secret Configuration (Fail-Closed)
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
    const scriptSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET?.trim();

    if (!scriptUrl || !scriptSecret) {
      console.error('[Contact API Error] GOOGLE_APPS_SCRIPT_URL or GOOGLE_APPS_SCRIPT_SECRET is missing from environment variables.');
      return NextResponse.json(
        {
          success: false,
          message: 'Contact service is temporarily misconfigured. Please try again later or reach out via email.',
        },
        {
          status: 500,
          headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
        }
      );
    }

    // 2. Request Size Validation (Max 64 KB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json(
        { success: false, message: 'Request payload exceeds allowable size limits.' },
        { status: 413 }
      );
    }

    // 3. Client IP Extraction and In-Memory Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (req.headers.get('x-real-ip')?.trim() || 'unknown');

    const now = Date.now();
    if (Math.random() < 0.1) {
      cleanupRateLimitMap();
    }

    const timestamps = (rateLimitMap.get(clientIp) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions received from this network. Please wait a moment before trying again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }
    timestamps.push(now);
    rateLimitMap.set(clientIp, timestamps);

    // 4. Parse JSON Payload
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Malformed JSON payload. Please verify your submission format.' },
        { status: 400 }
      );
    }

    // 5. Spam Honeypot Detection
    // If hidden bot fields are populated, silently reject without forwarding to Google Sheets
    if (body._gotcha || body.website_confirm || body.bot_field) {
      console.warn('[Contact API Security] Spam honeypot triggered by automated submission.');
      return NextResponse.json(
        { success: false, message: 'Automated submission rejected.' },
        { status: 400 }
      );
    }

    // 6. Validate & Sanitize Form Fields
    const rawName = typeof body.name === 'string' ? body.name.trim() : '';
    const rawEmail = typeof body.email === 'string' ? body.email.trim() : (typeof body.workEmail === 'string' ? body.workEmail.trim() : '');
    const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const rawCountry = typeof body.country === 'string' ? body.country.trim() : '';
    const rawWebsite = typeof body.companyWebsite === 'string' ? body.companyWebsite.trim() : (typeof body.website === 'string' ? body.website.trim() : '');
    const rawCompanyName = typeof body.companyName === 'string' ? body.companyName.trim() : (typeof body.company === 'string' ? body.company.trim() : '');
    const rawIndustry = typeof body.industry === 'string' ? body.industry.trim() : '';
    const rawNote = typeof body.note === 'string' ? body.note.trim() : '';

    // Services parsing: can be an array of strings or comma-separated
    let rawServices: string[] = [];
    if (Array.isArray(body.services)) {
      rawServices = body.services
        .filter((s): s is string => typeof s === 'string')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    } else if (typeof body.services === 'string' && body.services.trim().length > 0) {
      rawServices = [body.services.trim()];
    }

    // Validate Required Fields: Name
    if (!rawName || rawName.length < 1 || rawName.length > 120) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid contact name (maximum 120 characters).' },
        { status: 400 }
      );
    }

    // Validate Required Fields: Email
    if (!rawEmail || rawEmail.length > 254 || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid corporate work email address.' },
        { status: 400 }
      );
    }

    // Validate Required Fields: Phone
    if (!rawPhone || rawPhone.length < 5 || rawPhone.length > 35) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid direct phone number (5 to 35 characters).' },
        { status: 400 }
      );
    }

    // Validate Required Fields: Country
    if (!rawCountry || rawCountry.length < 1 || rawCountry.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid country or region.' },
        { status: 400 }
      );
    }

    // Validate Required Fields: Services
    if (rawServices.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please select at least one service required for your project.' },
        { status: 400 }
      );
    }

    // Limit individual service string length
    const cleanServices = rawServices.slice(0, 25).map((s) => s.slice(0, 150));

    // Optional Fields length constraints
    const cleanWebsite = rawWebsite ? rawWebsite.slice(0, 250) : '';
    const cleanCompanyName = rawCompanyName ? rawCompanyName.slice(0, 150) : '';
    const cleanIndustry = rawIndustry ? rawIndustry.slice(0, 100) : '';
    const cleanNote = rawNote ? rawNote.slice(0, 3000) : '';

    // 7. Assemble Google Apps Script Payload
    // Expected contract: { secret, name, email, phone, country, services, companyWebsite, companyName, industry, note }
    const upstreamPayload = {
      secret: scriptSecret,
      name: rawName,
      email: rawEmail,
      phone: rawPhone,
      country: rawCountry,
      services: cleanServices,
      companyWebsite: cleanWebsite,
      companyName: cleanCompanyName,
      industry: cleanIndustry,
      note: cleanNote,
    };

    // 8. Forward to Google Apps Script Web App Endpoint
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 15000);

    let upstreamRes: Response;
    try {
      upstreamRes = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(upstreamPayload),
        redirect: 'follow', // Follow 302 redirection returned by Google Apps Script
        signal: abortController.signal,
        cache: 'no-store',
      });
    } catch (networkErr: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (networkErr as { name?: string })?.name === 'AbortError';
      console.error(`[Contact API Upstream Error] Failed to connect to Google Apps Script: ${isAbort ? 'Timeout (15s)' : 'Network unreachable'}`);
      return NextResponse.json(
        {
          success: false,
          message: 'Unable to reach the intake recording service. Please try again or email info@matricsmania.com directly.',
        },
        { status: isAbort ? 504 : 502 }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    // 9. Parse and Verify Upstream Response
    const rawResponseText = await upstreamRes.text();
    let upstreamData: { success?: boolean; message?: string } | null = null;

    try {
      upstreamData = JSON.parse(rawResponseText);
    } catch {
      console.error(`[Contact API Upstream Error] Non-JSON response received from Apps Script (HTTP ${upstreamRes.status}).`);
      return NextResponse.json(
        {
          success: false,
          message: 'Intake service returned an unexpected response format. Please retry shortly.',
        },
        { status: 502 }
      );
    }

    // 10. Check that Google Apps Script explicitly acknowledged success: true
    if (!upstreamRes.ok || !upstreamData || upstreamData.success !== true) {
      console.warn(`[Contact API Upstream Rejection] Apps Script rejected submission. Message: ${upstreamData?.message || 'Unknown'}`);
      return NextResponse.json(
        {
          success: false,
          message: upstreamData?.message || 'We were unable to record your inquiry at this time. Please try again.',
        },
        { status: 502 }
      );
    }

    // 11. Generate Client Reference Token for Tracking & Confirmation
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `MM-LEAD-${randomSuffix}`;

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: upstreamData.message || 'Enquiry recorded successfully.',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (unexpectedErr) {
    console.error('[Contact API Fatal Error] Unhandled exception occurred during contact intake execution:', unexpectedErr instanceof Error ? unexpectedErr.message : 'Unknown');
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected internal error occurred while processing your submission. Please try again.',
      },
      { status: 500 }
    );
  }
}
