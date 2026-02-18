# Logo (transparent background)

The site logo is `logo.png` with a **transparent background**, so it works on both light and dark backgrounds.

To regenerate the transparent version (if you replace the source logo):

```bash
npm run make-logo-transparent
```

This uses Sharp to make near-black pixels in `logo.png` transparent. For more refined results, you can use [remove.bg](https://www.remove.bg) or [Photopea](https://www.photopea.com).
