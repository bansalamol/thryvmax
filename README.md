# Thryvmax

Static marketing website for **Thryvmax**, built with plain HTML/CSS/JS and a
couple of PHP mail handlers for the contact and career forms.

## Repository layout

```
.
├── index.html                     Home page
├── aboutus.html, services.html,   Top-level pages
│   contactus.html, career.html,
│   blogs.html, privacy-policy.html,
│   termsandcondition.html
├── header.html, footer.html       Shared header/footer includes
├── *.html                         Service & blog landing pages, e.g.
│                                     custom-erp-crm-software-development.html
│                                     zoho-one-implementation-partner.html
│                                     seo-digital-marketing-services.html
│                                     mobile-application-development.html
│                                     odoo-customization-services.html
│                                     (and other zoho-*, blog-post pages)
├── contactmail.php                Contact form handler (PHPMailer)
├── careermail.php                 Career/job application form handler
├── phpmailer/                     PHPMailer library (Exception.php, PHPMailer.php, SMTP.php)
├── assets/
│   ├── css/                       Page/section stylesheets (common.css, service.css, …)
│   ├── js/                        Page/section scripts (common.js, service.js, …)
│   ├── images/                    Site images, organized by page/section
│   │   ├── home/, services/, about-us/, blog/, common/, footer/, …
│   │   └── SUBSERVICES/, crm-erp/, bussiness-automation/, section-2/, section-5/, section-9/, …
│   ├── style.css, aboutus.css     Global / page-level styles
│   └── sript.js                   Global script
│   ├── vendor/                    Self-hosted Bootstrap (trimmed), GSAP, ScrollTrigger, Lenis
│   └── fonts/                     Self-hosted Poppins (400/500/600)
├── tools/version-assets.py        Stamps CSS/JS links with a content fingerprint (run before deploy)
├── docs/PERFORMANCE.md            Performance status and roadmap to 90-100
├── .htaccess                      Redirects (www, /index.html, renamed pages) and cache headers
├── robots.txt, sitemap.xml        SEO files
└── .vscode/                       Editor settings
```

## Local setup

This is a static site with two small PHP endpoints, so any PHP-capable web
server works:

1. Clone the repository into your web root (or serve it with PHP's built-in
   server: `php -S localhost:8000`).
2. Open `index.html` (or `http://localhost:8000/`) in a browser.
3. `contactmail.php` and `careermail.php` send mail via PHPMailer — set SMTP
   credentials in those files before testing the contact/career forms.

## Deploying

1. Run `python3 tools/version-assets.py`. It adds a fingerprint (`?v=…`) to every local CSS/JS link,
   so browsers fetch a changed file immediately even though `.htaccess` lets them cache CSS/JS for a year.
2. Upload the changed files (and `.htaccess`).
3. To replace an image, give the new image a new file name: images are cached for a year.

## Notes

- `APR ZIP FILE.zip` is a raw archive checked into the repo root — confirm
  whether it should stay in version control or be removed.
- No build step or package manager is used; assets are referenced directly by
  the HTML pages. `assets/vendor/bootstrap.purged.min.css` is Bootstrap 5.3.3 with unused rules
  removed (PurgeCSS). If you start using a Bootstrap class that isn't styled, add it back from the
  full `bootstrap.min.css` or regenerate the trimmed file.
