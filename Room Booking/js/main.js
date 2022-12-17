// Javascript file
// Assignment 1a
// The purpose of this JavaScript file is to allow user to book a specified room between the hours of
// 8am and 6pm
// Written by Tan Jin Chun
// Last Updated : 31/03/2021

"use strict"

// Given Code
let bookingData = [
	{
  	time: "08:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "09:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "10:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "11:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "12:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "13:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "14:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "15:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "16:00",
    reason: "",
    label: "",
    booked: false
  },{
  	time: "17:00",
    reason: "",
    label: "",
    booked: false
  }
];

// Written Code
// Task 1
// Name of the function is bookRoom
// The purpose of the function is to update the main booking data for the room (Update the reason 
// label and booked status for the time specified)
// Parameters Involved : time , reason , label
// Output Involved : Undefined

// Using a for loop to go through each data and update them
// Using the if statement to check if time is equal to booking data time then update the reason and
// label and assign a bool(true) value to the variable booked. NO need for false as there is no need to
// update if there is no booking
function bookRoom(time,reason,label)
{
    for(let i = 0; i < bookingData.length ; i++) 
    {
        if(bookingData[i].time == time) 
        {
            bookingData[i].reason = reason;
            bookingData[i].label = label;
            bookingData[i].booked = true;
            break;
        }
    }
}

// Task 2
// Name of the function is checkRoomBooked
// The purpose of the function is to check the bpoking data to see if the room is booked at the time provided
// Should return true if booked and false if not booked(available)
// Parameters Involved : time
// Output Involved: true/false (Boolean Value)

// Using a for loop again to go through each data to see whether the value booked is equal to true
// and then output a bool value(true if booked and false if it is not booked)
function checkRoomBooked(time)
{
    for(let i = 0; i < bookingData.length ; i++)
    {

      // If the room is booked , return back the boolean value stored in bookingData which is true
        if (bookingData[i].time == time)
        {
          return bookingData[i].booked
        }
    }
}

// Task 3
// Name of the function is clearRoomBookings
// The purpose of the function is to reset the bookings by resetting the appropriate properties for each time
// slot to their default state. The function will also iterate through the relevant time slot objects and set the relevant 
// properties to their DEFAULT state.
// Parameters Involved : - (None)
// Output Involved : (Undefined)

// Using a for loop to iterate through the data set and reset for the ENTIRE time slot so no
// if statement is required here
// Set reason and label to an empty string and the bool value if booked to false(available) and update display after
function clearRoomBookings()
{
    for(let i = 0; i < bookingData.length ; i++) 
    {
        bookingData[i].reason = "";
        bookingData[i].label = "";
        bookingData[i].booked = false;
    }
    updateDisplay();
}

// Task 5 
// Name of the function is updateDisplay
// The purpose of the function is to iterate over the bookingData , generating and displaying the neccessary
// HTML code to show the current booking status of the room for the day on the page to the user.
// Parameters Involved : - (None)
// Output Involved : (Undefined)

// Using a for loop to iterate over the bookingData ,generate and displaying the relevant HTML code
// Using a ternary operator, if booking is true, display not available , if it is false, display available
function updateDisplay()
{

    // Declaring the variable of output as a string
    let output = "";
    // Using a for loop to iterate through the data
    for(let i = 0; i < bookingData.length; i++) 
    {
        // Declaring the variable and extracting the relevant data
        const TIME = bookingData[i].time;
        const LABEL = bookingData[i].label;
        const BOOKED = bookingData[i].booked;

        // Simpler Code (Ternary Operator)
       output += `<p>${TIME} : ${BOOKED?`Not Available (${LABEL})`:"Available"}</p>`;

       /* Alternative Code (Using an if statement)
        *if(BOOKED)
        *{
        *  output += `<p>${TIME} : Not Available (${LABEL})</p>`;
        *}
        *else 
        *{
        * output += `<p>${TIME} : Available </p>`;
        *} 
        */
    }

    // Putting HTML code in html file
    document.getElementById("output").innerHTML = output;
}

// Task 6
// Name of the function is doBooking
// The purpose of the function is to interact with the DOM to make the booking using the user input.
// The function will confirm with the user whether they want to do the booking or not and check if that
// the time slot wanted by the user is full. The function will also return the appriopriate popup to
// indicate if the user has give an invalid input
// Parameters Involved : - (None)
// Outputs Involved: (Undefined)

// First , we confirm to the user whether they want to make a booking or not
// Secondly , we create references for the user input elements(time reason and label)
// Thirdly , we create variables to hold the value of user input from the references
// If any of the input are invalid, show an appropriate message
// Make the room booking after taking confirmation from the user
// Update display on the page
function doBooking() 
{
  // Declaring the variables so as to check whether the label&reason are empty or not and the time selected
  // whether or not the time is available for booking(function2)

  // Declaring the reference variable
    let timeRef = document.getElementById("inputTime");
    let reasonRef = document.getElementById("inputReason");
    let labelRef = document.getElementById("inputLabel");
    
    // Getting the value
    let time = timeRef.value;
    let reason = reasonRef.value;
    let label = labelRef.value;

    // The above code can be concantenated into a single variable as such
    // let time = document.getElementById("inputTime").value;
    // let reason = document.getElementById("inputReason").value;
    // let label = document.getElementById("inputLabel").value;

    if(reason && label && time)
    {
      // Check whether the three inputs are filled or not, if there are filled, then check again to see if the
      // room is booked, if it is , alert the user , if it is not , use the function made in task 1
      // Nested If statement
      if(checkRoomBooked(time)) 
      {
        alert("The room is booked");
        return;
      }
      else
      {
        // Initialise a variable to check if the user really wants to book the room
        let check1 = false;
        check1 = confirm("Are you sure that you want to make this booking?");
        
        // If the user wants to book the room , book the room , if not , don't book the room
        if (check1) 
        {
          bookRoom(time,reason,label);
        }
      }
    } 

    // If only one or both of the input is empty, display the relevant alert to the user
    else if(reason && time)
    {
      alert("Label cannot be empty");
      return;
    }
    else if(label && time) 
    {
      alert("Reason cannot be empty");
      return;
    }
    else if(reason && label)
    {
      alert("Time cannot be empty");
      return;
    }
    else if(time)
    {
      alert("Reason and Label cannot be empty");
      return;
    }
    else if(reason)
    {
      alert("Time and Label cannot be empty");
      return;
    }
    else if(label) 
    {
      alert("Time and Reason cannot be empty");
      return;
    }
    else 
    {
      alert("The Time, Reason and Label cannot be empty when you want to book a room");
      return;
    }
    // Updating display after the above code
    updateDisplay();
}

// Task 7'
// Name of the function is clearAllBooking
// The purpose of the function is to interact with the DOM to clear all the bookings for the day
// Basically , the function checks with the user first if the user really wants to clear the booking
// if not , no action will be taken
// Parameters Involved : - (None)
// Output : (Undefined)

// Must confirm with the user that they want to clear the bookings first
// Call task 3 function first , then call task 5 function
// Need to go back to HTML file and modify the clear all booking button function and add onclick attribute
function clearAllBookings() 
{
  // Initialise a variable 
  let check2 = false;

  // Check with the user if they want to cancel their booking
  check2 = confirm("Are you sure that you want to cancel your booking?");

  // If yes, cancel the user's booking and update the display
  if(check2) 
  {
    clearRoomBookings();
    updateDisplay();
  }

}

// Task 8
// Name of the function is updateDateTime
// The purpose of the function is to display the current time on the page for the user and give a live
// update on the the current time
// Paramter Involved : None
// Output Involved : Undefined

// Show the current time, time only no date 
function updateDayTime() 
{
    let date = new Date();
    let time = date.toLocaleTimeString();
    let timeRef = document.getElementById("timeNow");
    timeRef.innerHTML = time;
}

// Task 9
// Coding starts here

// Updating the time every 1 second
setInterval(updateDayTime,1000);

// Calling the function from task 5 and update the page
updateDisplay();
