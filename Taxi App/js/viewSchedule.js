// The name of this file is viewSchedule.js
// The function of this file is to connect with viewSchedule.html and show the list of all bookings made by the use
// Written by Jayden George & Chua Zi Ying
// Last Modified : 5/3/2021

"use strict"

// Getting the keys
let scheduleData = getStorage(APP_DATA_KEY);
let today = new Date().toLocaleDateString();

if (scheduleData.startDate > today)
{
    // Display the html codes
    displayData(scheduleData);
}

// The name of the function is displayScheduleData()
// The purpose of this function is to display brief information of the current booking in a list.
// The parameter involved : data 
// The output involved : html code
function displayScheduleData(data)
{
    let output = "";
    output += `<ul>`;
    output += `<li class="mdl-list__item mdl-list__item--three-line">`;
    output += `<span class="mdl-list__item-primary-content">`;
    output += `<i class="material-icons mdl-list__item-avatar">.☟.</i>`;
    output += `<span>From: ${data.startLocation} To: ${data.finalLocation}</span></span>`;
    output += `<span class="mdl-list__item-secondary-content">`;
    output += `<a class="mdl-list__item-secondary-action" onclick="window.location='viewCurrentBooking.html'">`;
    output += `<i class="material-icons">info</i></a>`;
    output += `</span></li>`;
    output += `</ul>`;

    // Displaying the HTML code in the file
    document.getElementById("currentPage").innerHTML = output;
}

displayScheduleData(scheduleData);
