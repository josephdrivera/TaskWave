const { contextBridge } = require('electron');

console.log("Preload script is running"); // For debugging

contextBridge.exposeInMainWorld('electronAPI', {
    addTask: (taskContent) => {
        try {
            // Retrieve existing tasks from local storage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            // Create a new task object
            const newTask = { id: Date.now(), content: taskContent };
            // Add new task to the array
            tasks.push(newTask);
            // Save updated array back to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return newTask.id;
        } catch (error) {
            console.error("Error in addTask:", error);
            throw error;
        }
    },
    getTasks: () => {
        try {
            // Get tasks from local storage
            return JSON.parse(localStorage.getItem('tasks')) || [];
        } catch (error) {
            console.error("Error in getTasks:", error);
            throw error;
        }
    }
});
