export function createGalleryCard(gallery, container) {
  const markup = gallery
    .map(image => {
      return `<div class="photo-card">
     <a class = "gallary__item" href="${image.largeImageURL}">
      <img class ="gallery__image"  src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/></a>
    <div class="info">
      <p class="info-item">
        <b>Likes: </b>${image.likes}
      </p>
      <p class="info-item">
        <b>Views: </b>${image.views}
      </p>
      <p class="info-item">
        <b>Comments: </b>${image.comments}
      </p>
      <p class="info-item">
        <b>Dowloads: </b>${image.downloads}
      </p>
    </div>
  </div>`;
    })
    .join('');
  // container.innerHTML = markup;
  container.insertAdjacentHTML('beforeend', markup);
}
