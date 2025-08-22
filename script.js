// Select elements
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("category");
const prioritySelect = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const toggleDark = document.getElementById("toggleDark");

// Load saved tasks
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
});

// Add task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (task === "") return;

    const taskObj = { task, category, priority, dueDate };
    addTaskToDOM(taskObj);
    saveTask(taskObj);

    taskInput.value = "";
    dueDateInput.value = "";
});

// Add task to DOM
function addTaskToDOM(taskObj) {
    const li = document.createElement("li");

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `
        <strong>${taskObj.task}</strong>
        <span class="task-meta">📂 ${taskObj.category} | ⚡ ${taskObj.priority} | ⏰ ${taskObj.dueDate || "No deadline"}</span>
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "deleteBtn";
    deleteBtn.onclick = () => {
        li.remove();
        removeTask(taskObj);
    };

    li.appendChild(taskInfo);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task
function saveTask(taskObj) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskObj => addTaskToDOM(taskObj));
}

// Remove task
function removeTask(taskObj) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => !(t.task === taskObj.task && t.dueDate === taskObj.dueDate));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dark Mode
toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});
