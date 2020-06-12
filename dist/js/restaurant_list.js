$(document).ready(() => {
    function a() { e.empty(); for (var a = [], c = 0; c < d.length; c++) a.push(b(d[c]));
        e.append(a) }

    function b(a) { var b = $("<div class = 'my-5'>");
        b.addClass("card"); var c = $("<div>");
        c.addClass("card-header"); var d = $("<h2>"),
            e = $("<div>");
        e.addClass("card-body"); var f = $("<p>"); return d.text(a.name + " "), f.text(a.streetAddress), c.append(d), e.append(f), b.append(c), b.append(e), b.data("restaurant", a), b }

    function c() { e.empty(); var a = $("<h2>");
        a.css({ "text-align": "center", "margin-top": "50px" }), a.html("No results in your area. Make sure to use a valid address within the city of Dallas or try widening your search radius."), e.append(a) } var d, e = $(".results-container"); const f = JSON.parse(localStorage.locationData).results[0].locations[0].displayLatLng;
    console.log(f), $.post("/api/results", f).then(function(b) { d = b, d && d.length ? a() : c() }) });