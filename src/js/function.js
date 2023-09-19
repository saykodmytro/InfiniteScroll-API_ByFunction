import { Notify } from 'notiflix';
import { loaderEl } from './refs';
import { galleryEl } from './refs';

export function messageTotalPhoto(obj) {
  return Notify.success(`Hooray! We found ${obj} images.`);
}

export function onError() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

export function chekOnEmpty(obj) {
  if (obj === '') {
    galleryEl.innerHTML = '';
    Notify.warning('Input is empty');
    return true;
  }
  return false;
}

export function messageLastPage() {
  return Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

export function addLoader() {
  console.log('addLoader');
  loaderEl.classList.add('active');
}

export function hideLoader() {
  loaderEl.classList.remove('active');
  console.log('hideLoader');
}


export function smoothScroll() {
  setTimeout(() => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }, 500);
}