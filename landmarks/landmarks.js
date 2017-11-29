      var map;
      var myLat = 0;
      var myLng = 72;
      var marker;
      var infowindow;

      var myLatLng;
      var thLatLng;

      var mindist = 999;
      var importantlm = "";
      var importantlmi = 0;

    function getMyLocation() { //WebProgramming/blob/gh-pages/examples/google_maps/getmylocation.html
        //console.log("Hit Me One");
        if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
          //console.log("Hit Me Two");
          navigator.geolocation.getCurrentPosition(function(position) {
              myLat = position.coords.latitude;
              myLng = position.coords.longitude;
              myLatLng = new google.maps.LatLng(myLat, myLng);
              initMap();
            });
        }      
    }

    function initMap() { //https://developers.google.com/maps/documentation/javascript/tutorial
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: myLat, lng: myLng},
          zoom: 14    
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
        

        //renderMap();
        getJSON(key);
        }
    }

    function getJSON(key){
         var request = new XMLHttpRequest();
         request.open("POST", "https://rocky-basin-93447.herokuapp.com/sendLocation", true);
         request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         request.send(key);
         request.onreadystatechange = function() {
         if (request.readyState == 4 && request.status == 200)  {
           elements = JSON.parse(request.responseText);
           //console.log(request.responseText);
           themMap(elements);
           renderMap();
      }}
    }

    function renderMap(){//https://tuftsdev.github.io/WebProgramming/examples/google_maps/geolocation_map.html
          var marker;
          var infowindow = new google.maps.InfoWindow();
      me = new google.maps.LatLng(myLat, myLng);  
          // Create a marker

          marker = new google.maps.Marker({
          position: me,
          title: importantlm,
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

          var thLatLng = new google.maps.LatLng(elements.landmarks[i].geometry.coordinates[1], 
            elements.landmarks[i].geometry.coordinates[0]
          );
         
          var distance = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, thLatLng);
          
          distance = distance.toFixed(2);
          var distmiles = distance*0.000621371;
          distmiles = distmiles.toFixed(2);

            if (distmiles <= mindist){
              mindist = distmiles;
              importantlm = "Nearest landmark: <p>"+elements.landmarks[i].properties["Location_Name"]+"</p><p>"+"Distance: "+distmiles+" miles"+"</p>";
              importantlmi = i;            
            };

            if (i==elements.landmarks.length -1){
              //get shortest flight path to landmark selected
              thLatLng = new google.maps.LatLng(elements.landmarks[importantlmi].geometry.coordinates[1], 
            elements.landmarks[importantlmi].geometry.coordinates[0]);

              var flightPlanCoordinates = [
                myLatLng, thLatLng
              ];

              var flightPath = new google.maps.Polyline({ //https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
                  path: flightPlanCoordinates,
                  geodesic: true,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2
              });            

                flightPath.setMap(map);
          }

          marker = new google.maps.Marker({
            position: thLatLng,
            title: elements.landmarks[i].properties["Location_Name"]+"<p>"+"Distance: "+distmiles+" miles"+"</p>",
            icon: 'green_MarkerA.png'
          });
          marker.setMap(map);
         

          google.maps.event.addListener(marker, 'click', function() {
              infoWindow.setContent(this.title);
              infoWindow.open(map, this);
              
          }); 
          }//end of extremely long for loop   

        for (i=0; i<elements.people.length; i++){
          var thLatLng = new google.maps.LatLng(elements.people[i].lat, 
            elements.people[i].lng
          );

         var distance = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, thLatLng);
         distance = distance.toFixed(2);

        var distmiles = distance*0.000621371;
        distmiles = distmiles.toFixed(2);

        marker = new google.maps.Marker({
          position: thLatLng,
          title: elements.people[i].login+"<p>"+"Distance: "+distmiles+" miles"+"</p>",
          icon: 'blue_MarkerA.png'
        });

          marker.setMap(map);    

          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(this.title);
            infoWindow.open(map, this);
          })
        }
      };
      


             
