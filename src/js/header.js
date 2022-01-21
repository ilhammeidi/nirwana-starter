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