const Dexie = require('dexie');

const db = new Dexie('MyTasksDB');
db.version(1).stores({
  tasks: '++id, content, completed'
});

db.open().catch((error) => {
  console.error("Failed to open db: ", error);
});

module.exports = db;
