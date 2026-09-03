# Design system: josuediazflores.com

Cinematic restraint on a light canvas. Apple-grade minimalism, black-and-white only, one typeface, generous radii. Heritage shows up in Spanish chapter labels and one dark "Raíces" card, never in color or motif.

## Palette (monochrome only)

| Token | Hex | Use |
| --- | --- | --- |
| canvas | `#fafaf8` | page background |
| surface | `#ffffff` | cards on canvas, with `1px solid rgba(0,0,0,0.06)` border |
| surface-2 | `#f0efeb` | tinted cards, chips, hover fill |
| ink | `#1d1d1f` | primary text, dark cards, primary buttons |
| ink-2 | `#424245` | body copy on white |
| ink-3 | `#6e6e73` | labels, metadata, secondary text, link hover |
| on-dark | `#fafaf8` | text on `ink` cards |
| on-dark-2 | `rgba(250,250,248,0.72)` | body on dark |
| on-dark-3 | `rgba(250,250,248,0.55)` | meta on dark |
| rule | `rgba(0,0,0,0.06)` light / `rgba(250,250,248,0.14)` dark | dividers |

Heatmap scale (5 steps): `#f0efeb` `#d2d2d0` `#a3a3a1` `#5c5c5e` `#1d1d1f`.

No accent color. Hover on links goes `ink → ink-3`; hover on icon buttons inverts (`surface-2 → ink`).

## Typography

Single family: **Space Grotesk** (400, 500, 600, 700), system sans fallback.

| Role | Size | Weight | Tracking | Line height |
| --- | --- | --- | --- | --- |
| Hero name | `clamp(64px, 8.5vw, 136px)` | 500 | -0.035em | 0.9 |
| Section h2 | `clamp(34px, 4vw, 56px)` | 500 | -0.035em | 1.08 |
| Card title | `clamp(26px, 2.4vw, 36px)` | 600 | -0.02em | 1.1 |
| Row title | 22px | 600 | -0.02em | — |
| Lede | 21px | 400 | -0.01em | 1.45 |
| Body | 17px | 400 | — | 1.6 |
| Card body | 15px | 400 | — | 1.55 |
| Meta / chips | 13px | 400–500 | — | — |
| Section label | 13px | 500 | 0.08em, uppercase | — |
| Panel key | 12px | 500 | 0.08em, uppercase | — |

Headlines use `text-wrap: balance`; paragraphs `text-wrap: pretty`. Body copy max-width 420–680px.

## Shape

| Element | Radius |
| --- | --- |
| Large cards, hero photo, project cards | 28px |
| Standard cards, panels, photos in cards | 24px |
| Small tiles | 20px |
| Chips, pills, nav, buttons, icon buttons | 999px |
| Heatmap cells | 2px |

Borders only on white-on-canvas cards. No shadows except the floating nav (`0 8px 30px rgba(0,0,0,0.06)`).

## Spacing

Container `max-width: 1160px`, side padding `clamp(20px, 4vw, 32px)`. Section padding `clamp(64px, 8vw, 100px)` vertical. Grid gap 20px. Card padding 32px (`clamp(24px, 3vw, 32px)` on rows). Section label → h2: 20px. h2 → content: 48px.

## Layout patterns

- **Nav**: fixed pill, top 20px, centered, `rgba(255,255,255,0.72)` + `backdrop-filter: blur(20px)`. Items 8px 14px, hover fill `surface-2`.
- **Hero**: 2-col `auto-fit minmax(320px, 1fr)`; text column is a space-between flex column; photo column fills, grayscale, radius 28.
- **About**: flex-wrap row; 2/3 white copy card + 1/3 tinted toolkit card; full-width heatmap card below.
- **Projects**: `auto-fit minmax(300px, 1fr)` grid. Card is a clickable div, min-height `min(400px, 90vw)`. On open it spans `1 / -1` and reveals a What / How / Result panel below a hairline rule, plus stack chips and pill buttons. One dark card, one tinted, two white.
- **Experience**: single white card, rows separated by `rule`, each row flex-wrap: date (150px) · role · summary.
- **Raíces**: dark `ink` card, italic-free headline, family photo uncropped in a 20px-radius frame.
- **Writing**: same card grid as projects, no expand.
- **Footer**: oversized CTA (`clamp(36px, 5vw, 72px)`, 600, -0.03em) + meta row.

## Chapter labels

`I · Sobre mí`, `II · Proyectos`, `III · Experiencia`, `IV · Raíces`, `V · Escritos`. Spanish stays in these labels only; all headings and copy are English. Nav uses English.

## Imagery

Photos are grayscale (`filter: grayscale(1) contrast(1.05)`), no captions, no overlays. Placeholders use a diagonal hairline pattern on `surface-2` / `ink`.

## Motion

- **Film grain**: fixed overlay, fractal-noise SVG, `opacity: 0.035`, `mix-blend-mode: multiply`. Tweakable off.
- **Hero entrance**: name lines rise from `translateY(110%)` inside clipped wrappers, 1.1s, staggered 0.12s (`cubic-bezier(.2,.8,.2,1)`); label and lede fade up 1s; photo un-masks via `clip-path: inset(6%) → inset(0)`, 1.4s.
- **Card expand**: `document.startViewTransition` around the state change; each card has a `view-transition-name`; group animation 0.5s, same easing; root snapshots disabled.
- **Hover**: cards `translateY(-4px)`, 0.3s ease.
- `prefers-reduced-motion: reduce` disables all animation.

## Voice

Understated, practical, first person. Short declaratives. No superlatives, no em dashes (use colons, commas, or a new sentence). Headlines are plain nouns: "Projects.", "Writing.", "Where I've worked."

## Files

- `Landing.dc.html`: the site
- `Project - Crouton.dc.html`: one deep-dive case study
- `handoff-notes.md`: live heatmap integration, outstanding links
