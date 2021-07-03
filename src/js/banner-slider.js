/**
 * @name banner hero banner slider
 * @function handle slider banner
 */

var $carousel = $('#banner_slider');
var $carouselNav = $('#banner_nav a');

$(function() {
  // slick carousel config
  $carousel.slick({
    dots: false,
    arrows: false,
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          dots: true
        }
      }
    ]
  });
});

$carouselNav.click(function() {
  var index = $(this).data("slide");
  $carousel.slick('slickGoTo', index);
});

$carousel.on('afterChange', function(event, slick, currentSlide){
  var active = currentSlide;
  $carouselNav.removeClass("active");
  $('#banner_nav > a[data-slide='+active+']').addClass("active");
});
