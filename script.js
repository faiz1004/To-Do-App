// Select DOM elements
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Add event listener for adding tasks
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("li");

    // Task text
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add("task-text");

    // Create container for buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    
    // Add task text and buttons to task item
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(buttonContainer);

    // Mark task as complete when clicked
    taskTextElement.addEventListener("click", function() {
        taskItem.classList.toggle("completed");
    });

    // Edit task when edit button is clicked
    editBtn.addEventListener("click", function() {
        if (editBtn.textContent === "Edit") {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = taskTextElement.textContent;
            editInput.classList.add("edit-input");

            taskItem.replaceChild(editInput, taskTextElement);
            editBtn.textContent = "Save";
        } else {
            const updatedText = taskItem.querySelector("input").value.trim();

            if (updatedText === "") {
                alert("Task cannot be empty!");
                return;
            }

            taskTextElement.textContent = updatedText;
            taskItem.replaceChild(taskTextElement, taskItem.querySelector("input"));
            editBtn.textContent = "Edit";
        }
    });

    // Delete task when delete button is clicked
    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(taskItem);
    });

    // Append task to the list
    taskList.appendChild(taskItem);

    // Clear input field
    taskInput.value = "";
}
