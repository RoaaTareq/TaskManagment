import React, { useState } from "react";
import Button from "../../../../components/Button/Button";
import TaskForm from "../Models/CreateTask"; // Import TaskForm
import Board from "../BoardTask/Board"; // Import Board component

function TaskHeader() {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

    // Toggle form visibility
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Handle adding new task
    const addTask = (task) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            todo: [...prevTasks.todo, task],
        }));
        setShowForm(false);
    };

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
}

export default TaskHeader;
