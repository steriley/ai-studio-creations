---
name: Sovereign Food Ledger
colors:
  surface: '#fff8f3'
  surface-dim: '#e1d9d2'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2eb'
  surface-container: '#f5ece5'
  surface-container-high: '#efe7e0'
  surface-container-highest: '#e9e1da'
  on-surface: '#1e1b17'
  on-surface-variant: '#454650'
  inverse-surface: '#34302b'
  inverse-on-surface: '#f8efe8'
  outline: '#757681'
  outline-variant: '#c5c6d1'
  surface-tint: '#495b99'
  primary: '#001854'
  on-primary: '#ffffff'
  primary-container: '#1b2f6b'
  on-primary-container: '#8799db'
  inverse-primary: '#b6c4ff'
  secondary: '#8a5100'
  on-secondary: '#ffffff'
  secondary-container: '#ffa538'
  on-secondary-container: '#6c3e00'
  tertiary: '#0e1b44'
  on-tertiary: '#ffffff'
  tertiary-container: '#25315b'
  on-tertiary-container: '#8e9aca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#314380'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#ffb86d'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#683c00'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b9c4f7'
  on-tertiary-fixed: '#0b1841'
  on-tertiary-fixed-variant: '#39456f'
  background: '#fff8f3'
  on-background: '#1e1b17'
  surface-variant: '#e9e1da'
  canvas-cream: '#FBF6EA'
  surface-card: '#F3ECDB'
  surface-paper: '#F7F0DF'
  border-buff: '#D9CFB8'
  tier-approved: '#1E7A4E'
  tier-approved-bg: '#E8F5EE'
  tier-consideration: '#C27803'
  tier-consideration-bg: '#FEF5E7'
  tier-assessed: '#5A6474'
  tier-assessed-bg: '#F0F2F5'
  tier-rejected: '#B92B27'
  tier-rejected-bg: '#FDF0F0'
  tier-reluctant: '#7C3A82'
  tier-reluctant-bg: '#F7EEF8'
  tier-archived: '#71717A'
  tier-archived-bg: '#F4F4F5'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  title-editorial:
    fontFamily: Playfair Display
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  ledger-subhead:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.12em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 23px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 19px
  label-ledger:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-button:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system embodies the identity of a confident, witty food publication infused with the dry, bureaucratic grandeur of a mock-official British committee. It balances authoritative food journalism with procedural irony: official decrees, ledger registry marks, strict inspection criteria, and ceremonial verdicts.

The aesthetic fuses **Editorial Broadsheet** with **Bureaucratic Heritage**:
- Tactile warmth evokes heavy rag paper, archival ledgers, and official parliamentary gazettes.
- Sharp editorial serif typography commands intellectual respect, contrasted against utilitarian humanist sans interfaces designed for fastidious ledger filtering and map navigation.
- Subtle physical metaphors—wax stamps, embossed borders, reference ledger numbers (`#29`, `REG-2024-MCR`), and ink rules—anchor modern web tooling in historical pedigree.

## Colors

The palette establishes an archival institutional atmosphere without sacrificing readability:
- **Primary Navy (`#1B2F6B`)**: Derived from committee insignia roundels, utilized for dominant headings, authoritative interactive surfaces, primary frames, and active filter tabs.
- **Deep Ledger Navy (`#111E47`)**: Anchors deep structural areas such as the jurisdictional footer, ceremonial callouts, and solemn dark badges.
- **Accent Amber/Gold (`#F29A2E`)**: Reserved for committee wax stamps, map markers, star ratings, and accent borders. Amber text must never sit directly upon cream backgrounds; it is strictly deployed as solid badge fills hosting navy text, or as vector icons/borders.
- **Surfaces & Borders**: The ground is not stark white, but a calibrated sequence of `canvas-cream` (`#FBF6EA`), layered with `surface-card` (`#F3ECDB`) and framed by delicate 1px `border-buff` (`#D9CFB8`) rules.
- **Semantic Verdict Tiers**: Committee verdicts follow rigorous chromatic categorisation (Approved Forest Emerald, Consideration Warm Gold, Slate Neutral, Crimson Rejection, Plum Reluctance, and Archived Slate).

## Typography

The typography pairing contrasts high-society editorial gravity against crisp modern civic usability:
- **Headlines & Venue Names (`Playfair Display`)**: Conveys established culinary broadsheet gravitas. Used for prominent restaurant names, manifestos, committee proclamations, and section headers.
- **Interface & Ledgers (`Plus Jakarta Sans`)**: Delivers high legibility across compact data views, distance counters, inspection tables, and interactive controls.
- **Ledger Metadata**: Formal references, committee case IDs, and classification tags leverage `ledger-subhead` set in uppercase with tracked spacing (`letter-spacing: 0.12em`) to mimic official registry marks.

## Layout & Spacing

The layout balances a structured civic broadsheet with responsive data discovery:
- **Grid Architecture**: A 12-column layout on desktop (max width 1440px) collapsing to 8 columns on tablet and 4 columns on mobile devices.
- **Rhythm**: Density is calibrated around standard 4px increments with `0.875rem` (`14px`) serving as default component padding for filter pills and ledger items to maintain a compact, directory-like density.
- **Panels & Dividers**: Content clusters are cordoned using delicate horizontal hairline rules (`1px solid #D9CFB8`) and bounded ledger margins rather than arbitrary empty vertical space.

## Elevation & Depth

Visual hierarchy does not use exaggerated digital floating shadows. Instead, it relies on archival paper stacking and crisp delineation:
- **Tonal Layering**: Depth is achieved by placing cards (`#F3ECDB`) over base cream (`#FBF6EA`), outlined with 1px buff borders (`#D9CFB8`).
- **Paper Shadow**: Elevated items (such as the Sticky Filter Bar, Map Inspector drawer, or Member Modals) utilize a subtle, warm-tinted paper shadow: `0 3px 12px -2px rgba(22, 19, 15, 0.08), 0 1px 3px 0 rgba(22, 19, 15, 0.04)`.
- **Active / Pressed Tactility**: Active buttons and selected filter pills sink inward with a 1px border shift and high-contrast navy backdrop rather than rising via drop shadow.
- **Ceremonial Ribbons & Headers**: The top committee banner and footer use deep contrast layering (`#111E47` and `#1B2F6B`) to firmly bookend the lighter archival canvas.

## Shapes

The interface balances formal stationery edges with contemporary ergonomic friendliness:
- **Standard Radius (0.5rem / 8px to 0.75rem / 12px)**: Applied to all venue cards, inspector popups, search containers, and modal sheets.
- **Pill Badges (`9999px`)**: Reserved for committee status chips, verdict counters, and registry tag markers.
- **Wax Seals & Roundels**: Pure circular geometry (`50%` radius) is dedicated exclusively to base pins, map venue numbers (`#01`), committee crest insignias, and inspection grade tokens.

## Components

### Buttons
- **Primary Action (Decree Button)**: `#1B2F6B` background, white text, 8px border radius, 1px `#111E47` border. Hover transitions to `#111E47` with subtle amber outline indicator.
- **Secondary Action (Civic Ledger Button)**: Transparent background, 1px `#D9CFB8` border, `#16130F` text. Hover shifts to `#F3ECDB` surface.
- **Ceremonial / Manifesto Button**: Deep crimson/navy hybrid with `#F29A2E` border accents for high-priority civic proclamations.

### Chips & Verdict Filter Badges
- Encapsulated pills featuring a leading dot indicator (e.g., emerald for Approved, amber for Consideration, red for Rejected).
- Inactive state: `#FBF6EA` background, 1px `#D9CFB8` border, muted slate/navy text.
- Active state: Saturated solid tone matching the verdict tier background with crisp darkened typography (e.g. `Approved` turns `#1E7A4E` background with white text, or pale `#E8F5EE` with `#1E7A4E` border and ink).

### Ledger Venue Cards
- Background: `#F3ECDB`. Border: 1px solid `#D9CFB8`. Corner radius: `12px`.
- Header: Venue name set in `Playfair Display`, paired with ledger registration sequence (e.g., `#04 - SPINNINGFIELDS`) set in `Plus Jakarta Sans` 11px uppercase bold.
- Meta rows: Ruled by 1px bottom border `#D9CFB8`. Displays walking isochrone distance, inspection tier, and price ledger notation (`£`, `££`, `£££`).

### Search & Ledger Input Fields
- Background: `#FFFFFF` or `#F7F0DF` inset.
- Border: 1px `#D9CFB8` shifting to 1.5px `#1B2F6B` on focus ring with zero synthetic blue glow.
- Placeholder text in muted slate (`#5A6474`), styled with official ledger terminology ("Search ledger e.g. Bada Bing, Ramen, Slice").

### Map Pins & Isochrone Controls
- Venue pins are circular amber or dark navy roundels containing numbered ledger references (`#1`, `#15`).
- Walking isochrone control pills use color-coded contour keys with exact minute and mileage references.