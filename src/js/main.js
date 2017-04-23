$(function () {
  'use strict';
  //Main menu
  $('[data-toggler]').click(function (event) {
    var toggleClass = $(this).data('toggle-class');
    var target = $(this).data('toggle');
    $(target).toggleClass(toggleClass);
  });
  // $('#menuButtonNext').click(function () {
  //   $(this).parent().siblings().hide();
  //   $(this).siblings('ul').show();
  // });
  // $('#menuButtonPrev').click(function () {
  //   $(this).parents('ul').hide();
  //   $(this).parents('.menu__item_container').siblings().show();
  //   $(this).parents('.menu__list:not(.menu__list_dropdown)').show();
  // });

  // $('.hamburger').click(function () {
  //   if ($('#mainMenu').hasClass('menu_main-active')) {
  //     $('.page__header').css('background-position', '-9999px -9999px').css('border-bottom', '1px solid #433b64');
  //     $('.logo__image-mobile').toggleClass('visible-xs').hide();
  //     $('.logo__image-inverted').toggleClass('hidden');
  //   } else {
  //     $('.page__header').css('background-position', '50% 50%').css('border-bottom', '0');;
  //     $('.logo__image-mobile').toggleClass('visible-xs').show();
  //     $('.logo__image-inverted').toggleClass('hidden');
  //   }
  //   $('.hamburger').toggleClass('active');
  // });
});