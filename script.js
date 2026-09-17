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

const viewer = document.createElement('div');
viewer.className = 'gallery-viewer';

const previousPhoto = document.createElement('button');
previousPhoto.type = 'button';
previousPhoto.id = 'gallery-prev';
previousPhoto.className = 'gallery-arrow';
previousPhoto.setAttribute('aria-label', 'Previous photo');
previousPhoto.textContent = '‹';

const nextPhoto = document.createElement('button');
nextPhoto.type = 'button';
nextPhoto.id = 'gallery-next';
nextPhoto.className = 'gallery-arrow';
nextPhoto.setAttribute('aria-label', 'Next photo');
nextPhoto.textContent = '›';

dialogImage.replaceWith(viewer);
viewer.append(previousPhoto, dialogImage, nextPhoto);

const galleryCount = document.createElement('p');
galleryCount.id = 'gallery-count';
galleryCount.className = 'gallery-count';
galleryCount.setAttribute('aria-live', 'polite');

const galleryThumbnails = document.createElement('div');
galleryThumbnails.id = 'gallery-thumbnails';
galleryThumbnails.className = 'gallery-thumbnails';
galleryThumbnails.setAttribute('aria-label', 'Project photos');
dialogDescription.parentElement.after(galleryCount, galleryThumbnails);

const categories = ['All', ...new Set(projects.map(project => project.category).filter(Boolean))];
let activeProject = null;
let activePhotoIndex = 0;

function showPhoto(index) {
  if (!activeProject) return;

  const photos = activeProject.photos;
  activePhotoIndex = (index + photos.length) % photos.length;
  const photo = photos[activePhotoIndex];

  dialogImage.src = photo.src;
  dialogImage.alt = photo.alt || activeProject.title || 'Completed project';
  galleryCount.textContent = `Photo ${activePhotoIndex + 1} of ${photos.length}`;

  galleryThumbnails.querySelectorAll('button').forEach((button, i) => {
    button.setAttribute('aria-current', String(i === activePhotoIndex));
  });

  galleryThumbnails.children[activePhotoIndex]?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest'
  });
}

function openProject(project) {
  activeProject = project;
  galleryThumbnails.replaceChildren();

  dialogTitle.textContent = project.title || 'Completed project';
  dialogDescription.textContent = [
    project.category,
    project.location,
    project.description
  ].filter(Boolean).join(' · ');

  const multiple = project.photos.length > 1;
  previousPhoto.hidden = !multiple;
  nextPhoto.hidden = !multiple;
  galleryThumbnails.hidden = !multiple;

  project.photos.forEach((photo, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Show photo ${i + 1} of ${project.photos.length}`);

    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = '';
    image.loading = 'lazy';

    button.append(image);
    button.addEventListener('click', () => showPhoto(i));
    galleryThumbnails.append(button);
  });

  galleryDialog.showModal();
  showPhoto(0);
}

function renderGallery(category = 'All') {
  galleryGrid.replaceChildren();
  const visible = projects.filter(project =>
    category === 'All' || project.category === category
  );
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

    const cover = document.createElement('button');
    cover.type = 'button';
    cover.className = 'gallery-cover';
    cover.setAttribute(
      'aria-label',
      `View ${project.photos.length} photo${project.photos.length === 1 ? '' : 's'} of ${project.title || 'project'}`
    );

    const coverImage = document.createElement('img');
    coverImage.src = project.photos[0].src;
    coverImage.alt = project.photos[0].alt || project.title || 'Completed project';
    coverImage.loading = 'lazy';
    coverImage.decoding = 'async';

    const photoLabel = document.createElement('span');
    photoLabel.textContent =
      `View ${project.photos.length} photo${project.photos.length === 1 ? '' : 's'} →`;

    cover.append(coverImage, photoLabel);
    cover.addEventListener('click', () => openProject(project));

    card.append(cover, meta, title, summary);
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
      galleryFilters.querySelectorAll('button').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      renderGallery(category);
    });

    galleryFilters.append(button);
  });
}

renderGallery();

galleryDialog.querySelector('.gallery-close')
  .addEventListener('click', () => galleryDialog.close());

galleryDialog.addEventListener('click', event => {
  if (event.target === galleryDialog) galleryDialog.close();
});

previousPhoto.addEventListener('click', () => showPhoto(activePhotoIndex - 1));
nextPhoto.addEventListener('click', () => showPhoto(activePhotoIndex + 1));

galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showPhoto(activePhotoIndex - 1);
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(activePhotoIndex + 1);
  }
});

galleryDialog.addEventListener('close', () => {
  activeProject = null;
});
