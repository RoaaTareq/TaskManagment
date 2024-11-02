// db.js
import { openDB } from 'idb';

const DB_NAME = 'UserDatabase';
const USER_STORE_NAME = 'users';
const TASK_STORE_NAME = 'tasks';


export async function initDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
                db.createObjectStore(USER_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(TASK_STORE_NAME)) {
                db.createObjectStore(TASK_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
          
        }
    });
}


export async function addUser(user) {
    const db = await initDB();
    return db.add(USER_STORE_NAME, user);
}

export async function getUserByEmailAndPassword(email, password) {
    const db = await initDB();
    const allUsers = await db.getAll(USER_STORE_NAME);
    return allUsers.find(user => user.email === email && user.password === password);
}



export const addTask = async (task) => {
    const db = await initDB();
  
    const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;
    await db.add(TASK_STORE_NAME, { ...task, userId });
};


export const getTasksByUserId = async (userId) => {
    const db = await initDB();
    const allTasks = await db.getAll(TASK_STORE_NAME);
    return allTasks.filter(task => task.userId === userId);
};

export const deleteTaskFromDB = async (taskId) => {
    const db = await initDB();
    await db.delete(TASK_STORE_NAME, taskId);
};


export const updateTaskInDB = async (task) => {
    const db = await initDB();
    console.log("Updating task:", task); // Debugging line

    // Ensure task.id is defined before proceeding
    if (!task.id) {
        throw new Error("Task ID is required for updating.");
    }

    const existingTask = await db.get(TASK_STORE_NAME, task.id); // Get the existing task
    if (!existingTask) {
        throw new Error(`Task with ID ${task.id} not found.`);
    }

    await db.put(TASK_STORE_NAME, { ...existingTask, ...task }); // Update existing task with new values
};




