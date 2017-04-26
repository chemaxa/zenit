$(function () {
  'use strict';
  //Main menu
  $('[data-toggler]').click(function (event) {
    var toggleClass = $(this).data('toggle-class');
    var target = $(this).data('toggle');
    console.log($(target));
    $(target).toggleClass(toggleClass);
  });
});