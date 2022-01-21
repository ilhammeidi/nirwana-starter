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
