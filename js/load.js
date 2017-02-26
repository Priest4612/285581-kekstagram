'use strict';

window.load = (function () {

  return function (url, onload) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onload);
    xhr.open('GET', url);
    xhr.send();
  };
})();
