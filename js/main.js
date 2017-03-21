$(function ready() {
  'use strict';
  //Main menu
  $('#mainMenuToggler').click(function (event) {
    $('#mainMenu').toggleClass($('#mainMenu')[0].dataset.toggleClass);
  });
  $('#menuButtonNext').click(function(){
    $(this).parent().siblings().hide();
    $(this).siblings('ul').show();
  });
  $('#menuButtonPrev').click(function(){
    $(this).parents('ul').hide();
    $(this).parents('.menu__item_container').siblings().show();
    $(this).parents('.menu__list:not(.menu__list_dropdown)').show();
  });

  //caching
  var logoTitle = $('.logo_title'),
      logoHead = $('.logo_header'),
      pageHeader = $('.page__header'),
      pageMenu = $('#mainMenu'),
      body = $(document.body);
  
  // Hide head on scroll & sticky header & menu
  $(window).scroll(throttle(hideHead,50));
  function hideHead(){
    if(window.innerWidth < 768)return;
    //console.info($(window).scrollTop())
    if($(window).scrollTop()){
      pageMenu.addClass('menu_sticky');
      pageHeader.addClass('page__header_sticky');
      body.addClass('page_sticky');
      logoHead.removeClass('fadeIn').addClass('fadeOut');
      logoTitle.removeClass('fadeOut').addClass('fadeIn');
    }else{
      pageHeader.removeClass('page__header_sticky');
      pageMenu.removeClass('menu_sticky');
      body.removeClass('page_sticky');
      logoHead.removeClass('fadeOut').addClass('fadeIn');
      logoTitle.removeClass('fadeIn').addClass('fadeOut');
    }
  }
  // Throttle
  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
      deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
        args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }
});