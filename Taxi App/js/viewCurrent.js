// The name of this file is viewCurrent.js
// The function of this JavaScript file is to be connected with viewCurrent.html
// Written by Chua Zi Ying
// Last Modified : 11/5/2021

"use strict"

// Getting the keys
let currentData = getStorage(APP_DATA_KEY);
let today = new Date().toLocaleDateString();

if (currentData.startDate == currentData.compTime)
{
    // Display the html codes
    displayCurrentData(currentData);
}

// The name of the function is displayCurrentData()
// The purpose of this function is to display brief information of the current booking in a list.
// The parameter involved : data 
// The output involved : html code
function displayCurrentData(data)
{
    let output = "";
    output += `<ul>`;
    output += `<li class="mdl-list__item mdl-list__item--three-line">`;
    output += `<span class="mdl-list__item-primary-content">`;
    output += `<i class="material-icons mdl-list__item-avatar">.☟.</i>`;
    output += `<span>From: ${getLocationName(data.startLocation[0],data.startLocation[1])} To: ${getLocationName(data.finalLocation[0],data.finalLocation[0])}</span></span>`;
    output += `<span class="mdl-list__item-secondary-content">`;
    output += `<a class="mdl-list__item-secondary-action" onclick="window.location='viewCurrentBooking.html'">`;
    output += `<i class="material-icons">info</i></a>`;
    output += `</span></li>`;
    output += `</ul>`;
    
    // Displaying the HTML code in the file
    document.getElementById("currentPage").innerHTML = output;
}

// Display the html codes
displayCurrentData(currentData);