import { getPhotosFun } from './pixabay-api-func';
import { createGalleryCard } from './createGalleryCard';
import { galleryEl, target, formEl } from './refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  onError,
  onEmpty,
  chekOnEmpty,
  addLoader,
  hideLoader,
  messageTotalPhoto,
  messageLastPage,
} from './function.js';

let inputQuery = '';
let page = 1;

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

function displayPhotos() {
  getPhotosFun(inputQuery, page)
    .then(result => {
      console.log('result :', result);
      console.log('result.hits:', result.hits);
      console.log('result.totalHits: ', result.totalHits);
      console.log('page: ', page);
      if (result.totalHits === 0) {
        return onError();
      }
      createGalleryCard(result.hits, galleryEl);
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

// getPhotosFun(query, currentPage)
//   .then(result => {
//     console.log('query: ', query);
//     result.page += 1;
//     galleryEl.insertAdjacentHTML(
//       'beforeend',
//       createGalleryCard(result.hits)
//     );
//     console.log('insertAdjacentHTML');
//     console.log('result.totalHits ', result.totalHits);
//     const lastPage = Math.ceil(result.totalHits / 40);
//     console.log('lastPage:', lastPage);
//     if (lastPage === currentPage) {
//       console.log('message');
//       messageLastPage();
//       observer.unobserve(target);

// galleryEl.innerHTML = createGalleryCard(result.hits);

// if ((page = 1)) {
//   messageTotalPhoto(result.total);
// }
