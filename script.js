document.addEventListener("DOMContentLoaded", loadTasks);

// 🌟 Function to Add Task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = createTaskElement(taskText, false);

    taskList.appendChild(li);
    saveTasks();

    // ✅ Clear Input Field After Adding a Task
    taskInput.value = "";
}

// 🌟 Create Task Element
function createTaskElement(taskText, completed = false) {
    let li = document.createElement("li");
    let textSpan = document.createElement("span");
    textSpan.textContent = taskText;

    if (completed) {
        moveToCompleted(li);
    }

    // ✅ Complete Button
    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = function() {
        moveToCompleted(li);
        saveTasks();
    };

    // ❌ Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(textSpan);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
}

// 🌟 Move Completed Task
function moveToCompleted(li) {
    li.classList.toggle("completed");
    let completedList = document.getElementById("completedTasks");
    let taskList = document.getElementById("taskList");

    if (li.classList.contains("completed")) {
        completedList.appendChild(li);
    } else {
        taskList.appendChild(li);
    }

    saveTasks();
}

// 🌟 Save & Load Tasks from Local Storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.firstChild.textContent, completed: false });
    });
    document.querySelectorAll("#completedTasks li").forEach(li => {
        tasks.push({ text: li.firstChild.textContent, completed: true });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🌙 Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
