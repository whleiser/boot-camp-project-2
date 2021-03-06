$(document).ready(() => {

    var resultsContainer = $(".results-container");
    var restaurants;

    const locationData = JSON.parse(localStorage.locationData).results[0].locations[0].displayLatLng;
    console.log(locationData);

    $.post("/api/results", locationData).then(function(data) {
        restaurants = data;
        if (!restaurants || !restaurants.length) {
            displayEmpty();
        } else {
            initializeResults();
        }
    });



    // Getting the initial list of restaurants


    function initializeResults() {
        resultsContainer.empty();
        var restaurantsToAdd = [];
        for (var i = 0; i < restaurants.length; i++) {
            restaurantsToAdd.push(createResults(restaurants[i]));
        }
        resultsContainer.append(restaurantsToAdd);
    }

    // This function constructs a post's HTML
    function createResults(restaurant) {
        var newPostCard = $("<div class = 'my-5'>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var newPostTitle = $("<h2>");
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(restaurant.name + " ");
        newPostBody.text(restaurant.streetAddress);
        newPostCardHeading.append(newPostTitle);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("restaurant", restaurant);
        return newPostCard;
    }

    function displayEmpty() {
        resultsContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No results in your area. Make sure to use a valid address within the city of Dallas or try widening your search radius.");
        resultsContainer.append(messageH2);
    }

});