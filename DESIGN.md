---
name: Groundwork
description: Independent city research for Indian property, by Born India Research
colors:
  paper: "#f7f4ec"
  paper-sunk: "#f0ece0"
  surface: "#fffdf8"
  ink-900: "#15130e"
  ink-700: "#3a362c"
  ink-500: "#6b6455"
  ink-300: "#9c9484"
  ink-100: "#cfc8b8"
  line: "#e6e0d2"
  line-strong: "#d6cfbe"
  laterite-700: "#7f3413"
  laterite-600: "#8c3915"
  laterite-500: "#a8461d"
  laterite-200: "#e6cbbc"
  laterite-100: "#f3e4db"
  indigo-600: "#222c4b"
  indigo-500: "#2c3a63"
  indigo-200: "#c3c8d8"
  indigo-100: "#e3e5ee"
  verified-500: "#3e6047"
  verified-100: "#e2ebe3"
  caution-500: "#8a6516"
  caution-100: "#f3eada"
  flag-500: "#8c2f22"
  flag-100: "#f4e2df"
  text-on-dark: "#f2eee3"
  text-on-dark-muted: "#a49b89"
typography:
  display:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.028em"
    fontVariation: "optical sizing auto (opsz 6..72)"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 2.875rem)"
    fontWeight: 400
    lineHeight: 1.10
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.014em"
  body:
    fontFamily: "'Public Sans', -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.16em"
  figure:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "2.125rem"
    fontWeight: 400
    lineHeight: 1.05
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
  8: "64px"
  9: "96px"
  10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.surface}"
    rounded: "{rounded.xs}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.laterite-600}"
    textColor: "{colors.surface}"
  button-accent:
    backgroundColor: "{colors.laterite-500}"
    textColor: "{colors.surface}"
    rounded: "{rounded.xs}"
    padding: "14px 26px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.xs}"
    padding: "14px 26px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.sm}"
    padding: "32px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-900}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "7px 11px"
---

# Design System: Groundwork

## Overview

**Creative North Star: "The Surveyor's Field Notebook"**

Groundwork looks like a record someone walked the site to produce. Ground truth, measured
and written down: every figure carries its source and its date, and where a figure does not
exist yet the gap is marked as a gap rather than filled with an estimate that looks like
data. The laterite accent is Indian soil — the literal ground the work is about — and it is
used sparingly enough that it still reads as a mark, not a brand wash.

The system is warm, flat and quiet. Paper rather than white, ink rather than black,
hairline rules rather than shadows, and monospace for every number so figures align down a
column and can be compared by eye. Density is editorial: generous measure for prose,
tight and tabular for data. Nothing on the page is trying to convert you — the argument is
that the research is real, and the design's job is to make that legible and let it be
filed.

Its authority is documentary, not promotional. **Confirmed anti-references, all four
rejected outright:** a listing portal (99acres / MagicBricks), a proptech SaaS dashboard,
a broker's brochure, and a government portal. The first contradicts our own claim to verify
against sub-registrar records rather than portal listings; the second is the generic
AI-startup look; the third makes us the seller when our entire value is independence; the
fourth confuses statutory *sourcing* with statutory *styling*.

**Key Characteristics:**
- Warm paper ground (`#f7f4ec`), never pure white; ink (`#15130e`), never pure black
- Hairline rules carry structure; shadows are nearly absent
- Monospace for every figure, label and date — numbers are the content
- Every metric carries a `status`: `sourced`, `desk` (illustrative), or `gap`
- No gradients, no glass, no pills, no stock photography

## Colors

A warm, low-chroma palette: one earth accent doing brand work, one cool accent for links,
and a three-colour verdict set that appears only on data.

### Primary
- **Laterite** (`#a8461d`): the brand mark and the single accent. Focus rings, the globe's
  India fill, key rules, hover on primary buttons. `laterite-600` (`#8c3915`) for accented
  text so it clears contrast on paper; `laterite-100` (`#f3e4db`) as a tint ground.

### Secondary
- **Registry Indigo** (`#2c3a63`): links and citations only. Cool against the warm ground so
  a source reference reads as a different kind of thing from a brand statement.

### Tertiary — the verdict set
Used exclusively to qualify data, never decoratively.
- **Verified Green** (`#3e6047` on `#e2ebe3`): a sourced figure, its provenance shown.
- **Caution Ochre** (`#8a6516` on `#f3eada`): a desk estimate, explicitly illustrative.
- **Flag Red** (`#8c2f22` on `#f4e2df`): a contradiction or a gap worth naming.

### Neutral
- **Paper** (`#f7f4ec`): page ground. **Paper Sunk** (`#f0ece0`): recessed wells, map ground.
  **Surface** (`#fffdf8`): cards, lifted a half-step off the page by warmth, not shadow.
- **Ink 900** (`#15130e`) headings · **Ink 700** (`#3a362c`) body · **Ink 500** (`#6b6455`)
  muted · **Ink 300** (`#9c9484`) faint · **Ink 100** (`#cfc8b8`) landmass fill.
- **Line** (`#e6e0d2`) hairlines · **Line Strong** (`#d6cfbe`) structural rules.

### Named Rules

**The Ground Truth Rule.** Colour on a figure is a claim about its provenance. Green means
sourced and dated, ochre means desk estimate, red means gap or conflict. Never use the
verdict set decoratively, and never show a figure in verdict colour without its source.

**The Scarce Accent Rule.** Laterite is the only brand colour. If it covers more than
roughly a tenth of a viewport it has stopped being a mark and become a wash.

**The No Pure Values Rule.** Never `#fff`, never `#000`. The ground is paper and the mark
is ink; pure values break the warmth the whole system rests on.

## Typography

**Display Font:** Newsreader (Georgia, Times New Roman, serif) — variable, with a real
optical-size axis (`opsz 6..72`) that is enabled.
**Body Font:** Public Sans (-apple-system, Segoe UI, sans-serif)
**Label / Figure Font:** JetBrains Mono (ui-monospace, SF Mono)

**Character:** A serif that reads as a printed report, a neutral grotesque that gets out of
its way, and a monospace that makes numbers a first-class citizen. The mono is not a
developer affectation here — it is what lets a column of ₹/sqft figures be compared down
the page.

### Hierarchy
- **Display** (400, `clamp(2.75rem, 6vw, 4.75rem)`, 1.04, `-0.028em`): page-opening
  statements. One per page.
- **Headline** (400, `clamp(2rem, 4vw, 2.875rem)`, 1.10, `-0.022em`): section openers.
- **Title** (500, `1.625rem`, 1.2, `-0.014em`): card and panel heads.
- **Body** (400, `1rem`, 1.65, `0`): prose, capped at `66ch` (`--measure-prose`); lead
  paragraphs at `46ch`.
- **Label** (500, `0.6875rem`, `0.16em`, uppercase, mono): eyebrows, axis labels, units,
  provenance lines.
- **Figure** (400, `2.125rem`, 1.05, mono): headline numbers.

### Named Rules

**The Size-Specific Tracking Rule.** Tracking is a function of size, never a constant.
Display `-0.028em`, headline `-0.022em`, title `-0.014em`, UI `-0.006em`, body `0`, small
`+0.006em`, label `+0.16em`. A single `letter-spacing` across the scale is wrong at both
ends. Floor is `-0.04em`; never tighter.

**The Eyebrow Rule — a deliberate exception.** Uppercase mono eyebrow labels above headings
are **correct here and must not be removed.** General design guidance treats the eyebrow as
an AI-default tell; in this system it is a print convention carried over on purpose — it is
the section mark in a research document, and it is what lets a label state a unit or a
provenance without competing with the heading. It is scoped to `--type-label` in mono with
`0.16em` tracking, never a sans-serif eyebrow in the accent colour. **The brief wins over
the generic pattern warning.**

**The Numbers Are Mono Rule.** Every figure, date, unit and source line is monospace.
Prose is never mono; numbers are never proportional.

## Layout

A single centred column, `--page-max: 1120px`, `--gutter: 24px`. The spacing scale is ten
steps from 4px to 128px, used with more space above a heading than below it so sections
group by proximity rather than by rule. Section rhythm sits at steps 7–9 (48/96/128px);
intra-card rhythm at 3–5 (12/16/24px).

Grids collapse at three breakpoints: 1000px (two-column and hero grids go single; nav links
hide), 720px (three-, four- and six-up grids go single), 420px (stat rows stack). Cards are
deliberately *not* all the same size — the city detail panel is asymmetric against the
card list, because a uniform grid of equal tiles is the dashboard look this system rejects.

Type scale is in `rem` against a `100%` root so a reader's own text-size setting scales the
page with it.

## Elevation & Depth

**This system is flat.** Depth comes from tonal layering and hairlines, not shadows.
Three grounds do the work: `paper-sunk` (recessed), `paper` (page), `surface` (lifted).
A card is distinguished from the page by being *warmer and lighter*, plus a 1px `line`
border — not by a drop shadow.

### Shadow Vocabulary
- **Ambient card** (`box-shadow: 0 2px 10px rgba(21,19,14,.07)`): reserved for genuinely
  floating elements. Has both offset and soft blur; a coloured halo with no offset is
  decoration, not elevation.
- **Focus ring** (`box-shadow: 0 0 0 3px rgba(168,70,29,.22)`): keyboard focus only.

### Named Rules

**The Hairline First Rule.** Reach for a 1px rule before reaching for a shadow. If a
boundary needs emphasis, use `line-strong`, not elevation.

**The No Glass Rule.** No `backdrop-filter`, no translucent chrome, no frosted panels.
Translucency belongs to a different visual world and would read as the SaaS dashboard this
system rejects.

## Shapes

Near-square. Radii are `2px` (buttons, chips, tags, controls), `4px` (cards, map frame),
`8px` (reserved; rarely used). Nothing is a pill, nothing is a circle except data markers
on the map and globe. Borders are 1px and hairline-coloured; the form language is ruled
paper and set type, not rounded product UI.

## Components

- **Button** — 2px radius, `14px 26px`, Public Sans 500 at 15px, no shadow. Primary is ink
  on paper and goes laterite on hover; accent is laterite; secondary is a hairline outline
  on transparent. Press feedback is a `scale(.975)` on pointer-down, not on release.
- **Card** — surface ground, 1px `line` border, 4px radius, 32px padding. Hover moves the
  border to laterite; the card itself does not lift.
- **Chip** — uppercase mono label, hairline border, 2px radius. Used for globe controls,
  filters and back navigation. Never a coloured pill.
- **Tag** — caption-sized, hairline outline, used for inline qualifiers.
- **Eyebrow** — uppercase mono label above a heading. See the Eyebrow Rule; this is load-
  bearing.
- **Figure block** — mono number at `2.125rem` with a mono provenance line beneath carrying
  source and `as_of` date, plus a status badge from the verdict set.
- **Map / globe** — CARTO light raster tiles brand-tinted with
  `grayscale(1) sepia(.5) saturate(.62)` plus a laterite multiply overlay; pins are real
  buttons with 44px targets; drag-to-pan with momentum, critically damped, no bounce.

**Component philosophy: refined and restrained.** State is communicated through border and
colour, never through lift or scale of the surface itself. The components recede so the
figures don't have to compete with them.

## Do's and Don'ts

**Do**
- Show every figure with its source and date, and mark gaps as gaps
- Use mono for all numbers, labels, units and dates
- Reach for a hairline before a shadow
- Set tracking per size; keep body at `66ch`
- Keep laterite scarce enough to still read as a mark
- Keep eyebrow labels — they are the section mark of a research document

**Don't**
- No pure white or pure black
- No gradients, gradient text, glass, or `backdrop-filter`
- No pills, no fully rounded cards, no drop shadows for ordinary surfaces
- No stock photography, skylines, or aspirational lifestyle imagery
- No uniform grids of equal-size metric tiles (the dashboard tell)
- No verdict colour on a figure that has no source
- Never present a desk estimate in a way that could be read as sourced data
