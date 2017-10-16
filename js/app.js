
/////////////// MODEL ////////////////

// Define Global Variables
var map,
    infowindow,
    service,
    marker,
    allLocations,
    currentLocation;

var Location = function(locations){

    var self = this;
    var photos = [];

    this.title = locations.title;
    this.location = locations.location;
    this.photoID = locations.photoID;
    this.placeID = locations.placeID;
    this.placeURL = '</br><a href="https://www.google.com/maps/place/?q=place_id:'+self.placeID+'" target="_blank">See it on Google Maps!</a>';
    this.address = locations.address;
    this.zip = locations.zip;
    this.hikeTime = locations.hikeTime;
    this.hikeLength = locations.hikeLength;
    this.hikeDifficulty = locations.hikeDifficulty;
    this.photoUrl = 'https://lh3.googleusercontent.com/p/'+self.photoID+'=h120-k';
    this.infoWindowContent = '<h4>'+self.title+'</h4>'+'<p>'+self.address+'</p> <img class="photo" src="'+self.photoUrl+'"></br>'+self.placeURL;
    this.weatherURL = "http://api.wunderground.com/api/7133c754f945f6c7/forecast/q/"+self.zip+".json";

    /*
    service.getDetails({
        placeId: this.placeID
    }, function(place, status) {
        for (var i = 0; i < place.photos.length; i++) {
            var photoUrl = place.photos[i].getUrl({maxHeight: 600});
            console.log('photosUrl for',ko.toJS(self.title),'is ',photoUrl);
            photos.push(photoUrl);
            self.photos = photos;            
        }
        //console.log('The returned photos array for',ko.toJS(self.title),'is',self.photos);
    });
    */

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    this.activeWindow = function(){
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != self) {
            infowindow.marker = self;
            infowindow.setContent(self.infoWindowContent);
            infowindow.open(map);
            infowindow.setPosition( self.location );
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick',function(){
                infowindow.setLocation = null;
            });
        }
    }

    // animate the marker when you click it
    this.markerBounce = function(){
        // check all other markers and set their animation to none
        allLocations().forEach(function(markers){
            if (markers.marker.animation != 'null'){
                markers.marker.setAnimation('null');
            }
        });
        // animate current marker
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ self.marker.setAnimation(null); }, 725);
    };

    // Weather Underground API call
    this.getWeather = function(weatherURL){
        var url = this.weatherURL;
        /*
        var dataType = "jsonp";
        var success = function(parsed_json) {
            var temp_f = parsed_json['current_observation']['temp_f'];
            console.log("Current temperature is: " + temp_f);
        };
        */
        console.log("weatherURL is: " +url);
    };

    // define what happens when you click this location
    this.setLocation = function(){
        // set this as active location
        currentLocation(this);

        // console.log to see if the photo arrays are being returned when a location is clicked
        //console.log('currently, this for',ko.toJS(self.title),'is',self);

        // get infoWindow content for the active location
        self.activeWindow();

        // make the active marker bounce
        self.markerBounce();

        // get weather info for the active location
        self.getWeather();
    };


    // create marker at the correct location
    this.createMarker = function(){
        
        self.marker = new google.maps.Marker({
            map: map,
            title: self.title,
            position: self.location,
            address: self.address,
            animation: google.maps.Animation.DROP            
        });

        // add click event listener to the marker
        self.marker.addListener('click', function(){
            self.setLocation();
        });

    }();
}

/////////////// END - MODEL ////////////////

/////////////// VIEW MODEL ////////////////

function viewModel() {

    var self = this;

    // create observable array that holds ALL locations
    allLocations = ko.observableArray([]);
    //console.log('the observable array "allLocations" contains: ',ko.toJS(allLocations));

    // create observable for the current, active location
    currentLocation = ko.observable('');

    // Push each location to an observable array
    locations.forEach(function(data){
        allLocations.push( new Location(data) );
    });
}

/////////////// END - VIEW MODEL ////////////////

/////////////// INITIALIZE /////////////////

function initMap() {
    // Create a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.0830333, lng: -82.9888947 },
        zoom: 10,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT
        }
    });

    // create infoWindow
    infowindow = new google.maps.InfoWindow({
        content: '',
        infoposition: {},
        pixelOffset: {width: -2, height: -40}
    });

    service = new google.maps.places.PlacesService(map);

    // Thank you Andrew Wodendaal for showing me how to keep 
    // the map centered on window resize:
    // https://andrewodendaal.com/keep-google-map-v3-centered-when-browser-is-resized/
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });    

    ko.applyBindings(new viewModel());
}

/////////////// END - INITIALIZE /////////////////


/////////////// SIDEBAR /////////////////

/*Menu-toggle*/
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});

///////////////// END - SIDEBAR ////////////////
