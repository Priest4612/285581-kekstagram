'use strict';

window.pictures = (function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var filters = document.querySelector('.filters');
  filters.classList.remove('hidden');
  window.load(DATA_URL, function (evt) {
    var pictures = JSON.parse(evt.target.responseText);

    var templateElement = document.querySelector('#picture-template');
    var elementToClone = templateElement.content.querySelector('.picture');
    var picturesPlace = document.querySelector('.pictures');
    var newElement;

    for (var i = 0; i < pictures.length; i++) {
      var picture = pictures[i];
      newElement = elementToClone.cloneNode(true);
      newElement.src = picture.url;
      newElement.querySelector('img').src = picture.url;
      newElement.querySelector('img').setAttribute('tabindex', '0');
      newElement.querySelector('.picture-comments').innerText = picture.comments.length;
      newElement.querySelector('.picture-likes').innerText = picture.likes;

      picturesPlace.appendChild(newElement);
    }
  });
  var getCurrentPictur = function (evt) {
    var currentPicture = document.querySelector('.' + evt.currentTarget.htmlFor).value;
    var urlImg = currentPicture.querySelector('.img').src.value;
    var commentsImg = currentPicture.querySelector('.picture-comments').value;
    var likeImg = currentPicture.querySelector('.picture-likes').value;
    window.showGallery.getImage(urlImg, commentsImg, likeImg);
  };

  var getPictures = function () {
    var pictures = document.querySelectorAll('.pictures');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', function (evt) {
        getCurrentPictur(evt);
      });
      pictures[i].addEventListener('keydown', function (evt) {
        if (window.utils.isActivate(evt)) {
          getCurrentPictur(evt);
        }
      });
    }
  };
  getPictures();
})();

// (function () {
//   var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
//   var templates = document.querySelector('#picture-template');
//   var pictures = [];
//   var loadData = function (evt) {
//     pictures = JSON.parse(evt.target.responseText);
//   };
//   window.load(DATA_URL, loadData);
//
//   for (var i = 0; i < pictures.length; i++) {
//
//   }
//
//   return {
//     pictures: pictures
//   };
// })();
