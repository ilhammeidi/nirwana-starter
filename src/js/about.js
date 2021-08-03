/**
 * @name Carousel
 * @function handle team and album carousel
 */

var $photoCarousel = $('#about_photo_carousel');
var $teamCarousel = $('#about_team_carousel');
var $teamPrev = $('#team_prev');
var $teamNext = $('#team_next');

$(document).ready(function(){
  // slick carousel album
  $photoCarousel.slick({
    dots: false,
    arrows: false,
    slidesToShow: 3,
    infinite: true,
    autoplay: false,
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

  // slick carousel team
  $teamCarousel.slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    variableWidth: true,
    autoplay: false,
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

  $teamPrev.click(function() {
    $photoCarousel.slick('slickPrev');
  });

  $teamNext.click(function() {
    $photoCarousel.slick('slickNext');
  });
});

/**
 * @name Lightbox
 * @function handle lightbox popup for album
 */

$photoCarousel.each(function() {
  $(this).magnificPopup({
    delegate: '.item a',
    type: 'image',
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: 'ease-in-out', // CSS transition easing function

      // The "opener" function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });
});

/**
 * @name video-iframe
 * @function handle youtube video iframe
 */

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video_iframe', {
    height: '360',
    width: '640',
    videoId: 'sf15CtXuw9M',
    playerVars : {
      autoplay: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function playVideo() {
  player.playVideo();
}

function stopVideo() {
  player.stopVideo();
}

$(function() {
  $('#video_modal.modal').modal({
    onOpenEnd: function() {
      playVideo();
    },
    onCloseEnd: function() {
      stopVideo();
    }
  });
  $('#video_modal.modal .modal-close').click(function(){
    stopVideo();
  })
});

