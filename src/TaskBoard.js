// src/components/TaskBoard.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddTask from './AddTask';

// Initial state for tasks
const initialTasks = {
  todo: [
    { id: 'task-1', title: 'Task 1', priority: 'high', dueDate: '2024-11-01' },
    { id: 'task-2', title: 'Task 2', priority: 'medium', dueDate: '2024-11-02' },
  ],
  inProgress: [],
  completed: [],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Function to add new task
  const addTask = (task) => {
    const newTask = { id: `task-${Date.now()}`, ...task }; // Create a unique id
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
  };

  // Function to handle drag end event
  const onDragEnd = (result) => {
    if (!result.destination) return; // Drop outside of any droppable

    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    // Move the task
    const movedTask = tasks[sourceColumn][source.index];

    setTasks((prevTasks) => {
      const newSourceTasks = Array.from(prevTasks[sourceColumn]);
      const newDestinationTasks = Array.from(prevTasks[destinationColumn]);

      // Remove from source
      newSourceTasks.splice(source.index, 1);
      // Add to destination
      newDestinationTasks.splice(destination.index, 0, movedTask);

      return {
        ...prevTasks,
        [sourceColumn]: newSourceTasks,
        [destinationColumn]: newDestinationTasks,
      };
    });
  };

  return (
    <div>
      <AddTask addTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: '30%',
                    padding: '10px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                  }}
                >
                  <h3>{columnId.charAt(0).toUpperCase() + columnId.slice(1)}</h3>
                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: '10px',
                            margin: '5px 0',
                            backgroundColor: '#fff',
                            borderRadius: '4px',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div>
                            <strong>{task.title}</strong> - {task.priority} - {task.dueDate}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder} {/* This is crucial for spacing */}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
