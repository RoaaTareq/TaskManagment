import React, { useState } from 'react'; 
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteTaskFromDB } from '../../../../db'; 
import Filter from '../FilterandSorting/Filter';
import EditTaskForm from '../Models/Edittask';
import '../../../../assets/style/dragboard.css'

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

    const getBackgroundColor = (priority) => {
        switch (priority) {
            case 'high':
                return '#f0a4a4';
            case 'medium':
                return 'orange';
            case 'low':
                return '#cdf0cd';
            default:
                return 'white';
        }
    };

    const isOverdue = new Date(task.dueDate) < new Date();

    return (
        <div
            ref={drag}
            className='drag-card'
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isOverdue ? '#ffcccb' : getBackgroundColor(task.priority),
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px',
                position: 'relative' // Added to position the line
            }}
        >
            {columnId === 'done' && isOverdue && ( // Line for overdue tasks
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'red'
                }} />
            )}
            <div className="task-actions d-flex justify-content-end">
                <i className="bi bi-pen" onClick={() => onEdit(task)} style={{ cursor: 'pointer', margin: '0 5px' }} title="Edit Task" />
                <i className="bi bi-trash" onClick={() => onDelete(task, columnId)} style={{ cursor: 'pointer', margin: '0 5px' }} title="Delete Task" />
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className='d-flex flex-column'>
                    <span>{task.priority}</span>
                    <p>{task.description}</p>
                    <span>{task.startDate} to {task.endDate}</span>
                    {isOverdue && <span style={{ color: 'red' }}>Overdue!</span>}
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
            <h5>{title} ({tasks.length})</h5> {/* Display count of tasks */}
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
            return;
        }

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

        setIsEditing(false);
        setCurrentTask(null);
    };

    const filteredTasks = (columnTasks, columnId) => {
        return columnTasks.filter(task => {
            const matchesPriority = filterPriority ? task.priority === filterPriority : true;
            const taskDate = new Date(task.dueDate);
            const matchesDate = (startDate ? taskDate >= new Date(startDate) : true) &&
                                (endDate ? taskDate <= new Date(endDate) : true);
            const isOverdue = taskDate < new Date();

            return matchesPriority && matchesDate && (columnId === 'done' || !isOverdue);
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
                                tasks={filteredTasks(tasks.todo, "todo")} // Pass columnId here
                                moveTask={moveTask}
                                columnId="todo"
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                            <Column
                                title="In Progress"
                                tasks={filteredTasks(tasks.inProgress, "inProgress")} // Pass columnId here
                                moveTask={moveTask}
                                columnId="inProgress"
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                            <Column
                                title="Done"
                                tasks={filteredTasks(tasks.done, "done")} // Pass columnId here
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
