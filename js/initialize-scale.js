'use strict';

window.initializeScale = (function () {
  var scale = 100;
  var scaleMin = 25;
  var scaleMax = 100;
  var scaleStep = 25;
  var isMinScale = function () {
    if (scale < scaleMin) {
      scale = scaleMin;
    }
  };
  var isMaxScale = function () {
    if (scale > scaleMax) {
      scale = scaleMax;
    }
  };
  var calcScale = function (action) {
    if (action) {
      scale += scaleStep;
      isMaxScale();
    } else {
      scale -= scaleStep;
      isMinScale();
    }
    return scale;
  };
  var setupScale = function (image, currentScale) {
    image.style.transform = 'scale(' + (currentScale / 100).toFixed(2) + ')';
  };
  var setResizeControlsValue = function (resizeControlValue, currentScale) {
    resizeControlValue.value = currentScale + '%';
  };
  var decScale = function (image, resizeControlValue) {
    var currentScale = calcScale(false);
    setupScale(image, currentScale);
    setResizeControlsValue(resizeControlValue, currentScale);
  };
  var incScale = function (image, resizeControlValue) {
    var currentScale = calcScale(true);
    setupScale(image, currentScale);
    setResizeControlsValue(resizeControlValue, currentScale);
  };
  var resizeDecScaleImage = function (elem, image, resizeControlValue) {
    elem.addEventListener('click', function () {
      decScale(image, resizeControlValue);
    });
    elem.addEventListener('keydown', function (evt) {
      if (window.utils.isActivate(evt)) {
        decScale(image, resizeControlValue);
      }
    });
  };
  var resizeIncScaleImage = function (elem, image, resizeControlValue) {
    elem.addEventListener('click', function () {
      incScale(image, resizeControlValue);
    });
    elem.addEventListener('keydown', function (evt) {
      if (window.utils.isActivate(evt)) {
        incScale(image, resizeControlValue);
      }
    });
  };
  return {
    scale: scale,
    setupScale: setupScale,
    setResizeControlsValue: setResizeControlsValue,
    resizeDecScaleImage: resizeDecScaleImage,
    resizeIncScaleImage: resizeIncScaleImage
  };
})();
