'use strict';

window.initializeFilters = (function () {
  var prevFilter = null;
  var removePrevFilter = function (image) {
    if (prevFilter) {
      image.classList.remove(prevFilter);
    }
  };
  var setCurrentFilter = function (evt, image) {
    removePrevFilter(image);
    var currentFilter = 'filter-' + document.querySelector('#' + evt.currentTarget.htmlFor).value;
    image.classList.add(currentFilter);
    prevFilter = currentFilter;
  };
  var setFilter = function (filters, image) {
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', function (evt) {
        setCurrentFilter(evt, image);
      });
      filters[i].addEventListener('keydown', function (evt) {
        if (window.utils.isActivate(evt)) {
          setCurrentFilter(evt, image);
        }
      });
    }
  };
  return {
    prevFilter: prevFilter,
    removePrevFilter: removePrevFilter,
    setFilter: setFilter
  };
})();
