# UI kit — research brief reader

A real desk-stage brief: **M3M Capital Walk, Sector 113, Gurugram (Dwarka Expressway)**, prepared for Manushivam Maheshwari, BIR-2026-021, issued 2 Aug 2026.

| File | What it is |
| --- | --- |
| `index.html` | Runnable reader, responsive from 360px up. Contents rail switches sections; claims-register rows are selectable; Download PDF raises a toast. |
| `Brief.jsx` | Shell: sticky bar, contents rail, section switching. |
| `Sections.jsx` | `Summary`, `Claims`, `Pricing`, `Risks`, `Method` + the claims dataset. |
| `BriefChrome.jsx` | `BriefBar`, `Contents`. |

Primitives are loaded from `../website/Primitives.jsx`.

## About the numbers

Every figure was read from public web sources on 2 Aug 2026 and is attributed in the brief itself: portal rates from 99acres (Dwarka Expressway), corridor history via Magicbricks reporting, and the asset-level claims from five channel-partner listings for M3M Capital Walk. **They are quoted, not endorsed** — the whole point of the sample is that the brief marks conflicting and unverified claims rather than averaging them into a clean number. Nothing has been checked against the Haryana RERA portal or the sub-registrar record, and the brief says so.

Mobile: below 900px the contents rail becomes a horizontal tab strip and every two-column split stacks; below 600px the stat row goes single-column.
