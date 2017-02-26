'use strict';

var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
var filters = document.querySelector('.filters');
filters.classList.remove('hidden');
var pictures = null;

function showPictures(type) {
  var elem = document.querySelectorAll('.picture');
  for (var j = elem.length - 1; j >= 0; j--) {
    if (elem[j].parentNode) {
      elem[j].parentNode.removeChild(elem[j]);
    }
  }

  var tmpPuctures = null;
  switch (type) {
    case 'filter-new':
      tmpPuctures = getRandomArrayElements(pictures, 10);
      break;
    case 'filter-discussed':
      tmpPuctures = cloneObject(pictures);
      tmpPuctures.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
      break;
    default:
      tmpPuctures = pictures;
      break;
  }

  var templateElement = document.querySelector('#picture-template');
  var elementToClone = templateElement.content.querySelector('.picture');
  var picturesPlace = document.querySelector('.pictures');
  var newElement;

  for (var i = 0; i < tmpPuctures.length; i++) {
    var picture = tmpPuctures[i];
    newElement = elementToClone.cloneNode(true);
    newElement.src = picture.url;
    newElement.querySelector('img').src = picture.url;
    newElement.querySelector('img').classList.add('pickture_' + i);
    newElement.querySelector('img').setAttribute('tabindex', '0');
    newElement.querySelector('.picture-comments').innerText = picture.comments.length;
    newElement.querySelector('.picture-likes').innerText = picture.likes;

    picturesPlace.appendChild(newElement);
  }

  document.querySelector('.filters').classList.remove('invisible');
}

window.load(DATA_URL, function (evt) {
  pictures = JSON.parse(evt.target.responseText);
  showPictures('filter-popular');
});

var getCurrentPictur = function (evt) {
  var currentPicture = evt.target;
  var urlImg = currentPicture.src;

  var commentsImg = currentPicture.parentElement.querySelector('.picture-comments').innerText;
  var likeImg = currentPicture.parentElement.querySelector('.picture-likes').innerText;

  new window.ShowGallery().getImage(urlImg, commentsImg, likeImg);
};

var setEventsForPictures = function () {
  pictures = document.querySelectorAll('.pictures');
  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.tagName === 'IMG') {
        getCurrentPictur(evt);
      }
    });
    pictures[i].addEventListener('keydown', function (evt) {
      if (window.utils.isActivate(evt)) {
        evt.preventDefault();
        getCurrentPictur(evt);
      }
    });
  }
};
setEventsForPictures();


document.querySelector('label[for="filter-popular"]').addEventListener('click', function (evt) {
  showPictures('filter-popular');
});
document.querySelector('label[for="filter-new"]').addEventListener('click', function (evt) {
  showPictures('filter-new');
});
document.querySelector('label[for="filter-discussed"]').addEventListener('click', function (evt) {
  showPictures('filter-discussed');
});


// subfunctions
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0);
  var i = arr.length;
  var min = i - count;
  var temp;
  var index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
//
// function cloneObject(obj) {
//   if (obj === null || typeof obj !== 'object') {
//     return void obj;
//   }
//
//   var temp = obj.constructor(); // give temp the original obj's constructor
//   for (var key in obj) {
//     temp[key] = cloneObject(obj[key]);
//     return temp;
//   }
// }

function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  var temp = obj.constructor(); // give temp the original obj"s constructor
  for (var key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      temp[key] = cloneObject(obj[key]);
    }
  }

  return temp;
}
