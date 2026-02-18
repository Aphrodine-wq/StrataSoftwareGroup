# 10 Website Templates Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build 10 unique, production-quality website templates across diverse niches with strategic WebGL integration.

**Architecture:**
- Single-file templates (Insurance, Law, Sports News, Trade Work) for simplicity
- Modular templates (Portfolio, Real Estate, and all Advanced) with separate CSS/JS for maintainability
- WebGL implementations in separate shader files for 4 templates
- Consistent quality and performance across all, unique visual identity per niche

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, WebGL (Three.js or GLSL raw), Responsive Mobile-First Design

---

## Phase 1: Simple Templates (Single HTML Files)

### Task 1: Create Insurance Template

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\1-Insurance.html`

**Description:** Professional insurance company template with trust-focused design, testimonials, comparison tables, and quote CTAs.

**Step 1: Create Insurance HTML with professional styling**

Build a complete single-file template with:
- Fixed navigation bar (dark blue/white)
- Hero section with headline + CTA
- Features/services grid (4 columns)
- Testimonials carousel
- Comparison table (plans/coverage)
- FAQ section
- Footer with contact info

Include smooth scrolling, hover effects, and form validation for contact/quote forms.

Color Scheme: Navy blue (#1e3a5f), white, light grey accents
Typography: Sans-serif (Segoe UI, system fonts)

**Step 2: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 1-Insurance.html
git commit -m "feat: insurance company template with testimonials and comparison tables"
```

---

### Task 2: Create Law Firm Template

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\3-Law.html`

**Description:** Professional law firm template emphasizing trust, expertise, case results.

**Step 1: Create Law Firm HTML with professional styling**

Build a complete single-file template with:
- Fixed navigation with logo
- Hero section: headline + practice areas
- About/Mission section
- Practice areas (4 cards with icons)
- Case results/testimonials section
- Team member profiles (images + bios)
- Consultation CTA
- Footer

Color Scheme: Classic navy (#2c3e50), gold accents (#d4af37), white
Typography: Georgia/serif for headings, sans-serif for body
Special: Add subtle animations on scroll, smooth transitions

**Step 2: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 3-Law.html
git commit -m "feat: law firm template with case results and team profiles"
```

---

### Task 3: Create Sports News Template

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\7-SportsNews.html`

**Description:** Dynamic sports news site with grid layout, featured articles, live updates.

**Step 1: Create Sports News HTML**

Build a complete single-file template with:
- Sticky header/navigation
- Hero featured article (large image, headline, excerpt)
- Trending section (3 cards)
- Category filters (Football, Basketball, Hockey, Baseball)
- Grid of 12 article cards (3 columns)
- Live score mockup section
- Subscribe newsletter CTA
- Footer with social links

Color Scheme: Bold primary color (#ff6b35), dark background (#1a1a1a), white text, accent secondary (#004e89)
Typography: Bold sans-serif (Impact-style for headlines), regular sans-serif for body
Special: Hover effects on article cards, category filter interactivity

**Step 2: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 7-SportsNews.html
git commit -m "feat: sports news template with grid layout and category filters"
```

---

### Task 4: Create Trade Work Template

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\10-TradeWork.html`

**Description:** Contractor/tradesman template showcasing services, before/afters, testimonials.

**Step 1: Create Trade Work HTML**

Build a complete single-file template with:
- Navigation with phone/CTA
- Hero section with headline + emergency call CTA
- Services offered (6 cards with icons: Plumbing, Electrical, HVAC, etc.)
- Before/after image sliders (at least 3 examples)
- Testimonials section (5 cards with star ratings)
- Trust badges section (licenses, certifications, insurance)
- Service area map (mockup with list of cities)
- Contact form + phone + hours
- Footer

Color Scheme: Warm orange (#ff8c42), dark blue (#1e3a5f), white, grey
Typography: Bold sans-serif for headers, clean sans-serif for body
Special: Before/after sliders with smooth drag interaction

**Step 2: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 10-TradeWork.html
git commit -m "feat: trade work template with before-after sliders and service showcases"
```

---

## Phase 2: Standard+ Templates (Modular with CSS/JS)

### Task 5: Create Portfolio Template Structure

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\2-Portfolio/index.html`
- Create: `C:\Users\Walt\Desktop\Website Templates\2-Portfolio/css/styles.css`
- Create: `C:\Users\Walt\Desktop\Website Templates\2-Portfolio/js/main.js`

**Description:** Creative portfolio template with smooth scrolling, image galleries, project showcases.

**Step 1: Create Portfolio HTML structure**

index.html:
- Navigation (fixed, smooth scroll links)
- Hero section with intro + CTA
- About section
- Portfolio/projects grid (12 project cards in 3-column layout, lazy-loading)
- Skills showcase
- Contact form
- Footer

**Step 2: Create Portfolio CSS**

styles.css:
- Responsive grid system (3 cols → 2 cols → 1 col)
- Smooth scroll behavior
- Card hover effects (scale, shadow)
- Gallery lightbox styling (modal overlay)
- Form styling with validation states
- Mobile-first breakpoints

**Step 3: Create Portfolio JavaScript**

main.js:
- Smooth scroll navigation
- Lightbox gallery functionality (click image → modal, keyboard navigation)
- Fade-in on scroll animations
- Form validation and submission
- Mobile menu toggle

**Step 4: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 2-Portfolio/
git commit -m "feat: portfolio template with modular structure and smooth scrolling"
```

---

### Task 6: Create Real Estate Template Structure

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\9-RealEstate/index.html`
- Create: `C:\Users\Walt\Desktop\Website Templates\9-RealEstate/css/styles.css`
- Create: `C:\Users\Walt\Desktop\Website Templates\9-RealEstate/js/main.js`

**Description:** Real estate template with property listings, search/filter, image galleries.

**Step 1: Create Real Estate HTML structure**

index.html:
- Navigation with agency branding
- Hero search bar (city, type, price range)
- Featured properties section (4 large cards)
- Property grid (12 listings with 3-column layout)
- Each property card: image gallery, price, beds/baths, location, agent info
- Agent profiles section
- Map section (mockup or embedded)
- Testimonials from buyers/sellers
- CTA for buying/selling

**Step 2: Create Real Estate CSS**

styles.css:
- Property card grid with responsive breakpoints
- Image gallery carousel styling
- Search bar styling
- Map section styling
- Agent profile cards
- Mobile optimization for property cards

**Step 3: Create Real Estate JavaScript**

main.js:
- Search/filter functionality (filter by price, beds, type)
- Image gallery carousel per property
- Smooth transitions between screens
- Form validation
- Map interaction (mockup or Leaflet integration)

**Step 4: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 9-RealEstate/
git commit -m "feat: real estate template with property listings and search filtering"
```

---

## Phase 3: Advanced Templates with WebGL (Modular with Shaders)

### Task 7: Create Tech Startup Template with WebGL

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\4-TechStartup/index.html`
- Create: `C:\Users\Walt\Desktop\Website Templates\4-TechStartup/css/styles.css`
- Create: `C:\Users\Walt\Desktop\Website Templates\4-TechStartup/js/main.js`
- Create: `C:\Users\Walt\Desktop\Website Templates\4-TechStartup/shaders/vertex.glsl`
- Create: `C:\Users\Walt\Desktop\Website Templates\4-TechStartup/shaders/fragment.glsl`

**Description:** Cutting-edge tech startup template with animated gradient WebGL background, feature cards, pricing.

**Step 1: Create Tech Startup HTML**

index.html:
- Navigation (transparent on hero, fixed)
- Hero section with headline + WebGL background shader
- Feature cards (6 cards with icons, animate in on scroll)
- How it works section (timeline-style 4 steps)
- Pricing section with toggle (monthly/annual)
- Testimonials from beta users
- CTA for free trial
- Footer

**Step 2: Create Tech Startup CSS**

styles.css:
- Dark mode (dark bg #0f0f0f, accent colors #6366f1 or #ec4899)
- Feature cards with subtle shadows and scale hover
- Pricing table with toggle styling
- Animation classes for scroll triggers
- WebGL canvas container (full-width, behind content)

**Step 3: Create WebGL Shaders**

vertex.glsl:
- Simple pass-through vertex shader for fullscreen quad

fragment.glsl:
- Animated gradient shader with noise/perlin
- Time-based animation for continuous motion
- Color transitions between accent colors

**Step 4: Create Tech Startup JavaScript**

main.js:
- Three.js or raw WebGL setup for shader rendering
- Canvas resize handling
- Scroll trigger animations (feature cards fade/slide in)
- Pricing toggle functionality
- Performance optimization (request animation frame)

**Step 5: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 4-TechStartup/
git commit -m "feat: tech startup template with WebGL animated gradient background"
```

---

### Task 8: Create Luxury Brand Template with WebGL Particles

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\5-Luxury/index.html`
- Create: `C:\Users\Walt\Desktop\Website Templates\5-Luxury/css/styles.css`
- Create: `C:\Users\Walt\Desktop\Website Templates\5-Luxury/js/main.js`
- Create: `C:\Users\Walt\Desktop\Website Templates\5-Luxury/shaders/particles.glsl`

**Description:** High-end luxury brand template with minimalist design, WebGL particle effects on scroll.

**Step 1: Create Luxury Brand HTML**

index.html:
- Minimal navigation (just logo + contact)
- Hero: Large luxury product/lifestyle image + minimal text
- Story section (company narrative)
- Collections showcase (4 large cards with hover effects)
- WebGL particle effect trigger on scroll
- Testimonials from exclusive members
- "Join us" exclusive membership CTA
- Footer (minimal)

**Step 2: Create Luxury Brand CSS**

styles.css:
- Luxury color scheme: Gold accents (#d4af37), dark backgrounds (#1a1a1a), white, cream
- Minimal spacing, generous whitespace
- Large typography (elegant fonts: Playfair Display for headings)
- Smooth transitions and hover effects
- Canvas for particle effects positioned absolutely

**Step 3: Create WebGL Particles Shader**

particles.glsl:
- Particle system shader (position + movement over time)
- Gold/cream colored particles
- Triggered by scroll position
- Gravity and velocity simulation

**Step 4: Create Luxury Brand JavaScript**

main.js:
- Three.js or raw WebGL for particles
- Scroll event listener to trigger particle effects
- Particle system management (spawn, update, render)
- Smooth page transitions between sections

**Step 5: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 5-Luxury/
git commit -m "feat: luxury brand template with WebGL particle effects on scroll"
```

---

### Task 9: Create Creative Agency Template with WebGL Generative Art

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\6-CreativeAgency/index.html`
- Create: `C:\Users\Walt\Desktop\Website Templates\6-CreativeAgency/css/styles.css`
- Create: `C:\Users\Walt\Desktop\Website Templates\6-CreativeAgency/js/main.js`
- Create: `C:\Users\Walt\Desktop\Website Templates\6-CreativeAgency/shaders/generative.glsl`

**Description:** Bold creative agency template with experimental design, WebGL generative art background.

**Step 1: Create Creative Agency HTML**

index.html:
- Navigation with bold branding
- Hero: Large headline + WebGL generative art background
- Case studies section (6 projects with images, description, results)
- Services offered (4 bold cards: Branding, Design, Web, Motion)
- Team showcase (agent profiles with images)
- "Let's work together" CTA
- Footer with social links

**Step 2: Create Creative Agency CSS**

styles.css:
- Bold color scheme (primary: #ff006e, secondary: #00d9ff, dark bg)
- Experimental typography (mix of serif/sans-serif, large scales)
- Case study cards with image overlays
- Canvas background styling (behind hero)
- Mobile-optimized

**Step 3: Create WebGL Generative Art Shader**

generative.glsl:
- Simplex/Perlin noise-based generative shader
- Colors transition based on time
- Complex patterns that feel "artistic"
- Performance-optimized for real-time rendering

**Step 4: Create Creative Agency JavaScript**

main.js:
- Three.js setup for generative art
- Mouse interaction (optional: follow mouse for shader effect)
- Scroll-triggered animations for case studies
- Lazy loading for case study images
- Responsive canvas handling

**Step 5: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 6-CreativeAgency/
git commit -m "feat: creative agency template with WebGL generative art background"
```

---

### Task 10: Create SaaS/Developer Tools Template with WebGL Visualization

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\8-SaaS/index.html`
- Create: `C:\Users\Walt\Desktop\Website Templates\8-SaaS/css/styles.css`
- Create: `C:\Users\Walt\Desktop\Website Templates\8-SaaS/js/main.js`
- Create: `C:\Users\Walt\Desktop\Website Templates\8-SaaS/shaders/visualization.glsl`

**Description:** Modern SaaS template with feature highlights, pricing, WebGL data visualization.

**Step 1: Create SaaS HTML**

index.html:
- Navigation (sticky)
- Hero: Headline + WebGL data visualization background
- Feature highlights (6 cards with icons, descriptions)
- How it works (animated steps, 4 steps)
- Pricing section (3 tiers, toggle monthly/annual)
- Use case cards (4 industries)
- Code snippet showcase (example API usage)
- Testimonials
- FAQ section
- Free trial CTA
- Footer

**Step 2: Create SaaS CSS**

styles.css:
- Tech color scheme (dark #1a1a2e, accent #16c784 or #0066ff)
- Code snippet styling (syntax highlighting)
- Pricing cards with plan highlights
- Feature cards with icon styling
- Canvas for visualization (behind hero)

**Step 3: Create WebGL Data Visualization Shader**

visualization.glsl:
- Abstract data visualization (lines, nodes, connections)
- Animation simulating data flow
- Interactive elements responding to user position
- Tech-forward aesthetic

**Step 4: Create SaaS JavaScript**

main.js:
- Three.js for visualization
- Pricing toggle (monthly ↔ annual)
- Code snippet tabs/switching
- Form validation for free trial signup
- Scroll animations for feature cards
- Mouse tracking for visualization (optional interactivity)

**Step 5: Commit**

```bash
cd "C:\Users\Walt\Desktop\Website Templates"
git add 8-SaaS/
git commit -m "feat: SaaS template with WebGL data visualization and pricing calculator"
```

---

## Phase 4: Final Polish & Optimization

### Task 11: Optimize All Templates for Performance

**Checklist:**
- Minify CSS/JS
- Optimize images (compress, responsive sizes)
- Lazy load images and off-screen content
- WebGL performance: Check frame rates, optimize shaders
- Remove unused CSS
- Test load times on 4G

**Step 1: Test and optimize each template**

- Use Chrome DevTools Lighthouse
- Aim for >90 performance score
- Fix any critical issues

**Step 2: Commit optimization**

```bash
git add .
git commit -m "perf: optimize all templates for performance and load time"
```

---

### Task 12: Verify Responsiveness & Accessibility

**Checklist:**
- Test all templates on mobile (320px, 375px, 768px, 1024px)
- Verify color contrast (WCAG AA)
- Check keyboard navigation
- Verify alt text on images
- Test form accessibility

**Step 1: Document any issues and fix**

**Step 2: Commit**

```bash
git add .
git commit -m "fix: ensure WCAG accessibility compliance across all templates"
```

---

### Task 13: Create README Documentation

**Files:**
- Create: `C:\Users\Walt\Desktop\Website Templates\README.md`

**Content:**
- List all 10 templates with descriptions
- Installation/usage instructions for each
- Browser compatibility
- Customization guide (colors, fonts, content)
- Performance metrics
- Credits and resources

**Step 1: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README for template collection"
```

---

## Summary

- **Phase 1:** 4 simple single-file templates (Insurance, Law, Sports News, Trade Work)
- **Phase 2:** 2 modular standard+ templates (Portfolio, Real Estate)
- **Phase 3:** 4 advanced modular templates with WebGL (Tech Startup, Luxury, Creative Agency, SaaS)
- **Phase 4:** Performance optimization, accessibility, documentation

**Total:** 13 tasks, producing 10 high-quality unique templates

