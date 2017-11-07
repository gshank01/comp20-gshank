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


          var image = { //https://developers.google.com/maps/documentation/javascript/markers#simple_icons
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            // This marker is 40 pixels wide by 64 pixels high.
            size: new google.maps.Size(40, 64),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        //THESE DON'T WORK SO WELL IN HALlIGAN
          };

          marker = new google.maps.Marker({
          position: me,
          title: "user location",
          icon: 'purple_MarkerA.png'
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
          title: elements.landmarks[i].properties["Location_Name"],
          icon: 'green_MarkerA.png'
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

          marker = new google.maps.Marker({
          position: thLatLng,
          title: elements.people[i].login,
          icon: 'blue_MarkerA.png'
          });

          marker.setMap(map);
          google.maps.event.addListener(marker, 'click', function() {
            //infoWindow = new google.maps.InfoWindow;
            infoWindow.setContent(marker.title);
            infoWindow.open(map, this);

          })
        }
      };
      


             
