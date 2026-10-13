# Mind Innovative Solutions website

A responsive one-page static website using the blue, black, and white colors from the supplied logos.

## Files
- `index.html` — page structure and content
- `styles.css` — responsive design system
- `script.js` — mobile navigation and dynamic copyright year
- `assets/` — supplied logo files
- `gallery/projects.js` — completed project entries
- `gallery/photos/` — project photos

## Add project photos
This is a static site: its public Gallery cannot accept browser uploads. To publish photos, use GitHub's **Add file → Upload files** in `gallery/photos/` and commit them. Prefer compressed `.webp` or `.jpg` images (roughly 1600 px wide or less), and remove customer names, addresses, faces, and sensitive screens unless you have permission to publish them.

Then edit `gallery/projects.js` on GitHub. Replace `window.galleryProjects = [];` with an array of project entries following the commented example in that file. Each project has a title, category, optional broad location and description, and one or more photos with a file path and meaningful alt text. Commit the edit. The Gallery appears automatically after the deployed site updates. Each project card supports multiple horizontally scrollable photos; clicking a photo enlarges it. Categories automatically become filters when there are at least two categories.

## Deploy
Upload the folder to Vercel, Netlify, GitHub Pages, or any static web host.


## Fixes in this full ZIP (October 13, 2026)

- Removed unresolved merge-conflict text from the gallery manifest.
- Reused existing dialog controls instead of creating duplicate IDs/viewers.
- Kept the viewer open when clicking its interior; backdrop clicks close it.
- Centered single-photo categories and separated the close button from the image.
- Added a confirmation message for the existing Web3Forms success redirect.
- Restored package.json so npm run build works.
- Removed 31 byte-identical root-level photo duplicates; all 31 unique photos remain in category folders.
- Allowed a real folder named All without confusing it with the All filter.
- Added mobile-menu Escape handling, anchor offsets, and reduced-motion support.

Install this full package by replacing repository files with these extracted files, including the hidden .github folder. Do not upload the ZIP itself as website source. In Settings > Pages, select GitHub Actions as the source and retain mindinnov.com as the custom domain. Commit to main and wait for the gallery deployment workflow to finish. Empty categories appear only after they contain pictures.

Checks: Node syntax checks, successful gallery build, unique HTML IDs, all local HTML/gallery/SVG references resolve, and ZIP integrity. Browser interaction and live email delivery were not tested; a browser executable is unavailable in the build environment.
