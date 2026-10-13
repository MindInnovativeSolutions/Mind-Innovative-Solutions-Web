import { readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const gallery = path.join(root, 'gallery');
const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const sort = (a, b) => a.localeCompare(b, 'en', { numeric: true });
const encodePath = value => value.split('/').map(encodeURIComponent).join('/');

async function images(directory, relative) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries.sort((a, b) => sort(a.name, b.name))) {
    if (entry.name.startsWith('.')) continue;
    const name = `${relative}/${entry.name}`;
    if (entry.isDirectory()) result.push(...await images(path.join(directory, entry.name), name));
    else if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) {
      result.push({ src: encodePath(name), alt: '' });
    }
  }
  return result;
}

const projects = [];
const folders = await readdir(gallery, { withFileTypes: true });
for (const folder of folders.sort((a, b) => sort(a.name, b.name))) {
  if (!folder.isDirectory() || folder.name.startsWith('.')) continue;
  const photos = await images(path.join(gallery, folder.name), `gallery/${folder.name}`);
  if (!photos.length) continue;
  const category = folder.name === 'Audio-Video' ? 'Audio/Video' : folder.name;
  projects.push({ title: category, category, photos: photos.map((photo, index) => ({
    ...photo, alt: `${category} installation — photo ${index + 1}`
  })) });
}
await writeFile(path.join(gallery, 'projects.js'),
  '// Automatically generated from gallery folders. Do not edit manually.\n' +
  `window.galleryProjects = ${JSON.stringify(projects, null, 2)};\n`);
console.log(`Generated ${projects.length} categories and ${projects.reduce((n, p) => n + p.photos.length, 0)} photos.`);
