import { getPhotosFun } from './pixabay-api-func';
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

formEl.addEventListener('submit', onSubmit);
let currentPage = 1;
let query = '';
// ****************************************************************************

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observe) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      getPhotosFun(query, currentPage)
        .then(result => {
          console.log('query: ', query);
          result.page += 1;
          galleryEl.insertAdjacentHTML(
            'beforeend',
            createGalleryCard(result.hits)
          );
          console.log('insertAdjacentHTML');
          console.log('result.totalHits ', result.totalHits);
          const lastPage = Math.ceil(result.totalHits / 40);
          console.log('lastPage:', lastPage);
          if (lastPage === currentPage) {
            console.log('message');
            messageLastPage();
            observer.unobserve(target);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  });
}

// ****************************************************************************

function onSubmit(evt) {
  evt.preventDefault();
  const query = evt.currentTarget.elements['user-search-query'].value.trim();
  if (query === '') {
    galleryEl.innerHTML = '';
    return onEmpty();
  }
  addLoader();
  getPhotosFun(query, currentPage)
    .then(result => {
      galleryEl.innerHTML = createGalleryCard(result.hits);
      if (result.totalHits === 0) {
        return onError();
      }
      observer.observe(target);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      console.log('finally');
      hideLoader();
    });
}
// ****************************************************************************
