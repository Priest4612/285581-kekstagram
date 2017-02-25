'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var isActivate = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
  return {
    isActivate: isActivate
  };
})();
