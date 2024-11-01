import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button"; 
import Alert from "react-bootstrap/Alert"; 
import TaskForm from "../Models/CreateTask";
import Board from "../BoardTask/Board";
import { addTask as saveTaskToDB, getTasks } from "../../../../db"; 

const TaskHeader = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const loadTasksFromDB = async () => {
            setLoading(true);
            try {
                const dbTasks = await getTasks();
                setTasks({ todo: dbTasks, inProgress: [], done: [] });
            } catch (error) {
                console.error("Failed to load tasks from IndexedDB:", error);
                setError("Failed to load tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadTasksFromDB();
    }, []);

    const handleCancel = () => {
        setShowForm(false); 
    };

    const toggleForm = useCallback(() => {
        setShowForm(prev => !prev);
    }, []);

    const addTask = useCallback(async (task) => {
        try {
            await saveTaskToDB(task); 
            setTasks(prevTasks => ({
                ...prevTasks,
                todo: [...prevTasks.todo, task], 
            }));
            setShowForm(false); 
        } catch (error) {
            console.error("Failed to save task to IndexedDB:", error);
            setError("Failed to save task. Please try again.");
        }
    }, []);

    return (
        <section>
            <div className="container">
                <div className="d-flex justify-content-between mt-4 mb-4">
                    <h1>Task Management</h1>
                    <Button className="create-task" onClick={toggleForm}>Create Task +</Button> {/* Bootstrap button */}
                </div>
                
                {loading && <p>Loading tasks...</p>}
                {error && <Alert variant="danger">{error}</Alert>} {/* Bootstrap alert for error messages */}

               
                {showForm && (
                    <div className="mt-3">
                        <TaskForm onSubmit={addTask} onCancel={handleCancel} />
                    </div>
                )}
            </div>
            
            <Board setTasks={setTasks} tasks={tasks} />
        </section>
    );
};

export default TaskHeader;
