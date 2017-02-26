'use strict';

window.showGallery = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var image = document.querySelector('.gallery-overlay-image');
  var commentsCount = document.querySelector('.comments-count');
  var likesCount = document.querySelector('.likes-count');


  var getImage = function (url, comments, likes) {
    galleryOverlay.classList.remove('invisible');
    image.src = url;
    commentsCount.innerText = comments;
    likesCount.innerText = likes;
  };

  return {
    getImage: getImage
  };
};
