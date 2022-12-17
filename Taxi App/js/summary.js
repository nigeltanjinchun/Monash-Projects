// The name of this file is summary.js
// The purpose of this file is to be connected with summary.html
// Written by Tan Jin Chun
// Last Modified : 18/5/2021

"use strict";

// Creating a new map
mapboxgl.accessToken = "pk.eyJ1IjoibmlnZWx0YW4iLCJhIjoiY2tvM283ZXloMGF1MzJwczJrenNvYmNmcyJ9.csNssJZ0RWGyAOrIBSRM4Q";
let map = new mapboxgl.Map({
     container: 'map',
    center: [144.9648731,-37.86217],
    zoom: 14,
    style: 'mapbox://styles/mapbox/streets-v9'
});

// Getting the information from the 
let data = JSON.parse(localStorage.getItem(BOOKING_DATA_KEY));
let queueIndex = JSON.parse(localStorage.getItem(BOOKING_QUEUE_KEY));

let bookingDetails = new BookingTaxi();
bookingDetails = bookingList.getBooking(data, queueIndex);

let dateRef = document.getElementById("date");
let startLocalRef = document.getElementById("startLocation");


// The name of this function is confirm()
// The purpose of this function is to get confirmation from the user that they want to make a booking
// The parameter involved is none
// The output involved is none
function confirm()
{   
    if(confirm("Are you sure you want to make this booking?"))
    {
        updateStorage(APP_DATA_KEY,data);

        // redirects the user back to index.html
        window.location = "index.html";  
    }
    else
    {
        return false;
    }
}