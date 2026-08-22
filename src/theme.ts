'use client';

/**
 * MatricsMania — Centralized Design System Bridge
 * 
 * Re-exports core tokens and classes from /src/design-system/
 * for unified design consistency across all pages and components.
 */

import { tokens } from './design-system/tokens';

export * from './design-system';

export const THEME_PALETTE = {
  primary: {
    name: 'Pure White',
    hex: tokens.colors.text.primary,
    usage: 'Primary typography, headings, high-contrast labels',
  },
  background: {
    name: 'Midnight Void',
    hex: tokens.colors.canvas.default,
    usage: 'Main page background canvas and base sections',
  },
  card: {
    name: 'Deep Navy Surface',
    hex: tokens.colors.canvas.surface,
    usage: 'Content cards, modules, and elevated containers',
  },
  alternateSection: {
    name: 'Obsidian Slate',
    hex: tokens.colors.canvas.elevated,
    usage: 'Alternate sections, toolbars, and nested containers',
  },
  secondaryText: {
    name: 'Soft Slate Gray',
    hex: tokens.colors.text.secondary,
    usage: 'Subtitles, body descriptions, metadata, labels',
  },
  borders: {
    name: 'Slate Border',
    hex: tokens.colors.border.hairline,
    usage: 'Borders, subtle card boundaries, dividers',
  },
  accent: {
    name: 'Royal Blue',
    hex: tokens.colors.accent.primary,
    usage: 'Primary accent, key buttons, subtle indicators',
  },
  accentPurple: {
    name: 'Electric Violet',
    hex: tokens.colors.accent.violet,
    usage: 'Accent highlight badges, indicator endpoints',
  },
  accentHover: {
    name: 'Royal Blue Hover',
    hex: tokens.colors.accent.primaryHover,
    usage: 'Hover state for primary action buttons',
  },
  success: {
    name: 'Emerald Green',
    hex: tokens.colors.status.success,
    usage: 'Success indicators and verified tags',
  },
  warningError: {
    name: 'Crimson Red',
    hex: tokens.colors.status.error,
    usage: 'Alerts and critical errors',
  },
  dark: {
    background: tokens.colors.canvas.default,
    surface: tokens.colors.canvas.surface,
    surfaceSubtle: tokens.colors.canvas.elevated,
    textPrimary: tokens.colors.text.primary,
    textSecondary: tokens.colors.text.secondary,
    borders: tokens.colors.border.hairline,
    accent: tokens.colors.accent.primary,
    accentHover: tokens.colors.accent.primaryHover,
    success: tokens.colors.status.success,
    warningError: tokens.colors.status.error,
  },
} as const;

export const THEME_CLASSES = {
  page: 'bg-[#070B14] text-[#FFFFFF]',
  sectionNormal: 'bg-[#070B14]',
  sectionAlternate: 'bg-[#0D1424]',
  sectionImpact: 'bg-[#131D33] text-[#FFFFFF]',
  card: 'bg-[#0D1424] border border-[#1E293B]',
  cardSubtle: 'bg-[#131D33] border border-[#1E293B]',
  glassNavbar: 'backdrop-blur-xl bg-[#0D1424]/90 border-b border-[#1E293B]',
  modalBackdrop: 'bg-[#070B14]/85 backdrop-blur-md',
  textPrimary: 'text-[#FFFFFF]',
  textSecondary: 'text-[#94A3B8]',
  textMuted: 'text-[#64748B]',
  border: 'border-[#1E293B]',
  ctaPrimary: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer',
  ctaSecondary: 'bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-white font-semibold transition-colors cursor-pointer',
  badgeAccent: 'bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/30',
  badgeSuccess: 'bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30',
} as const;

export const COLORS = {
  PRIMARY: tokens.colors.text.primary,
  BACKGROUND: tokens.colors.canvas.default,
  CARD: tokens.colors.canvas.surface,
  ALTERNATE_SECTION: tokens.colors.canvas.elevated,
  SECONDARY_TEXT: tokens.colors.text.secondary,
  BORDER: tokens.colors.border.hairline,
  ACCENT: tokens.colors.accent.primary,
  ACCENT_PURPLE: tokens.colors.accent.violet,
  ACCENT_HOVER: tokens.colors.accent.primaryHover,
  WHITE: '#FFFFFF',
  MIDNIGHT_VOID: tokens.colors.canvas.default,
  DEEP_NAVY: tokens.colors.canvas.surface,
  OBSIDIAN_SLATE: tokens.colors.canvas.elevated,
  SOFT_SLATE_GRAY: tokens.colors.text.secondary,
  SLATE_BORDER: tokens.colors.border.hairline,
  ROYAL_BLUE: tokens.colors.accent.primary,
  ELECTRIC_VIOLET: tokens.colors.accent.violet,
  SUCCESS_GREEN: tokens.colors.status.success,
  ERROR_RED: tokens.colors.status.error,
} as const;

export const VISUAL_PROPORTIONS = {
  background: '~70%',
  surface: '~20%',
  accent: '~10%',
} as const;

export default {
  tokens,
  palette: THEME_PALETTE,
  proportions: VISUAL_PROPORTIONS,
  classes: THEME_CLASSES,
  colors: COLORS,
};
