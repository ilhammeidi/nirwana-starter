var transition = {
  section: {
    show: "slideInLeft",
    hide: "slideOutRight",
    delayShow: "delay0s"
  },
  h1: {
    show: "fadeInDown",
    hide: "fadeOutUp",
    delayShow: "delay1s"
  },
  p: {
    show: "fadeInUp",
    hide: "fadeOutDown",
    delayShow: "delay1s"
  },
  '.hero-buttons': {
    show: "fadeInUp",
    hide: "fadeOutDown",
    delayShow: "delay1-5s"
  },
  img: {
    show: "fadeIn",
    hide: "fadeOut",
    delayShow: "delay1-5s"
  },
  span: {
    show: "fadeInDown",
    hide: "fadeOutUp",
    delayShow: "delay1s"
  },
  strong: {
    show: "fadeInUp",
    hide: "fadeOutDown",
    delayShow: "delay1-5s"
  }
}

$(function(){
  // animate slider
  $(".anim-slider").animateSlider({
    autoplay: true,
    interval: 10000,
    animations: {
      0: transition,
      1: transition,
      2: transition
    }
  });
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
    $('#product_result > .col').addClass('col-sm-4').removeClass('col-sm-12');
    $('#product_result .product-card').addClass('portrait').removeClass('landscape');
  } else {
    $('#product_result > .col').addClass('col-sm-12').removeClass('col-sm-4');
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
      <figure><img src=${img} alt=${title}></figure>
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
    $('#product_result').append(productCard(items[i].rating, items[i].price, 'https://source.unsplash.com/random', items[i].title, 'Category: '+items[i].category+' ~ '+'Tag: '+items[i].tag+' ~ '+'Check: '+items[i].check+' ~ '+'Radio: '+items[i].radio, 'round', 'portrait', '/detail-product'))
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
$('#filter_category li a').click(function() {
  var val = $(this).data('value');

  $('#filter_category li a').removeClass('active');
  $(this).addClass('active');

  filterVal.category = val;
  renderResult();
});

// rating filter
$('#filter_rating li a').click(function() {
  var val = $(this).data('value');

  $('#filter_rating li a').removeClass('active');
  $(this).addClass('active');

  filterVal.rating = Number(val);
  renderResult();
});

// category radio
$('#filter_radio li input[type="radio"]').click(function() {
  var val = $(this).val();
  $('#filter_radio li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  filterVal.radio = val;
  renderResult();
});

// category checkbox
$('#filter_check li input[type="checkbox"]').click(function() {
  var val = $(this).val();

  $('#filter_check li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  if($(this).is(':checked')) {
    filterVal.check.push(val)
  } else {
    removeArray(filterVal.check, val);
  }
  renderResult();
});

// select all categories
$('#select_all_categories').click(function(){
  filterVal.check = checkAll;
  $('#filter_check input[type="checkbox"]').prop('checked', true);
  renderResult();
});

// category tags
$('#filter_tags .btn-tag input[type="checkbox"]').click(function() {
  var val = $(this).val();
  if($(this).is(':checked')) {
    filterVal.tags.push(val)
  } else {
    removeArray(filterVal.tags, val);
  }
  renderResult();
});

// price filter
$('#filter_price button').click(function() {
  filterVal.range.from = Number($('#price_from').val());
  filterVal.range.to = Number($('#price_to').val());
  renderResult();
});

var darkMode = 'false';
if (typeof Storage !== 'undefined') { // eslint-disable-line
  darkMode = localStorage.getItem('luxiDarkMode') || 'false';
}

var $header = $('#header'),
    $menu = $('#mobile_menu'),
    $slideMenu = $('#slide-menu')
    isOpen = false;

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
      localStorage.setItem('luxiDarkMode', "true");
      $('#app').removeClass('theme--light');
      $('#app').addClass('theme--dark');
    } else {
      // light
      localStorage.setItem('luxiDarkMode', "false");
      $('#app').removeClass('theme--dark');
      $('#app').addClass('theme--light');
    }
  });

  // initial dropdown
  $('.dropdown-trigger').dropdown({
    closeOnClick: false,
    alignment: "left"
  });

  // Initial sidenav for mobile menu
  $('#mobile_menu').click(function() {
    isOpen = !isOpen;
    if(isOpen) {
      $('.sidenav').sidenav('open')  
    } else {
      $('.sidenav').sidenav('close')  
    }
  });

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
})
/**
 * @name Language
 * @function redirect to language specified page
 * @function via js through header and footer
 */

$(function(){
  // Language select in Headed
  $('#lang_menu li a').click(function(){
    var url = window.location.toString(),
        path = window.location.pathname.split('/'),
        path_lang = path[path.length - 2],
        file = path[path.length - 1]
    var lang = $(this).data("lang");
    
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

var $header = $("#header");
var $pageNav = $("#page_nav");
var sticky = 0;

// Sticky header
if($("#header").length > 0) {
  sticky = header.offsetTop + 80;
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

var $progress = $('#statistic').offset();
if($("#statistic").length > 0) {
  progressOffset = $progress.top - 50;
}

function playProgress() {
  if (window.pageYOffset > progressOffset) {
    $('#statistic').removeClass('zero');
  }
}

setTimeout(function() {
  window.onscroll = function() {
    playProgress();
    fixedNav();
    fixedFabNav();
  };
}, 500)

$(document).ready(function(){
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
  
  // initial parallax
  $('#mode_feature').enllax();
  
  // Accordion init
  $('.collapsible').collapsible();

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
