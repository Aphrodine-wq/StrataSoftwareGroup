# Website Templates Collection

A collection of production-quality website templates across diverse niches, with strategic WebGL integration for advanced templates. **All templates are available for purchase** — see [License](#license--purchase) below.

## Templates Overview

| # | Template | Type | Description |
|---|----------|------|-------------|
| 1 | **Insurance** | Single-file | Professional insurance company with testimonials, comparison tables, and quote forms |
| 2 | **Portfolio** | Modular | Creative portfolio with lightbox gallery, smooth scroll, and project showcase |
| 3 | **Law Firm** | Single-file | Trust-focused law firm with case results, team profiles, and practice areas |
| 4 | **Tech Startup** | Modular + WebGL | Dark-mode tech template with animated gradient background and pricing toggle |
| 5 | **Luxury** | Modular + WebGL | Elegant luxury brand with particle effects on scroll |
| 6 | **Creative Agency** | Modular + WebGL | Bold agency template with generative art background and case studies |
| 7 | **Sports News** | Single-file | Dynamic sports news with category filters, article grid, and live scores |
| 8 | **SaaS** | Modular + WebGL | Developer tools template with data visualization and code showcase |
| 9 | **Real Estate** | Modular | Property listings with search/filter, galleries, and agent profiles |
| 10 | **Trade Work** | Single-file | Contractor template with before/after sliders and service showcases |

## Quick Start

**Single-file templates** (1, 3, 7, 10): Open the `.html` file directly in a browser.

**Modular templates** (2, 4, 5, 6, 8, 9): Open `index.html` from the template folder. For best results, serve via a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve .
```

Then visit `http://localhost:8000/2-Portfolio/` (or the relevant path).

## File Structure

```
Website Templates/
├── 1-Insurance.html
├── 2-Portfolio/
│   ├── index.html
│   ├── css/styles.css
│   └── js/main.js
├── 3-Law.html
├── 4-TechStartup/
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── shaders/
│       ├── vertex.glsl
│       └── fragment.glsl
├── 5-Luxury/
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── shaders/particles.glsl
├── 6-CreativeAgency/
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── shaders/generative.glsl
├── 7-SportsNews.html
├── 8-SaaS/
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── shaders/visualization.glsl
├── 9-RealEstate/
│   ├── index.html
│   ├── css/styles.css
│   └── js/main.js
├── 10-TradeWork.html
└── README.md
```

## Customization

### Colors
Each template uses CSS variables (e.g., `:root { --primary: #... }`). Edit these in the template's `<style>` block or `styles.css` to rebrand.

### Fonts
- Most templates use system fonts for fast loading
- 5-Luxury uses Playfair Display (Google Fonts)

### Content
Replace placeholder text, images (or emoji placeholders), and contact details with your own content.

## Tech Stack

- **HTML5** – Semantic structure
- **CSS3** – Flexbox, Grid, custom properties
- **Vanilla JavaScript** – No frameworks
- **WebGL** – GLSL shaders (raw WebGL) for 4 advanced templates

## Browser Support

- Chrome, Firefox, Safari, Edge (latest)
- WebGL required for templates 4, 5, 6, 8
- Graceful degradation: content remains readable if WebGL is unsupported

## Accessibility & UX

- **Skip link** – "Skip to main content" on every template for keyboard/screen reader users
- **Semantic HTML** – `<main id="main">`, `<header>`, `role="navigation"`, `aria-label` where appropriate
- **Focus visibility** – Visible focus rings on interactive elements (`:focus-visible`) for keyboard navigation
- **Reduced motion** – `prefers-reduced-motion` respected: scroll and transitions are minimized when the user prefers less motion
- **Mobile menus** – All templates with nav links include a working mobile menu (hamburger) with `aria-expanded` and `aria-controls`
- **Meta descriptions** – Each template has a unique `<meta name="description">` for better SEO and link previews

## Performance

- Mobile-first responsive design
- Lazy-loading and scroll animations where applicable
- WebGL shaders are optimized for 60fps on modern devices

## License & Purchase

These templates are **for sale** by Strata Software Group. See [LICENSE.md](LICENSE.md) for commercial licensing options and contact information.

- Single template and extended licenses available
- Full source code included
- Customization and support options
