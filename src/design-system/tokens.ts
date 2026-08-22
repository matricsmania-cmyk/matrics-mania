/**
 * MatricsMania Design System — Core Design Tokens
 * 
 * Aesthetic Philosophy:
 * - Premium, technical, B2B credibility, performance-oriented.
 * - Restrained palette with high contrast, mathematical rhythm, hairline borders.
 * - Monospace accents for technical telemetry, metadata, and precision indicators.
 * - Strict avoiding of generic SaaS clichés (no rainbow gradients, no cartoonish elements).
 */

export const tokens = {
  // 1. COLORS
  colors: {
    // Canvas & Surface Layers (Dark Midnight Architecture)
    canvas: {
      default: '#070B14',      // Deepest background canvas
      surface: '#0D1424',      // Primary card and container surface
      elevated: '#131D33',     // Elevated panels, toolbars, popovers
      overlay: 'rgba(7, 11, 20, 0.85)', // Modal and drawer backdrops
      subtle: '#090E1A',       // Subtle section background alternate
    },
    
    // Light Mode Fallback Tokens (if required by context)
    lightCanvas: {
      default: '#FFFFFF',
      surface: '#F8FAFC',
      elevated: '#F1F5F9',
      border: '#E2E8F0',
    },

    // Typography Colors
    text: {
      primary: '#FFFFFF',      // High-contrast primary headings and text
      secondary: '#94A3B8',    // Body text, subtitles, detailed descriptions
      muted: '#64748B',        // Metadata, footnotes, timestamps, inactive tabs
      inverse: '#070B14',      // Dark text when placed on bright solid buttons
      brand: '#60A5FA',        // Accent highlighted text
    },

    // Structural Borders & Dividers
    border: {
      hairline: '#1E293B',     // Standard 1px container border
      medium: '#334155',       // Interactive hover border or focused state
      subtle: 'rgba(255, 255, 255, 0.07)', // Ultra-light divider line
      accent: 'rgba(37, 99, 235, 0.5)',   // Focus or active border
    },

    // Brand Accents (Restrained & Purposeful)
    accent: {
      primary: '#2563EB',      // Core Royal Blue brand accent
      primaryHover: '#1D4ED8', // Darker active/hover state
      light: '#60A5FA',        // Light blue for text accents and badges
      subtle: 'rgba(37, 99, 235, 0.12)', // Tinted background for badges
      cyan: '#06B6D4',         // Technical diagnostic accent
      violet: '#8B5CF6',       // Secondary strategic accent (used sparingly)
    },

    // Status & Telemetry Indicators
    status: {
      success: '#10B981',      // Verified data, positive metrics (+280%)
      successBg: 'rgba(16, 185, 129, 0.10)',
      warning: '#F59E0B',      // In-progress, benchmark warnings
      warningBg: 'rgba(245, 158, 11, 0.10)',
      error: '#EF4444',        // Critical errors, failed audits
      errorBg: 'rgba(239, 68, 68, 0.10)',
      info: '#3B82F6',         // Informational notices
      infoBg: 'rgba(59, 130, 246, 0.10)',
    },
  },

  // 2. TYPOGRAPHY
  typography: {
    fonts: {
      sans: "'Plus Jakarta Sans', 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Roboto Mono', Menlo, Monaco, Consolas, monospace",
    },
    
    // Type Scale (Major Second 1.125 / Perfect Fourth 1.333 hybrid for dense B2B precision)
    sizes: {
      '2xs': { size: '10px', lineHeight: '14px', tracking: '0.05em' },
      xs: { size: '12px', lineHeight: '16px', tracking: '0.02em' },
      sm: { size: '14px', lineHeight: '20px', tracking: '0.01em' },
      base: { size: '16px', lineHeight: '24px', tracking: '0em' },
      lg: { size: '18px', lineHeight: '28px', tracking: '-0.01em' },
      xl: { size: '20px', lineHeight: '28px', tracking: '-0.01em' },
      '2xl': { size: '24px', lineHeight: '32px', tracking: '-0.02em' },
      '3xl': { size: '30px', lineHeight: '36px', tracking: '-0.02em' },
      '4xl': { size: '36px', lineHeight: '44px', tracking: '-0.025em' },
      '5xl': { size: '48px', lineHeight: '56px', tracking: '-0.03em' },
      '6xl': { size: '60px', lineHeight: '68px', tracking: '-0.035em' },
      '7xl': { size: '72px', lineHeight: '80px', tracking: '-0.04em' },
    },

    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // 3. SPACING & RHYTHMIC SCALE
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
  },

  // 4. CONTAINER WIDTHS
  containers: {
    narrow: '760px',   // Long-form editorial, insight research, case studies
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',     // Standard structured layout
    '2xl': '1380px',   // Wide expansive dashboards and technical grids
    full: '100%',
  },

  // 5. BORDER RADII (Capped for technical precision — no overly round balloon shapes)
  radii: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',        // Standard inner elements, badges, small buttons
    lg: '8px',        // Primary buttons, technical cards
    xl: '12px',       // Standard containers and panels
    '2xl': '16px',     // Maximum radius for hero cards and feature modules
    full: '9999px',   // Pills and circular avatar tags only
  },

  // 6. SHADOWS (Subtle dark elevation without artificial neon glows)
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.45), 0 2px 4px -1px rgba(0, 0, 0, 0.30)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.55), 0 4px 6px -2px rgba(0, 0, 0, 0.35)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.65), 0 10px 10px -5px rgba(0, 0, 0, 0.40)',
    inner: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
    accent: '0 8px 24px -4px rgba(37, 99, 235, 0.25)',
  },

  // 7. TRANSITIONS & TIMING
  transitions: {
    fast: '150ms cubic-bezier(0.16, 1, 0.3, 1)',
    standard: '200ms cubic-bezier(0.16, 1, 0.3, 1)',
    smooth: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
    timing: {
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    },
  },

  // 8. RESPONSIVE BREAKPOINTS
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type DesignTokens = typeof tokens;
