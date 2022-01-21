/**
 * @name _common
 * @function handle scroling
 * @function initial parallax, tooltip, carousel, etc
 */

var $header = $('header.header.app-bar');
var $pageNav = $("#page_nav");
var sticky = 0;

// Sticky header
if($("#header").length > 0) {
  sticky = $header[0].offsetTop + 80;
}

function fixedNav() {
  if (window.pageYOffset > sticky) {
    $header.addClass("fixed");
  } else {
    $header.removeClass("fixed");
  }
}

// Bottom right navigation,
function fixedFabNav() {
  if (window.pageYOffset > 500) {
    $pageNav.addClass("show");
  } else {
    $pageNav.removeClass("show");
  }
}

/**
 * @name Feature Progress
 * @function handle progress on scroll window
 */

var progressOffset = 0;

var $progress = $('#progress').offset();
if($("#progress").length > 0) {
  progressOffset = $progress.top - 50;
}

function playProgress() {
  if (window.pageYOffset > progressOffset) {
    $('#progress').removeClass('zero');
  }
}


$(document).ready(function(){
  // Fixed nav
  setTimeout(function() {
    window.onscroll = function() {
      playProgress();
      fixedNav();
      fixedFabNav();
    };
  }, 500)
  // Preloader
  $('#preloader').delay(1000).fadeOut('fast');
  $(".transition-page").addClass('page-fadeUp-transition-enter').delay(1000).queue(function(){
    $(this)
    .removeClass('page-fadeUp-transition-enter')
    .addClass('page-fadeUp-transition-enter-active')
    .dequeue()
    .delay(1400).queue(function(){
      $(this)
      .removeClass('page-fadeUp-transition-enter-active')
      .addClass('page-fadeUp-transition-exit')
      .dequeue();
    })
  });
  
  // Open Page scroll navigation
  $('.scrollnav').navScroll({
    scrollSpy: true,
    activeParent: true,
    activeClassName: 'current'
  });
  
  // initial wow
  new WOW().init();
    
  // Accordion init
  $('.collapsible').collapsible();
  var elem = document.querySelector('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });

  // Select
  $('.select').formSelect();

  // Tooltip initial
  $('.tooltipped').tooltip();

  // slick carousel config
  $('.slick-carousel').slick({
    dots: false,
    arrows: false,
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 30000,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
