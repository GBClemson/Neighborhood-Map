
/////////////// MODEL ////////////////

// Define Global Variables
var map,
    infowindow,
    service,
    marker,
    allLocations,
    currentLocation;
    sidebarVisible = true;

var Location = function(locations){

    var self = this;
    var weather = ko.observableArray([]);

    this.title = locations.title;
    this.location = locations.location;
    this.photoID = locations.photoID;
    this.placeID = locations.placeID;
    this.placeURL = '</br><a href="https://www.google.com/maps/place/?q=place_id:'+self.placeID+'" target="_blank">See it on Google Maps!</a>';
    this.address = locations.address;
    this.zip = locations.zip;
    this.hikeTime = locations.hikeTime;
    this.hikeLength = locations.hikeLength;
    this.hikeDifficulty = ko.observable(locations.hikeDifficulty);
    this.photoUrl = 'https://lh3.googleusercontent.com/p/'+self.photoID+'=h120-k';
    this.infoWindowContent = '<h4>'+self.title+'</h4>'+'<p>'+self.address+'</p> <img class="photo" src="'+self.photoUrl+'"></br>'+self.placeURL;
    this.weatherURL = "https://api.wunderground.com/api/7133c754f945f6c7/forecast/q/"+self.zip+".json";

    this.weather = weather;
    this.haveWeatherInfo = false;    

    // adjusting the map center point to account for the menu / weather overlays
    this.mapCenterAdjust = function(){
        map.setCenter(self.location);
        map.panBy(-100, -180);
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
    }

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
            // center the map on this marker
            self.mapCenterAdjust();
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick',function(){
                infowindow.setLocation = null;
            });
        }
    }

    // Weather Underground API call
    this.getWeather = function(weatherURL, zip){
        if (this.haveWeatherInfo) {
            console.log('You already have weather data for',ko.toJS(self.title));
            slickWeather();
        }else{
            this.haveWeatherInfo = true;
            $.ajax({
                url : self.weatherURL,
                zip : self.zip,
                dataType : "jsonp",
                success : function(parsed_json) {
                    for (var i = 0; i < 4; i++) {
                        var weatherToday = {};

                        if (i === 0) {
                            weatherToday.currentDay = 'Today';
                        }else if (i === 1) {
                            weatherToday.currentDay = 'Tomorrow';                        
                        }else{
                            currentDayToday = parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday'];
                            weatherToday.currentDay = currentDayToday;
                        }
                        conditionsToday = parsed_json['forecast']['simpleforecast']['forecastday'][i]['icon'];
                        weatherToday.conditionsIcon = "https://icons.wxug.com/i/c/v4/"+conditionsToday+".svg";

                        highTempFToday = parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['fahrenheit'];
                        weatherToday.highTempF = highTempFToday;

                        lowTempFToday = parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['fahrenheit'];
                        weatherToday.lowTempF = lowTempFToday;

                        popToday = parsed_json['forecast']['simpleforecast']['forecastday'][i]['pop'];
                        weatherToday.pop = popToday;

                        weather.push(weatherToday);
                        	//console.log('The high | low for day '+i+' is: ',weather[i].highTempF+' | ',weather[i].lowTempF);
                    }
                }

            // Thank you to stack overflow for enlightening me about the .done function
            // https://stackoverflow.com/questions/16076009/confused-on-jquery-ajax-done-function
            }).done(function(){                
                
                // Once the weather data has loaded we run the slick slider function
                slickWeather();
            
            }).fail(function() {

                // If API cannot get data, display error message
                window.alert('Unable to connect to weather data. Please try again later!');

            }).always(function() {                
                this.haveWeatherInfo = true;            
            });                      
        }
    }; 

    // define what happens when you click this location
    this.setLocation = function(){
        // set this as active location
        currentLocation(this);

        // get weather info for the active location
        self.getWeather();

        // get infoWindow content for the active location
        self.activeWindow();

        // make the active marker bounce
        self.markerBounce();

        // This is a good place to see console logs of the active location
        	//console.log('currently,',ko.toJS(self.title),'contains',self);
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
    currentLocation = ko.observable('');   //currentLocation = ko.observable('');

    // Push each location to an observable array
    locations.forEach(function(data){
        allLocations.push( new Location(data) );
    });

    // Filters Visible locations based on selection
    hikeDifficulties = ko.observableArray(['All', 'Easy', 'Moderate', 'Difficult']);
    selectedDifficulty = ko.observable();

    // filter visible locations based on searchterm
    this.visibleLocations = ko.computed(function(){

        // return a list of locations filtered by the searchTerm
        return allLocations().filter(function (location) {
            var visible = true;            
            if ( ko.toJS(selectedDifficulty) === undefined || ko.toJS(selectedDifficulty) === ko.toJS(location.hikeDifficulty) || ko.toJS(selectedDifficulty) === 'All' )  {
                visible = true;            
            } else {                
                visible = false;
            }
            // toggle map marker based on the filter
            location.marker.setVisible(visible);
            
            // close infowindow
            infowindow.close();
            return visible;
        });
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
        pixelOffset: {width: 0, height: -40}
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

$(window).resize(function() {
    var windowWidth = $(window).width();
    if(windowWidth >= 767){
        if (sidebarVisible === false) {
            $("#sidebar").removeClass("collapsed");
            sidebarVisible = true;
        }
    }else{
        if (sidebarVisible === true) {
            $("#sidebar").addClass("collapsed");
            sidebarVisible = false;
        }
    }
});


$(document).ready(function() {
    $("#menu-toggle").click(function(sidebar) {
        sidebar.preventDefault();
        $("#sidebar").toggleClass("collapsed");
        if (sidebarVisible === true) {
            sidebarVisible = false;
        }else{
            sidebarVisible = true;
        }
    });
});

///////////////// END - SIDEBAR ////////////////


/////////////////// SLICK CAROUSEL///////////////////

function slickWeather() {            
    $('.weather-info').slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },{
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },{
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });    
    $('.weather-info-sidebar').slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });    
}

/////////////////// END - SLICK ////////////////////
