// The name of this file is taxiType.js
// The function of this file is to connect with taxiType.html
// Written by Chua Zi Ying
// Last Modified : 11/5/2021

// Declaring the reference variable
let distanceRef = document.getElementById("totalDistance");
let faresRef = document.getElementById("fares");
let dateInputRef = document.getElementById("dateInput");
let timeInputRef = document.getElementById("timeInput");
let taxiRef = document.getElementsByName("taxi");

// Retrieve the stored index
let index = getStorage(BOOKING_DATA_KEY);
let queue = getStorage(BOOKING_QUEUE_KEY);

// Get the selected bookings using indexes
let bookings = bookingList.getBooking(index,queue);

// Equation given for calculating the distance
const RADIUS = 6371; // km
const LATITUDE_1 = lat1 * Math.PI/180; // radians
const LATITUDE_2 = lat2 * Math.PI/180;
const DEL_LATITUDE = (lat2-lat1) * Math.PI/180;
const DEL_LONGITUDE = (lon2-lon1) * Math.PI/180;
const EQUATION_1 = Math.sin(DEL_LATITUDE/2) * Math.sin(DEL_LATITUDE/2) + Math.cos(LATITUDE_1) * Math.cos(LATITUDE_2) * Math.sin(DEL_LONGITUDE/2) * Math.sin(DEL_LONGITUDE/2);
const EQUATION_2 = 2 * Math.atan2(Math.sqrt(EQUATION_1), Math.sqrt(1-EQUATION_1));

// To find the dstance between the stops
if (stops.length == 0)
{
    // between current & final distance
    lon1 = parseFloat(bookings.currentLocation[0]);
    lon2 = parseFloat(bookings.finalLocation[0]);
    lat1 = parseFloat(bookings.currentLocation[1]);
    lat2 = parseFloat(bookings.finalLocation[1]);

    distance = RADIUS * EQUATION_2; // in km
}
else
{  
    let stops = bookings.stops;
    do {
        // between current and stop1
        lon1 = parseFloat(bookings.currentLocation[0]);
        lon2 = parseFloat(bookings.stops[0][0]);
        lat1 = parseFloat(bookings.currentLocation[1]);
        lat2 = parseFloat(bookings.stops[0][1]);
        distanceCurrent = RADIUS * EQUATION_2;
    }
    while(stops.length > 0)

    // between Stops
    for (let i = 0; i < stops.length ; i++)
    {  
        lon1 = parseFloat(bookings.stops[i][0]);
        lon2 = parseFloat(bookings.stops[i+1][0]);
        lat1 = parseFloat(bookings.stops[i][1]);
        lat2 = parseFloat(bookings.stops[i+1][1]);

        distance = RADIUS * EQUATION_2; // in km
        let distanceStops = distance + distanceStops;
    }

    do {
        // between last stop & final
        lon1 = parseFloat(bookings.stops[j-1][0]);
        lon2 = parseFloat(bookings.finalLocation[0]);
        lat1 = parseFloat(bookings.stops[j-1][1]);
        lat2 = parseFloat(bookings.finalLocation[1]);
        distanceFinal = RADIUS * EQUATION_2; // in km
    }
    while(stops.length > 0)

    distance1 = distanceCurrent + distanceStops + distanceFinal;
}
// total distance from current to final distance
let totalDistance = distance;

// total distance Rate
let distanceRate = 0.1/ (115/1000) * totalDistance; // RM

// Obtain the rate of the chosen taxi type
let fare = taxiRef.value;
if(fare == "car")
{
    rate = 3; // Flag rate: RM 3
}

else if(fare == "suv")
{
    rate = 5; // Flag rate: RM 5
}

else if(fare == "van")
{
    rate = 10; // Flag rate: RM 10
}

else if(fare == "minibus")
{
    rate = 15; // Flag rate: RM 15
}


// Get the dates stored in local storage
let dateStorage = bookings.startDate;

// Get the date input value from index.html
let dateInput = dateInputRef.value;

// Advanced booking: RM2.00 
if(bookingList.compTime() == dateStorage || bookingList.compTime() == dateInput)
{
    advancedBook = 2;
}


// Get the time stored in local storage
let timeStorage = bookings.startTime;

// Get the date input value from index.html
let timeInput = timeInputRef.value;

// Check that is the time between 12am and 6am
// if yes, the rate is doubled
// if no, the rate desn't increase
if(parseFloat(timeStorage) >= 0 && parseFloat(timeStorage) <= 6.00)
{
    nightLevy = rate * 2;
}

else if(parseFloat(timeInput) >= 0 && parseFloat(timeInput) <= 6.00)
{
    nightLevy = rate * 2;
}

else
{
    nightLevy = 0;
}

let totalFares = distanceRate + rate + advancedBook + nightLevy;

// Displaying the text on the viewBooking page
distanceRef.innerHTML = totalDistance;
faresRef.innerHTML = totalFares;

// The name of this function is proceed()
// The purpose of this function is to save the chosen taxi type, distance and fares
// The parameter involved is : none
// The output involved is : undefined
function proceed()
{
    // Declarring selected values for saving into local storage
    let taxiRef = document.getElementsByName("taxi").value;
    let distanceRef = document.getElementById("totalDistance").value;
    let faresRef = document.getElementById("fares").value;
    
    // Checking that the taxi radio button is not empty
    let getSelectedValue = document.querySelector( 'input[name="taxi"]:checked'); 

    // Getting the value from the radio buttons
    // display the error message to the user if the taxi type is not selected
    if(getSelectedValue === null) 
    {   
        alert("You have not selected any taxi type");
        document.getElementById("error").innerHTML = "You have not selected any taxi type"; 
    }   
    
    // confirm the selection.
    // Then update the local storage and bring the user back to the index page.
    else {    
        confirm("Please confirm your selection before proceeding.");
        bookingList.addBooking(taxiRef,distanceRef,faresRef);
        updateStorage(APP_DATA_KEY,bookingList);
        window.location = "viewSchedule.html"; 
    }   
}

// The name of this function is back()
// The purpose of this function is to return back to the original page
// The parameter involved is : none
// The output involved is : html
function back()
{
    // Bring the user back to the index.html only
    window.location = "index.html";
}

// The name of this function is clearRadioButton()
// The purpose of this function is to clear all of the radio button choice
// The paramter involved is none
// The output involved is : none
function clearRadioButton()
{
    // Looping through all of the radio button
    for(let i=0;i<taxiRef.length;i++)
    {
        taxiRef[i].checked = false;
    }
    alert("The choices has been cleared!");
    
    // Refresh the page to show the new changes
    wondow.location = "taxiType.html";

}