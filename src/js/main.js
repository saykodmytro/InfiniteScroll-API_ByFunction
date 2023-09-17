import { PixabayAPI } from './pixabay-api-class';
import { createGalleryCard } from './createGalleryCard';
import { galleryEl, target, formEl } from './refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  onError,
  onEmpty,
  addLoader,
  hideLoader,
  messageTotalPhoto,
  messageLastPage,
} from './function.js';

let currentPage = 1;

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      onMoreData();
    }
  });
}

const pixabayApi = new PixabayAPI(40);
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

formEl.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  pixabayApi.page = 1;

  const searchQuery =
    evt.currentTarget.elements['user-search-query'].value.trim();
  pixabayApi.q = searchQuery;
  if (pixabayApi.q === '') {
    galleryEl.innerHTML = '';
    return onEmpty();
  }

  try {
    const resp = await pixabayApi.getPhotos();
    galleryEl.innerHTML = createGalleryCard(resp.hits);
    observer.observe(target);
    lightbox.refresh();
    // smoothScroll();
    if (resp.totalHits === 0) {
      hideLoader();
      return onError();
    }
    messageTotalPhoto(resp.totalHits);
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}

async function onMoreData(evt) {
  pixabayApi.page += 1;

  try {
    const resp = await pixabayApi.getPhotos();
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(resp.hits));
    lightbox.refresh();
    const averagePage = Math.ceil(resp.total / pixabayApi.perPage);
    if (averagePage === pixabayApi.page) {
      hideLoader();
      observer.unobserve(target);
      messageLastPage();
    }
  } catch (error) {
    console.log(error);
  }
}
