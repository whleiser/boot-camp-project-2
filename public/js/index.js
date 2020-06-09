// const addressValidator = require('address-validator');
const userInfo = $("form.userInput");
const addressInput = $(".address");
const zipcodeInput = $(".zipCode");
// var Address = addressValidator.Address;
// var _ = require('underscore');
let userData;
// INDEX JS

$(document).ready(() => {
    // Getting references to our form and input

    // When the userInput button is clicked, we validate the address and zipcode are not blank
    userInfo.on("submit", event => {
        event.preventDefault();
        userData = {
            address: addressInput.val().trim(),
            zipcode: zipcodeInput.val().trim()
        };

        //   let address = userData.address + " " + 'Dallas, TX, US';
        //   console.log(address);

        //   addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){
        //     console.log('input: ', address.toString())
        //     console.log('match: ', _.map(exact, function(a) {
        //       return a.toString();
        //     }));
        //     console.log('did you mean: ', _.map(inexact, function(a) {
        //       return a.toString();
        //     }));

        //     //access some props on the exact match
        //     var first = exact[0];
        //     console.log(first.streetNumber + ' '+ first.street);
        // });

        userInputUser(userData.address, userData.zipcode);
        addressInput.val("");
        zipcodeInput.val("");

    });



    // If we have an address and zipcode, run the userInputUser function


    // Does a posat to the userInput route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function userInputUser(address, zipcode) {


        $.post("/api/userInput", {
                address: address,
                zipcode: zipcode
            })
            .then((response) => {
                console.log(response);
                localStorage.locationData = JSON.stringify(response);

                window.location.replace("/restaurant_list.html");
                // If there's an error, handle it by throwing up a bootstrap alert
            })

        .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

});