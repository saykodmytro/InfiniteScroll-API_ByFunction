import { getPhotosFun } from './pixabay-api-func';
import { createGalleryCard } from './createGalleryCard';
import { galleryEl, target, formEl } from './refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  onError,
  chekOnEmpty,
  addLoader,
  hideLoader,
  messageTotalPhoto,
  messageLastPage,
  onToTopBtn,
} from './function.js';
// ****************************************************************************

let inputQuery = '';
let page = 1;

onToTopBtn();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

//****************************************************************************

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observe) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entries);
      page += 1;
      displayPhotos();
    }
  });
}

// ****************************************************************************
formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  galleryEl.innerHTML = '';
  const query = evt.currentTarget.elements['user-search-query'].value.trim();
  inputQuery = query;
  console.log('Input: ', inputQuery);

  if (chekOnEmpty(inputQuery)) {
    return;
  }
  displayPhotos();
}
// ****************************************************************************

async function displayPhotos() {
  try {
    const result = await getPhotosFun(inputQuery, page);
    if (result.totalHits === 0) {
      return onError();
    }
    addLoader();
    createGalleryCard(result.hits, galleryEl);
    lightbox.refresh();
    observer.observe(target);

    const lastPage = Math.ceil(result.totalHits / 40);
    if (lastPage === page) {
      console.log('messageLastPage');
      messageLastPage();
      observer.unobserve(target);
    }
    if (page === 1) {
      messageTotalPhoto(result.total);
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log('finally');
    hideLoader();
  }
}

// ****************************************************************************

