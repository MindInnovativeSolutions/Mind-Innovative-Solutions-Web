# Mind Innovative Solutions website

## Automatic category gallery

Put images inside folders directly under `gallery/`:

- `gallery/Surveillance System/`
- `gallery/Audio-Video/` (displayed as Audio/Video)
- `gallery/Racks/`
- `gallery/TV Mounting/`

The folder name is the category name. Each category has a cover card and a photo viewer with next/previous buttons and thumbnails. Upload `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif` files; uppercase extensions work too. Files are ordered naturally by filename (01.jpg, 02.jpg, etc.). Subfolders contribute photos to their parent category. Empty folders are hidden. Photos directly in `gallery/` are ignored.

### Add pictures from GitHub

Open a category folder, choose **Add file → Upload files**, upload pictures, and commit to `main`. The workflow builds and deploys the updated gallery. Wait for the Actions run to complete; refresh the website afterward (GitHub Pages may cache files briefly).

### Add a new category from GitHub

Use **Add file → Create new file** and enter `gallery/New Category/.gitkeep` as the filename. Commit it, open the new folder, then upload pictures. The category appears automatically after deployment when it contains at least one supported image.

No edits to `gallery/projects.js`, HTML, or JavaScript are needed. `gallery/projects.js` is generated during deployment. Deleting or renaming photos/categories takes effect on the next deployment.

## One-time installation on the existing GitHub Pages site

This update includes all current photos reorganized into category folders, the existing branding/contact form, and the gallery generator.

1. Extract this archive into a local checkout of the existing repository, replacing matching files. Include `.github/workflows/deploy-gallery.yml` (a hidden folder on some systems). Old photos in the top level of `gallery/` can be removed; they are ignored by the generator.
2. Commit and push the changed files and the new category folders to `main`.
3. In the GitHub repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. Keep the existing custom domain `mindinnov.com`.
4. Open **Actions → Build gallery and deploy GitHub Pages → Run workflow** on `main` if the first run happened before the Pages setting changed.
5. Confirm the workflow is successful, then open https://mindinnov.com/#gallery.

The Pages workflow deploys only public website files; it does not publish `.git`, scripts, or workflow files. No GitHub API requests or API keys are used by visitors.

## Vercel alternative

If this same repository is deployed on Vercel, the included `vercel.json` runs `npm run build` before publishing. Preserve any existing project domain settings. GitHub Pages serves the current mindinnov.com site.

## Local use

With Node.js 22 installed, run `npm run build` (no dependencies required), then serve this directory using a static HTTP server. The generated manifest is included for static preview; regenerate after changing pictures.

## Current photos

Existing rack/equipment photos were placed in Racks, church audio photos/screenshots in Audio-Video, and television photos in TV Mounting. Surveillance System is ready for new photos and remains hidden while empty. All 31 original image files are preserved.
