'use strict';

window.initializeFilters = (function () {
  var prevFilter = null;

  var setCurrentFilter = function (evt, image, applyFilter) {
    var currentFilter = 'filter-' + document.querySelector('#' + evt.currentTarget.htmlFor).value;
    applyFilter(image, currentFilter, prevFilter);
    prevFilter = currentFilter;
  };
  var setFilter = function (filters, image, applyFilter) {
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', function (evt) {
        setCurrentFilter(evt, image, applyFilter);
      });
      filters[i].addEventListener('keydown', function (evt) {
        if (window.utils.isActivate(evt)) {
          setCurrentFilter(evt, image, applyFilter);
        }
      });
    }
  };
  return {
    prevFilter: prevFilter,
    setFilter: setFilter
  };
})();
