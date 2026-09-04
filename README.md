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

## Notes

- `APR ZIP FILE.zip` is a raw archive checked into the repo root — confirm
  whether it should stay in version control or be removed.
- No build step or package manager is used; assets are referenced directly by
  the HTML pages.
