import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button"; 
import Alert from "react-bootstrap/Alert"; 
import TaskForm from "../Models/CreateTask";
import Board from "../BoardTask/Board";
import { addTask as saveTaskToDB, getTasksByUserId, updateTaskInDB } from "../../../../db"; 

const TaskHeader = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch tasks from IndexedDB
    const loadTasksFromDB = useCallback(async () => {
        setLoading(true);
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            setLoading(false);
            return; // Exit if no user is logged in
        }
        const userId = loggedInUser.id; // Get userId from localStorage
        try {
            const dbTasks = await getTasksByUserId(userId); // Fetch tasks by userId
            setTasks({ todo: dbTasks, inProgress: [], done: [] });
        } catch (error) {
            console.error("Failed to load tasks from IndexedDB:", error);
            setError("Failed to load tasks. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTasksFromDB();
    }, [loadTasksFromDB]);

    const handleCancel = () => {
        setShowForm(false); 
    };

    const toggleForm = useCallback(() => {
        setShowForm(prev => !prev);
    }, []);

    const addTask = useCallback(async (task) => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (!loggedInUser) return; 

            const userId = loggedInUser.id; 
            await saveTaskToDB({ ...task, userId }); 
            await loadTasksFromDB(); // Reload tasks after adding a new one
            setShowForm(false); 
        } catch (error) {
            console.error("Failed to save task to IndexedDB:", error);
            setError("Failed to save task. Please try again.");
        }
    }, [loadTasksFromDB]);

    // Function to handle task updates
    const updateTask = useCallback(async (updatedTask) => {
        try {
            await updateTaskInDB(updatedTask); // Update task in the database
            await loadTasksFromDB(); // Reload tasks after updating
        } catch (error) {
            console.error("Failed to update task in IndexedDB:", error);
            setError("Failed to update task. Please try again.");
        }
    }, [loadTasksFromDB]);

    return (
        <section>
            <div className="container">
                <div className="d-flex justify-content-between mt-4 mb-4">
                    <h1>Task Management</h1>
                    <Button className="create-task" onClick={toggleForm}>Add Task +</Button>
                </div>
                
                {loading && <p>Loading tasks...</p>}
                {error && <Alert variant="danger">{error}</Alert>} 

                {showForm && (
                    <div className="mt-3">
                        <TaskForm onSubmit={addTask} onCancel={handleCancel} />
                    </div>
                )}
            </div>
            
            <Board setTasks={setTasks} tasks={tasks} onUpdateTask={updateTask} /> {/* Pass update function to Board */}
        </section>
    );
};

export default TaskHeader;
