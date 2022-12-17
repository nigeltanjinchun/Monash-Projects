// The name of this file is viewScheduledBooking.js
// The function of this file is to connect with viewScheduledBooking.html
// Written by Jayden George & Chua Zi Ying
// Last Modified : 10/5/2021

"use strict"

// Creating a new map
mapboxgl.accessToken = "pk.eyJ1IjoibmlnZWx0YW4iLCJhIjoiY2tvM283ZXloMGF1MzJwczJrenNvYmNmcyJ9.csNssJZ0RWGyAOrIBSRM4Q";
let map = new mapboxgl.Map({
     container: 'map',
    center: [144.9648731,-37.86217],
    zoom: 14,
    style: 'mapbox://styles/mapbox/streets-v9'
});

// Retrieve the stored index
let index = getStorage(BOOKING_DATA_KEY);
let queue = getStorage(BOOKING_QUEUE_KEY);

// Get the selected bookings using indexes
let bookings = bookingList.getBooking(index,queue);

// Declaring the reference variable
let titleRef = document.getElementById("startBooking");
let pageRef = document.getElementById("future-content");

// Print the title for the booking
titleRef.innerHTML = `<h3>${getLocationName(bookings.startLocation[0], bookings.startLocation[1])}</h3>`;

// Shown the data which will be printed to the viewCurrentBooking.html
let output = "";
output += `<br><div><h5>Start Time:<span class="mdl-list__item-primary-content">`;
output += `<span>${bookings.startTime}</span></span></h5></div>`;
output += `<br><hr>`;
output += `<div><div><h5>Start Date:<span class="mdl-list__item-primary-content">`;
output += `<span>${bookings.startDate}, Today</span></span></h5></div>`;
output += `<br><hr>`;
output += `<div><h5>Start Location:<span class="mdl-list__item-primary-content">`;
output += `<span>${getLocationName(bookings.startLocation[0], bookings.startLocation[1])}</span></span></h5></div>`;
output += `<br><hr>`;

// For loop
for (let i = 0; i < bookings.stops.length; i++)
{
    output += `<div><h5>Stops${i+1}:<span class="mdl-list__item-primary-content">`;
    output += `<span>${getLocationName(bookings.stops[i][0], bookings.stops[i][0])}</span></span></h5></div>`;
    output += `<br><hr>`;
}
output += `<div><h5>Final location:<span class="mdl-list__item-primary-content">`;
output += `<span>${getLocationName(bookings.finalLocation[0], bookings.finalLocation[1])}</span></span></h5></div>`;
output += `<br><hr>`;
output += `<div><h5>Taxi Type:<span class="mdl-list__item-primary-content">`;
output += `<span>${bookings.taxiType}</span></span></h5></div>`;
output += `<br><hr>`;
output += `<div><h5>Taxi Fare:<span class="mdl-list__item-primary-content">`;
output += `<span>${bookings.fare}</span></span></h5></div>`;
output += `<br><hr><br>`;
output += `</div></div>`;

// Print the outputs to the screen
pageRef.innerHTML = output;

// Provide all the location & descriptions which are going to show on the map
for (let i = 0; i < bookings.stops; i++)
{
    // Find all the locations of the stops
    let stopAll = "";
    stopAll += 
    {
        coordinates: [parseFloat(bookings.stops[i][0]), parseFloat(bookings.stops[i][1])],
        description: `${getLocationName(bookings.stops[i][0], bookings.stops[i][1])}`
    }
}
// Find all the locations which will be shown on the map
let locations = [
    {
        coordinates: [parseFloat(bookings.startLocation[0]), parseFloat(bookings.startLocation[1])],
        description: `${getLocationName(bookings.startLocation[0], bookings.startLocation[1])}`
    },
    JSON.parse(stopAll),
    {
        coordinates: [parseFloat(bookings.finalLocation[0]), parseFloat(bookings.finalLocation[1])],
        description: `${getLocationName(bookings.finalLocation[0] ,bookings.finalLocation[1])}`
    }
];

// Produce the marker and pop up for the map
for (let i = 0; i < locations.length; i++)
{
	let location = locations[i];
	let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
	marker.setLngLat(location.coordinates);

	let popup = new mapboxgl.Popup({ offset: 45});
	popup.setHTML(location.description);

	marker.setPopup(popup)

	// Display the marker.
	marker.addTo(map);

	// Display the popup.
	popup.addTo(map);
}

// The name of this function is showPath()
// Function for linking the selected locations together by display polyline path connecting each other when the page is loaded
// The parameter involved is : none
// The output involved is : undefined
map.on('load',function showPath() 
{
        let object = 
    {
        type: "geojson",
        data:{
        type: "Feature",
        properties: {},
            geometry: {
                type: "LineString",
                coordinates: []
            }
        }
    };
    for(let i = 0; i < locations.length; i++)
    {
        object.data.geometry.coordinates.push(locations[i].coordinates);
    }   
    map.addLayer({
        id: "routes",
        type: "line",
        source: object,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#888", "line-width": 6 }
    });
});

// The name of this function is panToLocation()
// Function for making sure that the map is panned on a certain location when loaded.
// The parameter involved is : data
// The output involved is : undefined
function panToLocation(data)
{
    let location = [parseFloat(data[0]), parseFloat(data[1])];
	map.panTo(location);
}

// The map is panned on the starting location when the map is loaded
panToLocation(bookings.startLocation);

// The name of this function is deleteScheduleBooking()
// The purpose of this function is to delete the whole of the booking when a button is pressed
// The input would be the data
function deleteScheduleBooking(index, queueIndex)
{
    if(confirm("Are you sure you want to delete your booking?"))
    {
        alert("The booking has been deleted!");
        window.location = "viewCurrent.html";
        bookingList.deleteBooking(index,queueIndex);
        updateStorage(APP_DATA_KEY,bookingList);   
    }
    else
    {
        return false;
    }
}
 
// The name of this function is changeTaxi()
// The purpose of this function is to edit the type of taxi for this booking
// The parameter involved is : none
// The output involved is : Change in html page
function changeTaxi()
{
    if(confirm("Are you sure you want to change Taxi?"))
    {
        window.location="taxiType.html"
    }   
    else
    {
        return false
    }
}

 