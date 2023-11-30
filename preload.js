const { contextBridge } = require('electron');
const Dexie = require('dexie');

// Initialize Dexie (IndexedDB)
const db = new Dexie('MyTasksDB');
db.version(1).stores({
  tasks: '++id, content'
});

console.log("Preload script is running"); // Add this line for debugging

contextBridge.exposeInMainWorld('electronAPI', {
    addTask: async (taskContent) => {
        try {
            // Add task to IndexedDB
            const docRef = await db.tasks.add({ content: taskContent });
            return docRef;
        } catch (error) {
            console.error("Error in addTask:", error);
            throw error;
        }
    },
    getTasks: async () => {
        try {
            // Get tasks from IndexedDB
            const tasks = await db.tasks.toArray();
            return tasks;
        } catch (error) {
            console.error("Error in getTasks:", error);
            throw error;
        }
    }
});
