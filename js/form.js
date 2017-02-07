'use strict';
var invisible = 'invisible';
var upload = document.querySelector('.upload');
var uploadSelectImage = upload.querySelector('#upload-select-image');
var uploadFile = upload.querySelector('#upload-file');
var uploadOverlay = upload.querySelector('.upload-overlay');

var formCancel = upload.querySelector('.upload-form-cancel');

var filters = upload.querySelectorAll('.upload-filter-label');
var imagePreview = upload.querySelector('.filter-image-preview');

var buttonDec = upload.querySelector('.upload-resize-controls-button-dec');
var buttonInc = upload.querySelector('.upload-resize-controls-button-inc');
var resizeValue = upload.querySelector('.upload-resize-controls-value');
var resizeMin = 25;
var resizeMax = 100;
var resizeStep = 25;

/**
 * Функция удаляет заданный класс в указанном элементе.
 * @param {object} elem элемент дом дерева
 * @param  {string} cls имя класса удаляемого из элемента
 */
var removeClass = function (elem, cls) {
  elem.classList.remove(cls);
};

/**
 * Функция добавляет заданный класс cls в указанном элементе (elem)
 * @param {object} elem элемент дом дерева
 * @param {string} cls имя класса добавляемого в элемента
 */
var addClass = function (elem, cls) {
  elem.classList.add(cls);
};

/**
 * Функция проверяет наличие заданного класса в указанном элементе
 * @param {object} elem элемент дом дерева
 * @param {string} cls имя класса добавляемого в элемента
 * @return {boolean} возращает true или false
 */
var checkContains = function (elem, cls) {
  return elem.classList.contains(cls);
};

uploadFile.addEventListener('change', function () {
  removeClass(uploadOverlay, invisible);
  addClass(uploadSelectImage, invisible);
});

formCancel.addEventListener('click', function () {
  uploadFile.value = '';
  removeClass(uploadSelectImage, invisible);
  addClass(uploadOverlay, invisible);
});

for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener('click', function (e) {
    var currentFilter = 'filter-' + document.querySelector('#' + e.currentTarget.htmlFor).value;
    for (var j = imagePreview.classList.length - 1; j !== 0; j--) {
      if (imagePreview.classList[j] !== 'filter-image-preview') {
        removeClass(imagePreview, imagePreview.classList[j]);
      }
    }
    addClass(imagePreview, currentFilter);
  });
}

buttonDec.addEventListener('click', function () {
  var rValue = +resizeValue.value.slice(0, -1);
  rValue -= resizeStep;
  if (rValue <= resizeMin) {
    addClass(buttonDec, invisible);
    rValue = resizeMin;
  }
  if (checkContains(buttonInc, invisible)) {
    removeClass(buttonInc, invisible);
  }
  var scale = ['scale(', (rValue / 100).toFixed(2), ')'].join('');
  imagePreview.style.transform = scale;
  resizeValue.value = [rValue, '%'].join('');
});

buttonInc.addEventListener('click', function () {
  var rValue = +resizeValue.value.slice(0, -1);
  rValue += resizeStep;
  if (rValue >= resizeMax) {
    addClass(buttonInc, invisible);
    rValue = resizeMax;
  }
  if (checkContains(buttonDec, invisible)) {
    removeClass(buttonDec, invisible);
  }
  var scale = ['scale(', (rValue / 100).toFixed(2), ')'].join('');
  imagePreview.style.transform = scale;
  resizeValue.value = [rValue, '%'].join('');
});
