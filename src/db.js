// db.js
import { openDB } from 'idb';

const DB_NAME = 'UserDatabase';
const STORE_NAME = 'users';

export async function initDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        }
    });
}

export async function addUser(user) {
    const db = await initDB();
    return db.add(STORE_NAME, user);
}

// Function to get a user by email and password
export async function getUserByEmailAndPassword(email, password) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const allUsers = await store.getAll();
    return allUsers.find(user => user.email === email && user.password === password);
}
