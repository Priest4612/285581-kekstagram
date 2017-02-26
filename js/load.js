'use strict';

window.load = (function () {

  return function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', callback);
    xhr.open('GET', url);
    xhr.send();
  };
})();
