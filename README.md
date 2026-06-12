# iontail.github.io

Personal GitHub Pages site for Chanhee Lee.

## Structure

- `_pages/about.md`: homepage content.
- `_pages/publications.html`: publications listing.
- `_config.yml`: site metadata, author profile, Jekyll settings.
- `_data/navigation.yml`: top navigation.
- `_sass/_custom.scss`: site-specific homepage and CV-style layout tweaks.
- `assets/css/main.scss`: Sass entrypoint.
- `assets/js/_main.js`: JavaScript source.
- `assets/js/main.min.js`: bundled JavaScript loaded by the site.
- `images/`: profile image and favicons.
- `files/`: CV and project PDF files.
- `AGENTS.md`: repository guide for coding agents.

## Local Preview

Install dependencies:

```bash
bundle install
```

Run the site locally:

```bash
bundle exec jekyll serve -l -H localhost
```

Then open:

```text
http://localhost:4000
```

If `_config.yml` changes, restart the Jekyll server.

## JavaScript

When editing files under `assets/js/`, rebuild the bundled file:

```bash
npm run build:js
```

## Notes

- Do not edit `_site/` directly. It is a generated build output.
- Keep downloadable PDFs in `files/`.
- Keep profile and favicon assets in `images/`.
