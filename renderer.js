document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task'); // Get the add task button
    const taskInput = document.getElementById('new-task'); // Get the input field
    const taskList = document.getElementById('task-list'); // Get the task list

    // Function to add task
    function addTask(taskContent) {
        window.electronAPI.addTask(taskContent, (err, docRefId) => {
            if (err) {
                console.error("Error adding task:", err);
            } else {
                console.log("Task added with ID:", docRefId);
                displayTask(taskContent); // Update the UI
            }
        });
    }

    // Function to display a single task on the UI
    function displayTask(taskContent) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskContent;
        taskList.appendChild(taskItem);
    }

    // Function to load and display all tasks
    function loadAndDisplayTasks() {
        window.electronAPI.getTasks((tasks) => {
            taskList.innerHTML = ''; // Clear the task list before loading
            tasks.forEach(task => displayTask(task.content));
        });
    }

    loadAndDisplayTasks();

    addButton.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = ''; // Clear the input field
        }
    });
});
