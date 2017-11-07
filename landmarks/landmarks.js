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
           //console.log(elements);
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
        infoWindow = new google.maps.InfoWindow;

        for (i=0; i<elements.landmarks.length; i++){

          var thLatLng = {
            lat: elements.landmarks[i].geometry.coordinates[1], 
            lng: elements.landmarks[i].geometry.coordinates[0]
          };
          
          marker = new google.maps.Marker({
          position: thLatLng,
          title: elements.landmarks[i].properties["Location_Name"]
          });

       google.maps.event.addListener(marker, 'click', function() {
            //infoWindow = new google.maps.InfoWindow;
            infoWindow.setContent(this.title);
            infoWindow.open(map, this);
        })

          marker.setMap(map);
        }

        for (i=0; i<100; i++){

          var thLatLng = {
            lat: elements.people[i].lat, 
            lng: elements.people[i].lng
          };
          
          //console.log(elements.people[i].login);

          marker = new google.maps.Marker({
          position: thLatLng,
          title: elements.people[i].login
          });

          marker.setMap(map);
          google.maps.event.addListener(marker, 'click', function() {
            //infoWindow = new google.maps.InfoWindow;
            infoWindow.setContent(marker.title);
            infoWindow.open(map, this);

        })
      }
/*
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(marker.title);
          infowindow.open(map, marker);
        })
        */
      };
      


             
