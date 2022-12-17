// The name of this file is shared.js
// The purpose of this file is to store the functions that will be used throughout the 9 pages
// Written by Tan Jin Chun
// Last Modified : 18/5/2021

"use strict"

// Keys for the local storage
const BOOKING_DATA_KEY = "bookingIndex";
const BOOKING_QUEUE_KEY = "queueIndex"
const APP_DATA_KEY = "bookingAppData";

// The API Key for open cage API
let API_KEY = "5f665e76619c47dcbfeddfa01e8b9883";

// The classes
// The first class
class BookingTaxi
{
    constructor(startDate = "",startTime = "",startLocation = "",finalLocation = "",taxiType="", stops="", distance = "", fares = "")
    {
        this._startDate = startDate;
        this._startTime = startTime;
        this._startLocation = startLocation;
        this._finalLocation = finalLocation;
        this._taxiType = taxiType;
        this._stops = stops;
        this._distance = distance;
        this._fares = fares;
    }

    // Accessors
    get startDate()
    {
        return this._startDate.toLocaleDateString();
    }

    get startTime()
    {
        return this._startTime.toLocaleTimeString();
    }

    get startLocation()
    {
        return this._startLocation;
    }

    get finalLocation()
    {
        return this._finalLocation;
    }

    get taxiType()
    {
        return this._taxiType;
    }

    get stops()
    {
        return this._stops;
    }

    get distance()
    {
        return this._distance;
    }

    get fares()
    {
        return this._fares;
    }

    // Setter
    set taxiType(newTaxi)
    {
        this._taxiType = newTaxi;
    }

    // Methods
    // The first method is fromData
    // The function of this method is to reassign the value back to the object
    fromData(data)
    {
        this._startDate = data._startDate;
        this._startTime = data._startTime;
        this._currentLocation = data._currentLocation;
        this._finalLocation = data._finalLocation;
        this._taxiType = data._taxiType;
        this._stops = data._stops;
        this._distance = data._distance;
        this._fares = data._fares;
    }

    // Methods
    addBooking(startDate,startTime,currentLocation,finalLocation)
    {
        // Declaring a new Student instance that is stored in the variable student
        let booking = new BookingTaxi(startDate, startTime,currentLocation, finalLocation)

        // Current is today's date
        // Future is greater than todays date
        // Past is less then today's date

        if (this._bookingList[0].startDate <= this._compTime)  // This if statement is for the past
        {
            this._bookingList[0].push(booking);
        }
        else if(this._bookingList[0].startDate > this._compTime) // This statement is for the future
        {
            this._bookingList[2].push(booking);
        }
        else // This statement is for the present bookings
        {
            this._bookingList[1].push(booking);
        }
    }
}


// The second class
class BookingList
{
    constructor()
    {
        this._compTime = new Date();
        this._bookingList = [];
    }

    // Accessor
    get compTime() 
    {
        return this._compTime.toLocaleDateString();
    }

    get bookingList()
    {
        this._booking = bookingList;
    }

    // Methods
    addBooking(startDate,startTime,currentLocation,finalLocation)
    {
        // Declaring a new Student instance that is stored in the variable student
        let booking = new BookingTaxi(startDate, startTime,currentLocation, finalLocation)

        // Current is today's date
        // Future is greater than todays date
        // Past is less then today's date

        if (this._bookingList[0].startDate <= this._compTime)  // This if statement is for the past
        {
            this._bookingList[0].push(booking);
        }
        else if(this._bookingList[0].startDate > this._compTime) // This statement is for the future
        {
            this._bookingList[2].push(booking);
        }
        else // This statement is for the present
        {
            this._bookingList[1].push(booking);
        }

    }

    deleteBooking(bookingIndex, queueIndex) 
    {
        this._queue[queueIndex].splice(bookingIndex, 1);
    }

    addSubQueue() 
    {
        this._bookingList.push([]);
    }

    getBooking(bookingIndex, queueIndex) 
    {
        return this._bookingList[queueIndex][bookingIndex];
    }

    fromData(data)
    {
        // First , we need to reassign the startTime from the localStorage's data (from Task 5) into the
        // start time after the class and the queue as well to an empty array
        this._startTime = data._startTime;
        this._bookingList = [];
        let queueData = data._bookingList;

        // Then, we need to loop through data._queue 
        for (let i = 0; i < queueData.length; i++) 
        {
            this._bookingList[i] = [];

            // Inside the loop , we need to loop once more through queueData[i] (sub data) (an array within an array)
            for (let j = 0; j < queueData[i].length; j++) 
            {

                // Inside this loop, we need to create a new student session and reassign each of the value
                // inside each of the variable using fromData method in the student class and finally push it
                // to the queue.
                let newBooking = new BookingList();
                newBooking.fromData(queueData[i][j]);
                this._bookingList[i].push(newBooking);
            }
        }
    }
}

// The first function
// The purpose of this function is to check whether if there are any data in the storage
// The name of the function is checkStorage
// The purpose of this function is to check if the data exist in the localStorage.
// The parameter involved : key
// The output involved : boolean (true or false)
function checkStorage(key)
{
    if (localStorage.getItem(key) !== null) 
    {
        return true;
    }
    else 
    {
        return false;
    }
}

// The second function
// The name of the function is updateStorage
// The purpose of this function is to update data into localStorage. The function will take two parameter
// which is key and data
// The parameter involved : key and the data related to the key
// The output involved : none
function updateStorage(key,data)
{
    // Stringfying of the data (Converting object to a string)
    let jsonString = JSON.stringify(data);

    // Put it into the local storage
    localStorage.setItem(key, jsonString);
}

// The third function
// The name of the function is getStorage
// The purpose of this function is to retrieve the data from the local sotrage.
// The parameter involved : key and data related to the key
// The output involved : none
function getStorage(key)
{
    // Get the item from localStorage
    let data = localStorage.getItem(key);

    // Determining if it is necessary to parse the data
    try 
    {
        data = JSON.parse(data);
    }
    catch (error) 
    {
        console.log(error);
    }
    finally 
    {
        // Return back the object
        return data;
    }
}

// The fourth function
// The name of the function is updateDayTime
// The purpose of this function is to display the date and the clock at the right hand corner of each of the page 
// The parameter involved : None
// The output involved : Undefined
function updateDayTime() 
{
    // Creating a variable to hold the current time/date
    let today = new Date();

    // Function to continue to display time
    let time = today.toLocaleTimeString();
    let date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
    let dateTime = date + `<br>` + time;
    let timeRef = document.getElementById("clock");
    timeRef.innerHTML = dateTime;
}

// Given function
// The name of the function is webServiceRequest()
// The purpose of this function is to obtain the url and data and encode it into a link
// The parameter invovled is the uniform resource locator(URL) and the data
// The output involved is none
function webServiceRequest(url,data)
{
	// Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

// The name of this function is getLatLong()
// The purpose of this function is to get the address and convert it to the latitude and longitude
// The parameter is the address (string)
// The output is the latitude and longitude
function getLatLong()
{
    let addressStartRef = document.getElementById("startLocation");
    let addressStart = addressStartRef.value;

    let data = {
        q: addressStart,
        key: API_KEY,
        jsonp: "showData",
        countrycode: "MY"
    };

    let url = `https://api.opencagedata.com/geocode/v1/json`;
    webServiceRequest(url,data);
}


// Reverse geocoding
// The name of this function is getLocationName()
// The purpose of this function is to get the longitude and latitude and convert it into an address
// The parameter involved is longitude and latitude
// The output involved is the address of the location (a string)
function getLocationName(longitude,latitude)
{
    let data = {
        q: `${latitude},${longitude}`,
        key: API_KEY,
        callback: `editMarker` // callback function
    }

    let url = `https://api.opencagedata.com/geocode/v1/json`;
    webServiceRequest(url,data);
}


// Code to update the date and time continuously
setInterval(updateDayTime,1000);

// Code that will run 
// Creating a new Session instance stored in a variable
let bookingList = new BookingList();

// Checking if any data exist in the local storage
let check = checkStorage(APP_DATA_KEY);

// Using an if-else statement to execute the required function
// If the data exist in the local storage for APP_DATA_KEY , then retrieve it using task 4 function
// (getStorage) and restore it using the Session class fromData() method into the consultSession variable
// If not, create two queues using the Session class addSubQueue method and then update the localStorage 
// using task 3 function updateStorage()
if (check == true) 
{
    // Retrieving the data if the statement is true using the task 4 function
    let data = getStorage(APP_DATA_KEY);

    // Restoring the data using the Session class fromData() method
    bookingList.fromData(data);
}

else 
{
    // Create three queues by calling the addSubQueue() method three times and then update the storage using
    // the suitable key and the data
    bookingList.addSubQueue();
    bookingList.addSubQueue();
    bookingList.addSubQueue();
    updateStorage(APP_DATA_KEY, bookingList);
}
