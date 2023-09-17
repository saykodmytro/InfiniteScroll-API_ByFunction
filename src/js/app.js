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

// ****************************************************************************
// Виклик функції і очікування результату
getPhotosFun()
  .then(result => {
    // Результат доступний тут, можна його використовувати
    console.log('Результат:', result);
  })
  .catch(err => {
    // Обробка помилок, якщо вони сталися під час виконання запиту або функції
    console.error('Помилка виконання запиту або функції:', err);
  });
// ****************************************************************************
