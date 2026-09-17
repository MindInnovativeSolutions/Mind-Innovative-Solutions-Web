const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const projects = Array.isArray(window.galleryProjects) ? window.galleryProjects : [];
const galleryGrid = document.querySelector('#gallery-grid');
const galleryEmpty = document.querySelector('#gallery-empty');
const galleryFilters = document.querySelector('#gallery-filters');
const galleryDialog = document.querySelector('#gallery-dialog');
const dialogImage = document.querySelector('#gallery-dialog-image');
const dialogTitle = document.querySelector('#gallery-dialog-title');
const dialogDescription = document.querySelector('#gallery-dialog-description');
const categories = ['All', ...new Set(projects.map(project => project.category).filter(Boolean))];

function renderGallery(category = 'All') {
  galleryGrid.replaceChildren();
  const visible = projects.filter(project => category === 'All' || project.category === category);
  galleryEmpty.hidden = projects.length > 0;

  visible.forEach(project => {
    if (!Array.isArray(project.photos) || !project.photos.length) return;
    const card = document.createElement('article');
    card.className = 'gallery-card';
    const title = document.createElement('h3');
    title.textContent = project.title || 'Completed project';
    const meta = document.createElement('p');
    meta.className = 'gallery-meta';
    meta.textContent = [project.category, project.location].filter(Boolean).join(' · ');
    const summary = document.createElement('p');
    summary.textContent = project.description || '';
    const photos = document.createElement('div');
    photos.className = 'gallery-photos';

    project.photos.forEach((photo, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-photo';
      button.setAttribute('aria-label', `View photo ${index + 1} of ${project.title || 'project'}`);
      const image = document.createElement('img');
      image.src = photo.src;
      image.alt = photo.alt || project.title || 'Completed project';
      image.loading = 'lazy';
      image.decoding = 'async';
      button.append(image);
      button.addEventListener('click', () => {
        dialogImage.src = photo.src;
        dialogImage.alt = image.alt;
        dialogTitle.textContent = project.title || 'Completed project';
        dialogDescription.textContent = [project.category, project.location, project.description].filter(Boolean).join(' · ');
        galleryDialog.showModal();
      });
      photos.append(button);
    });

    card.append(photos, meta, title, summary);
    galleryGrid.append(card);
  });
}

if (projects.length) {
  galleryFilters.hidden = categories.length < 3;
  categories.forEach(category => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = category;
    button.setAttribute('aria-pressed', String(category === 'All'));
    button.addEventListener('click', () => {
      galleryFilters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      renderGallery(category);
    });
    galleryFilters.append(button);
  });
}
renderGallery();
galleryDialog.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
galleryDialog.addEventListener('click', event => { if (event.target === galleryDialog) galleryDialog.close(); });
