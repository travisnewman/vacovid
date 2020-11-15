let count = 0;
let last = Object.keys(WEATHER_COORDS).length;

$.each(WEATHER_COORDS, function(index, coord) {
  // https://openweathermap.org/api/one-call-api
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/onecall?lat="+ coord.lat + "&lon=" + coord.long +
      "&exclude=hourly,minutely&units=imperial&appid=" + OWM_TOKEN,
    type: "GET"
  }).done(function(data) {
    count = count + 1;
    $('#weather').append(
      "<div style='display:none;' class='weather-slide' id='weather-slide-" + count + "'>" +
        "<div class='weather-heading'><h2>" + coord.name + " Weather</h2></div>" +
        "<div class='current'>" +
          "<i class='fa fa-fw fa-7x fa-" + weatherIconToFA(data.current.weather[0].icon) + "'></i>" +
          "<div class='current-temp'>" + Math.round(data.current.temp) + "&deg;</div>" +
        "</div>" +
        "<div class='forecast'>" +

          "<div class='forecast-day'>" +
            "<div class='forecast-dow'>" + dayOfWeek(data.daily[0].dt) + "</div>" +
            "<div class='forecast-data'>" +
              "<div class='forecast-icon'>" +
              "<i class='fa fa-fw fa-2x fa-" + weatherIconToFA(data.daily[0].weather[0].icon) + "'></i>" +
              "</div>" +
              "<div class='forecast-hilo'>" +
              "<span class='monospace'>H</span> : " + Math.round(data.daily[0].temp.max) + "&deg;<br>" +
              "<span class='monospace'>L</span> : " + Math.round(data.daily[0].temp.min) + "&deg;" +
              "</div>" +
            "</div>" +
          "</div>" +

          "<div class='forecast-day'>" +
            "<div class='forecast-dow'>" + dayOfWeek(data.daily[1].dt) + "</div>" +
            "<div class='forecast-data'>" +
              "<div class='forecast-icon'>" +
                "<i class='fa fa-fw fa-2x fa-" + weatherIconToFA(data.daily[1].weather[0].icon) + "'></i>" +
              "</div>" +
              "<div class='forecast-hilo'>" +
                "<span class='monospace'>H</span> : " + Math.round(data.daily[1].temp.max) + "&deg;<br>" +
                "<span class='monospace'>L</span> : " + Math.round(data.daily[1].temp.min) + "&deg;" +
              "</div>" +
            "</div>" +
          "</div>" +

          "<div class='forecast-day'>" +
            "<div class='forecast-dow'>" + dayOfWeek(data.daily[2].dt) + "</div>" +
            "<div class='forecast-data'>" +
              "<div class='forecast-icon'>" +
                "<i class='fa fa-fw fa-2x fa-" + weatherIconToFA(data.daily[2].weather[0].icon) + "'></i>" +
              "</div>" +
              "<div class='forecast-hilo'>" +
                "<span class='monospace'>H</span> : " + Math.round(data.daily[2].temp.max) + "&deg;<br>" +
                "<span class='monospace'>L</span> : " + Math.round(data.daily[2].temp.min) + "&deg;" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +

      "</div>"
    );
    if (count === last) {
      setTimeout(() => {  $('.weather-slide').first().show(); }, 500);

      let carouselCounter = 1; // the active slide
      let carouselCount = last; // total slides
      setInterval(moveForward, 5000); // to swap slides automatically

      // to be used to switch to the appropriate weather slide
      function swapImage() {
        $(".weather-slide").slideUp(); //hide all images
        $("#weather-slide-" + carouselCounter).slideDown(); //show the appropriate image
      }

      function moveForward() {
        carouselCounter = carouselCounter + 1; //increment the active image

        if (carouselCounter > carouselCount) {
          carouselCounter = 1; // if the active image is the last image, go back to 1
        }

        swapImage();
      }
    }
  });
});

