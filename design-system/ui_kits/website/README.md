# UI kit — marketing website

The public site for Born India Research, rebuilt on the design system.

| File | What it is |
| --- | --- |
| `index.html` | Runnable, interactive home page. Open it directly. |
| `Home.jsx` | Page composition: hero, belief band, how-it-works, brief contents, who-it's-for. |
| `SiteChrome.jsx` | `Wordmark`, `SiteHeader`, `SiteFooter`. |
| `IntakeDialog.jsx` | "Get in touch" modal with a two-state (form → received) flow. |
| `Primitives.jsx` | Browser-global mirror of `/components` so the kit runs with no bundler. Keep in sync. |

**Interactions:** header and hero "Get in touch" open the intake dialog; Send switches it to the received state; Cancel / backdrop / Close dismiss it. "See a sample brief" links to the research-brief kit.

**Source:** the client's sample HTML supplied the copy and information architecture. Its Fraunces/Inter + pill-button styling was replaced by the system's Newsreader / IBM Plex / square-corner language.
