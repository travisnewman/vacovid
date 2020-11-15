// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.
function dayOfWeek(timestamp) {
  let a = new Date(timestamp*1000);
  let days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  return days[a.getDay()];
};

function weatherIconToFA(icon) {
  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  // https://fontawesome.com/icons?c=weather
  switch(icon) {
    case '01d':
      icon = 'sun';
      break;
    case '01n':
      icon = 'moon';
      break;
    case '02d':
      icon = 'clouds-sun';
      break;
    case '02n':
      icon = 'clouds-moon';
      break;
    case '03d':
    case '03n':
      icon = 'cloud';
      break;
    case '04d':
    case '04n':
      icon = 'clouds';
      break;
    case '09d':
    case '09n':
      icon = 'cloud-showers';
      break;
    case '10d':
      icon = 'cloud-sun-rain';
      break;
    case '10d':
      icon = 'cloud-moon-rain';
      break;
    case '11d':
    case '11n':
      icon = 'thunderstorm';
      break;
    case '13d':
    case '13n':
      icon = 'cloud-snow';
      break;
    case '50d':
    case '50n':
      icon = 'fog';
      break;
    default:
      icon = "cloud-meatball";
  }
  return icon;
}
