import { Notify } from 'notiflix';
import { galleryEl, toTopBtn, loaderEl } from './refs';

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

window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);

export function onScroll() {
  const scrolled = window.scrollY;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    toTopBtn.classList.add('btn-to-top-visible');
  }
  if (scrolled < coords) {
    toTopBtn.classList.remove('btn-to-top-visible');
  }
}

export function onToTopBtn() {
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
