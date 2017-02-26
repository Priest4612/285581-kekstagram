'use strict';
var cssClassInvisible = 'invisible';
var startScale = 100;

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadImage = document.querySelector('#upload-select-image');
var uploadFile = uploadImage.querySelector('#upload-file');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var filters = document.querySelectorAll('.upload-filter-label');
var imagePreview = document.querySelector('.filter-image-preview');
var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
var resizeValue = document.querySelector('.upload-resize-controls-value');
var currentFilter;


var setupScale = function (image, currentScale) {
  image.style.transform = 'scale(' + (currentScale / 100).toFixed(2) + ')';
};

var removePrevFilter = function (image, prevFilter) {
  if (prevFilter) {
    image.classList.remove(prevFilter);
  }
};

var applyFilter = function (image, nextFilter, prevFilter) {
  removePrevFilter(image, prevFilter);
  image.classList.add(nextFilter);
  currentFilter = nextFilter;
};

var openFormCropImage = function () {
  uploadImage.classList.add(cssClassInvisible);
  uploadOverlay.classList.remove(cssClassInvisible);
  window.initializeScale.scale = startScale;
  removePrevFilter(imagePreview, currentFilter);
  setupScale(imagePreview, window.initializeScale.scale);
  window.initializeScale.setResizeControlsValue(resizeValue, window.initializeScale.scale);
};
var closeFormCropImage = function () {
  uploadImage.classList.remove(cssClassInvisible);
  uploadOverlay.classList.add(cssClassInvisible);
  uploadFile.value = '';
};

uploadFile.addEventListener('change', openFormCropImage);
uploadFormCancel.addEventListener('click', closeFormCropImage);
window.initializeFilters.setFilter(filters, imagePreview, applyFilter);
window.initializeScale.resizeDecScaleImage(buttonDec, imagePreview, resizeValue, setupScale);
window.initializeScale.resizeIncScaleImage(buttonInc, imagePreview, resizeValue, setupScale);
