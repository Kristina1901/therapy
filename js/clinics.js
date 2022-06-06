/**
 * @name Map Adress
 * @function initial google map with marker
 */

 function initMap() {
    var locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.803036, 151.159052, 5],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.920198, 151.159302, 1]
      ];
      var mapElm = document.getElementById('map');
    
      if(mapElm) {
        var map = new google.maps.Map(mapElm, {
          zoom: 10,
          center: new google.maps.LatLng(-33.92, 151.25),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
  
        var infowindow = new google.maps.InfoWindow();
  
        var marker, i;
  
        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
          });
  
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
      }
  }
  