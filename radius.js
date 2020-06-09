//npm install geolib first
//requirements
const db = require("../models");
var restaurants = require("../models/restaurants.js");
const geolib = require('geolib');

app.get("/api/results", function(req, res) {
    //strings are placeholders for external inputs from Mapquest API
    var userLat = 32.854961;
    var userLong = -96.77867;
    var userDistance = 5;

    var dbLatLong = res.params.streetAddress.match(/\(.+/)[0];
    //turns database lattitude/longitude into separate integers
    dbLatLong = dbLatLong.replace("(", "");
    dbLatLong = dbLatLong.replace(")", "");
    dbLatLong = dbLatLong.split(",");

    var dbLat = parseFloat(latLong[0]);
    var dbLong = parseFloat(latLong[1]);

    //converts user distance miles to meters for geolib
    var convertedDistance = (userDistance * 1609.34);

    //find if restaurant point is within radius of user point and return if true
    db.restaurants.findAll({
        where: (geolib.isPointWithinRadius({ latitude: userLat, longitude: userLong }, { latitude: dbLat, longitude: dbLong }, convertedDistance) === true)
    }).then(function(results) {
        res.json(results);
    });
});