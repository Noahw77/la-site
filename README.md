# Lupine Adventures Website

Static multi-page website for Lupine Adventures built with HTML, CSS, and JavaScript.

## Pages
- Home: `index.html`
- Services: `services.html`
- Partners / Affiliate links: `partners.html`
- Contact: `contact.html`
- Blog landing: `blog.html`
- Blog articles (placeholders):
  - `blog/jackson-restaurants-guide.html`
  - `blog/grand-teton-things-to-do.html`
  - `blog/local-skijouring-events.html`
- Resources:
  - `resources/restaurants.html`
  - `resources/hikes.html`
  - `resources/activities.html`
  - `resources/history.html`
- About:
  - `about/company-history.html`
  - `about/team.html`
  - `about/philosophy.html`

## Shared layout partials
- Header: `partials/header.html`
- Footer: `partials/footer.html`
- Both are injected on each page by `assets/js/main.js`.

## Local preview
Run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Notes
- Replace placeholder affiliate links (`https://example.com/...`) with live partner URLs.
- Replace placeholder blog article copy with your real content as you publish.
- Current logo is an SVG adaptation and can be replaced at `assets/images/lupine-logo.svg` with the final official brand file.
- Background and section placeholder images are in `assets/images/placeholders/` and can be replaced with production photography when available.
