'use strict';

window.initializeScale = {
  scale: null,
  resizeMin: 25,
  resizeMax: 100,
  resizeStep: 25,
  isMinScale: function () {
    if (this.scale < this.resizeMin) {
      this.scale = this.resizeMin;
    }
  },
  isMaxScale: function () {
    if (this.scale > this.resizeMax) {
      this.scale = this.resizeMax;
    }
  },
  calcScale: function (action) {
    if (action) {
      this.scale += this.resizeStep;
      this.isMaxScale();
    } else {
      this.scale -= this.resizeStep;
      this.isMinScale();
    }
    return this.scale;
  },
  setupScale: function (image, scale) {
    image.style.transform = 'scale(' + (scale / 100).toFixed(2) + ')';
  },
  setResizeControlsValue: function (resizeControlValue, currentScale) {
    resizeControlValue.value = currentScale + '%';
  },
  decScale: function (image, resizeControlValue) {
    var currentScale = this.calcScale(false);
    this.setupScale(image, currentScale);
    this.setResizeControlsValue(resizeControlValue, currentScale);
  },
  incScale: function (image, resizeControlValue) {
    var currentScale = this.calcScale(true);
    this.setupScale(image, currentScale);
    this.setResizeControlsValue(resizeControlValue, currentScale);
  },
  resizeDecScaleImage: function (elem, image, resizeControlValue) {
    var self = this;
    elem.addEventListener('click', function () {
      self.decScale(image, resizeControlValue);
    });
    elem.addEventListener('keydown', function (evt) {
      if (window.utils.isActivate(evt)) {
        self.decScale(image, resizeControlValue);
      }
    });
  },
  resizeIncScaleImage: function (elem, image, resizeControlValue) {
    var self = this;
    elem.addEventListener('click', function () {
      self.incScale(image, resizeControlValue);
    });
    elem.addEventListener('keydown', function (evt) {
      if (window.utils.isActivate(evt)) {
        self.incScale(image, resizeControlValue);
      }
    });
  }
};
