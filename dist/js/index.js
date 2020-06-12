const userInfo = $("form.userInput"),
    addressInput = $(".address"),
    zipcodeInput = $(".zipCode");
let userData;
$(document).ready(() => {
    function a(a, c) { $.post("/api/userInput", { address: a, zipcode: c }).then(a => { console.log(a), localStorage.locationData = JSON.stringify(a), window.location.replace("/restaurant_list.html") }).catch(b) }

    function b(a) { $("#alert .msg").text(a.responseJSON), $("#alert").fadeIn(500) }
    userInfo.on("submit", b => { b.preventDefault(), userData = { address: addressInput.val().trim(), zipcode: zipcodeInput.val().trim() }, a(userData.address, userData.zipcode), addressInput.val(""), zipcodeInput.val("") }) });