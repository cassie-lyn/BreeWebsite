# Project memory — Happy Horses RI

Marketing website for **Briana "Bree" Dolbec**, a MagnaWave-certified PEMF therapy
practitioner (horses = specialty, dogs welcome), mobile across RI + nearby MA
(~40mi of Providence). Built by Cassie for her friend Bree.

## Primary goal
Get booking inquiries into Bree's email inbox. The booking form (Web3Forms) is the
key conversion. Bree is **accepting new clients** — that message is featured.
(Say "clients," never "patients" — Cassie finds "patients" too vet-clinical.)

## Stack
Astro 5 (static) · Tailwind CSS v4 via `@tailwindcss/vite` (NOT `@astrojs/tailwind`)
· `@astrojs/sitemap` · self-hosted `@fontsource` (Lora display, swapped from Fraunces
because Cassie disliked its lowercase "f"; Nunito Sans body)
· `astro:assets` images · vanilla JS only (mobile nav). Web3Forms for the form.

## Single source of truth
`src/config.ts` — business name (PLACEHOLDER "Happy Horses RI"), phone and email
(PLACEHOLDERS — this repo is public; Bree is deciding between her personal
contact info and Google Voice + a business email, so real details stay out of
the repo until then), service area, and the Web3Forms key.
Rename/re-contact = edit this one file.

## Design tokens (`src/styles/global.css` @theme)
pine `#2E4A3B` (primary) · saddle `#B07D4F` (accent) · cream `#FAF6F0` (bg) ·
charcoal `#2A2A26` (text) · sage `#9DB29A` (secondary). Motifs: rounded-arch photo
frames (`.arch-frame`), pulse-wave divider, "Now Accepting New Clients" pill.

## Open TODOs / pending real info
- **Web3Forms key** is a placeholder (`YOUR-ACCESS-KEY-HERE`) — form won't deliver
  until Cassie adds a real key. See README §2.
- **Package pricing** ($210 / $400 in `src/pages/services.astro`) is placeholder —
  confirm with Bree. Search `TODO: confirm pricing with Bree`.
- **Testimonials** on Home are placeholders. Search `PLACEHOLDER TESTIMONIALS`.
- ~~MagnaWave badge~~ RESOLVED: official seal in use (`src/assets/magnawave-seal.png`,
  180x180 source, don't render larger than 180).
- **No custom domain yet** — `site`/`url` = `https://breewebsite.pages.dev`.
- **Video** `PEMF_VID.MOV` omitted (no ffmpeg on build machine). README §5 has the
  conversion command to add it later.

## Deploy
Cloudflare Pages, auto-deploy on push to `main` of `cassie-lyn/BreeWebsite`.
Build `npm run build`, output `dist`. Details in README §3.

## Copy guidelines
Warm + professional for horse people. Not girly, not rustic-cowboy. Always frame
PEMF as **complementary wellness, not a substitute for veterinary care**.
**Em dashes: use sparingly, never at the cost of warmth.** Cassie first asked for
them all removed, then restored the ones whose replacements read abrupt (bare
periods chopping a flowing sentence). Rule of thumb: prefer commas or flowing
rewrites; keep an em dash when removing it would make the copy stiff. Never use
em dashes or colons inside testimonial quotes.
**CSS gotcha:** custom base styles MUST live in `@layer base` (see
`src/styles/global.css`). Unlayered CSS beats all Tailwind utilities in v4; this
once made every heading pine-on-pine (invisible) on green backgrounds.
