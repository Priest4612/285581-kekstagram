'use strict';

window.ShowGallery = function () {
  var galleryOpenOverlay = document.querySelector('.gallery-overlay');
  var galleryCloseOverlay = document.querySelector('.gallery-overlay-close');
  var image = document.querySelector('.gallery-overlay-image');
  var commentsCount = document.querySelector('.comments-count');
  var likesCount = document.querySelector('.likes-count');


  this.getImage = function (url, comments, likes) {
    galleryOpenOverlay.classList.remove('invisible');
    image.src = url;
    commentsCount.innerText = comments;
    likesCount.innerText = likes;
  };

  galleryCloseOverlay.addEventListener('click', function () {
    galleryOpenOverlay.classList.add('invisible');
  });
  galleryCloseOverlay.addEventListener('keydown', function (evt) {
    if (window.utils.isActivate(evt)) {
      galleryOpenOverlay.classList.add('invisible');
    }
  });
};
