// db.js
import { openDB } from 'idb';

const DB_NAME = 'UserDatabase';
const USER_STORE_NAME = 'users';
const TASK_STORE_NAME = 'tasks';
const EMPLOYEE_STORE_NAME = 'employees'; // New store for employees
const PROJECT_STORE_NAME = 'projects'; // New store for projects

export async function initDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
                db.createObjectStore(USER_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(TASK_STORE_NAME)) {
                db.createObjectStore(TASK_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(EMPLOYEE_STORE_NAME)) {
                db.createObjectStore(EMPLOYEE_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(PROJECT_STORE_NAME)) {
                db.createObjectStore(PROJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        }
    });
}

// ----- User Functions -----
export async function addUser(user) {
    const db = await initDB();
    return db.add(USER_STORE_NAME, user);
}

export async function getUserByEmailAndPassword(email, password) {
    const db = await initDB();
    const allUsers = await db.getAll(USER_STORE_NAME);
    return allUsers.find(user => user.email === email && user.password === password);
}

// ----- Task Functions -----
export const addTask = async (task) => {
    const db = await initDB();
    await db.add(TASK_STORE_NAME, task);
};

export const getTasks = async () => {
    const db = await initDB();
    return db.getAll(TASK_STORE_NAME);
};

export const deleteTaskFromDB = async (taskId) => {
    const db = await initDB();
    await db.delete(TASK_STORE_NAME, taskId);
};

export const updateTaskInDB = async (task) => {
    const db = await initDB();
    await db.put(TASK_STORE_NAME, task);
};

// ----- Employee Functions -----
export const addEmployee = async (employee) => {
    const db = await initDB();
    return db.add(EMPLOYEE_STORE_NAME, employee);
};

export const getEmployees = async () => {
    const db = await initDB();
    return db.getAll(EMPLOYEE_STORE_NAME);
};

export const deleteEmployee = async (employeeId) => {
    const db = await initDB();
    await db.delete(EMPLOYEE_STORE_NAME, employeeId);
};

export const updateEmployee = async (employee) => {
    const db = await initDB();
    await db.put(EMPLOYEE_STORE_NAME, employee);
};

// ----- Project Functions -----
export const addProject = async (project) => {
    const db = await initDB();
    return db.add(PROJECT_STORE_NAME, project);
};

export const getProjects = async () => {
    const db = await initDB();
    return db.getAll(PROJECT_STORE_NAME);
};

export const deleteProject = async (projectId) => {
    const db = await initDB();
    await db.delete(PROJECT_STORE_NAME, projectId);
};

export const updateProject = async (project) => {
    const db = await initDB();
    await db.put(PROJECT_STORE_NAME, project);
};
