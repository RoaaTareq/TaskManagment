import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button"; 
import Heading from "../../../../components/Typography/Heading1";
import Alert from "react-bootstrap/Alert"; 
import TaskForm from "../Models/CreateTask";
import Board from "../BoardTask/Board";
import { addTask as saveTaskToDB, getTasksByUserId, updateTaskInDB } from "../../../../db"; 
import { Container } from "react-bootstrap";

const TaskHeader = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const loadTasksFromDB = useCallback(async () => {
        setLoading(true);
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            setLoading(false);
            return; 
        }

        try {
            const dbTasks = await getTasksByUserId(loggedInUser.id); 
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
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) return; 

        try {
            await saveTaskToDB({ ...task, userId: loggedInUser.id }); 
            await loadTasksFromDB(); // Reload tasks after adding a new one
            setShowForm(false); 
        } catch (error) {
            console.error("Failed to save task to IndexedDB:", error);
            setError("Failed to save task. Please try again.");
        }
    }, [loadTasksFromDB]);

    const updateTask = useCallback(async (updatedTask) => {
        try {
            await updateTaskInDB(updatedTask); 
            await loadTasksFromDB(); 
        } catch (error) {
            console.error("Failed to update task in IndexedDB:", error);
            setError("Failed to update task. Please try again.");
        }
    }, [loadTasksFromDB]);

    return (
        <section>
            <Container className="container">
                <div className="d-flex justify-content-between mt-4 mb-4 header-task">
                <Heading level={1} text="Task Managment"  />
                    <Button className="create-task" onClick={toggleForm}>Add Task +</Button>
                </div>
                
                {loading && <p>Loading tasks...</p>}
                {error && <Alert variant="danger">{error}</Alert>} 

                {showForm && (
                    <div className="mt-3">
                        <TaskForm onSubmit={addTask} onCancel={handleCancel} />
                    </div>
                )}
            </Container>
            
            <Board setTasks={setTasks} tasks={tasks} onUpdateTask={updateTask} /> 
        </section>
    );
};

export default TaskHeader;
