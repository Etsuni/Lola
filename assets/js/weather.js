$(document).ready(function() {

    var currentTimestamp = Math.floor(Date.now() / 1000);

    // Get the stored weather
    browser.storage.local.get('weather').then( function(objects) {

        var weather = objects.weather;

        // Update the weather
        if( !weather || !weather.timestamp || currentTimestamp - weather.timestamp > 3600 ) {
            updateWeather();

        } else {
            displayWeather(weather);
        }
    });
});

function displayWeather(data) {

    // Change link
    $('#weather')[0].href = 'https://openweathermap.org/city/' + data.id

    // Change the icon
    $('#weather i').addClass('owf-' + data.weather[0].id);

    // Change the text
    $('#weather #temp')[0].innerText = Math.floor(data.main.temp - 273.15) + "°";
    $('#weather #city')[0].innerText = data.name;

    $('#weather').fadeIn();
}

function updateWeather() {
    console.log('Update the weather data.');

    browser.storage.sync.get(['weatherKey','weatherId']).then( function(objects) {

        var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?id=' + objects.weatherId + '&APPID=' + objects.weatherKey;

        // Get the data
        $.getJSON(weatherURL, function(result) {

            var weather = result;
            weather.timestamp =  Math.floor(Date.now() / 1000);
            browser.storage.local.set({
                weather: weather
            });

            displayWeather(weather);
        });
    });
}
