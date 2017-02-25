'use strict';

window.utils = {
  ENTER_KEY_CODE: 13,
  ESCAPE_KEY_CODE: 27,
  isActivate: function (evt) {
    return evt.keyCode && evt.keyCode === this.ENTER_KEY_CODE;
  }
};
