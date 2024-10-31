import React, { useState, useCallback } from "react";
import Button from "../../../../components/Button/Button";
import TaskForm from "../Models/CreateTask"; 
import Board from "../BoardTask/Board"; 

const TaskHeader = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

    
    const toggleForm = useCallback(() => {
        setShowForm(prev => !prev);
    }, []);

    // Handle adding new task
    const addTask = useCallback((task) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            todo: [...prevTasks.todo, task], 
        }));
        setShowForm(false); 
    }, []);

    return (
        <section>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h1>Task Management</h1>
                    <Button onClick={toggleForm}>Create Task +</Button>
                </div>
              
                {showForm && (
                    <div className="mt-3">
                        <TaskForm onSubmit={addTask} />
                    </div>
                )}
            </div>
            <Board tasks={tasks} setTasks={setTasks} />
        </section>
    );
};

export default TaskHeader;
