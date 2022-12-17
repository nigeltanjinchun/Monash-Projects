// This JavaScript file is responsible for outputting the information of the student in the 
// view.html page which includes the student name, student id and problem description of the student
// This JavaScript file is connected to the view.html file
// Written by Tan Jin Chun (32194471)
// Last Modified : 28/4/2021

"use strict";

// Task 12
// Write some global code that will run when view.js file is loaded

// Retrieve the stored indexes using the keys
let index = getStorage(STUDENT_INDEX_KEY);
let queueIndex = getStorage(STUDENT_QUEUE_KEY);

// Retrieved the selected student using the indexes via the getstudent() method in the Session class
let studentData = consultSession.getStudent(index,queueIndex);

// Displaying the data in view.html file
// Initialising the output
let output = "";

output += ` <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone"><h4><i>Student Name: </i><h4></div>
            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone"><h4><b>${studentData.fullName}</b><h4></div>
            </div>
            <div class="mdl-grid">
                    
            </div>
            <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone"><h4><i>Student ID: </i><h4></div>
            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone"><h4><b>${studentData.studentId}</b><h4></div>
            </div>
            <div class="mdl-grid">
                    
            </div>
            <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone"><h4><i>Problem Description: </i><h4></div>
            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone"><h4><b>${studentData.problem}</b><h4></div>
            </div>
            <div class="mdl-grid">
                    
            </div>
            <footer class="mdl-mini-footer">
                <div class="mdl-mini-footer__right-section">
                  <div class="mdl-logo">Drop-In Consulation</div>
                </div>
            </footer>
            `

// The output will then be displayed into view.html through the id (page-content)
document.getElementById("page-content").innerHTML = output;

