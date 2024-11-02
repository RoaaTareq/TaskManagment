import React, { useState } from 'react'; 
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteTaskFromDB } from '../../../../db'; 
import Filter from '../FilterandSorting/Filter';
import EditTaskForm from '../Models/EditTaskForm';
import '../../../../assets/style/dragboard.css';
import { useTranslation } from 'react-i18next';

const ItemTypes = {
    TASK: 'task',
};

const Task = ({ task, index, moveTask, columnId, onDelete, onEdit }) => {
    const { t } = useTranslation();
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { index, columnId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const getBackgroundColor = (columnId) => {
        switch (columnId) {
            case 'todo':
                return '#bd0808'; 
            case 'inProgress':
                return 'orange'; 
            case 'done':
                return '#0d420d'; 
            default:
                return 'white'; 
        }
    };

    const isOverdue = new Date(task.endDate) < new Date();

    return (
        <div
            ref={drag}
            className='drag-card'
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isOverdue ? '#ffcccb' : getBackgroundColor(columnId),
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px',
                position: 'relative',
                color:'#FFF'
            }}
        >
            {columnId === 'done' && isOverdue && (
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
                <i className="bi bi-pen icon" onClick={() => onEdit(task)} title={t('edit_task')} />
                <i className="bi bi-trash icon" onClick={() => onDelete(task, columnId)} title={t('delete_task')} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className='d-flex flex-column'>
                    <span className='priority'>🚒 {task.priority}</span>
                    <p className='text-descrption'>🧾 {task.description}</p>
                    {task.startDate && task.endDate && (
                        <span> 📅 {task.startDate} to {task.endDate}</span>
                    )}
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
        <div ref={drop} className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12 board-layout">
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

const Board = ({ tasks, setTasks ,onUpdateTask }) => {
    const { t } = useTranslation();
    const [filterPriority, setFilterPriority] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const moveTask = (fromIndex, toColumnId, fromColumnId) => {
        if (fromColumnId === toColumnId) return; // Prevent moving within the same column

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
        const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;

        if (task.userId !== userId) {
            console.error("User ID does not match. Cannot delete task.");
            return;
        }

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

    const handleEditSubmit = async (updatedTask) => {
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

        await onUpdateTask({ ...updatedTask, id: currentTask.id, columnId: currentTask.columnId });
        setIsEditing(false);
        setCurrentTask(null);
    };

    const filteredTasks = (columnTasks, columnId) => {
        return columnTasks.filter(task => {
            const matchesPriority = filterPriority ? task.priority === filterPriority : true;
            const taskDate = new Date(task.endDate);
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
                startDate={startDate}
                endDate={endDate}
            />
            <DndProvider backend={HTML5Backend}>
                <section>
                    <div className="container">
                        <div className="row m-auto justify-content-between mt-4">
                            <Column
                                title={`🪜 ${t('todo')}`} 
                                tasks={filteredTasks(tasks.todo, "todo")}
                                moveTask={moveTask}
                                columnId="todo"
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                            <Column
                                title={`⚒️ ${t('progress')}`}
                                tasks={filteredTasks(tasks.inProgress, "inProgress")}
                                moveTask={moveTask}
                                columnId="inProgress"
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                            <Column
                                title={`✅ ${t('done')}`}
                                tasks={filteredTasks(tasks.done, "done")}
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
