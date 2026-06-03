import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#b9d9e6',
  '--slot4-page-text': '#10203a',
  '--slot4-panel-bg': 'rgba(223, 242, 249, 0.68)',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#637083',
  '--slot4-soft-muted-text': '#788599',
  '--slot4-accent': '#0b5483',
  '--slot4-accent-fill': '#0b5483',
  '--slot4-accent-soft': '#d8edf8',
  '--slot4-dark-bg': '#111827',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#77b8dc',
  '--slot4-cream': '#d7edf7',
  '--slot4-warm': '#b9d9e6',
  '--slot4-lavender': '#9ed0e8',
  '--slot4-gray': '#e1f3fb',
  '--slot4-body-gradient': 'linear-gradient(90deg, #c2deea 0%, #9ed0e8 42%, #3da3d5 100%)',
  '--editable-container': '1200px',
  '--editable-border': 'rgba(255,255,255,0.35)',
  '--editable-topbar': '#bfe1ee',
  '--editable-nav': 'rgba(149, 203, 226, 0.58)',
  '--editable-nav-dark': '#0b5483',
  '--editable-link': '#0b5483',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/20',
  shadow: 'shadow-none',
  shadowStrong: 'shadow-none',
  overlay: 'bg-black/55',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-0',
    sectionY: 'py-10',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_364px]',
    rail: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
    minRailCard: 'min-w-0',
  },
  type: {
    eyebrow: 'text-xs font-normal uppercase tracking-normal',
    heroTitle: 'text-3xl font-light leading-tight sm:text-4xl',
    sectionTitle: 'text-[26px] font-light leading-tight text-[#25324a]',
    body: 'text-sm leading-7',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    soft: `border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: `inline-flex items-center justify-center ${editablePalette.accentBg} px-7 py-3 text-sm font-normal text-white transition hover:bg-[#235d2c]`,
    secondary: `inline-flex items-center justify-center border ${editablePalette.border} bg-white px-7 py-3 text-sm font-normal ${editablePalette.accentText} transition hover:bg-[var(--slot4-panel-bg)]`,
    accent: `inline-flex items-center justify-center bg-[var(--editable-topbar)] px-7 py-3 text-sm font-normal text-white transition hover:bg-[#337a4d]`,
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-square',
  },
  motion: {
    lift: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(36,87,42,0.14)]',
    fade: 'transition duration-200 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Keep all data sourced from existing post props and task feed helpers.',
  'Only change editable files for visual redesign work.',
  'Use a blue rounded classified-marketplace layout with search, categories, and listing cards.',
  'Render missing image, category, summary, and price values with safe fallbacks.',
  'Preserve exported component and function names used by route wrappers.',
] as const
