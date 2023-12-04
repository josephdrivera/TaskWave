document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form'); // Get the task form
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
            completed: false 
        };
        tasks.push(newTask);
        saveTasks(tasks);
        displayTask(newTask, tasks.length - 1); // Update to pass the entire task object and index
    }

    // Function to display a single task on the UI
    function displayTask(task, index) {
        const taskItem = document.createElement('li');
        taskItem.className = `flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600'} shadow rounded mb-2`; // Alternate row colors with dark background
    
    
        // Checkbox for marking task as complete
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'form-checkbox h-5 w-5 text-blue-600 mr-4'; 
        checkbox.addEventListener('click', () => toggleTaskCompletion(task.id));
        taskItem.appendChild(checkbox);
    
        const taskText = document.createElement('span');
        taskText.textContent = task.content;
        taskText.className = task.completed ? 'line-through' : '';
        taskItem.appendChild(taskText);
    
        // Create and append the delete button with DaisyUI classes
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-error rounded-lg'; 
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

    // Handling form submission instead of button click
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = ''; // Clear the input field
        }
    });

    loadAndDisplayTasks();
});
