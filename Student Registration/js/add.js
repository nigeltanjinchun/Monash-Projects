// The purpose of this JavaScript file is to store the function for task 6 only. This JavaScript file 
// is connected to the add.html file and is responsible for adding student into the queue
// This JavaScript file is connected to the add.html file
// Written by Tan Jin Chun (32194471)
// Last Modified : 28/4/2021

"use strict";

// Task 6
// The name of this function is addStudent
// The purpose of this function would be to add a student based on the user input provided in the add.html file 
// The parameter involved: None
// The output involved : String (Into add.html and index.html) add.html will display the error message 
// string and add a student if all of the input are valid
function addStudent()
{
    // Declaring the reference variable
    let fullNameRef = document.getElementById("fullName");
    let idRef = document.getElementById("studentId");
    let problemRef = document.getElementById("problem");

    // The reference variable for the error messages
    let fullName_msgRef = document.getElementById("fullName_msg");
    let id_msgRef = document.getElementById("studentId_msg");
    let problem_msgRef = document.getElementById("problem_msg");

    // Getting the value
    let fullName = fullNameRef.value;
    let id = idRef.value;
    let problem = problemRef.value;

    // Constant regex to check whether the student id matches or not
    const REGEX = /^[1-3]{1}[0-9]{7}$/;
    const REGEXNAME = /^[A-Za-z\s]+$/;

    // Checking that the input is not blank
    // If the input is valid, add the student using the addStudent method from the session class
    // then update the session data in localStorage and then provide an alert to the user and redirect
    // the user to the main page (index.html)
    // Checking that the full name given is not empty
    if(fullName === "")
    {
        fullName_msgRef.innerHTML = "The name should not be empty.";
    }

    // Checking that the input does not contain any number
    if(fullName !== "" && fullName.match(REGEXNAME) == null)
    {
        fullName_msgRef.innerHTML = "The name should not contain any digits or symbols.";
    }

    // Checking that the student id is not empty
    if(id === "")
    {
        id_msgRef.innerHTML = "The student id should not be empty.";
    }

    // Checking that the student id is in a valid form
    if(id !== "" && id.match(REGEX) == null)
    {
        id_msgRef.innerHTML = "The student id is invalid.";
    }

    // Checking that the problem description is not empty
    if (problem === "")
    {
        problem_msgRef.innerHTML = "The problem description should not be empty.";
    }

    // Carry out the remaining function 
    if(fullName !== "" && id !== "" && id.match(REGEX) != null && problem !== "" && fullName.match(REGEXNAME) != null)
    {
        consultSession.addStudent(fullName,id,problem);
        updateStorage(APP_DATA_KEY,consultSession);
        alert("The student has been added");
        window.location = "index.html";
        return;
    }
}
