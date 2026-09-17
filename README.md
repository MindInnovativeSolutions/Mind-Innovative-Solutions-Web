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

## Before production
1. Replace the `mailto:` form with Formspree, Web3Forms, HubSpot, your CRM, or a serverless endpoint.
2. Confirm the final phone number, email, service area, licensing wording, and warranty language.
3. Add analytics and a privacy policy link if needed.
