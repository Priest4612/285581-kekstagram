'use strict';
var cssClassInvisible = 'invisible';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadImage = document.querySelector('#upload-select-image');
var uploadFile = uploadImage.querySelector('#upload-file');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var filters = document.querySelectorAll('.upload-filter-label');
var imagePreview = document.querySelector('.filter-image-preview');
var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
var resizeValue = document.querySelector('.upload-resize-controls-value');

var openFormCropImage = function () {
  uploadImage.classList.add(cssClassInvisible);
  uploadOverlay.classList.remove(cssClassInvisible);
};
var closeFormCropImage = function () {
  uploadImage.classList.remove(cssClassInvisible);
  uploadOverlay.classList.add(cssClassInvisible);
  uploadFile.value = '';
  window.initializeFilters.removePrevFilter(imagePreview, window.initializeFilters.prevFilter);
};

uploadFile.addEventListener('change', openFormCropImage);
uploadFormCancel.addEventListener('click', closeFormCropImage);
window.initializeFilters.setFilter(filters, imagePreview);
window.initializeScaleImage.resizeDecScale(buttonDec, imagePreview, resizeValue);
window.initializeScaleImage.resizeIncScale(buttonInc, imagePreview, resizeValue);
