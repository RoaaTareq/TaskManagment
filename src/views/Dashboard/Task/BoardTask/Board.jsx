import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
    TASK: 'task',
};

const Task = ({ task, index, moveTask, columnId, onDelete, onEdit }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { index, columnId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className='drag-card'
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    {task.description} - {task.priority}
                </div>
                <div className="task-actions">
                    <i 
                        className="bi bi-pen" 
                        onClick={() => onEdit(task, columnId)} 
                        style={{ cursor: 'pointer', margin: '0 5px' }} 
                        title="Edit Task" 
                    />
                    <i 
                        className="bi bi-trash" 
                        onClick={() => onDelete(task, columnId)} 
                        style={{ cursor: 'pointer', margin: '0 5px' }} 
                        title="Delete Task" 
                    />
                </div>
            </div>
        </div>
    );
};

// Column Component
const Column = ({ title, tasks, moveTask, columnId, onDelete, onEdit }) => {
    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            moveTask(item.index, columnId, item.columnId);
        },
    });

    return (
        <div ref={drop} className="col-3 board-layout">
            <h5>{title}</h5>
            {tasks.map((task, index) => (
                <Task
                    key={task.id}
                    task={task}
                    index={index}
                    moveTask={moveTask}
                    columnId={columnId}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

// Main Board Component
const Board = ({ tasks, setTasks }) => {
    const moveTask = (fromIndex, toColumnId, fromColumnId) => {
        const sourceTasks = Array.from(tasks[fromColumnId]);
        const [movedTask] = sourceTasks.splice(fromIndex, 1); // Remove the task from the source column

        const destinationTasks = Array.from(tasks[toColumnId]);
        destinationTasks.push(movedTask); 

        setTasks({
            ...tasks,
            [fromColumnId]: sourceTasks, 
            [toColumnId]: destinationTasks, 
        });
    };

    const deleteTask = (task, columnId) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            [columnId]: prevTasks[columnId].filter((t) => t.id !== task.id),
        }));
    };

    const editTask = (task, columnId) => {
        const updatedDescription = prompt("Edit Task Description:", task.description);
        if (updatedDescription) {
            const updatedTasks = tasks[columnId].map((t) =>
                t.id === task.id ? { ...t, description: updatedDescription } : t
            );
            setTasks({
                ...tasks,
                [columnId]: updatedTasks,
            });
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <section>
                <div className="container">
                    <div className="row m-auto justify-content-center mt-4">
                        <Column
                            title="To Do"
                            tasks={tasks.todo}
                            moveTask={moveTask}
                            columnId="todo"
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                        <Column
                            title="In Progress"
                            tasks={tasks.inProgress}
                            moveTask={moveTask}
                            columnId="inProgress"
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                        <Column
                            title="Done"
                            tasks={tasks.done}
                            moveTask={moveTask}
                            columnId="done"
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    </div>
                </div>
            </section>
        </DndProvider>
    );
};

export default Board;
