# Born India Research — Design System

Born India Research is an independent real-estate investment research firm in India. It is not a broker: it takes no commissions and holds no listings. It does the groundwork — cities, micro-markets, registry records, developers, site visits — and hands the client an honest brief so the client can decide. Its audience is capital-rich and time-poor: engineers, doctors and founders who have earned real wealth and have no weekends to spend with brokers.

The firm is at day one. The brand should read *early, careful and honest* — not *big, slick and confident*.

## Sources given
- A single sample marketing HTML page pasted into the brief (Fraunces + Inter, cream/gold, pill buttons). **Supplied for copy and information architecture only** — the user stated it was content reference, not art direction. Its copy is carried through; its styling is not.
- No logo files, no codebase, no Figma, no font files, no imagery. Everything visual here was authored for this system.
- Contact of record: jyotsna@bornindiaresearch.com · Born India Research Pvt Ltd, India.

---

## Visual foundations

**The idea:** a printed research record. Warm paper, warm-black ink, hairline rules, numbered sections, mono figures. Nothing shouts; authority comes from precision and restraint. Explicitly *not* a fintech app and *not* a property portal.

**Colour.** A warm-paper ground (`--paper` #F7F4EC) with warm-black ink (`--ink-900` #15130E) — never pure white or pure black. One brand accent: **laterite** (#A8461D), the red-ochre of Indian soil, used sparingly — a marker number, a rule, one hover fill, one italic word. **Indigo** (#2C3A63) is the quiet support colour for links and data. Semantic colour appears only as a research verdict: verified green, caution ochre, flagged red. At most two background colours in any composition: paper, plus ink for one full-bleed statement band.

**Type.** Display is **Newsreader** at weight 400 (500 for small titles), tight leading and `-0.015em` tracking; its true italic carries emphasis (*clarity*). Body and UI are **Public Sans** 400, a plain contemporary grotesque that keeps the page from reading as a literary essay. Every label, figure, date and serial number is **JetBrains Mono**, 11px uppercase at 0.16em tracking for eyebrows and tabular numerals for data. The signature is that three-way split: editorial serif for statements, neutral sans for prose, machine mono for anything measured. Prose is capped at `--measure-prose` (66ch), leads at 46ch.

**Spacing & layout.** 4px base, ten steps. Sections breathe at 96px, cards pad at 32px, page max 1120px with a 24px gutter. Layouts are asymmetric two-column grids (statement left, facts right) rather than centred hero stacks — the sample's centred layout was deliberately abandoned as generic.

**Backgrounds.** Flat warm paper. No gradients, no photographic hero, no texture overlays, no illustration. Full-bleed is reserved for the ink statement band. If photography is ever added it should be documentary — daylight, unstyled sites and streets, warm-neutral grade, no stock-optimism.

**Corners, borders, shadows.** Radii are near-square: 2px on buttons, inputs and tags; 4px on cards; 8px on modals. **Nothing is a pill.** Structure comes from 1px hairlines (`--line` inside cards, `--line-strong` for section rules), not from elevation. `--shadow-1` is barely there; `--shadow-2` is for overlays only. Cards are hairline + flat fill + 32px padding.

**Transparency & blur.** Only one place: the modal backdrop, `rgba(21,19,14,.42)`. No frosted glass, no translucent nav.

**Motion.** 120–200ms, `cubic-bezier(.2,.6,.3,1)`, colour and border only. No bounce, no scale, no parallax, no scroll-triggered reveals. A research document does not animate.

**States.** Hover: primary button darkens ink → laterite; secondary darkens its border to ink; icon buttons fill with `--paper-sunk`; links go laterite. Press: no transform, no shrink — the colour simply holds. Focus: 1px laterite border plus `--shadow-focus` (3px laterite at 22%). Disabled: 40% opacity, no colour change.

## Content fundamentals

Second person, present tense, short sentences. Address the reader as **you**; the firm is **we**. Contractions are welcome ("don't", "we're"). Never exclamation marks, never emoji, never title-case headlines — sentence case throughout, with mono uppercase reserved for labels.

The voice states a limit as readily as a finding. Say what was checked, when, and what could not be confirmed. Numbers always carry a source and a date. Claims are specific ("11 site visits, Jun–Jul 2026"), never superlative.

- **Yes:** "We do the groundwork." · "The decision always stays yours." · "We're early. Building slowly, honestly, the right way." · "Where we couldn't verify something on the ground, we say so plainly."
- **No:** "Unlock exponential returns" · "India's #1 property platform" · "Trusted by thousands" · "Limited slots — act now" · any 🚀.

Section headings are nouns, not questions ("How it works", "Risks & unknowns", "Methodology & sources"). Legal-adjacent lines are plain, not shouty: "Research, not advice · No commissions".

## Iconography

The brand is close to icon-free by choice: rules, numbers and dotted leaders do the signposting an icon set usually would. Where a glyph is genuinely needed, use **Lucide** at 1.5–1.6px stroke, 17–18px, `currentColor`, square line caps — via CDN (`https://unpkg.com/lucide@latest`), since no icon assets were supplied. Never fill an icon, never colour one except with a verdict colour, never place one inside a circle. **No emoji, ever.** Unicode is used typographically only: · middle dots as separators, — em dashes, ₹, – en dashes in ranges. The select caret and the checkbox tick are drawn from CSS/inline SVG rather than an icon font, so no font dependency is introduced.

## Brand marks — none supplied

No logo was provided, and none was invented. The identity is typographic: the wordmark is "Born India Research" set in Newsreader with a mono uppercase descriptor beneath; the compact lockup is mono "B I R" at 0.22em tracking. See `guidelines/brand-wordmark.html`. **If a real mark exists, send it and it will replace the wordmark throughout.** `assets/` is intentionally empty for the same reason — no logos, illustrations or photography were available to copy in.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | The single entry point. Link this. Imports fonts + all tokens. |
| `tokens/fonts.css` | Newsreader, Public Sans, JetBrains Mono (Google Fonts). |
| `tokens/colors.css` | Base palette + semantic aliases. |
| `tokens/typography.css` | Font stacks, composite `font:` shorthands, tracking, measures. |
| `tokens/spacing.css` | 4px scale, gutters, page/measure widths. |
| `tokens/surfaces.css` | Radii, border widths, shadows, easing and durations. |
| `guidelines/*.html` | 19 foundation specimen cards (Colors, Type, Spacing, Brand). |
| `components/actions/` | `Button`, `IconButton`. |
| `components/forms/` | `Input`, `Select`, `Checkbox`. |
| `components/content/` | `Card`, `Badge`, `Tag`, `SectionMarker`, `StatBlock`, `KeyValueRow`, `Callout`. |
| `ui_kits/website/` | Marketing home page, interactive (intake dialog). |
| `ui_kits/research_brief/` | Client-facing research brief reader, interactive. |
| `SKILL.md` | Agent-skill entry point for use outside this workspace. |

**Intentional additions.** No source defined a component inventory, so a small standard set was authored, plus four brand-specific primitives the research work demands: `SectionMarker` (numbered section rule), `StatBlock` (sourced figure), `KeyValueRow` (dotted-leader fact row) and `Callout` (field note). `Badge` tones are named for research verdicts rather than generic success/warning/error.

**Known gaps.** No logo, no photography, no illustration, no data-visualisation spec, no dark mode, no mobile breakpoint documentation, and no real report format to check the research-brief kit against. Each is waiting on source material.

## Using it

```html
<link rel="stylesheet" href="styles.css" />
```

Then style with the tokens directly (`font: var(--type-body)`, `color: var(--text-heading)`, `background: var(--surface-card)`). Components import React only and read tokens through CSS custom properties — no CSS-in-JS, no npm dependencies.
