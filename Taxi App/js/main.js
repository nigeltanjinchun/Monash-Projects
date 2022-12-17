// The name of this file is main.js
// The function of this JavaScript file is to connect with index.html
// Written by Tan Jin Chun
// Last Modified : 5/1/2021

"use strict"

// Function for adding booking data on the main page
function addBooking()
{
    // Declaring the reference variable
    let dateRef = document.getElementById("dateInput");
    let timeRef = document.getElementById("timeInput");
    let startLocationRef = document.getElementById("startLocation");
    let finalLocationRef = document.getElementById("finalLocation");

    // The reference variable for the error messages
    let date_msgRef = document.getElementById("dateInput_msg");
    let time_msgRef = document.getElementById("timeInput_msg");
    let startLocation_msgRef = document.getElementById("startLocation_msg");
    let finalLocation_msgRef = document.getElementById("finalLocation_msg");

    // Getting the value
    let date = dateRef.value;
    let time = timeRef.value;
    let startLocation = startLocationRef.value;
    let finalLocation = finalLocationRef.value;


    // Checking that the input is not blank
    // If the input is valid, add the student using the addStudent method from the session class
    // then update the session data in localStorage and then provide an alert to the user and redirect
    // the user to the main page (index.html)
    // Checking that the date given is not empty
    if(date === "")
    {
        date_msgRef.innerHTML = "The date should not be empty.";
    }

    // Checking that the time input is not empty
    if(time === "")
    {
        time_msgRef.innerHTML = "The time should not be empty.";
    }

    // Checking that the start location input is not empty
    if(startLocation === "")
    {
        startLocation_msgRef.innerHTML = "This textbox should not be empty.";
    }

    // Checking that the end location is not empty
    if(finalLocation === "")
    {
        finalLocation_msgRef.innerHTML = "This textbox should not be empty.";
    }

    if(date === "" || time === "" || startLocation === "" || finalLocation === "")
    {
        alert("None of the textfield should be empty when a booking is made!");
    }

    // Carry out the remaining function 
    if(date !== "" && time !== "" && startLocation !== "" && finalLocation !== "")
    {
        // Adding the booking list
        bookingList.addBooking(date,time,startLocation,finalLocation);
        // Updating the storage
        updateStorage(APP_DATA_KEY,bookingList);

        // Obtain confirmation from the user
        if(confirm(`The booking details is as follows:\nStart Location: ${startLocation}\nEnd Location: ${finalLocation}\nDo you wish to confirm?`))
        {
            // Showing an alert that the booking has been saved
            window.location = "taxiType.html";
            alert("The booking has been saved!");
            return;
        }
        else
        {
            // This is to return back to the page without deleting the current information on the page
            return false;
        }
    }
}

// The name of this function is clearBooking()
// Function for clearing booking data on the main page
// The parameter involved is : none (the value from the textboxes)
// The output involved is : undefined
function clearBooking()
{
    document.getElementById("dateInput").value = "";
    document.getElementById("startLocation").value = "";
    document.getElementById("timeInput").value = "";
    document.getElementById("finalLocation").value = "";
}
