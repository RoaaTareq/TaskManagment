// db.js
import { openDB } from 'idb';

const DB_NAME = 'UserDatabase';
const USER_STORE_NAME = 'users';
const TASK_STORE_NAME = 'tasks'; // New store for tasks

export async function initDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            // Create user object store if it doesn't exist
            if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
                db.createObjectStore(USER_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            // Create task object store if it doesn't exist
            if (!db.objectStoreNames.contains(TASK_STORE_NAME)) {
                db.createObjectStore(TASK_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        }
    });
}

// Function to add a new user
export async function addUser(user) {
    const db = await initDB();
    return db.add(USER_STORE_NAME, user);
}

// Function to get a user by email and password
export async function getUserByEmailAndPassword(email, password) {
    const db = await initDB();
    const tx = db.transaction(USER_STORE_NAME, 'readonly');
    const store = tx.objectStore(USER_STORE_NAME);
    const allUsers = await store.getAll();
    return allUsers.find(user => user.email === email && user.password === password);
}

// Function to add a task
export const addTask = async (task) => {
    const db = await initDB();
    const tx = db.transaction(TASK_STORE_NAME, 'readwrite'); // Use TASK_STORE_NAME
    await tx.store.add(task);
    await tx.done; // Wait for the transaction to complete
};

// Function to get all tasks
export const getTasks = async () => {
    const db = await initDB();
    return db.getAll(TASK_STORE_NAME); // Get all tasks from TASK_STORE_NAME
};

export const deleteTaskFromDB = async (taskId) => {
    const db = await initDB();
    const tx = db.transaction(TASK_STORE_NAME, 'readwrite');
    await tx.store.delete(taskId); // Delete task by ID
    await tx.done; // Wait for the transaction to complete
}

// Function to update an existing task
export const updateTaskInDB = async (updatedTask) => {
    const db = await initDB();
    const tx = db.transaction(TASK_STORE_NAME, 'readwrite');
    const store = tx.objectStore(TASK_STORE_NAME);
    
    // Use put() to update existing task or add if it doesn't exist
    await store.put(updatedTask); 
    await tx.done; // Ensure the transaction completes
};