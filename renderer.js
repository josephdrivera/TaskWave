document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task'); // Get the add task button
    const taskInput = document.getElementById('new-task'); // Get the input field
    const taskList = document.getElementById('task-list'); // Get the task list

    // Function to save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Function to add task
    function addTask(taskContent) {
        const tasks = loadTasks();
        tasks.push({ content: taskContent });
        saveTasks(tasks);
        displayTask(taskContent); // Update the UI
    }

    // Function to display a single task on the UI
    function displayTask(taskContent) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskContent;
        taskList.appendChild(taskItem);
    }

    // Function to load and display all tasks
    function loadAndDisplayTasks() {
        const tasks = loadTasks();
        taskList.innerHTML = ''; // Clear the task list before loading
        tasks.forEach(task => displayTask(task.content));
    }

    loadAndDisplayTasks();

    addButton.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = ''; // Clear the input field
        }
    });
});
