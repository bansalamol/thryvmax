
// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        const header = document.getElementById('header');
        header.innerHTML = data;
        markCurrentPage(header);
        window.dispatchEvent(new Event('scroll'));
    })
    .catch(error => console.error('Error loading header:', error));

// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));


// Mark the current page in the navigation (the markup is shared, so it can't be hard-coded)
function markCurrentPage(header) {
    const fileOf = (href) => (new URL(href, location.href).pathname.split('/').pop() || 'index.html');
    const current = fileOf(location.href);
    const serviceLinks = [...header.querySelectorAll('.dropdown-item, .nav-sublink')];
    const isServicePage = current === 'services.html' || serviceLinks.some((a) => fileOf(a.href) === current);
    const blogPages = ['blogs.html', 'how-school-erp-crm-system-for-managing-student-data-easily.html', 'indias-government-email-migration-zoho.html', 'maharashtra-navudyojak-automation-journey-with-thryvmax.html', 'right-zoho-implementation-partner-makes-difference.html', 'zoho-one-supports-the-service-industry.html'];

    header.querySelectorAll('a[href]').forEach((link) => {
        const file = fileOf(link.href);
        if (file === current) link.setAttribute('aria-current', 'page');
    });
    header.querySelectorAll('.navbar-nav > .nav-item > .nav-link, .navbar-nav .dropdown-toggle').forEach((link) => {
        const file = fileOf(link.href);
        const inSection = (file === 'services.html' && isServicePage) || (file === 'blogs.html' && blogPages.includes(current));
        if (file === current || inSection) link.classList.add('active');
    });
}
