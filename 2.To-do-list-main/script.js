const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}
function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showTask();

/* This code is written in JavaScript and is used to create a simple to-do list application. Here's a breakdown of what each part does:

const inputBox = document.getElementById("input-box"); - This line of code selects the HTML element with the ID of "input-box", which is likely an input field where the user can type in a new task.

const listcontainer = document.getElementById("list-container"); - This line of code selects the HTML element with the ID of "list-container", which is likely the container where the list of tasks will be displayed.

function addTask(){...} - This is a function that is called when the user wants to add a new task to the list. It first checks if the input field is empty, and if it is, it shows an alert message. If the input field is not empty, it creates a new list item (<li>) element, sets its inner HTML to the value of the input field, and appends it to the list container. It also creates a new span element with an "x" character, which is likely used to remove the task from the list.

listcontainer.addEventListener("click", function(e){...} - This line of code adds an event listener to the list container, which listens for click events. When a click event is detected, it calls the function passed as the second argument. This function checks if the clicked element is a span element (with the "x" character), and if it is, it removes the parent list item from the list container.

saveData(); - This line of code is called after a new task is added to the list, but it is not defined in the provided code. It is likely used to save the current state of the to-do list, so that it can be restored when the user refreshes the page or comes back to the application later.

Overall, this code creates a simple to-do list application where the user can add new tasks, and remove them by clicking on the "x" character next to each task. The state of the to-do list is also saved, so that it can be restored later. */