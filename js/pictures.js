'use strict';

window.pictures = (function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var templates = document.querySelector('#picture-template');
  var pictures = [];
  var loadData = function () {
    window.load(DATA_URL, function (data) {
      pictures = data;
    });
  };
  loadData();
  return {
    pictures: pictures
  };
})();
