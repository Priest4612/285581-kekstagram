'use strict';

window.initializeFilters = {
  prevFilter: null,
  removePrevFilter: function (image, prevFilter) {
    if (prevFilter) {
      image.classList.remove(prevFilter);
    }
  },
  setCurrentFilter: function (evt, image) {
    this.removePrevFilter(image, this.prevFilter);
    var currentFilter = 'filter-' + document.querySelector('#' + evt.currentTarget.htmlFor).value;
    image.classList.add(currentFilter);
    this.prevFilter = currentFilter;
  },
  setFilter: function (filters, image) {
    var self = this;
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', function (evt) {
        self.setCurrentFilter(evt, image);
      });
      filters[i].addEventListener('keydown', function (evt) {
        if (window.utils.isActivate(evt)) {
          self.setCurrentFilter(evt, image);
        }
      });
    }
  }
};
