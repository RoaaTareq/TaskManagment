// db.js
import { openDB } from 'idb';

const DATABASE_NAME = 'taskManagement';
const DATABASE_VERSION = 1;
const STORE_NAME = 'tasks';

export const initDB = async () => {
    return openDB(DATABASE_NAME, DATABASE_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true,
                });
            }
        },
    });
};

export const addTask = async (task) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.add(task);
    await tx.done;
};

export const getTasks = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};
