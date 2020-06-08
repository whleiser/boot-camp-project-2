// Requiring our models and passport as we've configured it
const db = require("../models");
// const passport = require("../config/passport");
const geolib = require('geolib');
const axios = require("axios");



module.exports = function(app) {

    // MAPQUEST API
    app.post("/api/userInput", (req, res) => {

        const apiKey = "VyXiMxXtP3oty4G8rjGqLCFpJq5jVDzI";

        const mapQuest = "http://www.mapquestapi.com/geocoding/v1/address?key=" + process.env.MAPQUEST_API_KEY + "&street=" + encodeURIComponent(req.body.address) + "&postalCode=" + req.body.zipcode;

        console.log(mapQuest);

        axios.get(mapQuest)

        .then(function(response) {
            console.log(response.data);
            res.json(response.data);
        });


    });

    // RADIUS API

    app.get("/api/results", function(req, res) {
        //current numbers are placeholders for external inputs from Mapquest API
        var userLat = 32.854961;
        var userLong = -96.77867;
        var userDistance = 0.8;

        //converts user distance miles to meters for geolib
        var convertedDistance = (userDistance * 1609.34);

        //find if restaurant point is within radius of user point and return if true
        db.restaurants.findAll({}).then(function(results) {

            const filteredResults = results.filter(row => {
                var matches = row.latLong.match(/\(.+/);

                if (matches !== null && matches.length > 0) {
                    let dbLatLong = matches[0];
                    //turns database lattitude/longitude into separate integers
                    dbLatLong = dbLatLong.replace("(", "");
                    dbLatLong = dbLatLong.replace(")", "");
                    dbLatLong = dbLatLong.split(",");

                    var dbLat = parseFloat(dbLatLong[0]);
                    var dbLong = parseFloat(dbLatLong[1]);

                    return geolib.isPointWithinRadius({ latitude: userLat, longitude: userLong }, { latitude: dbLat, longitude: dbLong }, convertedDistance);
                }

                return false;
            });

            res.json(filteredResults);
        });
    });

};