// Enter your Font Awesome URL here. Depending on how you use it, it could be a kit URL or another CDN, or maybe
// you added it locally. Either way, that goes into FA_URL
const FA_URL = "https://kit.fontawesome.com/aa12345678.js";

// This token is needed for the Virginia Covid Data API
// Get yours here: https://data.virginia.gov/profile/edit/developer_settings
const VA_TOKEN = "1234567890123456789012345";

// This token is needed for Open Weather Map
// Get yours here: https://openweathermap.org/guide
const OWM_TOKEN = "12345678901234567890123456789012";

// These are the coordinates you'll use for weather.
// Give it an id (I use three letter representations), a name, and the lat/long coordinates.
// Find the lat/long here (or your favorite mapping tool): https://www.mapcoordinates.net/en
const WEATHER_COORDS = {
  nyc: {
    name: 'New York City',
    lat: '30.000000',
    long: '-80.000000'
  },
  bos: {
    name: 'Boston',
    lat: '30.000000',
    long: '-80.000000'
  }
}

// These are your COVID locations.
// I use the same three-letter ID style here for the ID. The value must match the way the location shows up in this JSON:
// https://data.virginia.gov/resource/bre9-aqqr.json
const COVID_LOCS = {
  rad: "Radford",
  gal: "Galax",
  mon: "Montgomery",
  pul: "Pulaski"
};
