# Logo (transparent background)

The site logo is `logo.png`. To have a **truly transparent** background (no black box):

1. **Option A – Online:** Use [remove.bg](https://www.remove.bg) or [Photopea](https://www.photopea.com): upload `logo.png`, remove the black background, download as PNG, and replace this folder’s `logo.png`.
2. **Option B – Script:** From the project root run:  
   `npm install jimp --save-dev` then `npm run make-logo-transparent`  
   This makes near-black pixels in `logo.png` transparent.

The app uses `mix-blend-mode: lighten` in CSS so the current black-background logo still looks transparent on the site. If you replace `logo.png` with a PNG that has real transparency, you can remove the `mix-blend-mode: lighten` rules from:

- `src/components/Navigation.css` (`.nav-logo-img`)
- `src/components/Footer.css` (`.footer-logo-img`)
- `src/components/Preloader.css` (`.preloader-logo`)
