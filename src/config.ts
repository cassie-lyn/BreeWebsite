/**
 * SINGLE SOURCE OF TRUTH for business details.
 *
 * Rename the business, change the phone/email, or drop in the real Web3Forms
 * access key here; every page reads from this file, so edits happen once.
 */

/**
 * Base-path helper. GitHub Pages serves the site under /BreeWebsite, while
 * root-domain hosts (Cloudflare Pages, custom domain) serve at /. Every
 * internal link goes through withBase() so both just work.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');
export const withBase = (path: string) => BASE + path;

export const SITE = {
  /** Business name (currently a PLACEHOLDER). Change this one line to rename. */
  name: 'Happy Horses RI',

  /** Practitioner's real name (used in copy + SEO). */
  practitioner: 'Briana Dolbec',
  practitionerShort: 'Bree',

  /** Short tagline used in the hero sub-headline and meta descriptions. */
  tagline: 'Mobile MagnaWave PEMF therapy for horses & dogs across Rhode Island',

  /**
   * Contact details — PLACEHOLDERS for now. Bree is deciding whether to use
   * her personal number/email or set up Google Voice + a business address.
   * When decided: fill in all four values and every page updates (links and
   * JSON-LD re-enable automatically when the hrefs are non-empty).
   */
  phone: '401-XXX-XXXX',
  phoneHref: '',
  email: 'Email coming soon',
  emailHref: '',

  /** Where Bree is based / rides out of. */
  baseCity: 'Pawtuxet Village, Warwick, RI',
  ridesOutOf: 'Avastar Dressage, Lincoln, RI',

  /** Service area line, reused in footer, services page, JSON-LD. */
  serviceArea:
    'Mobile service throughout Rhode Island and nearby Massachusetts, generally within 40 miles of Providence.',
  serviceAreaShort: 'Serving Rhode Island & nearby Massachusetts',

  /** Center point + radius for the LocalBusiness service-area schema. */
  geo: {
    // Providence, RI, the approximate center of the travel radius.
    latitude: 41.824,
    longitude: -71.4128,
    radiusMeters: 64373, // ~40 miles
  },

  /**
   * Web3Forms access key (PLACEHOLDER).
   * Get a free key in ~2 minutes at https://web3forms.com using Bree389@gmail.com,
   * then paste it here. Until then the booking form will not deliver emails.
   */
  web3formsKey: 'YOUR-ACCESS-KEY-HERE',

  /** Production URL, derived from astro.config.mjs `site` + `base`. */
  url: (import.meta.env.SITE ?? 'https://breewebsite.pages.dev').replace(/\/+$/, '') + BASE,

  /** Social / external links (optional; leave empty to hide). */
  instagram: '',
} as const;

/** Primary nav links, in order. The last one is rendered as a button. */
export const NAV_LINKS = [
  { href: withBase('/'), label: 'Home' },
  { href: withBase('/about'), label: 'About' },
  { href: withBase('/pemf'), label: 'PEMF Therapy' },
  { href: withBase('/services'), label: 'Services & Pricing' },
  { href: withBase('/book'), label: 'Book a Session', button: true },
] as const;
