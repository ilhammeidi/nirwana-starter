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
    alignment: 'left'
  });

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