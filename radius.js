//npm install geolib first
const geolib = require('geolib');

//strings are placeholders for external inputs
var userLat = parseInt("user input lat");
var userLong = parseInt("user input long");
var restaurantLat = parseInt("database lat");
var restaurantLong = parseInt("database long");
var userDistance = "user input";

//converts miles to meters for geolib
var convertedDistance = (userDistance * 1609.34);

//find if restaurant point is within radius of user point
geolib.isPointWithinRadius({ latitude: userLat, longitude: userLong }, { latitude: restaurantLat, longitude: restaurantLong },
    userDistance
);