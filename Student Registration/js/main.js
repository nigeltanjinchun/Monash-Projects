// The purpose of this JavaScript file is to store the function for task 7, task 8 , task 9 and task 10
// This JavaScript file is also responsible for updating the storage with the index using 
// given keys and is also responsible for removing students in the queue. 
// This JavaScript file is connected to the index.html and is responsible for updating the time "live"
// on the page. 
// Written by Tan Jin Chun (32194471)
// Last Modified : 28/4/2021

"use strict";

// Task 7
// The name of this function is updateDayTime
// The purpose of this function is to display a live clock on the main page
// The parameter involved : None
// The output involved : Undefined
function updateDayTime() 
{
    // Creating a variable to hold the current time/date
    let date = new Date();
    let time = date.toLocaleTimeString();
    let timeRef = document.getElementById("currentTime");
    timeRef.innerHTML = time;
}

// Task 8
// The name of this function is view
// The purpose of the function is to pass the data in the parameter provided to the view.html page via 
// localStorage.
// The parameter involved : index(student position in queue) and queueIndex(index of queue in the array of queues)
// The output involved : Undefined
function view(index, queueIndex) 
{
    // This will store the relevant values using the given keys
    // Can use localStorage.setItem instead but must stringfy the index and queueIndex beforehand
    updateStorage(STUDENT_INDEX_KEY, index);
    updateStorage(STUDENT_QUEUE_KEY, queueIndex);

    // This will redirect the user back to the view.html page
    window.location = "view.html";
}

// Task 9
// The name of this function is markDone
// The purpose of this function is that it takes two parameters , index and queueIndex.
// Must confirm with the user that they intend to mark this as done.
// If the user agrees, you will need to remove the student from the queue using the removeStudent 
// method from the session class and then update the localstorage with the latest data
// Parameter Involved : index(student position in queue) and queueIndex(index of queue in the array of queues)
// Output Invovled : Undefined (Just update the data and refreshes the page)
function markDone(index, queueIndex) 
{
    if (confirm("Are you sure you want to mark this done?")) 
    {
        consultSession.removeStudent(index, queueIndex);
        updateStorage(APP_DATA_KEY, consultSession);

        // This is intended to refresh the page as to allow the changes to be seen by the user
        window.location = "index.html";
    }
}

// Task 10
// The name of this function is displayQueues
// The purpose of this function is to display the current queue status to the user. 
// The function should take one parameter, data, which is the queue data that will be provided when 
// Must iterate through the values
// The parameter involved : data
// The output involved : HTML code
function displayQueues(data) 
{
    // Initialising the output for the different queues
    let queue1Output = "";
    let queue2Output = "";

    // The first for loop will go through i but will go through j before incrementing
    for (let i = 0; i < data.length; i++) 
    {
        // The subsequent for loop will go through j 
        for (let j = 0; j < data[i].length; j++) 
        {
            // If i is equal to zero , add it to the first queue
            // If not , add to the second queue
            if (i == 0) 
            {
                queue1Output +=
                `
                <li class="mdl-list__item mdl-list__item--three-line">
                <span class="mdl-list__item-primary-content">
                    <i class="material-icons mdl-list__item-avatar">person</i>
                    <span>${data[i][j].fullName}</span>
                </span>
                <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" onclick="view(${j},${i})"><i
                            class="material-icons">info</i></a>
                </span>
                <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" onclick="markDone(${j},${i})"><i
                            class="material-icons">done</i></a>
                </span>
                </li>
                `
            }
            else 
            {
                queue2Output +=
                `
                <li class="mdl-list__item mdl-list__item--three-line">
                <span class="mdl-list__item-primary-content">
                    <i class="material-icons mdl-list__item-avatar">person</i>
                    <span>${data[i][j].fullName}</span>
                </span>
                <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" onclick="view(${j},${i})"><i
                            class="material-icons">info</i></a>
                </span>
                <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" onclick="markDone(${j},${i})"><i
                            class="material-icons">done</i></a>
                </span>
                </li>
                `
            }
        }
    }
    let output = `<ul class="mdl-list">\n<h4>Queue 1</h4>\n` + queue1Output + `</ul>\n
                  <ul class="mdl-list">\n<h4>Queue 2</h4>\n` + queue2Output + `</ul>\n`;

    // Outputting the html code in the index.html page
    document.getElementById("queueContent").innerHTML = output;
}

// Other coding
// Task 7
// Updating the time every 1 second
setInterval(updateDayTime, 1000);

// Task 10
// Displaying the queue 
displayQueues(consultSession.queue);