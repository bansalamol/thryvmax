# Performance notes and roadmap

Last updated: 30 Sep 2026 (commit 3c1ba07). Measured with Lighthouse 12, mobile.

## Where we are

Done in 3c1ba07 (see that commit for details):

- CLS fixed site-wide: width/height on every image, About image no longer lazy, self-hosted Poppins
  with a metric-matched fallback font. About page CLS 0.353 -> 0.
- Self-hosted fonts and libraries (`assets/fonts/`, `assets/vendor/`); Font Awesome removed.
- Bootstrap CSS trimmed with PurgeCSS (`assets/vendor/bootstrap.purged.min.css`, 31 KB -> 10 KB gzip).
- AVIF hero images, 300 px logo, blog header images load first, YouTube lazy + nocookie.
- `.htaccess`: 1-year cache for CSS/JS/fonts/images, `no-cache` for pages.
  `tools/version-assets.py` must be run before every deploy (fingerprints CSS/JS links).
- Google Analytics on all pages, loaded after first interaction or 6 s after load.
- Accessibility, Best Practices, SEO: 100. Agentic Browsing: CLS check now passes.

Lab scores before -> after (local, same conditions): About 60 -> 81, Home 67 -> 85,
Services 61 -> 77, ERP service page 67 -> 79. Re-measure on the live site after each deploy.

## What stands between us and 90-100 (in order of impact)

1. **Animation libraries (biggest).** GSAP + ScrollTrigger + Lenis (~130 KB JS) run on every page:
   pinned About section, parallax hero, widening images, smooth scroll, marquees. Main cause of
   Total Blocking Time.
   - Option A (medium effort, look nearly unchanged): move simple effects (fade-in reveals, widening
     image, marquees) to CSS / IntersectionObserver; load GSAP only on the home page.
   - Option B (quick): drop Lenis smooth scrolling everywhere (scroll feels like a normal website).
2. **Header/footer injected by JavaScript.** `assets/js/component-manage.js` fetches `header.html`
   and `footer.html` on every page load: extra requests, late navigation. Fix: build them into each
   page's HTML (small build script, or copy into every page).
3. **Server response time.** Hostinger CDN does not cache HTML (`x-hcdn-cache-status: DYNAMIC`).
   Enable HTML caching in hPanel. No code change, can save 0.3-1 s.
4. **Render-blocking CSS.** Four stylesheets before first paint. Inline critical (above-the-fold) CSS;
   needs a build step.
5. **Google Analytics.** Still counted in lab tests even though delayed. Only fix is removing it or
   server-side tracking. Decision so far: keep it.
6. **Home hero.** Two 2000 px layered images with parallax. A single smaller mobile image would help
   but changes the look.

Recommended next steps: enable HTML caching in hPanel (3), then do 1A and 2, aiming for 90+ on every
page without visible design changes. 100 on the home page would require removing the parallax hero
and pinned sections (a design decision).

## Things to know when measuring

- Lighthouse lab LCP measured against `localhost` is misleading: scripts are already downloaded
  before first paint, so the model assumes the LCP element waits for them (service pages show 5-8 s
  lab LCP but ~0.4 s in a real browser). Always measure the live site.
- Google ranks on field data (Core Web Vitals from real Chrome users), not the Lighthouse number.
  The site had no CrUX field data as of Sep 2026.
- Skipped on purpose: minifying our own CSS (about 2 KB; the server already serves Brotli).

## Keeping it fast

- Run `python3 tools/version-assets.py` before every deploy.
- New images: always include `width` and `height`; don't lazy-load anything visible on first screen.
- Replacing an image: use a new file name (images are cached for a year).
- New Bootstrap class not styled? It was purged: regenerate `bootstrap.purged.min.css` with
  PurgeCSS against the full Bootstrap 5.3.3 CSS, or add the rule back.
