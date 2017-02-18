'use strict';
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var invisible = 'invisible';
var upload = document.querySelector('.upload');
var uploadSelectImage = upload.querySelector('#upload-select-image');
var uploadFile = upload.querySelector('#upload-file');
var uploadOverlay = upload.querySelector('.upload-overlay');
var formCancel = upload.querySelector('.upload-form-cancel');
var filters = upload.querySelectorAll('.upload-filter-label');
var imagePreview = upload.querySelector('.filter-image-preview');
var prevFilter;
var buttonDec = upload.querySelector('.upload-resize-controls-button-dec');
var buttonInc = upload.querySelector('.upload-resize-controls-button-inc');
var resizeValue = upload.querySelector('.upload-resize-controls-value');
var resizeMin = 25;
var resizeMax = 100;
var resizeStep = 25;
var zoom;

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

var removePrevClass = function () {
  if (prevFilter) {
    removeClass(imagePreview, prevFilter);
  }
};

/**
* Функция добавляет % к числу num
* @param {int} num число к которому необходимо добавить %
* @return {string} num + '%'
*/
var addParcent = function (num) {
  return num + '%';
};
/**
 * Функция применяет к elem трансформацию
 * @param {object} elem элемент DOM дерева
 * @param {int} scale величина трансформации
 */
var setupZoom = function (elem, scale) {
  elem.style.transform = 'scale(' + (scale / 100).toFixed(2) + ')';
};
/**
 * Функция устанавливает стартовые значения
 */
var startSettings = function () {
  zoom = resizeMax;
  resizeValue.value = addParcent(resizeMax);
  setupZoom(imagePreview, resizeMax);
  removePrevClass();
  addClass(buttonInc, invisible);
  removeClass(buttonDec, invisible);
};
/**
 * Функция проверки максимума для zoom
 */
var isMax = function () {
  if (zoom >= resizeMax) {
    zoom = resizeMax;
    addClass(buttonInc, invisible);
  } else {
    if (checkContains(buttonDec, invisible)) {
      removeClass(buttonDec, invisible);
    }
  }
};
/**
 * Функция проверки минимума для zoom
 */
var isMin = function () {
  if (zoom <= resizeMin) {
    zoom = resizeMin;
    addClass(buttonDec, invisible);
  } else {
    if (checkContains(buttonInc, invisible)) {
      removeClass(buttonInc, invisible);
    }
  }
};
/**
 * Функция расчета значения zoom
 * @param {boolean} action параметр функции если true то +, если false то -
 * @return {number} возвразает значение параметра zoom
 */
var calcZoom = function (action) {
  if (action) {
    zoom += resizeStep;
    isMax();
  } else {
    zoom -= resizeStep;
    isMin();
  }
  return zoom;
};
var setupKeyDownHandler = function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    uploadFile.value = '';
    startSettings();
    removeClass(uploadSelectImage, invisible);
    addClass(uploadOverlay, invisible);
  }
};

var openUploadOverlay = function () {
  startSettings();
  removeClass(uploadOverlay, invisible);
  document.addEventListener('keydown', setupKeyDownHandler);
  addClass(uploadSelectImage, invisible);
};

var closeUploadOverlay = function () {
  uploadFile.value = '';
  startSettings();
  removeClass(uploadSelectImage, invisible);
  addClass(uploadOverlay, invisible);
  document.removeEventListener('keydown', setupKeyDownHandler);
};

var decZoom = function () {
  var rValue = calcZoom(false);
  setupZoom(imagePreview, rValue);
  resizeValue.value = addParcent(rValue);
};

var incZoom = function () {
  var rValue = calcZoom(true);
  setupZoom(imagePreview, rValue);
  resizeValue.value = addParcent(rValue);
};

var isActiveEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};
uploadFile.addEventListener('change', openUploadOverlay);
formCancel.addEventListener('click', closeUploadOverlay);
formCancel.addEventListener('keydown', function (evt) {
  if (isActiveEvent(evt)) {
    closeUploadOverlay();
  }
});
buttonDec.addEventListener('click', decZoom);
buttonInc.addEventListener('click', incZoom);

for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener('click', function (e) {
    removePrevClass();
    var currentFilter = 'filter-' + document.querySelector('#' + e.currentTarget.htmlFor).value;

    addClass(imagePreview, currentFilter);
    prevFilter = currentFilter;
  });
}

for (i = 0; i < filters.length; i++) {
  filters[i].addEventListener('keydown', function (evt) {
    if (isActiveEvent(evt)) {
      removePrevClass();
      var currentFilter = 'filter-' + document.querySelector('#' + evt.currentTarget.htmlFor).value;

      addClass(imagePreview, currentFilter);
      prevFilter = currentFilter;
    }
  });
}
