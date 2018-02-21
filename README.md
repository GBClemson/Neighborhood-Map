# Udacity-FEND-Neighborhood-Map
Responsive web app that offers hiking and weather information for some of the top waterfalls in South Carolina.

### See it live at: ###
https://gbclemson.github.io/Neighborhood-Map/

#### To Successfully Run the application ####
1. You must have an active internet connection as this web app connects to google maps as well as the weather underground api.
2. You must have all of the folders and files contained in this repository
3. Open index.html in a browser and the application will launch

>**Warning:** while testing / checking out the app it is important to remember that this Weather Underground key only allows up to 10 calls to the API per minute. Any more and it could be disabled for the rest of the day.

#### Features ####
* Fully responsive
* Map and Places info from google maps API 
* Weather data from Weather Underground
* Slick Slider to control how much weather data can be seen based on display size
* When a display is too small it will place the weather data on the sidebar below the locations

#### Thanks ####
A big thank you to the following resources that helped me get over different hurdles along the way:

* Andrew Wodendaal - Google Maps Centering on window resize
  * https://andrewodendaal.com/keep-google-map-v3-centered-when-browser-is-resized/
* Stack overflow for enlightening me about the .done function and how to use the panBy method
  * https://stackoverflow.com/questions/16076009/confused-on-jquery-ajax-done-function
  * https://stackoverflow.com/questions/3473367/how-to-offset-the-center-of-a-google-maps-api-v3-in-pixels

