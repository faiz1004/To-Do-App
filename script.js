// Select DOM elements
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Add event listeners
addTaskBtn.addEventListener("click", () => addTask());
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Add task function with support for completed state
function addTask(completed = false, taskTextParam = null) {
    const taskText = taskTextParam || taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("li");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add("task-text");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(buttonContainer);

    if (completed) {
        taskItem.classList.add("completed");
    }

    taskTextElement.addEventListener("click", function () {
        taskItem.classList.toggle("completed");
        saveTasksToLocalStorage();
    });

    editBtn.addEventListener("click", function () {
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
            saveTasksToLocalStorage();
        }
    });

    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
    });

    taskList.appendChild(taskItem);
    if (!taskTextParam) taskInput.value = "";

    saveTasksToLocalStorage();
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        const text = li.querySelector(".task-text")?.textContent || "";
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTask(task.completed, task.text);
    });
}

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
