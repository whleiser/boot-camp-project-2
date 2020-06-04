const userInfo = $("form.userInput");
const addressInput = $(".address");
const zipcodeInput = $(".zipCode");

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
  
    if (userData.address || userData.zipcode) {
     
  userInputUser(userData.address, userData.zipcode);
    addressInput.val("");
    zipcodeInput.val("");
   
    }
    // If we have an address and zipcode, run the userInputUser function
   
    
  });
  
  // Does a post to the userInput route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function userInputUser(address, zipcode) {
    
 
    $.post("/api/userInput", {
      address: address,
      zipcode: zipcode
    })
    .then(() => {
      window.location.replace("/restaurant_list");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
  }
  
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  
});

