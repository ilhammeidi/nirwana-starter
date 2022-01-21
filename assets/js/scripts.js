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

/**
 * @name Chat
 * @function chating with with customer support
 * @function open and close (toggle) chat pannel
 */

var $chatPanel = $('#chat_panel'),
    $closeChat = $('#close_chat'),
    $chatContainer = $('#chat-container ul'),
    $chatField = $('#chat_field'),
    $sendMessage = $('#send_message'),
    $toggleChat = $('#toggle_chat');

$toggleChat.click(function() {
  $chatPanel.toggleClass('show')
});

$closeChat.click(function() {
  $chatPanel.removeClass('show')
});

function sendChat() {
  var chatVal = $chatField.val();
  $chatContainer.append('<li class="justify-content-end"><span class="talk">' + chatVal + '</span></li>')
  $chatField.val('');

  // scroll to bottom
  var ctn = document.getElementById('chat-container')
  setTimeout(function() {
    ctn.scrollTo(0, ctn.scrollHeight)
  }, 300);
}

$sendMessage.click(function() {
  sendChat();
});

$chatField.on('keypress',function(e) {
  if(e.which == 13) {
    sendChat();
  }
});

// Counter Scroll
(function ($) {
  $(window).on("load", function () {
    $(document).scrollzipInit();
    $(document).rollerInit();
  });
  $(window).on("load scroll resize", function () {
    $('.numscroller').scrollzip({
      showFunction: function () {
        numberRoller($(this).attr('data-slno'));
      },
      wholeVisible: false,
    });
  });
  $.fn.scrollzipInit = function () {
    $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
  };
  $.fn.rollerInit = function () {
    var i = 0;
    $('.numscroller').each(function () {
      i++;
      $(this).attr('data-slno', i);
      $(this).addClass("roller-title-number-" + i);
    });
  };
  $.fn.scrollzip = function (options) {
    var settings = $.extend({
      showFunction: null,
      hideFunction: null,
      showShift: 0,
      wholeVisible: false,
      hideShift: 0,
    }, options);
    return this.each(function (i, obj) {
      $(this).addClass('scrollzip');
      if ($.isFunction(settings.showFunction) && $('#scrollzipPoint').length > 0) {
        if (!$(this).hasClass('isShown') &&
          ($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
          ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
        ) {
          $(this).addClass('isShown');
          settings.showFunction.call(this);
        }
      }
      if ($.isFunction(settings.hideFunction)) {
        if (
          $(this).hasClass('isShown') &&
          (($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
            ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
        ) {
          $(this).removeClass('isShown');
          settings.hideFunction.call(this);
        }
      }
      return this;
    });
  };

  function numberRoller(slno) {
    var min = $('.roller-title-number-' + slno).attr('data-min');
    var max = $('.roller-title-number-' + slno).attr('data-max');
    var timediff = $('.roller-title-number-' + slno).attr('data-delay');
    var increment = $('.roller-title-number-' + slno).attr('data-increment');
    var numdiff = max - min;
    var timeout = (timediff * 1000) / numdiff;
    numberRoll(slno, min, max, increment, timeout);
  }

  function numberRoll(slno, min, max, increment, timeout) { //alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
    if (min <= max) {
      $('.roller-title-number-' + slno).html(min);
      min = parseInt(min) + parseInt(increment);
      setTimeout(function () {
        numberRoll(eval(slno), eval(min), eval(max), eval(increment), eval(timeout))
      }, timeout);
    } else {
      $('.roller-title-number-' + slno).html(max);
    }
  }
})(jQuery);
/**
 * @name Filter
 * @function filter product list base on category, price, tag, etc
 * @function sort product list by name or price
 * @function switch view grid or list
 */

// switch view
$('#switch_view button').click(function() {
  $('#switch_view button').removeClass('active');
  $(this).addClass('active');

  var view = $(this).data('value');
  if(view === 'grid') {
    $('#product_result > .col').addClass('col-lg-4').removeClass('col-sm-12');
    $('#product_result .product-card').addClass('portrait').removeClass('landscape');
  } else {
    $('#product_result > .col').addClass('col-sm-12').removeClass('col-lg-4');
    $('#product_result .product-card').addClass('landscape').removeClass('portrait');
  }
});

// collect values
function removeArray(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

var checkAll = [
  'check-a',
  'check-b',
  'check-c',
  'check-d',
  'check-e',
  'check-f'
];

var filterVal = {
  category: 'all',
  rating: 0,
  radio: 'all',
  check: checkAll,
  range: {
    from: 0,
    to: 100
  },
  tags: ['tag-one', 'tag-two', 'tag-three', 'tag-four']
};

var sortVal = {
  sortBy: 'price',
  sortfrom: -1,
  sortTo: 1
}

function intersection(firstArray, secondArray) {
  return firstArray.filter(function(element) {
    return secondArray.includes(element);
  })
}

function checkFilter(item, filterData){
  if (filterData !== 'all') {
    return item === filterData;
  }
  return true;
}

// Get filtered data list
function filterResult() {
  var cardItems = $('#product_result').data('items');

  return cardItems.filter(function(cardItem) {
    return (
      checkFilter(cardItem.category, filterVal.category) &&
      checkFilter(cardItem.radio, filterVal.radio) &&
      cardItem.price >= filterVal.range.from &&
      cardItem.price <= filterVal.range.to &&
      cardItem.rating >= filterVal.rating &&
      filterVal.check.indexOf(cardItem.check) > -1 &&
      intersection(filterVal.tags, cardItem.tag).length > 0
    )
  }).sort(function(a, b) {
    return a[sortVal.sortBy] > b[sortVal.sortBy] ? sortVal.sortFrom : sortVal.sortTo
  });
}

// HTML Template
function productCard(rating = 0, price = 0, img, title, desc, type = 'full', orientation = 'portrait', href = '#') {
  var star = '<i class="material-icons star-icon" title="1">star</i>';
  var start_disable = '<i class="material-icons star-icon-disable" title="1">star</i>';

  function renderStar(rating) {
    return star.repeat(rating) + start_disable.repeat(5 - rating)
  }

  var $item = `<div class="col col-sm-4">
    <div class="card product-card portrait ${type}">
      <a class="waves-effect hidden-link" href=${href}>&nbsp;</a>
      <div class="figure">
        <div class="responsive-img" style="background-image:url(${img})">&nbsp;</div>
      </div>
      <div class="desc">
        <div class="text">
          <h6 class="title pb-2 text-truncate">${title}</h6>
          <p class="use-text-paragraph">${desc}</p>
        </div>
        <div>
          <div class="property">
            <div class="rating">
              ${renderStar(rating)}
            </div>
            <strong>$${price}</strong>
          </div>
          <a class="btn btn-outlined primary button block" href=${href}>see detail</a>
        </div>
      </div>
    </div>
  </div>`

  return $item;
}

// Render filtered list to HTML
function renderResult() {
  var items = filterResult();
  $('#result_length').text(items.length);
  $('#product_result').html('');
  for (i=0; i<items.length; i++) {
    $('#product_result').append(productCard(items[i].rating, items[i].price, items[i].img, items[i].title, 'Category: '+items[i].category+' ~ '+'Tag: '+items[i].tag+' ~ '+'Check: '+items[i].check+' ~ '+'Radio: '+items[i].radio, 'round', 'portrait', '/detail-product'))
  }
}

// sort filter
$('#sort_by').change(function(e){
  var val = e.target.value;
  switch (val) {
    case 'title-asc':
      sortVal.sortBy = 'title'
      sortVal.sortFrom = 1
      sortVal.sortTo = -1
      break
    case 'title-desc':
      sortVal.sortBy = 'title'
      sortVal.sortFrom = -1
      sortVal.sortTo = 1
      break
    case 'price-asc':
      sortVal.sortBy = 'price'
      sortVal.sortFrom = -1
      sortVal.sortTo = 1
      break
    default:
      sortVal.sortBy = 'price'
      sortVal.sortFrom = 1
      sortVal.sortTo = -1
  }
  renderResult();
});

// category filter
$('.filter_category li a').click(function() {
  var val = $(this).data('value');

  $('.filter_category li a').removeClass('active');
  $(this).addClass('active');

  filterVal.category = val;
  renderResult();
});

// rating filter
$('.filter_rating li a').click(function() {
  var val = $(this).data('value');

  $('.filter_rating li a').removeClass('active');
  $(this).addClass('active');

  filterVal.rating = Number(val);
  renderResult();
});

// category radio
$('.filter_radio li input[type="radio"]').click(function() {
  var val = $(this).val();
  $('.filter_radio li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  filterVal.radio = val;
  renderResult();
});

// category checkbox
$('.filter_check li input[type="checkbox"]').click(function() {
  var val = $(this).val();

  $('.filter_check li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  if($(this).is(':checked')) {
    filterVal.check.push(val)
  } else {
    removeArray(filterVal.check, val);
  }
  renderResult();
});

// select all categories
$('.select_all_categories').click(function(){
  filterVal.check = checkAll;
  $('.filter_check input[type="checkbox"]').prop('checked', true);
  renderResult();
});

// category tags
$('.filter_tags .btn-tag input[type="checkbox"]').click(function() {
  var val = $(this).val();
  if($(this).is(':checked')) {
    filterVal.tags.push(val)
  } else {
    removeArray(filterVal.tags, val);
  }
  renderResult();
});

// price filter
$('.filter_price button').click(function() {
  filterVal.range.from = Number($('#price_from').val());
  filterVal.range.to = Number($('#price_to').val());
  renderResult();
});


// handle mobile filter
$(function() {
  $('#modal_filter.modal').modal({
    onOpenStart: function() {
      var filter_sidebar = $('#filter_sidebar > aside');
      filter_sidebar.detach();
      $('#filter_mobile').append(filter_sidebar);
    },
    onCloseEnd: function() {
      var filter_mobile = $('#filter_mobile > aside');
      filter_mobile.detach();
      $('#filter_sidebar').append(filter_mobile);
    }
  });
});
// Validate form
var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action"><i class="material-icons">close</i></button>';
$.validate({
  form: "#contact_form",
  onSuccess: function(form) {
    M.toast({html: toastHTML});
    return false;
  }
});

/**
 * @name form
 * @function handle form validation
 */

$(document).ready(function(){
  var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action"><i class="material-icons">close</i></button>';
  $.validate({
    form: "#contact_form",
    onSuccess: function(form) {
      M.toast({html: toastHTML});
      return false;
    }
  });

  $.validate({
    form: "#login_form"
  });

  $.validate({
    form: "#register_form",
    modules : "security"
  });
});

var darkMode = 'false';
if (typeof Storage !== 'undefined') { // eslint-disable-line
  darkMode = localStorage.getItem('nirwanaDarkMode') || 'false';
}

var $header = $('#header'),
    $menu = $('#mobile_menu'),
    $slideMenu = $('#slide-menu'),
    isOpen = false,
    isOpenHamburger = false;

$(document).ready(function(){
  // Dark and Light mode config
  if(darkMode === 'true') {
    $('#app').removeClass('theme--light');
    $('#app').addClass('theme--dark');
    $('#theme_switcher').prop('checked', true);
  }
  $('#theme_switcher').change(function() {
    if($(this).is(':checked')) {
      // dark
      localStorage.setItem('nirwanaDarkMode', "true");
      $('#app').removeClass('theme--light');
      $('#app').addClass('theme--dark');
    } else {
      // light
      localStorage.setItem('nirwanaDarkMode', "false");
      $('#app').removeClass('theme--dark');
      $('#app').addClass('theme--light');
    }
  });

  // initial dropdown
  $('.dropdown-trigger').dropdown({
    closeOnClick: false,
    alignment: 'left'
  });

  // Dropdown list hover
  $('.droplist-trigger-hover').dropdown({
    closeOnClick: false,
    alignment: 'left',
    hover: true,
    coverTrigger: false,
  });

  $('.droplist-trigger-hover-child').dropdown({
    closeOnClick: false,
    alignment: 'right',
    hover: true,
    onOpenStart: function(elem) {
      var sibling = $(elem).parent().siblings().find('.droplist-trigger-hover-child');
      for(var i=0; i<sibling.length; i++) {
        M.Dropdown.getInstance(sibling[i]).close();
      }
    }
  });

  // Dropdown list click
  $('.droplist-trigger-click').dropdown({
    closeOnClick: false,
    alignment: 'left',
    coverTrigger: false,
  });

  $('.droplist-trigger-click-child').dropdown({
    closeOnClick: false,
    alignment: 'right',
    onOpenStart: function(elem) {
      var sibling = $(elem).parent().siblings().find('.droplist-trigger-click-child');
      for(var i=0; i<sibling.length; i++) {
        M.Dropdown.getInstance(sibling[i]).close();
      }
    }
  });

  // Megamenu click
  $('.megamenu-trigger-click').dropdown({
    closeOnClick: false,
    alignment: 'left',
    coverTrigger: false,
    constrainWidth: true,
    container: $('#container_menu'),
    onOpenStart: function() {
      $header.addClass('open-drawer')
    },
    onCloseEnd: function() {
      $header.removeClass('open-drawer')
    }
  });

  // Initial sidenav for mobile menu
  $('#mobile_menu').click(function() {
    isOpen = !isOpen;
    if(isOpen) {
      $('.sidenav').sidenav('open')  
    } else {
      $('.sidenav').sidenav('close');
      return false;
    }
  });

  // Hamburger menu
  function openMenu() {
    $('#main_menu').fadeIn();
    $header.addClass('open-drawer');
    $menu.addClass('is-active');
    $slideMenu.addClass('menu-open');
  }

  function closeMenu() {
    $('#main_menu').fadeOut();
    $header.removeClass('open-drawer');
    $menu.removeClass('is-active');
    $slideMenu.removeClass('menu-open');
  }

  $('#hamburger_menu').click(function() {
    isOpenHamburger = !isOpenHamburger;
    if(isOpenHamburger) {
      openMenu();
      $(this).addClass('is-active');
    } else {
      closeMenu();
      $(this).removeClass('is-active');
    }
  });
  
  $('#main_menu a').click(function() {
    closeMenu();
    isOpenHamburger = false;
  })

  // SideNav
  $('.sidenav').sidenav({
    onOpenStart: function() {
      isOpen = true;
      $header.addClass('open-drawer');
      $menu.addClass('is-active');
      $slideMenu.addClass('menu-open');
    },
    onCloseEnd: function() {
      isOpen = false;
      $header.removeClass('open-drawer');
      $menu.removeClass('is-active');
      $slideMenu.removeClass('menu-open');
    }
  });
});
/**
 * @name Language
 * @function redirect to language specified page
 * @function via js through header and footer
 */

$(function(){
  // Language select in Headed
  $('#lang_menu li').click(function(){
    var $el_target = $(this).children();
    var url = window.location.toString(),
        path = window.location.pathname.split('/'),
        path_lang = path[path.length - 2],
        file = path[path.length - 1]
    var lang = $el_target.data("lang");
    
    window.location = url.replace(path_lang + "/" + file, lang + "/" + file);
  })
  
  // Language select in footer
  $('#lang_select').on('change', function() {
    var lang = $(this).val(); 
    var url = window.location.toString(),
        path = window.location.pathname.split('/'),
        path_lang = path[path.length - 2],
        file = path[path.length - 1]
    
    if(lang) {
      window.location = url.replace(path_lang + "/" + file, lang + "/" + file);
    }
    return false;
  });
});
/**
 * @name Lightbox
 * @function handle slider carousel for detail item
 * @function handle lightbox popup for detail item
 */


$(document).ready(function(){
  var $detailCarousel = $('#detail_carousel');

  // slick carousel album
  $detailCarousel.slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    infinite: false,
    autoplay: false
  });

  $detailCarousel.each(function() {
    $(this).magnificPopup({
      delegate: '.image a',
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
});


/**
 * @name Map Adress
 * @function initial google map with marker
 */

function initMap() {
  var myLatLng = {
    lat: 44.933076,
    lng: 15.629058
  };
  var mapElm = document.getElementById('map');
  var map, marker;
  
  var contentString = '<div id="content" class="buble">'+
      '<h6 class="title pb-2 px-3">Head Quarter</h6>'+
      '<div class="row ma-3">'+
      '<div class="col-sm-6 pa-0">'+
      '<p><i class="material-icons">phone</i> +98 765 432 10</p>'+
      '</div>'+
      '<div class="col-sm-6 pa-0">'+
      '<p><i class="material-icons">email</i> hello@luxi.com</p>'+
      '</div>'+
      '<div class="col-sm-12 pa-0">'+
      '<p><i class="material-icons">location_on</i> Lorem ipsum street Block C - Vestibullum Building</p>'+
      '</div>'+
      '</div>'+
      '</div>';
  
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  
  if (mapElm) {
    var map = new google.maps.Map(mapElm, {
      zoom: 10,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

}

/**
 * Handle css class by using Media query
 * @alias xs, sm, md, lg, xl
 */

var mq = {
  smUp: "screen and (min-wdth: 600px)",
  mdUp: "screen and (min-width: 960px)",
  lgUp: "screen and (min-width: 1280px)",
  xlUp: "screen and (min-width: 1920px)",
  xsDown: "screen and (max-width: 599px)",
  smDown: "screen and (max-width: 959px)",
  mdDown: "screen and (max-width: 1279px)",
  lgDown: "screen and (max-width: 1919px)"
}

function mqAddClass(selectors) {
  $(selectors).each(function(){
    var classes = $(this).data('class');
    $(this).addClass(classes)
  })
}

function mqRemoveClass(selectors) {
  $(selectors).each(function(){
    var classes = $(this).data('class');
    $(this).removeClass(classes)
  })
}

// Define handler action
var handler_smUp = {
      match : function() { mqAddClass('.mq-sm-up')},
      unmatch : function() { mqRemoveClass('.mq-sm-up')}
    },
    handler_mdUp = {
      match : function() { mqAddClass('.mq-md-up')},
      unmatch : function() { mqRemoveClass('.mq-md-up')}
    },
    handler_lgUp = {
      match : function() { mqAddClass('.mq-lg-up')},
      unmatch : function() { mqRemoveClass('.mq-lg-up')}
    },
    handler_xlUp = {
      match : function() { mqAddClass('.mq-xl-up')},
      unmatch : function() { mqRemoveClass('.mq-xl-up')}
    },
    handler_xsDown = {
      match : function() { mqAddClass('.mq-xs-down')},
      unmatch : function() { mqRemoveClass('.mq-xs-down')}
    },
    handler_smDown = {
      match : function() { mqAddClass('.mq-sm-down')},
      unmatch : function() { mqRemoveClass('.mq-sm-down')}
    },
    handler_mdDown = {
      match : function() { mqAddClass('.mq-md-down')},
      unmatch : function() { mqRemoveClass('.mq-md-down')}
    },
    handler_lgDown = {
      match : function() { mqAddClass('.mq-lg-down')},
      unmatch : function() { mqRemoveClass('.mq-lg-down')}
    };

// Register to enquire.js
enquire
  .register(mq.smUp, handler_smUp)
  .register(mq.mdUp, handler_mdUp)
  .register(mq.lgUp, handler_lgUp)
  .register(mq.xlUp, handler_xlUp)
  .register(mq.xsDown, handler_xsDown)
  .register(mq.smDown, handler_smDown)
  .register(mq.mdDown, handler_mdDown)
  .register(mq.lgDown, handler_lgDown);

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
