import React, { useState } from 'react'; 
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteTaskFromDB } from '../../../../db'; 
import Filter from '../FilterandSorting/Filter';
import EditTaskForm from '../Models/Edittask';

const ItemTypes = {
    TASK: 'task',
};

// Task component for individual tasks
const Task = ({ task, index, moveTask, columnId, onDelete, onEdit }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { index, columnId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // Determine background color based on task priority
    const getBackgroundColor = (priority) => {
        switch (priority) {
            case 'high':
                return '#f0a4a4'; // High priority - red
            case 'medium':
                return 'orange'; // Medium priority - orange
            case 'low':
                return '#cdf0cd'; // Low priority - green
            default:
                return 'white'; // Default background color
        }
    };

    return (
        <div
            ref={drag}
            className='drag-card'
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: getBackgroundColor(task.priority), // Apply the background color
                padding: '10px', // Add some padding for better appearance
                borderRadius: '5px', // Optional: Add some border radius
                marginBottom: '10px' // Space between cards
            }}
        >
            <div className="task-actions d-flex justify-content-end">
                <i className="bi bi-pen" onClick={() => onEdit(task)} style={{ cursor: 'pointer', margin: '0 5px' }} title="Edit Task" />
                <i className="bi bi-trash" onClick={() => onDelete(task, columnId)} style={{ cursor: 'pointer', margin: '0 5px' }} title="Delete Task" />
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className='d-flex flex-column'>
                    <span>{task.priority}</span>
                    <p>{task.description}</p>
                    <span>{task.startDate} to {task.endDate}</span>
                </div>
            </div>
        </div>
    );
};


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

const Board = ({ tasks, setTasks }) => {
    const [filterPriority, setFilterPriority] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const moveTask = (fromIndex, toColumnId, fromColumnId) => {
        const sourceTasks = Array.from(tasks[fromColumnId]);
        const [movedTask] = sourceTasks.splice(fromIndex, 1);
        const destinationTasks = Array.from(tasks[toColumnId]);
        destinationTasks.push(movedTask);

        setTasks({
            ...tasks,
            [fromColumnId]: sourceTasks,
            [toColumnId]: destinationTasks,
        });
    };

    const deleteTask = async (task, columnId) => {
        await deleteTaskFromDB(task.id);
        setTasks((prevTasks) => ({
            ...prevTasks,
            [columnId]: prevTasks[columnId].filter((t) => t.id !== task.id),
        }));
    };

    const editTask = (task) => {
        setCurrentTask(task);
        setIsEditing(true);
    };

    const handleEditSubmit = (updatedTask) => {
        if (!currentTask) {
            console.error("No valid task selected for editing");
            return; // Early return if there's no current task
        }

        // Updating task in state
        setTasks((prevTasks) => {
            const currentColumnTasks = prevTasks[currentTask.columnId] || [];
            const updatedTasks = currentColumnTasks.map((task) =>
                task.id === currentTask.id ? { ...task, ...updatedTask } : task
            );

            return {
                ...prevTasks,
                [currentTask.columnId]: updatedTasks,
            };
        });

        // Reset state after submission
        setIsEditing(false);
        setCurrentTask(null);
    };

    const filteredTasks = (columnTasks) => {
        return columnTasks.filter(task => {
            const matchesPriority = filterPriority ? task.priority === filterPriority : true;
            const taskDate = new Date(task.date);
            const matchesDate = (startDate ? taskDate >= new Date(startDate) : true) &&
                                (endDate ? taskDate <= new Date(endDate) : true);
            return matchesPriority && matchesDate;
        });
    };

    return (
        <>
            <Filter 
                setFilterPriority={setFilterPriority} 
                setStartDate={setStartDate} 
                setEndDate={setEndDate} 
            />
            <DndProvider backend={HTML5Backend}>
                <section>
                    <div className="container">
                        <div className="row m-auto justify-content-between mt-4">
                            <Column
                                title="To Do"
                                tasks={filteredTasks(tasks.todo)}
                                moveTask={moveTask}
                                columnId="todo"
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                            <Column
                                title="In Progress"
                                tasks={filteredTasks(tasks.inProgress)}
                                moveTask={moveTask}
                                columnId="inProgress"
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                            <Column
                                title="Done"
                                tasks={filteredTasks(tasks.done)}
                                moveTask={moveTask}
                                columnId="done"
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                        </div>
                    </div>
                </section>
                {isEditing && currentTask && (
                    <EditTaskForm 
                        onSubmit={handleEditSubmit} 
                        onCancel={() => {
                            setIsEditing(false);
                            setCurrentTask(null);
                        }} 
                        initialValues={{
                            startDate: currentTask.startDate,
                            endDate: currentTask.endDate,
                            priority: currentTask.priority,
                            description: currentTask.description,
                            id: currentTask.id,
                            columnId: currentTask.columnId 
                        }} 
                    />
                )}
            </DndProvider>
        </>
    );
};

export default Board;
