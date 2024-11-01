// TaskHeader.js
import React, { useState, useEffect, useCallback } from "react";
import Button from "../../../../components/Button/Button";
import TaskForm from "../Models/CreateTask";
import Board from "../BoardTask/Board";
import { addTask as saveTaskToDB, getTasks } from "../../../../db"; 
const TaskHeader = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

    useEffect(() => {
        const loadTasksFromDB = async () => {
            try {
                const dbTasks = await getTasks();
                setTasks((prev) => ({
                    ...prev,
                    todo: dbTasks, 
                }));
            } catch (error) {
                console.error("Failed to load tasks from IndexedDB:", error);
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
            console.log("Saving task to IndexedDB:", task); 
            await saveTaskToDB(task); 

            
            setTasks(prevTasks => ({
                ...prevTasks,
                todo: [...prevTasks.todo, task], 
            }));
            
            setShowForm(false); 
            console.log("Task saved successfully!"); 
        } catch (error) {
            console.error("Failed to save task to IndexedDB:", error);
        }
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
                        <TaskForm onSubmit={addTask} onCancel={handleCancel} />
                    </div>
                )}
            </div>
            <Board tasks={tasks} setTasks={setTasks} />
        </section>
    );
};

export default TaskHeader;
