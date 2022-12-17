// The purpose of this JavaScript file is to store the function for task 2 , task 3 and task 4. This
// JavaScript file also contains the main classes which is the class for the Student and Session and the
// associated accessor as well as the method of the classes. 
// This JavaScript file is connected to all of the three pages (index.html, view.html and add.html)
// Written by Tan Jin Chun (32194471)
// Last Modified : 28/4/2021

"use strict";

// Keys for localStorage
const STUDENT_INDEX_KEY = "studentIndex";
const STUDENT_QUEUE_KEY = "queueIndex";
const APP_DATA_KEY = "consultationAppData";

// Task 1
// The purpose of this tasks is to define the classes along with the attributes , accessors and methods
// The class for Student 
class Student 
{
    // Constructor (Creates our object)
    // Accepts three parameters which is the student's full name, student id and problem description
    constructor(fullName = "", studentId = "", problem = "") 
    {
        //(_fullName is a private property)
        this._fullName = fullName;
        this._studentId = studentId;
        this._problem = problem;
    }

    // Accessors
    get fullName() 
    {
        return this._fullName;
    }
    get studentId() 
    {
        return this._studentId;
    }
    get problem() 
    {
        return this._problem;
    }

    // Methods
    // The name of the method is fromData
    // Takes one parameter which is the student Data object
    // Assign the object properties to the appropriate attributes
    // This is to restore the data from the object
    fromData(data) 
    {
        this._fullName = data._fullName;
        this._studentId = data._studentId;
        this._problem = data._problem;
    }
}

// The class for Session
class Session 
{
    // Constructor
    constructor() 
    {
        // new Date() returns a new Date object
        this._startTime = new Date();
        this._queue = [];
    }

    // Accessors
    // The accessor for startTime attribute should return a formatted string matching the locale data
    // or time format
    get startTime() 
    {
        return this._startTime.toLocaleDateString();
    }
    get queue() 
    {
        return this._queue;
    }

    // Methods
    // The name of the method is addSubQueue
    // The first method is responsible for adding a new subqueue to the _queue attribute (a new empty array)
    addSubQueue() 
    {
        this._queue.push([]);
    }

    // The second method is responsible for adding a new student to the shortest queue for the session
    // The name of the method is addStudent
    // Accept three parameters which is the student's full name, student id and the problem description.
    // Create a new instance of the Student class using the DATA PROVIDED.
    // Determine which queue the student should join and add the student to the queue
    addStudent(fullName, studentId, problem) 
    {
        // Declaring a new Student instance that is stored in the variable student
        let student = new Student(fullName, studentId, problem)

        // Using an if-else statement 
        // If the second queue is larger or equal than the first queue, push the student into the first one
        // If not , do the opposite (push the student into the second queue)
        // For the if-else statement , an if-else if statement can be used instead 
        // else if(this._queue[1].length < this._queue[0].length)
        if (this._queue[0].length <= this._queue[1].length) 
        {
            this._queue[0].push(student);
        }
        else 
        {
            this._queue[1].push(student);
        }

    }

    // The third method
    // The name of the method is removeStudent
    // The method is responsible for removing A student from the queue.
    // Accepts two parameters which is the student's index and the queue's index in the queue attribute
    removeStudent(studentIndex, queueIndex) 
    {
        this._queue[queueIndex].splice(studentIndex, 1);
    }

    // The fourth method
    // The name of the method is getStudent
    // The method is responsible for accessing and returning a specific Student instance in the queue.
    // The method should accept two parameter which is the student's index along with the queue's index
    getStudent(studentIndex, queueIndex) 
    {
        return this._queue[queueIndex][studentIndex];
    }

    // The fifth method
    // The name of the method is fromData
    // The method is responsible for restoring data state retrieved from local storage for a single session
    // Takes in one parameter which is the session data object.
    // It should assign the object properties to the appropriate attributes.
    // Need to iterate over the _queue property in the data object and re-create eachStudent instance
    fromData(data) 
    {
        // First , we need to reassign the startTime from the localStorage's data (from Task 5) into the
        // start time after the class and the queue as well to an empty array
        this._startTime = data._startTime;
        this._queue = [];
        let queueData = data._queue;

        // Then, we need to loop through data._queue 
        for (let i = 0; i < queueData.length; i++) 
        {
            this._queue[i] = [];

            // Inside the loop , we need to loop once more through queueData[i] (sub data) (an array within an array)
            for (let j = 0; j < queueData[i].length; j++) 
            {

                // Inside this loop, we need to create a new student session and reassign each of the value
                // inside each of the variable using fromData method in the student class and finally push it
                // to the queue.
                let newStudent = new Student();
                newStudent.fromData(queueData[i][j]);
                this._queue[i].push(newStudent);
            }
        }
    }
}

// Task 2
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

// Task 3
// The name of the function is updateStorage
// The purpose of this function is to update data into localStorage. The function will take two parameter
// which is key and data
// The parameter involved : key and the data related to the key
// The output involved : none
function updateStorage(key, data) 
{
    // Stringfying of the data (Converting object to a string)
    let jsonString = JSON.stringify(data);

    // Put it into the local storage
    localStorage.setItem(key, jsonString);
}

// Task 4
// The name of the function is getStorage
// The purpose of this function is to retrieve / get data from localStorage. The function will take one parameter
// which is the key. The function should also determine if it is necessary to parse the data back into an object
// and do so if required before returning it using the return statement
// The parameter involved : key
// The output involved : data (the data of the object)
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

// Task 5
// Code that will run when the file is loaded

// Creating a new Session instance stored in a variable
let consultSession = new Session();

// Checking if any data exist in the local storage
let check = checkStorage(APP_DATA_KEY);

// Using an if-else statement to execute the required function
// If the data exist in the local storage for APP_DATA_KEY , then retrieve it using task 4 function
// (getStorage) and restore it using the Session class fromData() method into the consultSession variable
// If not, create two queues using the Session class addSubQueue method and then update the localStorage 
// using task 3 function updateStorage()
if (check) 
{
    // Retrieving the data if the statement is true using the task 4 function
    let data = getStorage(APP_DATA_KEY);

    // Restoring the data using the Session class fromData() method
    consultSession.fromData(data);
}
else 
{
    // Create two queues by calling the addSubQueue() method twice and then update the storage using
    // the suitable key and the data
    consultSession.addSubQueue();
    consultSession.addSubQueue();
    updateStorage(APP_DATA_KEY, consultSession);
}


