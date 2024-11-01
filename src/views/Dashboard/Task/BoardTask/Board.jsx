import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
    TASK: 'task',
};

// Draggable Task Component
const Task = ({ task, index, moveTask, columnId }) => {
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
        >
            {task.description} - {task.priority}
        </div>
    );
};

// Column Component
const Column = ({ title, tasks, moveTask, columnId }) => {
   

    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            // Call moveTask function when a task is dropped in this column
            moveTask(item.index, columnId, item.columnId);
        },
    });

    return (
        <div
            ref={drop}
            className="col-3 board-layout"
            
        >
            <h5>{title}</h5>
            {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} moveTask={moveTask} columnId={columnId} />
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

    return (
        <DndProvider backend={HTML5Backend}>
            <section>
                <div className="container">
                    <div className="row m-auto justify-content-center mt-4">
                        <Column title="To Do" tasks={tasks.todo} moveTask={moveTask} columnId="todo" />
                        <Column title="In Progress" tasks={tasks.inProgress} moveTask={moveTask} columnId="inProgress" />
                        <Column title="Done" tasks={tasks.done} moveTask={moveTask} columnId="done" />
                    </div>
                </div>
            </section>
        </DndProvider>
    );
};

export default Board;
