      var map;
      var myLat = 0;
      var myLng = 72;
      var marker;
      var infowindow;

    function getMyLocation() { //WebProgramming/blob/gh-pages/examples/google_maps/getmylocation.html
        //console.log("Hit Me One");
        if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
          //console.log("Hit Me Two");
          navigator.geolocation.getCurrentPosition(function(position) {
              myLat = position.coords.latitude;
              myLng = position.coords.longitude;
              initMap();
            });
        }      
    }

    function initMap() { //https://developers.google.com/maps/documentation/javascript/tutorial
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: myLat, lng: myLng},
          zoom: 12    
          }          
          );
          getData(myLat, myLng);
    } //end of initMap
    
    function getData(){   
        var login = "login=JwCmNgOP";
        var latxmr = "&lat=";
        var strlat = myLat;
        var lngxmr = "&lng=";
        var strlng = myLng;

        if (strlat > 0){
        var key = login.concat(latxmr, strlat, lngxmr, strlng);
        
        renderMap();
        getJSON(key);
        }
    }

    function getJSON(key){
         var request = new XMLHttpRequest();
         request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
         request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         request.send(key);
         request.onreadystatechange = function() {
         if (request.readyState == 4 && request.status == 200)  {
           elements = JSON.parse(request.responseText);
           console.log(elements);
           themMap(elements);
      }}
    }

    function renderMap(){//https://tuftsdev.github.io/WebProgramming/examples/google_maps/geolocation_map.html
          var marker;
          var infowindow = new google.maps.InfoWindow();
      me = new google.maps.LatLng(myLat, myLng);  
          // Create a marker

          marker = new google.maps.Marker({
          position: me,
          title: "user location"
          });
          marker.setMap(map);
    
          // Open info window on click of marker
        google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
        });
    }


      function themMap(elements){

        for (i=0; i<elements.landmarks.length; i++){

          var thLat;
          var thLng;

          them = new google.maps.LatLng(thLat, thLng);

          //make a string for the title
        var id = "id: ";
        var id_item = elements.landmarks[i].id;

        var textbox = id.concat(id_item);
        console.log(id);
          
          marker = new google.maps.Marker({
          position: them,
          title: id
          });
          marker.setMap(map);
        }

        google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
        });
      }
      


             
