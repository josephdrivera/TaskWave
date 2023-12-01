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
        const newTask = { 
            content: taskContent, 
            id: Date.now(), 
            completed: false // Track completion status
        };
        tasks.push(newTask);
        saveTasks(tasks);
        displayTask(newTask); // Update to pass the entire task object
    }

    // Function to display a single task on the UI
    function displayTask(task) {
        const taskItem = document.createElement('li');

        // Checkbox for marking task as complete
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'task-checkbox'; // Add this line
        checkbox.addEventListener('click', () => toggleTaskCompletion(task.id));
        taskItem.appendChild(checkbox);

        const taskText = document.createElement('span');
        taskText.textContent = task.content;
        if (task.completed) {
            taskText.classList.add('completed'); // Add class for completed tasks
        }
        taskItem.appendChild(taskText);

        // Create and append the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button'; // Add this line
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    }

    // Function to toggle task completion status
    function toggleTaskCompletion(taskId) {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks(tasks);
            loadAndDisplayTasks(); // Refresh the task list
        }
    }

    // Function to delete a task
    function deleteTask(taskId) {
        let tasks = loadTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks(tasks);
        loadAndDisplayTasks(); // Refresh the task list
    }

    // Function to load and display all tasks
    function loadAndDisplayTasks() {
        const tasks = loadTasks();
        taskList.innerHTML = ''; // Clear the task list before loading
        tasks.forEach(displayTask);
    }

    loadAndDisplayTasks();

    addButton.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = ''; // Clear the input field
        }
    });
});