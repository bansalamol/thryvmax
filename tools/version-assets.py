#!/usr/bin/env python3
"""Stamp local CSS/JS links in every page with a content fingerprint (?v=abc12345).

The server caches CSS/JS for a year (see .htaccess). Because the fingerprint changes whenever a
file changes, visitors get the new file on their next page view. Run this before every deploy:

    python3 tools/version-assets.py

It only rewrites links whose file changed, and preserves each file's line endings.
"""
import glob, hashlib, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
REF = re.compile(r'((?:href|src)=")(/?assets/[^"?#]+\.(?:css|js))(?:\?v=[0-9a-f]+)?(")')


def fingerprint(path):
    with open(path.lstrip('/'), 'rb') as f:
        return hashlib.sha1(f.read()).hexdigest()[:8]


changed = 0
for page in sorted(glob.glob('*.html')):
    raw = open(page, 'rb').read().decode('utf-8')
    def stamp(m):
        path = m.group(2)
        if not os.path.exists(path.lstrip('/')):
            return m.group(0)
        return f'{m.group(1)}{path}?v={fingerprint(path)}{m.group(3)}'
    new = REF.sub(stamp, raw)
    if new != raw:
        open(page, 'wb').write(new.encode('utf-8'))
        changed += 1
print(f'{changed} page(s) updated')
