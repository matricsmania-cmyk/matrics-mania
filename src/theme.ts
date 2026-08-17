/**
 * MatricsMania — Centralized Design System
 * 
 * Theme Specifications:
 * - Background: #070B14 (Main canvas) / #0D1424 (Cards & secondary surfaces)
 * - Elevated surface: #131D33
 * - Primary accent: #2563EB → #8B5CF6 (used sparingly)
 * - Text: White (#FFFFFF / #F8FAFC) + soft slate gray (#94A3B8 / #64748B)
 * - Borders: #1E293B
 */

export interface ColorDefinition {
  name: string;
  hex: string;
  usage: string;
}

export const THEME_PALETTE = {
  // Core Section & Typography Tokens
  primary: {
    name: 'Pure White',
    hex: '#FFFFFF',
    usage: 'Primary typography, headings, high-contrast labels',
  },
  background: {
    name: 'Midnight Void',
    hex: '#070B14',
    usage: 'Main page background canvas and base sections',
  },
  card: {
    name: 'Deep Navy Surface',
    hex: '#0D1424',
    usage: 'Content cards, modules, and elevated containers',
  },
  alternateSection: {
    name: 'Obsidian Slate',
    hex: '#131D33',
    usage: 'Alternate sections, toolbars, and nested containers',
  },
  secondaryText: {
    name: 'Soft Slate Gray',
    hex: '#94A3B8',
    usage: 'Subtitles, body descriptions, metadata, labels',
  },
  borders: {
    name: 'Slate Border',
    hex: '#1E293B',
    usage: 'Borders, subtle card boundaries, dividers',
  },
  accent: {
    name: 'Royal Blue',
    hex: '#2563EB',
    usage: 'Primary accent, key buttons, subtle indicators',
  },
  accentPurple: {
    name: 'Electric Violet',
    hex: '#8B5CF6',
    usage: 'Accent gradient endpoint, glow effects, highlight badges',
  },
  accentHover: {
    name: 'Royal Blue Hover',
    hex: '#1D4ED8',
    usage: 'Hover state for primary action buttons',
  },

  // Supporting status indicators
  success: {
    name: 'Emerald Green',
    hex: '#10B981',
    usage: 'Success indicators and verified tags',
  },
  warningError: {
    name: 'Crimson Red',
    hex: '#EF4444',
    usage: 'Alerts and critical errors',
  },

  // Dark Mode Tokens (Synchronized with primary palette)
  dark: {
    background: '#070B14',
    surface: '#0D1424',
    surfaceSubtle: '#131D33',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    borders: '#1E293B',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    success: '#10B981',
    warningError: '#EF4444',
  }
} as const;

/**
 * Common Tailwind Semantic Utility Class Mappings
 */
export const THEME_CLASSES = {
  // Page & Backgrounds
  page: 'bg-[#070B14] text-[#FFFFFF]',
  sectionNormal: 'bg-[#070B14]',
  sectionAlternate: 'bg-[#0D1424]',
  sectionImpact: 'bg-[#131D33] text-[#FFFFFF]',
  
  // Surfaces & Cards
  card: 'bg-[#0D1424] border border-[#1E293B]',
  cardSubtle: 'bg-[#131D33] border border-[#1E293B]',
  glassNavbar: 'backdrop-blur-xl bg-[#070B14]/90 border-b border-[#1E293B]',
  modalBackdrop: 'bg-[#070B14]/85 backdrop-blur-md',
  
  // Typography
  textPrimary: 'text-[#FFFFFF]',
  textSecondary: 'text-[#94A3B8]',
  textMuted: 'text-[#64748B]',
  
  // Borders
  border: 'border-[#1E293B]',
  
  // Interactive Buttons & CTAs
  ctaPrimary: 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer',
  ctaSecondary: 'bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-white font-semibold transition-colors cursor-pointer',
  
  // Badges & Subtle Indicators
  badgeAccent: 'bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/30',
  badgeSuccess: 'bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30',
} as const;

/**
 * Raw Color HEX Constant Map
 */
export const COLORS = {
  PRIMARY: '#FFFFFF',
  BACKGROUND: '#070B14',
  CARD: '#0D1424',
  ALTERNATE_SECTION: '#131D33',
  SECONDARY_TEXT: '#94A3B8',
  BORDER: '#1E293B',
  ACCENT: '#2563EB',
  ACCENT_PURPLE: '#8B5CF6',
  ACCENT_HOVER: '#1D4ED8',
  
  // Supporting Aliases
  WHITE: '#FFFFFF',
  MIDNIGHT_VOID: '#070B14',
  DEEP_NAVY: '#0D1424',
  OBSIDIAN_SLATE: '#131D33',
  SOFT_SLATE_GRAY: '#94A3B8',
  SLATE_BORDER: '#1E293B',
  ROYAL_BLUE: '#2563EB',
  ELECTRIC_VIOLET: '#8B5CF6',
  SUCCESS_GREEN: '#10B981',
  ERROR_RED: '#EF4444',
} as const;

export const VISUAL_PROPORTIONS = {
  background: '~70%',
  surface: '~20%',
  accent: '~10%',
} as const;

export default {
  palette: THEME_PALETTE,
  proportions: VISUAL_PROPORTIONS,
  classes: THEME_CLASSES,
  colors: COLORS,
};

