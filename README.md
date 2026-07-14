# Happy Horses RI — PEMF Therapy Website

Marketing site for **Briana "Bree" Dolbec**, a MagnaWave-certified PEMF therapy
practitioner serving horses and dogs across Rhode Island and nearby Massachusetts.

Built with **Astro 5** (static), **Tailwind CSS v4**, self-hosted fonts, and a
**Web3Forms** booking form. Deploys free on **Cloudflare Pages**.

> **"Happy Horses RI" is a placeholder business name.** To rename the whole site,
> change one line in `src/config.ts` (see below).

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 18+ installed. Then, in this folder:

```bash
npm install      # first time only — installs dependencies
npm run dev      # start a local preview at http://localhost:4321
```

Open the printed URL in your browser. Edits to files save and refresh live.

Other commands:

```bash
npm run build            # produce the final site in dist/ (what Cloudflare runs)
npm run preview          # preview the built site locally
npm run prepare-images   # re-process the source photos (only if you add/replace photos)
```

---

## 2. Turn on the booking form (IMPORTANT — 2 minutes)

The **Book a Session** form is wired up but needs a free access key before it can
deliver emails. Until you add one, submissions won't reach Bree.

1. Go to **[web3forms.com](https://web3forms.com)**.
2. Enter the email address bookings should go to (whichever address Bree decides
   on) and click to get an access key. Web3Forms emails the key to that address
   (this is where booking requests will land).
3. Open **`src/config.ts`** and replace the placeholder:

   ```ts
   web3formsKey: 'YOUR-ACCESS-KEY-HERE',   // paste the real key between the quotes
   ```

4. Save, commit, and push (see below). That's it — the form now emails Bree on
   every submission and sends the visitor to the friendly `/thanks` page.

**Make sure Bree's phone buzzes:** have her install the **Gmail app** on her phone
and turn on notifications for that account. Every booking request will then ping
her instantly. (If she later wants true text-message alerts, most carriers offer a
free email-to-SMS gateway address, e.g. `5551234567@vtext.com` for Verizon — you
can add that address as a second recipient in the Web3Forms dashboard. Optional.)

---

## 3. Put it online with Cloudflare Pages (free)

The GitHub repo is **cassie-lyn/BreeWebsite**. Cloudflare will rebuild and
publish the site automatically every time you push to `main`.

1. Sign in at **[dash.cloudflare.com](https://dash.cloudflare.com)** (create a free account if needed).
2. In the left menu choose **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
3. Authorize GitHub and select the **cassie-lyn/BreeWebsite** repository.
4. On the build-settings screen:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - (Leave the rest as-is.)
5. Click **Save and Deploy**. After a minute or two you'll get a free public URL like
   `https://breewebsite.pages.dev`.

From now on, every `git push` to `main` auto-deploys the update. No further clicks.

### Adding a custom domain later

When Bree buys a domain (e.g. `happyhorsesri.com`):

1. In Cloudflare: **Workers & Pages → your project → Custom domains → Set up a domain**,
   and follow the prompts.
2. Update the site's own address in two files so links/SEO/sitemap use the real domain:
   - `astro.config.mjs` → change `site: 'https://breewebsite.pages.dev'`
   - `src/config.ts` → change `url: 'https://breewebsite.pages.dev'`
   - `public/robots.txt` → change the `Sitemap:` line
3. Commit and push.

---

## 4. Where to edit the common things

Almost everything Cassie will want to change lives in a couple of obvious places.

| I want to change...              | Edit this |
|----------------------------------|-----------|
| Business name, phone, email      | `src/config.ts` |
| Service-area wording             | `src/config.ts` (`serviceArea`) |
| Web3Forms key                    | `src/config.ts` (`web3formsKey`) |
| **Pricing** (session prices)     | `src/pages/services.astro` |
| **Package prices** (placeholders)| `src/pages/services.astro` — search for `TODO: confirm pricing with Bree` |
| **Testimonials** (placeholders)  | `src/pages/index.astro` — search for `PLACEHOLDER TESTIMONIALS` |
| Page copy / wording              | the matching file in `src/pages/` |
| Colors & fonts                   | `src/styles/global.css` (the `@theme` block) |

### ⚠️ Things marked TODO before launch

- **Package pricing** on the Services page (`$210` / `$400`) is a **placeholder** —
  confirm the real prepaid-package prices with Bree, then update
  `src/pages/services.astro` (look for the `TODO: confirm pricing with Bree` comments).
- **Testimonials** on the Home page are placeholders — swap in real client quotes
  when available (`src/pages/index.astro`, marked `PLACEHOLDER TESTIMONIALS`).

---

## 5. Photos

Source photos live in `C:\Users\Cassa\Downloads\Bree` (originals, never modified).
`npm run prepare-images` processes copies into `src/assets/photos/`: it bakes in
EXIF rotation (several phone photos were stored sideways), strips metadata, resizes,
and crops the Instagram screenshot. It also generates the social-share image at
`public/og-image.jpg`. To add or replace a photo, drop it in the source folder, add
an entry to `scripts/prepare-images.mjs`, and re-run the command.

**Video:** the source clip `PEMF_VID.MOV` was **not** included on the site because
`ffmpeg` (the tool needed to convert it to a web-friendly, muted MP4) isn't installed
on this machine. To add it later: install ffmpeg, run
`ffmpeg -i "PEMF_VID.MOV" -vf scale=-2:720 -an -c:v libx264 -crf 24 public/pemf-demo.mp4`,
then embed it with a `<video controls poster="…">` on `src/pages/pemf.astro`.

---

## 6. The MagnaWave badge

The site uses the **official "MagnaWave Certified" seal** (yellow circle, blue
text), stored at `src/assets/magnawave-seal.png` and rendered everywhere through
`src/components/MagnaWaveBadge.astro`. The source PNG is 180x180, so keep the
`size` prop at 180 or below. To update it (e.g. with a higher-resolution version
from Bree's practitioner Brandfolder portal), just replace that PNG file.

---

## Project structure

```
src/
  config.ts              ← business details (name, phone, email, form key) — EDIT HERE
  styles/global.css      ← Tailwind theme tokens (colors, fonts)
  components/            ← reusable pieces (Nav, Footer, Button, PriceCard, …)
  pages/                 ← one file per page (index, about, pemf, services, book, thanks)
  assets/photos/         ← processed images (committed)
public/                  ← favicon, robots.txt, og-image.jpg (served as-is)
scripts/prepare-images.mjs ← one-time image processing
```

## Notes for the record

- Site goal: the #1 job is getting booking inquiries to Bree's inbox.
- Placeholder pricing (packages) and placeholder testimonials are pending real info.
- No custom domain yet — using the free `*.pages.dev` URL.
- PEMF is presented throughout as **complementary wellness, not a substitute for
  veterinary care** — please keep that disclaimer in place.
