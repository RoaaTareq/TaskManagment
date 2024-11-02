import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../../components/Layout/Sidebar';
import Task from '../Task/task';




const menuItems = [
  { label: 'Managemnt Task', link: 'task' },
]

function MainSidebar() {
  return (
    <div className="d-flex">
      <Sidebar menuItems={menuItems} />
      <div className="p-4 w-100">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/task" />} /> 
          <Route path="task" element={<Task />} />
         
        </Routes>
      </div>
    </div>
  );
}

export default MainSidebar;
